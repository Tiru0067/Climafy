import React from "react";

const SearchForm = ({
  handleSearchChange,
  handleSelectSuggestion,
  suggestions,
  searchQuery,
  handleSearchSubmit,
  handleKeyDown,
  selectedLocation,
}) => {
  return (
    <form className="search-form" onSubmit={handleSearchSubmit}>
      <input
        type="text"
        className="search-input"
        placeholder="Search city..."
        value={searchQuery}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        autoFocus
      />
      {suggestions.length > 0 && (
        <ul className="search-suggestions">
          {suggestions.map((item, index) => (
            <li
              key={item.id || index}
              className={
                selectedLocation === index && item.valid !== false
                  ? "suggestion-item active"
                  : "suggestion-item"
              }
            >
              <button
                type="button"
                disabled={item.valid === false}
                onClick={() =>
                  handleSelectSuggestion(
                    index,
                    item.latitude,
                    item.longitude,
                    item.name,
                    item.country,
                    item.country_code
                  )
                }
              >
                {item.name}, {item.country}
              </button>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default SearchForm;
