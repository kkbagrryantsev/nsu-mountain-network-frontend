import categories from "../assets/png/item-categories/category_map.json";
import image from "../assets/png/item-categories/ropes.png";

export const getItemCategory = (id) => {
  const category = categories.find((category) => category.key.includes(id));
  //return `src/assets/png/item-categories/${category.blobName}.png`;
  return image;
};
