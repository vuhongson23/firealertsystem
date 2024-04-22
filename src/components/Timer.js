import React, { useEffect, useState } from "react";

const Timer = () => {
  const [message, setMesage] = useState("VuHongSon");
  useEffect(() => {
    const timer = setInterval(() => {
      console.log(message);
    }, 2000);
    return () => {
      clearInterval(timer);
    };
  }, [message]);
  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => {
          setMesage(e.target.value);
        }}
      />
    </div>
  );
};

export default Timer;
