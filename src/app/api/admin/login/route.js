import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const { password } = await req.json();

    if (!password || password !== process.env.ADMIN_PASSWORD) {
      return Response.json({ error: "Грешна парола." }, { status: 401 });
    }

    const cookieStore = await cookies();

    cookieStore.set("admin-auth", "true", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 8,
    });

    return Response.json({
      success: true,
      message: "Успешен вход.",
    });
  } catch (error) {
    return Response.json(
      { error: "Възникна грешка. Опитайте отново." },
      { status: 500 }
    );
  }
}