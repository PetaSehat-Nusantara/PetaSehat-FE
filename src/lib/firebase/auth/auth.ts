import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  getIdToken,
  updateProfile,
} from 'firebase/auth';
import { auth, db } from '../firebaseClient';
import Cookies from 'js-cookie';
import { doc, getDoc, setDoc } from 'firebase/firestore';

function getErrorMessage(error: unknown): string {
  if (typeof error === 'object' && error !== null && 'code' in error) {
    const code = (error as { code: string }).code;

    switch (code) {
      case 'auth/invalid-credential':
      case 'auth/wrong-password':
      case 'auth/user-not-found':
        return 'Email or password is incorrect.';
      case 'auth/invalid-email':
        return 'The email address is not valid.';
      case 'auth/user-disabled':
        return 'This user account has been disabled.';
      case 'auth/email-already-in-use':
        return 'This email is already in use. Please use a different one.';
      case 'auth/weak-password':
        return 'The password is too weak. Please choose a stronger one.';
      case 'auth/popup-closed-by-user':
        return 'Sign-in popup was closed before completing the sign-in.';
      default:
        return `Authentication failed: ${code.replace('auth/', '').replace(/-/g, ' ')}`;
    }
  }

  if (error instanceof Error) return error.message;
  return String(error);
}

async function ensureUserDocExists(
  user: { uid: string; email: string | null; displayName?: string | null },
  name?: string
) {
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      name: name || user.displayName || '',
      is_admin: false,
      is_verified: false,
      created_at: new Date(),
    });
  }
}

export async function login(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await ensureUserDocExists(user);
    const token = await getIdToken(user);
    Cookies.set('token', token, { expires: 1, sameSite: 'strict', secure: true });
    return { user };
  } catch (error: unknown) {
    return { error: getErrorMessage(error) };
  }
}

export async function register(email: string, password: string, name: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await updateProfile(user, { displayName: name });
    await ensureUserDocExists(user, name);
    const token = await getIdToken(user);
    Cookies.set('token', token, { expires: 1, sameSite: 'strict', secure: true });
    return { user };
  } catch (error: unknown) {
    return { error: getErrorMessage(error) };
  }
}

export async function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
    await ensureUserDocExists(user);
    const token = await getIdToken(user);
    Cookies.set('token', token, { expires: 1, sameSite: 'strict', secure: true });
    return { user };
  } catch (error: unknown) {
    return { error: getErrorMessage(error) };
  }
}

export async function logout() {
  try {
    await signOut(auth);
    Cookies.remove('token');
    return { success: true };
  } catch (error: unknown) {
    return { error: getErrorMessage(error) };
  }
}
