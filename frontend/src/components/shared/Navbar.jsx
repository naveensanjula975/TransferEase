import React, { useState } from "react";
import { Link } from "react-router-dom";
import DefaultAvatar from "../../assets/default-avatar.png";

const Navbar = ({ isLoggedIn = true }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-[#1a2238] text-white fixed w-full top-0 left-0 right-0 z-50 shadow-lg">
      <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo and Main Navigation */}
          <div className="flex items-center space-x-4 sm:space-x-8">
            <Link to="/" className="text-xl sm:text-2xl font-bold tracking-tight">
              TransferEase
            </Link>
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <Link
                to="/dashboard"
                className="text-sm font-medium transition-colors text-white/90 hover:text-white">
                Dashboard
              </Link>
              <Link
                to="/transfers"
                className="text-sm font-medium transition-colors text-white/90 hover:text-white">
                Transfers
              </Link>
              <Link
                to="/vehicles"
                className="text-sm font-medium transition-colors text-white/90 hover:text-white">
                Vehicles
              </Link>
              <Link
                to="/owners"
                className="text-sm font-medium transition-colors text-white/90 hover:text-white">
                Owners
              </Link>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            {/* Action Buttons */}
            <div className="hidden sm:flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-white/10 transition-colors relative group">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span className="hidden group-hover:block absolute -bottom-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 text-xs rounded-lg whitespace-nowrap">
                  Favorites
                </span>
              </button>
              <button className="p-2 rounded-full hover:bg-white/10 transition-colors relative group">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
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
                <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 text-xs font-medium bg-red-500 rounded-full border-2 border-[#1a2238]">
                  1
                </span>
                <span className="hidden group-hover:block absolute -bottom-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 text-xs rounded-lg whitespace-nowrap">
                  Notifications
                </span>
              </button>
              <button className="p-2 rounded-full hover:bg-white/10 transition-colors relative group">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="hidden group-hover:block absolute -bottom-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 text-xs rounded-lg whitespace-nowrap">
                  Settings
                </span>
              </button>
            </div>

            {/* Profile Section */}
            <div className="flex items-center space-x-3 sm:space-x-4 border-l border-white/10 pl-3 sm:pl-4">
              <Link to="/profile" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                <img
                  src={DefaultAvatar}
                  alt="Profile"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full ring-2 ring-white/20"
                />
                <div className="hidden sm:flex flex-col">
                  <span className="text-sm font-medium">John Doe</span>
                  <span className="text-xs text-gray-400">Administrator</span>
                </div>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-white/10 transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/dashboard"
                className="block px-3 py-2 text-base font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-md">
                Dashboard
              </Link>
              <Link
                to="/profile"
                className="block px-3 py-2 text-base font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-md">
                Profile
              </Link>
              <Link
                to="/transfers"
                className="block px-3 py-2 text-base font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-md">
                Transfers
              </Link>
              <Link
                to="/vehicles"
                className="block px-3 py-2 text-base font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-md">
                Vehicles
              </Link>
              <Link
                to="/owners"
                className="block px-3 py-2 text-base font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-md">
                Owners
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
