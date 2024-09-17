//paginated bet history
const getBetHistory = async ({ page, limit }, { model, query }) => {
  if (!limit) {
    limit = 10;
  }

  // Ensure page and limit are positive integers
  if (isNaN(page) || isNaN(limit) || page <= 0 || limit <= 0) {
    throw new Error("Page and limit must be positive integers.");
  }

  // Calculate items to skip
  let skip = (page - 1) * limit;

  try {
    // Count total documents in for the user in the collection
    const totalDocuments = await model.countDocuments({ ...query });

    // Total pages
    const totalPages = Math.ceil(totalDocuments / limit);

    if (page > totalPages) {
      return {
        message: "END OF LIST.",
        betList: [],
      };
    }

    //
    const games = await model
      .find({ ...query })
      .sort({ createdAt: -1 }) // Sort in descending order//lastest comes first
      .skip(skip)
      .limit(limit);

    return {
      message: "",
      betList: games,
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getBetHistory };
