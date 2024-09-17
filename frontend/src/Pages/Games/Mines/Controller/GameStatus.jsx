import React, { useContext } from "react";
import { MinesContext } from "../Context/MinesProvider";

const GameStatus = () => {
  const [state] = useContext(MinesContext);
  const { stake, multiplier, payout, isGameActive } = state;

  return (
    <div>
      {isGameActive && (
        <div className="mb-1">
          <div className="flex justify-between text-[13px] font-medium  text-white/95">
            <h5 className="pb-1 flex gap-1 font-medium tracking-wide text-mint-green ">
              <span>Profit</span>
              <span className="flex items-center gap-[1px] font-bold ">
                (<span>{multiplier}</span>
                <span className="text-[10px]">X</span>)
              </span>
            </h5>
            <h5 className="text-mint-green">${stake}</h5>
          </div>

          <div>
            <input
              className="h-[36px] border-none font-medium text-sm text-mint-green"
              disabled
              value={payout}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GameStatus;
