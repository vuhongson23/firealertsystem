import { Circle } from "rc-progress";
import React from "react";

const StatusBar = ({ value, maxValue }) => {
  const process = (value / maxValue) * 100;
  return (
    <div className="font-light relative flex items-end">
      <span className="absolute bottom-[8px]">0</span>
      <Circle
        className="w-[150px]"
        percent={process}
        strokeWidth={10}
        strokeColor="#5BBCFF"
        trailWidth={10}
        gapDegree={120}
      />
      <span className="absolute right-[-8px] top-[119px]">{maxValue}</span>
    </div>
  );
};

export default StatusBar;
