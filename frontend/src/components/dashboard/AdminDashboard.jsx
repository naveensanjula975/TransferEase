import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Logo from "../../assets/logo-1 2.png";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Monthly");

  // Sample data for the line chart
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    datasets: [
      {
        label: "Monthly Transfers",
        data: [180, 120, 80, 110, 160, 130, 140, 170],
        borderColor: "#f97316",
        tension: 0.4,
        fill: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "#f3f4f6",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  // Sample data for latest transfers
  const latestTransfers = [
    {
      id: "3467 5434",
      fullName: "Nimal Kamal",
      date: "15 April 2024",
      type: "Van",
      fee: "LKR 800",
    },
    {
      id: "3467 5434",
      fullName: "Nimal Kamal",
      date: "15 April 2024",
      type: "Car",
      fee: "LKR 800",
    },
    {
      id: "3467 5434",
      fullName: "Nimal Kamal",
      date: "15 April 2024",
      type: "Van",
      fee: "LKR 800",
    },
    {
      id: "3467 5434",
      fullName: "Nimal Kamal",
      date: "15 April 2024",
      type: "Van",
      fee: "LKR 800",
    },
  ];

  // Sample data for transfer review
  const transferReviews = [
    { vehicleNumber: "CAX-5603", date: "april 14" },
    { vehicleNumber: "ABC-8912", date: "april 14" },
  ];

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
            className="flex items-center px-4 py-3 text-blue-600 bg-blue-50 rounded-lg">
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
            to="/admin/settings"
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

        {/* Content Grid */}
        <div className="grid grid-cols-1 gap-8">
          {/* Latest Transfers */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Latest Transfers</h2>
              <Link
                to="/admin/transfers"
                className="text-blue-600 text-sm hover:underline">
                View All
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500">
                    <th className="pb-4">Full Name</th>
                    <th className="pb-4">ID Number</th>
                    <th className="pb-4">Date</th>
                    <th className="pb-4">Type</th>
                    <th className="pb-4">Fee</th>
                  </tr>
                </thead>
                <tbody>
                  {latestTransfers.map((transfer, index) => (
                    <tr key={index} className="border-t">
                      <td className="py-4 flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                        {transfer.fullName}
                      </td>
                      <td className="py-4">{transfer.id}</td>
                      <td className="py-4">{transfer.date}</td>
                      <td className="py-4">{transfer.type}</td>
                      <td className="py-4 text-blue-600">{transfer.fee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Statistics and Transfer Review */}
          <div className="grid grid-cols-2 gap-8">
            {/* Transfer Statistics */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">
                  Transfer statistics
                </h2>
                <p className="text-sm text-gray-500">
                  monthly transfer: 100 vehicles
                </p>
              </div>

              <div className="flex space-x-4 mb-6">
                <button
                  className={`px-4 py-2 rounded-full text-sm ${
                    activeTab === "Weekly" ? "bg-gray-200" : "hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab("Weekly")}>
                  Weekly
                </button>
                <button
                  className={`px-4 py-2 rounded-full text-sm ${
                    activeTab === "Monthly"
                      ? "bg-orange-500 text-white"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab("Monthly")}>
                  Monthly
                </button>
                <button
                  className={`px-4 py-2 rounded-full text-sm ${
                    activeTab === "Annual" ? "bg-gray-200" : "hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab("Annual")}>
                  Annual
                </button>
              </div>

              <div className="h-64">
                <Line data={chartData} options={chartOptions} />
              </div>
            </div>

            {/* Transfer Review */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6">Transfer Review</h2>

              <div className="space-y-4">
                {transferReviews.map((review, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center mr-4">
                          <svg
                            className="w-6 h-6 text-gray-500"
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
                        </div>
                        <div>
                          <p className="font-medium">Vehicle Transfer</p>
                          <p className="text-sm text-gray-500">
                            {review.vehicleNumber}
                          </p>
                          <p className="text-xs text-gray-400">
                            activity from {review.date}
                          </p>
                        </div>
                      </div>
                      <button className="text-sm text-blue-600 hover:underline">
                        View Details →
                      </button>
                    </div>
                  </div>
                ))}

                <button className="w-full py-2 text-sm text-white bg-emerald-400 rounded-lg hover:bg-emerald-500">
                  All Requests →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
