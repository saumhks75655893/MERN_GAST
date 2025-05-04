const rideModel = require("../models/rides.model");
const mapService = require("../services/maps.service");
const crypto = require("crypto");

// fare calculation function
async function getFair(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Both pickup and destination are required!");
  }

  const distanceAndTime = await mapService.getDistanceTime(pickup, destination);

  const baseFare = {
    car: 50,
    bike: 30,
    bicycle: 10,
  };

  const perKmRate = {
    car: 10,
    bike: 5,
    bicycle: 2,
  };

  const perMinuteRate = {
    car: 2,
    bike: 1,
    bicycle: 0.5,
  };

  // console.log(distanceAndTime);
  const distanceValue = distanceAndTime.distance.value / 1000;
  const timeValue = distanceAndTime.duration.value / 60; // in minutes

  const fare = {
    car: Math.round(
      baseFare.car +
        distanceValue * perKmRate.car +
        timeValue * perMinuteRate.car
    ),
    bike: Math.round(
      baseFare.bike +
        distanceValue * perKmRate.bike +
        timeValue * perMinuteRate.bike
    ),
    bicycle: Math.round(
      baseFare.bicycle +
        distanceValue * perKmRate.bicycle +
        timeValue * perMinuteRate.bicycle
    ),
  };

  return fare;
}

module.exports.getFair = getFair;

// generate otp function here
function getOtp(num) {
  // return otp;
  const otp = crypto
    .randomInt(0, Math.pow(10, num))
    .toString()
    .padStart(num, "0");
  return otp;
}
// create ride function
module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required!");
  }
  const fare = await getFair(pickup, destination);
  const ride = rideModel.create({
    user,
    pickup,
    destination,
    otp: getOtp(6), // generate 6 digit otp for ride request
    fare: fare[vehicleType],
  });

  return ride;
};

// ✅ Change it to:
module.exports.confirmRide = async ({rideId, captain}) => {
  console.log("Ride ID:", rideId);
  console.log("Captain ID:", captain._id);

  if (!rideId) {
    throw new Error("Ride ID is required!");
  }

  const updatedRide = await rideModel.findOneAndUpdate(
    { _id: rideId },
    {
      status: "Confirmed",
      captain: captain._id,
    },
    { new: true }
  );

  if (!updatedRide) {
    throw new Error("Ride not found!");
  }

  const populatedRide = await rideModel
    .findById(updatedRide._id)
    .populate("user").populate("captain");
  return populatedRide;
};
