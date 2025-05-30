import type { NextApiRequest, NextApiResponse } from "next";
import { getFirestore } from "firebase-admin/firestore";
import { getUserFromCookie } from "@/lib/getUserServer";

const db = getFirestore();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = getUserFromCookie()

  if (!token) return res.status(401).json({ error: "Unauthorized" });

  const decoded = await verifyIdToken(token);

  const uid = decoded.uid;

  await db.collection("users").doc(uid).set(
    {
      is_admin: true,
    },
    { merge: true }
  );

  return res.status(200).json({ message: `User ${uid} promoted to admin` });
}