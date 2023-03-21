import React, { useContext, useState } from "react";
import { SliderContext } from "./Slider";
import  changeSlide  from "./SlideList";
import "./Arrows.css";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import {activatePopUp} from "../../slices/modalsSlice";
import {useDispatch, useSelector} from "react-redux";

export default function Arrows() {
  //const { changeSlide } = useContext(SliderContext);
  const [slide, setSlide] = useState(0);
  const dispatch = useDispatch();
  /*
  const changeSlide = (direction = 1) => {
    let slideNumber = 0;

    if (slide + direction < 0) {
      slideNumber = SlidesList.items.length - 1;
    } else {
      slideNumber = (slide + direction) % SlidesList.items.length;
    }

    setSlide(slideNumber);
  };
*/

  return (
    <div className="arrows">
      <arrow className="arrow left" onClick={() => changeSlide(-1)}  />
      <arrow className="arrow right" onClick={() => changeSlide(1)} />
    </div>
  );
}

/*onClick={() => changeSlide(-1)} 
      onClick={() => changeSlide(1)}
      
      dispatch(activatePopUp('signIn'))*/