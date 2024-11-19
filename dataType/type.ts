export interface QuestionProp {
    currentIndex: number;
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
    setOptionSelected: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedAns: React.Dispatch<React.SetStateAction<string | null>>;
    setAnsStatus: React.Dispatch<React.SetStateAction<string>>;
    decodedData: any[]; 
  }

  export interface QuestionCardProps {
    question: string;
    options: string[];
    selectedAns: string | null;
    correctAnswer: string | null;
    checkAnswer: (option: string) => void;
    optionSelected: boolean;
  }

  export interface ScoreBarProps {
    correctRatio: number;
    lowestScore: number;
    maxScore: number;
  }