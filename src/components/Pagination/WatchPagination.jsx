import React, { useState, useRef } from "react";

import { Link } from "react-router-dom";
const WatchPagination = ({ animeId, data, onPageChange, onEpisodeChange }) => {
  const itemsPerPage = data?.data?.length;
  const initialItems = useRef(100);
  const totalPages = data?.pagination?.last_visible_page;
 

  const handlePageChange = (page) => {
    onPageChange(page);
  };

  const handleEpsiodeChange = (ep) => {
    onEpisodeChange(ep);
  };
  const renderPagination = () => {
    const pagination = [];

    for (let i = 1; i <= totalPages; i++) {
      const startIndex = (i - 1) * initialItems.current;
      const endIndex = startIndex + initialItems.current;
      pagination.push(`Eps: ${startIndex + 1}-${endIndex}`);
    }

    return pagination;
  };

  const renderItems = () => {
    const startIndex = data?.data?.[0]?.mal_id;
    const endIndex = data?.data?.[itemsPerPage - 1]?.mal_id;
    const items = [];
    for (let i = startIndex; i <= endIndex; i++) {
      items.push(
        <Link
          className=' cursor-pointer rounded-md text-center bg-blackRibbon hover:bg-blackRibbon hover:opacity-100 '
          key={i}
          onClick={() => {
            handleEpsiodeChange(i);
          }}
        >
          {i}
        </Link>
      );
    }

    return items;
  };

  return (
    <div className='bg-nobleBlack'>
      <div className='bg-cursedBlack'>
        <div className='relative inline-block text-left bg-cursedBlack'>
          <>
            <div className='inline-flex cursor-pointer justify-center px-4 py-2 text-sm font-medium text-white'>
              List of Episodes -
            </div>

            <div className='px-4 cursor-pointer  '>
              <select
                className='py-1 text-white bg-cursedBlack'
                onChange={(e) => handlePageChange(Number(e.target.value))}
              >
                {renderPagination().map((p, i) => {
                  return (
                    <option className=' text-white' key={i} value={i + 1}>
                      {p}
                    </option>
                  );
                })}
              </select>
            </div>
          </>
        </div>
      </div>

      <div className='  p-3 '>
        <div className='grid grid-cols-5 gap-1'>{renderItems()}</div>
      </div>
    </div>
  );
};

export default WatchPagination;
