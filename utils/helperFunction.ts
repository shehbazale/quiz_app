
  import {QuestionProp} from '../dataType/type'
  export const nextQuestion = ({
    currentIndex,
    setCurrentIndex,
    setOptionSelected,
    setSelectedAns,
    setAnsStatus,
    decodedData,
  }: QuestionProp) => {
    if (currentIndex < decodedData.length - 1) {
      setCurrentIndex(currentIndex + 1); 
      setOptionSelected(false); 
      setSelectedAns(null); 
      setAnsStatus(""); 
    } else {
      alert("You have reached the end of the quiz!"); 
    }
  };
  