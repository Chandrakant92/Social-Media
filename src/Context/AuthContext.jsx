/* eslint-disable react/prop-types */import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loginStatus = localStorage.getItem('loginStatus');
    const storedUserId = localStorage.getItem('userId');
    const storedAccessToken = localStorage.getItem('accessToken');
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (loginStatus === 'loggedIn' && storedAccessToken) {
      setIsLoggedIn(true);
      setUserId(storedUserId);
      setAccessToken(storedAccessToken);
      setUser(storedUser);
      console.log('User initialized from localStorage:', storedUser);
    }
  }, []);

  const updateUser = (userData) => {
    setUser(userData);
  };

  const login = (userId, token, user) => {
    localStorage.setItem('loginStatus', 'loggedIn');
    localStorage.setItem('userId', userId);
    localStorage.setItem('accessToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    setIsLoggedIn(true);
    setUserId(userId);
    setAccessToken(token);
    setUser(user);
    console.log('User logged in:', user);
  };

  const logout = () => {
    localStorage.removeItem('loginStatus');
    localStorage.removeItem('userId');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserId(null);
    setAccessToken(null);
    setUser(null);
    console.log('User logged out');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, accessToken, login, logout, user, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};




// const refreshToken = async () => {
//   try {
//     const response = await fetch('/api/auth/refresh-token', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ refreshToken: localStorage.getItem('refreshToken') })
//     });
//     const data = await response.json();
//     if (response.ok) {
//       const newToken = data.accessToken;
//       localStorage.setItem('accessToken', newToken);
//       setAccessToken(newToken);
//     } else {
//       // Handle refresh token error (e.g., redirect to login)
//       logout();
//     }
//   } catch (error) {
//     console.error('Error refreshing token:', error);
//     logout();
//   }
// };
