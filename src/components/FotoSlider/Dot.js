import React, { useContext } from "react";
import { SliderContext } from "./Slider";

import "./Slider.css";

export default function Dot({ number }) {
  const { goToSlide, slideNumber } = useContext(SliderContext);

  return (
    <div
    className={`dot ${slideNumber === number ? "selected" : ""}`}
    onClick={() => goToSlide(number)}
  />
  );
}



/*
    <div
      className={`dot ${slideNumber === number ? "selected" : ""}`}
      onClick={() => goToSlide(number)}
    />

<div>
      <dot className={`dot ${slideNumber === number ? "selected" : ""}`} onClick={() => goToSlide(number)}  />
    </div>

*/