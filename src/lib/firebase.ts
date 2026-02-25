import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getDatabase, Database } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp | null = null;
let database: Database | null = null;

// Only initialize Firebase if we have a database URL configured
if (firebaseConfig.databaseURL) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    database = getDatabase(app);
  } catch (error) {
    console.warn("Firebase initialization failed:", error);
  }
} else {
  console.warn(
    "Firebase databaseURL not configured. Set NEXT_PUBLIC_FIREBASE_DATABASE_URL in .env.local"
  );
}

export { app, database };
