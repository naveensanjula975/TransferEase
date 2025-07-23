import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  userRole: null, // 'user' or 'admin'
};

// Action types
const AUTH_ACTIONS = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_LOADING: 'SET_LOADING',
};

// Reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
        userRole: action.payload.role,
        error: null,
      };
    case AUTH_ACTIONS.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        userRole: null,
        error: action.payload,
      };
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        userRole: null,
        error: null,
      };
    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
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
    const loadUserFromStorage = () => {
      try {
        const storedUser = localStorage.getItem('transferease_user');
        const storedRole = localStorage.getItem('transferease_role');
        
        if (storedUser && storedRole) {
          dispatch({
            type: AUTH_ACTIONS.LOGIN_SUCCESS,
            payload: {
              user: JSON.parse(storedUser),
              role: storedRole,
            },
          });
        }
      } catch (error) {
        console.error('Error loading user from storage:', error);
        // Clear corrupted data
        localStorage.removeItem('transferease_user');
        localStorage.removeItem('transferease_role');
      }
    };

    loadUserFromStorage();
  }, []);

  // Login function for regular users
  const login = async (credentials) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_START });

    try {
      // TODO: Replace with actual API call
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock validation - replace with real validation
      if (credentials.email && credentials.password && credentials.nic) {
        const mockUser = {
          id: 1,
          name: 'John Doe',
          email: credentials.email,
          nic: credentials.nic,
          avatar: null,
        };

        // Store in localStorage
        localStorage.setItem('transferease_user', JSON.stringify(mockUser));
        localStorage.setItem('transferease_role', 'user');

        dispatch({
          type: AUTH_ACTIONS.LOGIN_SUCCESS,
          payload: {
            user: mockUser,
            role: 'user',
          },
        });

        return { success: true };
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.LOGIN_FAILURE,
        payload: error.message || 'Login failed',
      });
      return { success: false, error: error.message };
    }
  };

  // Admin login function
  const adminLogin = async (credentials) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_START });

    try {
      // TODO: Replace with actual API call
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock validation - replace with real validation
      if (credentials.email && credentials.password && credentials.nic && credentials.employeeId) {
        const mockAdmin = {
          id: 1,
          name: 'Admin User',
          email: credentials.email,
          nic: credentials.nic,
          employeeId: credentials.employeeId,
          avatar: null,
        };

        // Store in localStorage
        localStorage.setItem('transferease_user', JSON.stringify(mockAdmin));
        localStorage.setItem('transferease_role', 'admin');

        dispatch({
          type: AUTH_ACTIONS.LOGIN_SUCCESS,
          payload: {
            user: mockAdmin,
            role: 'admin',
          },
        });

        return { success: true };
      } else {
        throw new Error('Invalid admin credentials');
      }
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.LOGIN_FAILURE,
        payload: error.message || 'Admin login failed',
      });
      return { success: false, error: error.message };
    }
  };

  // Register function
  const register = async (userData) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_START });

    try {
      // TODO: Replace with actual API call
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock validation - replace with real validation
      if (userData.email && userData.password && userData.firstName && userData.lastName) {
        const newUser = {
          id: Date.now(),
          name: `${userData.firstName} ${userData.lastName}`,
          email: userData.email,
          nic: userData.nic,
          address: userData.address,
          avatar: null,
        };

        // Store in localStorage
        localStorage.setItem('transferease_user', JSON.stringify(newUser));
        localStorage.setItem('transferease_role', 'user');

        dispatch({
          type: AUTH_ACTIONS.LOGIN_SUCCESS,
          payload: {
            user: newUser,
            role: 'user',
          },
        });

        return { success: true };
      } else {
        throw new Error('Registration validation failed');
      }
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.LOGIN_FAILURE,
        payload: error.message || 'Registration failed',
      });
      return { success: false, error: error.message };
    }
  };

  // Logout function
  const logout = () => {
    // Clear localStorage
    localStorage.removeItem('transferease_user');
    localStorage.removeItem('transferease_role');

    dispatch({ type: AUTH_ACTIONS.LOGOUT });
  };

  // Clear error function
  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  // Update user profile
  const updateProfile = async (updatedData) => {
    try {
      // TODO: Replace with actual API call
      const updatedUser = { ...state.user, ...updatedData };
      
      localStorage.setItem('transferease_user', JSON.stringify(updatedUser));
      
      dispatch({
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: {
          user: updatedUser,
          role: state.userRole,
        },
      });

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return state.userRole === role;
  };

  // Check if user is admin
  const isAdmin = () => {
    return state.userRole === 'admin';
  };

  // Check if user is regular user
  const isUser = () => {
    return state.userRole === 'user';
  };

  const value = {
    // State
    ...state,
    
    // Actions
    login,
    adminLogin,
    register,
    logout,
    clearError,
    updateProfile,
    
    // Helper functions
    hasRole,
    isAdmin,
    isUser,
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
    const { isAuthenticated } = useAuth();
    
    if (!isAuthenticated) {
      return <div>Please log in to access this page.</div>;
    }
    
    return <Component {...props} />;
  };
};

export default AuthContext;
