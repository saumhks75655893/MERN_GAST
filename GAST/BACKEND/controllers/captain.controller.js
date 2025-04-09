const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');


// register captain controller 
module.exports.registerCaptain = async (req, res, next) => {
  // validating request body using express-validator
  const errors = validationResult(req);

  // check if there are any validation errors
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }


  // extracting data from request body
  const {fullname, email, password, vehicle } = req.body;

    // is captain already exists

    const isCaptainAlreadyExists = await captainModel.findOne({ email });
    if(isCaptainAlreadyExists) {
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
}

