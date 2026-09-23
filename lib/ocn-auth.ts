import { getAuthSecret } from "./auth-secret";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { getOcnAdmin, updateOcnAdminPassword, incrementOcnFailedAttempts, resetOcnFailedAttempts } from "./ocn-db";
import { OcnAdminUser } from "./ocn-types";


export const OCN_SESSION_COOKIE_NAME = "ocn_session";

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createOcnSessionToken(user: { id: string; username: string; mustChangePassword: boolean }): Promise<string> {
  return new SignJWT({
    sub: user.id,
    username: user.username,
    role: "OCN_ADMIN",
    mustChangePassword: user.mustChangePassword,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(getAuthSecret("ocn"));
}

export async function verifyOcnSessionToken(
  token: string
): Promise<{ sub: string; username: string; role: string; mustChangePassword: boolean } | null> {
  try {
    const { payload } = await jwtVerify(token, getAuthSecret("ocn"));
    if (payload.role !== "OCN_ADMIN") return null;
    return payload as unknown as { sub: string; username: string; role: string; mustChangePassword: boolean };
  } catch {
    return null;
  }
}

export async function setOcnSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(OCN_SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
  });
}

export async function clearOcnSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(OCN_SESSION_COOKIE_NAME);
}

export async function getOcnSession(): Promise<{ sub: string; username: string; role: string; mustChangePassword: boolean } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(OCN_SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyOcnSessionToken(token);
}

export interface AuthResult {
  success: boolean;
  user?: OcnAdminUser;
  error?: string;
  lockedUntil?: string;
  mustChangePassword?: boolean;
}

export async function authenticateOcnAdmin(username: string, pass: string): Promise<AuthResult> {
  const admin = await getOcnAdmin();

  if (!admin || admin.username.toLowerCase() !== username.toLowerCase()) {
    return { success: false, error: "Invalid username or password." };
  }

  // Check brute force lockout
  if (admin.lockedUntil) {
    const lockTime = new Date(admin.lockedUntil).getTime();
    const now = Date.now();
    if (now < lockTime) {
      const remainingMins = Math.ceil((lockTime - now) / 60000);
      return {
        success: false,
        error: `Account is temporarily locked due to too many failed attempts. Try again in ${remainingMins} minute(s).`,
        lockedUntil: admin.lockedUntil,
      };
    }
  }

  const isValid = await verifyPassword(pass, admin.passwordHash);

  if (!isValid) {
    const attempts = await incrementOcnFailedAttempts();
    if (attempts >= 5) {
      return {
        success: false,
        error: "Too many failed login attempts. Account locked for 15 minutes.",
      };
    }
    return {
      success: false,
      error: `Invalid credentials. (${5 - attempts} attempt(s) remaining before temporary lockout)`,
    };
  }

  // Reset failed attempts on success
  await resetOcnFailedAttempts();

  return {
    success: true,
    user: admin,
    mustChangePassword: admin.mustChangePassword,
  };
}

export async function changeOcnPassword(currentPass: string, newPass: string): Promise<{ success: boolean; error?: string }> {
  const admin = await getOcnAdmin();
  if (!admin) {
    return { success: false, error: "Admin account not found." };
  }

  const isValid = await verifyPassword(currentPass, admin.passwordHash);
  if (!isValid) {
    return { success: false, error: "Current password is incorrect." };
  }

  if (newPass.length < 8) {
    return { success: false, error: "New password must be at least 8 characters long." };
  }

  if (newPass === "Mohamed@1234") {
    return { success: false, error: "New password cannot be the initial temporary password." };
  }

  const newHash = await hashPassword(newPass);
  await updateOcnAdminPassword(newHash);

  return { success: true };
}
