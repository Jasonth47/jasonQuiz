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
      { text: "Well-done", score: -2 },
      { text: "Medium", score: 1 },
      { text: "Medium-Rare", score: 2 },
      { text: "Rare", score: 1 },
      { text: "Im Vegan", score: 1 },
    ],
  },
  {
    id: "boyChoice",
    text: "question?",
    type: "multiple-choice",
    options: [
      { text: "boy", score: 1 },
      { text: "boy2", score: 2 },
      { text: "boy3", score: 3 },
      { text: "boy4", score: 4 },
    ],
  },
  {
    id: "girlChoice",
    text: "question2",
    type: "multiple-choice",
    options: [
      { text: "girl", score: 1 },
      { text: "girl2", score: 2 },
      { text: "girl3", score: 3 },
      { text: "girl4", score: 4 },
    ],
  },
];

const Question = (props) => {
  const { question, onAnswer } = props;
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

  return (
    <h2>
      You Finished, {answers.name}! Your final score is {finalScore}.
    </h2>
  );
};

function App() {
  const [showFinalResults, setFinalResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  const nextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setFinalResults(true);
    }
  };

  const handleAnswer = (questionId, answer) => {
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);
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
          />
          <br></br>
          <button onClick={nextQuestion} className="buttonNext">
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
