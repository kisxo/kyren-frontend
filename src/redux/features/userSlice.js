import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: null };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: () => initialState, // ← Reset only this slice
  },
});

export const { setUser, clearUser } = userSlice.actions;
