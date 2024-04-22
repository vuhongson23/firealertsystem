import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyChmTj1beL-zEXCInRlQP5UDIM8GUHxg6g",
  authDomain: "mydatabase-d08c3.firebaseapp.com",
  databaseURL: "https://mydatabase-d08c3-default-rtdb.firebaseio.com",
  projectId: "mydatabase-d08c3",
  storageBucket: "mydatabase-d08c3.appspot.com",
  messagingSenderId: "386909276315",
  appId: "1:386909276315:web:b236b911a86b7b4d625e3e",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize services
export const db = getFirestore(app);
