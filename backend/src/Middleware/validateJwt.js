const jwt = require("jsonwebtoken");

const verifyJwt = (req, res, next) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    res.status(401).json({ message: "unauthorized" });
    return;
  }

  const jwtSecret = process.env.JWT_ACCESS_SECRET;

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        // Token has expired, attempt to regenerate
        return res.status(401).json({ message: "token has expired" });
      }
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = decoded;
    next();
  });
};

module.exports = { verifyJwt };
