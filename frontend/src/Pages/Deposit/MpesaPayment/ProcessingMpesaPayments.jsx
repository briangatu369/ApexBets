import React from "react";
import WaveLoader from "../../../Components/WaveLoader";

const ProcessingMpesaPayments = () => {
  return (
    <div className="w-full h-56 flex flex-col items-center justify-center gap-2">
      <h3 className="text-xl">Processing Your Payments</h3>
      <h4 className="text-mint-green">Don't Refresh Your Page</h4>
      <WaveLoader />
    </div>
  );
};

export default ProcessingMpesaPayments;
