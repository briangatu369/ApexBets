const jwt = require("jsonwebtoken");

const generateJwtTokens = (type, payload) => {
  const ACCESSSECRET = process.env.JWT_ACCESS_SECRET;
  const REFRESHSECRET = process.env.JWT_REFRESH_SECRET;

  const secret = type === "refresh" ? REFRESHSECRET : ACCESSSECRET;
  const options =
    type === "refresh" ? { expiresIn: "7d" } : { expiresIn: "1h" };

  return jwt.sign(payload, secret, options);
};

module.exports = { generateJwtTokens };
