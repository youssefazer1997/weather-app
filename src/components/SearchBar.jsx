import React, { useRef } from "react";
import search_icon from "../assets/search.png";
import "./Weather.css";

const SearchBar = ({ onSearch }) => {
  const inputRef = useRef();

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSearch(inputRef.current.value);
    }
  };
  return (
    <div className="search-bar">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search"
        onKeyDown={handleKeyDown}
      />
      <img
        src={search_icon}
        alt=""
        onClick={() => onSearch(inputRef.current.value)}
      />
    </div>
  );
};

export default SearchBar;
