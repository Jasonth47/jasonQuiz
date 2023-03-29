import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import "./App.css";
import useWindowSize from "./useWindowSize";

const questions = [
  {
    id: "name",
    text: "what is you name?",
    type: "text",
  },
  {
    id: "steak",
    text: "How would you order a steak?",
    type: "multiple-choice",
    options: [
      { text: "Well-done", score: -5 },
      { text: "Medium", score: 1 },
      { text: "Medium-Rare", score: 2 },
      { text: "Rare", score: 1 },
      { text: "Im Vegan", score: 1 },
    ],
  },
  {
    id: "nerd",
    text: "How much of a NERD are you?",
    type: "multiple-choice",
    options: [
      { text: "0", score: -2 },
      { text: "2", score: 1 },
      { text: "4", score: 1 },
      { text: "6", score: 2 },
      { text: "8", score: 1 },
      { text: "10", score: 0 },
    ],
  },
  {
    id: "drink",
    text: "Alcholics drink of choice?",
    type: "multiple-choice",
    options: [
      { text: "Old Fashioned", score: 2 },
      { text: "Sweet Wine", score: 0 },
      { text: "Beer", score: 2 },
      { text: "Martini", score: 0 },
      { text: "Shots of Tequila", score: 1 },
      { text: "I dont drink", score: 1 },
    ],
  },
  {
    id: "dog",
    text: "How introvrted are you?",
    type: "multiple-choice",
    options: [
      { text: "full introvert", score: 0 },
      { text: "somewhat introvert", score: 2 },
      { text: "somewhat extrovert", score: 2 },
      { text: "full exrovert", score: 0 },
    ],
  },
  {
    id: "cat",
    text: "question5",
    type: "multiple-choice",
    options: [
      { text: "cat", score: 1 },
      { text: "cat2", score: 2 },
      { text: "cat3", score: 3 },
      { text: "cat4", score: 4 },
    ],
  },
  {
    id: "car",
    text: "question6",
    type: "multiple-choice",
    options: [
      { text: "car", score: 1 },
      { text: "car2", score: 2 },
      { text: "car3", score: 3 },
      { text: "car4", score: 4 },
    ],
  },
];

const Question = (props) => {
  const { question, onAnswer, isChecked } = props;
  const { type, options, id: questionId } = question;

  const handleAnswerChange = (event) => {
    onAnswer(event.target.name, event.target.value);
  };

  if (type === "text") {
    return (
      <input
        type="text"
        name={questionId}
        onChange={handleAnswerChange}
      ></input>
    );
  } else if (type === "multiple-choice") {
    return (
      <div>
        {options.map((option, index) => {
          return (
            <div key={index} className="choices">
              <label>
                <input
                  type="radio"
                  name={questionId}
                  value={option.score}
                  onChange={handleAnswerChange}
                  checked={isChecked(questionId, option.score)}
                />

                {option.text}
              </label>
            </div>
          );
        })}
      </div>
    );
  }
};

const Results = (props) => {
  const { answers } = props;
  let finalScore = 0;

  for (const key in answers) {
    const answer = parseInt(answers[key]);
    if (!isNaN(answer)) {
      finalScore += answer;
    }
  }

  if (finalScore < 5) {
    return <p>final Score &gt; 5</p>;
  } else if (finalScore < 10) {
    return <p>final Score &gt; 10</p>;
  } else if (finalScore < 15) {
    return <p>final Score &gt; 15</p>;
  } else {
    return <p>more than 15</p>;
  }
};

function App() {
  const [showFinalResults, setFinalResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isAnswerSelected, setIsAnswerSelected] = useState(false); // new state variable
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  const nextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setIsAnswerSelected(false);
    } else {
      setFinalResults(true);
    }
  };

  const handleAnswer = (questionId, answer) => {
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);
    setIsAnswerSelected(answer ? true : false);
  };

  const isChecked = (questionId, optionScore) => {
    return answers[questionId] == optionScore;
  };

  return (
    <div className="app">
      <h1>Would We Be Friends?</h1>
      <h2 className="answers">Answers:{JSON.stringify(answers)}</h2>

      {showFinalResults ? (
        <Results answers={answers} />
      ) : (
        <div className="question-card">
          <h2 className="quest-count">
            Question {currentQuestion + 1} out of {questions.length}
          </h2>
          <h3 className="question-text">{questions[currentQuestion].text}</h3>
          <Question
            question={questions[currentQuestion]}
            onAnswer={handleAnswer}
            isChecked={isChecked}
          />
          <br></br>
          <button
            onClick={nextQuestion}
            className="buttonNext"
            disabled={!isAnswerSelected}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
