import type { NextApiRequest, NextApiResponse } from "next";
import { getFirestore } from "firebase-admin/firestore";
import { getUserFromCookie } from "@/lib/getUserServer"; // Assuming this is the correct path

const db = getFirestore();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Await the promise returned by getUserFromCookie
  const user = await getUserFromCookie();

  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const uid = user.uid;

  try {
    await db.collection("users").doc(uid).set(
      {
        is_admin: true,
      },
      { merge: true }
    );
    return res.status(200).json({ message: `User ${uid} promoted to admin` });
  } catch (error) {
    console.error("Error promoting user:", error);
    return res.status(500).json({ error: "Failed to promote user" });
  }
}
