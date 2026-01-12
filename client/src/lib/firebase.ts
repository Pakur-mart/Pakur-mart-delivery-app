import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, isSupported } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyC1Q_rYvraiyqDzagicVV5Gn5CI43ggusg",
  authDomain: "pakur-mart.firebaseapp.com",
  projectId: "pakur-mart",
  storageBucket: "pakur-mart.firebasestorage.app",
  messagingSenderId: "156313586096",
  appId: "1:156313586096:web:fd324f921b5519fca22e75",
  measurementId: "G-2793C3HGG1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize Firebase Cloud Messaging (only if supported)
let messaging: any = null;
const messagingPromise = (async () => {
  try {
    const supported = await isSupported();
    if (supported) {
      messaging = getMessaging(app);
      return messaging;
    }
  } catch (err) {
    console.error('Firebase Messaging not supported:', err);
  }
  return null;
})();

export { messaging, messagingPromise };

export default app;
