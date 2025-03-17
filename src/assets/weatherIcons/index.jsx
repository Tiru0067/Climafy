// Import all the SVG icons
import sunny from "./sunny.svg";
import clearNight from "./clear_night.svg";
import partlyCloudy1 from "./partly_cloudy_1.svg";
import partlyCloudy0 from "./partly_cloudy_0.svg";
import mediumCloudy1 from "./medium_cloudy_1.svg";
import mediumCloudy0 from "./medium_cloudy_0.svg";
import foggy1 from "./foggy_1.svg";
import foggy0 from "./foggy_0.svg";
import lightRain1 from "./light_rain_1.svg";
import lightRain0 from "./light_rain_0.svg";
import rain1 from "./rain_1.svg";
import rain0 from "./rain_0.svg";
import sleet1 from "./sleet_1.svg";
import sleet0 from "./sleet_0.svg";
import sleet from "./sleet.svg";
import lightSnow1 from "./light_snow_1.svg";
import lightSnow0 from "./light_snow_0.svg";
import lightSnow from "./light_snow.svg";
import snow1 from "./snow_1.svg";
import snow0 from "./snow_0.svg";
import snow from "./snow.svg";
import thunderStorm1 from "./thunder_storm_1.svg";
import thunderStorm0 from "./thunder_storm_0.svg";
import thunderShower1 from "./thunder_shower_1.svg";
import thunderShower0 from "./thunder_shower_0.svg";
import tornado from "./tornado.svg";
import wind from "./wind.svg";
import hail1 from "./hail_1.svg";
import hail0 from "./hail_0.svg";

// Map weather codes to their respective icons
const weatherIcons = {
  0: { name: "Clear sky", icon: sunny, nightIcon: clearNight },
  1: { name: "Mostly clear", icon: partlyCloudy1, nightIcon: partlyCloudy0 },
  2: { name: "Partly cloudy", icon: partlyCloudy1, nightIcon: partlyCloudy0 },
  3: { name: "Overcast", icon: mediumCloudy1, nightIcon: mediumCloudy0 },
  45: { name: "Foggy", icon: foggy1, nightIcon: foggy0 },
  48: { name: "Freezy foggy", icon: foggy1, nightIcon: foggy0 },
  51: { name: "Light drizzle", icon: lightRain1, nightIcon: lightRain0 },
  53: { name: "Moderate drizzle", icon: lightRain1, nightIcon: lightRain0 },
  55: { name: "Dense drizzle", icon: lightRain1, nightIcon: lightRain0 },
  61: { name: "Slight rain", icon: rain1, nightIcon: rain0 },
  63: { name: "Moderate rain", icon: rain1, nightIcon: rain0 },
  65: { name: "Heavy rain", icon: rain1, nightIcon: rain0 },
  66: { name: "Light freezing rain", icon: sleet1, nightIcon: sleet0 },
  67: { name: "Heavy freezing rain", icon: sleet1, nightIcon: sleet0 },
  71: { name: "Light snowfall", icon: lightSnow1, nightIcon: lightSnow0 },
  73: { name: "Moderate snowfall", icon: snow1, nightIcon: snow0 },
  75: { name: "Heavy snowfall", icon: snow1, nightIcon: snow0 },
  77: { name: "Snow grains", icon: snow, nightIcon: snow },
  80: { name: "Light rain showers", icon: rain1, nightIcon: rain0 },
  81: { name: "Moderate rain showers", icon: rain1, nightIcon: rain0 },
  82: { name: "Heavy rain showers", icon: rain1, nightIcon: rain0 },
  85: { name: "Light snow showers", icon: lightSnow1, nightIcon: lightSnow0 },
  86: { name: "Heavy snow showers", icon: snow1, nightIcon: snow0 },
  95: { name: "Thunderstorm", icon: thunderStorm1, nightIcon: thunderStorm0 },
  96: {
    name: "Thunderstorm with hail",
    icon: thunderShower1,
    nightIcon: thunderShower0,
  },
  99: {
    name: "Severe thunderstorm",
    icon: thunderShower1,
    nightIcon: thunderShower0,
  },
  100: { name: "Tornado", icon: tornado, nightIcon: tornado },
  200: { name: "Windy", icon: wind, nightIcon: wind },
  300: { name: "Hail", icon: hail1, nightIcon: hail0 },
};

export default weatherIcons;
