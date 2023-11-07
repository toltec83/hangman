import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserStateTypes {
  name: string;
}

const initialState: UserStateTypes = {
  name: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
