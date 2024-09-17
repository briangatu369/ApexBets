import { useState } from "react";
import api from "../../../Config/axiosConfig/";
import { useNavigate } from "react-router-dom";

export const useMpesaPayment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isTransactionSuccessful, setIsTransactionSuccessful] = useState(false);
  const [mpesaError, setMpesaError] = useState("");
  const navigate = useNavigate();

  const sendStkPush = async (payload) => {
    try {
      setIsLoading(true);
      setHasError(false);
      setIsTransactionSuccessful(false);
      setMpesaError("");
      const initiateStkPush = await api.post("/mpesa/pushStk", payload);
      const { data } = initiateStkPush?.data;
      const { CheckoutRequestID, ResponseCode } = data;

      if (!CheckoutRequestID || !ResponseCode) {
        setHasError(true);
        setMpesaError("An error Occured. Please try again");
        return;
      }

      //fail to send stk push
      if (ResponseCode != "0") {
        setHasError(true);
        setMpesaError("Failed to send Stk push");
        return;
      }

      // Wait for 15 seconds
      await new Promise((resolve) => setTimeout(resolve, 15000));

      //check transaction status
      const transactionStatusResponse = await api.post("/mpesa/callback", {
        checkoutRequestID: CheckoutRequestID,
      });
      const transactionStatusData = transactionStatusResponse?.data;
      const { data: transactionData } = transactionStatusData;

      //failed Transaction
      if (transactionData?.ResultCode != 0) {
        setHasError(true);
        setMpesaError(transactionStatusData?.data?.ResultDesc);
        return;
      }

      //successful transaction
      setIsTransactionSuccessful(true);
    } catch (error) {
      setHasError(true);
      console.log(error);
      if (!error.response) {
        setMpesaError("Failed to contact the server.");
      } else if (error.response.status === 401) {
        navigate("/login");
      } else if (error.response.data.message) {
        setMpesaError(
          error.response.data.message || "An error occured please try again"
        );
      } else {
        setMpesaError("An error occured please try again");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const restState = (func) => {
    setIsLoading(false);
    setHasError(false);
    setIsTransactionSuccessful(false);
    setMpesaError("");
    func();
  };

  return {
    isLoading,
    isTransactionSuccessful,
    mpesaError,
    hasError,
    sendStkPush,
    restState,
  };
};
