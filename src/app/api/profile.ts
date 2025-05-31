// Your API route file (e.g., pages/api/verifyToken.ts or app/api/verifyToken/route.ts)
import type { NextApiRequest, NextApiResponse } from 'next';
// Import the function to get the admin auth instance
import { getAdminAuth } from '@/lib/firebase/firebaseAdmin'; // Or from getAdmin.ts

// If you are using App Router Route Handlers, the types will be different
// import { NextRequest, NextResponse } from "next/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // If using App Router, the function signature would be different, e.g.:
  // export async function GET(req: NextRequest) { ... }
  // export async function POST(req: NextRequest) { ... }

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
    // For App Router: return NextResponse.json({ error: "Unauthorized: No token provided" }, { status: 401 });
  }

  const idToken = authHeader.split('Bearer ')[1];

  try {
    // Get the admin auth instance at runtime when needed within the handler
    const adminAuth = getAdminAuth();

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
    // For App Router: return NextResponse.json({ ... user data ... }, { status: 200 });
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).json({ error: 'Unauthorized: Invalid token' });
    // For App Router: return NextResponse.json({ error: "Unauthorized: Invalid token" }, { status: 401 });
  }
}
