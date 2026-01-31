import React, { useState, useEffect, useContext } from "react";
import SkeletonLoader from "./SkeletonLoader";
const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("Oslo");
  const [error, setError] = useState("");
  const [recentSearches, setRecentSearches] = useState(
    JSON.parse(localStorage.getItem("recentSearches")) || [],
  );
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true" || true,
  );
  const clientID = process.env.REACT_APP_KEY;

  const getData = async (cityName = name) => {
    setLoading(true);
    setError("");
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${clientID}`;
    try {
      const response = await fetch(url);
      const i = await response.json();
      if (i.cod === "404" || i.cod === 404) {
        setError("City not found. Please try again.");
        setLoading(false);
        return;
      }
      if (i.cod !== 200) {
        setError("Unable to fetch weather data. Please try again.");
        setLoading(false);
        return;
      }
      setData(i);
      setLoading(false);
    } catch (error) {
      setError("Network error. Please check your connection.");
      setLoading(false);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };

  const addRecentSearch = (cityName) => {
    const updatedSearches = [
      cityName,
      ...recentSearches.filter((c) => c !== cityName),
    ].slice(0, 5);
    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  const getLocationWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${clientID}`;
          setLoading(true);
          setError("");
          try {
            const response = await fetch(url);
            const i = await response.json();
            if (i.cod !== 200) {
              setError("Unable to fetch weather data.");
              setLoading(false);
              return;
            }
            setData(i);
            setName(i.name);
            setLoading(false);
          } catch (error) {
            setError("Network error. Please check your connection.");
            setLoading(false);
          }
        },
        (error) => {
          setError(
            "Unable to get your location. Please enable location services.",
          );
        },
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <SkeletonLoader />;
  }
  if (!data.main) {
    return (
      <h1 className="section-center">Invalid City. Go Back And Try Again</h1>
    );
  }
  return (
    <AppContext.Provider
      value={{
        data,
        getData,
        setName,
        error,
        setError,
        darkMode,
        toggleDarkMode,
        recentSearches,
        addRecentSearch,
        getLocationWeather,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export default AppProvider;
