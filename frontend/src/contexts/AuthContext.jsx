import { createContext, useContext, useReducer, useEffect } from 'react';
import MockAuthService from '../services/mockAuthService';

// Auth action types
const AUTH_ACTIONS = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  UPDATE_USER: 'UPDATE_USER',
  SET_LOADING: 'SET_LOADING',
};

// Initial state
const initialState = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
};

// Auth reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case AUTH_ACTIONS.LOGIN:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case AUTH_ACTIONS.UPDATE_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user from localStorage on app start
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = localStorage.getItem('transferease_user');
        const storedToken = localStorage.getItem('transferease_token');
        
        if (storedUser && storedToken) {
          // Verify token with the service
          try {
            await MockAuthService.verifyToken(storedToken);
            const user = JSON.parse(storedUser);
            dispatch({ type: AUTH_ACTIONS.LOGIN, payload: user });
            return;
          } catch (tokenError) {
            console.log('Token expired or invalid:', tokenError.message);
            // Token is invalid, clear storage
            localStorage.removeItem('transferease_user');
            localStorage.removeItem('transferease_token');
          }
        }
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
        localStorage.removeItem('transferease_user');
        localStorage.removeItem('transferease_token');
      }
      
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
    };

    loadUser();
  }, []);

  // Login function
  const login = (userData) => {
    try {
      // Store user in localStorage (token is handled by auth service)
      localStorage.setItem('transferease_user', JSON.stringify(userData));

      // Update state
      dispatch({ type: AUTH_ACTIONS.LOGIN, payload: userData });
    } catch (error) {
      console.error('Error during login:', error);
      throw new Error('Failed to login. Please try again.');
    }
  };

  // Logout function
  const logout = async () => {
    try {
      const token = localStorage.getItem('transferease_token');
      
      // Call the logout service if token exists
      if (token) {
        try {
          await MockAuthService.logout(token);
        } catch (error) {
          console.error('Error during service logout:', error);
        }
      }
      
      // Clear localStorage
      localStorage.removeItem('transferease_user');
      localStorage.removeItem('transferease_token');
      
      // Update state
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Update user function
  const updateUser = async (updates) => {
    try {
      if (!state.user) throw new Error('No user logged in');
      
      // Use the service to update user profile
      const updatedUser = await MockAuthService.updateProfile(state.user.id, updates);
      
      // Update localStorage
      localStorage.setItem('transferease_user', JSON.stringify(updatedUser));
      
      // Update state
      dispatch({ type: AUTH_ACTIONS.UPDATE_USER, payload: updates });
      
      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error('Failed to update user. Please try again.');
    }
  };

  // Refresh token function
  const refreshToken = async () => {
    try {
      const currentToken = localStorage.getItem('transferease_token');
      if (!currentToken) throw new Error('No token to refresh');
      
      const { token } = await MockAuthService.refreshToken(currentToken);
      localStorage.setItem('transferease_token', token);
      
      return token;
    } catch (error) {
      console.error('Error refreshing token:', error);
      // If refresh fails, logout user
      logout();
      throw error;
    }
  };

  // Change password function
  const changePassword = async (currentPassword, newPassword) => {
    try {
      if (!state.user) throw new Error('No user logged in');
      
      await MockAuthService.changePassword(state.user.id, currentPassword, newPassword);
      return { success: true };
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return state.user && state.user.role === role;
  };

  // Check if user is admin
  const isAdmin = () => hasRole('admin');

  // Check if user is regular user
  const isUser = () => hasRole('user');

  // Get user permissions
  const getPermissions = () => {
    if (!state.user) return [];
    
    const basePermissions = ['view_profile', 'update_profile'];
    
    if (state.user.role === 'admin') {
      return [
        ...basePermissions,
        'view_all_transfers',
        'approve_transfers',
        'reject_transfers',
        'manage_users',
        'view_analytics',
        'export_data',
        'system_settings',
      ];
    }
    
    if (state.user.role === 'citizen') {
      return [
        ...basePermissions,
        'create_transfer',
        'view_own_transfers',
        'upload_documents',
        'make_payments',
        'view_vehicles',
      ];
    }
    
    return basePermissions;
  };

  // Check if user has specific permission
  const hasPermission = (permission) => {
    return getPermissions().includes(permission);
  };

  // Context value
  const value = {
    // State
    user: state.user,
    isLoading: state.isLoading,
    isAuthenticated: state.isAuthenticated,
    
    // Actions
    login,
    logout,
    updateUser,
    refreshToken,
    changePassword,
    
    // Helper functions
    hasRole,
    isAdmin,
    isUser,
    getPermissions,
    hasPermission,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

// HOC for components that need authentication
export const withAuth = (Component) => {
  return function AuthenticatedComponent(props) {
    const { isAuthenticated, isLoading } = useAuth();
    
    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      );
    }
    
    if (!isAuthenticated) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h2>
            <p className="text-gray-600 mb-4">Please log in to access this page.</p>
            <a
              href="/login"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Go to Login
            </a>
          </div>
        </div>
      );
    }
    
    return <Component {...props} />;
  };
};
