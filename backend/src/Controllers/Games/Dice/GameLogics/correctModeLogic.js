const { SIDES_OF_DICE } = require("../Data/constants");

const validatePredictionInCorrectMode = (prediction, numberOfDices) => {
  const minimumPrediction = numberOfDices;

  if (prediction < minimumPrediction) {
    throw new Error(
      "Prediction in correctMode can't be less than number of dices"
    );
  }

  const maximumPrediction = SIDES_OF_DICE * numberOfDices;

  if (prediction > maximumPrediction) {
    throw new Error(
      `Prediction in correctMode exceeded.Maximum prediction with ${numberOfDices} dices is ${maximumPrediction}.`
    );
  }
};

module.exports = { validatePredictionInCorrectMode };
