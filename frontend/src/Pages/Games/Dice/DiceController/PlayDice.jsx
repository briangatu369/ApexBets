import React, { useContext } from "react";
import api from "../../../../Config/axiosConfig";
import { diceContext } from "../Context/DiceProvider";
import SubmitButton from "../../../../Components/SubmitButton";
import { DICE_ACTIONS } from "../Data/diceReducer";
import { diceIcons } from "../Components/DiceIcons";
import { BsFillDice6Fill } from "react-icons/bs";
import { authContext } from "../../../../Context/AuthProvider";
import { toast } from "sonner";
import { MAXIMUM_STAKE, MINIMUM_STAKE } from "../Data/constants";
import { useHandleNavigate } from "../../../../Hooks/useHandleNavigate";

const PlayDice = () => {
  const { state, dispatch } = useContext(diceContext);
  const { setIsAuthenticated, currentAccount, setUserDetails, userDetails } =
    useContext(authContext);
  const { handleNavigate } = useHandleNavigate();

  const { isLoading, stake, numberOfDices, prediction, dices, gameMode } =
    state;

  const handlePlayDice = async () => {
    dispatch({ type: DICE_ACTIONS.UPDATE_ISLOADING, isLoading: true });
    try {
      // check if stake is lower than minimum stake required
      if (stake < MINIMUM_STAKE) {
        toast.error(`Minimum stake  is ${MINIMUM_STAKE}`);
        return;
      }

      //check is maximum stake is exceeded
      if (stake > MAXIMUM_STAKE) {
        toast.error(`Maximum stake is ${MAXIMUM_STAKE}`);
        return;
      }

      const dicePayload = {
        stake,
        accountType: currentAccount,
        numberOfDices,
        predictedOutcome: prediction,
        gameMode,
      };
      const response = await api.post("/games/dice/playgame", dicePayload);
      const { results, resultTotals, status, accountBalances } =
        response?.data?.data;

      setUserDetails({ ...userDetails, ...accountBalances });

      for (let i = 0; i < dices.length; i++) {
        if (results.length >= dices[i].id) {
          dices[i].selected = true;
          let diceResults = results[i];
          dices[i].diceIcon = diceIcons[diceResults - 1];
        } else {
          dices[i].selected = false;
        }
      }

      dices.sort((a, b) => {
        return b.selected ? 1 : -1; // selected=true comes first
      });

      dispatch({
        type: DICE_ACTIONS.UPDATE_MANY,
        many: { dices: dices, status: status, resultTotals },
      });
    } catch (error) {
      if (!error.response) {
        toast.error("failed to contact the server");
      } else if (error.response.status === 401) {
        setIsAuthenticated(false);
        handleNavigate("/login");
      } else if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Unknown error occured,please try again");
      }
    } finally {
      dispatch({ type: DICE_ACTIONS.UPDATE_ISLOADING, isLoading: false });
    }
  };
  return (
    <SubmitButton
      handleSubmit={handlePlayDice}
      isLoading={isLoading}
      styles={"bg-purple-1 my-2"}
    >
      {isLoading ? (
        <span>
          <BsFillDice6Fill size={20} />
        </span>
      ) : (
        "Roll Dice"
      )}
    </SubmitButton>
  );
};

export default PlayDice;
