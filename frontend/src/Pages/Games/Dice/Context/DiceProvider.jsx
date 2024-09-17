import React, { createContext, useReducer } from "react";
import { useCalculateDiceOutcomes } from "../Hooks/useCalculateDiceOutcomes";
import { initialState, reducer } from "../Data/diceReducer";

export const diceContext = createContext({});

const DiceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  let { prediction, numberOfDices, gameMode, stake, payout } = state;

  useCalculateDiceOutcomes(
    { prediction, numberOfDices, gameMode, stake, payout, dispatch },
    [gameMode, prediction, numberOfDices, stake]
  );

  return (
    <diceContext.Provider value={{ state, dispatch }}>
      {children}
    </diceContext.Provider>
  );
};

export default DiceProvider;
