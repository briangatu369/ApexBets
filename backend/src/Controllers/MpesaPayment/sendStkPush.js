const moment = require("moment/moment");
const getMpesaApisAuthorization = require("./mpesaApisAuthorization");
const axios = require("axios");
const { stkPushInputsSchema } = require("./mpesaInputValidations");
const { Transaction } = require("../../Models/index");

const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

const sendMpesaStkPush = async (req, res) => {
  // Destructure and validate request body
  const { phoneNumber, amount } = req.body;
  const user = req?.user;

  if (!user) {
    return res.status(401).json({ message: "unauthorized" });
  }

  const { error } = stkPushInputsSchema.validate({ phoneNumber, amount });

  if (error) {
    const validationError = error.details[0].message;
    return res.status(400).json({ message: validationError });
  }

  try {
    // Get M-Pesa API authorization token
    const data = await getMpesaApisAuthorization();
    const { access_token } = data;

    if (!access_token) {
      return res
        .status(500)
        .json({ message: "Failed to obtain mpesa authorization token" });
    }

    // Generate timestamp and encoded password
    const timeStamp = moment().format("YYYYMMDDHHmmss");
    const passkey = process.env.MPESA_PASSKEY;
    const shortCode = process.env.MPESA_SHORTCODE;
    const rawPassword = `${shortCode}${passkey}${timeStamp}`;
    const encodedPassword = Buffer.from(rawPassword).toString("base64");

    // STK push payload
    const payload = {
      BusinessShortCode: shortCode,
      Password: encodedPassword,
      Timestamp: timeStamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phoneNumber,
      PartyB: shortCode,
      PhoneNumber: phoneNumber,
      CallBackURL: "https://apexbets.vercel.app/api/mpesa/callback",
      AccountReference: `${shortCode}`,
      TransactionDesc: `${phoneNumber}`,
    };

    // Send STK push request
    const response = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });

    const stkPushData = response.data;
    const { CheckoutRequestID, ResponseCode } = stkPushData;

    // M-Pesa  response
    const newTransaction = new Transaction({
      email: user?.email,
      phoneNumber,
      checkoutRequestID: CheckoutRequestID,
      amount,
      stkPushSent: true,
      settled: false,
      isTransactionSuccessful: false,
    });

    await newTransaction.save();

    res.status(200).json({
      message: "stk push sent successfully",
      data: { CheckoutRequestID, ResponseCode },
    });
  } catch (error) {
    if (error.response) {
      //response from mpesa server
      const err = error.response.data;
      console.error("Error Response Data:", err);
      res.status(404).json({ message: err?.errorMessage });
    } else if (error.request) {
      //no response
      console.error("Error Request:", error.request);
      res.status(404).json({ message: "failed to access the response" });
    } else {
      res.status(500).json({ message: "Internal server error" });
      console.error("Error Message:", error.message);
    }
  }
};

module.exports = sendMpesaStkPush;
