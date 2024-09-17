import { SIDES_OF_DICE } from "../Data/constants";

export const validatePredictionInUnderMode = (prediction, numberOfDices) => {
  const minimumPrediction = numberOfDices + 1;

  if (prediction < minimumPrediction) {
    return minimumPrediction;
  }

  const getMaximumPrediction = () => {
    if (numberOfDices === 1) {
      return SIDES_OF_DICE;
    }
    return (SIDES_OF_DICE - 2) * numberOfDices + 3;
  };

  if (prediction > getMaximumPrediction()) {
    return getMaximumPrediction();
  }

  return prediction;
};
