import React from "react";
import { useContext } from "react";
import { format, parseISO, isToday } from "date-fns";

import "./index.css";
import DataContext from "../../../context/DataContext";
import weatherIcons from "../../../assets/weatherIcons";

const HourlyWeather = () => {
  const { hourlyWeather, is12Hour } = useContext(DataContext);

  const hourlyData = hourlyWeather?.[0]?.hourly;
  if (!hourlyData || !hourlyData.time) return null; // Prevent errors if data is not available

  // Filter hourly data for today and create 3-hour intervals
  const todayWeather = hourlyData?.time
    .map((time, index) => ({
      time,
      temperature: Math.round(hourlyData?.temperature_2m?.[index]),
      weatherCode: hourlyData?.weather_code?.[index],
    }))
    .filter((hour, index) => {
      const hourDate = parseISO(hour?.time);
      return isToday(hourDate) && index % 3 === 0; // Filters for 3-hour intervals
    });

  return (
    <div className="hourly-container">
      {todayWeather?.map((item, index) => {
        const locationHour = parseISO(hourlyData?.time?.[0] ?? "").getHours();
        const isNight = locationHour >= 18 || locationHour < 6;

        const weatherIcon = isNight
          ? weatherIcons?.[item?.weatherCode]?.nightIcon
          : weatherIcons?.[item?.weatherCode]?.icon;

        const timeFormat = is12Hour ? "h:mm a" : "H:mm";

        return (
          <div key={index} className="hourly-card">
            <span>
              <img
                src={weatherIcon}
                alt="weather icon"
                className="hourly-weather-icon"
              />
            </span>
            <p className="hourly-temp">{item?.temperature}°</p>
            <p className={is12Hour ? "hourly-time-12" : "hourly-time"}>
              {format(parseISO(item?.time), timeFormat)}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default HourlyWeather;
