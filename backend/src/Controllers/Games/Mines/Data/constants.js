const GRIDSIZE = 25;
const MAXBOMBS = GRIDSIZE - 1;
const MAXSTAKE = 1000;
const MINSTAKE = 1;

const MINESSTATUSCODE = {
  noActiveGame: 0,
  hasActiveGame: 1,
};

module.exports = { GRIDSIZE, MAXBOMBS, MINESSTATUSCODE, MAXSTAKE, MINSTAKE };
