const { Mine } = require("../../../../Models");
const { getBalanceType } = require("../../../../services/getBalanceType");
const { updateUserBalance } = require("../../../../services/updateUserBalance");

const minesCashOut = async (req, res) => {
  const { _id } = req.user;

  try {
    const game = await Mine.findOne({ userId: _id, isActive: true });

    if (!game) {
      return res
        .status(400)
        .json({ message: "failed to cash out, game was not found" });
    }

    const {
      payout,
      stake: { accountType },
    } = game;

    if (payout === 0) {
      return res
        .status(400)
        .json({ message: "game must be played at least once" });
    }

    const updatedGame = await Mine.findOneAndUpdate(
      { userId: _id, isActive: true },
      { isActive: false, hasCashedOut: true },
      { new: true }
    );

    const balanceToUpdate = getBalanceType(accountType);
    const accountBalances = await updateUserBalance(
      _id,
      balanceToUpdate,
      payout, //incremented in database
      true
    );
    console.log(accountBalances, "cahsout");
    return res.status(200).json({
      message: "cashedOut",
      game: { ...updatedGame._doc },
      accountBalances,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports = { minesCashOut };
