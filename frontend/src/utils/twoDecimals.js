export const twoDecimals = (number) => {
  if (typeof number === "number") {
    return parseFloat(number.toFixed(2));
  }
  return NaN;
};
