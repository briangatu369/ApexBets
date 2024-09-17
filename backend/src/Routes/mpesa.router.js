const { Router } = require("express");
const {
  sendMpesaStkPush,
  mpesaCallback,
} = require("../Controllers/MpesaPayment");
const { verifyJwt } = require("../Middleware/validateJwt");

const router = Router();

router.post("/pushStk", verifyJwt, sendMpesaStkPush);
router.post("/callback", verifyJwt, mpesaCallback);

module.exports = { MpesaRouter: router };
