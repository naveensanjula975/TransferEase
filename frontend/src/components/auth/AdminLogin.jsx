import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useNotification } from "../../contexts/NotificationContext";

const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { adminLogin, isLoading, error, clearError } = useAuth();
  const { showSuccess, showError } = useNotification();
  
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    nic: "",
    employeeId: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});

  // Get the redirect path from location state or default to admin dashboard
  const from = location.state?.from?.pathname || '/admin/dashboard';

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

    if (!formData.employeeId.trim()) {
      errors.employeeId = 'Employee ID is required';
    } else if (!/^EM\d{4,}$/i.test(formData.employeeId)) {
      errors.employeeId = 'Invalid Employee ID format (e.g., EM0013)';
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

    const result = await adminLogin(formData);
    
    if (result.success) {
      showSuccess('Admin login successful! Welcome to the dashboard.');
      navigate(from, { replace: true });
    }
    // Error handling is done through the error state and useEffect
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen">
        <div className="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
          <div className="w-full max-w-sm mx-auto">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900">Admin Login</h2>
              <p className="mt-2 text-sm text-gray-600">
                Please Enter Your Credentials to Continue
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* NIC Field */}
              <div>
                <label
                  htmlFor="nic"
                  className="block text-sm font-medium text-gray-700">
                  NIC
                </label>
                <div className="mt-1">
                  <input
                    id="nic"
                    name="nic"
                    type="text"
                    value={formData.nic}
                    onChange={handleChange}
                    placeholder="Ex: 98653245v"
                    className={`block w-full px-3 py-2 placeholder-gray-400 border rounded-md shadow-sm appearance-none focus:outline-none focus:ring-orange-500 focus:border-orange-500 ${
                      formErrors.nic ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.nic && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.nic}</p>
                  )}
                </div>
              </div>

              {/* Employee ID Field */}
              <div>
                <label
                  htmlFor="employeeId"
                  className="block text-sm font-medium text-gray-700">
                  Employee ID
                </label>
                <div className="mt-1">
                  <input
                    id="employeeId"
                    name="employeeId"
                    type="text"
                    value={formData.employeeId}
                    onChange={handleChange}
                    placeholder="EM0013"
                    className={`block w-full px-3 py-2 placeholder-gray-400 border rounded-md shadow-sm appearance-none focus:outline-none focus:ring-orange-500 focus:border-orange-500 ${
                      formErrors.employeeId ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.employeeId && (
                    <p className="mt-1 text-sm text-red-600">
                      {formErrors.employeeId}
                    </p>
                  )}
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Ex: admin@transferease.com"
                    className={`block w-full px-3 py-2 placeholder-gray-400 border rounded-md shadow-sm appearance-none focus:outline-none focus:ring-orange-500 focus:border-orange-500 ${
                      formErrors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                  )}
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative mt-1">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter Password"
                    className={`block w-full px-3 py-2 placeholder-gray-400 border rounded-md shadow-sm appearance-none focus:outline-none focus:ring-orange-500 focus:border-orange-500 ${
                      formErrors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      {showPassword ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      ) : (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      )}
                    </svg>
                  </button>
                  {formErrors.password && (
                    <p className="mt-1 text-sm text-red-600">
                      {formErrors.password}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end">
                <Link
                  to="/admin/forgot-password"
                  className="text-sm font-medium text-purple-600 hover:text-purple-500">
                  Forgot Password ??
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-orange-500 border border-transparent rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed">
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </div>
                ) : (
                  'Login as Admin'
                )}
              </button>

              <div className="flex items-center justify-between text-sm text-gray-600 mt-8">
                <span>Not an admin?</span>
                <Link
                  to="/login"
                  className="font-medium text-orange-600 hover:text-orange-500">
                  User Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
