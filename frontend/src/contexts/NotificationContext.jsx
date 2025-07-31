import { createContext, useContext, useState, useCallback } from 'react';
import toast from 'react-hot-toast';

// Notification types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

// Create context
const NotificationContext = createContext();

// Notification provider component
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // Add notification to the list
  const addNotification = useCallback((notification) => {
    const id = `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newNotification = {
      id,
      ...notification,
      timestamp: new Date().toISOString(),
      read: false,
    };

    setNotifications(prev => [newNotification, ...prev]);
    return id;
  }, []);

  // Remove notification from the list
  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  // Mark notification as read
  const markAsRead = useCallback((id) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  }, []);

  // Mark all notifications as read
  const markAllAsRead = useCallback(() => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  }, []);

  // Clear all notifications
  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  // Show toast notification
  const showNotification = useCallback((message, type = NOTIFICATION_TYPES.INFO, options = {}) => {
    const {
      duration = 4000,
      position = 'top-right',
      persistent = false,
      actions = [],
      data = {},
    } = options;

    // Add to notification list
    const notificationId = addNotification({
      type,
      message,
      persistent,
      actions,
      data,
    });

    // Show toast based on type
    const toastOptions = {
      duration: persistent ? Infinity : duration,
      position,
      id: notificationId,
    };

    switch (type) {
      case NOTIFICATION_TYPES.SUCCESS:
        toast.success(message, {
          ...toastOptions,
          style: {
            background: '#10B981',
            color: '#FFFFFF',
          },
          iconTheme: {
            primary: '#FFFFFF',
            secondary: '#10B981',
          },
        });
        break;

      case NOTIFICATION_TYPES.ERROR:
        toast.error(message, {
          ...toastOptions,
          style: {
            background: '#EF4444',
            color: '#FFFFFF',
          },
          iconTheme: {
            primary: '#FFFFFF',
            secondary: '#EF4444',
          },
        });
        break;

      case NOTIFICATION_TYPES.WARNING:
        toast(message, {
          ...toastOptions,
          icon: '⚠️',
          style: {
            background: '#F59E0B',
            color: '#FFFFFF',
          },
        });
        break;

      case NOTIFICATION_TYPES.INFO:
      default:
        toast(message, {
          ...toastOptions,
          icon: 'ℹ️',
          style: {
            background: '#3B82F6',
            color: '#FFFFFF',
          },
        });
        break;
    }

    return notificationId;
  }, [addNotification]);

  // Show loading notification
  const showLoading = useCallback((message = 'Loading...', options = {}) => {
    const loadingId = toast.loading(message, {
      position: options.position || 'top-center',
      style: {
        background: '#6B7280',
        color: '#FFFFFF',
      },
    });

    // Add to notification list
    addNotification({
      type: 'loading',
      message,
      persistent: true,
      data: { toastId: loadingId },
    });

    return loadingId;
  }, [addNotification]);

  // Dismiss loading notification
  const dismissLoading = useCallback((loadingId, successMessage = null, errorMessage = null) => {
    toast.dismiss(loadingId);

    if (successMessage) {
      showNotification(successMessage, NOTIFICATION_TYPES.SUCCESS);
    } else if (errorMessage) {
      showNotification(errorMessage, NOTIFICATION_TYPES.ERROR);
    }
  }, [showNotification]);

  // Custom notification types for specific use cases
  const showTransferStatusUpdate = useCallback((transferId, status, message) => {
    const statusMessages = {
      submitted: 'Transfer application submitted successfully',
      under_review: 'Transfer application is under review',
      approved: 'Transfer application has been approved',
      rejected: 'Transfer application has been rejected',
      completed: 'Vehicle transfer completed successfully',
      payment_pending: 'Payment is required to proceed',
      documents_required: 'Additional documents are required',
    };

    const fullMessage = message || statusMessages[status] || 'Transfer status updated';
    
    const type = status === 'approved' || status === 'completed' 
      ? NOTIFICATION_TYPES.SUCCESS 
      : status === 'rejected' 
      ? NOTIFICATION_TYPES.ERROR 
      : NOTIFICATION_TYPES.INFO;

    return showNotification(fullMessage, type, {
      data: { transferId, status },
      actions: [
        {
          label: 'View Details',
          action: () => window.location.href = `/transfers/${transferId}`,
        },
      ],
    });
  }, [showNotification]);

  // Document upload notification
  const showDocumentUpload = useCallback((fileName, status) => {
    const messages = {
      uploading: `Uploading ${fileName}...`,
      success: `${fileName} uploaded successfully`,
      error: `Failed to upload ${fileName}`,
    };

    const type = status === 'success' 
      ? NOTIFICATION_TYPES.SUCCESS 
      : status === 'error' 
      ? NOTIFICATION_TYPES.ERROR 
      : NOTIFICATION_TYPES.INFO;

    return showNotification(messages[status], type, {
      data: { fileName, status },
    });
  }, [showNotification]);

  // Payment notification
  const showPaymentUpdate = useCallback((amount, status, paymentId) => {
    const messages = {
      processing: `Processing payment of Rs. ${amount.toLocaleString()}...`,
      success: `Payment of Rs. ${amount.toLocaleString()} completed successfully`,
      failed: `Payment of Rs. ${amount.toLocaleString()} failed`,
    };

    const type = status === 'success' 
      ? NOTIFICATION_TYPES.SUCCESS 
      : status === 'failed' 
      ? NOTIFICATION_TYPES.ERROR 
      : NOTIFICATION_TYPES.INFO;

    return showNotification(messages[status], type, {
      data: { amount, status, paymentId },
      actions: status === 'success' ? [
        {
          label: 'Download Receipt',
          action: () => window.open(`/receipts/${paymentId}`, '_blank'),
        },
      ] : [],
    });
  }, [showNotification]);

  // Get unread notifications count
  const getUnreadCount = useCallback(() => {
    return notifications.filter(notification => !notification.read).length;
  }, [notifications]);

  // Get notifications by type
  const getNotificationsByType = useCallback((type) => {
    return notifications.filter(notification => notification.type === type);
  }, [notifications]);

  // Context value
  const value = {
    // State
    notifications,
    unreadCount: getUnreadCount(),

    // Basic actions
    addNotification,
    removeNotification,
    markAsRead,
    markAllAsRead,
    clearAll,

    // Toast notifications
    showNotification,
    showLoading,
    dismissLoading,

    // Specialized notifications
    showTransferStatusUpdate,
    showDocumentUpload,
    showPaymentUpdate,

    // Helpers
    getUnreadCount,
    getNotificationsByType,

    // Constants
    NOTIFICATION_TYPES,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

// Custom hook to use notification context
export const useNotification = () => {
  const context = useContext(NotificationContext);
  
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  
  return context;
};

// HOC for components that need notification access
export const withNotifications = (Component) => {
  return function NotificationComponent(props) {
    const notifications = useNotification();
    return <Component {...props} notifications={notifications} />;
  };
};
