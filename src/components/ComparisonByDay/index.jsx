import React, { useContext } from "react";
import "./index.css";
import DataContext from "../../context/DataContext";

const ComparisonByDay = () => {
  const { weeklyForecast, yesterdayWeather } = useContext(DataContext);

  // Extraction yesterday's max and min temperatures
  const yesterdayMax = yesterdayWeather[0]?.daily.temperature_2m_max[0];
  const yesterdayMin = yesterdayWeather[0]?.daily.temperature_2m_min[0];

  // Extraction today's max and min temperatures
  const todayMax = weeklyForecast[0].daily.temperature_2m_max[0];
  const todayMin = weeklyForecast[0].daily.temperature_2m_min[0];

  // Extraction tomrrow's max and min temperatures
  const tomorrowMax = weeklyForecast[0].daily.temperature_2m_max[1];
  const tomorrowMin = weeklyForecast[0].daily.temperature_2m_min[1];

  //Defining an array to store temperature data for rendering
  const temperatureData = [
    { label: "Today", min: todayMin, max: todayMax },
    { label: "Yesterday", min: yesterdayMin, max: yesterdayMax },
    { label: "Tomorrow", min: tomorrowMin, max: tomorrowMax },
  ];

  return (
    <div className="comparison-wrapper">
      <h2 className="comparison-title">Comparison by Day</h2>
      <div className="comparison-container">
        {temperatureData.map(({ label, min, max }, index) => (
          <div key={index} className="comparison-item">
            <span className="comparison-day-label">{label}</span>
            <div className="comparison-temp-container">
              <span className="comparison-temp">{`${Math.round(min)}°`}</span>
              <div className="comparison-bar">
                <div
                  className="comparison-fill"
                  style={{
                    width: `${(max / Math.abs(Math.abs(min) + max)) * 100}%`,
                  }}
                ></div>
              </div>
              <span className="comparison-temp">{`${Math.round(max)}°`}</span>
            </div>
          </div>
        ))}
      </div>
      <p className="comparison-note">
        {todayMax < yesterdayMax
          ? "The maximum temperature is lower today than yesterday."
          : "The maximum temperature is higher today than yesterday."}
      </p>
    </div>
  );
};

export default ComparisonByDay;
