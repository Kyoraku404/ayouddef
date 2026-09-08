import { NextResponse } from "next/server";
import { changeOcnPassword, getOcnSession, createOcnSessionToken, setOcnSessionCookie } from "@/lib/ocn-auth";

export async function POST(request: Request) {
  try {
    const session = await getOcnSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { currentPassword, newPassword, confirmPassword } = body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { error: "All password fields are required." },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { error: "New password and confirmation do not match." },
        { status: 400 }
      );
    }

    const result = await changeOcnPassword(currentPassword, newPassword);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    // Refresh session cookie with mustChangePassword = false
    const token = await createOcnSessionToken({
      id: session.sub,
      username: session.username,
      mustChangePassword: false,
    });

    await setOcnSessionCookie(token);

    return NextResponse.json({
      success: true,
      message: "Password updated successfully. Session updated.",
    });
  } catch (error) {
    console.error("[OCN Auth] Change password error:", error);
    return NextResponse.json(
      { error: "An internal server error occurred." },
      { status: 500 }
    );
  }
}
