import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ 
  children, 
  requireAuth = true, 
  requireRole = null, 
  redirectTo = '/login' 
}) => {
  const { isAuthenticated, userRole, isLoading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  // Check if authentication is required
  if (requireAuth && !isAuthenticated) {
    // Redirect to login page with return url
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Check if specific role is required
  if (requireRole && userRole !== requireRole) {
    // Redirect based on user role
    if (userRole === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (userRole === 'user') {
      return <Navigate to="/dashboard" replace />;
    } else {
      return <Navigate to="/login" replace />;
    }
  }

  // If all checks pass, render the children
  return children;
};

// Specific components for different protection levels
export const RequireAuth = ({ children, redirectTo = '/login' }) => (
  <ProtectedRoute requireAuth={true} redirectTo={redirectTo}>
    {children}
  </ProtectedRoute>
);

export const RequireAdmin = ({ children }) => (
  <ProtectedRoute requireAuth={true} requireRole="admin" redirectTo="/login">
    {children}
  </ProtectedRoute>
);

export const RequireUser = ({ children }) => (
  <ProtectedRoute requireAuth={true} requireRole="user" redirectTo="/login">
    {children}
  </ProtectedRoute>
);

export const RequireGuest = ({ children }) => {
  const { isAuthenticated, userRole } = useAuth();

  if (isAuthenticated) {
    // Redirect authenticated users to their respective dashboards
    if (userRole === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (userRole === 'user') {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
