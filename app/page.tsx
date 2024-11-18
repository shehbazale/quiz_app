
"use client";

import { useEffect, useState } from "react";
import quizData from "./questions.json";
import { Question } from "./datatype";
export default function Home() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectAns, setSelectedAns] = useState<string | null >(null);
  const [answerStatus, setAnsStatus] = useState<string>("");
  const [maxScore, setMaxScore] =useState(100)
// function to replace  % with space 
  const decodedData = quizData.map((item) => ({
    ...item,
    category: decodeURIComponent(item.category),
    question: decodeURIComponent(item.question),
    correct_answer: decodeURIComponent(item.correct_answer),
    incorrect_answers: item.incorrect_answers.map(decodeURIComponent),
  }));
  // console.log('decode data is =>',decodedData)
// function to show star based on difficulty level
const renderDifficultyStars = (difficulty:any) => {
  let stars = 0;

  if (difficulty === "easy") {
    stars = 1;
  } else if (difficulty === "medium") {
    stars = 2;
  } else if (difficulty === "hard") {
    stars = 3;
  }

  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          fill={i < stars ? "light-gray" : "gray"}
          viewBox="0 0 24 24"
          width="15"
          height="15"
        >
          <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" />
        </svg>
      ))}
    </div>
  );
};
// function to navigate to next questions
  const handleNextQuestion = () => {
    if (currentIndex < decodedData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      
    } else {
      alert("You have reached the end of the quiz!");
    }
  };

  const currentQuiz = decodedData[currentIndex]; 
  // track progrss

const progress = ((currentIndex+1) / decodedData.length) * 100; 


//*************************** function to check answer
const checkAnswer = (option:string) =>{
  setSelectedAns(option);
  const isCorrect = option === currentQuiz.correct_answer;
  setAnsStatus(isCorrect ? 'Correct' : 'Incorrect');

  console.log('option clicked',option)
      
      setMaxScore(100);
      setAnsStatus(option === currentQuiz.correct_answer ? 'Correct' : 'Incorrect');
}

//**************************** function to randomly generate the options
  // useEffect(()=>{


  // },[])
const options = [...currentQuiz.incorrect_answers, currentQuiz.correct_answer];

const getShuffledArr = (options:string[]) => {
  const newArr = options.slice()
  // newArr[3]
  console.log('newArr', newArr);
  
  for (let i = newArr.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
  }
  return newArr
};

const shuffledOptions = getShuffledArr(options)
console.log('shuffled array',shuffledOptions)


  return (
    <div className="w-1/2 mt-10 mx-auto border-4 border-gray-300 ">
      <div className="w-full bg-gray-200 h-2 mb-4">
        <div className="bg-blue-400 h-2" style={{width:`${progress}%`}}></div>

      </div>
      <div className="w-[80%] mx-auto m-10">
      <h1>
        Question {currentIndex + 1} / {decodedData.length}
      </h1>
      <div className="">
        <h2 className="text-sm font-semibold">{currentQuiz.category}</h2>
        <div className="text-sm"> {renderDifficultyStars(currentQuiz.difficulty)}</div>
        <p className="mt-4">{currentQuiz.question}</p>
        <div className="mt-4">
         
          <ul className="list-none  mt-12 grid grid-cols-2 gap-4">
            {shuffledOptions.map(
              (option, i) => (
              
                <li className={`border rounded-md p-2 hover:cursor-pointer hover:shadow-lg ${selectAns === 
                  option ? option === currentQuiz.correct_answer ? 'bg-green-300' : 'bg-red-500' :''
                }`} key={i}
                onClick={()=>checkAnswer(option)}
                >{option}</li>
              )
            )}
          </ul>
        </div>
              {/* show answer */}
              {answerStatus && (
            <div className="mt-4 text-lg font-semibold text-center">
              {answerStatus}
            </div>
          )}

        <div className="flex justify-center items-center mt-6">
        <button
          onClick={handleNextQuestion}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
          Next Question
        </button>
          </div>
          </div>

          {/* progress  */}
      <div className="h-6 w-[80%] mx-auto border border-gray-300 rounded-sm mt-6">

</div>
      </div>

    </div>
  );
}
