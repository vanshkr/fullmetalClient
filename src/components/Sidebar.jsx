import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useGetAnimeGenresQuery } from "../redux/services/jikanApi";
import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./styles.css";

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [tvisible, setTvisible] = useState(false);
  const [showAllGenres, setShowAllGenres] = useState(false);
  const location = useLocation()?.pathname;

  const { data, error, isFetching, promise, refetch } = useGetAnimeGenresQuery(
    "",
    {
      skip: false,
    }
  );
  const genres = data?.data;

  const displayedGenres = showAllGenres ? genres : genres?.slice(0, 10);

  const colorArray = [
    "#778741",
    "#FFBF5B",
    "#C63F31",
    "#CCA5D5",
    "#7EBFD8",
    "#D8B290",
    "#86E3CE",
  ];

  const arr = [
    ["Home", "/"],
    ["Movies", "/movie"],
    ["TV Series"],
    ["OVAs", "/ova"],
    ["ONAs", "/ona"],
    ["Specials", "/special"],
    ["Genre"],
  ];

  const tvSeriesOptions = [
    ["Airing", "/airing"],
    ["Upcoming", "/upcoming"],
    ["Popular", "/popular"],
    ["Favorite", "/favorite"],
  ];

  const ref = useRef(null);

  useEffect(() => {
    let timeoutId;
    if (data === undefined) {
      timeoutId = setTimeout(() => {
        refetch();
      }, 2000);
    }

    return () => clearTimeout(timeoutId);
  }, [data, refetch]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setSidebar(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleGenresVisibility = () => {
    setShowAllGenres(!showAllGenres);
  };

  const handleClick = () => {
    setSidebar((currentValue) => !currentValue);
    setTvisible(false);
    setShowAllGenres(false);
  };

  const handleItemShow = (item) => {
    if (item === "TV Series") {
      setTvisible((tvisible) => !tvisible);
    }
  };
  return (
    <div className='wrapper'>
      <div onClick={handleClick}>
        <AiOutlineMenu className='ml-4 cursor-pointer' />
      </div>
      <div className={sidebar ? "wrapper-sidebar active" : "wrapper-sidebar"}>
        <div ref={ref} className='sidebar overflow-y-auto'>
          <div className='m-2.5' onClick={handleClick}>
            <AiOutlineClose className='ml-4 cursor-pointer' />
          </div>
          <ul className='mt-3 flex flex-wrap'>
            {arr.map((item) => {
              return (
                <li
                  className='text-lg block w-full border-b border-blackRibbon'
                  onClick={() => {
                    handleItemShow(item[0]);
                    !["TV Series", "Genre"].includes(item[0])
                      ? handleClick()
                      : null;
                  }}
                >
                  <Link
                    className='block p-3.5 font-semibold relative hover:text-chineseGreen cursor-pointer'
                    to={`${
                      !["TV Series", "Genre"].includes(item[0])
                        ? item[1]
                        : `${location}`
                    }`}
                  >
                    {item[0]}
                  </Link>
                  {tvisible && item[0] === "TV Series" && (
                    <ul className='mt-3 flex flex-wrap text-lilacChampagne'>
                      {tvSeriesOptions.map((item) => {
                        return (
                          <li
                            className='text-md  block w-full border-b border-blackRibbon ml-5'
                            onClick={handleClick}
                          >
                            <Link
                              className='block p-3.5 font-semibold relative hover:text-chineseGreen cursor-pointer'
                              to={`${item[1]}`}
                            >
                              {item[0]}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                  {item[0] === "Genre" && (
                    <div className='mt-4'>
                      <div className=' grid grid-cols-2  '>
                        {displayedGenres?.map((item, ind) => (
                          <div
                            key={item.mal_id}
                            className='text-sm font-mono  mt-3 p-1 truncate  hover:bg-blackRibbon   cursor-pointer text-center'
                            style={{
                              color: `${colorArray[ind % 7]}`,
                            }}
                            onClick={handleClick}
                          >
                            {item.name}
                          </div>
                        ))}
                      </div>
                      <button
                        className='my-4 mx-2 text-white text-sm font-bold'
                        onClick={toggleGenresVisibility}
                      >
                        {showAllGenres ? "- Less" : "+ More"}
                      </button>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
