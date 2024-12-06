// import React from 'react'F

import { useContext, useState, useEffect} from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from 'react-router-dom';
import {  toast } from "react-toastify";
import axios from 'axios';


function Registartion() {
  
  const navigate = useNavigate();
  const { login, isLoggedIn } = useContext(AuthContext);
    const [signUp, setSignUp] = useState(false);

    useEffect(() => {
      if (isLoggedIn) {
        navigate('/');
      }
    }, [isLoggedIn, navigate]);

  const initialLoginState = {
    email: "",
    password: "",
    rememberMe: false,
  };

  const initialSignUpState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    retypePassword: "",
    address: "",
  };

  const [loginData, setLoginData] = useState(initialLoginState);
  const [signUpData, setSignUpData] = useState(initialSignUpState);

  // Update login data on input change
  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData({
      ...loginData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Update sign-up data on input change
  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpData({
      ...signUpData,
      [name]: value,
    });
  };

  // Handle login form submission
  const handleLoginSubmit = async (e)  => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', loginData); // Replace with your actual backend URL
      const { token, user } = response.data;
  
      // Store the token in localStorage or context
    
      // console.log(user);
      
      // Call your login function with the user ID
      login(user.id, token, user);
  
      // Clear the form data
      setLoginData(initialLoginState);
      
      // Display success message and navigate to home page
      toast.success("Logged in successfully!");
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data.msg : error.message);
      toast.error('Login failed. Please check your credentials.');
    }
    
  };

  // Handle sign-up form submission
  const handleSignUpSubmit  = async (e) => {
    e.preventDefault();
    if (signUpData.password !== signUpData.retypePassword) {
      alert('Passwords do not match');
      return;
  }

  try {
      // Combine first and last names into a single name field
      const name = `${signUpData.firstName} ${signUpData.lastName}`;

      const response = await axios.post('http://localhost:5000/api/users/register', {
          name, 
          email: signUpData.email,
          password: signUpData.password,
          address: signUpData.address
      });

      const { token, user } = response.data;

      login(user.id, token);

      // Redirect or update UI as needed
      console.log('User signed up successfully:', user, token);
  } catch (error) {
      console.error('Signup error:', error.response?.data || error.message);
  }
    console.log("Sign-Up Data:", signUpData);
    setSignUpData(initialSignUpState);
  };

  

  return (
    <>
      <div className="flex items-center justify-center mt-10">
        {!signUp ? (
          <div className="w-72 md:w-full  max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
            <form className="space-y-6" onSubmit={handleLoginSubmit}>
              <h5 className="text-lg font-medium text-gray-900">
                Sign in to our platform
              </h5>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-xs font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
                  placeholder="name@company.com"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-xs font-medium text-gray-900"
                >
                  Your password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      type="checkbox"
                      name="rememberMe"
                      value={loginData.rememberMe}
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 outline-none"
                      checked={loginData.rememberMe}
                      onChange={handleLoginChange}
                    />
                  </div>
                  <label
                    htmlFor="remember"
                    className="ms-2 text-xs font-medium text-gray-900"
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href="#"
                  className="ms-auto text-xs text-blue-700 hover:underline dark:text-blue-500"
                >
                  Lost Password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center"
              >
                Login to your account
              </button>
              <div className="text-xs font-medium text-gray-500">
                Not registered?{" "}
                <span
                  className="text-blue-700 hover:underline cursor-pointer"
                  onClick={() => setSignUp(true)}
                >
                  Create account
                </span>
              </div>
            </form>
          </div>
        ) : (
          <div className="w-72 md:w-full max-w-sm sm:max-w-xl  p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 m-1">
            <form className="space-y-2" onSubmit={handleSignUpSubmit}>
              <h5 className="text-lg font-medium text-gray-900">
                Sign up to our platform
              </h5>
              <div className="flex justify-between">
                <div className="p-1 w-1/2">
                  <label
                    htmlFor="firstName"
                    className="block mb-2 text-xs font-medium text-gray-900"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
                    placeholder="First Name"
                    value={signUpData.firstName}
                    onChange={handleSignUpChange}
                    required
                  />
                </div>
                <div className="w-1/2 p-1">
                  <label
                    htmlFor="lastName"
                    className="block mb-2 text-xs font-medium text-gray-900"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
                    placeholder="Last Name"
                    value={signUpData.lastName}
                    onChange={handleSignUpChange}
                    required
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="p-1 w-11/12">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-xs font-medium text-gray-900"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="name@gmail.com"
                    value={signUpData.email}
                    onChange={handleSignUpChange}
                    required
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="p-1 w-1/2">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-xs font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Password"
                    value={signUpData.password}
                    onChange={handleSignUpChange}
                    required
                  />
                </div>
                <div className="w-1/2 p-1">
                  <label
                    htmlFor="retypePassword"
                    className="block mb-2 text-xs font-medium text-gray-900"
                  >
                    Retype Password
                  </label>
                  <input
                    type="password"
                    name="retypePassword"
                    id="retypePassword"
                    className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Retype Password"
                    value={signUpData.retypePassword}
                    onChange={handleSignUpChange}
                    required
                  />
                </div>
              </div>
              <div className="flex justify-between ">
                <div className=" p-1 w-full">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-xs font-medium text-gray-900 "
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Eneter your address details"
                    value={signUpData.address}
                    onChange={handleSignUpChange}
                    required
                  />
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      type="checkbox"
                      value=""
                      className="w-3 h-3 border outline-none border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300  "
                      required
                    />
                  </div>
                  <label
                    htmlFor="remember"
                    className="ms-2 text-xs  text-gray-900 "
                  >
                    Remember me
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center "
              >
                Register your account
              </button>
              <div className="text-xs font-medium text-gray-500 ">
                Already have account?{" "}
                <span
                  className="text-blue-700 hover:underline cursor-pointer"
                  onClick={() => setSignUp(false)}
                >
                  Login here
                </span>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default Registartion;
