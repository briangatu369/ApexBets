const User = require("../Models/User");

const findUser = async (key, value) => {
  const query = {};

  query[key] = value;
  const user = await User.findOne(query);

  if (!user) {
    return null;
  }

  return user;
};

module.exports = { findUser };
