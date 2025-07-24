import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const UserProfile = () => {
  const { user, logout } = useAuth();
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data for vehicle transfers
  const vehicleTransfers = [
    {
      id: 1,
      vehicleNumber: 'CAX-5603',
      type: 'Vehicle Transfer',
      activity: 'activity from april 14',
      status: 'pending'
    },
    {
      id: 2,
      vehicleNumber: 'ABC-8912',
      type: 'Vehicle Transfer',
      activity: 'activity from april 14',
      status: 'pending'
    },
    {
      id: 3,
      vehicleNumber: 'JT-4826',
      type: 'Vehicle Transfer',
      activity: 'activity from april 14',
      status: 'pending'
    }
  ];

  // Mock data for user vehicles
  const userVehicles = [
    {
      id: 1,
      model: 'Mini Cooper',
      type: 'Hatchback',
      users: '1 User',
      image: '/src/assets/mini-cooper.png'
    },
    {
      id: 2,
      model: 'Mini Cooper',
      type: 'Hatchback',
      users: '1 User',
      image: '/src/assets/mini-cooper.png'
    },
    {
      id: 3,
      model: 'Mini Cooper',
      type: 'Hatchback',
      users: '1 User',
      image: '/src/assets/mini-cooper.png'
    },
    {
      id: 4,
      model: 'Mini Cooper',
      type: 'Hatchback',
      users: '1 User',
      image: '/src/assets/mini-cooper.png'
    }
  ];

  const handleAccept = (id) => {
    console.log('Accepted transfer:', id);
    // Handle accept logic
  };

  const handleReject = (id) => {
    console.log('Rejected transfer:', id);
    // Handle reject logic
  };

  const handleRequestTransfer = () => {
    if (registrationNumber.trim()) {
      console.log('Requesting transfer for:', registrationNumber);
      // Handle transfer request logic
      setRegistrationNumber('');
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'notification', label: 'Notification', icon: '🔔' },
    { id: 'security', label: 'Security', icon: '🔒' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
    { id: 'help', label: 'Help', icon: '❓' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        {/* Header */}
        <div className="bg-gray-800 text-white p-4">
          <h1 className="text-xl font-bold">TransferEase</h1>
        </div>

        {/* User Profile Section */}
        <div className="p-6 border-b">
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
            </div>
            <h3 className="font-semibold text-gray-800">
              {user?.name || 'Kumara Sangakkara'}
            </h3>
            <p className="text-sm text-gray-600">
              {user?.nic || '952378652v'}
            </p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-6 left-4 right-4">
          <button
            onClick={logout}
            className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
          >
            <span>🚪</span>
            <span>Log out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {activeTab === 'dashboard' && (
          <>
            {/* User Profile Header */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">User Profile</h2>
            </div>

            {/* Vehicle Transfer Requests */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {vehicleTransfers.map((transfer) => (
                <div key={transfer.id} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">🚗</span>
                      <div>
                        <p className="text-sm text-gray-600">{transfer.type}</p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">⋮</button>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {transfer.vehicleNumber}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-4">{transfer.activity}</p>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleAccept(transfer.id)}
                      className="px-4 py-2 bg-green-500 text-white text-sm rounded-md hover:bg-green-600 transition-colors"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(transfer.id)}
                      className="px-4 py-2 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                  
                  <button className="w-full mt-4 text-gray-600 text-sm flex items-center justify-center space-x-1 hover:text-gray-800">
                    <span>View Details</span>
                    <span>→</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Transfer Request Section */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <p className="text-gray-700 mb-4">
                Welcome to our vehicle transfer request service! Please insert the registration number of your requesting vehicle here to start the smooth transition of your vehicle's ownership. Afterward, the owner of the vehicle will concern on your request.
              </p>
              
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vehicle Registration Number
                  </label>
                  <input
                    type="text"
                    value={registrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                    placeholder="CAX-5678"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={handleRequestTransfer}
                    className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center space-x-2"
                  >
                    <span>Request Transfer</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>

            {/* My Vehicles Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-6">My Vehicles</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {userVehicles.map((vehicle) => (
                  <div key={vehicle.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-800">{vehicle.model}</h4>
                      <button className="text-gray-400 hover:text-red-500">♡</button>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">{vehicle.type}</p>
                    
                    <div className="w-full h-32 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                      <span className="text-4xl">🚗</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <span>👤</span>
                        <span>{vehicle.users}</span>
                      </div>
                      <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center space-x-1">
                        <span>Details</span>
                        <span>→</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Other Tab Content */}
        {activeTab === 'notification' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Notifications</h2>
            <p className="text-gray-600">Your notifications will appear here.</p>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Security</h2>
            <p className="text-gray-600">Security settings and options.</p>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Settings</h2>
            <p className="text-gray-600">Application settings and preferences.</p>
          </div>
        )}

        {activeTab === 'help' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Help</h2>
            <p className="text-gray-600">Help and support information.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
