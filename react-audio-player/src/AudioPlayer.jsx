import React, { useState, useRef, useEffect } from 'react';
import AudioControls from "./AudioControls";
import Backdrop from './Backdrop';
import './style.css';

const AudioPlayer = ({ sources }) => {
  // State
  // 当前播放音乐的index
  const [trackIndex, setTrackIndex] = useState(0);
  // 当前播放进度
  const [trackProgress, setTrackProgress] = useState(0);
  // 播放状态
  const [isPlaying, setIsPlaying] = useState(false);

  // 播放数据
  const { title, artist, color, image, audioSrc } = sources[trackIndex];

  // Refs
  const audioRef = useRef(new Audio(audioSrc));
  const intervalRef = useRef();
  const isReady = useRef(false);

  // 播放时间
  const { duration } = audioRef.current;

  const currentPercentage = duration
    ? `${(trackProgress / duration) * 100}%`
    : "0%";
  const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
  `;

  // 上一首
  const toPrevTrack = () => {
    if(trackIndex - 1 < 0) {
      setTrackIndex(sources.length - 1);
    } else {
      setTrackIndex(trackIndex - 1);
    }
  };

  // 下一首
  const toNextTrack = () => {
    if(trackIndex < sources.length - 1) {
      setTrackIndex(trackIndex + 1);
    } else {
      setTrackIndex(0);
    }
  };
  
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);
  
  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };
  
  const onScrub = (value) => {
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  };

  useEffect(() => {
    audioRef.current.pause();

    audioRef.current = new Audio(audioSrc);
    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
  }, [trackIndex]);
  
  useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="audio-player">
      <div className="track-info">
        <img
          src={image}
          alt={`track artwork for ${title} by ${artist}`}
          className="track-cover"
        />
        <h2 className="title">{title}</h2>
        <h3 className="artist">{artist}</h3>

        <AudioControls
          isPlaying={isPlaying}
          onPlayPauseClick={setIsPlaying}
          onNextClick={toNextTrack} 
          onPrevClick={toPrevTrack}
        />
        
        <input
          type="range"
          value={trackProgress}
          step="1"
          min="0"
          max={duration ? duration : `${duration}`}
          className="progress"
          onChange={(e) => onScrub(e.target.value)}
          onMouseUp={onScrubEnd}
          onKeyUp={onScrubEnd}
          style={{ background: trackStyling }}
        />
      </div>
      <Backdrop
        trackIndex={trackIndex}
        activeColor={color}
        isPlaying={isPlaying}
      />
    </div>
  );
};

export default AudioPlayer;
