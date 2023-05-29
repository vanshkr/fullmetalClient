import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
// import { links } from "../assets/constants";

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);
  const arr = [
    "Home",
    "Subbed Anime",
    "Dubbed Anime",
    "Most Popular",
    "Movies",
    "TV Series",
    "OVAs",
    "ONAs",
    "Specials",
    "Events",
    "Genre",
  ];
  const ref = useRef(null);
  const handleClick = () => {
    setSidebar((currentValue) => !currentValue);
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
                <li className='text-lg block w-full border-b border-blackRibbon'>
                  <Link
                    className='block p-3.5 font-semibold relative hover:text-chineseGreen cursor-pointer'
                    to={"#"}
                  >
                    {item}
                  </Link>
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
