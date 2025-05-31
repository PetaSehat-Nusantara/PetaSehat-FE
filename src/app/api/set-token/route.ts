import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const { token } = await req.json();
  if (!token) {
    return new Response(JSON.stringify({ error: "No token provided" }), { status: 400 });
  }

  (await cookies()).set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
