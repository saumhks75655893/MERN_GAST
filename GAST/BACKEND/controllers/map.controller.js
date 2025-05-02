const mapService = require("../services/maps.service");
const { validationResult } = require("express-validator");

module.exports.getCoordinates = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: "Invalid address format" });
  }

  const { address } = req.query;

  try {
    if (!address) {
      return res.status(400).json({
        status: "error",
        message: "Address is required",
      });
    }

    const coordinates = await mapService.getAddressCoordinate(address);
    res.status(200).json(coordinates);
  } catch (error) {
    console.error("Error in getCoordinates controller:", error);
    return res.status(500).json({
      status: "error",
      message: error.message || "Failed to get coordinates",
    });
  }
};

module.exports.getDistanceTime = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { origin, destination } = req.query;

    const distanceTime = await mapService.getDistanceTime(origin, destination);

    res.status(200).json(distanceTime);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.getAutoCompleteSuggestion = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { input } = req.query;

    const suggestions = await mapService.getAutoCompleteSuggestion(input);

    res.status(200).json(suggestions);
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
