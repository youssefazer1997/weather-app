import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import search_icon from "../assets/search.png";
import humidity_icon from "../assets/humidity.png";
import wind_icon from "../assets/wind.png";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(false);

  const inputRef = useRef();

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

      console.log(data);
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
      setWeatherData(false);
      console.error("Error in fetching weather data");
    }
  };

  useEffect(() => {
    search("");
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      search(inputRef.current.value);
    }
  };

  return (
    <div className="weather">
      <div className="search-bar">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search"
          onKeyDown={handleKeyDown}
        />
        <img
          src={search_icon}
          alt=""
          onClick={() => search(inputRef.current.value)}
        />
      </div>
      {weatherData ? (
        <>
          {" "}
          <img src={weatherData.icon} alt="" className="weather-icon" />
          <p className="description">{weatherData.description}</p>
          <p className="temperature">{weatherData.temperature}°c</p>
          <p className="location">
            {weatherData.location}, {weatherData.country}
          </p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="" />
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="" />
              <div>
                <p>{weatherData.windSpeed} Km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;
