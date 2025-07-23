import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo-1 2.png";

const TransfersPage = () => {
  // Sample transfer data
  const transfers = [
    {
      transferId: "00001",
      vehicleNumber: "CAX-4589",
      type: "Car",
      date: "14 Apr 2024",
      status: "To Verify",
      fee: "Rs 800",
    },
    {
      transferId: "00001",
      vehicleNumber: "CAX-4589",
      type: "Car",
      date: "14 Apr 2024",
      status: "To Verify",
      fee: "Rs 800",
    },
    {
      transferId: "00001",
      vehicleNumber: "CAX-4589",
      type: "Car",
      date: "14 Apr 2024",
      status: "Completed",
      fee: "Rs 800",
    },
    {
      transferId: "00001",
      vehicleNumber: "CAX-4589",
      type: "Car",
      date: "14 Apr 2024",
      status: "Completed",
      fee: "Rs 800",
    },
    {
      transferId: "00001",
      vehicleNumber: "CAX-4589",
      type: "Car",
      date: "14 Apr 2024",
      status: "Completed",
      fee: "Rs 800",
    },
    {
      transferId: "00001",
      vehicleNumber: "CAX-4589",
      type: "Car",
      date: "14 Apr 2024",
      status: "Completed",
      fee: "Rs 800",
    },
    {
      transferId: "00001",
      vehicleNumber: "CAX-4589",
      type: "Car",
      date: "14 Apr 2024",
      status: "Completed",
      fee: "Rs 800",
    },
    {
      transferId: "00001",
      vehicleNumber: "CAX-4589",
      type: "Car",
      date: "14 Apr 2024",
      status: "Completed",
      fee: "Rs 800",
    },
    {
      transferId: "00001",
      vehicleNumber: "CAX-4589",
      type: "Car",
      date: "14 Apr 2024",
      status: "Completed",
      fee: "Rs 800",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "To Verify":
        return "bg-purple-100 text-purple-600";
      case "Completed":
        return "bg-emerald-100 text-emerald-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm">
        <div className="p-4">
          <img src={Logo} alt="TransferEase" className="h-8" />
        </div>

        <nav className="mt-8 px-4">
          <Link
            to="/admin/dashboard"
            className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            Dashboard
          </Link>

          <Link
            to="/admin/transfers"
            className="flex items-center px-4 py-3 text-blue-600 bg-blue-50 rounded-lg mt-2">
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
            Transfers
          </Link>

          <Link
            to="/admin/vehicles"
            className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg mt-2">
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Vehicles
          </Link>

          <Link
            to="/admin/owners"
            className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg mt-2">
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            Owners
          </Link>

          <Link
            to="/admin/statistics"
            className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg mt-2">
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            Statistics
          </Link>

          <Link
            to="/admin/notifications"
            className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg mt-2">
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            Notifications
          </Link>

          <Link
            to="/admin/add-admin"
            className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg mt-2">
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
            Add Admin
          </Link>
        </nav>

        <div className="mt-auto px-4 py-6">
          <button
            onClick={() => navigate("/admin")}
            className="flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg w-full">
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Transfers Table */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Transfers</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b">
                  <th className="px-6 py-4">Transfer ID</th>
                  <th className="px-6 py-4">Vehicle Number</th>
                  <th className="px-6 py-4">TYPE</th>
                  <th className="px-6 py-4">DATE</th>
                  <th className="px-6 py-4">STATUS</th>
                  <th className="px-6 py-4">Transfer Fee</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody>
                {transfers.map((transfer, index) => (
                  <tr key={index} className="border-b last:border-b-0">
                    <td className="px-6 py-4">{transfer.transferId}</td>
                    <td className="px-6 py-4">{transfer.vehicleNumber}</td>
                    <td className="px-6 py-4">{transfer.type}</td>
                    <td className="px-6 py-4">{transfer.date}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          transfer.status
                        )}`}>
                        {transfer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">{transfer.fee}</td>
                    <td className="px-6 py-4">
                      <button className="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600">
                        More Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 flex items-center justify-between border-t">
            <p className="text-sm text-gray-500">Showing 1-09 of 78</p>
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransfersPage;
