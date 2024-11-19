
import React from "react";

interface AnswerStatusProps {
  answerStatus: string;
}

const AnswerStatus: React.FC<AnswerStatusProps> = ({ answerStatus }) => {
    if(!answerStatus) return;
  return (
    // answerStatus && (
      <div className="mt-8 text-lg font-semibold text-center">
        {answerStatus}
      </div>
    // )
  );
};

export default AnswerStatus;
