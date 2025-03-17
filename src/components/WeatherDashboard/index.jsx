import React, { useContext } from "react";
import Header from "../Header";
import CurrentWeather from "../CurrentWeather";
import DataContext from "../../context/DataContext";
import ThemeProvider from "../../context/ThemeContext";
import Forecast from "../Forecast";
import Precipitation from "../Precipitation";
import ComparisonByDay from "../ComparisonByDay";
import TemperatureChart from "../TemperatureChart";
import PrecipitationChart from "../PrecipitaionChart";

import "./index.css";

const WeatherDashboard = () => {
  const { loading } = useContext(DataContext);
  const { theme, toggleTheme } = useContext(ThemeProvider);

  return (
    <main className="dashboard">
      <Header />
      {!loading.weather && (
        <div className="dashboard-content">
          <CurrentWeather />
          <div className="forecast-section">
            <Forecast />
            <Precipitation />
            <ComparisonByDay />
          </div>
          <div className="chart-section">
            <TemperatureChart />
            <PrecipitationChart />
          </div>
        </div>
      )}
    </main>
  );
};

export default WeatherDashboard;
