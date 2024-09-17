const { ACCOUNT } = require("../../../../Data/constants");
const { Mine } = require("../../../../Models");
const { findUser } = require("../../../../services/findUser");
const { getBalanceType } = require("../../../../services/getBalanceType");
const {
  checkIfHasEnoughBalance,
} = require("../../../../services/hasEnoughBalance");
const { updateUserBalance } = require("../../../../services/updateUserBalance");
const { GRIDSIZE, MAXBOMBS, MAXSTAKE, MINSTAKE } = require("../Data/constants");
const { generateGameOutcome } = require("../Utils/generateGameOutcome");

const startMinesGame = async (req, res) => {
  const { email, _id } = req.user;
  let { stake, bombs, accountType } = req.body;

  if (isNaN(stake) || stake <= 0 || isNaN(bombs) || bombs <= 0) {
    return res.status(400).json({ message: "Invalid stake or bombs value" });
  }

  //user real account if accountType is not passed
  if (!accountType) {
    accountType = ACCOUNT.REAL;
  }

  stake = parseFloat(stake);
  bombs = parseFloat(bombs);

  try {
    const game = await Mine.findOne({ userId: _id, isActive: true });

    //continue with previous game
    if (game) {
      const { correctOpenedTiles } = game;

      const partialGameOutcome = new Array(GRIDSIZE).fill(0);
      correctOpenedTiles.forEach((index, _) => {
        partialGameOutcome[index] = 1;
      });

      return res.status(200).json({
        message: "Another game is running. Finish the game to start a new game",
        game: { ...game._doc, gameOutcome: partialGameOutcome },
      });
    }

    if (bombs > MAXBOMBS) {
      return res.status(400).json({
        message: "Bombs can't be equal or more than number of grids",
      });
    }

    //stake limit exceeded
    if (stake > MAXSTAKE) {
      return res
        .status(400)
        .json({ message: `Maximum bet stake is KES ${MAXSTAKE}` });
    }

    //min
    if (stake < MINSTAKE) {
      return res
        .status(400)
        .json({ message: `Minimum bet stake is KES ${MINSTAKE}` });
    }

    //check if has enough balances to placeBet
    const user = await findUser("email", email);

    if (!user) {
      return res.status(404).json({ message: "user was not found" });
    }

    const { accountBalance, demoBalance } = user;

    const { canBet, message } = checkIfHasEnoughBalance(
      accountType,
      stake,
      accountBalance,
      demoBalance
    );

    // has Insufficient funds
    if (!canBet) {
      return res.status(400).json({ message });
    }

    const balanceToUpdate = getBalanceType(accountType); //demo or real account
    const accountBalances = await updateUserBalance(
      _id,
      balanceToUpdate,
      stake,
      false
    );

    const gameOutcome = generateGameOutcome(GRIDSIZE, bombs);
    const gameData = {
      userId: _id,
      stake: { amount: stake, accountType },
      bombs,
      multiplier: 1,
      payout: 0,
      hasCashedOut: false,
      isBusted: false,
      isActive: true,
      gameOutcome,
      accountType,
      correctOpenedTiles: [],
    };

    const newGame = new Mine(gameData);
    await newGame.save();

    const dispatchData = {
      ...newGame._doc,
      gameOutcome: new Array(GRIDSIZE).fill(0),
    };

    res.status(200).json({ game: dispatchData, accountBalances });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.error(error);
  }
};

module.exports = startMinesGame;
