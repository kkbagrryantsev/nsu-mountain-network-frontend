import {createSlice} from "@reduxjs/toolkit";

const modalsSlice = createSlice({
    name: 'modals', initialState: {
        signIn: false,
        signUp: false,
        successBooking: false,
        failureBooking: false,
    }, reducers: {
        activatePopUp: (state, action) => {
            state[action.payload] = true
        },
        disablePopUp: (state, action) => {
            state[action.payload] = false
        },
    }
})

export const {activatePopUp, disablePopUp} = modalsSlice.actions;

export default modalsSlice.reducer