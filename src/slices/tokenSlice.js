import {createSlice} from "@reduxjs/toolkit";

const getToken = () => {
    const tokenString = sessionStorage.getItem("access_token");
    const userToken = JSON.parse(tokenString);
    return userToken?.access_token;
};

const tokenSlice = createSlice({
    name: 'token', initialState: {
        value: getToken()
    }, reducers: {
        updateToken: (state, action) => {
            const userToken = action.payload
            sessionStorage.setItem("access_token", JSON.stringify(userToken));
            state.value = userToken.access_token
            return state
        }
    }
})

export const {updateToken} = tokenSlice.actions;

export default tokenSlice.reducer