import { initializeApp, getApps, cert, getApp, App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

let app: App | undefined; // Use undefined initially
let adminAuthInstance: ReturnType<typeof getAuth> | undefined; 

export function initializeAdminApp() {
  if (!getApps().length) {
    if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
      console.error("Firebase Admin credentials are not set.");
      return;
    }

    const serviceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    };

    app = initializeApp({
      credential: cert(serviceAccount),
    });
  } else {
    app = getApp();
  }

  adminAuthInstance = getAuth(app);
}

export function getAdminAuth() {
  if (!adminAuthInstance) {
    initializeAdminApp();
    if (!adminAuthInstance) {
       throw new Error("Firebase Admin Auth could not be initialized.");
    }
  }
  return adminAuthInstance;
}