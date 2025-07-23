import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useNotification } from "../../contexts/NotificationContext";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading, error, clearError } = useAuth();
  const { showSuccess, showError } = useNotification();
  
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    nic: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});

  // Get the redirect path from location state or default to dashboard
  const from = location.state?.from?.pathname || '/dashboard';

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

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const result = await login(formData);
    
    if (result.success) {
      showSuccess('Login successful! Welcome back.');
      navigate(from, { replace: true });
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

      {/* Login Form */}
      <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600 text-sm">
            Please Enter Your Email Address & Password
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="nic"
              className="block text-sm font-medium text-gray-700 mb-1">
              NIC
            </label>
            <input
              type="text"
              id="nic"
              name="nic"
              value={formData.nic}
              onChange={handleChange}
              placeholder="Ex: 98653245v"
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-colors ${
                formErrors.nic ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {formErrors.nic && (
              <p className="mt-1 text-sm text-red-600">{formErrors.nic}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Ex: name@gmail.com"
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

          <div className="flex items-center justify-end">
            <Link
              to="/forgot-password"
              className="text-sm text-purple-600 hover:text-purple-700">
              Forgot Password ??
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </>
            ) : (
              <>
                Login
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

          <div className="flex items-center justify-between text-sm text-gray-600 mt-8">
            <span>Don't Have an Account?</span>
            <Link
              to="/signup"
              className="text-gray-900 font-medium hover:text-orange-500">
              Create Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
