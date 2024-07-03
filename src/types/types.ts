export type UserType = {
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
  createAt: Date;
  updateAt: Date;
};

export type ListingType = {
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
  createAt: Date;
  updateAt: Date;
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
