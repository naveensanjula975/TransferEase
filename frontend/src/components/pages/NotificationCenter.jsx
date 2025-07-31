import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bell, 
  Filter, 
  Search,
  CheckCircle,
  AlertTriangle,
  Info,
  X,
  Eye,
  MoreVertical,
  Calendar,
  User,
  FileText,
  Car,
  CreditCard,
  Settings
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const NotificationCenter = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Transfer Completed Successfully',
      message: 'Your vehicle transfer for ABC-123 (Toyota Aqua) has been completed successfully. The new owner can now proceed with vehicle registration.',
      timestamp: new Date('2025-01-31T10:30:00'),
      read: false,
      priority: 'high',
      category: 'transfer_update',
      applicationId: 'VT20250001',
      actionRequired: false,
      actionText: null,
      actionLink: null
    },
    {
      id: 2,
      type: 'warning',
      title: 'Document Verification Required',
      message: 'Additional documentation is required for your transfer application VT20250002. Please upload a clear copy of the vehicle insurance certificate.',
      timestamp: new Date('2025-01-31T09:15:00'),
      read: false,
      priority: 'urgent',
      category: 'document_required',
      applicationId: 'VT20250002',
      actionRequired: true,
      actionText: 'Upload Document',
      actionLink: '/documents'
    },
    {
      id: 3,
      type: 'info',
      title: 'Payment Reminder',
      message: 'Transfer fee payment is pending for application VT20250002. Please complete the payment to proceed with your application.',
      timestamp: new Date('2025-01-30T16:45:00'),
      read: false,
      priority: 'medium',
      category: 'payment_reminder',
      applicationId: 'VT20250002',
      actionRequired: true,
      actionText: 'Make Payment',
      actionLink: '/transfers/VT20250002/payment'
    },
    {
      id: 4,
      type: 'info',
      title: 'Application Under Review',
      message: 'Your transfer application VT20250003 is currently under review by our verification team. We will notify you once the review is complete.',
      timestamp: new Date('2025-01-30T14:20:00'),
      read: true,
      priority: 'low',
      category: 'status_update',
      applicationId: 'VT20250003',
      actionRequired: false,
      actionText: null,
      actionLink: null
    },
    {
      id: 5,
      type: 'success',
      title: 'Documents Verified',
      message: 'All documents for application VT20250003 have been successfully verified. Your application is now proceeding to the final approval stage.',
      timestamp: new Date('2025-01-29T11:30:00'),
      read: true,
      priority: 'medium',
      category: 'document_verified',
      applicationId: 'VT20250003',
      actionRequired: false,
      actionText: null,
      actionLink: null
    },
    {
      id: 6,
      type: 'info',
      title: 'New Feature Available',
      message: 'You can now track your transfer applications in real-time using our new application tracking feature. Check it out in your dashboard.',
      timestamp: new Date('2025-01-28T08:00:00'),
      read: true,
      priority: 'low',
      category: 'system_update',
      applicationId: null,
      actionRequired: false,
      actionText: null,
      actionLink: null
    },
    {
      id: 7,
      type: 'warning',
      title: 'Document Rejected',
      message: 'The vehicle registration certificate uploaded for application VT20250004 has been rejected due to poor image quality. Please upload a clearer version.',
      timestamp: new Date('2025-01-27T15:45:00'),
      read: true,
      priority: 'high',
      category: 'document_rejected',
      applicationId: 'VT20250004',
      actionRequired: true,
      actionText: 'Resubmit Document',
      actionLink: '/documents/revision'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedNotification, setSelectedNotification] = useState(null);

  const markAsRead = (notificationId) => {
    setNotifications(prev => prev.map(notification => 
      notification.id === notificationId 
        ? { ...notification, read: true }
        : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notification => 
      ({ ...notification, read: true })
    ));
  };

  const deleteNotification = (notificationId) => {
    setNotifications(prev => prev.filter(notification => notification.id !== notificationId));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'error': return <X className="h-5 w-5 text-red-600" />;
      default: return <Info className="h-5 w-5 text-blue-600" />;
    }
  };

  const getNotificationColor = (type, read) => {
    const baseColors = {
      success: 'border-green-200',
      warning: 'border-yellow-200',
      error: 'border-red-200',
      info: 'border-blue-200'
    };
    
    const bgColors = {
      success: read ? 'bg-white' : 'bg-green-50',
      warning: read ? 'bg-white' : 'bg-yellow-50',
      error: read ? 'bg-white' : 'bg-red-50',
      info: read ? 'bg-white' : 'bg-blue-50'
    };

    return `${baseColors[type]} ${bgColors[type]}`;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'transfer_update': return <Car className="h-4 w-4" />;
      case 'document_required':
      case 'document_verified':
      case 'document_rejected': return <FileText className="h-4 w-4" />;
      case 'payment_reminder': return <CreditCard className="h-4 w-4" />;
      case 'system_update': return <Settings className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || notification.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'unread' && !notification.read) ||
                         (statusFilter === 'read' && notification.read);
    const matchesPriority = priorityFilter === 'all' || notification.priority === priorityFilter;
    
    return matchesSearch && matchesType && matchesStatus && matchesPriority;
  });

  const unreadCount = notifications.filter(n => !n.read).length;
  const urgentCount = notifications.filter(n => n.priority === 'urgent' && !n.read).length;

  const NotificationModal = ({ notification, onClose }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-full overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center space-x-3">
              {getNotificationIcon(notification.type)}
              <h2 className="text-xl font-semibold text-gray-900">{notification.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex items-center space-x-4">
              <span className={`px-2 py-1 text-xs font-medium rounded ${getPriorityColor(notification.priority)}`}>
                {notification.priority}
              </span>
              <span className="text-sm text-gray-500">
                {notification.timestamp.toLocaleString()}
              </span>
              {notification.applicationId && (
                <span className="text-sm text-gray-500">
                  App ID: {notification.applicationId}
                </span>
              )}
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-700">{notification.message}</p>
            </div>

            {notification.actionRequired && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Action Required</h3>
                <p className="text-sm text-gray-600 mb-3">
                  This notification requires your attention to proceed with your application.
                </p>
                <Link
                  to={notification.actionLink}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {notification.actionText}
                </Link>
              </div>
            )}

            <div className="flex space-x-3">
              {!notification.read && (
                <button
                  onClick={() => {
                    markAsRead(notification.id);
                    onClose();
                  }}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  Mark as Read
                </button>
              )}
              <button
                onClick={() => {
                  deleteNotification(notification.id);
                  onClose();
                }}
                className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50"
              >
                Delete
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="flex items-center space-x-2">
                <Bell className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">Notifications</span>
              </Link>
              {unreadCount > 0 && (
                <span className="px-2 py-1 bg-red-600 text-white text-xs font-medium rounded-full">
                  {unreadCount} unread
                </span>
              )}
              {urgentCount > 0 && (
                <span className="px-2 py-1 bg-orange-600 text-white text-xs font-medium rounded-full">
                  {urgentCount} urgent
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 disabled:opacity-50"
              >
                Mark All Read
              </button>
              <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user?.firstName?.charAt(0) || 'U'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="info">Info</option>
              <option value="error">Error</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Priorities</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            <button
              onClick={() => {
                setSearchTerm('');
                setTypeFilter('all');
                setStatusFilter('all');
                setPriorityFilter('all');
              }}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white rounded-lg border p-12 text-center">
              <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications found</h3>
              <p className="text-gray-600">Try adjusting your filters or check back later for new notifications.</p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-lg border p-6 hover:shadow-md transition-shadow ${getNotificationColor(notification.type, notification.read)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      {getNotificationIcon(notification.type)}
                      <h3 className={`text-lg font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                    </div>

                    <div className="flex items-center space-x-4 mb-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded ${getPriorityColor(notification.priority)}`}>
                        {notification.priority}
                      </span>
                      <span className="flex items-center text-sm text-gray-500">
                        {getCategoryIcon(notification.category)}
                        <span className="ml-1">{notification.category.replace('_', ' ')}</span>
                      </span>
                      {notification.applicationId && (
                        <span className="text-sm text-gray-500">
                          {notification.applicationId}
                        </span>
                      )}
                    </div>

                    <p className={`text-sm mb-4 ${!notification.read ? 'text-gray-700' : 'text-gray-600'}`}>
                      {notification.message}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-xs text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        {notification.timestamp.toLocaleString()}
                      </span>

                      {notification.actionRequired && (
                        <Link
                          to={notification.actionLink}
                          className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                        >
                          {notification.actionText}
                        </Link>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => setSelectedNotification(notification)}
                      className="p-2 text-gray-400 hover:text-gray-600"
                      title="View Details"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-2 text-gray-400 hover:text-gray-600"
                        title="Mark as Read"
                      >
                        <CheckCircle className="h-5 w-5" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-2 text-gray-400 hover:text-red-600"
                      title="Delete"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Back to Dashboard */}
        <div className="mt-8 text-center">
          <Link
            to="/dashboard"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Notification Detail Modal */}
      {selectedNotification && (
        <NotificationModal
          notification={selectedNotification}
          onClose={() => setSelectedNotification(null)}
        />
      )}
    </div>
  );
};

export default NotificationCenter;
