import React, { useContext } from "react";
import { GAME_MODES } from "../Data/constants";
import { diceContext } from "../Context/DiceProvider";
import { DICE_ACTIONS } from "../Data/diceReducer";
import { twMerge } from "tailwind-merge";

const GameModes = () => {
  const gameModes = Object.values(GAME_MODES);
  const { state, dispatch } = useContext(diceContext);
  const { gameMode, isLoading } = state;

  const handleChangeGameMode = (value) => {
    dispatch({ type: DICE_ACTIONS.UPDATE_GAME_MODE, gameMode: value });
  };

  return (
    <div className="border-b-1 border-white/15 pb-3">
      <div>
        <h4 className="text-sm mb-2 tracking-wide">Game Mode</h4>
      </div>
      <div className="flex justify-between gap-2 ">
        {gameModes.map((mode) => {
          return (
            <button
              key={mode.name}
              disabled={isLoading}
              onClick={() => handleChangeGameMode(mode.mode)}
              className={twMerge(
                `flex-1 bg-secondary px-2 py-[5px] rounded-md
                 font-medium text-sm lowerC tracking-wider`,
                gameMode === mode.mode && "bg-light-cream text-black"
              )}
            >
              {mode.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default GameModes;
