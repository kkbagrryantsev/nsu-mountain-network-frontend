import categories from "assets/png/item-categories/category_map.json";

export function importAllImages() {
  const context = require.context("assets/png/item-categories", true, /\.png$/);
  const images = {};

  context.keys().forEach((item) => {
    images[item.replace("./", "")] = context(item);
  });

  return images;
}

export const getItemCategory = (id) => {
  const item = categories.find((category) => category.key.includes(id));
  if (item) {
    return item.blobName;
  } else {
    return "carbine";
  }
};
