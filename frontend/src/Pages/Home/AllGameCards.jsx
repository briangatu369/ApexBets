import GameCard from "./GameCard";
import Mines from "../../assets/gamesImages/mines.png";
import Dice from "../../assets/gamesImages/dice.png";
import Crash from "../../assets/gamesImages/crash.jpg";
import JungleGames from "../../assets/gamesImages/jungleGames.png";
import MagicNumbers from "../../assets/gamesImages/magicNumbers.png";
import Peperuka from "../../assets/gamesImages/peperuka.png";
import Plinko from "../../assets/gamesImages/plinko.png";
import RockPaperScissors from "../../assets/gamesImages/rpc.png";
import { useState } from "react";

const AllGames = [
  { id: 0, name: "mines", image: Mines, isActive: true },
  { id: 1, name: "dice", image: Dice, isActive: true },
  { id: 2, name: "crash", image: Crash, isActive: false },
  { id: 3, name: "jungleGames", image: JungleGames, isActive: false },
  { id: 4, name: "magicNumbers", image: MagicNumbers, isActive: false },
  { id: 5, name: "peperuka", image: Peperuka, isActive: false },
  { id: 6, name: "plinko", image: Plinko, isActive: false },
  {
    id: 7,
    name: "rockPaperScissors",
    image: RockPaperScissors,
    isActive: false,
  },
];

const AllGameCards = () => {
  const [selectedGameName, setSelectedGameName] = useState("");

  return (
    <div className="flex flex-wrap justify-center gap-4 max-w-full mx-auto ">
      {AllGames.map((game) => {
        return (
          <GameCard
            key={game.id}
            image={game.image}
            name={game.name}
            isActive={game?.isActive}
            selectedGameName={selectedGameName}
            setSelectedGameName={setSelectedGameName}
          />
        );
      })}
    </div>
  );
};

export default AllGameCards;
