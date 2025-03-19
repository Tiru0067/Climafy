import React, { useContext, useState, useEffect } from "react";
import { parseISO, format } from "date-fns";
import { DateTime } from "luxon";

import DataContext from "../../context/DataContext";
import weatherIcons from "../../assets/weatherIcons";
import HourlyWeather from "./HourlyWeather";
import "./index.css";

const CurrentWeather = () => {
  const [formattedTime, setFormattedTime] = useState(null);
  const { timezone, weatherNow, weeklyForecast, is12Hour } =
    useContext(DataContext);

  const {
    temperature_2m: temperature,
    apparent_temperature: feelsLike,
    relative_humidity_2m: humidity,
    time: currentTime,
    weathercode: code,
    wind_speed_10m: windSpeed,
    pressure_msl: pressure,
    rain,
    showers,
    snowfall,
  } = weatherNow?.[0]?.current || {};

  const {
    temperature_2m: temperatureUnit,
    relative_humidity_2m: humidityUnit,
    wind_speed_10m: windSpeedUnit,
    pressure_msl: pressureUnit,
  } = weatherNow?.[0]?.current_units || {};

  const temperatureSign = temperature > 0 ? "+" : "";

  const timeFormat = is12Hour ? "h:mm a" : "H:mm";

  const sunrise = format(
    parseISO(weeklyForecast?.[0]?.daily?.sunrise?.[0]),
    timeFormat
  );
  const sunset = format(
    parseISO(weeklyForecast?.[0]?.daily?.sunset?.[0]),
    timeFormat
  );

  useEffect(() => {
    const updateFormattedTime = () => {
      const localTime = DateTime.utc().setZone(timezone); // Convert to selected timezone
      const format = is12Hour ? "EEE, dd MMM h:mm a" : "EEE, dd MMM H:mm";
      setFormattedTime(localTime.toFormat(format));
    };

    updateFormattedTime();

    const now = DateTime.now();
    const delay = (60 - now.second) * 1000; // Time left until next minute

    const timeout = setTimeout(() => {
      updateFormattedTime();
      const interval = setInterval(updateFormattedTime, 60000);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [timezone, is12Hour]);

  const precipitationChance =
    weeklyForecast?.[0]?.daily?.precipitation_probability_max?.[0] || 0;

  const isNight = new Date().getHours() >= 18 || new Date().getHours() < 6;
  const weatherIcon = isNight
    ? weatherIcons[code]?.nightIcon
    : weatherIcons[code]?.icon;

  let weatherMessage = "Expect mostly clear skies with pleasant conditions.";
  if (rain > 0)
    weatherMessage = "Rain expected throughout the day. Carry an umbrella!";
  if (showers > 0)
    weatherMessage = "Scattered showers possible. Intervals of rain expected.";
  if (snowfall > 0)
    weatherMessage =
      "Snowfall is expected. Stay warm and be cautious on the roads.";
  if (Number(precipitationChance) > 0)
    weatherMessage += ` Precipitation levels at ${precipitationChance}%.`;

  return (
    <div className="weather-container">
      <div className="weather-main">
        <div className="weather-icon-container">
          <img
            className="weather-icon"
            src={weatherIcon}
            alt={weatherIcons[code]?.name || "Weather icon"}
          />
          <div className="sunrise-sunset">
            <span>Sunrise: {sunrise}</span>
            <span>Sunset: {sunset}</span>
          </div>
        </div>

        <div className="weather-info-container">
          <span className="formatted-time">{formattedTime}</span>
          <span className="temperature">
            {temperatureSign}
            {Math.round(temperature)}
            {temperatureUnit}
          </span>
          <span className="feels-like">
            Feels like {Math.round(feelsLike)}°
          </span>
          <span className="weather-message">{weatherMessage}</span>
        </div>
      </div>

      <div className="more-details">
        <h3>MORE DETAILS:</h3>
        <p>
          Wind speed:{" "}
          <strong>
            {windSpeed}
            {windSpeedUnit}
          </strong>
        </p>
        <p>
          Air humidity:{" "}
          <strong>
            {humidity}
            {humidityUnit}
          </strong>
        </p>
        <p>
          Pressure:{" "}
          <strong>
            {pressure}
            {pressureUnit}
          </strong>
        </p>
        <p>
          Precipitation probability: <strong>{precipitationChance}%</strong>
        </p>
      </div>
      <HourlyWeather />
    </div>
  );
};

export default CurrentWeather;
