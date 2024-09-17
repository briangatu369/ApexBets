import React, { useContext, useEffect } from "react";
import { GrFormAdd } from "react-icons/gr";
import { diceContext } from "../Context/DiceProvider";
import { DICE_ACTIONS } from "../Data/diceReducer";
import { MINIMUM_DICES } from "../Data/constants";

const SingleDice = ({ selected, diceIcon, id }) => {
  const { state, dispatch } = useContext(diceContext);
  let { numberOfDices, isLoading, dices } = state;

  // Function to update the number of selected dices when a user interacts with the dice
  const updateNumberOfDices = () => {
    // Prevent toggling if the Number of dice is at the minimum limit(Minimum limit===1)
    if (selected && numberOfDices === MINIMUM_DICES) return;

    // Toggle the selected dice
    const toggleSelected = selected ? false : true;

    // Update the number of dices depending on whether the dice was selected or unselected
    const updatedNumberOfDices = selected
      ? numberOfDices - 1
      : numberOfDices + 1;

    // Update the respective dice in the dices array by toggling its 'selected' state
    const updatedDices = dices
      .map((dice) => {
        if (dice.id === id) {
          return { ...dice, selected: toggleSelected };
        }
        return dice;
      })
      .sort((a, b) => {
        return b.selected ? 1 : -1; //sort "selected=== true",comes first
      });

    dispatch({
      type: DICE_ACTIONS.UPDATE_MANY,
      many: { dices: updatedDices, numberOfDices: updatedNumberOfDices },
    });
  };

  // update DICE UI when number numberOfDices changes
  useEffect(() => {
    //  mark dices UI elements selected if their id is less than or equal to numberOfDices
    for (let i = 0; i < dices.length; i++) {
      if (numberOfDices >= dices[i].id) {
        dices[i].selected = true;
      } else {
        dices[i].selected = false;
      }
    }

    //selected===true dices appear first
    dices.sort((a, b) => {
      return b.selected ? 1 : -1;
    });

    dispatch({
      type: DICE_ACTIONS.UPDATE_MANY,
      many: { dices: dices },
    });
  }, [numberOfDices]);

  return (
    <div
      onClick={updateNumberOfDices}
      className="flex justify-center items-center w-11 h-11 rounded-md bg-primary font-bold text-lg cursor-pointer"
    >
      {isLoading && selected ? (
        <div className="spinner w-11 h-11"></div>
      ) : selected ? (
        diceIcon
      ) : (
        <div>
          <GrFormAdd size={22} />
        </div>
      )}
    </div>
  );
};

export default SingleDice;
