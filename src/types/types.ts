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
  listing: ListingReduxType[];
  provider: string;
  createAt: string;
  updateAt: string;
};

export type ListingReduxType = {
  id?: string;
  name: string;
  description: string;
  imgUrl: string[];
  formType: string;
  houseType: string;
  offer: boolean;
  furnished: boolean;
  parking: boolean;
  amenities: string[];
  squaremetre: number | undefined;
  bedrooms: number | undefined;
  bathrooms: number | undefined;
  regularPrice: number;
  discountPrice?: number;

  createAt: Date;
  updateAt: Date;

  userId: string;
  address: Address;
  location: Location;
};

export type Location = {
  latitude: string;
  longitude: string;
};
export type Address = {
  number: string;
  street: string;
  ward: string;
  district: string;
  city: string;
};

export type LandlordType = {
  name: string;
  email: string;
  phone: string;
};

export type RequestInfoFormType = {
  phone: string;
  email: string;
  message: string;
};

export type FilterFormType = {
  searchTerm: string;
  lat: number;
  lng: number;
  price: {
    min: string;
    max: string;
  };
  beds: number;
  baths: number;
  houseType: string[];
  formType: "Buy" | "Rent" | string;
  squarefeet: {
    min: string;
    max: string;
  };
  keywords: string[];
};
