const User = require("../../Models/User");

const checkAuthentication = async (req, res) => {
  const { user } = req;

  if (!user) {
    res.status(401).json({ message: "unauthorized" });
    return;
  }

  const { email } = user;
  const userData = await User.findOne({ email });

  const { password, ...rest } = userData._doc;

  res.status(200).json(rest);
};

module.exports = checkAuthentication;
