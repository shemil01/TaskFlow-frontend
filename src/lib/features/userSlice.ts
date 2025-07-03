'use client'

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  currentUser: null | {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: string;
  };
}

const initialState: UserState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState["currentUser"]>) {
      state.currentUser = action.payload;
    },
    clearUser(state) {
      state.currentUser = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
