import React, { useContext, useState, useEffect, createContext } from "react";
import Slide from "./Slide";
import pros1 from "../../resources/pros10.jpg"
import pros2 from "../../resources/pros18.jpg"
import pros3 from "../../resources/pros23.jpg"
//import { SliderContext } from "./Slider";
import "./Slider.css";
import "./Arrows.css";

import Arrows from "./Arrows";

var slideNumber = 0;

export const SliderContext = createContext();

export default function SlidesList() {
  const [slide, setSlide] = useState(0);
  
 // const { slideNumber, items } = useContext(SliderContext);
  const [items, setItems] = useState([]);
  
  const changeSlide = (direction) => {

    if (slide + direction < 0) {
      slideNumber = items.length - 1;
    } else {
      slideNumber = (slideNumber + direction) % items.length;
    }

    setSlide(slideNumber);
  };

  useEffect(() => {
    const loadData = async () => {
      const images = [pros1, pros2, pros3];
      setItems(images);
    };
    loadData();
  }, []);
  
  return (
    <div
      className="slide-list"
      style={{ transform: `translateX(-${slideNumber * 100}%)` }}
    >
      
      <SliderContext.Provider
        value={{
          changeSlide,
        }}
      >
        <Arrows />
      </SliderContext.Provider>

      {items.map( (slide, index) => (
        <Slide url={slide} title={"Slide " + index} />
      ) )}
      
    </div>
  );
}

/*      {items.map((slide, index) => (
        <Slide key={index} data={slide} />
      ))}

      */