/* eslint-disable react/prop-types */
// import React from 'react'
import { Link } from "react-router-dom";
import userImage from "../assets/Userimage.png";
import { HiDotsHorizontal } from "react-icons/hi";
import { useState, useContext} from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import {  toast } from "react-toastify";

function UserCard() {
  const [isOpen, setIsOpen] = useState(false);
  const { accessToken, userId,user } = useContext(AuthContext);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  // console.log(, "USER");
  
const targetUserId=user._id;
  const handleFollow = async()=>{

    const response = await axios.post(
      'http://localhost:5000/api/users/follow', // Replace with your actual endpoint
      { userId, targetUserId },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Add the token to the Authorization header
          'Content-Type': 'application/json',
        },
      }
    );

    console.log(response.data.message);
   if(response.status==200){
    toast.success("Successfully followed the user!")
   }else{
    toast.error("You are already following this user.")
   }
  }
  return (
    <>
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow  ">
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700"
        >
          <li className="py-3  p-2">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="w-10 h-10 rounded-full"
                  src={user.profile?.imageUrl?(user.profile?.imageUrl):(userImage)}
                  alt="user image"
                />
              </div>
              <div className="flex-1 min-w-0 ms-3">
                <div className="items-center">
                  <p className="text-xs font-semibold text-blue-900 truncate cursor-pointer">
                    {user.name?(user.name):"Neil Sims(Name)"}
                  </p>
                  <p
                    className="text-sm text-gray-500 truncate dark:text-gray-400"
                    style={{ fontSize: "12px" }}
                  >
                   {user.bio?(user.bio):("I Love Animal...")}
                  </p>
                </div>
                <div className="flex mt-3 justify-start" onClick={handleFollow}>
                  <Link>
                    <p
                      className="inline-flex items-center px-2 py-1 mr-2 text-xs font-medium text-center text-white bg-gradient-to-tr from-blue-900 to-blue-600 rounded-lg hover:bg-blue-800  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      style={{ fontSize: "10px" }}
                    >
                      Follow
                    </p>
                  </Link>
                  {/* <Link>
                    <a className="inline-flex items-center px-2 py-2 text-xs font-medium text-center text-blue bg-white rounded-lg border border-blue-800 hover:  ">
                      Remove
                    </a>
                  </Link> */}
                </div>
              </div>

              <div className="inline-flex items-center text-base font-semibold text-gray-900">
                <button
                  className="align-middle select-none  font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none py-2 px-2  text-black  rounded-full hover:bg-gray-100"
                  type="button"
                  onClick={toggleDropdown}
                >
                  <HiDotsHorizontal />
                </button>
              </div>
              {/* {isOpen && (
                <div className="absolute right-5 mt-36 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                  <div className="py-1">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Option 1
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Option 2
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Option 3
                    </a>
                  </div>
                </div>
              )} */}
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}

export default UserCard;
