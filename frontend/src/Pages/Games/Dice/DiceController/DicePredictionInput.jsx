import React, { useContext } from "react";
import { diceContext } from "../Context/DiceProvider";
import { DICE_ACTIONS } from "../Data/diceReducer";

const DicePredictionInput = () => {
  const { state, dispatch } = useContext(diceContext);
  let { prediction, isLoading } = state;

  const handleChange = (e) => {
    let value = e.target.value;

    dispatch({ type: DICE_ACTIONS.UPDATE_PREDICTION, prediction: value });
  };

  return (
    <div className="flex gap-2 ">
      <div className="w-full">
        <h5 className="text-[13px] tracking-wide pb-[2px] font-medium">
          Your Prediction
        </h5>
        <div>
          <input
            disabled={isLoading}
            value={prediction.toString()}
            onChange={(e) => handleChange(e)}
            type="number"
            min={1}
            className="h-[36px] "
          />
        </div>
      </div>
    </div>
  );
};

export default DicePredictionInput;
