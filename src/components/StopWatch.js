import React, { useEffect, useRef, useState } from "react";

const StopWatch = () => {
  // NOTE: Khi state thay đổi thì re-render lại component còn ref thì không
  // useState: sync || useRef: async

  // const [count, setCount] = useState(0);
  // const countRef = useRef(0);
  // const handle = () => {
  //   const updateCount = countRef.current + 1;
  //   console.log(`Clicked ${updateCount} times`);
  //   countRef.current++;
  // };
  // console.log("render");

  const timerRef = useRef(null);
  const [count, setCount] = useState(0);
  const handleStart = () => {
    if (timerRef.current) return;
    timerRef.current = setInterval(() => {
      setCount((counter) => counter + 1);
    }, 1000);
    console.log(timerRef.current);
  };
  const handleStop = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };
  const handleReset = () => {
    setCount(0);
  };
  console.log("render");
  useEffect(() => {
    // side-effect
    return () => clearInterval(timerRef.current);
  }, []);
  return (
    <div>
      <h3>Timer: {count}s</h3>
      <div>
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default StopWatch;
