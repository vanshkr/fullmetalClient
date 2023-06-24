import React, { useState } from "react";
import { useLocation } from "react-router-dom";
function Sign() {
  const search = useLocation();
  console.log(search);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    const encodedSearchTerm = encodeURIComponent(searchTerm);
    const searchUrl = `${search}?keyword=${encodedSearchTerm}`;

    // Perform the search operation using the searchUrl
    // You can use fetch, axios, or any other method to make an HTTP request
    // to the searchUrl and retrieve the search results.
    // For simplicity, let's just log the searchUrl for now.
    console.log(searchUrl);
  };

  return (
    <div>
      <input
        type='text'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className='text-white' onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default Sign;
