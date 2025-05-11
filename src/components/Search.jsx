import React, { useState } from "react";
import searchIcon from '../assets/images';

const Search = ({ onSearch }) => {
    const [query, setQuery] = useState("");
  
    const handleChange = (e) => {
      const value = e.target.value.toLowerCase();
      setQuery(value);
      onSearch(value);
    };
  
    return (
      <div className="flex items-center border-b border-gray-300 mb-4 px-4">
        <img src={searchIcon} alt="Search" className="w-5 h-5 mr-2" />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Rechercher un article..."
          className="flex-1 p-2 outline-none"
        />
      </div>
    );
  };
  
  export default Search;
