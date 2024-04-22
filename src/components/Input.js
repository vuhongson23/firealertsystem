import React, { useEffect, useRef } from "react";

const Input = () => {
  const divRef = useRef();
  const inputRef = useRef();
  useEffect(() => {
    // console.log(divRef.current);
    // if (divRef.current) divRef.current.style.backgroundColor = "red";
    inputRef.current.focus();
    if (inputRef.current) inputRef.current.focus();
  }, []);
  console.log(divRef.current);
  return (
    <div className="input-div" ref={divRef}>
      <input
        type="text"
        ref={inputRef}
        placeholder="Auto focus input"
        className="inline-block p-5 border border-gray-200 focus:border-blue-500 m-4"
      />
    </div>
  );
};

export default Input;
