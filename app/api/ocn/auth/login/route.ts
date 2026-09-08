import { NextResponse } from "next/server";
import { authenticateOcnAdmin, createOcnSessionToken, setOcnSessionCookie } from "@/lib/ocn-auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required." },
        { status: 400 }
      );
    }

    const authResult = await authenticateOcnAdmin(username, password);

    if (!authResult.success || !authResult.user) {
      return NextResponse.json(
        { error: authResult.error || "Invalid credentials." },
        { status: 401 }
      );
    }

    const token = await createOcnSessionToken({
      id: authResult.user.id,
      username: authResult.user.username,
      mustChangePassword: authResult.mustChangePassword ?? false,
    });

    await setOcnSessionCookie(token);

    return NextResponse.json({
      success: true,
      user: {
        id: authResult.user.id,
        username: authResult.user.username,
        mustChangePassword: authResult.mustChangePassword,
      },
    });
  } catch (error) {
    console.error("[OCN Auth] Login error:", error);
    return NextResponse.json(
      { error: "An internal server error occurred during authentication." },
      { status: 500 }
    );
  }
}
