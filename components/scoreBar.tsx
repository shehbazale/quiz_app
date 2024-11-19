import React from "react";
import {ScoreBarProps} from '../dataType/type';

const ScoreBar: React.FC<ScoreBarProps> = ({ correctRatio, lowestScore, maxScore }) => {
  return (
    <div className="w-full mt-10">
      <div className="flex justify-between">
        <p>Score: {maxScore}%</p>
        <p>Max Score: {lowestScore}%</p>
      </div>
      <div className="h-6 w-full mx-auto border border-gray-300 rounded-sm relative">
        <div
          className="h-6 bg-gray-700 absolute top-0 left-0 z-20"
          style={{
            width: `${correctRatio}%`,
          }}
        ></div>
        <div
          className="h-6 bg-gray-300 absolute top-0 left-0 z-10"
          style={{
            width: `${lowestScore}%`,
          }}
        ></div>
        <div
          className="h-6 bg-black absolute top-0 left-0 z-30"
          style={{
            width: `${maxScore}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default ScoreBar;
