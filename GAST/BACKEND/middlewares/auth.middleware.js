const userModel = require("../models/user.model");
const captainModel = require("../models/captain.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const middlewareBlackListModel = require("../models/blacklistToken.model"); 

// middleware for user authentication
module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  // if token not found
  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }

  // if the found token is blackListed
  const isBlacklisted = await middlewareBlackListModel.findOne({ token: token });
  if (isBlacklisted) {
    return res.status(401).json({ message: "unauthorized" });
  }
  // if token found
  try {
    // verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);
    // if user not found
    if (!user) {
      return res.status(401).json({ message: "unauthorized" });
    }
    // if user found
    req.user = user;

    return next();
  } catch (err) {
    // if any error occured during the token verification
    return res.status(401).json({ message: "unauthorized" });
  }
};

// middleware for captain authorization
module.exports.authCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers['authorization']?.split(" ")[1];


  // if token not found
  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }

  // if the found token is blackListed
  const isBlacklisted = await middlewareBlackListModel.findOne({ token: token });
  console.log(isBlacklisted); 

  if (isBlacklisted) {
    return res.status(401).json({ message: "unauthorized" });
  }

  // if token found
  try {
    // verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decoded._id);
    // if captain not found
    if (!captain) {
      return res.status(401).json({ message: "unauthorized" });
    }
    // if captain found
    req.captain = captain;
    return next();
  } catch (error) {
    console.log(error); 
    // if any error occured during the token verification
    return res.status(401).json({ message: "unauthorized" });
  }
};
