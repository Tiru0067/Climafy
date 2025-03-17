import { createContext, useEffect, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [loading, setLoading] = useState({
    location: true,
    weather: true,
    yesterday: true,
  });
  const [coords, setCoords] = useState({
    lat: "",
    lon: "",
    city: "",
    country: "",
    countryCode: "",
  });
  const [timezone, setTimezone] = useState("");
  const [weatherNow, setWeatherNow] = useState([]);
  const [hourlyWeather, setHourlyWeather] = useState([]);
  const [weeklyForecast, setWeeklyForecast] = useState([]);
  const [yesterdayWeather, setYesterdayWeather] = useState([]);
  const [settings, setSettings] = useState({
    temperatureUnit: "celsius",
    windspeedUnit: "kmh",
    precipitationUnit: "mm",
  });

  const [fahrenheit, setFahrenheit] = useState(false);
  const [mph, setMph] = useState(false);
  const [inches, setInches] = useState(false);

  const updateCoords = (lat, lon, city, country, countryCode) => {
    setCoords({ lat, lon, city, country, countryCode });
  };

  useEffect(() => {
    setSettings({
      temperatureUnit: fahrenheit ? "fahrenheit" : "celsius",
      windspeedUnit: mph ? "mph" : "kmh",
      precipitationUnit: inches ? "inch" : "mm",
    });
  }, [fahrenheit, inches, mph]);

  useEffect(() => {
    const getCurrentLocation = async () => {
      try {
        const response = await fetch("http://ip-api.com/json");
        const data = await response.json();
        updateCoords(
          data.lat,
          data.lon,
          data.city,
          data.country,
          data.countryCode
        );
      } catch (error) {
        console.error("Error fetching location:", error);
      } finally {
        setLoading((prev) => ({ ...prev, location: false }));
      }
    };

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
          const response = await fetch(url);
          const data = await response.json();
          const { lat, lon, city, country, country_code } = data.address;
          updateCoords(lat, lon, city, country, country_code);
        } catch (err) {
          console.log(err.message);
        } finally {
          setLoading((prev) => ({ ...prev, location: false }));
        }
      },
      (err) => {
        if (err.code === 1) {
          console.log("User denied location access");
          getCurrentLocation();
        }
      }
    );
  }, []);

  useEffect(() => {
    if (!coords.lat || !coords.lon) return;
    const { temperatureUnit, windspeedUnit, precipitationUnit } = settings;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,apparent_temperature,wind_speed_10m,weathercode,precipitation,pressure_msl,relative_humidity_2m,rain,showers,snowfall&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_sum,precipitation_probability_max,sunrise,sunset&hourly=temperature_2m,weather_code,precipitation_probability&timezone=auto&temperature_unit=${temperatureUnit}&wind_speed_unit=${windspeedUnit}&precipitation_unit=${precipitationUnit}`;

    const fetchWeather = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        const {
          current,
          current_units,
          hourly,
          hourly_units,
          daily,
          daily_units,
        } = data;
        setTimezone(data.timezone);
        setWeatherNow([{ current, current_units }]);
        setHourlyWeather([{ hourly, hourly_units }]);
        setWeeklyForecast([{ daily, daily_units }]);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading((prev) => ({ ...prev, weather: false }));
      }
    };

    const fetchYesterdayWeather = async () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const formattedDate = yesterday.toISOString().split("T")[0];
      const { temperatureUnit, windspeedUnit, precipitationUnit } = settings;

      try {
        const url = `https://historical-forecast-api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&start_date=${formattedDate}&end_date=${formattedDate}&daily=temperature_2m_max,temperature_2m_min&temperature_unit=${temperatureUnit}&wind_speed_unit=${windspeedUnit}&precipitation_unit=${precipitationUnit}`;
        const response = await fetch(url);
        const data = await response.json();
        setYesterdayWeather([
          { daily: data.daily, daily_units: data.daily_units },
        ]);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading((prev) => ({ ...prev, yesterday: false }));
      }
    };

    fetchWeather();
    fetchYesterdayWeather();
  }, [coords, settings]);

  return (
    <DataContext.Provider
      value={{
        coords,
        updateCoords,
        loading,
        timezone,
        weatherNow,
        weeklyForecast,
        hourlyWeather,
        yesterdayWeather,
        fahrenheit,
        setFahrenheit,
        inches,
        setInches,
        mph,
        setMph,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
