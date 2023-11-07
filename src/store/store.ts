import { configureStore } from '@reduxjs/toolkit';
import hangmanReducer from './hangmanSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    hangman: hangmanReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;


