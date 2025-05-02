const axios = require("axios");

module.exports.getAddressCoordinate = async (address) => {
  const apiKey = process.env.GOOGLE_MAPS_API;
  console.log(apiKey);

  try {
    const encodedAddress = encodeURIComponent(address);
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`
    );

    console.log("Google Maps response:", response.data);

    if (response.data.status !== "OK") {
      throw new Error(response.data.error_message || response.data.status);
    }

    const location = response.data.results[0].geometry.location;
    return {
      lat: location.lat,
      lng: location.lng,
    };
  } catch (error) {
    console.error(
      "Error getting coordinates:",
      error.response?.data || error.message
    );
    throw new Error("Failed to get coordinates for address");
  }
};

module.exports.getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and Destination are required!");
  }

  const apiKey = process.env.GOOGLE_MAPS_API;

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
        origin
      )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`
    );

    console.log("Distance Matrix API response:", response.data);

    if (response.data.status !== "OK") {
      throw new Error(response.data.error_message || response.data.status);
    }

    const element = response.data.rows[0].elements[0];

    if (element.status === "ZERO_RESULTS") {
      throw new Error("No routes found");
    }

    return {
      distance: element.distance,
      duration: element.duration,
    };
  } catch (error) {
    console.error(
      "Error getting distance and time:",
      error.response?.data || error.message
    );
    throw new Error("Failed to get distance and time for the given addresses");
  }
};

module.exports.getAutoCompleteSuggestion = async (input) => {
  if (!input) {
    throw new Error("Query is required!");
  }

  const apiKey = process.env.GOOGLE_MAPS_API;

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
        input
      )}key=${apiKey}`
    );

    if(response.data.status=== "OK") {
        return response.data.predictions; 
    }
  } catch (error) {
    console.error(
      "Error getting distance and time:",
      error.response?.data || error.message
    );
    throw new Error("Failed to get distance and time for the given addresses");
  }
};
