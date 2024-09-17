import * as yup from "yup";

export const kenyanPhoneNumberPattern = /^(?:\+254|0)?[17][0-9]{8}$/;

export const registerValidationSchema = yup.object({
  email: yup.string().email("Invalid Email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(4, "Too short")
    .max(20, "Too long"),
});

export const loginValidationSchema = yup.object({
  email: yup.string().email("Invalid Email").required("Email is required"),
  password: yup.string().required("Password is required"),
});
