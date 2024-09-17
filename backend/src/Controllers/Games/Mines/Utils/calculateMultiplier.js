const calculateMultiplier = (numberOfGrids, bombs, openedSafeTile) => {
  let probability = 1;

  if (openedSafeTile >= numberOfGrids) {
    throw new Error("openedSafeTiles can be equal or greater than grid size");
  }

  // Calculate probability
  for (let i = 0; i < openedSafeTile; i++) {
    const safeTiles = numberOfGrids - bombs - i;
    const remainingTiles = numberOfGrids - i;
    probability *= safeTiles / remainingTiles;
  }

  const houseEdge = process.env.HOUSE_EDGE;
  const multiplier = (1 / probability) * houseEdge;

  return multiplier;
};

module.exports = { calculateMultiplier };
