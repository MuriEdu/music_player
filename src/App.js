import React, { useEffect, useRef, useState } from "react";
import "./App.css";
// IMAGES
import Lourenço from "./assets/franguinho.jpg";
import Exaltasamba from "./assets/exaltasamba.jpg";
import Harry from "./assets/herry.jpg";
import Queen from "./assets/queen.jpg";
// SONGS
import Franguinho from "./songs/Franguinho Na Panela   Lourenço u0026 Lourival  (2002[1].mp3";
import Lua from "./songs/Exaltasamba   Tá Vendo Aquela Lua   DVD EXALTASAMBA 25 ANOS AO VIV.mp3";
import Was from "./songs/Harry Styles   As It Was (Official Video.mp3";
import Free from "./songs/I Want To Break Fre.mp3";

import {
  BsFillPauseFill,
  BsFillPlayFill,
  BsFillSkipBackwardFill,
  BsFillSkipForwardFill,
} from "react-icons/bs";

function App() {
  //Musics
  const musics = [
    {
      Name: "Franguinho na Panela",
      Author: "Lourenço e Lorival",
      Image: Lourenço,
      song: Franguinho,
    },
    {
      Name: "Tá Vendo Aquela Lua",
      Author: "Exaltasamba",
      Image: Exaltasamba,
      song: Lua,
    },
    {
      Name: "As it Was",
      Author: "Herry Styles",
      Image: Harry,
      song: Was,
    },
    {
      Name: "I Want To Break Free",
      Author: "Queen",
      Image: Queen,
      song: Free,
    },
  ];

  // REFS
  const audioRef = useRef();
  const progressRef = useRef(0);
  const timeRef = useRef(timeFormat(0));
  const finishRef = useRef(timeFormat(1));

  // STATES
  const [isPlaying, setIsPlaying] = useState(false);
  const [listener, setListener] = useState(0);
  const [currentMusic, setCurrenteMusic] = useState(0);

  // EFFECTS
  useEffect(() => {
    progressRef.current = getPercentage(audioRef);
    timeRef.current = timeFormat(audioRef.current.currentTime);
    finishRef.current = getFinshTime();
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

  function timeFormat(s) {
    const min = s / 60;
    const sec = s % 60;
    const formatMin =
      Math.trunc(min) <= 9 ? "0" + Math.trunc(min) : Math.trunc(min);
    const formatSec =
      Math.trunc(sec) <= 9 ? "0" + Math.trunc(sec) : Math.trunc(sec);

    return `${formatMin}:${formatSec}`;
  }

  function getFinshTime() {
    const current = audioRef.current.currentTime;
    const end = audioRef.current.duration;
    const finish = end - current;
    const ret = timeFormat(finish);
    return ret;
  }

  return (
    <div className="App">
      <div className="Content">
        <div id="PlayerOne" className="Player">
          <div className="Image">
            <img id="ImageOne" src={musics[currentMusic].Image} alt="Img"></img>
          </div>
          <div className="Text">
            <p id="Name">{musics[currentMusic].Name}</p>
            <p id="Author">{musics[currentMusic].Author}</p>
          </div>
          <div className="buttons">
            <button
              className="buttonsComponent"
              onClick={() => {
                const newMusic = currentMusic - 1;
                if (musics[newMusic] === undefined) {
                  setCurrenteMusic(3);
                  setIsPlaying(false);
                } else {
                  setCurrenteMusic(newMusic);
                  setIsPlaying(false);
                }
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
            <button
              className="buttonsComponent"
              onClick={() => {
                const newMusic = currentMusic + 1;
                if (musics[newMusic] === undefined) {
                  setCurrenteMusic(0);
                  setIsPlaying(false);
                } else {
                  setCurrenteMusic(newMusic);
                  setIsPlaying(false);
                }
              }}
            >
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
          <div className="Times">
            <p className="time">{timeRef.current}</p>
            <p className="time">{finishRef.current}</p>
          </div>
          <div className="Audio">
            <audio
              src={musics[currentMusic].song}
              ref={audioRef}
              onTimeUpdate={() => {
                setListener(listener + 1);
                getFinshTime();
              }}
            />
          </div>
        </div>
        <div className="PlayerH">
          <div id="PlayerTwo" className="Player">
            <div className="upside">
              <img id="imageTwo" src={musics[currentMusic].Image} />
              <div className="Text" id="playerTwoText">
                <p id="NameTwo">{musics[currentMusic].Name}</p>
                <p id="AuthorTwo">{musics[currentMusic].Author}</p>
              </div>
            </div>
            <div className="buttons" id="buttonsTwo">
              <button
                className="buttonsComponent"
                onClick={() => {
                  const newMusic = currentMusic - 1;
                  if (musics[newMusic] === undefined) {
                    setCurrenteMusic(3);
                    setIsPlaying(false);
                  } else {
                    setCurrenteMusic(newMusic);
                    setIsPlaying(false);
                  }
                }}
              >
                {<BsFillSkipBackwardFill className="buttonIcons" />}
              </button>
              <button
                className="buttonsComponent"
                onClick={() => {
                  isPlaying
                    ? audioRef.current.pause()
                    : audioRef.current.play();
                  setIsPlaying(!isPlaying);
                }}
              >
                {getButton(isPlaying)}
              </button>
              <button
                className="buttonsComponent"
                onClick={() => {
                  const newMusic = currentMusic + 1;
                  if (musics[newMusic] === undefined) {
                    setCurrenteMusic(0);
                    setIsPlaying(false);
                  } else {
                    setCurrenteMusic(newMusic);
                    setIsPlaying(false);
                  }
                }}
              >
                {<BsFillSkipForwardFill className="buttonIcons" />}
              </button>
            </div>
            <div className="ProgressBar">
              <input
                className="ProgressInput"
                id="ProgressInputTwo"
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
            <div className="Times">
              <p className="time">{timeRef.current}</p>
              <p className="time">{finishRef.current}</p>
            </div>
          </div>
          <div id="PlayerThree" className="Player">
            <div className="upside">
              <img id="imageTwo" src={musics[currentMusic].Image} />
              <div className="Text" id="playerTwoText">
                <p id="NameTwo">{musics[currentMusic].Name}</p>
                <p id="AuthorTwo">{musics[currentMusic].Author}</p>
              </div>
            </div>
            <div className="buttons" id="buttonsTwo">
              <button
                className="buttonsComponent"
                onClick={() => {
                  const newMusic = currentMusic - 1;
                  if (musics[newMusic] === undefined) {
                    setCurrenteMusic(3);
                    setIsPlaying(false);
                  } else {
                    setCurrenteMusic(newMusic);
                    setIsPlaying(false);
                  }
                }}
              >
                {<BsFillSkipBackwardFill className="buttonIcons" />}
              </button>
              <button
                className="buttonsComponent"
                onClick={() => {
                  isPlaying
                    ? audioRef.current.pause()
                    : audioRef.current.play();
                  setIsPlaying(!isPlaying);
                }}
              >
                {getButton(isPlaying)}
              </button>
              <button
                className="buttonsComponent"
                onClick={() => {
                  const newMusic = currentMusic + 1;
                  if (musics[newMusic] === undefined) {
                    setCurrenteMusic(0);
                    setIsPlaying(false);
                  } else {
                    setCurrenteMusic(newMusic);
                    setIsPlaying(false);
                  }
                }}
              >
                {<BsFillSkipForwardFill className="buttonIcons" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
