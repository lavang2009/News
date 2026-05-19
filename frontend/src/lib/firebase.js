import { initializeApp, getApp, getApps } from 'firebase/app';
import { browserLocalPersistence, getAuth, GoogleAuthProvider, setPersistence } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyAorlx_5O_LPJB7J2xRnDaXcHbEO0U4zYc',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'du-an-profile-c8209.firebaseapp.com',
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || 'https://du-an-profile-c8209-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'du-an-profile-c8209',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'du-an-profile-c8209.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '109480851897',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:109480851897:web:e828e0d636e05f09981e68',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-3TFC9KPBF9'
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);
export const googleProvider = new GoogleAuthProvider();

setPersistence(auth, browserLocalPersistence).catch(() => {});

googleProvider.setCustomParameters({ prompt: 'select_account' });

export { firebaseConfig };
