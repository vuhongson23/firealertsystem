import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "./firebase-config";
import { addDoc, collection } from "firebase/firestore";

const FirebaseAuth = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    displayName: "",
  });
  const [userInfo, setUserInfo] = useState("");
  const [forceRender, setForceRender] = useState(0);
  console.log("🚀 ~ FirebaseAuth ~ forceRender:", forceRender);
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUserInfo(currentUser);
      } else {
        setUserInfo("");
      }
    });
  }, []);
  //console.log("🚀 ~ FirebaseAuth ~ userInfo:", userInfo);
  const handleInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const cred = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      console.log("🚀 ~ handleCreateUser ~ cred:", cred);
      await updateProfile(auth.currentUser, {
        displayName: values.displayName,
      });
      const updatedUser = auth.currentUser;
      //console.log("🚀 ~ handleCreateUser ~ updatedUser:", updatedUser);

      const userRef = collection(db, "users");
      await addDoc(userRef, {
        email: values.email,
        password: values.password,
        id: cred.user.uid,
      });
      setUserInfo(updatedUser);
      setForceRender((prev) => prev + 1);
      console.log("success");
    } catch (error) {
      console.log(error);
    }
  };
  const handleSignOut = () => {
    signOut(auth);
    //setForceRender((prev) => prev + 1);
    console.log("signOut success");
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const cred = await signInWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    console.log("🚀 ~ handleLogin ~ cred:", cred);
    setUserInfo(cred.user); // Cập nhật thông tin người dùng
    setForceRender((prev) => prev + 1); // Kích hoạt re-render
    console.log("Login success");
  };
  return (
    <>
      <div className="w-ful max-w-[500px] mx-auto shadow-md rounded-lg p-5 my-10">
        <form onSubmit={handleCreateUser}>
          <input
            type="name"
            className="p-3 border border-gray-300 outline-none rounded-lg w-full mb-5 focus:border-blue-500"
            placeholder="Enter your name"
            name="displayName"
            onChange={handleInputChange}
            autoComplete="none"
          />
          <input
            type="email"
            className="p-3 border border-gray-300 outline-none rounded-lg w-full mb-5 focus:border-blue-500"
            placeholder="Enter your email"
            name="email"
            onChange={handleInputChange}
            autoComplete="none"
          />
          <input
            type="password"
            className="p-3 border border-gray-300 outline-none rounded-lg w-full mb-5 focus:border-blue-500"
            placeholder="Enter your password"
            name="password"
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="p-4 bg-blue-500 rounded-lg w-full text-white font-medium"
          >
            SignUp
          </button>
        </form>
        <div className="mt-10 flex items-center gap-x-5">
          <span>{userInfo?.displayName}</span>
          <button
            onClick={handleSignOut}
            className="p-4 bg-red-500 rounded-lg text-white font-medium"
          >
            SignOut
          </button>
        </div>
      </div>
      <div className="w-ful max-w-[500px] mx-auto shadow-md rounded-lg p-5 my-10">
        <form onSubmit={handleLogin}>
          <input
            type="email"
            className="p-3 border border-gray-300 outline-none rounded-lg w-full mb-5 focus:border-blue-500"
            placeholder="Enter your email"
            name="email"
            onChange={handleInputChange}
            autoComplete="none"
          />
          <input
            type="password"
            className="p-3 border border-gray-300 outline-none rounded-lg w-full mb-5 focus:border-blue-500"
            placeholder="Enter your password"
            name="password"
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="p-4 bg-green-500 rounded-lg w-full text-white font-medium"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};
export default FirebaseAuth;
