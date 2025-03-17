import React, { useContext } from "react";
import { format, parseISO, isToday } from "date-fns";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import "./index.css";
import DataContext from "../../context/DataContext";

const PrecipitationChart = () => {
  const { hourlyWeather } = useContext(DataContext);

  const hourlyData = hourlyWeather?.[0]?.hourly;

  // Filter hourly data for today and create 3-hour intervals
  const todayWeather = hourlyData?.time
    .map((time, index) => ({
      time,
      hour: format(parseISO(time), "H"),
      precipitation: hourlyData?.precipitation_probability?.[index],
    }))
    .filter((hour, index) => {
      const hourDate = parseISO(hour?.time);
      return isToday(hourDate) && index % 3 === 0; // Filters for 3-hour intervals
    });

  const maxPrecip = Math.max(...todayWeather?.map((d) => d?.precipitation));
  const minPrecip = Math.min(...todayWeather?.map((d) => d?.precipitation));
  const yMax = Math.ceil(maxPrecip / 10) * 10;

  return (
    <div className="precipitation-chart-wrapper">
      <h2 className="precipitation-chart-title">Precipitation today</h2>
      <p className="precipitation-chart-info">
        <span>↓</span>
        {minPrecip}%<span>↑</span>
        {maxPrecip}%
      </p>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          data={todayWeather}
          margin={{
            top: 12,
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
            domain={[0, yMax < 25 ? 25 : yMax]}
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
                  {`Precipitation: ${payload[0].value}%`}
                </div>
              ) : null
            }
          />

          <Line
            type="monotone"
            dataKey="precipitation"
            // stroke="#2563eb"
            // fill="#3b82f6"
            stroke="var(--chart-stroke)"
            fill="var(--chart-fill)"
            stackId="1"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PrecipitationChart;
