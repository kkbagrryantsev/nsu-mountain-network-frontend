import { createAction } from "@reduxjs/toolkit";

export const signInAction = createAction("auth/signin");
export const refreshTokenAction = createAction("auth/refresh");
export const resetPasswordAction = createAction("auth/resetPassword");
export const requestPasswordResetAction = createAction(
  "auth/resetPasswordRequest"
);
export const signUpAction = createAction("auth/signup");
export const signUpConfirmAction = createAction("auth/signup/confirm");
