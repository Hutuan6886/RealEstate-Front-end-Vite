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
          "The password is at least 8 characters, includea lowercase letter, an uppercase letter, a number and a special character!",
      })
      .regex(passwordValidation, {
        message:
          "The password is at least 8 characters, includea lowercase letter, an uppercase letter, a number and a special character!",
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
