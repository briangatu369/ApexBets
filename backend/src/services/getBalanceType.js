const { BALANCE_TYPE, ACCOUNT } = require("../Data/constants");

//return balanceType to update in DB depending on accountType
const getBalanceType = (accountType) => {
  let balanceType = "";

  if (accountType === ACCOUNT.REAL) {
    balanceType = BALANCE_TYPE.ACCOUNTBALANCE;
  } else if (accountType === ACCOUNT.DEMO) {
    balanceType = BALANCE_TYPE.DEMOBALANCE;
  } else {
    throw new Error(
      `AccountType ${accountType} not found. Possible Account types. ${ACCOUNT.DEMO} AND ${ACCOUNT.REAL}`
    );
  }

  return balanceType;
};

module.exports = { getBalanceType };
