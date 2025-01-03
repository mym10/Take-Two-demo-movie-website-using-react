import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import LoginCard from "./LoginSignupCard";
import Home from "./Home";
import Contact from "./Contact";
import About from "./About";
import { Link } from 'react-router-dom';
import { IoFilm } from "react-icons/io5";
import popbg from '../assets/popbg.jpg';
import popbgFlipped from '../assets/popbgFlipped.jpg'
import NavBar from '../components2/NavBar';
import SearchResults from "./searchResults";

const App = () => {
  //login/signup
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuthPage = () => {
    setIsLogin(!isLogin);
  };

  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
      setIsLogin(false); 
    } else {
      setIsLogin(true); 
    }
  }, [location.pathname]); 

  const showNavbar = location.pathname !== '/'; 

  //theme setting
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const themeStyles = {
    light: {
      background: '#DDE9F3',
      color: '#000',
      translucent: 'rgba(255, 255, 255, 0.61)',
    },
    dark: {
      background: '#141924',
      color: '#fff',
      translucent: 'rgba(0, 0, 0, 0.5)',
    },
  };

  const currentTheme = themeStyles[theme];

  useEffect(() => {
    document.body.style.backgroundColor = currentTheme.background;
    document.body.style.color = currentTheme.color;
  }, [currentTheme]);

  return (
      <div key={isLogin ? 'login' : 'signup'} 
      className={`${location.pathname === '/' ? 'app-container-login' : 'app-container-home'}`}
      style={{ background: location.pathname === '/'  ? isLogin
            ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${popbg})`
            : `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${popbgFlipped})`
          : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        {showNavbar && <NavBar theme={theme} toggleTheme={toggleTheme} themeStyles={themeStyles}/>} 
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Link to="/" className="text-5xl font-bold text-white flex items-center" style={{ gap: '10px', position: 'absolute', top: '7rem', left: '50%', transform: 'translateX(-50%)' }}>
                  <IoFilm size={50} style={{ color: 'white' }} />
                  TAKE-TWO
                </Link>
                <LoginCard isLogin={isLogin} toggleAuthPage={toggleAuthPage} />
              </>
            }
          />
          <Route path="/home" element={<Home theme={theme} currentTheme={currentTheme}/>} />
          <Route path="/contact" element={<Contact theme={theme} currentTheme={currentTheme}/>} />
          <Route path="/about" element={<About currentTheme={currentTheme}/>} />
          <Route path="/search" element={<SearchResults currentTheme={currentTheme}/>} />
        </Routes>
      </div>
  );
};

export default () => (
  <Router>
    <App />
  </Router>
);