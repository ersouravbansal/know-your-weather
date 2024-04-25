import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import WeatherDetails from './WeatherDetails';
import '../styles/WeatherDashboard.css';

const WeatherDashboard = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (cityName) => {
    setLoading(true);
    try {
      const apiKey = '003598d23b6da5ba5081c1269ff8faf3';
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
      );
      setWeather(response.data);
      setError(null);
    } catch (err) {
      setWeather(null);
      setError('City not found. Please try again.');
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  const handleSearch = (cityName) => {
    setCity(cityName);
    fetchWeather(cityName);
  };

  return (
    <div className="weather-dashboard">
      <h1>Weather Dashboard</h1>
      <SearchBar onSearch={handleSearch} />
      {loading && <div className="loading">Loading...</div>} {/* Loading indicator */}
      {error && <div className="error">{error}</div>}
      {weather && <WeatherDetails weather={weather} />}
    </div>
  );
};

export default WeatherDashboard;
