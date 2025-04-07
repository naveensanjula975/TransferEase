import React, { useState } from "react";
import { Link } from "react-router-dom";
import DefaultAvatar from "../assets/default-avatar.png";
import MiniCooper from "../assets/mini-cooper.png";
import Navbar from "./shared/Navbar";

const Dashboard = () => {
  const [transferRequests] = useState([
    {
      id: 1,
      vehicleNumber: "CAX-5603",
      type: "Vehicle Transfer",
      date: "april 14",
      status: "pending",
    },
    {
      id: 2,
      vehicleNumber: "ABC-8912",
      type: "Vehicle Transfer",
      date: "april 14",
      status: "pending",
    },
    {
      id: 3,
      vehicleNumber: "JT-4826",
      type: "Vehicle Transfer",
      date: "april 14",
      status: "pending",
    },
  ]);

  const [vehicles] = useState([
    {
      id: 1,
      model: "Mini Cooper",
      type: "Hatchback",
      owner: "1User",
      image: MiniCooper,
    },
    {
      id: 2,
      model: "Mini Cooper",
      type: "Hatchback",
      owner: "1User",
      image: MiniCooper,
    },
    {
      id: 3,
      model: "Mini Cooper",
      type: "Hatchback",
      owner: "1User",
      image: MiniCooper,
    },
    {
      id: 4,
      model: "Mini Cooper",
      type: "Hatchback",
      owner: "1User",
      image: MiniCooper,
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isLoggedIn={true} />

      <div className="flex pt-16 sm:pt-20">
        {/* Sidebar */}
        <div className="hidden md:block w-64 lg:w-80 bg-white min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)] p-6 sm:p-8 flex flex-col border-r border-gray-200 sticky top-16 sm:top-20 h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="mb-10 text-center">
            <div className="relative inline-block">
              <img
                src={DefaultAvatar}
                alt="Profile"
                className="w-32 h-32 mx-auto mb-4 rounded-full ring-4 ring-gray-100"
              />
              <span className="absolute right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full bottom-4"></span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Kumara Sangakkara
            </h2>
            <p className="mt-1 text-sm text-gray-600">952378652v</p>
          </div>

          <nav className="flex-1 space-y-1">
            <Link
              to="/dashboard"
              className="flex items-center px-4 py-3 font-medium text-gray-700 bg-gray-100 rounded-xl">
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
              Dashboard
            </Link>
            <Link
              to="/notifications"
              className="flex items-center px-4 py-3 text-gray-600 transition-colors rounded-lg hover:bg-gray-100">
              <svg
                className="w-5 h-5 mr-3"
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
              Notification
            </Link>
            <Link
              to="/security"
              className="flex items-center px-4 py-3 text-gray-600 transition-colors rounded-lg hover:bg-gray-100">
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Security
            </Link>
            <Link
              to="/settings"
              className="flex items-center px-4 py-3 text-gray-600 transition-colors rounded-lg hover:bg-gray-100">
              <svg
                className="w-5 h-5 mr-3"
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
              Settings
            </Link>
            <Link
              to="/help"
              className="flex items-center px-4 py-3 text-gray-600 transition-colors rounded-lg hover:bg-gray-100">
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Help
            </Link>
          </nav>

          <button className="flex items-center px-4 py-3 mt-8 text-red-600 transition-colors hover:bg-red-50 rounded-xl">
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Log out
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[2000px] mx-auto">
          {/* Page Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Dashboard Overview
            </h1>
            <p className="mt-2 text-sm text-gray-600 sm:text-base">
              Welcome back, here's what's happening with your vehicles today.
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 sm:mb-8">
            <div className="p-6 transition-all duration-300 bg-white shadow-sm rounded-2xl hover:shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">
                  Total Vehicles
                </h3>
                <div className="p-2 bg-blue-100 rounded-xl">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="mt-1 text-sm text-green-600">+2 from last month</p>
            </div>
            <div className="p-6 transition-all duration-300 bg-white shadow-sm rounded-2xl hover:shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">
                  Pending Transfers
                </h3>
                <div className="p-2 bg-yellow-100 rounded-xl">
                  <svg
                    className="w-6 h-6 text-yellow-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">3</p>
              <p className="mt-1 text-sm text-yellow-600">Awaiting approval</p>
            </div>
            <div className="p-6 transition-all duration-300 bg-white shadow-sm rounded-2xl hover:shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">
                  Completed Transfers
                </h3>
                <div className="p-2 bg-green-100 rounded-xl">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">28</p>
              <p className="mt-1 text-sm text-green-600">+5 this month</p>
            </div>
            <div className="p-6 transition-all duration-300 bg-white shadow-sm rounded-2xl hover:shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">
                  Total Revenue
                </h3>
                <div className="p-2 bg-purple-100 rounded-xl">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">$2,450</p>
              <p className="mt-1 text-sm text-green-600">
                +12% from last month
              </p>
            </div>
          </div>

          {/* Transfer Requests */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
                Transfer Requests
              </h2>
              <button className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm font-medium text-white bg-orange-500 rounded-xl hover:bg-orange-600 transition-colors">
                View All
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
              {transferRequests.map((request) => (
                <div
                  key={request.id}
                  className="p-6 transition-all duration-300 bg-white shadow-sm rounded-2xl hover:shadow-md">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-gray-100/80 rounded-xl">
                      <svg
                        className="w-6 h-6 text-gray-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <button className="p-2 text-gray-400 transition-colors rounded-full hover:text-gray-600 hover:bg-gray-100">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                        />
                      </svg>
                    </button>
                  </div>
                  <p className="mb-2 text-sm text-gray-600">{request.type}</p>
                  <h3 className="mb-4 text-2xl font-bold text-gray-900">
                    {request.vehicleNumber}
                  </h3>
                  <div className="flex gap-2 mb-4">
                    <button className="px-4 py-1.5 text-sm font-medium text-green-600 bg-green-100 rounded-full hover:bg-green-200 transition-colors">
                      Accept
                    </button>
                    <button className="px-4 py-1.5 text-sm font-medium text-red-600 bg-red-100 rounded-full hover:bg-red-200 transition-colors">
                      Reject
                    </button>
                    <span className="ml-auto text-sm text-gray-500">
                      activity from {request.date}
                    </span>
                  </div>
                  <button className="flex items-center text-gray-700 transition-colors hover:text-gray-900 group">
                    <span>View Details</span>
                    <svg
                      className="w-4 h-4 ml-2 transition-transform transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Vehicle Registration Form */}
          <div className="mb-6 sm:mb-8">
            <div className="p-6 bg-white shadow-sm sm:p-8 rounded-2xl">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                Request Vehicle Transfer
              </h2>
              <p className="max-w-3xl mb-6 leading-relaxed text-gray-600">
                Welcome to our vehicle transfer request service! Please insert
                the registration number of your requesting vehicle here to start
                the smooth transition of your vehicle's ownership. Afterward,
                the owner of the vehicle will concern on your request.
              </p>
              <div className="flex flex-col gap-4 md:flex-row md:items-end">
                <div className="flex-1 max-w-xl">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Vehicle Registration Number
                  </label>
                  <input
                    type="text"
                    placeholder="CAX-5678"
                    className="w-full px-4 py-3 transition-all border border-gray-300 outline-none rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <button className="w-full px-8 py-3 font-medium text-white transition-colors bg-orange-500 shadow-sm md:w-auto rounded-xl hover:bg-orange-600 hover:shadow-md">
                  Request Transfer
                </button>
              </div>
            </div>
          </div>

          {/* My Vehicles */}
          <div>
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
                My Vehicles
              </h2>
              <button className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm font-medium text-white bg-orange-500 rounded-xl hover:bg-orange-600 transition-colors">
                Add Vehicle
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6">
              {vehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="p-6 transition-all duration-300 bg-white shadow-sm rounded-2xl hover:shadow-md">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {vehicle.model}
                      </h3>
                      <p className="text-sm text-gray-600">{vehicle.type}</p>
                    </div>
                    <button className="p-2 text-gray-400 transition-colors rounded-full hover:text-red-500 hover:bg-gray-100">
                      <svg
                        className="w-5 h-5"
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
                    </button>
                  </div>
                  <div className="relative mb-4 overflow-hidden rounded-xl group">
                    <img
                      src={vehicle.image}
                      alt={vehicle.model}
                      className="object-cover w-full h-40 transition-transform duration-500 transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 transition-opacity opacity-0 bg-gradient-to-t from-black/20 to-transparent group-hover:opacity-100" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="flex items-center justify-center w-8 h-8 text-sm font-medium text-gray-700 bg-gray-100 rounded-full">
                        {vehicle.owner}
                      </span>
                    </div>
                    <button className="flex items-center px-3 py-1 text-sm text-gray-700 transition-colors rounded-full hover:text-gray-900 group hover:bg-gray-100">
                      Details
                      <svg
                        className="w-4 h-4 ml-1 transition-transform transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
