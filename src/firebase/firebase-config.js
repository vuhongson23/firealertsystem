import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCcjRcVvJHdMwcByKrfZK4GoO75nfCEcSg",
  authDomain: "learn-firebase-2dfe5.firebaseapp.com",
  projectId: "learn-firebase-2dfe5",
  storageBucket: "learn-firebase-2dfe5.appspot.com",
  messagingSenderId: "178450892546",
  appId: "1:178450892546:web:32378fce4ee1a4787be41b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Init Services
export const db = getFirestore(app);
export const auth = getAuth(app);
