const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/user.controller");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("Firs name must be atleast 3 character long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characer long"),
  ],
  userController.registerUser
);



module.exports = router;
