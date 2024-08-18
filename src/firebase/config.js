// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
