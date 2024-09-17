const { Mine } = require("../../../../Models");
const { calculateMultiplier } = require("../Utils/calculateMultiplier");
const { GRIDSIZE } = require("../Data/constants");

const playMines = async (req, res) => {
  let { choosenIndex } = req.body;
  const { _id } = req.user;

  if (choosenIndex < 0 || isNaN(choosenIndex) || !_id) {
    return res.status(400).json({ message: "invalid request body" });
  }

  // Grid size exceeded
  if (choosenIndex > GRIDSIZE - 1) {
    return res.status(400).json({ message: "grid size exceeded" });
  }

  try {
    const game = await Mine.findOne({ userId: _id, isActive: true });

    if (!game) {
      return res.status(400).json({
        message: "Game not found, consider starting the game first",
      });
    }

    const {
      correctOpenedTiles,
      gameOutcome,
      bombs,
      stake: { amount, accountType },
    } = game;

    // Busted
    if (gameOutcome[choosenIndex] === 0) {
      const updatedGame = await Mine.findOneAndUpdate(
        { userId: _id, isActive: true },
        {
          isActive: false,
          isBusted: true,
          bustedIndex: [choosenIndex],
          payout: 0,
        },
        { new: true }
      );

      return res
        .status(200)
        .json({ message: "busted", game: updatedGame._doc });
    }

    // Repeated tile/index
    const repeatedIndex = game.correctOpenedTiles.includes(choosenIndex);
    if (repeatedIndex) {
      return res.status(400).json({
        message: "The tile is already selected, choose another tile",
      });
    }

    // Update game status
    const newCorrectOpenedTiles = [...correctOpenedTiles, choosenIndex];
    const correctOpenedTilesSize = newCorrectOpenedTiles.length;
    const newMultiplier = calculateMultiplier(
      GRIDSIZE,
      bombs,
      correctOpenedTilesSize
    );
    const newPayout = newMultiplier * amount;

    // Game completed, cash out automatically
    const maximumTilesToPick = GRIDSIZE - correctOpenedTiles.length - 1;
    if (maximumTilesToPick === bombs) {
      accountBalance += newPayout;

      const balanceTypeToUpdate = getBalanceType(accountType); //demo or real account
      const accountBalances = await updateUserBalance(
        _id,
        balanceTypeToUpdate,
        newPayout,
        true
      );

      const updatedGame = await Mine.findOneAndUpdate(
        { userId: _id, isActive: true },
        {
          hasCashedOut: true,
          isActive: false,
          correctOpenedTiles: newCorrectOpenedTiles,
          multiplier: newMultiplier,
          payout: newPayout,
        },
        { new: true }
      );

      return res
        .status(200)
        .json({ message: "cashedOut", game: updatedGame, accountBalances });
    }

    // Game continues
    const updatedGame = await Mine.findOneAndUpdate(
      { userId: _id, isActive: true },
      {
        correctOpenedTiles: newCorrectOpenedTiles,
        multiplier: newMultiplier,
        payout: newPayout,
      },
      { new: true }
    );

    const partialGameOutcome = new Array(25).fill(0);
    newCorrectOpenedTiles.forEach((value) => {
      partialGameOutcome[value] = 1;
    });

    res.status(200).json({
      message: "correct pick",
      game: { ...updatedGame._doc, gameOutcome: partialGameOutcome },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = playMines;
