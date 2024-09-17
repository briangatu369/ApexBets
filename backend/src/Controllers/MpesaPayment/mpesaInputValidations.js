const Joi = require("joi");

const kenyanPhoneNumberRegex = /^(?:254)[17][0-9]{8}$/;

const stkPushInputsSchema = Joi.object({
  phoneNumber: Joi.string()
    .pattern(kenyanPhoneNumberRegex)
    .required()
    .messages({
      "string.pattern.base":
        "Invalid phone number,phone number must start with +254 or 254",
      "string.empty": "Phone number is required",
    }),
  amount: Joi.number().integer().greater(0).required().messages({
    "number.base": "Amount must be a number",
    "number.integer": "Amount must be an integer",
    "number.greater": "Amount must be greater than 0",
    "number.empty": "Amount is required",
  }),
});

module.exports = { stkPushInputsSchema };
