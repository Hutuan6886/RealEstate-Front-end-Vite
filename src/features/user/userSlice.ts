import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { ListingReduxType, UserReduxType } from "@/types/types";

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
    listing: [],
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
    //todo: Login User
    loginUserLoading: (state) => {
      state.isLoading = true;
    },
    loginUserSuccess: (state, action: PayloadAction<UserReduxType>) => {
      state.currentUser = action.payload;
      state.isLoading = false;
    },
    loginUserFailure: (state) => {
      state.isLoading = false;
    },
    //todo: Logout User
    logoutUserLoading: (state) => {
      state.isLoading = true;
    },
    logoutUserSuccess: (state) => {
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
        listing: [],
        provider: "",
        createAt: "",
        updateAt: "",
      };
    },
    logoutUserFailure: (state) => {
      state.isLoading = false;
    },
    //todo Update User Profile
    updateUserLoading: (state) => {
      state.isLoading = true;
    },
    updateUserSuccess: (state, action: PayloadAction<UserReduxType>) => {
      state.currentUser = action.payload;
      state.isLoading = false;
    },
    updateUserFailure: (state) => {
      state.isLoading = false;
    },
    //todo: Delete User
    openDeleteUserModal: (state) => {
      state.isOpenModal = true;
    },
    closeDeleteUserModal: (state) => {
      state.isOpenModal = false;
    },
    deleteUserLoading: (state) => {
      state.isLoading = true;
    },
    deleteUserSuccess: (state) => {
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
        listing: [],
        provider: "",
        createAt: "",
        updateAt: "",
      };
      state.isOpenModal = false;
    },
    deleteUserFailure: (state) => {
      state.isLoading = false;
      state.isOpenModal = false;
    },
    //todo: Save or unsave save listing
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
    //todo: User create, update and delete listing of user
    addListing: (state, action: PayloadAction<ListingReduxType>) => {
      state.currentUser.listing = [
        ...state.currentUser.listing,
        action.payload,
      ];
    },
    updateListing: (state, action: PayloadAction<ListingReduxType>) => {
      const index = state.currentUser.listing.findIndex(
        (listing) => listing.id === action.payload.id
      );
      if (index !== -1) {
        state.currentUser.listing.splice(index, 1);
        state.currentUser.listing = [
          ...state.currentUser.listing,
          action.payload,
        ];
      }
    },
    deleteListing: (state, action: PayloadAction<ListingReduxType>) => {
      state.currentUser.listing = [
        ...state.currentUser.listing.filter(
          (listing) => listing.id !== action.payload.id
        ),
      ];
    },
  },
});

export const {
  loginUserSuccess,
  loginUserLoading,
  loginUserFailure,
  logoutUserLoading,
  logoutUserSuccess,
  logoutUserFailure,
  updateUserLoading,
  updateUserSuccess,
  updateUserFailure,
  openDeleteUserModal,
  closeDeleteUserModal,
  deleteUserLoading,
  deleteUserSuccess,
  deleteUserFailure,
  saveAndUnsaveListing,
  addListing,
  updateListing,
  deleteListing,
} = userSlice.actions;

export default userSlice.reducer;
