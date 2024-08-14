import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  getDoc,
  where,
  orderBy,
  limit,
  query,
} from "firebase/firestore";
import { db } from "./firebase-config";

const FirebaseApp = () => {
  // colRef
  const colRef = collection(db, "posts");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [postId, setPostId] = useState("");
  const [posts, setPosts] = useState([]);
  const [singlePost, setSinglePost] = useState("");
  console.log("🚀 ~ FirebaseApp ~ post:", posts);
  // console.log("🚀 ~ FirebaseApp ~ colRef:", colRef);
  useEffect(() => {
    // 1. Get collection data (posts)
    // let posts = [];
    // getDocs(colRef)
    //   .then((snapshot) => {
    //     // console.log("🚀 ~ getDocs ~ snapshot:", snapshot);
    //     snapshot.docs.forEach((doc) => {
    //       // console.log(doc.data());
    //       posts.push({
    //         id: doc.id,
    //         ...doc.data(),
    //       });
    //     });
    //     setPosts(posts);
    //     // console.log("🚀 ~ useEffect ~ posts:", posts);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // 2. Get document in realtime
    onSnapshot(colRef, (snapshot) => {
      let posts = [];
      snapshot.docs.forEach((doc) => {
        posts.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts(posts);
    });
    const docRefSingle = doc(db, "posts", "GGBfVqxtbfCL3hbGtOro");
    // getDoc(docRefSingle).then((doc) => {
    //   console.log(doc.id, doc.data());
    // });
    onSnapshot(docRefSingle, (doc) => {
      console.log(doc.id, doc.data());
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleAddPost = (e) => {
    e.preventDefault();
    addDoc(colRef, {
      title,
      author,
      createdAt: serverTimestamp(),
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
    const colRefDelete = doc(db, "posts", postId);
    await deleteDoc(colRefDelete);
    console.log("success delete");
  };
  const handleUpdatePost = async (e) => {
    e.preventDefault();
    const colUpdate = doc(db, "posts", postId);
    await updateDoc(colUpdate, {
      title,
      author,
    });
    console.log("success");
  };
  useEffect(() => {
    const q = query(colRef, where("author", "==", "Uyen"), orderBy("author"));
    onSnapshot(q, (snapshot) => {
      let posts = [];
      snapshot.docs.forEach((doc) => {
        posts.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      console.log(posts);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <div className="w-full max-w-[500px] mx-auto my-10 bg-white shadow-lg p-5 mb-10">
        <form onSubmit={handleAddPost}>
          <input
            type="text"
            className="p-3 border border-gray-300 outline-none rounded-lg w-full mb-5 focus:border-blue-500"
            placeholder="Enter your title"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            className="p-3 border border-gray-300 outline-none rounded-lg w-full mb-5 focus:border-blue-500"
            placeholder="Enter your author"
            name="author"
            onChange={(e) => setAuthor(e.target.value)}
          />
          <button className="p-4 bg-blue-500 rounded-lg w-full text-white font-medium">
            Add Post
          </button>
        </form>
      </div>
      <div className="w-full max-w-[500px] mx-auto my-10 bg-white shadow-lg p-5 mb-10">
        <form onSubmit={handleRemovePost}>
          <input
            type="text"
            className="p-3 border border-gray-300 outline-none rounded-lg w-full mb-5 focus:border-blue-500"
            placeholder="Enter your postId"
            name="postId"
            onChange={(e) => setPostId(e.target.value)}
          />
          <button className="p-4 bg-red-500 rounded-lg w-full text-white font-medium">
            Remove Post
          </button>
        </form>
      </div>
      <div className="w-full max-w-[500px] mx-auto my-10 bg-white shadow-lg p-5 mb-10">
        <form onSubmit={handleUpdatePost}>
          <input
            type="text"
            className="p-3 border border-gray-300 outline-none rounded-lg w-full mb-5 focus:border-blue-500"
            placeholder="Enter your postId"
            name="postId"
            onChange={(e) => setPostId(e.target.value)}
          />
          <input
            type="text"
            className="p-3 border border-gray-300 outline-none rounded-lg w-full mb-5 focus:border-blue-500"
            placeholder="Enter your title"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            className="p-3 border border-gray-300 outline-none rounded-lg w-full mb-5 focus:border-blue-500"
            placeholder="Enter your author"
            name="author"
            onChange={(e) => setAuthor(e.target.value)}
          />
          <button className="p-4 bg-green-500 rounded-lg w-full text-white font-medium">
            Update Post
          </button>
        </form>
      </div>
      {posts.length > 0 && (
        <div className="w-full max-w-[500px] mx-auto my-10 bg-white shadow-lg p-5">
          {posts.map((item) => (
            <div
              key={item.title}
              className="p-2 w-full border border-gray-300 mb-1"
            >
              {item.title} - {item.author}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FirebaseApp;
