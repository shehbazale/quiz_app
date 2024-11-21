import React from "react";
import { QuizScoreBarProps } from "../dataType/type";

const QuizScoreBar: React.FC<QuizScoreBarProps> = ({
  correctRatio,
  lowestScore,
  maxScore,
}) => {

  const baseClass = "h-full absolute top-0 left-0 transition-all ease-in-out duration-500";
  return (
    <div className="w-full mt-10">
      <div className="flex justify-between">
        <p>Score: {maxScore}%</p>
        <p>Max Score: {lowestScore}%</p>
      </div>
      <div className="h-8 w-full mx-auto border border-slate-400  rounded-md relative overflow-hidden">
        <div
          className={`${baseClass} bg-[#6B7280] z-20`}
          style={{
            width: `${correctRatio}%`,
          }}
        ></div>
        <div
          className={`${baseClass} bg-[#9CA3AF] z-10`}
          style={{
            width: `${lowestScore}%`,
          }}
        ></div>
        <div
          className={`${baseClass} bg-[#000000] z-30`}
          style={{
            width: `${maxScore}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default QuizScoreBar;
