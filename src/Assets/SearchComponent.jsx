import React from 'react';
import './SearchComponent.css';

function SearchComponent({ searchQuery, handleSearchChange }) {
  return (
    <div className="searchbox">
      <input
        id="searchbox"
        autoComplete="off"
        placeholder="Search by name, location, or office name"
        value={searchQuery}
        onChange={handleSearchChange}
      />
   
      <div id="searchbttn">
        <img src="search1.png" className="img-1-search" />
        <img
          src="https://assets.buildout.com/assets/loading-results-spinner-search-79b0aa952513d2ec7d0970966c33db5cccbc28fd3eb3c1ef8365e7c0b56501b5.gif"
          className="searchingicon"
        />
      </div>
    </div>
  );
}

export default SearchComponent;
