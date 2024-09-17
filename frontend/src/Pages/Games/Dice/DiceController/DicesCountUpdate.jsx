import React, { useContext } from "react";
import { diceContext } from "../Context/DiceProvider";
import { DICE_ACTIONS } from "../Data/diceReducer";

const dices = [1, 2, 3, 4, 5, 6];

const DicesCountUpdate = () => {
  const { state, dispatch } = useContext(diceContext);
  const { numberOfDices, isLoading } = state;

  const updateNumberOfDices = (e) => {
    const value = e.target.value;

    dispatch({
      type: DICE_ACTIONS.UPDATE_NUMBER_OF_DICES,
      numberOfDices: value,
    });
  };

  return (
    <div className="w-1/2">
      <h5 className="text-[13px] tracking-wide pb-[2px] font-medium">Dices</h5>
      <select
        disabled={isLoading}
        value={numberOfDices}
        onChange={(e) => updateNumberOfDices(e)}
        name="Dices"
        id="id"
        className="bg-secondary h-[36px] w-full"
      >
        {dices.map((dice) => {
          return (
            <option key={dice} value={dice}>
              {dice}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default DicesCountUpdate;
