import React, { useState } from 'react';
import axios from 'axios';
import '../styles/searchbar.css';

const getUniqueNames = (arr) => [...new Set(arr.map(name => name.toLowerCase()))];

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [timeoutId, setTimeoutId] = useState(null);

  const handleChange = (e) => {
    setInput(e.target.value);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const trimmedInput = e.target.value.trim().toLowerCase();

    const newTimeoutId = setTimeout(() => {
      if (trimmedInput.length > 0) {
        fetchSuggestions(trimmedInput);
      } else {
        setSuggestions([]);
      }
    }, 500);

    setTimeoutId(newTimeoutId);
  };

  const fetchSuggestions = async (query) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/data/2.5/find?q=${query}&type=like&appid=${process.env.REACT_APP_API_KEY}`
      );

      if (response.data.list) {
        const cityNames = response.data.list.map(city => city.name.toLowerCase());
        const uniqueCityNames = getUniqueNames(cityNames);

        setSuggestions(uniqueCityNames);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Error fetching city suggestions:', error);
      setSuggestions([]);
    }
  };

  const handleSearch = () => {
    const trimmedInput = input.trim().toLowerCase();
    if (trimmedInput) {
      onSearch(trimmedInput);
      setInput('');
      setSuggestions([]);
    } else {
      onSearch('');
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    setSuggestions([]);
    handleSearch();
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Enter city name"
      />
      <button onClick={handleSearch}>Search</button>
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion.charAt(0).toUpperCase() + suggestion.slice(1)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
