import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import SeekLeft from "../assets/SeekLeft";
import SeekRight from "../assets/SeekRight";

import PlayIcon from "../assets/PlayIcon";
import PauseIcon from "../assets/PauseIcon";

import MuteIcon from "../assets/MuteIcon";
import VolumeIcon from "../assets/VolumeIcon";

import FullScreen from "../assets/FullScreen";
import MinimiseScreen from "../assets/MinimiseScreen";

function VideoPlayer() {
  const link =
    "https://api.adjaranet.com/api/v1/movies/878362480/files/1032316?source=adjaranet";

  const convert = (totalSeconds: number | undefined) => {
    let hours = Math.floor(totalSeconds ? totalSeconds / 3600 : 0)
      .toString()
      .padEnd(2, ":");
    let minutes = Math.floor(totalSeconds ? (totalSeconds % 3600) / 60 : 0)
      .toString()
      .padStart(2, "0")
      .padEnd(3, ":");
    let seconds = Math.floor(totalSeconds ? totalSeconds % 60 : 0)
      .toString()
      .padStart(2, "0");

    return `${hours === "0:" ? "" : hours}${minutes}${seconds}`;
  };
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(
    videoRef.current?.duration
  );

  const handleTimeUpdate = () => {
    if (typeof videoRef.current?.currentTime === "number") {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const roadRef = useRef<HTMLDivElement>(null);
  const roadBound = roadRef.current?.getBoundingClientRect();

  let roadLenght = videoDuration ? (currentTime / videoDuration) * 100 : 0;
  let clickX: number, currentLenght;

  let isClicking = false;

  const forward = () => {
    currentLenght = roadBound ? clickX / roadBound.width : 0;
    if (typeof videoRef.current?.currentTime === "number") {
      videoRef.current.currentTime = videoDuration
        ? videoDuration * currentLenght
        : 0;
      setCurrentTime(videoRef.current.currentTime);
    }
  };
  const touchStart = (e: any) => {
    clickX = getPositionX(e);
    isClicking = true;
    forward();
    e.preventDefault();
  };
  const touchMove = (e: any) => {
    if (isClicking) {
      clickX = getPositionX(e);
      forward();
    }
  };
  const touchEnd = (e: any) => {
    isClicking = false;
  };

  const getPositionX = (e: any) => {
    return e.type.includes("mouse")
      ? e.clientX - (roadBound ? roadBound.left : 0)
      : e.touches[0].clientX - (roadBound ? roadBound.left : 0);
  };
  roadRef.current?.addEventListener("mousedown", touchStart);
  roadRef.current?.addEventListener("mouseup", touchEnd);
  roadRef.current?.addEventListener("mouseleave", touchEnd);
  roadRef.current?.addEventListener("mousemove", touchMove);

  const playerRef = useRef<HTMLDivElement>(null);

  const [isFullScreen, setIsFullScreen] = useState(false);

  const fullScreenPlayer = () => {
    if (isFullScreen && document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullScreen(false);
    } else {
      if (playerRef.current?.requestFullscreen) {
        playerRef.current.requestFullscreen();
        setIsFullScreen(true);
      }
    }
  };

  const seekRight = () => {
    if (typeof videoRef.current?.currentTime === "number") {
      videoRef.current.currentTime += 10;
      setCurrentTime(videoRef.current.currentTime);
    }
  };
  const seekLeft = () => {
    if (typeof videoRef.current?.currentTime === "number") {
      videoRef.current.currentTime -= 10;
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const [isPause, setIsPause] = useState(true);

  const playPause = () => {
    if (videoRef.current?.pause && !isPause) {
      videoRef.current?.pause();
    }
    if (videoRef.current?.play && isPause) {
      videoRef.current?.play();
    }
  };

  videoRef.current?.addEventListener("click", playPause);
  const handleKeyDown = (event: any) => {
    if (isLoad) {
      console.log("wwwww");
      if (event.keyCode === 39) {
        seekRight();
      }
      if (event.keyCode === 37) {
        seekLeft();
      }
    }
  };

  const [volume, setVolume] = useState(50);

  let isLoad = false;
  useEffect(() => {
    videoRef.current?.addEventListener("canplay", () => {
      setVideoDuration(videoRef.current?.duration);
      isLoad = true;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
  }, []);

  const [isShowControl, setIsShowControl] = useState(false);

  const volumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(event.target.value));
  };

  const volumeClick = () => {
    if (volume > 0) {
      setVolume(0);
    } else {
      setVolume(50);
    }
  };

  if (typeof videoRef.current?.volume === "number") {
    videoRef.current.volume = volume / 100;
  }

  console.log("n");
  return (
    <Player ref={playerRef}>
      <Video
        ref={videoRef}
        onTimeUpdate={handleTimeUpdate}
        onPause={() => {
          setIsPause(true);
        }}
        onPlaying={() => {
          setIsPause(false);
        }}
        autoPlay>
        <source src={link} type="video/mp4" />
      </Video>
      <ControlerCon
        onMouseEnter={() => {
          setIsShowControl(true);
        }}
        onMouseLeave={() => {
          setIsShowControl(false);
        }}>
        {isShowControl ? (
          <Controler>
            <RunnerCon>
              <RunnerRoad ref={roadRef}>
                <PassedWay style={{ width: `${roadLenght}%` }}>
                  <Runner></Runner>
                </PassedWay>
                <FrontRoad></FrontRoad>
              </RunnerRoad>
            </RunnerCon>
            <PlayerButtonCon>
              <LeftSideCon>
                <LeftInnerCon>
                  <SeekButton onClick={seekLeft}>
                    <SeekLeft />
                  </SeekButton>
                  <PlayPause onClick={playPause}>
                    {isPause ? <PlayIcon /> : <PauseIcon />}
                  </PlayPause>
                  <SeekButton onClick={seekRight}>
                    <SeekRight />
                  </SeekButton>
                </LeftInnerCon>
                <VolumeCon>
                  <VolumeButton onClick={volumeClick}>
                    {volume > 0 ? <VolumeIcon /> : <MuteIcon />}
                  </VolumeButton>
                  <VolumeRange
                    gradValue={volume}
                    value={volume}
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    onChange={volumeChange}
                  />
                </VolumeCon>
                <TimeCon>
                  <Time>{convert(currentTime)}</Time>/
                  <Time>{convert(videoDuration)}</Time>
                </TimeCon>
              </LeftSideCon>
              <RightSideCon>
                <FullScrBtn onClick={fullScreenPlayer}>
                  {isFullScreen ? <MinimiseScreen /> : <FullScreen />}
                </FullScrBtn>
              </RightSideCon>
            </PlayerButtonCon>
          </Controler>
        ) : (
          ""
        )}
      </ControlerCon>
    </Player>
  );
}

export default VideoPlayer;

const Player = styled.div`
  height: 100vh;
  width: 100vw;
  position: relative;
  background-color: black;
`;

const Video = styled.video`
  height: 100%;
  width: 100%;
  /* object-fit: contain; */
`;

const ControlerCon = styled.div`
  height: 90px;
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column-reverse;
`;

const Controler = styled.div`
  height: 90px;
  width: 100%;
  padding-top: 15px;
`;

const RunnerCon = styled.div`
  width: 100%;
  height: 25px;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TimeCon = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const Time = styled.div`
  height: 100%;
  width: auto;
  padding: 0 4px;
  text-align: center;
  flex-shrink: 0;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-shadow: 0 0 2px black;
`;

const RunnerRoad = styled.div`
  height: 25px;
  padding: 10px 0;
  width: 100%;
  display: flex;

  cursor: pointer;
`;

const PassedWay = styled.div`
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: row-reverse;
  border-radius: 3px;
  align-items: center;
  user-select: none;
  flex-shrink: 0;
`;

const FrontRoad = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 3px;

  background-color: #8395a7;
`;

const Runner = styled.div`
  height: 10px;
  width: 10px;
  background-color: white;
  transform: translateX(50%);
  border-radius: 50%;
  flex-shrink: 0;
`;

const PlayerButtonCon = styled.div`
  height: 30px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 30px;
  margin-top: 5px;
`;

const RightSideCon = styled.div`
  display: flex;
`;

const LeftSideCon = styled.div`
  height: 100%;
  width: auto;
  display: flex;
  color: white;
  align-items: center;
`;

const SeekButton = styled.button`
  height: 30px;
  width: 30px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: none;
`;

const PlayPause = styled(SeekButton)``;

const LeftInnerCon = styled.div`
  width: 110px;
  display: flex;
  justify-content: space-between;
`;

const VolumeCon = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  margin: 0 15px;
`;

const VolumeButton = styled.button`
  height: 30px;
  border: none;
  border-radius: 0;
  background: none;
  width: 30px;
  margin-right: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  cursor: pointer;
`;

interface rangeProps {
  gradValue: number | undefined;
}
const VolumeRange = styled.input<rangeProps>`
  -webkit-appearance: none;
  cursor: pointer;
  width: 60px;
  height: 6px;
  border-radius: 3px;
  background-color: #ddd;
  background: linear-gradient(
    to right,
    white 0%,
    white ${(props) => props.gradValue}%,
    #8395a7 ${(props) => props.gradValue}%,
    #8395a7 100%
  );

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: white;
    cursor: pointer;
  }
`;

const FullScrBtn = styled.button`
  height: 30px;
  width: 30px;
  background: none;
  border: none;
  border-radius: 0;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    transform: scale(0.9);
  }
`;
