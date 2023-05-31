import { createAction } from "@reduxjs/toolkit";

export const getCategoriesListAction = createAction("categories/all");
export const getCategoryAction = createAction("categories/get");
export const deleteCategoryAction = createAction("categories/delete");
export const addCategoryAction = createAction("categories/add");
export const patchCategoryAction = createAction("categories/patch");
export const getCategoryImage = createAction("categories/avatar");
export const addItemAction = createAction("items/add");
export const deleteItemAction = createAction("items/delete");
export const patchItemAction = createAction("items/patch");
