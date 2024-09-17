import React, { useContext } from "react";
import StakeInput from "./StakeInput";
import BombPicker from "./BombPicker";
import ControllerButton from "./ControllerButton";
import GameStatus from "./GameStatus";

const Controller = () => {
  return (
    <div className="bg-primary min-w-[365px]  lg:min-w-80 rounded-md pb-1 px-3">
      <h4 className="pt-2 font-medium tracking-wide text-sm py-2 ">
        Place your Bet
      </h4>
      <div className="flex flex-col-reverse  lg:flex-col gap-2 pb-4">
        <StakeInput />
        <GameStatus />
        <BombPicker />
        <ControllerButton />
      </div>
    </div>
  );
};

export default Controller;
