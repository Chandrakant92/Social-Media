import { useState, useContext, useEffect } from "react";
import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaFacebookMessenger } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { BiSolidHomeHeart } from "react-icons/bi";
import { PiUsersThreeFill } from "react-icons/pi";
import { TbSocial } from "react-icons/tb";
import { FaBuildingNgo } from "react-icons/fa6";
import { PiTrendUpFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { LuLogIn } from "react-icons/lu";
import { AiOutlineMenu } from "react-icons/ai";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/Home.css";


function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [isLogin, setLogin] = useState(isLoggedIn);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      setLogin(true);
    }
    console.log(isLoggedIn);
    
  }, [isLoggedIn]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    // setIsLogin(true)
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleProfile = () => {
    navigate("/profile");
    
  };

  const handleLogout = () => {
    navigate("/login"); 
    toast.success("Logged out successfully!");
    logout();
  };

  return (
    <>
      <div className="Header border-b-2 shadow-sm fixed  z-10   w-full bg-white ">
        <div className="container flex items-center justify-between   px-4  w-full  id='top">
          <div className="Logo ml-6 md:ml-1">
            <Link to="/">
              <img src={Logo} width={150} alt="Logo" />
            </Link>
          </div>
          <div className="Search mx-10 md:mx-1 rounded-full bg-gray-200 w-11/12 md:w-1/3">
            <div className="flex items-center py-1 px-2 md:py-2">
              <input
                className="bg-transparent outline-none border-none w-full pr-2 text-gray-800 pl-2"
                type="text"
                placeholder="Search something here..."
              />
              <div className="cursor-pointer mr-2 textb">
                <IoSearch />
              </div>
            </div>
          </div>
          {!isLogin ? (
            <>
              <div className="Login m-2 mr-5">
                <div className="items-center">
                  {/* <Button className="textb ">Login</Button> */}
                  <button className="bg-white mt- hover:bg-gray-100 text-gray-800 font-semibold py-2 px-5 border-blue-800 border rounded-full shadow mr-3">
                    <div className="flex">
                      {/* <div className="mr-2 mt-1"><BiQrScan /></div> */}
                      <p className="text-xs">Get App</p>
                    </div>
                  </button>
                  <button
                    className="align-middle select-none font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none py-2 px-5 bg-gradient-to-tr from-blue-900 to-blue-600 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] rounded-full"
                    type="button"
                    onClick={() => navigate("/login")}
                  >
                    <p className="text-xs">Log In</p>
                  </button>
                  <button
                    className="align-middle select-none font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none py-2 px-2 text-black ml-2 rounded-full hover:bg-gray-100"
                    type="button"
                  >
                    <BsThreeDotsVertical />
                  </button>
                </div>
              </div>

              <div className="Menu">
                <div className="flex items-center md:hidden">
                  <button className="text-gray-800 p-2">
                    <AiOutlineMenu
                      size={24}
                      onClick={() => setShowMenu(!showMenu)}
                    />
                  </button>
                  {showMenu && (
                    <>
                      <div className="toggleMenu bg-white w-40 right-0 p-1 shadow h-screen z-30">
                        <div>
                          <ul>
                            <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">
                              <div className="flex items-center justify-start  text-sm ">
                                <BiSolidHomeHeart className="mr-3" />
                                <button>
                                  <Link to="/">Home </Link>
                                </button>
                              </div>
                            </li>
                            <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">
                              <div className="flex items-center justify-start  text-sm  ">
                                <PiTrendUpFill className="mr-3" />
                                <button>
                                  <Link to="/">Populer </Link>
                                </button>
                              </div>
                            </li>
                            <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">
                              <div className="flex items-center justify-start  text-sm  ">
                                <PiUsersThreeFill className="mr-3" />
                                <button>
                                  <Link to="/">User </Link>
                                </button>
                              </div>
                            </li>
                            <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">
                              <div className="flex items-center justify-start  text-sm  ">
                                <TbSocial className="mr-3" />
                                <button>
                                  <Link to="/">Communities </Link>
                                </button>
                              </div>
                            </li>
                            <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">
                              <div className="flex items-center justify-start  text-sm  ">
                                <FaBuildingNgo className="mr-3" />
                                <button>
                                  <Link to="/">Rescue </Link>
                                </button>
                              </div>
                            </li>
                            <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">
                              <div className="flex items-center justify-start  text-sm  ">
                                <LuLogIn className="mr-3" />
                                <button>
                                  <Link to="/login">Log In </Link>
                                </button>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="MobileMenuLog flex items-center   justify-around">
              <div className="Searchbar items-center cursor-pointer flex mr-5  p-1 rounded-full">
                <IoSearch className="text-sm md:text-lg md:hidden block hover:text-slate-700" />
              </div>
              <div className="Messenger items-center cursor-pointer flex mr-5  p-1 rounded-full">
                <FaFacebookMessenger className=" text-sm md:text-lg hover:text-slate-700" />
              </div>
              <div className="Messenger items-center cursor-pointer mr-5">
                <IoMdNotifications className="text-lg md:text-xl  hover:text-slate-700" />
              </div>
              <div
                className="flex items-center m-2 sm:mr-5 mr-1 cursor-pointer"
                onClick={toggleDropdown}
              >
                <img
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full border "
                  src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1723483859~exp=1723487459~hmac=4d7d4b903e5cf4de722583d285d897c2d994fbaf44632ff06c5aa5b348414e24&w=740"
                  alt=""
                />
                {isDropdownOpen && (
                  <div className="absolute mt-1  md:mt-2 w-32 md:w-44 bg-white border rounded shadow-lg z-20 top-11 right-0">
                    <ul>
                      <li
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={handleProfile}
                      >
                        Profile
                      </li>
                      <li
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={closeDropdown}
                      >
                        Settings
                      </li>
                      <li
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={handleLogout}
                      >
                        Logout
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
