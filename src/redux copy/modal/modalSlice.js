import { createSlice } from "@reduxjs/toolkit";

export const modalSlice =  createSlice({
    name: "modalState",
    initialState: { modalState: true},
    reducers: {
        setModal: (state, action) => {
            state.modalState = action.payload;
        },
    },
})

export const {setModal} = modalSlice.actions