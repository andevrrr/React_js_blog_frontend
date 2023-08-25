import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation
import "./Header.css";
import { NavLink, useNavigate } from "react-router-dom";

function Header({ path, isAuth, onLogout }) {

  const navigate = useNavigate();
  const handleLogout = (event) => {
    event.preventDefault();
    onLogout(); 
    navigate("/");
  };

  return (
    <header>
      <div className="nav">
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
        </ul>
        <ul className="nav-list">
          {!isAuth ? (
            <>
              <li>
                <Link className={path === "/login" ? "active" : ""} to="/login">
                  Login
                </Link>
              </li>
              <li>
                <Link
                  className={path === "/signup" ? "active" : ""}
                  to="/signup"
                >
                  SignUp
                </Link>
              </li>
            </>
          ) : (
            <li className="main-header__item">
            <NavLink to="/"  onClick={handleLogout}>
              Logout
            </NavLink>
          </li>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;
