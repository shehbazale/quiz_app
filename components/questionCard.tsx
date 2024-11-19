import React from "react";
import {QuestionCardProps} from '../dataType/type'
const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  options,
  selectedAns,
  checkAnswer,
  optionSelected,
  correctAnswer
}) => {
  return (
    <div className="mt-4">
      <p className="mt-4 ">{question}</p>
      <div className="mt-4">
        <ul className="list-none mt-6 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          {options?.map((option, i) => {
               const isCorrect = option === correctAnswer;
               const isSelected = selectedAns === option;
        return (
            <li
            className={`border border-gray-300 rounded-md p-2 hover:shadow-lg ${
              isSelected
                ? isCorrect ? "bg-green-300"  : "bg-red-400"  
                : ""
            } ${optionSelected ? "cursor-not-allowed" : "cursor-pointer"}`}
            key={i}
            onClick={() => checkAnswer(option)}
          >
            {option}
          </li>
            )  
          })}
        </ul>
      </div>
    </div>
  );
};

export default QuestionCard;
    