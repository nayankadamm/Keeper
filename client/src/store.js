// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './slices/createNoteSlice';
import { noteApi } from './api/createNoteApi';
const store = configureStore({
  reducer: {
    [noteApi.reducerPath]: noteApi.reducer,
    notes: notesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(noteApi.middleware),
});

export default store;
