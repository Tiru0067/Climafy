import React, { useState, useEffect, useRef, useContext } from "react";
import { FaLocationArrow } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";

import "./index.css";
import SearchForm from "./SearchForm";
import SettignsMenu from "./SettignsMenu";
import DataContext from "../../context/DataContext";

const Header = () => {
  const [showInput, setShowInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(-1);

  const searchRef = useRef(null);
  const { coords, updateCoords, loading } = useContext(DataContext);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowInput(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);

    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [showInput]);

  const fetchSuggestions = async (query) => {
    if (query.length < 1) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${query}`
      );
      const data = await response.json();
      setSuggestions(
        data.results || [{ id: 0, name: "No results found", valid: false }]
      );
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    fetchSuggestions(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp" && selectedLocation > 0) {
      setSelectedLocation((prev) => prev - 1);
    }
    if (e.key === "ArrowDown" && selectedLocation < suggestions.length - 1) {
      setSelectedLocation((prev) => prev + 1);
    }
    if (
      e.key === "Enter" &&
      selectedLocation >= 0 &&
      suggestions.length > 0 &&
      suggestions[0].name !== "No results found"
    ) {
      e.preventDefault();
      const selectedItem = suggestions[selectedLocation];
      const { latitude, longitude, name, country, country_code } = selectedItem;
      updateCoords(latitude, longitude, name, country, country_code);
      setSearchQuery(name);
      setSuggestions([]);
      setShowInput(false);
    }
  };

  const handleSelectSuggestion = (
    index,
    lat,
    lon,
    city,
    country,
    countryCode
  ) => {
    updateCoords(lat, lon, city, country, countryCode);
    setSearchQuery(city);
    setSelectedLocation(index);
    setSuggestions([]); // Clear suggestions
    setShowInput(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (suggestions.length > 0 && suggestions[0].name !== "No results found") {
      const {
        latitude: lat,
        longitude: lon,
        name: city,
        country,
        country_code: countryCode,
      } = suggestions[0];
      handleSelectSuggestion(lat, lon, city, country, countryCode);
    } else {
      alert("No valid location found. Please try again.");
      setSearchQuery("");
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="logo">CLIMAFY</h1>
        <div className="location">
          <FaLocationArrow className="location-icon" />
          {!loading.location && (
            <p className="location-text">
              <span className="city-label">
                {coords?.city?.toUpperCase() || "UNKNOWN"}
              </span>
              <span> / {coords?.countryCode?.toUpperCase() || "UNKNOWN"}</span>
            </p>
          )}
        </div>
      </div>

      <div className="header-right">
        <div ref={searchRef} className="search-container">
          {showInput && (
            <SearchForm
              handleSearchChange={handleSearchChange}
              handleSelectSuggestion={handleSelectSuggestion}
              suggestions={suggestions}
              searchQuery={searchQuery}
              handleSearchSubmit={handleSearchSubmit}
              handleKeyDown={handleKeyDown}
              selectedLocation={selectedLocation}
            />
          )}
          <button
            type="button"
            className="search-button"
            onClick={() => setShowInput(!showInput)}
          >
            <FiSearch />
          </button>
        </div>

        <SettignsMenu />
      </div>
    </header>
  );
};

export default Header;
