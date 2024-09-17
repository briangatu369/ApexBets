const axios = require("axios");

const url =
  "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

const getMpesaApisAuthorization = async () => {
  const consumerKey = process.env.MPESA_CONSUMER_KEY;
  const consumerSecret = process.env.MPESA_CONSUMER_SECRET;

  if (!consumerKey || !consumerSecret) {
    throw new Error(
      "Consumer Key or Consumer Secret is not set in environment variables."
    );
  }

  const authorizationSecret = `${consumerKey}:${consumerSecret}`;
  const encodedSecret = Buffer.from(authorizationSecret).toString("base64");

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Basic ${encodedSecret}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to get M-Pesa API authorization:", error.message);
    throw new Error("Failed to retrieve M-Pesa API authorization.");
  }
};

module.exports = getMpesaApisAuthorization;
