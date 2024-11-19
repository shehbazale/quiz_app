import React from "react";
import { ScoreBarProps } from "../dataType/type";

const ScoreBar: React.FC<ScoreBarProps> = ({
  correctRatio,
  lowestScore,
  maxScore,
}) => {
  return (
    <div className="w-full mt-10">
      <div className="flex justify-between">
        <p>Score: {maxScore}%</p>
        <p>Max Score: {lowestScore}%</p>
      </div>
      <div className="h-8 w-full mx-auto border border-slate-400  rounded-md relative overflow-hidden">
        <div
          className="h-full bg-[#6B7280] absolute top-0 left-0 z-20 transition-all ease-in-out duration-500"
          style={{
            width: `${correctRatio}%`,
          }}
        ></div>
        <div
          className="h-full bg-[#9CA3AF] absolute top-0 left-0 z-10 transition-all ease-in-out duration-500"
          style={{
            width: `${lowestScore}%`,
          }}
        ></div>
        <div
          className="h-full bg-[#000000] absolute top-0 left-0 z-30 transition-all ease-in-out duration-500"
          style={{
            width: `${maxScore}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default ScoreBar;
