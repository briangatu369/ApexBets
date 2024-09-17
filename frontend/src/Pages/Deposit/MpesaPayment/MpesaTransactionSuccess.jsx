import React from "react";
import Lottie from "lottie-react";
import animationData from "../../../Data/json/successAmination.json";

const lottiepositions = [
  { top: "0", right: "0", transform: "none" },
  { top: "0", right: "50%", transform: "translateX(50%)" },
  { top: "0", left: "0", transform: "none" },
  { bottom: "0", left: "0", transform: "none" },
  { bottom: "0", right: "50%", transform: "translateX(50%)" },
  { bottom: "0", right: "0", transform: "none" },
];

const MpesaTransactionSuccess = ({ close }) => {
  return (
    <div className="relative">
      {lottiepositions.map((lottie) => {
        return (
          <div
            className="absolute z-[-3]  w-28"
            style={{
              top: lottie?.top,
              right: lottie?.right,
              bottom: lottie?.bottom,
              left: lottie?.left,
              transform: lottie?.transform,
            }}
          >
            <Lottie
              animationData={animationData}
              loop={true}
              className="w-full h-full"
            />
          </div>
        );
      })}

      <div className="w-full  h-56 flex flex-col items-center justify-center  gap-6">
        <h3 className="text-[15px] tracking-wide">
          Payment was completed Successfully!
        </h3>
        <button
          type="button"
          onClick={close}
          className="bg-mint-green text-black w-fit px-20 py-2 rounded-md font-medium opacity-85 hover:opacity-95 transition-all"
        >
          Finish!
        </button>
      </div>
    </div>
  );
};

export default MpesaTransactionSuccess;
