// 1. Tạo component có tên Tooltip.js
// 2. Compoenents này có props children, props text
// 3. Áp dụng portal để khi rê chuột vào text thì sẽ hiển thị tooltip content ở phía trên và chính giữa đoạn text
// 4. Dùng kiến thức đã học ở video trước, sử dụng getBoundingClientRect()

import React, { useState } from "react";
import useHover from "../hooks/useHover";
import ReactDom from "react-dom";

const Tooltip = ({ children, text }) => {
  const { hovered, nodeRef } = useHover();
  const [coords, setCoords] = useState({});
  const handleHover = (e) => {
    setCoords(e.target.getBoundingClientRect());
    console.log(e.target.getBoundingClientRect());
  };
  return (
    <div>
      {hovered && <TooltipContent coords={coords}>{children}</TooltipContent>}
      <span className="font-semibold" ref={nodeRef} onMouseOver={handleHover}>
        {text}
      </span>
    </div>
  );
};

function TooltipContent({ children, coords }) {
  return ReactDom.createPortal(
    <p
      className="p-3 text-white bg-black rounded-xl inline-block absolute -translate-y-full -translate-x-2/4 max-w-[200px]"
      style={{
        top: coords.top - coords.height / 2 + window.scrollY,
        left: coords.left + coords.width / 2,
      }}
    >
      {children}
    </p>,
    document.querySelector("body")
  );
}

export default Tooltip;
