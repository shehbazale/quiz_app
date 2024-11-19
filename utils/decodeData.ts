import quizData from "../app/questions.json";

const decodedData = quizData?.map((item) => ({
  ...item,
  category: decodeURIComponent(item.category),
  question: decodeURIComponent(item.question),
  correct_answer: decodeURIComponent(item.correct_answer),
  incorrect_answers: item.incorrect_answers.map(decodeURIComponent),
}));

export default decodedData;
