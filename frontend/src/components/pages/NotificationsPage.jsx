import { useState, useEffect } from 'react';
import { 
  Bell,
  Check,
  X,
  Filter,
  Search,
  MoreVertical,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  User,
  Car,
  FileText,
  Settings,
  Trash2,
  Archive
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const NotificationsPage = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedNotifications, setSelectedNotifications] = useState([]);

  // Mock notification data
  const mockNotifications = [
    {
      id: 'NOT-001',
      type: 'transfer_update',
      title: 'Transfer Application Approved',
      message: 'Your vehicle transfer application for ABC-1234 has been approved and is now in processing.',
      status: 'unread',
      priority: 'high',
      timestamp: '2025-01-16T10:30:00Z',
      relatedEntity: {
        type: 'transfer',
        id: 'TRA-2025-001',
        data: { vehicleRegNo: 'ABC-1234', newOwner: 'Nimal Silva' }
      },
      actions: ['view_transfer', 'mark_read']
    },
    {
      id: 'NOT-002',
      type: 'document_required',
      title: 'Additional Documents Required',
      message: 'Please upload the missing insurance certificate for your transfer application XYZ-5678.',
      status: 'unread',
      priority: 'medium',
      timestamp: '2025-01-16T09:15:00Z',
      relatedEntity: {
        type: 'transfer',
        id: 'TRA-2025-002',
        data: { vehicleRegNo: 'XYZ-5678', missingDocs: ['insurance'] }
      },
      actions: ['upload_documents', 'mark_read']
    },
    {
      id: 'NOT-003',
      type: 'payment_reminder',
      title: 'Payment Pending',
      message: 'Transfer fee payment of LKR 8,500 is pending for your application. Please complete payment to proceed.',
      status: 'read',
      priority: 'high',
      timestamp: '2025-01-15T16:45:00Z',
      relatedEntity: {
        type: 'payment',
        id: 'PAY-2025-001',
        data: { amount: 8500, transferId: 'TRA-2025-002' }
      },
      actions: ['make_payment', 'mark_read']
    },
    {
      id: 'NOT-004',
      type: 'system_maintenance',
      title: 'Scheduled System Maintenance',
      message: 'The system will be under maintenance on Jan 20, 2025 from 2:00 AM to 4:00 AM. Services will be temporarily unavailable.',
      status: 'read',
      priority: 'low',
      timestamp: '2025-01-14T14:20:00Z',
      relatedEntity: {
        type: 'system',
        id: 'MAINT-2025-001',
        data: { startTime: '2025-01-20T02:00:00Z', endTime: '2025-01-20T04:00:00Z' }
      },
      actions: ['mark_read']
    },
    {
      id: 'NOT-005',
      type: 'vehicle_expiry',
      title: 'Vehicle Registration Expiring Soon',
      message: 'Your vehicle registration for GHI-3456 will expire on Feb 15, 2025. Please renew to avoid complications.',
      status: 'unread',
      priority: 'medium',
      timestamp: '2025-01-14T11:30:00Z',
      relatedEntity: {
        type: 'vehicle',
        id: 'VEH-004',
        data: { vehicleRegNo: 'GHI-3456', expiryDate: '2025-02-15' }
      },
      actions: ['renew_registration', 'mark_read']
    },
    {
      id: 'NOT-006',
      type: 'transfer_completed',
      title: 'Transfer Successfully Completed',
      message: 'The ownership transfer for vehicle DEF-9012 to Ruwan Jayasinghe has been completed successfully.',
      status: 'read',
      priority: 'low',
      timestamp: '2025-01-14T08:15:00Z',
      relatedEntity: {
        type: 'transfer',
        id: 'TRA-2025-003',
        data: { vehicleRegNo: 'DEF-9012', newOwner: 'Ruwan Jayasinghe' }
      },
      actions: ['download_certificate', 'mark_read']
    }
  ];

  const notificationTypes = [
    { value: 'all', label: 'All Types', count: mockNotifications.length },
    { value: 'transfer_update', label: 'Transfer Updates', count: 2 },
    { value: 'document_required', label: 'Document Requests', count: 1 },
    { value: 'payment_reminder', label: 'Payment Reminders', count: 1 },
    { value: 'vehicle_expiry', label: 'Vehicle Expiry', count: 1 },
    { value: 'system_maintenance', label: 'System Updates', count: 1 }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status', count: mockNotifications.length },
    { value: 'unread', label: 'Unread', count: 3 },
    { value: 'read', label: 'Read', count: 3 }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setNotifications(mockNotifications);
      setFilteredNotifications(mockNotifications);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = notifications.filter(notification => {
      const matchesSearch = 
        notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.message.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = typeFilter === 'all' || notification.type === typeFilter;
      const matchesStatus = statusFilter === 'all' || notification.status === statusFilter;
      
      return matchesSearch && matchesType && matchesStatus;
    });

    // Sort by timestamp (newest first)
    filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    setFilteredNotifications(filtered);
  }, [notifications, searchTerm, typeFilter, statusFilter]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'transfer_update':
      case 'transfer_completed':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'document_required':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'payment_reminder':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'vehicle_expiry':
        return <Car className="h-5 w-5 text-orange-500" />;
      case 'system_maintenance':
        return <Settings className="h-5 w-5 text-gray-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500 bg-red-50';
      case 'medium':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'low':
        return 'border-l-gray-500 bg-gray-50';
      default:
        return 'border-l-gray-500 bg-white';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else if (diffInHours < 168) { // 7 days
      return `${Math.floor(diffInHours / 24)} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === notificationId 
        ? { ...notif, status: 'read' }
        : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, status: 'read' })));
  };

  const deleteNotification = (notificationId) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
  };

  const handleBulkAction = (action) => {
    if (action === 'mark_read') {
      setNotifications(prev => prev.map(notif => 
        selectedNotifications.includes(notif.id)
          ? { ...notif, status: 'read' }
          : notif
      ));
    } else if (action === 'delete') {
      setNotifications(prev => prev.filter(notif => !selectedNotifications.includes(notif.id)));
    }
    setSelectedNotifications([]);
  };

  const toggleSelectNotification = (notificationId) => {
    setSelectedNotifications(prev => 
      prev.includes(notificationId)
        ? prev.filter(id => id !== notificationId)
        : [...prev, notificationId]
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading notifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
              <p className="mt-2 text-gray-600">
                Stay updated with your transfer applications and system alerts
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <button
                onClick={markAllAsRead}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark All Read
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-blue-100">
                <Bell className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Notifications</p>
                <p className="text-2xl font-bold text-gray-900">{notifications.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-yellow-100">
                <AlertCircle className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Unread</p>
                <p className="text-2xl font-bold text-gray-900">
                  {notifications.filter(n => n.status === 'unread').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-red-100">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">High Priority</p>
                <p className="text-2xl font-bold text-gray-900">
                  {notifications.filter(n => n.priority === 'high').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {notificationTypes.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label} ({option.count})
                  </option>
                ))}
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label} ({option.count})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedNotifications.length > 0 && (
            <div className="mt-4 flex items-center justify-between bg-blue-50 p-3 rounded-lg">
              <span className="text-sm text-blue-700">
                {selectedNotifications.length} notification(s) selected
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleBulkAction('mark_read')}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                >
                  Mark as Read
                </button>
                <button
                  onClick={() => handleBulkAction('delete')}
                  className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`bg-white rounded-lg shadow-sm border-l-4 ${getPriorityColor(notification.priority)} ${
                notification.status === 'unread' ? 'border-r-4 border-r-blue-500' : ''
              }`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <input
                      type="checkbox"
                      checked={selectedNotifications.includes(notification.id)}
                      onChange={() => toggleSelectNotification(notification.id)}
                      className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <div className="flex-shrink-0">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900">
                          {notification.title}
                          {notification.status === 'unread' && (
                            <span className="ml-2 inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                          )}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            notification.priority === 'high' ? 'bg-red-100 text-red-800' :
                            notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {notification.priority.toUpperCase()}
                          </span>
                          <button className="text-gray-400 hover:text-gray-600">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <p className="mt-2 text-gray-600">{notification.message}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatTimestamp(notification.timestamp)}
                        </div>
                        <div className="flex space-x-2">
                          {notification.status === 'unread' && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="text-sm text-blue-600 hover:text-blue-800"
                            >
                              Mark as Read
                            </button>
                          )}
                          <button className="text-sm text-blue-600 hover:text-blue-800">
                            View Details
                          </button>
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="text-sm text-red-600 hover:text-red-800"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredNotifications.length === 0 && (
          <div className="text-center py-12">
            <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications found</h3>
            <p className="text-gray-600">
              {searchTerm || typeFilter !== 'all' || statusFilter !== 'all'
                ? 'Try adjusting your search or filter criteria.'
                : 'You\'re all caught up! No new notifications at this time.'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
