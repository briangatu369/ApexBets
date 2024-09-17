import React, { useContext, useEffect } from "react";
import DiceImage from "../../../../assets/dice/dice.png";
import DiceDisplay from "./DiceDisplay";
import { diceContext } from "../Context/DiceProvider";
import { GAME_STATUS } from "../Data/constants";
import { DICE_ACTIONS } from "../Data/diceReducer";
import CashOutModal from "../../../../Components/CashoutModal";
import { twMerge } from "tailwind-merge";

const DiceGrid = () => {
  const { state, dispatch } = useContext(diceContext);
  const { status, multiplier, payout, accountType, isLoading, resultTotals } =
    state;

  // hide cashoutModal
  useEffect(() => {
    //hide cashout modal when the dices are rolled again
    if (isLoading) {
      dispatch({
        type: DICE_ACTIONS.UPDATE_MANY,
        many: { status: GAME_STATUS.NEUTRAL },
      });
      return;
    }

    //hide cashout modal after "n" seconds
    const t = setTimeout(() => {
      dispatch({
        type: DICE_ACTIONS.UPDATE_MANY,
        many: { status: GAME_STATUS.NEUTRAL },
      });
    }, 3000);

    return () => {
      clearTimeout(t);
    };
  }, [status, isLoading]);

  return (
    <div className="relative flex flex-col gap-2 overflow-hidden  min-w-full rounded-md py-2 ">
      <CashOutModal
        multiplier={multiplier.toFixed(2)}
        payout={payout.toFixed(2)}
        accountType={accountType}
        showModal={status === GAME_STATUS.WON}
      />

      <div className="flex justify-center items-center gap-6 pb-1 ">
        <div className=" w-[95px] ">
          <img
            src={DiceImage}
            alt="diceImage"
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      <div className="flex flex-col  items-center ">
        {/* display dices */}
        <DiceDisplay />

        <div className="flex flex-col  items-center gap-2">
          {/* display payout on win */}
          <div className="flex flex-col items-center bg-primary  gap-1 px-8 py-2 rounded-b-md">
            <h4 className="text-[13px] text-white/80 ">Payout on win</h4>
            <p className="text-xl font-medium">KES {payout?.toFixed(2)}</p>
          </div>

          {/* display game outcome */}
          <div
            className={twMerge(
              `bg-[#c7003e]  text-white h-fit text-center 
              py-[6px] px-3 rounded-md text-[14px] font-semibold transition-all duration-300`,
              !resultTotals && "opacity-0",
              status === GAME_STATUS.WON && "bg-mint-green text-black"
            )}
          >
            <span>Outcome :</span>
            <span className="rounded-md pl-2 tracking-wide">
              {resultTotals?.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiceGrid;
