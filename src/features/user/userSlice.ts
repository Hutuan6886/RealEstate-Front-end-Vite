import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type UserReduxType = {
  id: string | null;
  userName: string | null;
  email: string | null;
  createAt: string | null;
  updateAt: string | null;
};
export interface UserState {
  currentUser: UserReduxType;
  isLoading: boolean;
}
const initialState: UserState = {
  currentUser: {
    id: null,
    userName: null,
    email: null,
    createAt: null,
    updateAt: null,
  },
  isLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginLoading: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action: PayloadAction<UserReduxType>) => {
      state.currentUser = action.payload;
      state.isLoading = false;
    },
  },
});

export const { loginSuccess, loginLoading } = userSlice.actions;

export default userSlice.reducer;
