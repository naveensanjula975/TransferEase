import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Users, 
  FileText, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter,
  Search,
  Download,
  Settings,
  User,
  Car,
  Eye,
  MoreVertical
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { DocumentAdminDashboard } from '../forms';

const AdminPortal = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock administrative data
  const adminStats = {
    totalTransfers: 1247,
    pendingApprovals: 23,
    completedToday: 15,
    rejectedToday: 2,
    activeUsers: 8943,
    systemUptime: 99.8
  };

  const pendingApprovals = [
    {
      id: 'VT20250004',
      applicant: 'Saman Perera',
      vehicleRegNo: 'DEF-4567',
      vehicleMake: 'Honda',
      vehicleModel: 'Fit',
      submittedDate: '2025-01-30',
      priority: 'high',
      transferType: 'sale',
      newOwner: 'Ravi Silva',
      documentsComplete: true,
      paymentStatus: 'completed',
      estimatedValue: 2500000
    },
    {
      id: 'VT20250005',
      applicant: 'Kamala Jayawardena',
      vehicleRegNo: 'GHI-7890',
      vehicleMake: 'Toyota',
      vehicleModel: 'Prius',
      submittedDate: '2025-01-30',
      priority: 'urgent',
      transferType: 'inheritance',
      newOwner: 'Sunil Jayawardena',
      documentsComplete: false,
      paymentStatus: 'pending',
      estimatedValue: 3200000
    },
    {
      id: 'VT20250006',
      applicant: 'Nimal Fernando',
      vehicleRegNo: 'JKL-1234',
      vehicleMake: 'Nissan',
      vehicleModel: 'Leaf',
      submittedDate: '2025-01-29',
      priority: 'medium',
      transferType: 'gift',
      newOwner: 'Priya Fernando',
      documentsComplete: true,
      paymentStatus: 'completed',
      estimatedValue: 1800000
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'approval',
      message: 'Transfer VT20250003 approved by Admin Officer',
      timestamp: '10 minutes ago',
      user: 'Priyanka Silva'
    },
    {
      id: 2,
      type: 'rejection',
      message: 'Transfer VT20250002 rejected - incomplete documents',
      timestamp: '25 minutes ago',
      user: 'Rohan Fernando'
    },
    {
      id: 3,
      type: 'registration',
      message: 'New user registered: john.smith@email.com',
      timestamp: '1 hour ago',
      user: 'System'
    },
    {
      id: 4,
      type: 'payment',
      message: 'Payment received for transfer VT20250004',
      timestamp: '2 hours ago',
      user: 'Payment Gateway'
    }
  ];

  const systemAlerts = [
    {
      id: 1,
      type: 'warning',
      title: 'High Volume Alert',
      message: 'Transfer applications are 30% above normal levels',
      severity: 'medium',
      timestamp: '1 hour ago'
    },
    {
      id: 2,
      type: 'info',
      title: 'System Maintenance',
      message: 'Scheduled maintenance planned for this weekend',
      severity: 'low',
      timestamp: '6 hours ago'
    },
    {
      id: 3,
      type: 'success',
      title: 'Performance Update',
      message: 'System response time improved by 15%',
      severity: 'low',
      timestamp: '1 day ago'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'approval': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'rejection': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'registration': return <User className="h-4 w-4 text-blue-600" />;
      case 'payment': return <FileText className="h-4 w-4 text-purple-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const OverviewSection = () => (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-red-100 text-lg">
          Monitor and manage the TransferEase system operations
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Total Transfers</p>
              <p className="text-xl font-bold text-gray-900">{adminStats.totalTransfers.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Clock className="h-5 w-5 text-orange-600" />
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Pending</p>
              <p className="text-xl font-bold text-orange-600">{adminStats.pendingApprovals}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Completed Today</p>
              <p className="text-xl font-bold text-green-600">{adminStats.completedToday}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Rejected Today</p>
              <p className="text-xl font-bold text-red-600">{adminStats.rejectedToday}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Active Users</p>
              <p className="text-xl font-bold text-purple-600">{adminStats.activeUsers.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Uptime</p>
              <p className="text-xl font-bold text-green-600">{adminStats.systemUptime}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Approvals and System Alerts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pending Approvals */}
        <div className="lg:col-span-2 bg-white rounded-lg border">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Pending Approvals</h2>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Filter className="h-4 w-4" />
                </button>
                <Link 
                  to="/admin/transfers" 
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View All
                </Link>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {pendingApprovals.map((approval) => (
                <div key={approval.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="font-medium text-gray-900">
                          {approval.vehicleMake} {approval.vehicleModel}
                        </span>
                        <span className="text-gray-500">({approval.vehicleRegNo})</span>
                        <span className={`px-2 py-1 text-xs font-medium rounded border ${getPriorityColor(approval.priority)}`}>
                          {approval.priority}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">From:</span> {approval.applicant}
                        </div>
                        <div>
                          <span className="font-medium">To:</span> {approval.newOwner}
                        </div>
                        <div>
                          <span className="font-medium">Type:</span> {approval.transferType}
                        </div>
                        <div>
                          <span className="font-medium">Submitted:</span> {approval.submittedDate}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 mt-2 text-xs">
                        <span className={`flex items-center ${approval.documentsComplete ? 'text-green-600' : 'text-red-600'}`}>
                          {approval.documentsComplete ? <CheckCircle className="h-3 w-3 mr-1" /> : <AlertTriangle className="h-3 w-3 mr-1" />}
                          Documents {approval.documentsComplete ? 'Complete' : 'Incomplete'}
                        </span>
                        <span className={`flex items-center ${approval.paymentStatus === 'completed' ? 'text-green-600' : 'text-orange-600'}`}>
                          {approval.paymentStatus === 'completed' ? <CheckCircle className="h-3 w-3 mr-1" /> : <Clock className="h-3 w-3 mr-1" />}
                          Payment {approval.paymentStatus}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700">
                        Approve
                      </button>
                      <button className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700">
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* System Alerts */}
        <div className="bg-white rounded-lg border">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">System Alerts</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {systemAlerts.map((alert) => (
                <div 
                  key={alert.id} 
                  className={`p-4 rounded-lg border-l-4 ${
                    alert.type === 'warning' ? 'border-yellow-400 bg-yellow-50' :
                    alert.type === 'info' ? 'border-blue-400 bg-blue-50' :
                    'border-green-400 bg-green-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{alert.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                      <p className="text-xs text-gray-500 mt-2">{alert.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg border">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <div className="flex items-center mt-1 text-xs text-gray-500">
                    <span>{activity.user}</span>
                    <span className="mx-1">•</span>
                    <span>{activity.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Administrative Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button 
            onClick={() => setActiveSection('documents')}
            className="p-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-left"
          >
            <FileText className="h-8 w-8 mb-4" />
            <h3 className="font-semibold mb-2">Document Management</h3>
            <p className="text-sm opacity-90">Review and verify submitted documents</p>
          </button>
          
          <Link
            to="/admin/transfers"
            className="p-6 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-left block"
          >
            <Car className="h-8 w-8 mb-4" />
            <h3 className="font-semibold mb-2">Transfer Management</h3>
            <p className="text-sm opacity-90">Manage vehicle transfer applications</p>
          </Link>
          
          <Link
            to="/admin/statistics"
            className="p-6 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-left block"
          >
            <TrendingUp className="h-8 w-8 mb-4" />
            <h3 className="font-semibold mb-2">Analytics</h3>
            <p className="text-sm opacity-90">View system analytics and reports</p>
          </Link>
          
          <Link
            to="/admin/settings"
            className="p-6 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-left block"
          >
            <Settings className="h-8 w-8 mb-4" />
            <h3 className="font-semibold mb-2">System Settings</h3>
            <p className="text-sm opacity-90">Configure system parameters</p>
          </Link>
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
              <Link to="/admin/dashboard" className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-red-600" />
                <span className="text-xl font-bold text-gray-900">TransferEase Admin</span>
              </Link>
              
              <nav className="hidden md:flex space-x-8">
                <button
                  onClick={() => setActiveSection('overview')}
                  className={`px-3 py-2 text-sm font-medium ${
                    activeSection === 'overview' 
                      ? 'text-red-600 border-b-2 border-red-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveSection('documents')}
                  className={`px-3 py-2 text-sm font-medium ${
                    activeSection === 'documents' 
                      ? 'text-red-600 border-b-2 border-red-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Documents
                </button>
                <Link
                  to="/admin/transfers"
                  className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  Transfers
                </Link>
                <Link
                  to="/admin/statistics"
                  className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  Analytics
                </Link>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 text-sm"
                />
              </div>
              <Link
                to="/admin/settings"
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <Settings className="h-5 w-5" />
              </Link>
              <div className="h-8 w-8 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user?.firstName?.charAt(0) || 'A'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeSection === 'overview' && <OverviewSection />}
        {activeSection === 'documents' && <DocumentAdminDashboard />}
      </div>
    </div>
  );
};

export default AdminPortal;
