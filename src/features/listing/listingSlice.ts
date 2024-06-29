import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ListingReduxType = {
  id?: string;
  name: string;
  description: string;
  address: string;
  imgUrl: string[];
  formType: string;
  houseType: string;
  offer: boolean;
  furnished: boolean;
  parking: boolean;
  squaremetre: number | undefined;
  bedrooms: number | undefined;
  bathrooms: number | undefined;
  regularPrice: number | undefined;
  discountPrice: number | undefined;
};

export interface ListingState {
  currentListingList: ListingReduxType[];
  isOpenDeleteModal: boolean;
}

const initialState: ListingState = {
  //todo: default value
  currentListingList: [
    {
      id: "",
      name: "",
      description: "",
      address: "",
      imgUrl: [],
      formType: "",
      houseType: "",
      offer: false,
      furnished: false,
      parking: false,
      squaremetre: undefined,
      bedrooms: undefined,
      bathrooms: undefined,
      regularPrice: undefined,
      discountPrice: undefined,
    },
  ],
  isOpenDeleteModal: false,
};

export const listingSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {
    listingCreate: (state, action: PayloadAction<ListingReduxType[]>) => {
      state.currentListingList = action.payload;
    },
    listingDelete: (state, action: PayloadAction<ListingReduxType>) => {
      state.currentListingList = [
        ...state.currentListingList.filter(
          (listing) => listing.id !== action.payload.id
        ),
      ];
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
  listingCreate,
  listingDelete,
  openDeleteListingModal,
  closeDeleteListingModal,
} = listingSlice.actions;

export default listingSlice.reducer;
