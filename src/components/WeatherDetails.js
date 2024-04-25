import React from 'react';
import '../styles/WeatherDetails.css';

const WeatherDetails = ({ weather }) => {
  if (!weather) {
    return null;
  }

  const { main, wind, weather: weatherDesc } = weather;

  return (
    <div className="weather-details">
      <h2>{weather.name}</h2>
      <p><strong>{weatherDesc[0].description}</strong></p>

      <div className="weather-info">
        <div className="info-item temperature">
          <i className="fa-solid fa-temperature-high"></i>
          <span>Temperature: {main.temp}°C</span>
        </div>

        <div className="info-item humidity">
          <i className="fa-solid fa-tint"></i>
          <span>Humidity: {main.humidity}%</span>
        </div>

        <div classname="info-item wind">
          <i className="fa-solid fa-wind"></i>
          <span>Wind Speed: {wind.speed} m/s</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
