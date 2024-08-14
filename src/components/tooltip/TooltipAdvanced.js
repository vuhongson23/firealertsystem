import React, { useState } from "react";
import Portal from "../Portal";
import { CSSTransition } from "react-transition-group";

const TooltipAdvanced = ({ title, children }) => {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({
    top: 0,
    left: 0,
    height: 0,
    width: 0,
  });
  const handleMouseEnter = (e) => {
    setCoords(e.target.getBoundingClientRect());
    setVisible(true);
  };
  const handleMouseLeave = () => {
    setVisible(false);
  };
  return (
    <div className="relative inline-block">
      <CSSTransition in={visible} classNames="fade" timeout={300} unmountOnExit>
        {(status) => (
          <Portal visible={status !== "exited"} overlay={false}>
            <p
              className="p-3 text-white bg-black rounded-xl inline-block absolute -translate-y-full -translate-x-2/4 max-w-[200px] tooltip transition-all"
              style={{
                top: coords.top - coords.height / 2 + window.scrollY,
                left: coords.left + coords.width / 2,
              }}
            >
              {children}
            </p>
          </Portal>
        )}
      </CSSTransition>
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {title}
      </div>
    </div>
  );
};

export default TooltipAdvanced;
