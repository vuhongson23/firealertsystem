import { Circle } from "rc-progress";
import React from "react";

const StatusBar = ({ value, maxValue }) => {
  const process = (value / maxValue) * 100;
  return (
    <div className="font-light relative flex items-end">
      <span className="absolute bottom-[17px] text-[34px]">0</span>
      <Circle
        className="w-[300px]"
        percent={process}
        strokeWidth={10}
        strokeColor="#5BBCFF"
        trailColor="#adb6bc"
        trailWidth={10}
        gapDegree={120}
      />
      <span className="absolute right-[-20px] top-[229px] text-[34px]">
        {maxValue}
      </span>
    </div>
  );
};

export default StatusBar;
