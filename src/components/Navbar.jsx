import { IoIosNotificationsOutline } from "react-icons/io";
import { HiOutlineUserCircle } from "react-icons/hi";
import Sidebar from "./Sidebar";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  loadUserDataFromLocalStorage,
  logout,
} from "../redux/features/userAuthSlice";
import jwtDecode from "jwt-decode";
const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const value = useSelector((state) => state.userAuth.userData);
  const [isEditing, setIsEditing] = useState(false);

  const dropdownRef = useRef(null);
  const handleButtonClick = () => {
    setIsEditing(!isEditing);
  };
  const handlePromise = () => {
    return new Promise((resolve, reject) => {
      dispatch(loadUserDataFromLocalStorage());
      resolve(); // Resolves immediately after dispatching the action
    });
  };
  const handleDispatch = async () => await handlePromise();
  useEffect(() => {
    handleDispatch();
    const token = value?.token;

    if (token) {
      const decodedToken = jwtDecode(token);
      // console.log(decodedToken, "decodedToken");

      if (decodedToken.exp * 1000 < new Date().getTime()) dispatch(logout());
    }
  }, [dispatch, location]);

  return (
    <div className='flex text-white'>
      <div className='flex gap-2 justify-start items-center  text-lg basis-4/5 '>
        <Sidebar />
        <Link to={"/"} className='cursor-pointer'>
          <img alt='Logo' src={logo} />
        </Link>
      </div>
      <div className='flex gap-4 justify-start  items-center basis-1/5'>
        <Link to={"/search"}>
          <button className='transition-transform duration-300 transform hover:scale-110 bg-drySeedlings  text-black text-lg font-medium px-2 rounded'>
            Filter
          </button>
        </Link>
        {/* <Link>
          <IoIosNotificationsOutline
            className='cursor-pointer transition-transform duration-300 transform hover:scale-110 text-drySeedlings'
            size={32}
          />
        </Link> */}
        {value === null ? (
          <Link to={`/log`}>
            <button className='transition-transform duration-300 transform hover:scale-110 bg-drySeedlings  text-black text-lg font-medium px-2 rounded'>
              Login
            </button>
          </Link>
        ) : (
          <div className='relative inline-block '>
            <div className=' text-white py-2 px-5 ' onClick={handleButtonClick}>
              <HiOutlineUserCircle className='  cursor-pointer ' size={32} />
            </div>
            {isEditing && (
              <div
                ref={dropdownRef}
                style={{ zIndex: 999 }}
                className='origin-top-right  absolute right-0  w-fit h-auto rounded-lg shadow-xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'
              >
                <div
                  className='py-1 text-black'
                  role='menu'
                  aria-orientation='vertical'
                >
                  <p>{value?.name}</p>
                  <p>{value?.email}</p>
                  <Link
                    className={`  block px-4 py-2 text-sm  text-gray-700 w-full text-left hover:bg-gray-200`}
                    role='menuitem'
                  >
                    Watch List
                  </Link>
                  <button
                    className={` block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-200`}
                    role='menuitem'
                    onClick={() => dispatch(logout())}
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
