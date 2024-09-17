import React, { useContext } from "react";
import FixedStakes from "./FixedStakes";
import { MinesContext } from "../Context/minesProvider";
import { MINESACTION } from "../Data/minesReducer";

const StakeInput = () => {
  const [state, dispatch] = useContext(MinesContext);
  const { stake, isGameActive } = state;

  const handleStakeChange = (e) => {
    let value = Number(e.target.value);
    dispatch({ type: MINESACTION.UPDATESTAKE, stake: value });
  };

  return (
    <div className="mb-1">
      <h5 className="text-sm pb-1">Stake</h5>
      <div>
        <input
          value={stake}
          onChange={(event) => handleStakeChange(event)}
          type="number"
          disabled={isGameActive}
          className="h-[36px]"
        />
      </div>
      <FixedStakes />
    </div>
  );
};

export default StakeInput;
