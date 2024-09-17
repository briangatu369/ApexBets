import React from "react";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

const BetHistoryElement = ({
  stake,
  gameStatus,
  payout,
  multiplier,
  account,
  createdAt,
}) => {
  let formattedDate, formattedTime;

  if (createdAt) {
    const betHistoryDate = new Date(createdAt);

    //check if createdAt is of Date type
    if (betHistoryDate instanceof Date) {
      formattedDate = format(createdAt, "yyyy-MM-dd");
      formattedTime = format(createdAt, "HH:MM");
    }
  }

  return (
    <div
      className={twMerge(
        `w-full grid grid-cols-3 justify-between items-center 
         text-white/70 text-white bg-primary py-[2px]  px-2 rounded-lg`,
        gameStatus === true && "bg-green-600/35 border-1 border-green-600"
      )}
    >
      <div className="flex flex-col justify-center text-[12px] font-extralight   tracking-wide ">
        <p>{formattedTime}</p>
        <p className="-mt-1">{formattedDate}</p>
      </div>

      <div className="flex flex-1 items-center justify-center  gap-2 ">
        <p className="text-[15px] ">{stake?.toFixed(2)}</p>
        <p className="bg-secondary text-[12.5px] font-bold tracking-wide text-center rounded-full p-2 py-[2px] text-mint-green ">
          <span>{multiplier?.toFixed(2)}</span>
          <span className="">x</span>
        </p>
      </div>

      <div className="flex items-center justify-end text-[13px]  gap-2 font-medium tracking-wide">
        <span className="">
          {payout === 0 ? (
            <span className="text-red-600 text-[11px]">Busted</span>
          ) : (
            payout?.toFixed(2)
          )}
        </span>
        <span className="capitalize text-[10px] tracking-wide ">{account}</span>
      </div>
    </div>
  );
};

export default BetHistoryElement;
