import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { prisma } from "./db";
import { getAuthSecret } from "./auth-secret";


export const ZAKY_SESSION_COOKIE = "zaky_session";

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createZakySession(username: string): Promise<string> {
  return new SignJWT({ username, role: "CLIENT_ADMIN" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getAuthSecret("zaky"));
}

export async function verifyZakySession(token: string): Promise<{ username: string; role: string } | null> {
  try {
    const { payload } = await jwtVerify(token, getAuthSecret("zaky"), { algorithms: ["HS256"] });
    if (payload.role !== "CLIENT_ADMIN" || typeof payload.username !== "string") return null;
    return payload as unknown as { username: string; role: string };
  } catch {
    return null;
  }
}

export async function setZakySessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(ZAKY_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function clearZakySessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(ZAKY_SESSION_COOKIE);
}

export async function getZakySession(): Promise<{ username: string; role: string } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ZAKY_SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifyZakySession(token);
}

export async function authenticateZaky(username: string, pass: string): Promise<{ username: string; id: string } | null> {
  try {
    const user = await prisma.zakyUser.findUnique({
      where: { username },
    });

    if (user) {
      const isValid = await verifyPassword(pass, user.password);
      if (isValid) {
        return { username: user.username, id: user.id };
      }
      return null;
    }
  } catch (err) {
    console.error("[ZakyAuth] Error verifying credentials against database:", err);
  }

  return null;
}
