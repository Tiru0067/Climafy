import React, { useContext } from "react";
import { format, parseISO, isToday } from "date-fns";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import "./index.css";
import DataContext from "../../context/DataContext";

const TemperatureChart = () => {
  const { hourlyWeather } = useContext(DataContext);

  const hourlyData = hourlyWeather[0].hourly;

  // Filter hourly data for today and create 3-hour intervals
  const todayWeather = hourlyData.time
    .map((time, index) => ({
      time,
      hour: format(parseISO(time), "H"),
      temperature: Math.round(hourlyData.temperature_2m[index]),
    }))
    .filter((hour, index) => {
      const hourDate = parseISO(hour.time);
      return isToday(hourDate) && index % 3 === 0; // Filters for 3-hour intervals
    });

  const maxTemp = Math.max(...todayWeather.map((d) => d.temperature));
  const minTemp = Math.min(...todayWeather.map((d) => d.temperature));

  // Adjust Y-axis to start from minTemp if negative, else from 0
  const yMin = minTemp < 0 ? Math.floor(minTemp / 10) * 10 : 0;
  const yMax = Math.ceil(maxTemp / 10) * 10;

  return (
    <div className="temp-chart-wrapper">
      <h2 className="temp-chart-title">Temperature today</h2>
      <p className="temp-chart-info">
        <span>↓</span>
        {minTemp}%<span>↑</span>
        {maxTemp}%
      </p>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          data={todayWeather}
          margin={{
            top: 10,
            right: -20,
            left: 5,
            bottom: 0,
          }}
        >
          <CartesianGrid
            stroke="var(--chart-dashed-line)"
            strokeDasharray="3 3"
          />
          <XAxis dataKey="hour" tickMargin={5} />
          <YAxis
            domain={[yMin, yMax < 25 ? 25 : yMax]}
            tickCount={Math.ceil((yMax < 50 ? 50 : yMax) / 10) + 1}
            orientation="right"
            tickMargin={5}
          />
          <Tooltip
            content={({ payload }) =>
              payload.length ? (
                <div
                  style={{
                    background: "var(--tooltip-background)",
                    color: "var(--tooltip-text)",
                    padding: "5px 10px",
                    fontSize: "12px",
                    borderRadius: "5px",
                  }}
                >
                  {`Temp: ${payload[0].value}°`}
                </div>
              ) : null
            }
          />

          <Area
            type="monotone"
            dataKey="temperature"
            // stroke="#2563eb"
            // fill="#3b82f6"
            stroke="var(--chart-stroke)"
            fill="var(--chart-fill)"
            stackId="1"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TemperatureChart;
