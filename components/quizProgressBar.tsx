
import React from "react";

interface QuizProgressBarProps {
  progress: number;
}

const QuizProgressBar: React.FC<QuizProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full bg-gray-200 h-3 mb-4">
      <div className="bg-blue-400 h-3" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default QuizProgressBar;
