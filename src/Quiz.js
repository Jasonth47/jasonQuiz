import React, { useState } from "react";

// const Quiz = () => {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [showScore, setShowScore] = useState(false);
//   const [score, setScore] = useState(0);

//   const questions = [
//     {
//       questionText: "What is the capital city of France?",
//       answerOptions: [
//         { answerText: "Berlin", isCorrect: false, score: 0 },
//         { answerText: "London", isCorrect: false, score: 0 },
//         { answerText: "Paris", isCorrect: true, score: 1 },
//         { answerText: "Madrid", isCorrect: false, score: 0 },
//       ],
//     },
//     {
//       questionText: "What is the largest country in the world?",
//       answerOptions: [
//         { answerText: "Canada", isCorrect: false, score: 0 },
//         { answerText: "Russia", isCorrect: true, score: 1 },
//         { answerText: "China", isCorrect: false, score: 0 },
//         { answerText: "Brazil", isCorrect: false, score: 0 },
//       ],
//     },
//     {
//       questionText: "What is the smallest continent in the world?",
//       answerOptions: [
//         { answerText: "Europe", isCorrect: false, score: 0 },
//         { answerText: "Asia", isCorrect: false, score: 0 },
//         { answerText: "Africa", isCorrect: false, score: 0 },
//         { answerText: "Australia", isCorrect: true, score: 2 },
//       ],
//     },
//   ];

//   const handleAnswerOptionClick = (isCorrect, score) => {
//     if (isCorrect) {
//       setScore(score + score);
//     } else {
//       setScore(score + 0);
//     }

//     const nextQuestion = currentQuestion + 1;
//     if (nextQuestion < questions.length) {
//       setCurrentQuestion(nextQuestion);
//     } else {
//       setShowScore(true);
//     }
//   };

//   const renderPopUpMessage = () => {
//     if (score === 0) {
//       return <div>You got 0 points. Better luck next time!</div>;
//     } else if (score < 3) {
//       return <div>You got {score} points. Not bad, but you can do better!</div>;
//     } else {
//       return <div>You got {score} points! Great job!</div>;
//     }
//   };

//   return (
//     <div className="quiz">
//       {showScore ? (
//         <div className="quiz-score">{renderPopUpMessage()}</div>
//       ) : (
//         <>{/* question and answer option code here */}</>
//       )}
//     </div>
//   );
// };

export default Quiz;
