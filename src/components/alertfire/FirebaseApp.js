import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebase-config";

const FirebaseApp = () => {
  const colRef = collection(db, "test");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [postId, setPostId] = useState("");
  useEffect(() => {
    //1. Get collection data (test)
    getDocs(colRef)
      .then((snapshot) => {
        let posts = [];
        snapshot.docs.forEach((doc) => {
          posts.push({
            id: doc.id,
            ...doc.data(),
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleAddPost = (e) => {
    e.preventDefault();
    addDoc(colRef, {
      title, // title: title
      author, // author: author
    })
      .then(() => {
        console.log("success");
        // reset form
      })
      .catch((err) => {
        console.log(err);
        // reset form
      });
  };
  const handleRemovePost = async (e) => {
    e.preventDefault();
    const colRefDelete = doc (db, "test", postId);
    await deleteDoc(colRefDelete);
    console.log("deleted");
  };
  return (
    <div className="p-10">
      <div className="w-full max-w-[500px] mx-auto bg-white shadow-lg p-5 mb-10">
        <form onSubmit={handleAddPost}>
          <input
            type="text"
            className="p-3 rounded border border-gray-200 w-full mb-5 outline-none focus:border-blue-500"
            placeholder="Enter your title"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            className="p-3 rounded border border-gray-200 w-full mb-5 outline-none focus:border-blue-500"
            placeholder="Enter your author"
            name="author"
            onChange={(e) => setAuthor(e.target.value)}
          />
          <button
            type="submit"
            className="p-3 bg-blue-500 text-white font-medium w-full rounded-lg"
          >
            Add post
          </button>
        </form>
      </div>
      <div className="w-full max-w-[500px] mx-auto bg-white shadow-lg p-5 mb-10">
        <form onSubmit={handleRemovePost}>
          <input
            type="text"
            className="p-3 rounded border border-gray-200 w-full mb-5 outline-none focus:border-blue-500"
            placeholder="Enter your ID"
            name="postId"
            onChange={(e) => setPostId(e.target.value)}
          />
          <button
            type="submit"
            className="p-3 bg-red-500 text-white font-medium w-full rounded-lg"
          >
            Remove post
          </button>
        </form>
      </div>
    </div>
  );
};

export default FirebaseApp;
