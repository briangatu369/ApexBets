// Recursively calculates the favorable outcomes of "n" rolled dice
const calculateFavorableOutcomes = () => {
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

module.exports = { calculateFavorableOutcomes };
