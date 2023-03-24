import { useState } from "react";
import "./App.css";

const questions = [
  { text: "what is you name?", type: "text", options: [] },
  {
    text: "How would you order a steak?",
    type: "multiple-choice",
    options: [
      { id: 0, text: "Well-done", score: -2 },
      { id: 1, text: "Medium", score: 1 },
      { id: 2, text: "Medium-Rare", score: 2 },
      { id: 3, text: "Rare", score: 1 },
      { id: 4, text: "Im Vegan", score: 1 },
    ],
  },
  {
    text: "question?",
    type: "multiple-choice",
    options: [
      { id: 0, text: "boy", score: 1 },
      { id: 1, text: "boy2", score: 2 },
      { id: 2, text: "boy3", score: 3 },
      { id: 3, text: "boy4", score: 4 },
    ],
  },
  {
    text: "question2",
    type: "multiple-choice",
    options: [
      { id: 0, text: "girl", score: 1 },
      { id: 1, text: "girl2", score: 2 },
      { id: 2, text: "girl3", score: 3 },
      { id: 3, text: "girl4", score: 4 },
    ],
  },
  // {
  //   text: "question3",
  //   options: [9, 10, 11, 12],
  // },
];

function App() {
  const [showFinalResults, setFinalResults] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const renderInput = (type, options) => {
    if (type === "text") {
      return <input type="text"></input>;
    } else if (type === "multiple-choice") {
      return (
        <ul>
          {questions[currentQuestion].options.map((option, index) => {
            return (
              <div>
                <label>
                  <input type="radio" name="answers" value={option.text} />
                  {option.text}
                </label>
              </div>
            );
          })}
        </ul>
      );
    }
  };

  const nextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  const optionClicked = (questionScore) => {
    setScore(score + questionScore);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setFinalResults(true);
    }
  };
  console.log(score);

  return (
    <div className="App">
      <h1>would we be friends</h1>
      <h2>score:{score}</h2>

      {showFinalResults ? (
        <div clasName="final-results">
          <h2>Nick</h2>
          <button></button>
        </div>
      ) : (
        <div className="question-card">
          <h2>
            Question {currentQuestion + 1} out of {questions.length}
          </h2>
          <h3 className="question-text">{questions[currentQuestion].text}</h3>
          {renderInput(
            questions[currentQuestion].type,
            questions[currentQuestion].options
          )}
          <br></br>
          <button onClick={nextQuestion}>Next</button>
        </div>
      )}
    </div>
  );
}

export default App;
