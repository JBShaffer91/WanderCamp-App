import 'regenerator-runtime/runtime';

const fetchWeatherData = async (latitude, longitude) => {
  const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

  try {
    const response = await fetch(apiURL);
    const data = await response.json();

    if (response.ok) {
      // Parse the necessary data from the API response
      const weatherData = {
        location: data.name,
        temperature: data.main.temp,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
      };
      return weatherData;
    } else {
      throw new Error(`Error fetching weather data: ${data.message}`);
    }
  } catch (error) {
    console.error(error.message); 
  }
};


export { fetchWeatherData };
