import React, { useContext } from "react";
import "./index.css";
import DataContext from "../../context/DataContext";
import weatherIcons from "../../assets/weatherIcons";

const Precipitation = () => {
  const { weeklyForecast } = useContext(DataContext);

  //checking data has length or not
  const dataLength =
    !weeklyForecast || !weeklyForecast[0]?.daily?.precipitation_sum?.length;

  const precipitationData = weeklyForecast[0].daily.precipitation_sum;
  const weatherCodeData = weeklyForecast[0].daily.weathercode;
  const units = weeklyForecast[0].daily_units.precipitation_sum;

  const getWeatherInfo = (index) => {
    const weatherCode = weatherCodeData?.[index] || 0;
    const precipitation = precipitationData?.[index] || 0;
    const weatherInfo = weatherIcons[weatherCode] || { name: "Unknown" };

    let precipitationType = "";
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(weatherCode)) {
      precipitationType = "Rain";
    } else if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) {
      precipitationType = "Snow";
    } else if ([96, 99, 300].includes(weatherCode)) {
      precipitationType = "Hail";
    } else if ([66, 67].includes(weatherCode)) {
      precipitationType = "Sleet";
    }

    return { ...weatherInfo, precipitation, precipitationType };
  };

  const todayWeather = getWeatherInfo(0);
  const tomorrowWeather = getWeatherInfo(1);
  const dayAfterWeather = getWeatherInfo(2);

  // Defining an Array to store precipitation data for rendering
  const precipitationArray = [
    { label: "Today", weather: todayWeather },
    { label: "Tomorrow", weather: tomorrowWeather },
    { label: "Day After", weather: dayAfterWeather },
  ];

  return (
    <div className="precipitation-wrapper">
      <h2 className="precipitation-title">Precipitation</h2>
      {dataLength ? (
        <div className="precipitation-message">Not enough data available</div>
      ) : (
        <div className="precipitation-container">
          {precipitationArray.map(({ label, weather }, index) => (
            <div key={index} className="precipitation-item">
              <div className="precipitation-label-container">
                <span className="precipitation-label">
                  {label.toUpperCase()}
                </span>

                <div className="precipitation-info">
                  {weather.icon && (
                    <img
                      src={weather.icon}
                      alt={weather.name}
                      className="precipitation-icon"
                    />
                  )}
                  <span className="precipitation-type">
                    {weather.precipitationType || "Precipitation"}
                  </span>
                </div>
              </div>
              <span
                className={`precipitation-value ${
                  weather.precipitation > 0 ? "active" : ""
                }`}
              >
                {weather.precipitation}{" "}
                <span className="units">{units.toUpperCase()}</span>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Precipitation;
