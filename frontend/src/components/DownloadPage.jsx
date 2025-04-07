import React from "react";
import { Link } from "react-router-dom";

const DownloadCard = ({
  title,
  description,
  fileSize,
  fileType,
  downloadUrl,
}) => {
  return (
    <div className="p-6 transition-shadow bg-white shadow-md rounded-xl hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="mb-2 text-lg font-semibold text-gray-800">{title}</h3>
          <p className="mb-4 text-sm text-gray-600">{description}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              {fileSize}
            </span>
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              {fileType}
            </span>
          </div>
        </div>
        <a
          href={downloadUrl}
          className="flex items-center justify-center w-10 h-10 text-white transition-colors bg-orange-500 rounded-full hover:bg-orange-600"
          title="Download">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

const DownloadPage = () => {
  const downloadItems = [
    {
      title: "Vehicle Transfer Form",
      description:
        "Official document required for transferring vehicle ownership between parties.",
      fileSize: "245 KB",
      fileType: "PDF",
      downloadUrl: "/downloads/vehicle-transfer-form.pdf",
    },
    {
      title: "Owner Information Form",
      description:
        "Form for collecting detailed information about the current vehicle owner.",
      fileSize: "180 KB",
      fileType: "PDF",
      downloadUrl: "/downloads/owner-info-form.pdf",
    },
    {
      title: "Buyer Information Form",
      description:
        "Form for collecting detailed information about the prospective vehicle buyer.",
      fileSize: "175 KB",
      fileType: "PDF",
      downloadUrl: "/downloads/buyer-info-form.pdf",
    },
    {
      title: "Transfer Guidelines",
      description:
        "Comprehensive guide explaining the vehicle transfer process and requirements.",
      fileSize: "520 KB",
      fileType: "PDF",
      downloadUrl: "/downloads/transfer-guidelines.pdf",
    },
    {
      title: "Fee Structure Document",
      description:
        "Detailed breakdown of all fees associated with vehicle transfer process.",
      fileSize: "150 KB",
      fileType: "PDF",
      downloadUrl: "/downloads/fee-structure.pdf",
    },
    {
      title: "Required Documents Checklist",
      description:
        "Checklist of all required documents needed for vehicle transfer.",
      fileSize: "125 KB",
      fileType: "PDF",
      downloadUrl: "/downloads/documents-checklist.pdf",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white shadow-sm">
        <div className="container px-4 py-8 mx-auto md:px-16">
          <h1 className="mb-2 text-3xl font-bold text-gray-800">Downloads</h1>
          <p className="text-gray-600">
            Access and download all necessary forms and documents for vehicle
            transfer process.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container px-4 py-12 mx-auto md:px-16">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search documents..."
              className="w-full py-2 pl-10 pr-4 transition-colors border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
            <svg
              className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Download Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {downloadItems.map((item, index) => (
            <DownloadCard key={index} {...item} />
          ))}
        </div>

        {/* Help Section */}
        <div className="p-6 mt-16 bg-white shadow-md rounded-xl">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <svg
                className="w-6 h-6 text-orange-500"
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
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold text-gray-800">
                Need Help?
              </h3>
              <p className="mb-4 text-gray-600">
                If you're having trouble downloading or need assistance with any
                forms, our support team is here to help.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center text-orange-500 transition-colors hover:text-orange-600">
                Contact Support
                <svg
                  className="w-4 h-4 ml-1"
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
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;
