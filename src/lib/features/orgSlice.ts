'use client'

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrgState {
  currentOrg: null | {
    _id: string;
    name: string;
    plan: string;
  };
}

const initialState: OrgState = {
  currentOrg: null,
};

const orgSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {
    setOrg(state, action: PayloadAction<OrgState["currentOrg"]>) {
      state.currentOrg = action.payload;
    },
    clearOrg(state) {
      state.currentOrg = null;
    },
  },
});

export const { setOrg, clearOrg } = orgSlice.actions;

export default orgSlice.reducer;
