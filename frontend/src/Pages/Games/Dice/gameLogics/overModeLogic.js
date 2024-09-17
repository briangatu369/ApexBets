import { SIDES_OF_DICE } from "../Data/constants";

export const validatePredictionInOverMode = (prediction, numberOfDices) => {
  const getMinimumPrediction = () => {
    if (numberOfDices === 1) {
      return 1;
    }
    const minimumPrediction = 3 * (numberOfDices - 1);
    return minimumPrediction;
  };

  if (prediction < getMinimumPrediction()) {
    return getMinimumPrediction();
  }

  const maximumPrediction = SIDES_OF_DICE * numberOfDices - 1;

  if (prediction > maximumPrediction) {
    return maximumPrediction;
  }

  return prediction;
};
