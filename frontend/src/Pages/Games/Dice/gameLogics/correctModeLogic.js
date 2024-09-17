import { SIDES_OF_DICE } from "../Data/constants";

export const validatePredictionInCorrectMode = (prediction, numberOfDices) => {
  const minimumPrediction = numberOfDices;

  if (prediction < minimumPrediction) {
    return minimumPrediction;
  }

  const maximumPrediction = SIDES_OF_DICE * numberOfDices;

  if (prediction > maximumPrediction) {
    return maximumPrediction;
  }

  return prediction;
};
