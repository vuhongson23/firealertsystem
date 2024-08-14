import React, { useState } from "react";
import useClickOutSide from "./hooks/useClickOutSide";
import ReactDom from "react-dom";

const DropDownPortal = () => {
  const { show, setShow, nodeRef } = useClickOutSide();
  const [coords, setCoords] = useState({});
  const handleClick = (e) => {
    console.log(nodeRef.current.getBoundingClientRect());
    setCoords(nodeRef.current.getBoundingClientRect());
    setShow(true);
  };
  return (
    <div className="relative w-full max-w-[400px]" ref={nodeRef}>
      <div
        className="p-5 border-gray-200 rounded-lg border cursor-pointer w-full"
        onClick={handleClick}
      >
        Selected
      </div>
      {show && <DropDownList coords={coords}></DropDownList>}
    </div>
  );
};

function DropDownList({ coords }) {
  if (typeof document === "undefined") return null;
  return ReactDom.createPortal(
    <div
      className="p-5 border border-gray-200 rounded-lg absolute top-full left-0 w-full bg-white"
      style={{
        left: coords.left,
        top: coords.top + coords.height + window.scrollY,
        width: coords.width,
      }}
    >
      <div className="p-5 cursor-pointer border-b border-b-gray-100">
        Javascript
      </div>
      <div className="p-5 cursor-pointer border-b border-b-gray-100">
        ReactJS
      </div>
      <div className="p-5 cursor-pointer">VueJS</div>
    </div>,
    document.querySelector("body")
  );
}

export default DropDownPortal;
