import React from 'react'

import {ReactComponent as Play} from "./assets/svg/play.svg";
import {ReactComponent as Pause} from "./assets/svg/pause.svg";
import {ReactComponent as Next} from "./assets/svg/next.svg";
import {ReactComponent as Prev} from "./assets/svg/prev.svg";

const AudioControls = ({ isPlaying, onPlayPauseClick, onNextClick, onPrevClick }) => (
  <div className="audio-controls">
    <button 
      className="prev"
      type="button"
      aria-label="Previous"
      onClick={ onPrevClick } 
      >
      <Prev />
    </button>
    {
      isPlaying ? (
        <button
          type="button"
          className="pause"
          onClick={() => onPlayPauseClick(false)}
          aria-label="Pause"
        >
          <Pause />
        </button>
      ) : (
        <button
          type="button"
          className="play"
          onClick={() => onPlayPauseClick(true)}
          aria-label="Play"
        >
          <Play />
        </button>
      )
    }
    <button
      type="button"
      aria-label="Next"
      className="next"
      onClick={ onNextClick }
    >
      <Next />
    </button>
  </div>
);

export default AudioControls;
