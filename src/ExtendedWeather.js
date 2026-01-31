import React from "react";
import "./ExtendedWeather.css";
import { WbSunny, Cloud } from "@material-ui/icons";

function ExtendedWeather({ data }) {
  // Calculate UV Index (approximate based on time and weather)
  const getUVIndex = () => {
    const hour = new Date().getHours();
    const isDay = hour >= 6 && hour <= 18;
    const cloudCover = data.clouds?.all || 0;

    if (!isDay) return { level: 0, label: "Low", color: "#4caf50" };

    const baseUV = 8 - (cloudCover / 100) * 5;

    if (baseUV < 3)
      return { level: Math.round(baseUV), label: "Low", color: "#4caf50" };
    if (baseUV < 6)
      return { level: Math.round(baseUV), label: "Moderate", color: "#ff9800" };
    if (baseUV < 8)
      return { level: Math.round(baseUV), label: "High", color: "#ff5722" };
    return { level: Math.round(baseUV), label: "Very High", color: "#f44336" };
  };

  // Calculate Air Quality Index (approximate based on weather conditions)
  const getAQI = () => {
    const visibility = data.visibility || 10000;
    const humidity = data.main?.humidity || 50;

    // Rough AQI calculation
    const visibilityScore = (10000 - visibility) / 100;
    const humidityScore = Math.abs(humidity - 50) / 2;
    const aqi = Math.min(Math.round(visibilityScore + humidityScore + 20), 200);

    if (aqi < 50)
      return {
        level: aqi,
        label: "Good",
        color: "#4caf50",
        description: "Air quality is good",
      };
    if (aqi < 100)
      return {
        level: aqi,
        label: "Moderate",
        color: "#ff9800",
        description: "Acceptable air quality",
      };
    if (aqi < 150)
      return {
        level: aqi,
        label: "Unhealthy for Sensitive Groups",
        color: "#ff5722",
        description: "May affect sensitive people",
      };
    return {
      level: aqi,
      label: "Unhealthy",
      color: "#f44336",
      description: "Everyone may experience health effects",
    };
  };

  const uvIndex = getUVIndex();
  const aqi = getAQI();

  return (
    <div className="extended-weather">
      {/* UV Index */}
      <div className="extended-card uv-card">
        <div className="extended-header">
          <WbSunny className="extended-icon" />
          <h3>UV Index</h3>
        </div>
        <div className="uv-display">
          <div className="uv-level" style={{ color: uvIndex.color }}>
            {uvIndex.level}
          </div>
          <div className="uv-label" style={{ color: uvIndex.color }}>
            {uvIndex.label}
          </div>
        </div>
        <div className="uv-bar">
          <div
            className="uv-bar-fill"
            style={{
              width: `${(uvIndex.level / 11) * 100}%`,
              background: uvIndex.color,
            }}
          />
        </div>
      </div>

      {/* Air Quality */}
      <div className="extended-card aqi-card">
        <div className="extended-header">
          <Cloud className="extended-icon" />
          <h3>Air Quality</h3>
        </div>
        <div className="aqi-display">
          <div className="aqi-level" style={{ color: aqi.color }}>
            {aqi.level}
          </div>
          <div className="aqi-label" style={{ color: aqi.color }}>
            {aqi.label}
          </div>
        </div>
        <p className="aqi-description">{aqi.description}</p>
      </div>

    </div>
  );
}

export default ExtendedWeather;
