import { cookies } from 'next/headers';
// Import the function to get the admin auth instance
import { getAdminAuth } from './firebase/firebaseAdmin'; // Or from getAdmin.ts

export async function getUserFromCookie() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) return null;

  try {
    // Get the admin auth instance at runtime when needed
    const adminAuth = getAdminAuth();
    const decodedToken = await adminAuth.verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
}
