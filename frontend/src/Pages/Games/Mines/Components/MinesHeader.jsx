import React, { useContext } from "react";
import { MinesContext } from "../Context/minesProvider";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { FaHistory } from "react-icons/fa";
import GameHeader from "../../../../Components/GamesHeader/GamesHeader";
import GamesHeaderElement from "../../../../Components/GamesHeader/GamesHeaderElement";
import { useDisclosure } from "@nextui-org/modal";
import MinesBetHistory from "./MinesBetHistory";

const MinesHeader = () => {
  const [, , soundVolume, handleChangeVolume] = useContext(MinesContext);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <GameHeader gameName={"Mines"}>
      <GamesHeaderElement Icon={<HiMiniSpeakerWave size={20} />}>
        <div className="-ml-[10px]">
          <input
            type="range"
            className="custom-range  focus:outline-none focus:border-none p-0 m-0 h-[15px]"
            value={soundVolume}
            onChange={(e) => handleChangeVolume(e)}
            step={0.05}
            min={0}
            max={1}
          />
        </div>
      </GamesHeaderElement>

      <GamesHeaderElement
        Icon={<FaHistory />}
        action={() => {
          onOpen();
        }}
        label={"Bet History"}
        info={"View your bet history"}
      >
        <MinesBetHistory
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
        />
      </GamesHeaderElement>
    </GameHeader>
  );
};

export default MinesHeader;
