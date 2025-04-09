const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const blacklistTokenModel = require("../models/blacklistToken.model"); 

// controller module for register user
module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password } = req.body;

  const hashedPassword = await userModel.hashPassword(password);

  const user = await userService.createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
  });

  const token = user.generateAuthToken();

  res.status(201).json({ token, user });
};

// controller module for login user
module.exports.loginUser = async (req, res, next) => {
  // validating request body using express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // extracting email and password from request body
  const { email, password } = req.body;

  //check if user exists
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  //password matching
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  //generate token
  // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
  const token = user.generateAuthToken();

  // set cookie
  res.cookie("token", token);

  // send the token and user
  res.status(200).json({ token, user });
};

// controller module for user profile
module.exports.getUserProfile = async (req, res, next) => {
  res.status(200).json(req.user);
};

// controller module for logout user
module.exports.logoutUser = async (req, res, next) => {
  // clearing the cookies 
  res.clearCookie("token"); 
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];

  await blacklistTokenModel.create({ token });

  res.status(200).json({message : 'Logged out'}); 

};
