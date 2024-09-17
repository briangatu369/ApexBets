import DiceProvider from "./Context/DiceProvider";
import GameLayout from "../../../Components/GameLayout";
import DiceController from "./DiceController/DiceController";
import DiceHeader from "./Components/DiceHeader";
import DiceGrid from "./DiceGrid/DiceGrid";

const Dice = () => {
  return (
    <DiceProvider>
      <DiceHeader />
      <div className="mt-2">
        <GameLayout
          LeftComponent={<DiceController />}
          RightComponent={<DiceGrid />}
        />
      </div>
    </DiceProvider>
  );
};

export default Dice;
