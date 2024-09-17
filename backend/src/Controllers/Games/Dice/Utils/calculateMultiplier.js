const { SIDES_OF_DICE } = require("../Data/constants");

//  Calculate and return the multiplier based on favorable outcomes
const calculateDiceMultiplier = (favorableOutcomes, numberOfDices) => {
  // must be atleast one favourableOutcome
  if (favorableOutcomes <= 0 || isNaN(favorableOutcomes)) {
    throw new Error(
      `Invalid value of favourable outcome.
       Favourable outcome must be a number > than 0,favourableOutcome:${favorableOutcomes}`
    );
  }

  // Calculate the total possible outcomes based on the number of dice and sides of each dice
  const totalOutcome = SIDES_OF_DICE ** numberOfDices;

  // Calculate the probability of favorable outcomes
  const probability = favorableOutcomes / totalOutcome;

  // Calculate the multiplier by inverting the probability and applying house edge
  const houseEdge = parseFloat(process.env.HOUSE_EDGE) || 0.97;
  const multiplier = (1 / probability) * houseEdge;

  return multiplier;
};

module.exports = { calculateDiceMultiplier };
