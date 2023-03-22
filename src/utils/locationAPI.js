import 'regenerator-runtime/runtime';

const fetchLocationData = async (query) => {
  const apiKey = process.env.REACT_APP_OPENCAGE_API_KEY;
  console.log("OpenCage API Key:", apiKey);
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
