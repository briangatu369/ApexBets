import React, { useContext } from "react";
import { MinesContext } from "../Context/minesProvider";
import { MINESACTION } from "../Data/minesReducer";

const MAXNUMBEROFBOMBS = 24;
const bombsArray = [];

for (let i = 1; i <= MAXNUMBEROFBOMBS; i++) {
  bombsArray.push(i);
}

const BombPicker = () => {
  const [state, dispatch] = useContext(MinesContext);
  const { bombs, isGameActive } = state;

  const handleBombChange = (e) => {
    const value = e.target.value;
    dispatch({ type: MINESACTION.UPDATEBOMBS, bombs: Number(value) });
  };

  return (
    <div>
      <h5 className="text-sm  pb-1">Bombs</h5>
      <select
        name="bombs"
        id="id"
        className="bg-secondary h-[36px]"
        value={bombs}
        disabled={isGameActive}
        onChange={(e) => handleBombChange(e)}
      >
        {bombsArray.map((bomb) => {
          return (
            <option key={bomb} value={bomb}>
              {bomb}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default BombPicker;
