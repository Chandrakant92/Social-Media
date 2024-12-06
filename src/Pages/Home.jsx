import { useContext, useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../Components/PostCard";
import SideBar from "../Components/SideBar";
import UserCard from "../Components/UserCard";
import Header from "../Components/Header";
import "../Styles/Home.css";
import { AuthContext } from "../Context/AuthContext";
import CreatePost from "../Components/CreatePost";
import { PiArrowCircleUpFill } from "react-icons/pi";
import { Link } from "react-router-dom";
// import {  toast } from "react-toastify";

function Home() {
  const { isLoggedIn, accessToken } = useContext(AuthContext);
  // const { isLoggedIn, userId } = useContext(AuthContext);
  const [isLogin, setLogin] = useState(isLoggedIn);
  const [posts, setPosts] = useState([]);
  // const [userNames, setUserNames] = useState([]);
  const [users, setUsers] = useState([]);

  // console.log(user, "USER");

  useEffect(() => {
    if (isLoggedIn) {
      setLogin(true);
    }
  }, [isLoggedIn]);

  
  

  

  // console.log(users, "Users");
  
  const limitedUsers = users.slice(0, 5);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Retrieve the token from localStorage
  
        const response = await axios.get(
          "http://localhost:5000/api/users/get-all",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, // Add the token to the Authorization header
            },
          }
        );
        setUsers(response.data); // Set the fetched users in the state
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
    
  }, );

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/posts/all-posts"
        ); // Adjust URL to your API endpoint

        // console.log(response.data);    // ************************************************

        setPosts(response.data);
        // Log the extracted usernames
        // const imageUrl = response.data.map(post => post.imageSrc);
        // // setPosts(imageUrl);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    
    fetchPosts();
  }, []);

  // console.log(posts, "Postss"); // *******************************************************************

  const scrollToTop = () => {
    scroll.scrollToTop();
    console.log("Scroll to top triggered");
  };
  // const scrollToTop = () => {
  //   console.log('Scroll to top triggered');
  //   window.scrollTo({
  //     top: 0,
  //     behavior: 'smooth'
  //   });
  // };

  return (
    <>
      <Header />
      <div
        id="top"
        className="HomePage flex h-screen overflow-auto  "
        style={{ scrollbarColor: "white white" }}
      >
        {/* Left Sidebar */}
        <div className="w-1/4">
          <SideBar className="sideBar" />
        </div>

        {/* Main Content */}
        <div className="middleConatiner w-1/2 p-4 flex flex-col items-center">
          <div className="text-start  mb-8 md:mt-11 w-full p-1 ">
            {isLogin && (
              <div className="Post  w-full">
                <CreatePost />
              </div>
            )}
          </div>

          <div className="w-full max-w-2xl ">
            {posts
              .slice()
              .reverse()
              .map((post) => (
                <PostCard key={post._id} postData={post} />
              ))}
            {/* <PostCard  post={post1} />
              <PostCard  post={post1} /> */}
            {/* <PostCard  post={posts} /> */}

            <p className="text-center text-xs">Scroll to get More Posts</p>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="rightConatiner w-1/4  p-4 mt-16 mr-5  ">
          {/* <UserList /> */}
          <p>Some animal lovers are</p>
          <div className="UserList shadow-md p-4  rounded">
            {limitedUsers.map((user) => (
              <div key={user._id} className="mb-2">
                <UserCard user={user} />{" "}
                {/* Pass the user data to the UserCard component */}
              </div>
            ))}

            <div className="justify-center flex">
              <div className="flex -space-x-4 rtl:space-x-reverse mt-8">
                <img
                  className="w-10 h-10 border-2 rounded-full border-blue-700"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgtt3zOq6B9NnqaNv6ApPqWUmxmTf5hxtF_g&s"
                  alt=""
                />
                <img
                  className="w-10 h-10 border-2  rounded-full border-blue-700"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvCvhJhHOUxxRoXZGNwYomsL9ms-atp-p9eA&s"
                  alt=""
                />
                <img
                  className="w-10 h-10 border-2 border-blue-700 rounded-full "
                  src="https://writestylesonline.com/wp-content/uploads/2018/11/Three-Statistics-That-Will-Make-You-Rethink-Your-Professional-Profile-Picture-1024x1024.jpg"
                  alt=""
                />
                <a
                  className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gradient-to-tr from-blue-900 to-blue-600 border-2 border-blue-700 rounded-full hover:bg-gradient-to-tr hover:from-blue-600 hover:to-blue-900 "
                  href="#"
                >
                  +99
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="TopButton z-30 absolute right-8 bottom-10 cursor-pointer">
        <Link to="/">
          <PiArrowCircleUpFill
            className=" absolute right-1 bottom-0 text-3xl text-blue-700 hover:text-blue-800"
            to="top"
            onClick={scrollToTop}
          />
        </Link>
      </div>
    </>
  );
}

export default Home;
