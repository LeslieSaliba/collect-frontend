import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/navbar.css";

function NavBar() {
  const location = useLocation();

  const isCurrentPage = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="App">
      <nav className="bg-white border-gray-200 white:bg-gray-900 navbar-container">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="../Images/logo.png" className="h-7 navbar-logo-image" alt="Flowbite Logo" />
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <div className="flex items-center navbar-cart-heart-cont">
            
              <Link to="/Wishlist">
                <img src="../Images/heart 1.png" className="h-7" alt="Flowbite Logo" />
              </Link>
              <Link to="/Cart" className="mr-4">
                <img src="../Images/cart 1.png" className="h-7" alt="Flowbite Logo" />
              </Link>
            </div>
            <button
              data-collapse-toggle="navbar-cta"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 white:text-gray-400 white:hover:bg-gray-700 white:focus:ring-gray-600 "
              aria-controls="navbar-cta"
              // aria-expanded={isMenuOpen}
              // onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-cta"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white white:bg-gray-800 md:white:bg-gray-900 white:border-gray-700 navbar-list">
              <li>
                <Link
                  to="/"
                  className={`block py-2 px-3 md:p-0 rounded ${
                    isCurrentPage("/") ? "text-red-700" : "hover:text-red-700"
                  } md:hover:bg-transparent md:hover:text-red-700 md:white:hover:text-blue-500 white:text-white white:hover:bg-gray-700 white:hover:text-white md:white:hover:bg-transparent white:border-gray-700 navbar-title`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/Shop"
                  className={`block py-2 px-3 md:p-0 rounded ${
                    isCurrentPage("/Shop") ? "text-red-700" : "hover:text-red-700"
                  } md:hover:bg-transparent md:hover:text-red-700 md:white:hover:text-blue-500 white:text-white white:hover:bg-gray-700 white:hover:text-white md:white:hover:bg-transparent white:border-gray-700 navbar-title`}
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  to="/AboutUs"
                  className={`block py-2 px-3 md:p-0 rounded ${
                    isCurrentPage("/AboutUs") ? "text-red-700" : "hover:text-red-700"
                  } md:hover:bg-transparent md:hover:text-red-700 d:white:hover:text-blue-500 white:text-white white:hover:bg-gray-700 white:hover:text-white md:white:hover:bg-transparent white:border-gray-700 navbar-title`}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/ContactUs"
                  className={`block py-2 px-3 md:p-0 rounded ${
                    isCurrentPage("/ContactUs") ? "text-red-700" : "hover:text-red-700"
                  } md:hover:bg-transparent md:hover:text-red-700 md:white:hover:text-blue-500 white:text-white white:hover:bg-gray-700 white:hover:text-white md:white:hover:bg-transparent white:border-gray-700 navbar-title`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
