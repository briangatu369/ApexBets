import React from "react";
import { twMerge } from "tailwind-merge";
import { ImTrophy } from "react-icons/im";

const CashOutModal = ({ multiplier, accountType, payout, showModal }) => {
  return (
    <div
      className={twMerge(
        `absolute top-[1%] left-[50%]
         translate-x-[-50%]
        bg-primary h-[90px] min-w-[80%] md:min-w-[60%] rounded-md
        opacity-0 scale-75
        transition-all duration-400 ease-out
        pointer-events-none z-10`,
        showModal && "opacity-100 scale-100 pointer-events-auto"
      )}
    >
      <div className="flex flex-col justify-center gap-3  px-4 h-full">
        <div className="flex justify-between items-center">
          <h4 className="font-medium text-[16px] text-mint-green">You Won!</h4>
          <p className="text-[12px] font-semibold text-white/80">
            <span>x</span>
            <span>{multiplier}</span>
          </p>
        </div>

        <div className="flex justify-between ">
          <p className="text-lg font-semibold flex items-center gap-2">
            <span className="text-mint-green">{payout}</span>
            <span className="text-base text-white/80">{accountType}</span>
          </p>
          <div className="text-mint-green">
            <ImTrophy size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashOutModal;
