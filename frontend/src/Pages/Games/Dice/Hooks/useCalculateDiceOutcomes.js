import { useEffect } from "react";
import {
  GAME_MODES,
  MAXIMUM_STAKE,
  MAXIMUM_WIN_AMOUNT,
  MINIMUM_STAKE,
} from "../Data/constants";
import { validatePredictionInCorrectMode } from "../gameLogics/correctModeLogic";
import { validatePredictionInOverMode } from "../gameLogics/overModeLogic";
import { validatePredictionInUnderMode } from "../gameLogics/underModeLogic";
import { DICE_ACTIONS } from "../Data/diceReducer";
import {
  calculateDiceMultiplier,
  calculateFavorableOutcomes,
} from "../gameLogics/calculateMultiplier";

export const useCalculateDiceOutcomes = (state, dependancies) => {
  let {
    gameMode,
    prediction,
    multiplier,
    payout,
    numberOfDices,
    probability,
    stake,
    dispatch,
  } = state;

  useEffect(() => {
    if (stake > MAXIMUM_STAKE || stake < MINIMUM_STAKE) {
      return;
    }

    // Initialize calculateFavorableOutcome .
    const calculateFavorableOutcome = calculateFavorableOutcomes();

    let favourableOutcome = 0,
      comparisonFn = () => {}; // Default comparison function does nothing.

    // Check if the game is in CORRECT mode.
    if (gameMode === GAME_MODES.CORRECT.mode) {
      // Validate the prediction in the correct mode .
      prediction = validatePredictionInCorrectMode(prediction, numberOfDices);

      comparisonFn = (currentCount, predictedOutcome) =>
        currentCount === predictedOutcome;

      favourableOutcome = calculateFavorableOutcome(
        0, // Starting count of favorable outcomes.
        numberOfDices,
        prediction,
        comparisonFn
      );

      multiplier = calculateDiceMultiplier(favourableOutcome, numberOfDices);
      payout = multiplier * stake;

      if (payout > MAXIMUM_WIN_AMOUNT) {
        payout = MAXIMUM_WIN_AMOUNT;
      }
    }

    // Check if the game is in OVER mode.
    if (gameMode === GAME_MODES.OVER.mode) {
      // Validate the prediction in the over mode.
      prediction = validatePredictionInOverMode(prediction, numberOfDices);

      comparisonFn = (currentCount, predictedOutcome) =>
        currentCount > predictedOutcome;

      favourableOutcome = calculateFavorableOutcome(
        0, // Starting count of favorable outcomes.
        numberOfDices,
        prediction,
        comparisonFn
      );

      multiplier = calculateDiceMultiplier(favourableOutcome, numberOfDices);
      payout = multiplier * stake;

      if (payout > MAXIMUM_WIN_AMOUNT) {
        payout = MAXIMUM_WIN_AMOUNT;
      }
    }

    // Check if the game is in UNDER mode.
    if (gameMode === GAME_MODES.UNDER.mode) {
      // Validate the prediction in the under mode.
      prediction = validatePredictionInUnderMode(prediction, numberOfDices);

      comparisonFn = (currentCount, predictedOutcome) =>
        currentCount < predictedOutcome;

      favourableOutcome = calculateFavorableOutcome(
        0, // Starting count of favorable outcomes.
        numberOfDices,
        prediction,
        comparisonFn
      );

      multiplier = calculateDiceMultiplier(favourableOutcome, numberOfDices);
      payout = multiplier * stake;

      if (payout > MAXIMUM_WIN_AMOUNT) {
        payout = MAXIMUM_WIN_AMOUNT;
      }
    }

    // update prediction and multiplier after a x  second delay.
    const t = setTimeout(() => {
      dispatch({
        type: DICE_ACTIONS.UPDATE_MANY,
        many: { prediction, multiplier, probability, payout },
      });
    }, 1200);

    // Clean-up function
    return () => {
      clearTimeout(t);
    };
  }, [...dependancies]);
};
