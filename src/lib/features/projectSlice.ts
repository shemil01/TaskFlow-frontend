'use client'
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProjectState {
  currentProject: null | {
    _id: string;
    name: string;
    description: string;
  };
}

const initialState: ProjectState = {
  currentProject: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProject(state, action: PayloadAction<ProjectState["currentProject"]>) {
      state.currentProject = action.payload;
    },
    clearProject(state) {
      state.currentProject = null;
    },
  },
});

export const { setProject, clearProject } = projectSlice.actions;
export default projectSlice.reducer;
