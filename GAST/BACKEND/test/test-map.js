require('dotenv').config(); // Load your .env file
const mapService = require('../services/maps.service'); // Adjust path if needed

const apiKey = process.env.GOOGLE_MAPS_API;
console.log(apiKey); 
(async () => {
  try {
    const address = "1600 Amphitheatre Parkway, Mountain View, CA"; // Use any valid address
    const coords = await mapService.getAddressCoordinate(address);
    console.log("Coordinates:", coords);
  } catch (error) {
    console.error("Test Error:", error.message);
  }
})();
