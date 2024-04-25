import React, { useState } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import WeatherDetails from "./WeatherDetails";
import "../styles/WeatherDashboard.css";

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState({
    weather: null,
    error: null,
    loading: false,
  });
  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl = process.env.REACT_APP_API_URL;
  const fetchWeather = async (cityName) => {
    if (!cityName.trim()) {
      setWeatherData({
        weather: null,
        error: "City name cannot be empty. Please enter a valid city name.",
        loading: false,
      });
      return;
    }

    setWeatherData({ loading: true, error: null });

    try {
      const response = await axios.get(
        `${apiUrl}/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
      );
      setWeatherData({
        weather: response.data,
        error: null,
        loading: false,
      });
    } catch (err) {
      setWeatherData({
        weather: null,
        error: "City not found. Please try again with a valid city name.",
        loading: false,
      });
    }
  };

  return (
    <div className="weather-dashboard">
      <h1>Weather Dashboard</h1>
      <SearchBar onSearch={fetchWeather} />
      {weatherData.loading && <div className="loading">Loading...</div>}
      {weatherData.error && <div className="error">{weatherData.error}</div>}
      {weatherData.weather && <WeatherDetails weather={weatherData.weather} />}
    </div>
  );
};

export default WeatherDashboard;
