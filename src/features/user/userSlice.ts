import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type UserReduxType = {
  id: string;
  userName: string;
  email: string;
  imgUrl: string;
  phone: string;
  address: string;
  birthday: string;
  gender: string;
  emailVerified: string;
  provider: string;
  createAt: string;
  updateAt: string;
};
export interface UserState {
  currentUser: UserReduxType;
  isLoading: boolean;
}
const initialState: UserState = {
  currentUser: {
    id: "",
    userName: "",
    email: "",
    imgUrl: "",
    phone: "",
    address: "",
    birthday: "",
    gender: "",
    emailVerified: "",
    provider: "",
    createAt: "",
    updateAt: "",
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
    loginFailure: (state) => {
      state.isLoading = false;
    },
    updateLoading: (state) => {
      state.isLoading = true;
    },
    updateSuccess: (state, action: PayloadAction<UserReduxType>) => {
      state.currentUser = action.payload;
      state.isLoading = false;
    },
    updateFailure: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  loginSuccess,
  loginLoading,
  loginFailure,
  updateLoading,
  updateSuccess,
  updateFailure,
} = userSlice.actions;

export default userSlice.reducer;
