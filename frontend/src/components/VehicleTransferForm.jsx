import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./shared/Navbar";

const VehicleTransferForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    // Contact Details
    name: "",
    email: "",
    phone: "",
    address: "",
    // Vehicle Details
    registrationNumber: "",
    make: "",
    model: "",
    year: "",
    chassisNumber: "",
    engineNumber: "",
    color: "",
    // Documents
    registrationDocument: null,
    insuranceDocument: null,
    idDocument: null,
    // Payment
    paymentMethod: "card",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    amount: 2500,
  });

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.name) newErrors.name = "Name is required";
        if (!formData.email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email))
          newErrors.email = "Email is invalid";
        if (!formData.phone) newErrors.phone = "Phone number is required";
        else if (!/^0[0-9]{9}$/.test(formData.phone))
          newErrors.phone = "Phone number should be 10 digits starting with 0";
        if (!formData.address) newErrors.address = "Address is required";
        break;

      case 2:
        if (!formData.registrationNumber)
          newErrors.registrationNumber = "Registration number is required";
        else if (!/^[A-Z]{2,3}-\d{4}$/.test(formData.registrationNumber))
          newErrors.registrationNumber = "Invalid format (e.g., CAX-5678)";
        if (!formData.make) newErrors.make = "Make is required";
        if (!formData.model) newErrors.model = "Model is required";
        if (!formData.year) newErrors.year = "Year is required";
        else if (
          formData.year < 1900 ||
          formData.year > new Date().getFullYear()
        )
          newErrors.year = "Invalid year";
        if (!formData.chassisNumber)
          newErrors.chassisNumber = "Chassis number is required";
        if (!formData.engineNumber)
          newErrors.engineNumber = "Engine number is required";
        if (!formData.color) newErrors.color = "Color is required";
        break;

      case 3:
        if (!formData.registrationDocument)
          newErrors.registrationDocument = "Registration document is required";
        if (!formData.insuranceDocument)
          newErrors.insuranceDocument = "Insurance document is required";
        if (!formData.idDocument)
          newErrors.idDocument = "ID document is required";
        break;

      case 4:
        if (formData.paymentMethod === "card") {
          if (!formData.cardNumber)
            newErrors.cardNumber = "Card number is required";
          else if (!/^\d{16}$/.test(formData.cardNumber))
            newErrors.cardNumber = "Invalid card number";
          if (!formData.cardExpiry)
            newErrors.cardExpiry = "Expiry date is required";
          else if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(formData.cardExpiry))
            newErrors.cardExpiry = "Invalid expiry date (MM/YY)";
          if (!formData.cardCvc) newErrors.cardCvc = "CVC is required";
          else if (!/^\d{3,4}$/.test(formData.cardCvc))
            newErrors.cardCvc = "Invalid CVC";
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const steps = [
    { number: 1, title: "Contact details" },
    { number: 2, title: "Vehicle details" },
    { number: 3, title: "Documents" },
    { number: 4, title: "Payment" },
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Nimal Kamal"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none pl-10"
                    required
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                </div>
                {errors.name && (
                  <p className="text-sm text-red-600 mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email address"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none pl-10"
                    required
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
                {errors.email && (
                  <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone Number Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="071 456 7890"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none pl-10"
                    required
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                </div>
                {errors.phone && (
                  <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Address Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Your Address"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none pl-10"
                    required
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                </div>
                {errors.address && (
                  <p className="text-sm text-red-600 mt-1">{errors.address}</p>
                )}
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Registration Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Registration Number
                </label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleInputChange}
                  placeholder="CAX-5678"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  required
                />
                {errors.registrationNumber && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.registrationNumber}
                  </p>
                )}
              </div>

              {/* Make */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Make
                </label>
                <input
                  type="text"
                  name="make"
                  value={formData.make}
                  onChange={handleInputChange}
                  placeholder="Toyota"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  required
                />
                {errors.make && (
                  <p className="text-sm text-red-600 mt-1">{errors.make}</p>
                )}
              </div>

              {/* Model */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Model
                </label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  placeholder="Corolla"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  required
                />
                {errors.model && (
                  <p className="text-sm text-red-600 mt-1">{errors.model}</p>
                )}
              </div>

              {/* Year */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year
                </label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  placeholder="2020"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  required
                />
                {errors.year && (
                  <p className="text-sm text-red-600 mt-1">{errors.year}</p>
                )}
              </div>

              {/* Chassis Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Chassis Number
                </label>
                <input
                  type="text"
                  name="chassisNumber"
                  value={formData.chassisNumber}
                  onChange={handleInputChange}
                  placeholder="JHMCM56557C404453"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  required
                />
                {errors.chassisNumber && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.chassisNumber}
                  </p>
                )}
              </div>

              {/* Engine Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Engine Number
                </label>
                <input
                  type="text"
                  name="engineNumber"
                  value={formData.engineNumber}
                  onChange={handleInputChange}
                  placeholder="K20A4-1234567"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  required
                />
                {errors.engineNumber && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.engineNumber}
                  </p>
                )}
              </div>

              {/* Color */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Color
                </label>
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  placeholder="Silver"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  required
                />
                {errors.color && (
                  <p className="text-sm text-red-600 mt-1">{errors.color}</p>
                )}
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {/* Registration Document Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vehicle Registration Document
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-orange-500 transition-colors">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true">
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="registrationDocument"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-orange-500 hover:text-orange-600">
                        <span>Upload a file</span>
                        <input
                          id="registrationDocument"
                          name="registrationDocument"
                          type="file"
                          className="sr-only"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleInputChange}
                          required
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PDF, PNG, JPG up to 10MB
                    </p>
                    {formData.registrationDocument && (
                      <p className="text-sm text-green-600">
                        Selected: {formData.registrationDocument.name}
                      </p>
                    )}
                    {errors.registrationDocument && (
                      <p className="text-sm text-red-600">
                        {errors.registrationDocument}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Insurance Document Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Insurance Document
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-orange-500 transition-colors">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true">
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="insuranceDocument"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-orange-500 hover:text-orange-600">
                        <span>Upload a file</span>
                        <input
                          id="insuranceDocument"
                          name="insuranceDocument"
                          type="file"
                          className="sr-only"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleInputChange}
                          required
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PDF, PNG, JPG up to 10MB
                    </p>
                    {formData.insuranceDocument && (
                      <p className="text-sm text-green-600">
                        Selected: {formData.insuranceDocument.name}
                      </p>
                    )}
                    {errors.insuranceDocument && (
                      <p className="text-sm text-red-600">
                        {errors.insuranceDocument}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* ID Document Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ID Document (NIC/Passport)
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-orange-500 transition-colors">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true">
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="idDocument"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-orange-500 hover:text-orange-600">
                        <span>Upload a file</span>
                        <input
                          id="idDocument"
                          name="idDocument"
                          type="file"
                          className="sr-only"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleInputChange}
                          required
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PDF, PNG, JPG up to 10MB
                    </p>
                    {formData.idDocument && (
                      <p className="text-sm text-green-600">
                        Selected: {formData.idDocument.name}
                      </p>
                    )}
                    {errors.idDocument && (
                      <p className="text-sm text-red-600">
                        {errors.idDocument}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Payment Summary
              </h3>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Transfer Fee</span>
                <span>Rs. 2,000.00</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Service Charge</span>
                <span>Rs. 500.00</span>
              </div>
              <div className="flex justify-between text-base font-medium text-gray-900 pt-2 border-t">
                <span>Total Amount</span>
                <span>Rs. 2,500.00</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <input
                  type="radio"
                  id="card"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === "card"}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-orange-500 focus:ring-orange-500"
                />
                <label
                  htmlFor="card"
                  className="text-sm font-medium text-gray-700">
                  Credit/Debit Card
                </label>
              </div>

              {formData.paymentMethod === "card" && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                      required
                    />
                    {errors.cardNumber && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.cardNumber}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      name="cardExpiry"
                      value={formData.cardExpiry}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                      required
                    />
                    {errors.cardExpiry && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.cardExpiry}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVC
                    </label>
                    <input
                      type="text"
                      name="cardCvc"
                      value={formData.cardCvc}
                      onChange={handleInputChange}
                      placeholder="123"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                      required
                    />
                    {errors.cardCvc && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.cardCvc}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      default:
        return <div>Step {currentStep} content</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isLoggedIn={true} />

      <div className="max-w-4xl mx-auto pt-24 p-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
          Vehicle Transfer
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Please fill the form below to receive the confirmation by DMT for your
          vehicle.
        </p>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center w-full max-w-3xl">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex items-center relative">
                  <div
                    className={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 
                    ${
                      currentStep >= step.number
                        ? "bg-orange-500 border-orange-500"
                        : "border-gray-300"
                    }`}>
                    <p
                      className={`font-bold text-md text-center
                      ${
                        currentStep >= step.number
                          ? "text-white"
                          : "text-gray-500"
                      }`}>
                      {step.number}
                    </p>
                  </div>
                  <div
                    className={`absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium
                    ${
                      currentStep >= step.number
                        ? "text-orange-500"
                        : "text-gray-500"
                    }`}>
                    {step.title}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-auto border-t-2 transition duration-500 ease-in-out
                    ${
                      currentStep > step.number
                        ? "border-orange-500"
                        : "border-gray-300"
                    }`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {steps[currentStep - 1].title}
          </h2>
          <p className="text-gray-600 mb-8">
            {currentStep === 1
              ? "Statement of changing the owner of the motor vehicle"
              : currentStep === 2
              ? "Enter your vehicle details as shown in the registration book"
              : currentStep === 3
              ? "Upload your vehicle documents"
              : "Payment details"}
          </p>

          <form onSubmit={handleNextStep} className="space-y-6">
            {renderStepContent()}

            <div className="flex justify-between pt-4">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="text-gray-600 hover:text-gray-800 font-medium flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Previous step
                </button>
              ) : (
                <Link
                  to="/dashboard"
                  className="text-gray-600 hover:text-gray-800 font-medium flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Back to Dashboard
                </Link>
              )}
              <button
                type="submit"
                className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition-colors flex items-center">
                {currentStep < steps.length ? (
                  <>
                    Next step
                    <svg
                      className="w-5 h-5 ml-2"
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
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VehicleTransferForm;
