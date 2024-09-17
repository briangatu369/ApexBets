import React, { useContext } from "react";
import { MinesContext } from "../Context/minesProvider";
import { MINESACTION } from "../Data/minesReducer";

export const MAXIMUMBETSTAKE = 1000;
export const MINIMUMBETSTAKE = 1;

const stakes = [25, 50, 75, MAXIMUMBETSTAKE];

const FixedStakes = () => {
  const [state, dispatch] = useContext(MinesContext);
  const { isGameActive } = state;

  const handleStakeChange = (stake) => {
    dispatch({ type: MINESACTION.UPDATESTAKE, stake: Number(stake) });
  };

  return (
    <div className="flex gap-2 mt-2">
      {stakes.map((stake, index) => {
        return (
          <button
            onClick={() => handleStakeChange(stake)}
            disabled={isGameActive}
            key={index}
            type="button"
            className="bg-gray-800 py-[4px] px-4 rounded-md font-bold text-sm hover:opacity-75 transition-all "
          >
            {stake}
          </button>
        );
      })}
    </div>
  );
};

export default FixedStakes;
