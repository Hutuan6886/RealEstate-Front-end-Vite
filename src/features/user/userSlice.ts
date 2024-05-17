import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type UserType = {
  id: string | null;
  userName: string | null;
  email: string | null;
  createAt: string | null;
  updateAt: string | null;
};
interface UserState {
  currentUser: UserType;
}
const initialState: UserState = {
  currentUser: {
    id: null,
    userName: null,
    email: null,
    createAt: null,
    updateAt: null,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogin: (state, action: PayloadAction<UserType>) => {
      state.currentUser = action.payload;
    },
  },
});

export const { userLogin } = userSlice.actions;

export default userSlice.reducer;
