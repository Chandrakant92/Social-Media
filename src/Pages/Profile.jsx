// import React from "react";
import UserCard from "../Components/UserCard";
import { AuthContext } from "../Context/AuthContext";
import Header from "../Components/Header";
import axios from "axios";
import { FaUserEdit } from "react-icons/fa";
import { AiOutlinePicture } from "react-icons/ai";
import "../Styles/Home.css";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaCloudUploadAlt } from "react-icons/fa";
import Dialog from "@mui/material/Dialog";

// import { FaFileImage } from "react-icons/fa";

function Profile() {
  const navigate = useNavigate();
  const { isLoggedIn, accessToken, user, updateUser } = useContext(AuthContext);

  const [imageFile, setImageFile] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
      toast.error("Without login yon can not access it.");
    } else {
      const fetchUserProfile = async () => {
        try {
          const response = await axios.get(
            "http://localhost:5000/api/users/profile",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          // console.log('User Profile Response:', response.data);
          updateUser(response.data); // Update user in context
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
          // navigate('/');
        }
      };
      fetchUserProfile();
    }
  }, [isLoggedIn, accessToken, navigate, updateUser]);

  if (!user) {
    return <div>Loading...</div>; // Display a loading state while the user data is being fetched
  }

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]); // Set the selected image file
  };

  const handleImageUpload = async () => {
    if (!imageFile) return alert("Select File first"); // If no file is selected, do nothing

    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      toast.success("Profile Uploaded successfully!");
      setImageFile(null); // Reset the file input
      updateUser({
        ...user,
        profile: { ...user.profile, imageUrl: response.data.imageUrl },
      }); // Update user with new image
    } catch (error) {
      console.error("Failed to upload image:", error);
      toast.error("Profile image not uploaded!");
    }
  };
  // const handleEdit = () => {
  //   setOpenEdit((prev) => !prev);
  // };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="overflow-hidden">
        <Header />
        <div className="overflow-scroll ">
          <div className="min-h-screen bg-gray-100 md:flex items-top m-2 justify-around mt-9">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12  md:w-full max-w-md  ml-4 mt-16  md:mt-5">
              <div
                className="edit flex  float-end cursor-pointer"
                onClick={handleClickOpen}
              >
                {/* Edit */}
                <div className=" m-1">
                  <FaUserEdit className="text-lg text-blue-700" />
                </div>
              </div>
              <div className="flex items-center space-x-4  ">
                <div className="ProfileImage border-2 border-blue-600 rounded-full bg-blue-900 ">
                  <img
                    className="w-24 h-24 rounded-full object-cover cursor-pointer hover:opacity-60  "
                    src={
                      user.profile?.imageUrl ||
                      `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2xlWvWf1vD-2BBCxvrSzBMzm8cmJtbxek9g&s`
                    }
                    alt={user.name}
                  />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {user.name}
                  </h2>
                  <p className="text-gray-600 font-semibold">
                    [ {user.bio ? user.bio : "I am Animal Lover"} ]
                  </p>
                </div>
              </div>

              <div className="uploadImage  mt-4  w-fit items-center flex ">
                {/* <FaFileImage /> */}
                <label className="flex items-center cursor-pointer">
                  <AiOutlinePicture className="text-blue-600 text-xl" />
                  <p className="text-xs ml-1">Upload Your Profile Pic here..</p>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>

                <button
                  onClick={handleImageUpload}
                  className="mt-1 text-blue-600  py-2 px-4 rounded"
                >
                  <FaCloudUploadAlt />
                </button>
              </div>
              <hr />
              <div className="mt-2 mb-4 ">
                <h3 className="text-base font-medium text-gray-900">
                  Contact Information
                </h3>
                <div className="name mt-2">
                  <p className="text-gray-800">
                    Email :- <span className="text-gray-600 font-semibold">{user.email}</span>
                  </p>
                  <p className="text-gray-800">
                    Phone :-
                    <span className="text-gray-600 text-xs ">
                      {user.phone ? user.phone : "Add Your Mobile No..."}
                    </span>
                  </p>
                  <p className="text-gray-800">
                    DOB :-{" "}
                    <span className="text-gray-600 text-xs">
                      {" "}
                      {user.dob ? user.dob : "Add Your Date of Birth..."}{" "}
                    </span>
                  </p>
                  <p className="text-gray-800">
                    Gender :-{" "}
                    <span className="text-gray-600 text-xs">
                      {" "}
                      {user.gender ? user.gender : "Add Your Gender..."}
                    </span>
                  </p>
                  <p className="text-gray-800">
                    Address :-{" "}
                    <span className="text-gray-600 text-xs">
                      {user.address ? user.address : "Add Your Address..."}
                    </span>
                  </p>
                </div>
              </div>
              <hr />
              {/* <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-900">Bio :-   </h3>
                <p className="text-gray-700">{user.bio}</p>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-900">Address :-   </h3>
                <p className="text-gray-700">{user.bio}</p>
              </div> */}
            </div>
            <div className="mr-1 md:mr-14 mt-4 md:mt-10 bg-white md:bg-transparent p-1">
              <p>Your Friends</p>
              <div
                className=" md:block relative p-4 rounded-lg border border-gray-300 bg-slate-200"
                style={{
                  maxHeight: "430px",
                  overflowY: "scroll",
                  scrollbarColor: "#E2E8F0 #E2E8F0",
                }}
              >
                <div className="scrollbar-hidden">
                  <div className="mb-2">
                    <UserCard />
                  </div>
                  <div className="mb-1">
                    <UserCard />
                  </div>
                  <div className="mb-1">
                    <UserCard />
                  </div>
                  <div className="mb-1">
                    <UserCard />
                  </div>
                  <div className="mb-1">
                    <UserCard />
                  </div>
                  <div className="mb-1">
                    <UserCard />
                  </div>
                  <div className="mb-1">
                    <UserCard />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
              component: "form",
              onSubmit: (event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const formJson = Object.fromEntries(formData.entries());
                const email = formJson.email;
                console.log(email);
                handleClose();
              },
            }}
          >
            <div className="m-1 ">
              <div className="m-4 ">
                <div className="relative z-0 w-full mb-5 mt-5 group ">
                  <input
                    type="email"
                    name="floating_email"
                    id="floating_email"
                    className="block cursor-not-allowed py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    disabled={true}
                    value={user.email}
                  />
                  <label
                    htmlFor="floating_email"
                    className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Email*
                  </label>
                </div>
                <div className="relative z-0 w-full mb-5 group ">
                  <input
                    type="text"
                    name="floating_password"
                    id="floating_password"
                    className="block cursor-not-allowed py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    value={user.name}
                    disabled={true}
                  />
                  <label
                    htmlFor="floating_password"
                    className="peer-focus:font-medium absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Name*
                  </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="repeat_password"
                    id="floating_repeat_password"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="floating_repeat_password"
                    className="peer-focus:font-medium absolute text-xs text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Bio
                  </label>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="tel"
                      name="floating_phone"
                      id="floating_phone"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                    />
                    <label
                      htmlFor="floating_phone"
                      className="peer-focus:font-medium absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Mobile No.
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="date"
                      name="floating_last_name"
                      id="floating_last_name"
                      className="block py-2.5 px-0 w-full cursor-pointer text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                    />
                    <label
                      htmlFor="floating_last_name"
                      className="peer-focus:font-medium absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      DOB
                    </label>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="text"
                      name="floating_gender"
                      id="floating_gender"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2  border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-transparent focus:placeholder-gray-400"
                      placeholder="Type Male or Female"
                    />
                    <label
                      htmlFor="floating_gender"
                      className="peer-focus:font-medium absolute text-xs text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Gender
                    </label>
                  </div>

                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="text"
                      name="floating_company"
                      id="floating_company"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                    />
                    <label
                      htmlFor="floating_company"
                      className="peer-focus:font-medium absolute text-xs text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Address
                    </label>
                  </div>
                </div>

                <button className="text-white bg-gradient-to-tr from-blue-900 to-blue-600 hover:bg-blue-800  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs w-full sm:w-auto px-4 py-2 text-center ">
                  Submit
                </button>
              </div>
            </div>
            {/* <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Subscribe</Button>
            </DialogActions> */}
          </Dialog>
        </div>
      </div>
    </>
  );
}

export default Profile;
