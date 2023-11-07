import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ERRORS_MAX } from "../constants/constants";

interface QuoteStateType {
  quoteId: string;
  content: string;
}

export interface HangmanStateTypes {
  quote: QuoteStateType;
  guesses: string[];
  attempts: number;
}

const initialState: HangmanStateTypes = {
  quote: { quoteId: "", content: "" },
  guesses: [],
  attempts: ERRORS_MAX,
};

const hangmanSlice = createSlice({
  name: "hangman",
  initialState,
  reducers: {
    startGame: (state, action: PayloadAction<QuoteStateType>) => {
      state.quote = action.payload;
      hangmanSlice.caseReducers.resetGame(state);
    },
    makeGuess: (state, action: PayloadAction<string>) => {
      const letter = action.payload;

      if (!state.guesses.includes(letter)) {
        state.guesses.push(letter);
      }

      if (!state.quote.content.toUpperCase().includes(letter)) {
        state.attempts -= 1;
      }
    },
    resetGame: (state) => {
      state.guesses = [];
      state.attempts = ERRORS_MAX;
    },
  },
});

export const { makeGuess, startGame, resetGame } = hangmanSlice.actions;
export default hangmanSlice.reducer;
