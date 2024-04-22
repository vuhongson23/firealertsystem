import React from "react";
import useClickOutSide from "./hooks/useClickOutSide";

const Dropdown = () => {
  const { show, setShow, nodeRef } = useClickOutSide();
  return (
    <div className="relative w-full max-w-[400px]" ref={nodeRef}>
      <div
        className="p-5 border-gray-200 rounded-lg border cursor-pointer w-full"
        onClick={() => setShow(!show)}
      >
        Selected
      </div>
      {show && (
        <div className="p-5 border border-gray-200 rounded-lg absolute top-full left-0 w-full bg-white">
          <div className="p-5 cursor-pointer border-b border-b-gray-100">
            Javascript
          </div>
          <div className="p-5 cursor-pointer border-b border-b-gray-100">
            ReactJS
          </div>
          <div className="p-5 cursor-pointer">VueJS</div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
