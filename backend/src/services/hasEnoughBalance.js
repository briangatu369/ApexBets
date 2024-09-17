const { ACCOUNT } = require("../Data/constants");

const checkIfHasEnoughBalance = (
  accountType,
  stake,
  accountBalance,
  demoBalance
) => {
  if (accountType === ACCOUNT.DEMO && demoBalance < stake) {
    return {
      canBet: false,
      message: "You have Insufficient funds in your DEMO account.",
    };
  }

  if (accountType === ACCOUNT.REAL && accountBalance < stake) {
    return {
      canBet: false,
      message: "You have Insufficient funds in YOUR account.",
    };
  }

  return {
    canBet: true,
    message: "Has Enough Balance",
  };
};

module.exports = { checkIfHasEnoughBalance };
