// import { Button } from "@mui/material";
// import React from "react";
import { Link } from "react-router-dom";
import { BiSolidHomeHeart } from "react-icons/bi";
import { PiUsersThreeFill } from "react-icons/pi";
import { TbSocial } from "react-icons/tb";
import { FaBuildingNgo } from "react-icons/fa6";
import { PiTrendUpFill } from "react-icons/pi";
import { SiMicrodotblog } from "react-icons/si";
import { IoIosHelpCircle } from "react-icons/io";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { FaBullhorn } from "react-icons/fa";
import "../Styles/Home.css";
import { AuthContext } from "../Context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { ImCross } from "react-icons/im";
// import { FaFacebookMessenger } from "react-icons/fa";

function SideBar() {
  const { isLoggedIn } = useContext(AuthContext);
  const [isLogin, setLogin] = useState(isLoggedIn);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      setLogin(true);
    }
  }, [isLoggedIn]);

  return (
    <>
      {isLogin && (
        <div className="MobileMenuRight flex items-center md:hidden absolute   mt-5">
          <button className="text-gray-800 p-2  absolute z-30 ml-2 mt-2">
            {showMenu ? (
              <ImCross size={12} onClick={() => setShowMenu(!showMenu)} />
            ) : (
              <AiOutlineMenu size={24} onClick={() => setShowMenu(!showMenu)} />
            )}
          </button>
          {showMenu && (
            <>
              <div className="toggleMenu bg-white w-40 right-0 p-1 shadow h-screen z-30  mt-7 absolute left-0 top-0 ">
                <div>
                  <ul>
                    <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">
                      <div className="flex items-center justify-start  text-sm ">
                        <BiSolidHomeHeart className="m-1" />
                        <button>
                          <Link to="/">Home </Link>
                        </button>
                      </div>
                    </li>

                    <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">
                      <div className="flex items-center justify-start  text-sm ">
                        <PiTrendUpFill className="m-1" />
                        <button>
                          <Link to="/">Populer</Link>
                        </button>
                      </div>
                    </li>
                    <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">
                      <div className="flex items-center justify-start  text-sm ">
                        <PiUsersThreeFill className="m-1" />
                        <button>
                          <Link to="/">User</Link>
                        </button>
                      </div>
                    </li>
                    <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">
                      <div className="flex items-center justify-start  text-sm ">
                        <TbSocial className="m-1" />
                        <button>
                          <Link to="/">Communities</Link>
                        </button>
                      </div>
                    </li>
                    <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">
                      <div className="flex items-center justify-start  text-sm ">
                        <FaBuildingNgo className="m-1" />
                        <button>
                          <Link to="/">Rescue</Link>
                        </button>
                      </div>
                    </li>
                  </ul>
                  <hr className="w-11/12" />
                  <ul className="mt-3">
                    <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">
                      <div className="flex items-center justify-start  text-sm ">
                        <SiMicrodotblog className="m-1" />
                        <button>
                          <Link to="/">Blogs</Link>
                        </button>
                      </div>
                    </li>
                    <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">
                      <div className="flex items-center justify-start  text-sm ">
                        <FaBullhorn className="m-1" />
                        <button>
                          <Link to="/">Advertise</Link>
                        </button>
                      </div>
                    </li>
                    <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">
                      <div className="flex items-center justify-start  text-sm ">
                        <IoIosHelpCircle className="m-1" />
                        <button>
                          <Link to="/">Help</Link>
                        </button>
                      </div>
                    </li>

                    <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">
                      <div className="flex items-center justify-start  text-sm ">
                        <MdOutlineQuestionAnswer className="m-1" />
                        <button>
                          <Link to="/">Q&A</Link>
                        </button>
                      </div>
                    </li>
                  </ul>
                  <hr className="w-11/12" />
                  <div>
                    <p
                      className="text-center text-xs mr-4 mt-5 "
                      style={{ fontSize: "9px" }}
                    >
                      FOA, Inc. © 2024. All rights reserved.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      <div className="SideBar h-screen text-black fixed border-r shadow w-1/6">
        <nav className="mt-20">
          <ul>
            <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">
              <div className="flex items-center justify-start  text-sm ">
                <BiSolidHomeHeart className="m-1" />
                <button>
                  <Link to="/">Home </Link>
                </button>
              </div>
            </li>

            <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">
              <div className="flex items-center justify-start  text-sm ">
                <PiTrendUpFill className="m-1" />
                <button>
                  <Link to="/">Populer</Link>
                </button>
              </div>
            </li>
            <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">
              <div className="flex items-center justify-start  text-sm ">
                <PiUsersThreeFill className="m-1" />
                <button>
                  <Link to="/">User</Link>
                </button>
              </div>
            </li>
            <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">
              <div className="flex items-center justify-start  text-sm ">
                <TbSocial className="m-1" />
                <button>
                  <Link to="/">Communities</Link>
                </button>
              </div>
            </li>
            <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">
              <div className="flex items-center justify-start  text-sm ">
                <FaBuildingNgo className="m-1" />
                <button>
                  <Link to="/">Rescue</Link>
                </button>
              </div>
            </li>
          </ul>
          <hr className="w-11/12" />
          <ul className="mt-3">
            <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">
              <div className="flex items-center justify-start  text-sm ">
                <SiMicrodotblog className="m-1" />
                <button>
                  <Link to="/">Blogs</Link>
                </button>
              </div>
            </li>
            <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">
              <div className="flex items-center justify-start  text-sm ">
                <FaBullhorn className="m-1" />
                <button>
                  <Link to="/">Advertise</Link>
                </button>
              </div>
            </li>
            <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">
              <div className="flex items-center justify-start  text-sm ">
                <IoIosHelpCircle className="m-1" />
                <button>
                  <Link to="/">Help</Link>
                </button>
              </div>
            </li>

            <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">
              <div className="flex items-center justify-start  text-sm ">
                <MdOutlineQuestionAnswer className="m-1" />
                <button>
                  <Link to="/">Q&A</Link>
                </button>
              </div>
            </li>
          </ul>
          <hr className="w-11/12" />
        </nav>

        <p
          className="text-center text-xs mr-4 mt-5 "
          style={{ fontSize: "9px" }}
        >
          FOA, Inc. © 2024. All rights reserved.
        </p>
      </div>
    </>
  );
}

export default SideBar;
