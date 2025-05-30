import firebase_app from './firebase';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

export const db = getFirestore(firebase_app);
export const auth = getAuth(firebase_app);
export const storage = getStorage(firebase_app);
