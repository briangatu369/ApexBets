import React, { useContext, useEffect, useState } from "react";
import Diamond from "../../../../assets/mines/diamond.svg";
import Bomb from "../../../../assets/mines/bomb.svg";
import GridElementLoader from "./GridElementLoader";
import { MinesContext } from "../Context/MinesProvider";
import { twMerge } from "tailwind-merge";
import GridButton from "./GridButton";

const GridElement = ({ index, value }) => {
  const [state] = useContext(MinesContext);
  const { isGameActive, isBusted, hasCashedOut, openedTiles } = state;
  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const tileWasOpened = openedTiles?.includes(index);

  useEffect(() => {
    // Continue the previous game
    if (isGameActive && value === 1) {
      setIsClicked(true);
    }

    // Restore grid status
    if (!isGameActive) {
      setIsClicked(false);
    }
  }, [isGameActive, isClicked]);

  return (
    <div
      className={twMerge(
        `bg-primary flex justify-center items-center 
      rounded-md w-[68px]
     h-[68px] lg:h-[85px] lg:w-[85px]`,
        isLoading && "animate-shake"
      )}
    >
      {isLoading ? (
        <GridElementLoader isLoading={isLoading} isGameActive={isGameActive} />
      ) : (isGameActive && isClicked) || isBusted || hasCashedOut ? (
        <img
          src={value === 1 ? Diamond : Bomb}
          alt="outcome"
          className={twMerge(
            "h-[52%] w-[52%] object-contain duration-300",
            isClicked && isGameActive ? "opacity-100" : "opacity-30",
            tileWasOpened && !isGameActive && "scale-110 opacity-1"
          )}
        />
      ) : (
        <GridButton
          index={index}
          setIsClicked={setIsClicked}
          setIsLoading={setIsLoading}
        />
      )}
    </div>
  );
};

export default GridElement;
