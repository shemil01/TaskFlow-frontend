"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Project {
  _id: string;
  name: string;
  description: string;
}
interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
}

const initialState: ProjectState = {
  projects: [],
  currentProject: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProjects(state, action: PayloadAction<Project[]>) {
      state.projects = action.payload;
    },
    setProject(state, action: PayloadAction<Project | null>) {
      state.currentProject = action.payload;
    },
    clearProject(state) {
      state.currentProject = null;
    },
  },
});

export const { setProjects,setProject, clearProject } = projectSlice.actions;
export default projectSlice.reducer;
