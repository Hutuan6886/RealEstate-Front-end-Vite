import { z } from "zod";

const passwordValidation = new RegExp( //* một chữ Viết hoa và 1 viết thường và 1 kí tự đặc biệt
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

export const SearchFormSchema = z.object({
  search: z.string(),
});

export const RegisterFormSchema = z
  .object({
    userName: z.string().min(3, {
      message: "User name is required!",
    }),
    email: z.string().email({
      message: "Email is invalid!",
    }),
    password: z
      .string()
      .min(8, {
        message:
          "Password is at least 8 characters, include a lowercase letter, an uppercase letter, a number and a special character!",
      })
      .regex(passwordValidation, {
        message:
          "Password is at least 8 characters, include a lowercase letter, an uppercase letter, a number and a special character!",
      }),
    rePassword: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.rePassword;
    },
    {
      message: "Re-enter pasword is not match",
      path: ["rePassword"],
    }
  );

export const LoginFormSchema = z.object({
  email: z.string().email({
    message: "Email is invalid!",
  }),
  password: z.string().regex(passwordValidation, {
    message: "Password is not valid!",
  }),
});

export const ProfileForm = z
  .object({
    imgUrl: z.string().optional(),
    userName: z.string().min(3, {
      message: "User name is required!",
    }),
    phone: z
      .string()
      .min(10, { message: "Phone number must be 10 numbers" })
      .max(10, { message: "Phone number must be 10 numbers" }),
    gender: z.enum(["Male", "Female"]).optional(),
    birthday: z.string().optional(),
    address: z.string().optional(),
    email: z.string().email({
      message: "Email is invalid!",
    }),
    currentPassword: z.string().min(8, {
      message: "Password is required!",
    }),
    newPassword: z
      .optional(
        z
          .string()
          .min(8, {
            message:
              "Password is at least 8 characters, include a lowercase letter, an uppercase letter, a number and a special character!",
          })
          .regex(passwordValidation, {
            message:
              "Password is at least 8 characters, include a lowercase letter, an uppercase letter, a number and a special character!",
          })
      )
      .or(z.literal("")),
    reNewPassword: z.optional(z.string().min(8)).or(z.literal("")),
  })
  .refine(
    (values) => {
      return values.newPassword === values.reNewPassword;
    },
    {
      message: "Re-New Password is not match!",
      path: ["reNewPassword"],
    }
  );

export const ProfileOauthForm = z.object({
  imgUrl: z.string().optional(),
  userName: z.string().min(3, {
    message: "User name is required!",
  }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be 10 numbers" })
    .max(10, { message: "Phone number must be 10 numbers" }),
  gender: z.enum(["Male", "Female"]).optional(),
  birthday: z.string().optional(),
  address: z.string().optional(),
});

export const ManageListingFormSchema = z
  .object({
    id: z.string().optional(),
    imgUrl: z
      .array(z.string())
      .min(3, { message: "Click upload, Image must be at least 3 pictures!" }),
    name: z.string().min(1, { message: "Name is required!" }),
    description: z.string().min(1, { message: "Description is required!" }),
    address: z.object({
      number: z.string().optional(),
      street: z.string().min(1, { message: "Street is required!" }),
      ward: z.string().min(1, { message: "Ward is required!" }),
      district: z.string().min(1, { message: "District is required!" }),
      city: z.string().min(1, { message: "City is required!" }),
    }),
    location: z.object({
      latitude: z.string().min(1, { message: "Latitude is required!" }),
      longitude: z.string().min(1, { message: "Longitude is required!" }),
    }),
    formType: z.enum(["Sell", "Rent"], {
      message: "Select a form for your home!",
    }),
    houseType: z.string().min(1, {
      message: "Select a type for your home!",
    }),
    furnished: z.boolean().optional(),
    parking: z.boolean().optional(),
    offer: z.boolean().optional(),
    amenities: z.array(z.string()).optional(),
    squaremetre: z.number().positive({ message: "Bedrooms is invalid!" }),
    bedrooms: z
      .number()
      .int({ message: "This is a integer number!" })
      .positive({ message: "Bedrooms is invalid!" }),
    bathrooms: z
      .number()
      .int({ message: "This is a integer number!" })
      .positive({ message: "Bathrooms is invalid!" }),
    regularPrice: z.string(),
    discountPrice: z.string().optional(),
  })
  .refine(
    (value) => {
      if (value.discountPrice) {
        //todo: Convert regularPrice, discounPrice are string value with dot to raw number value

        return (
          Number(value.discountPrice.split(".").join("")) <=
          Number(value.regularPrice.split(".").join(""))
        );
      }
    },
    {
      message: "Discount price can't be more than regular price!",
      path: ["discountPrice"],
    }
  );
