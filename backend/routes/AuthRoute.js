const express = require("express");
const {
  authController,
  loginController,
} = require("../controllers/AuthController.js");

const route = express.Router();

route.post("/create-user", authController);
route.post("/login-user", loginController);

module.exports = route;
