import React from "react";
import GameModes from "./GameModes";
import DicePredictionInput from "./DicePredictionInput";
import DicesCountUpdate from "./DicesCountUpdate";
import StakeInput from "./StakeInput";
import PlayDice from "./PlayDice";

const DiceController = () => {
  return (
    <div className=" flex flex-col-reverse md:flex-col">
      <div className="flex flex-col gap-3">
        <GameModes />
        <DicePredictionInput />
        <div className="flex gap-2">
          <StakeInput />
          <DicesCountUpdate />
        </div>
      </div>

      {/* roll dice button */}
      <PlayDice />
    </div>
  );
};

export default DiceController;
