import React, { useContext } from "react";
import { MinesContext } from "../Context/MinesProvider";
import { MINESACTION } from "../Data/minesReducer";
import api from "../../../../Config/axiosConfig";
import BombSound from "../../../../assets/mines/BombSound.wav";
import DiamondSound from "../../../../assets/mines/DiamondSound.wav";
import CashoutAudio from "../../../../assets/mines/cashoutSound.wav";
import { toast } from "sonner";
import { authContext } from "../../../../Context/AuthProvider";
import { twoDecimals } from "../../../../utils/twoDecimals";
import { playAudio } from "../../../../utils/playAudio";

const GridButton = ({ index, setIsClicked, setIsLoading, isLoading }) => {
  const [state, dispatch, soundVolume] = useContext(MinesContext);
  const { setIsAuthenticated } = useContext(authContext);
  const { isLoading: loading, isGameActive } = state;

  const chooseGrid = async () => {
    if (!isGameActive) {
      return toast.info("Please start the Game.");
    }

    dispatch({ type: MINESACTION.TOGGLELOADING, isLoading: true });
    setIsLoading(true);
    setIsClicked(true);
    try {
      const response = await api.post("/games/mines/playgame", {
        choosenIndex: index,
      });
      const data = response.data;
      const {
        game: {
          gameOutcome,
          multiplier,
          payout,
          correctOpenedTiles,
          bustedIndex,
        },
        message,
      } = data;

      let openedTiles = correctOpenedTiles;

      //busted
      if (message === "busted") {
        openedTiles = [...correctOpenedTiles, bustedIndex[0]];
        dispatch({
          type: MINESACTION.BUSTED,
          grid: gameOutcome,
          openedTiles: openedTiles,
        });
        playAudio(BombSound, soundVolume);
        return;
      }

      //complete grid
      if (message === "cashedOut") {
        dispatch({
          type: MINESACTION.CASHEDOUT,
          openedTiles: openedTiles,
          multiplier: twoDecimals(multiplier),
          payout: twoDecimals(payout),
          payload: gameOutcome,
        });
        playAudio(CashoutAudio, soundVolume);
        return;
      }

      //is lucky
      dispatch({
        type: MINESACTION.START_OR_CONTINUE_GAME,
        payload: gameOutcome,
        multiplier,
        payout,
      });
      playAudio(DiamondSound, soundVolume);
    } catch (error) {
      if (!error.response) {
        toast.error("failed to contact the server");
      } else if (error.response.status === 401) {
        setIsAuthenticated(false);
        toast.info("session expired,You game was saved");
      } else if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Unknown error occured,please try again");
      }
    } finally {
      dispatch({ type: MINESACTION.TOGGLELOADING, isLoading: false });
      setIsLoading(false);
    }
  };

  return (
    <button
      disabled={loading || isLoading}
      onClick={chooseGrid}
      className="flex justify-center items-center w-full h-full font-medium text-sm bg-gray-700 text-white/50 rounded-md cursor-pointer hover:scale-[1.05] duration-300"
    ></button>
  );
};

export default GridButton;
