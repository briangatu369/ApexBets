const getMpesaApisAuthorization = require("./mpesaApisAuthorization");
const moment = require("moment/moment");
const axios = require("axios");
const { Transaction, User } = require("../../Models");

const url = "https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query";

const mpesaCallback = async (req, res) => {
  const { checkoutRequestID } = req.body;
  const { user } = req;

  if (!user) {
    return res.status(401).json({ message: "unauthorized" });
  }

  if (!checkoutRequestID) {
    return res
      .status(400)
      .json({ message: "checkout request Id was not provided" });
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

    if (!passkey || !timeStamp || !shortCode) {
      return res.status(500).json({
        message: "passkey,timestamp or shortCode is was not provided",
      });
    }

    const payload = {
      BusinessShortCode: shortCode,
      Password: encodedPassword,
      Timestamp: timeStamp,
      CheckoutRequestID: checkoutRequestID,
    };

    const response = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });

    const { ResultCode } = response.data;

    if (ResultCode != "0") {
      return res.status(200).json({
        message: "This transaction was not successful.",
        data: response.data,
      });
    }

    //find Transaction
    const transaction = await Transaction.findOne({ checkoutRequestID });
    if (!transaction) {
      return res
        .status(404)
        .json({ message: "mpesa transaction was not found" });
    }

    if (transaction?.settled) {
      return res
        .status(200)
        .json({ message: "This transaction is already settled." });
    }

    const updatedTransaction = await Transaction.findOneAndUpdate(
      {
        email: user?.email,
        checkoutRequestID,
      },
      {
        isTransactionSuccessful: true,
        settled: true,
      }
    );

    const { amount } = updatedTransaction._doc;
    await User.findOneAndUpdate(
      { email: user?.email },
      { $inc: { accountBalance: amount } }
    );

    res
      .status(200)
      .json({ message: "transaction was successful", data: response.data });
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

module.exports = mpesaCallback;
