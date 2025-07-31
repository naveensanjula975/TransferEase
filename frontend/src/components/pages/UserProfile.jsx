import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  User,
  Edit,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Car,
  FileText,
  Shield,
  Award,
  Clock,
  CheckCircle,
  TrendingUp,
  Settings,
  Camera,
  Download,
  Eye,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const UserProfile = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock user profile data
  const mockProfile = {
    id: 'USR-001',
    name: 'Kasun Perera',
    email: 'kasun.perera@email.com',
    phone: '+94 77 123 4567',
    nic: '952341234V',
    address: '123, Main Street, Colombo 03',
    district: 'Colombo',
    province: 'Western',
    dateOfBirth: '1995-04-15',
    joinDate: '2023-06-15',
    profilePicture: null,
    status: 'verified',
    accountType: 'individual',
    lastLogin: '2025-01-16T10:30:00Z',
    
    // Statistics
    stats: {
      totalVehicles: 4,
      totalTransfers: 7,
      completedTransfers: 5,
      pendingTransfers: 2,
      totalRevenue: 0, // For admin view
      registrationDate: '2023-06-15'
    },

    // Vehicles
    vehicles: [
      {
        id: 'VEH-001',
        registrationNo: 'ABC-1234',
        make: 'Toyota',
        model: 'Aqua',
        year: 2018,
        status: 'transferred',
        transferDate: '2025-01-15'
      },
      {
        id: 'VEH-002',
        registrationNo: 'XYZ-5678',
        make: 'Honda',
        model: 'Vezel',
        year: 2019,
        status: 'active',
        transferDate: null
      },
      {
        id: 'VEH-003',
        registrationNo: 'DEF-9012',
        make: 'Nissan',
        model: 'March',
        year: 2020,
        status: 'transferred',
        transferDate: '2025-01-14'
      },
      {
        id: 'VEH-004',
        registrationNo: 'GHI-3456',
        make: 'Suzuki',
        model: 'Alto',
        year: 2017,
        status: 'expired',
        transferDate: null
      }
    ],

    // Recent transfers
    recentTransfers: [
      {
        id: 'TRA-2025-001',
        vehicleRegNo: 'ABC-1234',
        type: 'sale',
        status: 'under_review',
        newOwner: 'Nimal Silva',
        submittedDate: '2025-01-15',
        amount: 8500
      },
      {
        id: 'TRA-2025-002',
        vehicleRegNo: 'XYZ-5678',
        type: 'gift',
        status: 'payment_pending',
        newOwner: 'Saman Fernando',
        submittedDate: '2025-01-10',
        amount: 8500
      },
      {
        id: 'TRA-2025-003',
        vehicleRegNo: 'DEF-9012',
        type: 'sale',
        status: 'completed',
        newOwner: 'Ruwan Jayasinghe',
        submittedDate: '2025-01-05',
        amount: 8500
      }
    ],

    // Documents
    documents: {
      nic: { status: 'verified', uploadDate: '2023-06-15', expiry: null },
      license: { status: 'verified', uploadDate: '2023-06-15', expiry: '2028-06-15' },
      addressProof: { status: 'verified', uploadDate: '2023-06-15', expiry: null },
      bankStatement: { status: 'pending', uploadDate: '2025-01-10', expiry: null }
    },

    // Activity log
    recentActivity: [
      {
        id: 'ACT-001',
        type: 'transfer_submitted',
        description: 'Submitted transfer application for ABC-1234',
        timestamp: '2025-01-15T14:30:00Z'
      },
      {
        id: 'ACT-002',
        type: 'document_uploaded',
        description: 'Uploaded bank statement',
        timestamp: '2025-01-10T09:15:00Z'
      },
      {
        id: 'ACT-003',
        type: 'transfer_completed',
        description: 'Transfer for DEF-9012 completed successfully',
        timestamp: '2025-01-05T16:20:00Z'
      },
      {
        id: 'ACT-004',
        type: 'profile_updated',
        description: 'Updated profile information',
        timestamp: '2025-01-01T11:45:00Z'
      }
    ],

    // Achievements/Badges
    achievements: [
      {
        id: 'first_transfer',
        name: 'First Transfer',
        description: 'Completed your first vehicle transfer',
        icon: '🚗',
        earnedDate: '2023-08-20'
      },
      {
        id: 'verified_user',
        name: 'Verified User',
        description: 'Successfully verified all required documents',
        icon: '✅',
        earnedDate: '2023-06-20'
      },
      {
        id: 'multiple_vehicles',
        name: 'Vehicle Collector',
        description: 'Registered 3+ vehicles',
        icon: '🏆',
        earnedDate: '2024-03-15'
      }
    ]
  };

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setUserProfile(mockProfile);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'expired':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <User className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified':
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
      case 'under_review':
      case 'payment_pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'expired':
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'active':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="relative">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                  {userProfile.profilePicture ? (
                    <img 
                      src={userProfile.profilePicture} 
                      alt="Profile" 
                      className="w-24 h-24 rounded-full object-cover" 
                    />
                  ) : (
                    <User className="w-12 h-12 text-gray-500" />
                  )}
                </div>
                <button className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 shadow-lg">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex-1 text-white">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-2xl sm:text-3xl font-bold">{userProfile.name}</h1>
                  {getStatusIcon(userProfile.status)}
                </div>
                <p className="text-blue-100 mb-1">{userProfile.email}</p>
                <p className="text-blue-100 text-sm">
                  Member since {formatDate(userProfile.joinDate)}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(userProfile.status)}`}>
                    {userProfile.status.toUpperCase()}
                  </span>
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-white bg-opacity-20 text-white">
                    {userProfile.accountType.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="flex space-x-3">
                <Link
                  to="/settings"
                  className="flex items-center px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profile
                </Link>
                <button className="flex items-center px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors">
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </button>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="w-4 h-4 mr-2" />
                {userProfile.phone}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                {userProfile.district}, {userProfile.province}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                Last login: {new Date(userProfile.lastLogin).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100">
                <Car className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Vehicles</p>
                <p className="text-2xl font-bold text-gray-900">{userProfile.stats.totalVehicles}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Transfers</p>
                <p className="text-2xl font-bold text-gray-900">{userProfile.stats.totalTransfers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100">
                <CheckCircle className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{userProfile.stats.completedTransfers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{userProfile.stats.pendingTransfers}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: TrendingUp },
                { id: 'vehicles', label: 'Vehicles', icon: Car },
                { id: 'transfers', label: 'Transfers', icon: FileText },
                { id: 'documents', label: 'Documents', icon: Shield },
                { id: 'activity', label: 'Activity', icon: Clock }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === 'overview' && (
              <>
                {/* Recent Transfers */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Recent Transfers</h3>
                    <Link to="/transfers" className="text-sm text-blue-600 hover:text-blue-800">
                      View all
                    </Link>
                  </div>
                  <div className="space-y-4">
                    {userProfile.recentTransfers.slice(0, 3).map((transfer) => (
                      <div key={transfer.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Car className="h-8 w-8 text-gray-400" />
                          <div>
                            <p className="font-medium text-gray-900">{transfer.vehicleRegNo}</p>
                            <p className="text-sm text-gray-500">To: {transfer.newOwner}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(transfer.status)}`}>
                            {transfer.status.replace('_', ' ').toUpperCase()}
                          </span>
                          <p className="text-sm text-gray-500 mt-1">
                            {formatDate(transfer.submittedDate)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Achievements</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {userProfile.achievements.map((achievement) => (
                      <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div>
                          <p className="font-medium text-gray-900">{achievement.name}</p>
                          <p className="text-sm text-gray-500">{achievement.description}</p>
                          <p className="text-xs text-gray-400">Earned {formatDate(achievement.earnedDate)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'vehicles' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">My Vehicles</h3>
                  <Link to="/vehicles" className="text-sm text-blue-600 hover:text-blue-800">
                    Manage vehicles
                  </Link>
                </div>
                <div className="space-y-4">
                  {userProfile.vehicles.map((vehicle) => (
                    <div key={vehicle.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Car className="h-8 w-8 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900">{vehicle.registrationNo}</p>
                          <p className="text-sm text-gray-500">{vehicle.make} {vehicle.model} ({vehicle.year})</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(vehicle.status)}`}>
                          {vehicle.status.toUpperCase()}
                        </span>
                        {vehicle.transferDate && (
                          <p className="text-sm text-gray-500 mt-1">
                            Transferred: {formatDate(vehicle.transferDate)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {userProfile.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 border-l-2 border-blue-200 bg-blue-50 rounded-r-lg">
                      <Clock className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{activity.description}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(activity.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to="/transfer"
                  className="flex items-center w-full px-4 py-3 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <FileText className="w-4 h-4 mr-3" />
                  Start New Transfer
                </Link>
                <Link
                  to="/vehicles"
                  className="flex items-center w-full px-4 py-3 text-sm bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Car className="w-4 h-4 mr-3" />
                  View My Vehicles
                </Link>
                <Link
                  to="/downloads"
                  className="flex items-center w-full px-4 py-3 text-sm bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Download className="w-4 h-4 mr-3" />
                  Download Documents
                </Link>
              </div>
            </div>

            {/* Document Status */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Document Status</h3>
              <div className="space-y-3">
                {Object.entries(userProfile.documents).map(([type, doc]) => (
                  <div key={type} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Shield className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-700 capitalize">
                        {type.replace(/([A-Z])/g, ' $1').toLowerCase()}
                      </span>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(doc.status)}`}>
                      {doc.status.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
              <Link
                to="/settings"
                className="mt-4 w-full flex items-center justify-center px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <Eye className="w-4 h-4 mr-2" />
                Manage Documents
              </Link>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  <span>{userProfile.nic}</span>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-4 h-4 mr-2 mt-0.5" />
                  <span>{userProfile.address}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Born {formatDate(userProfile.dateOfBirth)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
