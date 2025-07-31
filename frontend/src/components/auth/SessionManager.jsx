import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import { Modal } from '../shared';
import { Button } from '../shared';
import { Clock, AlertTriangle } from 'lucide-react';

const SessionManager = ({ children }) => {
  const { user, logout, refreshToken } = useAuth();
  const { showNotification } = useNotification();
  const [showWarning, setShowWarning] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [lastActivity, setLastActivity] = useState(Date.now());

  // Session timeout settings
  const WARNING_TIME = 5 * 60 * 1000; // 5 minutes before timeout
  const SESSION_TIMEOUT = user?.role === 'admin' 
    ? 8 * 60 * 60 * 1000  // 8 hours for admin
    : 24 * 60 * 60 * 1000; // 24 hours for regular users
  
  const INACTIVITY_LIMIT = 30 * 60 * 1000; // 30 minutes of inactivity

  // Update last activity
  const updateActivity = useCallback(() => {
    setLastActivity(Date.now());
  }, []);

  // Activities that count as user interaction
  const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];

  // Handle session extension
  const extendSession = async () => {
    try {
      await refreshToken();
      setShowWarning(false);
      setLastActivity(Date.now());
      showNotification('Session extended successfully', 'success');
    } catch (error) {
      console.error('Failed to extend session:', error);
      showNotification('Failed to extend session. Please log in again.', 'error');
      logout();
    }
  };

  // Handle session timeout
  const handleTimeout = useCallback(() => {
    setShowWarning(false);
    showNotification('Session expired due to inactivity. Please log in again.', 'warning');
    logout();
  }, [logout, showNotification]);

  // Check session and inactivity
  useEffect(() => {
    if (!user) return;

    // Add activity listeners
    activityEvents.forEach(event => {
      document.addEventListener(event, updateActivity, true);
    });

    const checkSession = () => {
      const now = Date.now();
      const timeSinceActivity = now - lastActivity;

      // Check for inactivity timeout
      if (timeSinceActivity >= INACTIVITY_LIMIT) {
        handleTimeout();
        return;
      }

      // Check if we should show warning
      const timeUntilInactive = INACTIVITY_LIMIT - timeSinceActivity;
      if (timeUntilInactive <= WARNING_TIME && !showWarning) {
        setShowWarning(true);
        setCountdown(Math.ceil(timeUntilInactive / 1000));
      }

      // Update countdown
      if (showWarning && timeUntilInactive > 0) {
        setCountdown(Math.ceil(timeUntilInactive / 1000));
      }
    };

    // Check session every 30 seconds
    const interval = setInterval(checkSession, 30000);

    // Cleanup
    return () => {
      clearInterval(interval);
      activityEvents.forEach(event => {
        document.removeEventListener(event, updateActivity, true);
      });
    };
  }, [user, lastActivity, showWarning, handleTimeout, updateActivity]);

  // Countdown timer for warning dialog
  useEffect(() => {
    if (!showWarning || countdown <= 0) return;

    const timer = setTimeout(() => {
      if (countdown <= 1) {
        handleTimeout();
      } else {
        setCountdown(countdown - 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [showWarning, countdown, handleTimeout]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {children}
      
      {/* Session Warning Modal */}
      <Modal
        isOpen={showWarning}
        onClose={() => {}} // Prevent closing without action
        title="Session Timeout Warning"
        size="sm"
        closeOnBackdropClick={false}
        closeOnEscape={false}
        showCloseButton={false}
      >
        <div className="text-center space-y-4">
          <div className="mx-auto w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-yellow-600" />
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Your session is about to expire
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              You will be automatically logged out due to inactivity in:
            </p>
            
            <div className="flex items-center justify-center space-x-2 text-2xl font-bold text-red-600">
              <Clock className="w-6 h-6" />
              <span>{formatTime(countdown)}</span>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button
              onClick={handleTimeout}
              variant="secondary"
              className="flex-1"
            >
              Logout Now
            </Button>
            <Button
              onClick={extendSession}
              className="flex-1"
            >
              Stay Logged In
            </Button>
          </div>

          <p className="text-xs text-gray-500">
            Click "Stay Logged In" to extend your session or any activity will reset the timer.
          </p>
        </div>
      </Modal>
    </>
  );
};

export default SessionManager;
