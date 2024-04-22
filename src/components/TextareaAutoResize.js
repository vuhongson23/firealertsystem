import React, { useEffect, useRef, useState } from "react";

const TextareaAutoResize = () => {
  const [text, setText] = useState("demo");
  const textareaRef = useRef(null);
  //const [textareaHeight, setTextareaHeight] = useState("auto");

  const handleChange = (event) => {
    setText(event.target.value);
  };

  useEffect(() => {
    // setTextareaHeight(`${textareaRef?.current?.scrollHeight}px`);
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    //textareaRef.current.style.height = `${textareaRef?.current?.scrollHeight}px`;
  }, [text]);

  return (
    <div className="p-5">
      <textarea
        className="overflow-hidden transition-all w-full max-w-[400px] p-5 rounded-lg border border-gray-300 resize-none leading-normal focus:border-blue-400"
        placeholder="Please enter your content..."
        value={text}
        ref={textareaRef}
        // style={{
        //   height: textareaHeight,
        // }}
        onChange={handleChange}
        rows={2}
      ></textarea>
    </div>
  );
};

export default TextareaAutoResize;
