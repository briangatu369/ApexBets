const { Mine } = require("../../../../Models");
const { GRIDSIZE, MINESSTATUSCODE } = require("../Data/constants");

const getActiveMinesGame = async (req, res) => {
  const { _id } = req.user;

  try {
    const game = await Mine.findOne({ userId: _id, isActive: true });

    //has no unfinished game
    if (!game) {
      return res.status(200).json({
        statusCode: MINESSTATUSCODE.noActiveGame,
        message: "no active game",
      });
    }

    //has unfinished game
    const { correctOpenedTiles } = game;

    const previouslyOpenedTiles = new Array(GRIDSIZE).fill(0);
    correctOpenedTiles.forEach((index, _) => {
      previouslyOpenedTiles[index] = 1;
    });

    return res.status(200).json({
      statusCode: MINESSTATUSCODE.hasActiveGame,
      message: "continue with the previous game",
      game: { ...game._doc, gameOutcome: previouslyOpenedTiles },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = getActiveMinesGame;
