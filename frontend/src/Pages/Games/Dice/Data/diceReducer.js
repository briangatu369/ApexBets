import { GAME_MODES, GAME_STATUS, MINIMUM_DICES } from "./constants";
import { generateRandomNumber } from "../../../../utils/generateRandomNumber";
import { diceIcons } from "../Components/DiceIcons";

export const generateRandomDice = () => {
  return diceIcons[generateRandomNumber(diceIcons.length)];
};

const initialDices = [
  { id: 1, diceIcon: generateRandomDice(), selected: false },
  { id: 2, diceIcon: generateRandomDice(), selected: false },
  { id: 3, diceIcon: generateRandomDice(), selected: false },
  { id: 4, diceIcon: generateRandomDice(), selected: false },
  { id: 5, diceIcon: generateRandomDice(), selected: false },
  { id: 6, diceIcon: generateRandomDice(), selected: false },
];

export const initialState = {
  stake: 20,
  numberOfDices: MINIMUM_DICES, // default 1
  prediction: 6,
  dices: initialDices,
  gameMode: GAME_MODES.CORRECT.mode, //CORRECT MODE ,initial mode
  payout: 0,
  multiplier: 0,
  probability: 0,
  isLoading: false,
  status: GAME_STATUS.NEUTRAL,
  resultTotals: null,
};

export const DICE_ACTIONS = {
  UPDATE_GAME_MODE: "UPDATE_GAME_MODE",
  UPDATE_PREDICTION: "UPDATE_PREDICTED_OUTCOME",
  UPDATE_NUMBER_OF_DICES: "UPDATE_NUMBER_OF_DICES",
  UPDATE_STAKE: "UPATE_STAKE",
  UPDATE_PAYOUT: "UPATE_PAYOUT",
  UPDATE_MULITIPLIER: "UPDATE_MULTIPLIER",
  UPDATE_ISLOADING: "UPDATE_IS_LOADING",
  UPDATE_MANY: "UPDATE_MANY",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case DICE_ACTIONS.UPDATE_GAME_MODE:
      return { ...state, gameMode: action.gameMode };
    case DICE_ACTIONS.UPDATE_PREDICTION:
      return { ...state, prediction: Number(action.prediction) };
    case DICE_ACTIONS.UPDATE_NUMBER_OF_DICES:
      return { ...state, numberOfDices: Number(action.numberOfDices) };
    case DICE_ACTIONS.UPDATE_STAKE:
      return { ...state, stake: Number(action.stake) };
    case DICE_ACTIONS.UPDATE_PAYOUT:
      return { ...state, payout: Number(action.payout) };
    case DICE_ACTIONS.UPDATE_MULITIPLIER:
      return { ...state, multiplier: Number(action.multiplier) };
    case DICE_ACTIONS.UPDATE_ISLOADING:
      return { ...state, isLoading: action.isLoading };
    case DICE_ACTIONS.UPDATE_MANY:
      return { ...state, ...action.many };
    default:
      return state;
  }
};
