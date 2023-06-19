import {
  AiOutlineMenu,
  AiOutlineClose,
  AiTwotoneCustomerService,
} from "react-icons/ai";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [visible, setVisiblie] = useState(false);
  const location = useLocation()?.pathname;
  console.log(location);

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
  const handleClick = () => {
    setSidebar((currentValue) => !currentValue);
    setVisiblie(false);
  };
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
  const handleItemShow = (item) => {
    if (item === "TV Series") {
      setVisiblie((visible) => !visible);
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
                    if (item[0] !== "TV Series") handleClick();
                  }}
                >
                  <Link
                    className='block p-3.5 font-semibold relative hover:text-chineseGreen cursor-pointer'
                    to={`${item[0] !== "TV Series" ? item[1] : `${location}`}`}
                  >
                    {item[0]}
                  </Link>
                  {visible === true && item[0] === "TV Series" && (
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
