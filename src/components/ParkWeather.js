import React from 'react';

const ParkWeather = ({ park, weather }) => {
  const containerStyle = {
    backgroundColor: '#f0f0f0',
    border: '2px solid #2e8b57',
    borderRadius: '5px',
    margin: '10px 0',
    padding: '10px',
  };

  const headerStyle = {
    color: '#2e8b57',
    fontWeight: 'bold',
  };

  const infoStyle = {
    fontFamily: "'Courier New', monospace",
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>{park}</h2>
      <p style={infoStyle}>
        {weather.temperature}°F, {weather.description}
      </p>
    </div>
  );
};

export default ParkWeather;
