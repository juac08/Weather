import {
  Button,
  TextField,
  IconButton,
  Chip,
  InputAdornment,
} from "@material-ui/core";
import React, { useState, useEffect, useRef } from "react";
import { useGlobalContext } from "./context";
import { Fade } from "react-awesome-reveal";
import {
  WbSunny,
  Brightness2,
  Opacity,
  Waves,
  Visibility,
  Speed,
  MyLocation,
  Share,
  VolumeUp,
  VolumeOff,
} from "@material-ui/icons";
import WeatherParticles from "./WeatherParticles";
import CountUp from "./CountUp";
import ExtendedWeather from "./ExtendedWeather";

function FetchData() {
  const {
    setName,
    data,
    getData,
    darkMode,
    toggleDarkMode,
    error,
    setError,
    recentSearches,
    addRecentSearch,
    getLocationWeather,
  } = useGlobalContext();
  const [scrollY, setScrollY] = useState(0);
  const [cityInput, setCityInput] = useState("");
  const [inputError, setInputError] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(
    localStorage.getItem("soundEnabled") === "true",
  );
  const audioRef = useRef(null);

  // Popular cities for autocomplete
  const popularCities = [
    "New York",
    "London",
    "Paris",
    "Tokyo",
    "Dubai",
    "Singapore",
    "Hong Kong",
    "Los Angeles",
    "Chicago",
    "Mumbai",
    "Sydney",
    "Berlin",
    "Madrid",
    "Rome",
    "Toronto",
    "Moscow",
    "Beijing",
    "Seoul",
    "Bangkok",
    "Istanbul",
    "Barcelona",
    "Amsterdam",
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setInputError("");
    setError("");

    if (!cityInput.trim()) {
      setInputError("Please enter a city name");
      return;
    }

    if (cityInput.trim().length < 2) {
      setInputError("City name must be at least 2 characters");
      return;
    }

    setName(cityInput);
    addRecentSearch(cityInput);
    getData(cityInput);
    setShowSuggestions(false);
  };

  const handleCityInputChange = (e) => {
    const value = e.target.value;
    setCityInput(value);
    if (inputError) setInputError("");
    if (error) setError("");

    // Autocomplete suggestions
    if (value.length > 1) {
      const filtered = popularCities.filter((city) =>
        city.toLowerCase().startsWith(value.toLowerCase()),
      );
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (city) => {
    setCityInput(city);
    setShowSuggestions(false);
    setName(city);
    addRecentSearch(city);
    getData(city);
  };

  const handleRecentSearchClick = (city) => {
    setCityInput(city);
    setName(city);
    getData(city);
  };

  const handleShareWeather = () => {
    if (navigator.share && data.name) {
      navigator
        .share({
          title: `Weather in ${data.name}`,
          text: `Current temperature in ${data.name} is ${Math.round(data.main?.temp)}°C. ${data.weather?.[0]?.description}`,
          url: window.location.href,
        })
        .catch(() => {
          // Fallback: copy to clipboard
          const text = `Weather in ${data.name}: ${Math.round(data.main?.temp)}°C - ${data.weather?.[0]?.description}`;
          navigator.clipboard.writeText(text);
          alert("Weather info copied to clipboard!");
        });
    } else {
      const text = `Weather in ${data.name}: ${Math.round(data.main?.temp)}°C - ${data.weather?.[0]?.description}`;
      navigator.clipboard.writeText(text);
      alert("Weather info copied to clipboard!");
    }
  };

  const toggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    localStorage.setItem("soundEnabled", newState);
    if (!newState && audioRef.current) {
      audioRef.current.pause();
    }
  };

  // Play ambient sound based on weather
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new window.Audio();
    }
    const weatherMain = data.weather?.[0]?.main?.toLowerCase();
    let soundFile = null;
    switch (weatherMain) {
      case "rain":
      case "drizzle":
        soundFile = "/sounds/rain.mp3";
        break;
      case "thunderstorm":
        soundFile = "/sounds/thunderstorm.mp3";
        break;
      case "snow":
        soundFile = "/sounds/snow.mp3";
        break;
      case "wind":
        soundFile = "/sounds/wind.mp3";
        break;
      case "clear":
        soundFile = "/sounds/clear.mp3";
        break;
      default:
        soundFile = null;
    }

    if (soundEnabled && soundFile) {
      if (audioRef.current.src !== window.location.origin + soundFile) {
        audioRef.current.src = soundFile;
      }
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(() => {
        /* ignore play errors */
      });
    } else if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // Pause sound on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [soundEnabled, data.weather]);

  const sunriseTime = new Date(data.sys?.sunrise * 1000).toLocaleTimeString(
    [],
    {
      hour: "2-digit",
      minute: "2-digit",
    },
  );
  const sunsetTime = new Date(data.sys?.sunset * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const weatherCondition = data.weather?.[0]?.main?.toLowerCase() || "clear";
  const weatherClass = `weather-${weatherCondition}`;

  return (
    <>
      <WeatherParticles weatherType={weatherCondition} />
      <section
        className={`weather-app ${darkMode ? "dark-mode" : "light-mode"} ${weatherClass}`}
      >
        {/* Parallax Background Layers */}
        <div
          className="parallax-bg"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        />
        <div
          className="parallax-layer-1"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        />

        {/* Header with Dark Mode Toggle and Actions */}
        <div className="header">
          <h2 className="app-title">
            <WbSunny className="title-icon" /> Weather App
          </h2>
          <div className="header-actions">
            <IconButton
              onClick={toggleSound}
              className="action-button"
              title="Toggle Sound"
            >
              {soundEnabled ? <VolumeUp /> : <VolumeOff />}
            </IconButton>
            {data.name && (
              <IconButton
                onClick={handleShareWeather}
                className="action-button"
                title="Share Weather"
              >
                <Share />
              </IconButton>
            )}
            <IconButton onClick={toggleDarkMode} className="theme-toggle">
              {darkMode ? <WbSunny /> : <Brightness2 />}
            </IconButton>
          </div>
        </div>

        {/* Search Form */}
        <Fade duration={800}>
          <div className="search-section">
            <form className="form-control modern-form" onSubmit={handleSearch}>
              <div className="search-input-wrapper">
                <TextField
                  id="city-search"
                  variant="outlined"
                  placeholder="Enter city name..."
                  onChange={handleCityInputChange}
                  value={cityInput}
                  autoComplete="off"
                  className="search-input"
                  fullWidth
                  error={!!inputError || !!error}
                  helperText={inputError || error}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSearch(e);
                    }
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={getLocationWeather}
                          edge="end"
                          title="Use My Location"
                          className="location-icon-button"
                        >
                          <MyLocation />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {showSuggestions && suggestions.length > 0 && (
                  <div className="autocomplete-dropdown">
                    {suggestions.map((city, index) => (
                      <div
                        key={index}
                        className="autocomplete-item"
                        onClick={() => handleSuggestionClick(city)}
                      >
                        {city}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <Button
                variant="contained"
                className="search-button"
                type="submit"
              >
                Search
              </Button>
            </form>

            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="recent-searches">
                <p className="recent-label">Recent:</p>
                <div className="recent-chips">
                  {recentSearches.map((city, index) => (
                    <Chip
                      key={index}
                      label={city}
                      onClick={() => handleRecentSearchClick(city)}
                      className="recent-chip"
                      size="small"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </Fade>

        {/* Main Weather Container */}
        {data.weather?.map((item) => {
          const { main, description, icon } = item;
          const ic = `https://openweathermap.org/img/wn/${icon}@4x.png`;

          return (
            <div key={data.sys?.id} className="weather-container">
              {/* Location & Date */}
              <Fade duration={1000} delay={100}>
                <div className="location-section">
                  <h1 className="city-name">{data.name}</h1>
                  <p className="date-text">
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="weather-description">{description}</p>
                </div>
              </Fade>

              {/* Main Temperature Display */}
              <Fade duration={1000} delay={200}>
                <div className="temp-main-section">
                  <img className="weather-icon" src={ic} alt={main} />
                  <div className="temp-display">
                    <h1 className="temp-main">
                      <CountUp
                        end={Math.round(data.main?.temp)}
                        duration={1500}
                        suffix="°"
                      />
                    </h1>
                    <p className="feels-like">
                      Feels like{" "}
                      <CountUp
                        end={Math.round(data.main?.feels_like)}
                        duration={1500}
                        suffix="°"
                      />
                    </p>
                  </div>
                </div>

                <div className="temp-range">
                  <div className="temp-box">
                    <span className="temp-label">High</span>
                    <span className="temp-value">
                      <CountUp
                        end={Math.round(data.main?.temp_max)}
                        duration={1200}
                        suffix="°"
                      />
                    </span>
                  </div>
                  <div className="temp-divider"></div>
                  <div className="temp-box">
                    <span className="temp-label">Low</span>
                    <span className="temp-value">
                      <CountUp
                        end={Math.round(data.main?.temp_min)}
                        duration={1200}
                        suffix="°"
                      />
                    </span>
                  </div>
                </div>
              </Fade>

              {/* Weather Details Grid */}
              <Fade duration={1000} delay={300} cascade>
                <div className="weather-details-grid">
                  <div className="detail-card">
                    <Opacity className="detail-icon" />
                    <div className="detail-content">
                      <p className="detail-label">Humidity</p>
                      <p className="detail-value">
                        <CountUp
                          end={data.main?.humidity}
                          duration={1200}
                          suffix="%"
                        />
                      </p>
                    </div>
                  </div>

                  <div className="detail-card">
                    <Waves className="detail-icon" />
                    <div className="detail-content">
                      <p className="detail-label">Wind Speed</p>
                      <p className="detail-value">
                        <CountUp
                          end={Math.round(data.wind?.speed * 10) / 10}
                          duration={1200}
                          suffix=" m/s"
                        />
                      </p>
                    </div>
                  </div>

                  <div className="detail-card">
                    <Visibility className="detail-icon" />
                    <div className="detail-content">
                      <p className="detail-label">Visibility</p>
                      <p className="detail-value">
                        <CountUp
                          end={Math.round((data.visibility / 1000) * 10) / 10}
                          duration={1200}
                          suffix=" km"
                        />
                      </p>
                    </div>
                  </div>

                  <div className="detail-card">
                    <Speed className="detail-icon" />
                    <div className="detail-content">
                      <p className="detail-label">Pressure</p>
                      <p className="detail-value">
                        <CountUp
                          end={data.main?.pressure}
                          duration={1200}
                          suffix=" hPa"
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </Fade>

              {/* Sunrise & Sunset */}
              <Fade duration={1000} delay={400}>
                <div className="sun-times">
                  <div className="sun-time-card">
                    <WbSunny className="sun-icon sunrise" />
                    <div>
                      <p className="sun-label">Sunrise</p>
                      <p className="sun-time">{sunriseTime}</p>
                    </div>
                  </div>
                  <div className="sun-time-card">
                    <Brightness2 className="sun-icon sunset" />
                    <div>
                      <p className="sun-label">Sunset</p>
                      <p className="sun-time">{sunsetTime}</p>
                    </div>
                  </div>
                </div>
              </Fade>

              {/* Extended Weather Info */}
              <Fade duration={1000} delay={500}>
                <ExtendedWeather data={data} />
              </Fade>
            </div>
          );
        })}
      </section>
    </>
  );
}

export default FetchData;
