import React, { useState, useEffect } from 'react';
import { fetchWeatherData } from '../utils/weatherAPI';
import { fetchLocationData } from '../utils/locationAPI';
import '../styles/theme.css';
import '../styles/styles.css';
import ParkWeather from './ParkWeather';

const nationalParks = [
  'Yosemite National Park, CA, USA',
  'Grand Canyon National Park, AZ, USA',
  'Yellowstone National Park, WY, USA',
  'Zion National Park, UT, USA',
  'Glacier National Park, MT, USA'
  // Add more parks as desired
];

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [parksWeatherData, setParksWeatherData] = useState([]);

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

  const fetchParkWeatherData = async (park) => {
    try {
      const locationData = await fetchLocationData(park);
      const { latitude, longitude } = locationData;
      const fetchedWeatherData = await fetchWeatherData(latitude, longitude);
      return fetchedWeatherData;
    } catch (error) {
      console.error(`Error fetching weather data for ${park}:`, error.message);
    }
  };

  useEffect(() => {
    const fetchParksWeather = async () => {
      const fetchedParksWeatherData = [];
      for (const park of nationalParks) {
        const parkWeatherData = await fetchParkWeatherData(park);
        fetchedParksWeatherData.push(parkWeatherData);
      }
      setParksWeatherData(fetchedParksWeatherData);
    };

    fetchParksWeather();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const query = event.target.elements.location.value;
    fetchUserWeatherData(query);
  };

// ...
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
    <div>
      <h2>National Parks Weather</h2>
      {parksWeatherData.map((parkWeather, index) => (
        <ParkWeather key={index} park={parkWeather.location} weather={parkWeather} />
      ))}
    </div>
    </div>
  );
};

export default App;
