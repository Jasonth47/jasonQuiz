import { useState } from "react";

function NameBar(props) {
  const [name, setName] = useState("");

  const nameButtonPressed = () => {
    props.callback({ name: name });
    console.log(name);
  };

  return (
    <div>
      <form>
        <label htmlFor="name-field">Whats your First Name?</label>
        <input
          id="name-feild"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <button type="button" onClick={nameButtonPressed}>
          Start Quiz
        </button>
      </form>
    </div>
  );
}

export default NameBar;
