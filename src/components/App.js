import React, { useState } from 'react';
import { fetchWeatherData } from '../utils/weatherAPI';
import { fetchLocationData } from '../utils/locationAPI';
import '../styles/theme.css';
import '../styles/styles.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);

  const fetchUserWeatherData = async (query) => {
    try {
      const locationData = await fetchLocationData(query);
      console.log('Location Data:', locationData);
      const { latitude, longitude } = locationData;
      const fetchedWeatherData = await fetchWeatherData(latitude, longitude);
      setWeatherData(fetchedWeatherData);
    } catch (error) {
      console.error('Error fetching user weather data:', error.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const query = event.target.elements.location.value;
    fetchUserWeatherData(query);
  };

  return (
    <div>
      <h1>Green Outdoors Co</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="location" placeholder="Enter your location" />
        <button type="submit">Get Weather</button>
      </form>
      {weatherData && (
        <div>
          <h2>{weatherData.location}</h2>
          <p>
            {weatherData.temperature}°F, {weatherData.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
