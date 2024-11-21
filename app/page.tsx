"use client";
import { useState, useEffect } from "react";
import decodedData from "@/utils/decodeData";
import QuizProgressBar from "../components/QuizProgressBar";
import QuestionCard from "../components/questionCard";
import AnswerStatus  from "../components/answerStatus"
import DifficultyStars from "../components/DifficultyStars";
import ScoreBar from "../components/ScoreBar";
import  { checkAnswer,nextQuestion, restartQuiz } from "../utils/helperFunction";
import ResultPage from "@/components/ResultPage";
import { ScoreProps } from "@/dataType/type";
const Home = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectAns, setSelectedAns] = useState<string | null>(null);
  const [answerStatus, setAnsStatus] = useState<string>("");
  const [score, setScore] = useState<ScoreProps>({
    maxScore: 0,
    minScore: 100,
    correctAnswer:0,
    solvedQuestions:0
  });
  const [optionSelected, setOptionSelected] = useState<boolean>(false);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [loading, setloading] = useState<boolean>(true);
  const [resultPage, setResultPage] = useState(false);
  const currentQuiz = decodedData[currentIndex];
  
  useEffect(() => {
    if (shuffledOptions.length === 0) {
      setloading(true);
    }
    const options = [
      ...currentQuiz.incorrect_answers,
      currentQuiz.correct_answer,
    ];
    const newArr = options.slice();
    for (let i = newArr.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
    }
    setShuffledOptions(newArr);
    const timeout = setTimeout(() => setloading(false), 500);
    return () => clearTimeout(timeout);
  }, [currentQuiz]);

 const nextQuestionData = {
    currentIndex,
    setCurrentIndex,
    setOptionSelected,
    setSelectedAns,
    setAnsStatus,
    decodedData,
    setResultPage
  };
  const handleNextQuestion = () => {
    nextQuestion(nextQuestionData);
  };
  const progress = ((currentIndex + 1) / decodedData.length) * 100;
  const correctRatio = (score.correctAnswer! / score.solvedQuestions!) * 100;
  const handleRestartQuiz = () => {
    restartQuiz({
      setResultPage: setResultPage,
      setCurrentIndex,
      setScore,
      setOptionSelected,
      setAnsStatus,
    });
  };
  const handleCheckAnswer = (option: string) => {
    checkAnswer({
      option,
      currentQuiz,
      setSelectedAns,
      setOptionSelected,
      setAnsStatus,
      setScore,
      optionSelected,
      totalQuestions: decodedData.length,
    });
  };

  return (
    <div className="w-[97%] md:w-[80%]  xl:w-1/2 mt-10 mx-auto border-4 border-gray-300 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
      {loading ? (
        <div className="flex justify-center items-center h-[600px]">
          <div className="animate-spin ease-linear rounded-full w-20 h-20 border-t-2 border-b-2 border-gray-500 ml-3"></div>
        </div>
      ) :
        (
          <>
            {resultPage ? (<>
              <ResultPage
                maxScore={score.maxScore!}
                restartQuiz={handleRestartQuiz}
              />
            </>) : (
              <>
                <QuizProgressBar progress={progress} />
                <div className="w-[80%] mx-auto m-4 md:m-10">
                  <h1>
                    Question {currentIndex + 1} of {decodedData.length}
                  </h1>
                  <h2 className="text-sm font-semibold">{currentQuiz?.category}</h2>
                  <DifficultyStars difficulty={currentQuiz?.difficulty} />
                  <QuestionCard
                    question={currentQuiz.question}
                    options={shuffledOptions}
                    selectedAns={selectAns}
                    checkAnswer={handleCheckAnswer}
                    optionSelected={optionSelected}
                    correctAnswer={currentQuiz.correct_answer}
                  />
                  <AnswerStatus answerStatus={answerStatus} />
                  <div className="flex justify-center items-center mt-4">
                    <button
                      onClick={handleNextQuestion}
                      className={`mt-4 px-4 py-2 rounded ${optionSelected
                        ? "bg-[#c0c3c7] transition-all ease-in-out duration-500 hover:bg-[#dcdfe2] hover:shadow-lg text-black cursor-pointer"
                        : "bg-[#F1F5F9] text-gray-500 cursor-not-allowed"
                        }`}
                      disabled={!optionSelected}
                    >
                      Next Question
                    </button>
                  </div>
                  <ScoreBar
                    correctRatio={correctRatio}
                    lowestScore={score.minScore!}
                    maxScore={score.maxScore!}
                  />
                </div>
              </>
            )}

          </>
        )}
    </div>
  );
};
export default Home;
