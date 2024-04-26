# Weather Dashboard

Know Your City Weather- built with React that allows users to search for current weather information by city name. The application displays weather details like temperature, humidity, and wind speed. It features a responsive design for desktop and mobile views.

## Table of Contents
1. [Features](#features)
2. [Installation](#installation)
3. [Usage](#usage)

## Features
- Search function to find current weather information by city name.
- Displays current weather details like temperature, humidity, and wind speed.
- Responsive design suitable for desktop and mobile views.

## Installation
1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/ersouravbansal/know-your-weather.git

Open Project in code editor
2. Install the required dependencies:
npm install

3. Obtain an OpenWeatherMap API key by signing up for a free account. Copy your API key to use in the application.
https://openweathermap.org/

## Usage
1. Insert your OpenWeatherMap API key: In the .env, add your API Key and API Url. and then use them in WeatherDashboard.js
  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl = process.env.REACT_APP_API_URL;
    const [weatherData, setWeatherData] = useState({
    weather: null,
    error: null,
    loading: false,
  });
  const fetchWeather = async (cityName) => {

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
    }
  };
2. Start the development server: Use the following command to start the application.
npm run start

3. Open your browser and navigate to http://localhost:3000/. You should see the weather dashboard application. Enter a city name to get the current weather information.