import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const BlogPageDetail = () => {
  console.log(useParams());
  const { slug } = useParams();
  console.log("🚀 ~ BlogPageDetail ~ slug:", slug);
  const navigate = useNavigate();
  return (
    <div>
      Blog Page Detail
      <button
        onClick={() => navigate("/blog")}
        className="p-3 rounded-lg bg-blue-400 text-white ml-4"
      >
        Navigate to Blog Page
      </button>
    </div>
  );
};

export default BlogPageDetail;
