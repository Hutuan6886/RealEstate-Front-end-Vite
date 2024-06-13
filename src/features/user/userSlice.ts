import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type UserReduxType = {
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
  isOpenModal: boolean;
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
  isOpenModal: false,
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
    openDeleteModal: (state) => {
      state.isOpenModal = true;
    },
    closeDeleteModal: (state) => {
      state.isOpenModal = false;
    },
    deleteLoading: (state) => {
      state.isLoading = true;
    },
    deleteSuccess: (state) => {
      state.isLoading = false;
      state.currentUser = {
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
      };
      state.isOpenModal = false;
    },
    deleteFailure: (state) => {
      state.isLoading = false;
      state.isOpenModal = false;
    },
    logoutLoading: (state) => {
      state.isLoading = true;
    },
    logoutSuccess: (state) => {
      state.isLoading = false;
      state.currentUser = {
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
      };
    },
    logoutFailure: (state) => {
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
  openDeleteModal,
  closeDeleteModal,
  deleteLoading,
  deleteSuccess,
  deleteFailure,
  logoutLoading,
  logoutSuccess,
  logoutFailure,
} = userSlice.actions;

export default userSlice.reducer;
