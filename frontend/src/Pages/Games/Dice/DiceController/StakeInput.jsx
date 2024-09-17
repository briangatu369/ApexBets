import React, { useContext, useEffect } from "react";
import { diceContext } from "../Context/DiceProvider";
import { DICE_ACTIONS } from "../Data/diceReducer";
import { MAXIMUM_STAKE, MINIMUM_STAKE } from "../Data/constants";

const StakeInput = () => {
  const { state, dispatch } = useContext(diceContext);
  const { stake, isLoading } = state;

  const handleStakeChange = (e) => {
    let value = Number(e.target.value);

    dispatch({ type: DICE_ACTIONS.UPDATE_STAKE, stake: value });
  };

  //reset stake to maximum or minimum stake if one of both ends are meet
  // useEffect(() => {
  //   let t;
  //   if (stake > MAXIMUM_STAKE) {
  //     t = setTimeout(() => {
  //       dispatch({ type: DICE_ACTIONS.UPDATE_STAKE, stake: MAXIMUM_STAKE });
  //     }, 2000);
  //   }

  //   if (stake < MINIMUM_STAKE) {
  //     t = setTimeout(() => {
  //       dispatch({ type: DICE_ACTIONS.UPDATE_STAKE, stake: MINIMUM_STAKE });
  //     }, 2000);
  //   }

  //   return () => {
  //     if (t) {
  //       clearTimeout(t);
  //     }
  //   };
  // }, [stake]);

  return (
    <div className="mb-1">
      <h5 className="text-sm pb-1">Stake</h5>
      <div>
        <input
          disabled={isLoading}
          value={stake.toString()}
          onChange={(event) => handleStakeChange(event)}
          type="number"
          min={1}
          className="h-[36px]"
        />
      </div>
    </div>
  );
};

export default StakeInput;
