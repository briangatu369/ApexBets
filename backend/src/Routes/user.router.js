const express = require("express");
const {
  login,
  register,
  logout,
  checkAuthentication,
} = require("../Controllers/User/index");
const { verifyJwt } = require("../Middleware/validateJwt");

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/checkauthentication", verifyJwt, checkAuthentication);
router.get("/logout", logout);

module.exports = { UserRouter: router };
