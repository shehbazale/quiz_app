import  DecodedData  from "@/utils/decodeData";
  import {QuestionProp,RestartQuizParams,CheckAnswerParams} from '../dataType/type'
// ****************************  Next Question function ********************
  export const nextQuestion = ({
    currentIndex,
    setCurrentIndex,
    setOptionSelected,
    setSelectedAns,
    setAnsStatus,
    decodedData,
    setResultPage,
  }: QuestionProp) => {
    if (currentIndex < decodedData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setOptionSelected(false);
      setSelectedAns(null);
      setAnsStatus("");
    } else {
      setResultPage(true);
    }
  };
  // ******************  function to Restart the quiz ******************
  export const restartQuiz = ({
    setResultPage,
    setCurrentIndex,
    setScore,
    setOptionSelected,
    setAnsStatus,
  }: RestartQuizParams) => {
    setResultPage(false);
    setCurrentIndex(0);
    setScore((prev) => ({
      ...prev,
      maxScore: 0,
    }));
    setScore((prev) => ({
      ...prev,
      correctAnswer: 0,
    }));
    setScore((prev) => ({
      ...prev,
      minScore: 100,
    }));
    setScore((prev) => ({
      ...prev,
      solvedQuestions: 0,
    }));
    setOptionSelected(false);
    setAnsStatus(" ");
  };

  //  ***************************   
  export const checkAnswer = ({
    option,
    currentQuiz,
    setSelectedAns,
    setOptionSelected,
    setAnsStatus,
    setScore,
    optionSelected,
    totalQuestions,
  }: CheckAnswerParams) => {
    if (!optionSelected) {
      setSelectedAns(option);
      setOptionSelected(true);
  
      const isCorrect = option === currentQuiz.correct_answer;
      setAnsStatus(isCorrect ? "Correct" : "Incorrect");
  
      const mark = 100 / totalQuestions;
  
      setScore((prev) => ({
        ...prev,
        solvedQuestions: prev.solvedQuestions! + 1,
        ...(isCorrect
          ? {
              correctAnswer: prev.correctAnswer! + 1,
              maxScore: prev.maxScore! + mark,
            }
          : {
              minScore: prev.minScore! - mark,
            }),
      }));
    }
  };
  
