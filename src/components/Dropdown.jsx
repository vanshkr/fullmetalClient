import React, { useState } from "react";
import { Link } from "react-router-dom";

const Dropdown = (data) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const totalPages = data?.data?.pagination?.last_visible_page;

  const renderPages = () => {
    const items = [];

    for (let i = 1; i <= totalPages; i++) {
      items.push(
        <a
          key={i}
          href={`https://api.jikan.moe/v4/anime/21/episodes?page=${i}`}
          className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
          role='menuitem'
        >
          Option {i}
        </a>
      );
    }

    return items;
  };

  return (
    <div className='relative inline-block text-left'>
      <button
        type='button'
        className='inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
        onClick={toggleDropdown}
      >
        Toggle Dropdown
      </button>
      {isOpen && (
        <div className='absolute overflow-auto h-56 right-0 mt-2 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg'>
          <div
            className='py-1'
            role='menu'
            aria-orientation='vertical'
            aria-labelledby='options-menu'
          >
            {renderPages()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
