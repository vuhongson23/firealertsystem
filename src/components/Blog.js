import React from "react";
import useLinkNewTab from "./hooks/useLinkNewTab";
import useHover from "./hooks/useHover";

const Blog = () => {
  const { contentRef } = useLinkNewTab();
  const { hovered, nodeRef } = useHover();
  return (
    <div className="entry-content" ref={contentRef}>
      <p className="mb-5">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi ipsa
        consectetur minima voluptate nesciunt rerum ratione fugit saepe
        perspiciatis. Quo iste eos enim eligendi earum blanditiis aperiam rerum
        accusamus velit.
        <a
          href="http://google.com"
          className={`underline ${hovered ? "text-green-400" : ""}`}
          ref={nodeRef}
        >
          google.com
        </a>
        ?
      </p>
      <p className="mb-5">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi ipsa
        consectetur minima voluptate nesciunt rerum ratione fugit saepe
        perspiciatis. Quo iste eos enim eligendi earum blanditiis aperiam rerum
        accusamus velit .
        <a href="http://google.com" className="underline">
          google.com
        </a>{" "}
        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
      </p>
    </div>
  );
};

export default Blog;
