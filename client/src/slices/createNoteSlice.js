// src/features/notes/notesSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const createNoteSlice = createSlice({
  name: 'notes',
  initialState: {
    notes: [],
    title: "",
    description: ""
  },
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    addNote: (state,action) => {
        
      
      state.notes.push(state.title,state.description);
      state.title = "";
      state.description = "";
    },
    resetNote: (state) => {
      state.title = "";
      state.description = "";
    }
  }
});

export const { setTitle, setDescription, addNote, resetNote } = createNoteSlice.actions;
export default createNoteSlice.reducer;
