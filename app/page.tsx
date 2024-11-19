'use client'
import { useState, useMemo, useCallback, useEffect } from "react";
import decodedData from "@/utils/decodeData";
import QuizProgressBar from "../components/quizProgressBar";
import QuestionCard from "../components/questionCard";
import AnswerStatus from "../components/answerStatus";
import DifficultyStars from "../components/difficultyStars";
import ScoreBar from "../components/scoreBar";
import {nextQuestion} from "../utils/helperFunction";
const Home = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectAns, setSelectedAns] = useState<string | null>(null);
  const [answerStatus, setAnsStatus] = useState<string>("");
  const [maxScore, setMaxScore] = useState<number>(0);
  const [lowestScore, setLowestScore] = useState<number>(100);
  // const [score, setScore] = useState<{
  //   lowestScore: number,
  //   maximumScore: number
  // }>({
  //   lowestScore: null,
  //   maximumScore: null
  // });
  const [optionSelected, setOptionSelected] = useState<boolean>(false);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [solvedQuestions, setSolvedQuestions] = useState<number>(0);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const currentQuiz = decodedData[currentIndex];
  useEffect(() => {
    const options = [...currentQuiz.incorrect_answers,currentQuiz.correct_answer ];
    const newArr = options.slice();
    for (let i = newArr.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
    }
    setShuffledOptions(newArr);
  }, [currentQuiz]);
  const checkAnswer = useCallback(
    (option: string) => {
      if (!optionSelected) {
        setSelectedAns(option);
        setOptionSelected(true);
        const isCorrect = option === currentQuiz.correct_answer;
        setAnsStatus(isCorrect ? "Correct" : "Incorrect");
        const mark = 100 / decodedData.length;
        if (isCorrect) {
          setCorrectAnswers((prev) => prev + 1);
          setMaxScore((prevScore) => prevScore + mark);
        } else {
          setLowestScore((prevScore) => prevScore - mark);
        }
        setSolvedQuestions((prev) => prev + 1);
      }
    },
    [currentQuiz, lowestScore, maxScore, optionSelected]
  );
     const nextQuestionData = {currentIndex, setCurrentIndex, setOptionSelected, setSelectedAns,  setAnsStatus,decodedData}
   const handleNextQuestion = () =>{
    nextQuestion( nextQuestionData)
   }
  const progress = ((currentIndex + 1) / decodedData.length) * 100;
  const correctRatio = (correctAnswers / solvedQuestions) * 100;
  return (
    <div className="w-[97%]   md:w-1/2 mt-10 mx-auto border-4 border-gray-300 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
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
          checkAnswer={checkAnswer}
          optionSelected={optionSelected}
          correctAnswer={currentQuiz.correct_answer}
        />
        <AnswerStatus answerStatus={answerStatus} />
        <div className="flex justify-center items-center mt-4">
          <button
            onClick={handleNextQuestion}
            className={`mt-4 px-4 py-2 rounded ${optionSelected
              ? "bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            disabled={!optionSelected}
          >
            Next Question
          </button>
        </div>
        <ScoreBar correctRatio={correctRatio} lowestScore={lowestScore} maxScore={maxScore} />

      </div>
    </div>
  );
};

export default Home;

