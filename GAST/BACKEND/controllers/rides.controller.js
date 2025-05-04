const rideService = require("../services/rides.service");
const { validationResult } = require("express-validator");
const mapService = require("../services/maps.service");
const { sendMessageToSocketId } = require("../socket");
const ridesModel = require("../models/rides.model");

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { user, pickup, destination, vehicleType } = req.body;

  try {
    const ride = await rideService.createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });
    res.status(201).json(ride);

    const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
    console.log(pickupCoordinates);

    console.log(pickupCoordinates.lat, pickupCoordinates.lng);
    const captianInRadius = await mapService.getCaptainsInTheRadius(
      pickupCoordinates.lat,
      pickupCoordinates.lng,
      5000
    );

    ride.otp = "";

    // console.log(captianInRadius);

    const rideWithUser = await ridesModel
      .findOne({ _id: ride._id })
      .populate("user");

    captianInRadius.map(async (captain) => {
      console.log(captain, ride);

      sendMessageToSocketId(captain.socketId, {
        event: "newRide",
        data: rideWithUser,
      });
    });
  } catch (error) {
    console.error(error);
    // res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports.getFair = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { pickup, destination } = req.query;

  try {
    const fair = await rideService.getFair(pickup, destination);
    return res.status(200).json(fair);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.confirmRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { rideId } = req.body;
  console.log(rideId); 
  if (!rideId) {
    return res.status(400).json({ message: "Missing rideId or captainId" });
  }

  try {
    const ride = await rideService.confirmRide(
      {
        rideId, 
        captain:{_id: req.captain._id},
      });

    sendMessageToSocketId(ride.user.socketId, {
      event: "rideConfirmed",
      data: ride,
    });

    return res.status(200).json(ride);
  } catch (error) {
    console.log(error); 
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
