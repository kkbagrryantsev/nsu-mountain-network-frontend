import React, { useContext } from "react";
import Slide from "./Slide";
import { SliderContext } from "./Slider";
import "./Slider.css";

export default function SlidesList() {
  
  const { slideNumber, items } = useContext(SliderContext);
  var titles = ["Походы от I до VI уровня сложности", "Доступное снаряжение", "Регулярная подготовка"];
  var des0 = "Мероприятия доступные людям любого уровня физической подготовки. Групповые экспедиции, как способ очистить свой разум и отдохнуть";
  var des1 = "Нет необходимости покупать своё снаряжение. Можно забронировать на сайте и получить готовое на складе";
  var des2 = "Мероприятия для всех членов секции по отработке навыков первой необходимости";
  var descriptions = [des0, des1, des2];
  
  return (
    <div
      className="slide-list"
      style={{ transform: `translateX(-${slideNumber * 100}%)` }}
    >

      {items.map( (slide, index) => (
        <Slide url={slide} title={titles[index] + "\n"} description = {descriptions[index]}/>
      ) )}
      
    </div>
  );
}

/*      {items.map((slide, index) => (
        <Slide key={index} data={slide} />
      ))}

{items.map( (slide, index) => (
        <Slide url={slide} title={"Slide " + index} />
      ) )}

      */