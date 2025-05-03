const rideService = require('../services/rides.service');
const { validationResult } = require('express-validator');

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {user, pickup, destination, vehicleType } = req.body;

  try {
    const ride = await rideService.createRide({user:req.user._id, pickup, destination, vehicleType});
    res.status(201).json(ride);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports.getFair = async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { pickup, destination } = req.query;

  try{
    const fair = await rideService.getFair(pickup, destination);
    return res.status(200).json(fair);
  }catch(error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}