import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBwnfhb3YpgsRW41-JOKSVNPEqcvbtG5hM",
  authDomain: "finance-tracker-bf98a.firebaseapp.com",
  projectId: "finance-tracker-bf98a",
  storageBucket: "finance-tracker-bf98a.appspot.com",
  messagingSenderId: "769480677048",
  appId: "1:769480677048:web:562bfa0ac9dc1042a3864d",
  measurementId: "G-VTV88TGCHD",
};

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
