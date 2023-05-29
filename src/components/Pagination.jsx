import { useState, useRef } from "react";
import { Link } from "react-router-dom";
const Pagination = ({
  data,
  onPageChange,
  onEpisodeChange,
  firstPageItems,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

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
      pagination.push(
        <option className=' text-white' key={i} value={i}>
          Eps: {startIndex + 1}-{endIndex}
        </option>
      );
    }

    return pagination;
  };
  console.log("paginaiton render");

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
            handleEpsiodeChange(i - startIndex);
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
          <div
            className='inline-flex cursor-pointer justify-center px-4 py-2 text-sm font-medium text-white'
            onClick={toggleDropdown}
          >
            Episodes List -
          </div>
          {isOpen && (
            <div className='rounded-l-xl cursor-pointer   absolute overflow-auto h-40 right-0 mt-2 origin-top-right bg-black '>
              <div
                className='py-1 '
                onClick={(e) => handlePageChange(Number(e.target.value))}
              >
                {renderPagination()}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className='  p-3 '>
        <div className='grid grid-cols-5 gap-1'>{renderItems()}</div>
      </div>
    </div>
  );
};

export default Pagination;
