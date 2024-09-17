import React, { useContext, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Badge } from "@nextui-org/badge";
import { useHandleNavigate } from "../../Hooks/useHandleNavigate";
import { authContext } from "../../Context/AuthProvider";
import { ACCOUNTS } from "../../Data/constants";

const GameCard = ({
  image,
  name,
  isActive,
  selectedGameName,
  setSelectedGameName,
}) => {
  const { handleNavigate } = useHandleNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const { setCurrentAccount } = useContext(authContext);

  const changeSelectedGame = () => {
    setIsClicked(true);
    setSelectedGameName(name);
  };

  return (
    <Badge
      content="Active"
      color="danger"
      size="sm"
      placement="top-right"
      showOutline="false"
      isInvisible={!isActive}
      shape="rectangle"
      className="font-medium px-1  tracking-wide rounded-none right-3"
    >
      <div className={twMerge("group w-40 lg:w-[150px] h-40 relative")}>
        <img
          onClick={changeSelectedGame}
          src={image}
          alt={name}
          className="w-full h-full object-cover  rounded-md cursor-pointer"
        />
        <div
          to={`/games/${name}`}
          className={twMerge(
            `hidden  absolute left-0 right-0 top-0 bottom-0 
          transition-all duration-500 bg-gradient-to-b from-black/50 to-black/90 cursor-pointer`,
            isClicked && selectedGameName === name && "flex"
          )}
        >
          <div className=" flex flex-col justify-center items-center w-full  gap-4 ">
            <button
              onClick={() => {
                setCurrentAccount(ACCOUNTS.REAL);
                handleNavigate(`/games/${name}`);
              }}
              className="bg-mint-green text-black py-2 px-8 rounded-md font-semibold text-[12px] tracking-wide hover:opacity-95 "
            >
              Play Game
            </button>
            <button
              onClick={() => {
                setCurrentAccount(ACCOUNTS.DEMO);
                handleNavigate(`/games/${name}`);
              }}
              className="bg-secondary  text-white py-2 px-8  rounded-md font-semibold text-[12px] tracking-wide hover:opacity-95 "
            >
              Play Demo
            </button>
          </div>
        </div>
      </div>
    </Badge>
  );
};

export default GameCard;
