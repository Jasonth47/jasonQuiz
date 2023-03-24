import { useState } from "react";
import "./App.css";
import NameBar from "./NameBar";

const questions = [
  {
    text: "How would you order a steak?",
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
    options: [
      { id: 0, text: "boy", score: 1 },
      { id: 1, text: "boy2", score: 2 },
      { id: 2, text: "boy3", score: 3 },
      { id: 3, text: "boy4", score: 4 },
    ],
  },
  {
    text: "question2",
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
  const [data, setData] = useState({});

  const updateData = (nameParams) => {
    setData(nameParams);
  };

  const [showFinalResults, setFinalResults] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

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
          <h2></h2>
          <button></button>
        </div>
      ) : (
        <div className="question-card">
          <h2>
            Question {currentQuestion + 1} out of {questions.length}
          </h2>
          <h3 className="question-text">{questions[currentQuestion].text}</h3>

          <ul>
            {questions[currentQuestion].options.map((option) => {
              return (
                <li onClick={() => optionClicked(option.score)} key={option.id}>
                  {option.text}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* /* <Title /> */}
      {/* <NameBar callback={updateData} />
      <p>{"name" in data ? data["name"] : "No Data to display"}</p> */}
      {/* <NameInput />  */}
    </div>
  );
}

function Title() {
  return (
    <div>
      <h1>Whould We Be Friends?</h1>
    </div>
  );
}

// function ListAnswers(answers) {
//   const answerElements = [];
//   for (const [index, answer] of answers.entries()) {
//     answerElements.push(
//       <div>
//         <label htmlFor={index}>{answer}</label>
//         <input name="test" type="radio" id={index}></input>
//       </div>
//     );
//   }
//   return answerElements;
// }

// function NameInput() {
//   let elements = [];
//   for (const question of questions) {
//     elements.push(
//       <div>
//         <p>{question.question}</p>

//         <ul>{ListAnswers(question.answers)}</ul>
//       </div>
//     );
//   }
//   return <form>{elements}</form>;
// }

export default App;
