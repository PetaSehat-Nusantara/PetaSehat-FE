import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  getIdToken,
} from 'firebase/auth';
import { auth, db } from '../firebaseClient'; // Ensure `db` is Firestore instance
import Cookies from 'js-cookie';
import { doc, getDoc, setDoc } from 'firebase/firestore';

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

// Ensure Firestore user doc has consistent fields
async function ensureUserDocExists(user: {
  uid: string;
  email: string | null;
}) {
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      is_admin: false,
      is_verified: false,
      created_at: new Date(),
    });
  }
}

export async function login(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await ensureUserDocExists(user);

    const token = await getIdToken(user);
    Cookies.set('token', token, {
      expires: 1,
      sameSite: 'strict',
      secure: true,
    });

    return { user };
  } catch (error: unknown) {
    return { error: getErrorMessage(error) };
  }
}

export async function register(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await ensureUserDocExists(user);

    const token = await getIdToken(user);
    Cookies.set('token', token, {
      expires: 1,
      sameSite: 'strict',
      secure: true,
    });

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
    Cookies.set('token', token, {
      expires: 1,
      sameSite: 'strict',
      secure: true,
    });

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
