const { Mine } = require("../../../../Models");
const { getBetHistory } = require("../../../../services/getBetHistory");

const minesBetHistory = async (req, res) => {
  let { page, limit } = req.query;
  const { _id } = req?.user;

  try {
    if (!_id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    //get paginated bet history
    const betHistory = await getBetHistory(
      { page, limit },
      { model: Mine, query: { userId: _id } }
    );

    res.status(200).json(betHistory);
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

module.exports = { minesBetHistory };
