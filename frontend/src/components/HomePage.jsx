import React from "react";
import { Link } from "react-router-dom";
import Toyota from "../assets/Toyota.png";
import Car1 from "../assets/BmwPic.png";
import Car2 from "../assets/SuvPic.png";
import Logo from "../assets/logo-1 2.png";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-4 py-4 bg-white shadow-sm md:px-16">
        <Link
          to="/"
          className="text-xl font-bold transition-colors hover:text-orange-500">
          TransferEase
        </Link>
        <div className="items-center hidden gap-8 md:flex">
          <Link
            to="/"
            className="text-gray-700 transition-colors hover:text-orange-500">
            Home
          </Link>
          <Link
            to="/downloads"
            className="text-gray-700 transition-colors hover:text-orange-500">
            Downloads
          </Link>
          <Link
            to="/transfer"
            className="text-gray-700 transition-colors hover:text-orange-500">
            Transfer
          </Link>
          <Link
            to="/contact"
            className="text-gray-700 transition-colors hover:text-orange-500">
            Contact
          </Link>
          <Link
            to="/login"
            className="text-gray-700 transition-colors hover:text-orange-500">
            Login
          </Link>
          <Link
            to="/signup"
            className="px-5 py-2 text-white transition-all transform bg-orange-500 rounded-md hover:bg-orange-600 hover:scale-105 focus:ring-2 focus:ring-orange-300">
            Sign Up
          </Link>
        </div>
        {/* Mobile Menu Button */}
        <button className="p-2 text-gray-700 md:hidden hover:text-orange-500">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </nav>

      {/* Hero Section */}
      <div className="container px-4 py-12 mx-auto md:px-16">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-[2.75rem] font-bold leading-tight mb-4">
              Vehicle Ownership Transfer{" "}
              <span className="text-orange-500">Easy.</span>
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-gray-600">
              We aim to streamline the vehicle owner transfer process that
              ensures a smooth and secure transfer by eliminating the need for
              owners and buyers to do manual long processes.
            </p>
            <div className="flex items-center gap-4">
              <button className="px-6 py-3 text-white transition-all transform bg-orange-500 rounded-md hover:bg-orange-600 hover:scale-105 focus:ring-2 focus:ring-orange-300">
                Transfer Now
              </button>
              <button className="inline-flex items-center text-gray-700 transition-colors hover:text-orange-500 group">
                More Details
                <svg
                  className="w-5 h-5 ml-2 transition-transform transform group-hover:translate-x-1"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="relative w-full md:w-auto">
            <div className="p-4 transition-transform transform bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl md:p-8">
              <img
                src={Toyota}
                alt="White Toyota Camry"
                className="w-full md:w-[600px] h-auto"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <div className="py-20 bg-white">
        <div className="container px-4 mx-auto md:px-16">
          <h3 className="mb-2 text-center text-gray-600">How it works</h3>
          <h2 className="mb-16 text-3xl font-semibold text-center">
            Transfer your vehicle with 3 steps
          </h2>
          <div className="relative flex flex-col items-center justify-between gap-8 md:flex-row md:gap-0">
            <div className="z-10 text-center transition-transform transform hover:scale-105">
              <div className="inline-block p-6 mb-6 transition-shadow bg-white rounded-full shadow-lg hover:shadow-xl">
                <svg
                  className="w-12 h-12 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold">Pick Vehicle</h3>
              <p className="text-gray-600">
                Create account and make
                <br />
                transfer request
              </p>
            </div>

            {/* Connecting Lines - Only visible on desktop */}
            <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5">
              <div className="w-full h-full border-t-2 border-gray-300 border-dashed"></div>
            </div>

            <div className="z-10 text-center transition-transform transform hover:scale-105">
              <div className="inline-block p-6 mb-6 transition-shadow bg-orange-500 rounded-full shadow-lg hover:shadow-xl">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold">Fill Out Forms</h3>
              <p className="text-gray-600">
                After owner accepting the request
                <br />
                fill forms to transfer
              </p>
            </div>

            <div className="z-10 text-center transition-transform transform hover:scale-105">
              <div className="inline-block p-6 mb-6 transition-shadow bg-white rounded-full shadow-lg hover:shadow-xl">
                <svg
                  className="w-12 h-12 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold">Transfer Vehicle</h3>
              <p className="text-gray-600">
                DMT will check your details and
                <br />
                do the ownership transfer
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Sections */}
      <div className="container px-4 py-20 mx-auto md:px-16">
        <div className="flex flex-col items-center justify-between gap-8 mb-24 md:flex-row">
          <div className="max-w-xl">
            <h3 className="mb-3 font-semibold text-blue-600">
              Streamline Vehicle Ownership Transfer
            </h3>
            <h2 className="mb-6 text-3xl font-bold">
              Simplifying the Process for
              <br />
              Seamless Transfers
            </h2>
            <p className="mb-8 leading-relaxed text-gray-600">
              Our platform offers a hassle-free solution for transferring
              vehicle ownership, making the process efficient and
              straightforward.
            </p>
            <button className="px-6 py-3 text-white transition-all transform bg-orange-500 rounded-md hover:bg-orange-600 hover:scale-105 focus:ring-2 focus:ring-orange-300">
              More Details
            </button>
          </div>
          <div className="relative w-full md:w-auto">
            <img
              src={Car2}
              alt="Luxury SUV"
              className="w-full"
              loading="lazy"
            />
          </div>
        </div>

        <div className="flex flex-col-reverse items-center justify-between gap-8 md:flex-row">
          <div className="relative w-full md:w-auto">
            <img
              src={Car1}
              alt="Sports Car"
              className="w-full"
              loading="lazy"
            />
          </div>
          <div className="max-w-xl">
            <h3 className="mb-3 font-semibold text-blue-600">
              Streamline Your Vehicle Ownership Transfer Process
            </h3>
            <h2 className="mb-6 text-3xl font-bold">
              Efficiency at Your
              <br />
              Fingertips
            </h2>
            <p className="mb-8 leading-relaxed text-gray-600">
              Welcome to our streamlined platform where transferring vehicle
              ownership is simplified through our innovative and user-friendly
              digital solutions. Experience a seamless process that saves you
              time and effort.
            </p>
            <button className="px-6 py-3 text-white transition-all transform bg-orange-500 rounded-md hover:bg-orange-600 hover:scale-105 focus:ring-2 focus:ring-orange-300">
              More Details
            </button>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-16 overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="container relative z-10 px-4 mx-auto md:px-16">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div>
              <h2 className="mb-3 text-3xl font-bold text-white">
                Enjoy with our service
              </h2>
              <h3 className="mb-4 text-2xl text-white">It's Free</h3>
              <p className="mb-8 text-white opacity-90">
                For faster, easier transfering and save time.
              </p>
              <button className="px-6 py-3 text-orange-500 transition-all transform bg-white rounded-md hover:bg-gray-100 hover:scale-105 focus:ring-2 focus:ring-white">
                Get Started
              </button>
            </div>
            <div className="transition-transform transform hover:scale-105">
              <img
                src={Logo}
                alt="CodeVerse TransferEase"
                className="h-16"
                loading="lazy"
              />
            </div>
          </div>
        </div>
        {/* Curved Design Element */}
        <div className="absolute bottom-0 right-0 w-96 h-96 opacity-20">
          <svg viewBox="0 0 200 200" className="text-white">
            <path
              fill="currentColor"
              d="M100,0 C130,40 180,50 200,100 L200,200 L0,200 L0,100 C20,50 70,40 100,0"
            />
          </svg>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 bg-white">
        <div className="container px-4 mx-auto md:px-16">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
            <div>
              <img
                src={Logo}
                alt="CodeVerse"
                className="h-12 mb-6"
                loading="lazy"
              />
              <p className="text-gray-600">
                No. 241, Malligaha Mawatha,
                <br />
                Colombo 05, Narahenpita, Sri Lanka.
              </p>
            </div>
            <div>
              <p className="text-gray-600 transition-colors hover:text-orange-500">
                <a href="tel:+94714956123">+94-714956123</a>
              </p>
            </div>
            <div>
              <p className="mb-6 font-medium text-gray-600">Follow Us</p>
              <div className="flex gap-6">
                <a
                  href="#"
                  className="text-gray-500 transition-colors transform hover:text-orange-500 hover:scale-110"
                  aria-label="Facebook">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-500 transition-colors transform hover:text-orange-500 hover:scale-110"
                  aria-label="Twitter">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-500 transition-colors transform hover:text-orange-500 hover:scale-110"
                  aria-label="Instagram">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-500 transition-colors transform hover:text-orange-500 hover:scale-110"
                  aria-label="YouTube">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 text-center">
            <p className="text-gray-600">
              Copyright 2024 © CodeVerse. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
