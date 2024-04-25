import React from 'react';
import '../styles/WeatherDetails.css';

const WeatherDetails = ({ weather }) => {
  if (!weather) {
    return null;
  }

  const {
    name,
    main: { temp, humidity },
    wind: { speed: windSpeed },
    weather: weatherDescriptions,
  } = weather;

  const description = weatherDescriptions[0]?.description || 'No description available';

  return (
    <div className="weather-details">
      <h2>{name}</h2>
      <p><strong>{description}</strong></p>

      <div className="weather-info">
        <div className="info-item">
          <i className="fa-solid fa-temperature-high"></i>
          <span>Temperature: {temp}°C</span>
        </div>

        <div className="info-item">
          <i class="fa-solid fa-tint"></i>
          <span>Humidity: {humidity}%</span>
        </div>

        <div class="info-item">
          <i class="fa-solid fa-wind"></i>
          <span>Wind Speed: {windSpeed} m/s</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
