import type { NextApiRequest, NextApiResponse } from "next";
import { adminAuth } from "@/lib/firebase/firebaseAdmin";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const idToken = authHeader.split("Bearer ")[1];

  try {
    // Verify the Firebase ID token
    const decodedToken = await adminAuth.verifyIdToken(idToken);

    // Optionally get the full user record
    const userRecord = await adminAuth.getUser(decodedToken.uid);

    // Send user info back
    res.status(200).json({
      uid: userRecord.uid,
      email: userRecord.email,
      name: userRecord.displayName,
      picture: userRecord.photoURL,
    });
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
}
