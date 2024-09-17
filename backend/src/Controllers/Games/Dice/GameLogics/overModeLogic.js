const { SIDES_OF_DICE } = require("../Data/constants");

const validatePredictionInOverMode = (prediction, numberOfDices) => {
  const getMinimumPrediction = () => {
    if (numberOfDices === 1) {
      return 1;
    }
    const minimumPrediction = 3 * (numberOfDices - 1);
    return minimumPrediction;
  };

  if (prediction < getMinimumPrediction()) {
    throw new Error(
      `Minimum prediction in overMode with ${numberOfDices} dices is ${getMinimumPrediction()}`
    );
  }

  const maximumPrediction = SIDES_OF_DICE * numberOfDices - 1;

  if (prediction > maximumPrediction) {
    throw new Error(
      `Maximum prediction in overMode with ${numberOfDices} dices is ${maximumPrediction}`
    );
  }
};

module.exports = { validatePredictionInOverMode };
