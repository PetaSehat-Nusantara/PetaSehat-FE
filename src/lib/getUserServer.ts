// lib/getUserFromCookie.ts
import { cookies } from "next/headers";
import { adminAuth } from "./firebase/firebaseAdmin";

export async function getUserFromCookie() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}
