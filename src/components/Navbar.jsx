import { AiOutlineSearch } from "react-icons/ai";
import { IoIosNotificationsOutline } from "react-icons/io";
import { HiOutlineUserCircle } from "react-icons/hi";
import Sidebar from "./Sidebar";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className='flex text-[28px] text-white'>
      <div className='flex gap-4 justify-start items-center  basis-2/3 '>
        <Sidebar />
        <Link to={"/"} className='cursor-pointer'>
          <img alt='Logo' src={logo} />
        </Link>
      </div>
      <div className='flex gap-4 justify-end  items-center basis-1/3'>
        <Link to={"/search"}>
          <AiOutlineSearch className=' cursor-pointer' />
        </Link>
        <IoIosNotificationsOutline className='cursor-pointer' />
        <HiOutlineUserCircle className=' cursor-pointer mr-4' />
      </div>
    </div>
  );
};

export default Navbar;
