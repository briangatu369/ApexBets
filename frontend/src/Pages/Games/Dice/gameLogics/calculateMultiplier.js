import { SIDES_OF_DICE } from "../Data/constants";

// Recursively calculates favorable outcomes of "n" rolled dice
export const calculateFavorableOutcomes = () => {
  let favorableOutcomes = 0;

  // recursive function
  function rollDice(
    currentCount,
    numberOfDices,
    predictedOutcome,
    comparisonFn
  ) {
    // Base condition: No more dice to roll
    if (numberOfDices === 0) {
      if (comparisonFn(currentCount, predictedOutcome)) {
        favorableOutcomes++;
      }
      return;
    }

    // Recursive case: Roll the next dice
    for (let i = 1; i <= 6; i++) {
      rollDice(
        currentCount + i,
        numberOfDices - 1,
        predictedOutcome,
        comparisonFn
      );
    }

    return favorableOutcomes;
  }

  return rollDice;
};

// Calculate and return the multiplier based on favorable outcomes
export const calculateDiceMultiplier = (favorableOutcomes, numberOfDices) => {
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
  const houseEdge = 0.97;
  const multiplier = (1 / probability) * houseEdge;

  return multiplier;
};
