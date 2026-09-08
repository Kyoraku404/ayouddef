import { NextResponse } from "next/server";
import { authenticateZaky, createZakySession, setZakySessionCookie } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    const authResult = await authenticateZaky(username.trim(), password);

    if (!authResult) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    const token = await createZakySession(authResult.username);
    await setZakySessionCookie(token);

    return NextResponse.json({
      success: true,
      user: {
        username: authResult.username,
        role: "CLIENT_ADMIN",
      },
    });
  } catch (error) {
    console.error("Zaky login API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
