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
  savedHomes: string[];
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
    savedHomes: [],
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
    openDeleteUserModal: (state) => {
      state.isOpenModal = true;
    },
    closeDeleteUserModal: (state) => {
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
        savedHomes: [],
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
        savedHomes: [],
        provider: "",
        createAt: "",
        updateAt: "",
      };
    },
    logoutFailure: (state) => {
      state.isLoading = false;
    },
    saveAndUnsaveListing: (state, action: PayloadAction<string>) => {
      const listingExisting = state.currentUser.savedHomes.findIndex(
        (item) => item === action.payload
      );
      if (listingExisting != -1) {
        state.currentUser.savedHomes = state.currentUser.savedHomes.filter(
          (item) => item !== action.payload
        );
      } else {
        state.currentUser.savedHomes = [
          ...state.currentUser.savedHomes,
          action.payload,
        ];
      }
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
  openDeleteUserModal,
  closeDeleteUserModal,
  deleteLoading,
  deleteSuccess,
  deleteFailure,
  logoutLoading,
  logoutSuccess,
  logoutFailure,
  saveAndUnsaveListing,
} = userSlice.actions;

export default userSlice.reducer;
