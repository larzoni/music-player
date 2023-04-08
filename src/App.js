import "./App.css";
import { useState, useRef } from "react";
import { Tilt } from "react-tilt";
import Particle from "./components/Particle";

function App() {
  const [currentMusicDetails, setCurrentMusicDetails] = useState({
    songName: "Dunka dumma hjärta dunka",
    songArtist: "Felicia Takman",
    songSrc: "./Assets/Songs/Dunka.mp3",
    songAvatar: "./Assets/Images/image1.png",
  });
  const [audioProgress, setAudioProgress] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [musicIndex, setMusicIndex] = useState(0);
  const [musicTotalLength, setMusicTotalLength] = useState("03 : 02");
  const [musicCurrentTime, setMusicCurrentTime] = useState("00 : 00");
  const [videoIndex, setVideoIndex] = useState(0);

  const currentAudio = useRef();

  const defaultOptions = {
    reverse: false,
    max: 2,
    perspective: 200,
    scale: 1,
    speed: 1000,
    transition: true,
    axis: null,
    reset: true,
    easing: "cubic-bezier(.03,.98,.52,.99)",
    trackOnWindow: true,
  };

  const handleMusicProgressBar = (e) => {
    setAudioProgress(e.target.value);
    currentAudio.current.currentTime =
      (e.target.value * currentAudio.current.duration) / 100;
  };

  //Change avatar class
  let avatarClass = ["objectFitCover", "objectFitContain", "none"];
  const [avatarClassIndex, setAvatarClassIndex] = useState(0);
  const handleAvatar = () => {
    if (avatarClassIndex >= avatarClass.length - 1) {
      setAvatarClassIndex(0);
    } else {
      setAvatarClassIndex(avatarClassIndex + 1);
    }
  };

  // Play Audio
  const handleAudioPlay = () => {
    if (currentAudio.current.paused) {
      currentAudio.current.play();
      setIsAudioPlaying(true);
    } else {
      currentAudio.current.pause();
      setIsAudioPlaying(false);
    }
  };

  const musicAPI = [
    {
      songName: "Dunka dumma hjärta dunka",
      songArtist: "Felicia Takman",
      songSrc: "./Assets/Songs/Dunka.mp3",
      songAvatar: "./Assets/Images/image1.png",
    },
    {
      songName: "How to ruin a life",
      songArtist: "VICTORIA",
      songSrc: "./Assets/Songs/How To Ruin A Life.wav",
      songAvatar: "./Assets/Images/htral.jpeg",
    },
    {
      songName: "Rain clouds",
      songArtist: "ELMA",
      songSrc: "./Assets/Songs/Rain clouds.mp3",
      songAvatar: "./Assets/Images/rainclouds.jpeg",
    },
    {
      songName: "Were you ever?",
      songArtist: "VICTORIA",
      songSrc: "./Assets/Songs/Were you ever.wav",
      songAvatar: "./Assets/Images/were you ever.jpeg",
    },
    {
      songName: "Ditt problem",
      songArtist: "Felicia Takman",
      songSrc: "./Assets/Songs/Ditt problem.mp3",
      songAvatar: "./Assets/Images/dittproblem.jpeg",
    },
    {
      songName: "Bara lite känslor",
      songArtist: "Felicia Takman",
      songSrc: "./Assets/Songs/Bara Lite Känslor.wav",
      songAvatar: "./Assets/Images/baralitekänslor.jpeg",
    },
  ];
  const handleNextSong = () => {
    if (musicIndex >= musicAPI.length - 1) {
      let setNumber = 0;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    } else {
      let setNumber = musicIndex + 1;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    }
  };

  const handlePrevSong = () => {
    if (musicIndex === 0) {
      let setNumber = musicAPI.length - 1;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    } else {
      let setNumber = musicIndex - 1;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    }
  };

  const updateCurrentMusicDetails = (number) => {
    let musicObject = musicAPI[number];
    currentAudio.current.src = musicObject.songSrc;
    currentAudio.current.play();
    setCurrentMusicDetails({
      songName: musicObject.songName,
      songArtist: musicObject.songArtist,
      songSrc: musicObject.songSrc,
      songAvatar: musicObject.songAvatar,
    });
    setIsAudioPlaying(true);
  };

  const handleAudioUpdate = () => {
    let minutes = Math.floor(currentAudio.current.duration / 60);
    let seconds = Math.floor(currentAudio.current.duration % 60);
    let musicTotalLength0 = `${minutes < 10 ? `0${minutes}` : minutes} : ${
      seconds < 10 ? `0${seconds}` : seconds
    }`;
    setMusicTotalLength(musicTotalLength0);

    let currentMin = Math.floor(currentAudio.current.currentTime / 60);
    let currentSec = Math.floor(currentAudio.current.currentTime % 60);
    let musicCurrentT = `${currentMin < 10 ? `0${currentMin}` : currentMin} : ${
      currentSec < 10 ? `0${currentSec}` : currentSec
    }`;
    setMusicCurrentTime(musicCurrentT);

    const progress = parseInt(
      (currentAudio.current.currentTime / currentAudio.current.duration) * 100
    );
    setAudioProgress(isNaN(progress) ? 0 : progress);
  };

  const vidArray = [
    "./Assets/Videos/video1.mp4",
    "./Assets/Videos/video2.mp4",
    "./Assets/Videos/video3.mp4",
    "./Assets/Videos/video4.mp4",
    "./Assets/Videos/video5.mp4",
  ];

  const handleChangeBackground = () => {
    if (videoIndex > vidArray.length - 1) {
      setVideoIndex(0);
    } else {
      setVideoIndex(videoIndex + 1);
    }
  };

  return (
    <>
      <div className="container">
        <audio
          src="./Assets/Songs/Dunka.mp3"
          ref={currentAudio}
          onEnded={handleNextSong}
          onTimeUpdate={handleAudioUpdate}
        ></audio>
        <video
          src={vidArray[videoIndex]}
          autoPlay
          muted
          loop
          className="backgroundVideo"
        ></video>
        <div className="blackScreen"></div>
        <Tilt options={defaultOptions}>
          <div className="music-Container">
            <p className="musicPlayer">Songs by Helena</p>
            <p className="music-Head-Name">{currentMusicDetails.songName}</p>
            <p className="music-Artist-Name">
              {currentMusicDetails.songArtist}
            </p>
            <img
              src={currentMusicDetails.songAvatar}
              className={avatarClass[avatarClassIndex]}
              onClick={handleAvatar}
              alt="song cover"
              id="songAvatar"
            />
            <div className="musicTimerDiv">
              <p className="musicCurrentTime">{musicCurrentTime}</p>
              <p className="musicTotalLength">{musicTotalLength}</p>
            </div>
            <input
              type="range"
              name="musicProgressBar"
              className="musicProgressBar"
              value={audioProgress}
              onChange={handleMusicProgressBar}
            />
            <div className="musicControlers">
              <i
                className="fa-solid fa-backward musicControler"
                onClick={handlePrevSong}
              ></i>
              <i
                className={`fa-solid ${
                  isAudioPlaying ? "fa-pause-circle" : "fa-circle-play"
                } playBtn`}
                onClick={handleAudioPlay}
              ></i>
              <i
                className="fa-solid fa-forward musicControler"
                onClick={handleNextSong}
              ></i>
            </div>
          </div>
        </Tilt>
        <div className="changeBackBtn" onClick={handleChangeBackground}>
          Change Background
        </div>
      </div>
      <div className="particlesContainer">
        <Particle />
      </div>
    </>
  );
}

export default App;
