import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Upload, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Car,
  Users,
  TrendingUp,
  Plus,
  Eye,
  Download,
  Bell,
  Settings
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { DocumentUserDashboard } from '../forms';

const VehicleTransferPortal = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');

  // Mock data for vehicle transfer portal
  const transferStats = {
    active: 2,
    completed: 8,
    pending: 1,
    thisMonth: 3
  };

  const recentTransfers = [
    {
      id: 'VT20250001',
      vehicleRegNo: 'ABC-123',
      vehicleMake: 'Toyota',
      vehicleModel: 'Aqua',
      status: 'completed',
      date: '2025-01-30',
      newOwner: 'Ravi Silva',
      type: 'sale'
    },
    {
      id: 'VT20250002',
      vehicleRegNo: 'DEF-456',
      vehicleMake: 'Honda',
      vehicleModel: 'Vezel',
      status: 'pending_payment',
      date: '2025-01-28',
      newOwner: 'Priya Fernando',
      type: 'sale'
    },
    {
      id: 'VT20250003',
      vehicleRegNo: 'GHI-789',
      vehicleMake: 'Nissan',
      vehicleModel: 'March',
      status: 'under_review',
      date: '2025-01-25',
      newOwner: 'Kumara Jayawardena',
      type: 'gift'
    }
  ];

  const quickActions = [
    {
      title: 'Start New Transfer',
      description: 'Begin a new vehicle ownership transfer',
      icon: Plus,
      action: () => navigate('/vehicle-transfer'),
      color: 'bg-blue-600 hover:bg-blue-700',
      urgent: false
    },
    {
      title: 'Upload Documents',
      description: 'Upload required transfer documents',
      icon: Upload,
      action: () => setActiveSection('documents'),
      color: 'bg-green-600 hover:bg-green-700',
      urgent: false
    },
    {
      title: 'View Transfer History',
      description: 'Check your transfer history and status',
      icon: Eye,
      action: () => navigate('/transfers'),
      color: 'bg-purple-600 hover:bg-purple-700',
      urgent: false
    },
    {
      title: 'Download Forms',
      description: 'Get required forms and documents',
      icon: Download,
      action: () => navigate('/downloads'),
      color: 'bg-orange-600 hover:bg-orange-700',
      urgent: false
    }
  ];

  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'Transfer Completed',
      message: 'Vehicle ABC-123 transfer has been successfully completed',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'warning',
      title: 'Document Required',
      message: 'Insurance certificate needed for DEF-456 transfer',
      time: '1 day ago',
      read: false
    },
    {
      id: 3,
      type: 'info',
      title: 'Payment Reminder',
      message: 'Transfer fee payment pending for application VT20250002',
      time: '2 days ago',
      read: true
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'under_review': return 'bg-yellow-100 text-yellow-800';
      case 'pending_payment': return 'bg-orange-100 text-orange-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'under_review': return <Clock className="h-4 w-4" />;
      case 'pending_payment': return <AlertTriangle className="h-4 w-4" />;
      case 'rejected': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const OverviewSection = () => (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.firstName || 'User'}!</h1>
        <p className="text-blue-100 text-lg">
          Manage your vehicle transfers efficiently with our digital platform
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Car className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Transfers</p>
              <p className="text-2xl font-bold text-gray-900">{transferStats.active}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{transferStats.completed}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Review</p>
              <p className="text-2xl font-bold text-gray-900">{transferStats.pending}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">{transferStats.thisMonth}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className={`${action.color} text-white p-6 rounded-lg transition-colors duration-200 text-left`}
            >
              <action.icon className="h-8 w-8 mb-4" />
              <h3 className="font-semibold mb-2">{action.title}</h3>
              <p className="text-sm opacity-90">{action.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Transfers and Notifications Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Transfers */}
        <div className="bg-white rounded-lg border">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Recent Transfers</h2>
              <Link 
                to="/transfers" 
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View All
              </Link>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentTransfers.map((transfer) => (
                <div key={transfer.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="font-medium text-gray-900">
                        {transfer.vehicleMake} {transfer.vehicleModel}
                      </span>
                      <span className="text-gray-500">({transfer.vehicleRegNo})</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      To: {transfer.newOwner} • {transfer.date}
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full flex items-center space-x-1 ${getStatusColor(transfer.status)}`}>
                      {getStatusIcon(transfer.status)}
                      <span>{transfer.status.replace('_', ' ')}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-lg border">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Recent Notifications</h2>
              <Link 
                to="/notifications" 
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View All
              </Link>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-4 rounded-lg border-l-4 ${
                    notification.type === 'success' ? 'border-green-400 bg-green-50' :
                    notification.type === 'warning' ? 'border-yellow-400 bg-yellow-50' :
                    'border-blue-400 bg-blue-50'
                  } ${!notification.read ? 'bg-opacity-100' : 'bg-opacity-50'}`}
                >
                  <div className="flex items-start">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{notification.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-gray-50 rounded-lg p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help?</h2>
          <p className="text-gray-600 mb-6">
            Our support team is here to assist you with your vehicle transfer process
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/downloads"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Download Forms
            </Link>
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center space-x-2">
                <Car className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">TransferEase</span>
              </Link>
              
              <nav className="hidden md:flex space-x-8">
                <button
                  onClick={() => setActiveSection('overview')}
                  className={`px-3 py-2 text-sm font-medium ${
                    activeSection === 'overview' 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveSection('documents')}
                  className={`px-3 py-2 text-sm font-medium ${
                    activeSection === 'documents' 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Documents
                </button>
                <Link
                  to="/transfers"
                  className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  Transfers
                </Link>
                <Link
                  to="/vehicles"
                  className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  Vehicles
                </Link>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell className="h-5 w-5" />
              </button>
              <Link
                to="/settings"
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <Settings className="h-5 w-5" />
              </Link>
              <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user?.firstName?.charAt(0) || 'U'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeSection === 'overview' && <OverviewSection />}
        {activeSection === 'documents' && <DocumentUserDashboard />}
      </div>
    </div>
  );
};

export default VehicleTransferPortal;
