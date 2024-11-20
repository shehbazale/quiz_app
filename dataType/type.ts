
// ****************************** Next Question Data Type *******************
export interface QuestionProp {
    currentIndex: number;
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
    setOptionSelected: React.Dispatch<React.SetStateAction<boolean>>;
    setResultPage: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedAns: React.Dispatch<React.SetStateAction<string | null>>;
    setAnsStatus: React.Dispatch<React.SetStateAction<string>>;

    decodedData: any[]; 
  }
// ***************************************  Quesiton card data type *************************
  export interface QuestionCardProps {
    question: string;
    options: string[];
    selectedAns: string | null;
    correctAnswer: string | null;
    checkAnswer: (option: string) => void;
    optionSelected: boolean;
  }
// ***************************** Score bar data type *********************************
  export interface ScoreBarProps {
    correctRatio: number;
    lowestScore: number;
    maxScore: number;
  }
  // ********************************  Result page data type ************************
  export interface ResultPageProps {
    maxScore: number;
    restartQuiz: () => void
  }
// *************************************   Restart Quiz data type *******************
  interface ScoreState {
    maxScore: number | null;
    minScore: number | null;
    correctAnswer: number | null;
    solvedQuestions: number | null;
  };
  export interface RestartQuizParams {
    setResultPage: (value: boolean) => void;
    setCurrentIndex: (value: number) => void;
    setScore: React.Dispatch<React.SetStateAction<ScoreState>>;
    setOptionSelected: (value: boolean) => void;
    setAnsStatus: (value: string) => void;
  };



  // *****************************  check answer data type ******************
    interface Quiz {
    correct_answer: string;
    incorrect_answers: string[];
    category: string;
    difficulty: string;
    question: string;
  }
  export interface CheckAnswerParams {
    option: string;
    currentQuiz: Quiz;
    setSelectedAns: (value: string) => void;
    setOptionSelected: (value: boolean) => void;
    setAnsStatus: (value: string) => void;
    setScore: React.Dispatch<React.SetStateAction<{
      maxScore: number | null;
      minScore: number | null;
      correctAnswer: number | null;
      solvedQuestions: number | null;
    }>>;
    optionSelected: boolean;
    totalQuestions: number;
  }