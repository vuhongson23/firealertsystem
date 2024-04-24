import React, { useState } from "react";
import "./ToggleStyle.css";

const Toggle = () => {
  // 1. enable state: useState (initialize value)
  // 2. initialize state: useState(false)
  // 3. reading state:
  // 4. update state
  const [on, setOn] = useState(false);
  const handleClick = () => {
    setOn((on) => !on);
  };
  return (
    <div>
      <div className={`toggle ${on ? "active" : ""}`} onClick={handleClick}>
        <div className={`spinner ${on ? "active" : ""}`}></div>
      </div>
    </div>
  );
};

export default Toggle;
