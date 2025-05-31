import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.set("token", "", { maxAge: 0, path: "/" });
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
