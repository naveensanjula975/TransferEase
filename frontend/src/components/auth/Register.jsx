import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useNotification } from "../../contexts/NotificationContext";

const Register = () => {
  const navigate = useNavigate();
  const { register, isLoading, error, clearError } = useAuth();
  const { showSuccess, showError } = useNotification();
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    nic: "",
    password: "",
    confirmPassword: "",
    address: "",
  });
  const [formErrors, setFormErrors] = useState({});

  // Clear auth errors when component mounts
  useEffect(() => {
    clearError();
  }, [clearError]);

  // Show error notification when auth error changes
  useEffect(() => {
    if (error) {
      showError(error);
    }
  }, [error, showError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear field error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }

    if (!formData.nic.trim()) {
      errors.nic = 'NIC is required';
    } else if (!/^\d{9}[vVxX]$/.test(formData.nic)) {
      errors.nic = 'Invalid NIC format (e.g., 123456789V)';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }

    if (!formData.address.trim()) {
      errors.address = 'Address is required';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const result = await register(formData);
    
    if (result.success) {
      showSuccess('Registration successful! You can now login with your credentials.');
      navigate('/login');
    }
    // Error handling is done through the error state and useEffect
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-16 py-4">
        <Link to="/" className="text-xl font-bold">
          TransferEase
        </Link>
        <div className="flex items-center gap-8">
          <Link to="/" className="text-gray-700 hover:text-gray-900">
            Home
          </Link>
          <Link to="/downloads" className="text-gray-700 hover:text-gray-900">
            Downloads
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-gray-900">
            Contact
          </Link>
          <Link to="/transfer" className="text-gray-700 hover:text-gray-900">
            Transfer
          </Link>
          <Link to="/login" className="text-gray-700 hover:text-gray-900">
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-orange-500 text-white px-5 py-2 rounded-md hover:bg-orange-600 transition-colors">
            Sign UP
          </Link>
        </div>
      </nav>

      {/* Registration Form */}
      <div className="max-w-2xl mx-auto mt-16 p-8 bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Register</h2>
          <p className="text-gray-600">
            Begin your TransferEase journey by registering with us
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Ex: Nimal"
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-colors ${
                  formErrors.firstName ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {formErrors.firstName && (
                <p className="mt-1 text-sm text-red-600">{formErrors.firstName}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Ex: Perera"
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-colors ${
                  formErrors.lastName ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {formErrors.lastName && (
                <p className="mt-1 text-sm text-red-600">{formErrors.lastName}</p>
              )}
            </div>
          </div>

          {/* Email and NIC Fields */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ex: nimal@gmail.com"
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-colors ${
                  formErrors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {formErrors.email && (
                <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="nic"
                className="block text-sm font-medium text-gray-700 mb-1">
                Your NIC
              </label>
              <input
                type="text"
                id="nic"
                name="nic"
                value={formData.nic}
                onChange={handleChange}
                placeholder="Ex: 994589652v"
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-colors ${
                  formErrors.nic ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {formErrors.nic && (
                <p className="mt-1 text-sm text-red-600">{formErrors.nic}</p>
              )}
            </div>
          </div>

          {/* Password Fields */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-colors ${
                    formErrors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {showPassword ? (
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {formErrors.password && (
                <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-colors ${
                    formErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {showConfirmPassword ? (
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {formErrors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{formErrors.confirmPassword}</p>
              )}
            </div>
          </div>

          {/* Address Field */}
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              rows={3}
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your full address"
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-colors resize-none ${
                formErrors.address ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {formErrors.address && (
              <p className="mt-1 text-sm text-red-600">{formErrors.address}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-orange-500 text-white py-3 px-6 rounded-md hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </>
            ) : (
              <>
                Register
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </>
            )}
          </button>

          <p className="text-sm text-gray-600 text-center">
            By creating an account, you agree to our Terms & Conditions
          </p>

          <div className="flex items-center justify-between text-sm text-gray-600 mt-8">
            <span>Already have an account?</span>
            <Link
              to="/login"
              className="text-gray-900 font-medium hover:text-orange-500">
              Sign in here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
