import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ isLoggedIn = false }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-[#1a2238] text-white px-6 py-4 flex items-center justify-between fixed top-0 w-full z-10">
      <Link to="/" className="text-xl font-bold flex items-center space-x-2">
        <span>TransferEase</span>
      </Link>

      <div className="flex items-center space-x-6">
        {isLoggedIn ? (
          <>
            <Link
              to="/dashboard"
              className={`text-sm transition-colors ${
                isActive("/dashboard")
                  ? "text-orange-500"
                  : "hover:text-orange-500"
              }`}>
              Dashboard
            </Link>
            <Link
              to="/transfer"
              className={`text-sm transition-colors ${
                isActive("/transfer")
                  ? "text-orange-500"
                  : "hover:text-orange-500"
              }`}>
              Transfer Vehicle
            </Link>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 hover:bg-gray-700 rounded-full">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="absolute top-0 right-0 bg-orange-500 text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  2
                </span>
              </button>
              <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center cursor-pointer">
                <span className="text-sm font-medium">NK</span>
              </div>
            </div>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className={`text-sm transition-colors ${
                isActive("/login") ? "text-orange-500" : "hover:text-orange-500"
              }`}>
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors text-sm">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
