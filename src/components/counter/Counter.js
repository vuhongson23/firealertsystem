import React, { useEffect, useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  //   const handleIncrease = () => {
  //     setTimeout(function delay() {
  //       setCount((count) => count + 1);
  //     }, 1000);
  //   };
  const [info, setInfor] = useState({
    firstName: "Vu",
    lastName: "Son",
  });
  useEffect(() => {
    console.log("From input");
  }, [count]);
  console.log("check");
  return (
    <div className="p-5 flex gap-x-4 items-center">
      <input
        type="text"
        name="lastName"
        value={info.lastName}
        onChange={(e) => {
          setInfor({
            ...info,
            lastName: e.target.value,
          });
        }}
      />
      <span className="text-2xl font-bold">{count}</span>
      <button
        onClick={() => setCount(count + 1)}
        className="inline-block p-3 bg-green-500 text-white"
      >
        Increment
      </button>
    </div>
  );
};

export default Counter;
