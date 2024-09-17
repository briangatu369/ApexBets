import React from "react";
import { RxCross2 } from "react-icons/rx";

const BetHistoryHeader = ({ closeModal }) => {
  return (
    <div>
      <div className="flex justify-between bg-primary py-2 px-2 -mx-1">
        <h4 className="text-white tracking-wide">Your Bet History</h4>
        <button
          onClick={closeModal}
          type="button"
          className="font-extrabold rounded-full p-1 hover:bg-white/10  "
        >
          <RxCross2 size={19} />
        </button>
      </div>
      <div className="grid grid-cols-3 text-[12px] font-light tracking-wide capitalize px-2 pt-[10px] pb-[5px]">
        <div>
          <p>Date</p>
        </div>
        <div className="flex  flex-1 justify-center">
          <p>Stake / multiplier</p>
        </div>
        <div className="flex justify-end ">
          <p>payout / Account</p>
        </div>
      </div>
    </div>
  );
};

export default BetHistoryHeader;
