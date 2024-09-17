import React from "react";

const MpesaPaymentError = ({ error, close }) => {
  return (
    <div className="w-full h-56 flex flex-col items-center justify-center -translate-y-4  gap-7">
      <h3 className="text-[15px] tracking-wide font-medium text-red-600">
        {error}
      </h3>
      <button
        type="button"
        onClick={close}
        className="bg-red-600 w-fit px-20 py-2 rounded-md"
      >
        Try again
      </button>
    </div>
  );
};

export default MpesaPaymentError;
