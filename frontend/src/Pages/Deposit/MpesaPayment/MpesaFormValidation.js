import * as yup from "yup";

const safaricomPhoneNumberRegex = /^(?:254)[17][0-9]{8}$/;

export const mpesaDepositSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .trim()
    .required("Phone number is required.")
    .matches(
      safaricomPhoneNumberRegex,
      "Invalid phone number. Must start with 254."
    ),
  amount: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    )
    .positive("Amount must be greater than 0.")
    .max(50000, "Max deposit 50000")
    .required("Amount is required")
    .typeError("Please enter a valid number."),
});
