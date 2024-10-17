import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { ListingReduxType } from "@/types/types";

export interface ListingState {
  newlyListingList: ListingReduxType[];
  hcmListingList: ListingReduxType[];
  allListingList: ListingReduxType[];
  isOpenDeleteModal: boolean;
}

const initialState: ListingState = {
  //todo: listing lists in Home page
  //todo: default value
  newlyListingList: [
    // {
    //   id: "",
    //   name: "",
    //   description: "",
    //   imgUrl: [],
    //   formType: "",
    //   houseType: "",
    //   offer: false,
    //   furnished: false,
    //   parking: false,
    //   squaremetre: undefined,
    //   bedrooms: undefined,
    //   bathrooms: undefined,
    //   regularPrice: undefined,
    //   discountPrice: undefined,
    //   location: {
    //     latitude: "",
    //     longitude: "",
    //   },
    //   address: {
    //     number: "",
    //     street: "",
    //     ward: "",
    //     district: "",
    //     city: "",
    //   },
    //   userId: "",
    //   createAt: new Date(),
    //   updateAt: new Date(),
    // },
  ],
  hcmListingList: [],
  allListingList: [],

  isOpenDeleteModal: false,
};

export const listingSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {
    saveNewlyListingList: (
      state,
      action: PayloadAction<ListingReduxType[]>
    ) => {
      state.newlyListingList = action.payload;
    },
    saveHcmListingList: (state, action: PayloadAction<ListingReduxType[]>) => {
      state.hcmListingList = action.payload;
    },
    saveAllListingList: (state, action: PayloadAction<ListingReduxType[]>) => {
      state.allListingList = action.payload;
    },
    openDeleteListingModal: (state) => {
      state.isOpenDeleteModal = true;
    },
    closeDeleteListingModal: (state) => {
      state.isOpenDeleteModal = false;
    },
  },
});

export const {
  saveNewlyListingList,
  saveHcmListingList,
  saveAllListingList,
  openDeleteListingModal,
  closeDeleteListingModal,
} = listingSlice.actions;

export default listingSlice.reducer;
