import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Franguinho from "./assets/franguinho.jpg";
import Musica from "./songs/Franguinho Na Panela   Lourenço u0026 Lourival  (2002[1].mp3";
import {
  BsFillPauseFill,
  BsFillPlayFill,
  BsFillSkipBackwardFill,
  BsFillSkipForwardFill,
} from "react-icons/bs";

function App() {
  // REFS
  const audioRef = useRef();
  const progressRef = useRef(0);

  // STATES
  const [isPlaying, setIsPlaying] = useState(false);
  const [listener, setListener] = useState(0);

  // EFFECTS
  useEffect(() => {
    progressRef.current = getPercentage(audioRef);
  }, [listener]);

  // FUNCTIONS
  const getButton = (isPlaying) => {
    if (isPlaying) {
      return <BsFillPauseFill className="buttonIcons" />;
    } else {
      return <BsFillPlayFill className="buttonIcons" />;
    }
  };

  const getPercentage = (ref) => {
    const percentage = (ref.current.currentTime / ref.current.duration) * 100;
    return percentage;
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
            <button
              className="buttonsComponent"
              onClick={() => {
                console.log(audioRef.current.currentTime + " current time");
                console.log(audioRef.current.duration + " duration");
                console.log(getPercentage(audioRef) + " percentage");
              }}
            >
              {<BsFillSkipBackwardFill className="buttonIcons" />}
            </button>
            <button
              className="buttonsComponent"
              onClick={() => {
                isPlaying ? audioRef.current.pause() : audioRef.current.play();
                setIsPlaying(!isPlaying);
              }}
            >
              {getButton(isPlaying)}
            </button>
            <button className="buttonsComponent">
              {<BsFillSkipForwardFill className="buttonIcons" />}
            </button>
          </div>
          <div className="ProgressBar">
            <input
              className="ProgressInput"
              type={"range"}
              min={0}
              max={100}
              defaultValue={0}
              value={progressRef.current}
              onChange={(e) => {
                progressRef.current = e.target.value;
                const current =
                  (e.target.value * audioRef.current.duration) / 100;
                audioRef.current.currentTime = current;
              }}
            />
          </div>
          <div className="Audio">
            <audio
              src={Musica}
              ref={audioRef}
              onTimeUpdate={() => {
                setListener(listener + 1);
              }}
            />
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
