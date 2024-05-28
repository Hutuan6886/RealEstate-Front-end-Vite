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
      message: "The user name is required!",
    }),
    email: z.string().email({
      message: "The email is invalid!",
    }),
    password: z
      .string()
      .min(8, {
        message:
          "The password is at least 8 characters, include a lowercase letter, an uppercase letter, a number and a special character!",
      })
      .regex(passwordValidation, {
        message:
          "The password is at least 8 characters, include a lowercase letter, an uppercase letter, a number and a special character!",
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
    message: "Email is invalid",
  }),
  password: z.string().regex(passwordValidation, {
    message: "The password is not valid",
  }),
});

export const ProfileForm = z
  .object({
    imgUrl: z.string().optional(),
    userName: z.string().min(3, {
      message: "The user name is required!",
    }),
    phone: z
      .string()
      .min(10, { message: "The phone number must be 10 numbers" })
      .max(10, { message: "The phone number must be 10 numbers" }),
    gender: z.string().optional(),
    birthday: z.string().optional(),
    address: z.string().optional(),
    email: z.string().email({
      message: "The email is invalid!",
    }),
    currentPassword: z
      .string()
      .min(8, {
        message:
          "The password is at least 8 characters, include a lowercase letter, an uppercase letter, a number and a special character!",
      })
      .regex(passwordValidation, {
        message:
          "The password is at least 8 characters, include a lowercase letter, an uppercase letter, a number and a special character!",
      }),
    newPassword: z
      .optional(
        z
          .string()
          .min(8, {
            message:
              "The password is at least 8 characters, include a lowercase letter, an uppercase letter, a number and a special character!",
          })
          .regex(passwordValidation, {
            message:
              "The password is at least 8 characters, include a lowercase letter, an uppercase letter, a number and a special character!",
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
    message: "The user name is required!",
  }),
  phone: z
    .string()
    .min(10, { message: "The phone number must be 10 numbers" })
    .max(10, { message: "The phone number must be 10 numbers" }),
  gender: z.string().optional(),
  birthday: z.string().optional(),
  address: z.string().optional(),
});
