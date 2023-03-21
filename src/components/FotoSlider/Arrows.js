import React, { useContext } from "react";
import { SliderContext } from "./Slider";
import "./Arrows.css";

export default function Arrows() {
  const { changeSlide } = useContext(SliderContext);

  return (
    <div className="arrows">
      <arrow className="arrow left" onClick={() => changeSlide(-1)}  />
      <arrow className="arrow right" onClick={() => changeSlide(1)} />
    </div>
  );
}
