const express = require("express");

const startMinesGame = require("../Controllers/Games/Mines/Routes/startMinesGame");
const playMines = require("../Controllers/Games/Mines/Routes/playMineGame");
const getActiveMinesGame = require("../Controllers/Games/Mines/Routes/getActiveMinesGame");
const { minesCashOut } = require("../Controllers/Games/Mines/Routes/cashout");

const { verifyJwt } = require("../Middleware/validateJwt");
const { playDice } = require("../Controllers/Games/Dice/Routes/playDice");
const {
  diceBetHistory,
} = require("../Controllers/Games/Dice/Routes/diceBetHistory");
const {
  minesBetHistory,
} = require("../Controllers/Games/Mines/Routes/minesBetHistory");

const router = express.Router();

/* ..........mines routes ............ */
router.post("/mines/startgame", verifyJwt, startMinesGame);
router.post("/mines/playgame", verifyJwt, playMines);
router.get("/mines", verifyJwt, getActiveMinesGame);
router.post("/mines/cashout", verifyJwt, minesCashOut);
router.get("/mines/bethistory", verifyJwt, minesBetHistory);

/* ..........dice routes ............ */
router.post("/dice/playgame", verifyJwt, playDice);
router.get("/dice/bethistory", verifyJwt, diceBetHistory);

module.exports = { GameRouter: router };
