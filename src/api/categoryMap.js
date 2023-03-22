import { picts } from "../assets/png/item-categories/picts";

const getImg = (key) => {
  return picts.find((item) => item.categoryName === key);
};

export const mapCategory = (category_id) => {
  switch (category_id) {
    case 1:
    case 30:
      return getImg("cats");
    case 4:
    case 20:
    case 21:
    case 22:
    case 23:
    case 24:
    case 25:
    case 31:
      return getImg("ropes");
    case 5:
      return getImg("sleepingBag");
    case 6:
    case 7:
      return getImg("tent");
    case 8:
      return getImg("arbor");
    case 9:
      return getImg("strapping");
    case 10:
      return getImg("iceDrill");
    case 11:
      return getImg("carbine");
    case 12:
      return getImg("zhumary");
    case 13:
      return getImg("clip");
    case 14:
      return getImg("trigger");
    case 15:
      return getImg("iceAxe");
    case 16:
    case 27:
    case 28:
      return getImg("boots");
    case 17:
    case 36:
      return getImg("clothes");
    case 18:
      return getImg("backpack");
    case 19:
      return getImg("hooks");
    case 26:
      return getImg("loops");
    case 29:
      return getImg("helmets");
    case 32:
      return getImg("snowShoes");
    case 33:
      return getImg("awning");
    case 34:
      return getImg("burner");
    case 35:
      return getImg("radio");
    case 37:
      return getImg("trench");
    case 38:
      return getImg("pot");
    default:
      return getImg("misc");
  }
};
