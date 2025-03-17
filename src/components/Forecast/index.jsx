import React, { useContext } from "react";

import "./index.css";
import DataContext from "../../context/DataContext";
import weatherIcons from "../../assets/weatherIcons";

const Forecast = () => {
  const { weeklyForecast } = useContext(DataContext);

  const {
    temperature_2m_max: temperatureMax,
    temperature_2m_min: temperatureMin,
    time: time,
    weathercode: code,
  } = weeklyForecast[0].daily;

  return (
    <div className="forecast-wrapper">
      <h2 className="forecast-title">Forecast</h2>
      <div className="forecast-container">
        {time.slice(1).map((date, index) => {
          const dayName =
            index === 0
              ? "Tomorrow"
              : new Date(date).toLocaleDateString("en-US", {
                  weekday: "short",
                });

          // Check if it's night (6 PM - 5:59 AM)
          const isNight =
            new Date().getHours() >= 18 || new Date().getHours() < 6;

          // Choose the correct weather icon based on day or night
          const weatherIcon = isNight
            ? weatherIcons[code[index]]?.nightIcon
            : weatherIcons[code[index]]?.icon;

          return (
            <div key={date} className="forecast-item">
              <span className="forecast-icon">
                {/* Replace with your weather icon component */}
                <img
                  src={weatherIcon}
                  alt={weatherIcons[code[index]]?.name || "Weather icon"}
                />
              </span>
              <span className="forecast-day">{dayName}</span>
              <div className="forecast-temp-container">
                <span className="forecast-temp">{`${Math.round(
                  temperatureMin[index]
                )}°`}</span>
                <div className="forecast-bar">
                  <div
                    className="forecast-fill"
                    style={{
                      width: `${
                        (temperatureMax[index] /
                          Math.abs(
                            Math.abs(temperatureMin[index]) +
                              temperatureMax[index]
                          )) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
                <span className="forecast-temp">{`${Math.round(
                  temperatureMax[index]
                )}°`}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;
