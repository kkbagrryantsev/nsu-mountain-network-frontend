import React from "react";

import "./Slider.css";

export default function SlideTitle({ title, description }) {
  return <div className="slide-title">
    <h2>{title}</h2>
    <text>{description}</text>
  </div>;
}