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

        if (response.data.status !== 'OK') {
            throw new Error(response.data.error_message || response.data.status);
        }

        const location = response.data.results[0].geometry.location;
        return {
            lat: location.lat,
            lng: location.lng
        };
    } catch (error) {
        console.error('Error getting coordinates:', error.response?.data || error.message);
        throw new Error('Failed to get coordinates for address');
    }
};
