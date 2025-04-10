const BlacklistToken = require("../models/blacklistToken.model");
const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");

// register captain controller
module.exports.registerCaptain = async (req, res, next) => {
  // validating request body using express-validator
  const errors = validationResult(req);

  // check if there are any validation errors
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // extracting data from request body
  const { fullname, email, password, vehicle } = req.body;

  // is captain already exists

  const isCaptainAlreadyExists = await captainModel.findOne({ email });
  if (isCaptainAlreadyExists) {
    return res.status(400).json({ message: "Captain already exists!" });
  }

  // extracting vehicle data from request body
  const hashedPassword = await captainModel.hashPassword(password);

  // creating a vehicle object
  const captain = await captainService.createCaptain({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  });

  // generating token for the captain
  const token = captain.generateAuthToken();

  // setting cookie for the token
  res.status(201).json({ token, captain });
};

// login captain controller
module.exports.loginCaptain = async (req, res, next) => {
  // validating request body using express-validator
  const errors = validationResult(req);

  // check if there are any validation errors
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // extracting data from request body
  const { email, password } = req.body;

  // finding captain by email
  const captain = await captainModel.findOne({ email }).select('+password');

  // checking if captain exists or not
  if (!captain) {
    return res.status(400).json({ message: "Invalid credentials!" });
  }

  // checking if password is correct or not
  const isPasswordCorrect = await captain.comparePassword(password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid credentials!" });
  }

  // generating token for the captain
  const token = captain.generateAuthToken();

  // set the captain to the cookies
  res.cookie("captain", captain);

  // setting cookie for the token
  res.status(200).json({ token, captain });
};


// profile captain controller
module.exports.getCaptainProfile = async (req, res, next) => {
  res.status(200).json({ captain: req.captain });
};

// logout captain controller
module.exports.logoutCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers['authorization']?.split(' ')[1]; 
  await BlacklistToken.create({token}); 

  res.clearCookie("captain");

  res.status(200).json({ message: "Successfully logged out" });
};