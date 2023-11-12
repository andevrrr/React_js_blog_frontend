import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { MenuContext } from '../MenuContext';

function Header({ path, isAuth, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showHeader, setShowHeader] = useState(false);
  const [scrollDown, setScrollDown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toggleMenuClicked } = useContext(MenuContext);

  const toggleMobileMenu = () => {
    toggleMenuClicked();
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleScroll = () => {
    if (window.scrollY > 1) {
      setScrollDown(true);
    } else {
      setScrollDown(false);
    }
  };

  useEffect(() => {
    if (location.pathname === "/") {
      setShowHeader(true);
      window.addEventListener('scroll', handleScroll);
    } else {
      setShowHeader(false);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  const handleLogout = (event) => {
    event.preventDefault();
    onLogout()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  return (
    <header className={`${(location.pathname === "/") ? "mainpage" : "normal"} ${showHeader ? "visible" : ""} ${scrollDown ? "colorOnScroll" : ""}`}>
      <div className="menu-icon" onClick={toggleMobileMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={`nav ${mobileMenuOpen ? "open" : ""}`}>
        <ul className="nav-list">
          <li>
            <Link
              className={path === "/" ? "active" : ""}
              to={isAuth ? "/admin" : "/"}
            >
              Main
            </Link>
          </li>
          <li>
            <Link
              className={path === "/services" ? "active" : ""}
              to={isAuth ? "/admin/services" : "/services"}
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              className={path === "/products" ? "active" : ""}
              to={isAuth ? "/admin/products" : "/products"}
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              className={path === "/posts" ? "active" : ""}
              to={isAuth ? "/admin/posts" : "/posts"}
            >
              Posts
            </Link>
          </li>
          {!isAuth ? (
            <>
              <li>
                <Link className={path === "/login" ? "active" : ""} to="/login">
                  Login
                </Link>
              </li>
              {/* <li>
                <Link
                  className={path === "/signup" ? "active" : ""}
                  to="/signup"
                >
                  SignUp
                </Link>
              </li> */}
            </>
          ) : (
            <li className="main-header__item">
              <NavLink to="/" onClick={handleLogout}>
                Logout
              </NavLink>
            </li>
          )}
        </ul>
        {/* <ul className="nav-list">

        </ul> */}
      </div>
    </header>
  );
}

export default Header;
