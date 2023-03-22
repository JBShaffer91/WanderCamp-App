import 'regenerator-runtime/runtime'; // Necessary for using async/await with Babel
import config from '../config';

const fetchLocationData = async (query) => {
  const apiKey = config.openCageApiKey;
  const apiURL = `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${apiKey}`;

  try {
    const response = await fetch(apiURL);
    const data = await response.json();

    if (response.ok) {
      // Parse the necessary data from the API response
      const locationData = {
        latitude: data.results[0].geometry.lat,
        longitude: data.results[0].geometry.lng,
      };
      return locationData;
    } else {
      throw new Error(`Error fetching location data: ${data.status.message}`);
    }
  } catch (error) {
    console.error(error.message);
  }
};

export { fetchLocationData };
