const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware"); 

// router creation for the register user
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

// router creation for the login user
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characer long"),
  ],
  userController.loginUser
);

// router creation for user profile
router.get("/profile",authMiddleware.authUser,userController.getUserProfile);

// router for logout user
router.get('/logout', authMiddleware.authUser, userController.logoutUser);


// module exports for global uses of the router in the project
module.exports = router;
