import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const BlogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log("🚀 ~ BlogPage ~ searchParams:", searchParams.get("search"));
  useEffect(() => {
    setSearchParams({ search: "vu-hong-son" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div>Blog Page</div>;
};

export default BlogPage;
