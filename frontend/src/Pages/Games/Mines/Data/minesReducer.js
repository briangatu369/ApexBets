import { twoDecimals } from "../../../../utils/twoDecimals";

const GRIDSIZE = 25;
const INITIALSTAKE = 50;
const INITIALBOMBS = 3;
const grid = new Array(GRIDSIZE).fill(null);

export const initialState = {
  grid,
  stake: INITIALSTAKE,
  bombs: INITIALBOMBS,
  multiplier: 1,
  payout: 0,
  isGameActive: false,
  isLoading: false,
  hasCashedOut: false,
  isBusted: false,
  openedTiles: [],
};

export const MINESACTION = {
  START_OR_CONTINUE_GAME: "STARTORCONTINUEGAME",
  CASHEDOUT: "CASHEDOUT",
  BUSTED: "BUSTED",
  TOGGLELOADING: "TOGGLELOADING",
  UPDATESTAKE: "UPDATESTAKE",
  UPDATEBOMBS: "UPDATEBOMBS",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case MINESACTION.START_OR_CONTINUE_GAME:
      return {
        ...state,
        isGameActive: true,
        hasCashedOut: false,
        isBusted: false,
        clickedCorrectIndices: [],
        grid: action.payload,
        stake: action.stake ? action.stake : state.stake,
        bombs: action.bombs ? action.bombs : state.bombs,
        multiplier: twoDecimals(action.multiplier),
        payout: twoDecimals(action.payout),
      };
    case MINESACTION.BUSTED:
      return {
        ...state,
        isGameActive: false,
        isBusted: true,
        hasCashedOut: false,
        openedTiles: action.openedTiles,
        grid: action.grid,
      };
    case MINESACTION.CASHEDOUT:
      return {
        ...state,
        isGameActive: false,
        isBusted: false,
        hasCashedOut: true,
        multiplier: twoDecimals(action.multiplier),
        payout: twoDecimals(action.payout),
        openedTiles: action.openedTiles,
        grid: action.payload,
      };
    case MINESACTION.TOGGLELOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case MINESACTION.UPDATESTAKE:
      return {
        ...state,
        stake: action.stake,
      };
    case MINESACTION.UPDATEBOMBS:
      return {
        ...state,
        bombs: action.bombs,
      };
    default:
      return state;
  }
};
