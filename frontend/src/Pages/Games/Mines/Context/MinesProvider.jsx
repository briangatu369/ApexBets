import React, { createContext, useEffect, useReducer, useState } from "react";
import { initialState, reducer } from "../Data/minesReducer";
import { useHandleVolumeChange } from "../../../../Hooks/useHandleVolumeChange";

export const MinesContext = createContext([initialState, () => {}]);

export const MinesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { soundVolume, handleChangeVolume } = useHandleVolumeChange();

  return (
    <MinesContext.Provider
      value={[state, dispatch, soundVolume, handleChangeVolume]}
    >
      {children}
    </MinesContext.Provider>
  );
};

export default MinesProvider;
