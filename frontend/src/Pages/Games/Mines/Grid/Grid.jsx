import React, { useContext, useEffect } from "react";
import GridElement from "./GridElement";
import { MinesContext } from "../Context/MinesProvider";
import api from "../../../../Config/axiosConfig";
import { MINESACTION } from "../Data/minesReducer";
import { toast } from "sonner";
import CashOutModal from "../../../../Components/CashoutModal";

const Grid = () => {
  const [state, dispatch] = useContext(MinesContext);
  const { grid, payout, multiplier, hasCashedOut } = state;

  const getUnfinishedGame = async () => {
    dispatch({ type: MINESACTION.TOGGLELOADING, isLoading: true });
    try {
      const response = await api.get("/games/mines");

      const data = response.data;
      const { statusCode } = data;

      //no active game
      if (statusCode === 0) {
        return;
      }

      //has active game
      const {
        game: {
          gameOutcome,
          multiplier,
          payout,
          stake: { amount },
          bombs,
        },
      } = data;

      dispatch({
        type: MINESACTION.START_OR_CONTINUE_GAME,
        payload: gameOutcome,
        multiplier,
        stake: amount,
        bombs,
        payout,
      });
    } catch (error) {
      if (!error.response) {
        toast.error("Failed to contact the server.");
      } else if (error.response.status === 401) {
        return;
      } else {
        toast.error("Unknown error occurred. Please try again.");
      }
    } finally {
      dispatch({ type: MINESACTION.TOGGLELOADING, isLoading: false });
    }
  };

  useEffect(() => {
    getUnfinishedGame();
  }, []);

  return (
    <div className="flex-1 flex justify-center">
      <div className="grid grid-cols-5 gap-[8px]  py-1 relative  ">
        <CashOutModal
          multiplier={multiplier}
          payout={payout}
          showModal={hasCashedOut}
          accountType={"REAL"}
        />
        {grid?.map((value, index) => {
          return <GridElement key={index} index={index} value={value} />;
        })}
      </div>
    </div>
  );
};

export default Grid;
