import React, { useEffect, useState } from "react";
import "./Weather.css";
import SearchBar from "./SearchBar.jsx";
import WeatherCard from "./WeatherCard.jsx";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);

  const regex = /^[A-Za-z\s]+$/;

  const search = async (city) => {
    if (city === "") {
      alert("Please enter a location");
      return;
    }

    if (!regex.test(city)) {
      alert("Please enter a valid city name (letters only).");
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      const icon = data.weather[0].icon;

      setWeatherData({
        humidity: data.main.humidity,
        temperature: Math.floor(data.main.temp),
        description: data.weather[0].main,
        country: data.sys.country,
        location: data.name,
        windSpeed: data.wind.speed,
        icon: `https://openweathermap.org/img/wn/${icon}@2x.png`,
      });
    } catch (error) {
      setWeatherData(null);
      console.error("Error in fetching weather data");
    }
  };

  useEffect(() => {
    search("Cairo");
  }, []);

  return (
    <div className="weather">
      <SearchBar onSearch={search} />
      <WeatherCard weatherData={weatherData} />
    </div>
  );
};

export default Weather;
