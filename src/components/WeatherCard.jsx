import React from "react";
import humidity_icon from "../assets/humidity.png";
import wind_icon from "../assets/wind.png";
import "./Weather.css";

const WeatherCard = ({ weatherData }) => {
  if (!weatherData) return null;
  return (
    <div className="weather-card">
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
    </div>
  );
};

export default WeatherCard;
