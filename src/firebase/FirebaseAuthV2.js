import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "./firebase-config";
import { addDoc, collection } from "firebase/firestore";
import { useEffect } from "react";

const FirebaseAuthV2 = () => {
  const [userInfo, setUserInfo] = useState("");
  const handleCreateUser = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    createUserWithEmailAndPassword(auth, email, password)
      .then((data) => {
        console.log("Sign up success");
        console.log(data, "authData");
      })
      .catch((err) => {
        alert(err.code);
      });
    updateProfile(auth.currentUser, {
      displayName: "Vu Hong Son",
    });
    setUserInfo(auth.currentUser);
  };
  console.log("🚀 ~ FirebaseAuthV2 ~ userInfo:", userInfo);
  const handleSignOut = (e) => {
    e.preventDefault();
    signOut(auth);
    console.log("Sign Out success");
  };
  const handleLogin = (e) => {
    e.preventDefault();
    const emaillogin = e.target.emaillogin.value;
    const passwordlogin = e.target.passwordlogin.value;
    signInWithEmailAndPassword(auth, emaillogin, passwordlogin)
      .then((data) => {
        console.log(data, "authData");
      })
      .catch((err) => {
        alert(err.code);
      });
  };
  return (
    <>
      <div className="w-full max-w-[500px] mx-auto bg-white shadow-lg p-5 mb-10">
        <form onSubmit={handleCreateUser}>
          <input
            type="email"
            className="w-full p-3 mb-5 border border-gray-200 rounded outline-none focus:border-blue-500"
            name="email"
            placeholder="Enter your email address"
          />
          <input
            type="password"
            className="w-full p-3 mb-5 border border-gray-200 rounded outline-none focus:border-blue-500"
            name="password"
            placeholder="Enter your password"
          />
          <button
            type="submit"
            className="w-full p-3 text-sm font-medium text-white bg-blue-500 rounded-lg"
          >
            SignUp
          </button>
        </form>
        <div className="flex items-center mt-10 gap-x-5">
          <span>{userInfo?.displayName}</span>
          <button
            className="p-3 text-sm font-medium text-white bg-purple-500 rounded-lg"
            onClick={handleSignOut}
          >
            SignOut
          </button>
        </div>
      </div>
      <div className="w-full max-w-[500px] mx-auto bg-white shadow-lg p-5 mb-10">
        <form onSubmit={handleLogin}>
          <input
            type="email"
            className="w-full p-3 mb-5 border border-gray-200 rounded outline-none focus:border-blue-500"
            name="emaillogin"
            placeholder="Enter your email address"
          />
          <input
            type="password"
            className="w-full p-3 mb-5 border border-gray-200 rounded outline-none focus:border-blue-500"
            name="passwordlogin"
            placeholder="Enter your password"
          />
          <button
            type="submit"
            className="w-full p-3 text-sm font-medium text-white bg-pink-500 rounded-lg"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default FirebaseAuthV2;
