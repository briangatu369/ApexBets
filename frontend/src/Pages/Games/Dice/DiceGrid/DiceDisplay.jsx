import React, { useContext } from "react";
import SingleDice from "./SingleDice";
import { diceContext } from "../Context/DiceProvider";

const DiceDisplay = () => {
  const { state } = useContext(diceContext);
  let { dices } = state;

  return (
    <div className=" border-1 border-white/50 flex gap-3 lg:gap-5 py-5 px-4 rounded-lg">
      {dices.map((dice) => {
        return (
          <SingleDice
            key={dice?.id}
            selected={dice.selected}
            diceIcon={dice?.diceIcon}
            id={dice?.id}
          />
        );
      })}
    </div>
  );
};

export default DiceDisplay;
