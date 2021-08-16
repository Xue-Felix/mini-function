import React from "react";
import ReactDOM from "react-dom";
import AudioPlayer from "./AudioPlayer";
import source from "./source";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <AudioPlayer sources={source}></AudioPlayer>,
  rootElement
)