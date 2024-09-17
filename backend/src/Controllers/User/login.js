const Joi = require("joi");
const { User } = require("../../Models");
const bcrypt = require("bcrypt");
const { generateJwtTokens } = require("../../Utils/generateJwt");

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const login = async (req, res) => {
  const { email, password } = req.body;

  const { error } = loginSchema.validate({
    email,
    password,
  });

  if (error) {
    const validationError = error.details[0].message;
    return res.status(400).json({ message: validationError });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "user does not exist" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "wrong password" });
    }

    const { password: p, ...userData } = user._doc;

    const accessTokens = generateJwtTokens("access", userData);
    // const refreshTokens = generateJwtTokens("refresh", userData);

    const tokenExpirationInHours = 1000 * 60 * 60; // 1hr

    res
      .status(200)
      .cookie("accessToken", accessTokens, {
        httpOnly: true,
        maxAge: tokenExpirationInHours,
        sameSite: "none",
        secure: true,
      })
      .json(userData);
  } catch (error) {
    console.error(error);
  }
};

module.exports = login;
