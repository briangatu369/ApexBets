import React, { useContext, useState } from "react";
import SubmitButton from "../../../../Components/SubmitButton";
import { GiRollingBomb } from "react-icons/gi";
import { MinesContext } from "../Context/minesProvider";
import api from "../../../../Config/axiosConfig";
import StartGameAudio from "../../../../assets/mines/startGameSound.wav";
import CashoutAudio from "../../../../assets/mines/cashoutSound.wav";
import { toast } from "sonner";
import { MINESACTION } from "../Data/minesReducer";
import { authContext } from "../../../../Context/AuthProvider";
import { playAudio } from "../../../../utils/playAudio";
import { MAXIMUMBETSTAKE, MINIMUMBETSTAKE } from "./FixedStakes";

const ControllerButton = () => {
  const [state, dispatch, soundVolume] = useContext(MinesContext);
  const { setIsAuthenticated, setUserDetails, currentAccount } =
    useContext(authContext);
  const { stake, bombs, isGameActive, payout } = state;
  const [isLoading, setIsLoading] = useState(false);

  const handleResponse = (data, actionType) => {
    const {
      game: { gameOutcome, multiplier, payout, correctOpenedTiles },
      accountBalances,
    } = data;

    dispatch({
      type: actionType,
      payload: gameOutcome,
      openedTiles: correctOpenedTiles,
      multiplier,
      payout,
    });
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      ...accountBalances,
    }));
  };

  const startGame = async () => {
    setIsLoading(true);
    try {
      const gamePayload = {
        stake,
        bombs,
        accountType: currentAccount,
      };

      if (stake > MAXIMUMBETSTAKE) {
        gamePayload.stake = MAXIMUMBETSTAKE;
        dispatch({
          type: MINESACTION.UPDATESTAKE,
          stake: Number(MAXIMUMBETSTAKE),
        });
      }

      if (stake < MINIMUMBETSTAKE) {
        gamePayload.stake = MINIMUMBETSTAKE;
        dispatch({
          type: MINESACTION.UPDATESTAKE,
          stake: Number(MINIMUMBETSTAKE),
        });
      }

      const response = await api.post("/games/mines/startgame", gamePayload);
      const data = response.data;

      handleResponse(data, MINESACTION.START_OR_CONTINUE_GAME);
      playAudio(StartGameAudio, soundVolume);
    } catch (error) {
      if (!error.response) {
        toast.error("failed to contact the server");
      } else if (error.response.status === 401) {
        setIsAuthenticated(false);
        if (isGameActive) {
          return toast.info("session expired,You game was saved");
        }
        toast.info("session expired");
      } else if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Unknown error occured,please try again");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const cashout = async () => {
    setIsLoading(true);

    try {
      const response = await api.post("/games/mines/cashout");
      const data = response.data;
      handleResponse(data, MINESACTION.CASHEDOUT);
      playAudio(CashoutAudio, soundVolume);
    } catch (error) {
      if (!error.response) {
        toast.error("failed to contact the server");
      } else if (error.response.status === 401) {
        setIsAuthenticated(false);
        if (isGameActive) {
          return toast.info("session expired,You game was saved");
        }
        toast.info("session expired");
      } else if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Unknown error occured,please try again");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SubmitButton
      label={"Bet"}
      handleSubmit={!isGameActive ? startGame : cashout}
      isLoading={isLoading}
      styles={"bg-purple-1"}
    >
      {isLoading ? (
        <span>
          <GiRollingBomb size={23} />
        </span>
      ) : isGameActive ? (
        `Cashout ${payout}`
      ) : (
        "bet"
      )}
    </SubmitButton>
  );
};

export default ControllerButton;
