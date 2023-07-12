import { AiOutlineSearch } from "react-icons/ai";
import { IoIosNotificationsOutline } from "react-icons/io";
import { HiOutlineUserCircle } from "react-icons/hi";
import Sidebar from "./Sidebar";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
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
        <Link>
          <IoIosNotificationsOutline
            className='cursor-pointer transition-transform duration-300 transform hover:scale-110 text-drySeedlings'
            size={32}
          />
        </Link>
        {true ? (
          <Link to={`/log`}>
            <button className='transition-transform duration-300 transform hover:scale-110 bg-drySeedlings  text-black text-lg font-medium px-2 rounded'>
              Login
            </button>
          </Link>
        ) : (
          <div>
            <HiOutlineUserCircle className='  cursor-pointer ' size={32} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
