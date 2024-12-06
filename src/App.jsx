// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Regisration from "./Pages/Registartion.jsx";
import Profile from "./Pages/Profile.jsx";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from "./Context/AuthContext.jsx";
import NotFound from "./Pages/NotFound.jsx";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <AuthProvider>
      <ToastContainer />
      <BrowserRouter>
        {/* <Header /> */}
        {/* <SideBar/> */}
        <Routes>
          <Route path="/" extact={true} element={<Home />} />
          <Route path="/login" extact={true} element={<Regisration />} />
          <Route path="/profile" extact={true} element={<Profile />} />
          <Route path="*" extact={true} element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
