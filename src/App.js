import React, { useState } from "react";
import "./App.css";
import Franguinho from "./assets/franguinho.jpg";
import {
  BsFillPauseFill,
  BsFillPlayFill,
  BsFillSkipBackwardFill,
  BsFillSkipForwardFill,
} from "react-icons/bs";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);

  const getButton = (isPlaying) => {
    if (isPlaying) {
      return <BsFillPauseFill className="buttonIcons" />;
    } else {
      return <BsFillPlayFill className="buttonIcons" />;
    }
  };

  return (
    <div className="App">
      <div className="Content">
        <div id="PlayerOne" className="Player">
          <div className="Image">
            <img
              className="Image"
              id="ImageOne"
              src={Franguinho}
              alt="Img"
            ></img>
          </div>
          <div className="Text">
            <p id="Name">Franguinho na Panela</p>
            <p id="Author">Lourenço e Lorival</p>
          </div>
          <div className="buttons">
            <button className="buttonsComponent">
              {<BsFillSkipBackwardFill className="buttonIcons" />}
            </button>
            <button
              className="buttonsComponent"
              onClick={() => {
                setIsPlaying(!isPlaying);
              }}
            >
              {getButton(isPlaying)}
            </button>
            <button className="buttonsComponent">
              {<BsFillSkipForwardFill className="buttonIcons" />}
            </button>
            <div>
              <audio src="./songs/Franguinho Na Panela   Lourenço u0026 Lourival  (2002[1].mp3"></audio>
            </div>
          </div>
        </div>
        <div className="PlayerH">
          <div id="PlayerTwo" className="Player">
            2
          </div>
          <div id="PlayerThree" className="Player">
            3
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
