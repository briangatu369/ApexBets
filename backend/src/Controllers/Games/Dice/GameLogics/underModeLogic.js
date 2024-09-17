const { SIDES_OF_DICE } = require("../Data/constants");

const validatePredictionInUnderMode = (prediction, numberOfDices) => {
  const minimumPrediction = numberOfDices + 1;

  if (prediction < minimumPrediction) {
    throw new Error(
      `Prediction in underMode can't be less than ${minimumPrediction} for ${numberOfDices} dices`
    );
  }

  const getMaximumPrediction = () => {
    if (numberOfDices === 1) {
      return SIDES_OF_DICE;
    }
    return (SIDES_OF_DICE - 2) * numberOfDices + 3;
  };

  if (prediction > getMaximumPrediction()) {
    throw new Error(
      `Prediction in underMode can't be more than ${getMaximumPrediction()} for ${numberOfDices} dices`
    );
  }
};

module.exports = { validatePredictionInUnderMode };
