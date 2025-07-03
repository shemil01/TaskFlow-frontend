'use client'
import { configureStore } from '@reduxjs/toolkit';
// import userReducer from './userSlice';
import orgReducer from './features/orgSlice';
import projectReducer from './features/projectSlice';

export const store = configureStore({
  reducer: {
    // user: userReducer,
    organization: orgReducer,
    project: projectReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
