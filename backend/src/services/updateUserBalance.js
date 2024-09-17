const User = require("../Models/User");

// update user balance
const updateUserBalance = async (userId, key, addValue, won) => {
  const query = {};
  query[key] = addValue;

  if (!won) {
    query[key] = -addValue;
  }

  const user = await User.findOneAndUpdate(
    { _id: userId },
    { $inc: query },
    {
      new: true,
    }
  );

  const userData = user._doc;

  const accountBalances = {
    accountBalance: userData.accountBalance,
    demoBalance: userData.demoBalance,
  };

  console.log(accountBalances);

  return accountBalances;
};

module.exports = { updateUserBalance };
