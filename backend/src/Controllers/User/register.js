const Joi = require("joi");
const { User } = require("../../Models/index");
const hashPassword = require("../../Utils/HashPassword");
const { generateJwtTokens } = require("../../Utils/generateJwt");

const registrationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(20).required(),
});

const register = async (req, res) => {
  const { email, password } = req.body;

  const { error } = registrationSchema.validate({
    email,
    password,
  });

  if (error) {
    const validationError = error.details[0].message;
    return res.status(400).json({ message: validationError });
  }

  try {
    const user = await User.findOne({ email });
    //check user existence
    if (user) {
      return res.status(409).json({ message: "user already exist" });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      email,
      password: hashedPassword,
    });
    const { password: p, ...userData } = newUser._doc;

    const accessTokens = generateJwtTokens("access", userData);
    // const refreshTokens = generateJwtTokens("refresh", userData);

    await newUser.save();

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

module.exports = register;
