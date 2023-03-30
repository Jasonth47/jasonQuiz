import { useEffect, useState } from "react";
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
      { text: "Well-Done", score: -5 },
      { text: "Medium-Well", score: -1 },
      { text: "Medium", score: 2 },
      { text: "Medium-Rare", score: 3 },
      { text: "Rare", score: 0 },
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
      { text: "4", score: 3 },
      { text: "6", score: 4 },
      { text: "8", score: 2 },
      { text: "10", score: 0 },
    ],
  },
  {
    id: "drink",
    text: "Alcholics drink of choice?",
    type: "multiple-choice",
    options: [
      { text: "Old Fashioned", score: 3 },
      { text: "Wine", score: 2 },
      { text: "Beer", score: 4 },
      { text: "Martini", score: 0 },
      { text: "Shots of Tequila", score: 1.5 },
      { text: "I dont drink", score: 1 },
    ],
  },
  {
    id: "introv",
    text: "How introvrted are you?",
    type: "multiple-choice",
    options: [
      { text: "full introvert", score: 0 },
      { text: "somewhat introvert", score: 3 },
      { text: "somewhat extrovert", score: 2 },
      { text: "full exrovert", score: 1 },
    ],
  },
  {
    id: "gym",
    text: "Do you even lift?",
    type: "multiple-choice",
    options: [
      { text: "I enjoy the otudoors", score: 2 },
      { text: "I lift more than you?", score: 3 },
      { text: "Gym rat", score: 4 },
      { text: "I dont get off the couch", score: 0 },
    ],
  },
  {
    id: "music",
    text: "Favorite genre of music?",
    type: "multiple-choice",
    options: [
      { text: "Hip-Hop/R&B", score: 4 },
      { text: "Country", score: 1 },
      { text: "Indie", score: 3 },
      { text: "Pop", score: 0 },
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

const fetchActivity = async (setActivity) => {
  const response = await fetch(
    "https://www.boredapi.com/api/activity?type=social&type=relaxation"
  );
  const data = await response.json();
  console.log(data);
  setActivity(data.activity);
};

const Results = (props) => {
  const { answers } = props;
  const [activity, setActivity] = useState(null);
  let finalScore = 0;

  for (const key in answers) {
    const answer = parseInt(answers[key]);
    if (!isNaN(answer)) {
      finalScore += answer;
    }
  }
  useEffect(() => {
    fetchActivity(setActivity);
  }, []);

  if (finalScore < 10) {
    return (
      <p>
        We seem to have different intrest. Maybe we could exchange hobbies
        sometime? <br></br>
        <a
          href="https://www.linkedin.com/in/jason-howell-27b34a26a/"
          id="linkLogo"
        >
          Linkedin
        </a>
      </p>
    );
  } else if (finalScore < 16) {
    return (
      <p>
        We should be friends! <br></br>
        <a
          href="https://www.linkedin.com/in/jason-howell-27b34a26a/"
          id="linkLogo"
        >
          Linkedin
        </a>
      </p>
    );
  } else {
    return (
      <p>
        Hey Bro! We should be friends since you scored so high! Maybe we could
        do this random activity that my Bored API picked -{activity} <br></br>
        <a
          href="https://www.linkedin.com/in/jason-howell-27b34a26a/"
          id="linkLogo"
        >
          Linkedin
        </a>
      </p>
    );
  }
};

// const Activity() {
//   useEffect(() => {
//     fetch("https://www.boredapi.com/api/activity?type=social&type=relaxation")
//       .then((response) => response.json())
//       .then((json) => console.log(json));
//   }, []);

// }

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
