import React from "react";

interface QuizProgressBarProps {
  progress: number;
}

const QuizProgressBar: React.FC<QuizProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full bg-gray-200 h-4 mb-4">
      <div
        className="bg-[#BDC3C7] h-4 transition-all duration-500"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default QuizProgressBar;
