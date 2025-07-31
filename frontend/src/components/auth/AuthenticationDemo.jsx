import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Card, { CardHeader, CardBody } from '../shared/Card';
import { Button } from '../shared';
import { User, Shield, Key, Clock, CheckCircle, XCircle } from 'lucide-react';

const AuthenticationDemo = () => {
  const { user, isAuthenticated, hasPermission, getPermissions, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'permissions', label: 'Permissions', icon: Shield },
    { id: 'session', label: 'Session Info', icon: Key },
    { id: 'features', label: 'Features', icon: CheckCircle }
  ];

  const demoPermissions = [
    'view_profile',
    'update_profile',
    'create_transfer',
    'view_own_transfers',
    'upload_documents',
    'make_payments',
    'view_vehicles',
    'view_all_transfers',
    'approve_transfers',
    'manage_users',
    'view_analytics',
    'system_settings'
  ];

  const authFeatures = [
    {
      title: 'Mock Authentication Service',
      description: 'Complete authentication service with realistic user data',
      status: 'implemented'
    },
    {
      title: 'Role-based Access Control',
      description: 'Different permissions for users and administrators',
      status: 'implemented'
    },
    {
      title: 'Session Management',
      description: 'Token-based sessions with automatic expiry',
      status: 'implemented'
    },
    {
      title: 'Password Security',
      description: 'Password change functionality with validation',
      status: 'implemented'
    },
    {
      title: 'User Registration',
      description: 'Complete registration flow with validation',
      status: 'implemented'
    },
    {
      title: 'Password Reset',
      description: 'Forgot password flow with email simulation',
      status: 'implemented'
    },
    {
      title: 'Profile Management',
      description: 'User profile editing and updates',
      status: 'implemented'
    },
    {
      title: 'Session Timeout',
      description: 'Automatic logout on inactivity with warnings',
      status: 'implemented'
    }
  ];

  if (!isAuthenticated) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardBody padding="lg">
            <div className="text-center space-y-4">
              <XCircle className="w-16 h-16 text-red-500 mx-auto" />
              <h2 className="text-2xl font-bold text-gray-900">Not Authenticated</h2>
              <p className="text-gray-600">Please log in to view the authentication demo.</p>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Demo credentials:</p>
                <div className="bg-blue-50 p-3 rounded-lg text-left max-w-xs mx-auto">
                  <p className="text-xs text-blue-700"><strong>User:</strong> john.doe@email.com / password123</p>
                  <p className="text-xs text-blue-700"><strong>Admin:</strong> admin@dmt.gov.lk / admin123</p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Authentication System Demo</h1>
        <p className="text-gray-600">
          Comprehensive authentication with role-based access control
        </p>
      </div>

      {/* Status Banner */}
      <Card variant="success" className="border-green-200">
        <CardBody padding="default">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <div>
                <h3 className="font-medium text-green-900">Authentication Active</h3>
                <p className="text-sm text-green-700">
                  Logged in as {user.name} ({user.role})
                </p>
              </div>
            </div>
            <Button onClick={logout} variant="outline" size="sm">
              Logout
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            <Card>
              <CardHeader title="User Information" />
              <CardBody>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-600">Name:</span>
                    <span className="text-sm text-gray-900">{user.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-600">Email:</span>
                    <span className="text-sm text-gray-900">{user.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-600">Role:</span>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      user.role === 'admin' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user.role}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-600">NIC:</span>
                    <span className="text-sm text-gray-900">{user.nic}</span>
                  </div>
                  {user.phone && (
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Phone:</span>
                      <span className="text-sm text-gray-900">{user.phone}</span>
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardHeader title="Account Status" />
              <CardBody>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Authenticated:</span>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Account Active:</span>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Email Verified:</span>
                    {user.isVerified ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-yellow-500" />
                    )}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-600">Last Login:</span>
                    <span className="text-sm text-gray-900">
                      {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'N/A'}
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </>
        )}

        {/* Permissions Tab */}
        {activeTab === 'permissions' && (
          <>
            <Card>
              <CardHeader title="User Permissions" />
              <CardBody>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 mb-3">
                    Active permissions for this user:
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    {getPermissions().map((permission) => (
                      <div
                        key={permission}
                        className="flex items-center justify-between p-2 bg-green-50 rounded-lg"
                      >
                        <span className="text-sm font-medium text-green-800">
                          {permission.replace(/_/g, ' ').toUpperCase()}
                        </span>
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                    ))}
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardHeader title="Permission Testing" />
              <CardBody>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 mb-3">
                    Test all possible permissions:
                  </p>
                  <div className="grid grid-cols-1 gap-1 max-h-64 overflow-y-auto">
                    {demoPermissions.map((permission) => (
                      <div
                        key={permission}
                        className={`flex items-center justify-between p-2 rounded-lg ${
                          hasPermission(permission)
                            ? 'bg-green-50 text-green-800'
                            : 'bg-red-50 text-red-800'
                        }`}
                      >
                        <span className="text-xs font-medium">
                          {permission.replace(/_/g, ' ').toUpperCase()}
                        </span>
                        {hasPermission(permission) ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-600" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardBody>
            </Card>
          </>
        )}

        {/* Session Tab */}
        {activeTab === 'session' && (
          <>
            <Card>
              <CardHeader title="Session Details" />
              <CardBody>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-600">Session Type:</span>
                    <span className="text-sm text-gray-900">
                      {user.role === 'admin' ? 'Admin Session' : 'User Session'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-600">Session Duration:</span>
                    <span className="text-sm text-gray-900">
                      {user.role === 'admin' ? '8 hours' : '24 hours'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-600">Inactivity Limit:</span>
                    <span className="text-sm text-gray-900">30 minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-600">Token Storage:</span>
                    <span className="text-sm text-gray-900">localStorage</span>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardHeader title="Security Features" />
              <CardBody>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Auto Logout:</span>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Session Warning:</span>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Token Refresh:</span>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Route Protection:</span>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                </div>
              </CardBody>
            </Card>
          </>
        )}

        {/* Features Tab */}
        {activeTab === 'features' && (
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {authFeatures.map((feature, index) => (
                <Card key={index}>
                  <CardBody>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-gray-900">{feature.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-2">
                          {feature.status}
                        </span>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <Card>
        <CardBody>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" onClick={() => window.location.href = '/profile'}>
              View Profile Settings
            </Button>
            <Button variant="secondary" onClick={() => window.location.href = '/dashboard'}>
              Go to Dashboard
            </Button>
            {user.role === 'admin' && (
              <Button onClick={() => window.location.href = '/admin/dashboard'}>
                Admin Dashboard
              </Button>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default AuthenticationDemo;
