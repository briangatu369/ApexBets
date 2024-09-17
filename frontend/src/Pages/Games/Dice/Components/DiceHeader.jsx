import { useDisclosure } from "@nextui-org/modal";
import DiceBetHistory from "./DiceBetHistory";
import GamesHeaderElement from "../../../../Components/GamesHeader/GamesHeaderElement";
import GameHeader from "../../../../Components/GamesHeader/GamesHeader";
import { FaHistory } from "react-icons/fa";

const DiceHeader = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <GameHeader gameName={"Dices"}>
      <div className="text-white/80">
        <GamesHeaderElement
          Icon={<FaHistory />}
          action={() => {
            onOpen();
          }}
          label={"Bet History"}
          info={"View your bet history"}
        >
          <DiceBetHistory
            isOpen={isOpen}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
          />
        </GamesHeaderElement>
      </div>
    </GameHeader>
  );
};

export default DiceHeader;
