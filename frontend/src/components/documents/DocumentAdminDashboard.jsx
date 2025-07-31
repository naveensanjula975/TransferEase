import { useState } from 'react';
import { 
  FileText, 
  Users, 
  Clock, 
  CheckCircle, 
  X,
  BarChart3,
  TrendingUp,
  Download,
  Filter
} from 'lucide-react';
import DocumentVerification from './DocumentVerification';
import DocumentTracker from './DocumentTracker';

const DocumentAdminDashboard = () => {
  const [activeView, setActiveView] = useState('overview');
  const [dateRange, setDateRange] = useState('week');

  // Mock statistics data
  const stats = {
    totalDocuments: 245,
    pendingVerification: 18,
    verifiedToday: 32,
    rejectedDocuments: 7,
    averageProcessingTime: 2.3, // hours
    processingRate: 94.2 // percentage
  };

  const documentTypes = [
    { name: 'Vehicle Registration', count: 87, verified: 82, pending: 5 },
    { name: 'Owner NIC', count: 76, verified: 71, pending: 5 },
    { name: 'Sale Agreement', count: 54, verified: 48, pending: 6 },
    { name: 'Insurance', count: 28, verified: 26, pending: 2 }
  ];

  const recentActivity = [
    {
      id: 1,
      action: 'Document Verified',
      document: 'Vehicle Registration - ABC-123',
      officer: 'Priyanka Silva',
      time: '2 minutes ago',
      type: 'verified'
    },
    {
      id: 2,
      action: 'Document Rejected',
      document: 'NIC Copy - Poor Quality',
      officer: 'Rohan Fernando',
      time: '15 minutes ago',
      type: 'rejected'
    },
    {
      id: 3,
      action: 'Document Uploaded',
      document: 'Sale Agreement - XYZ-789',
      officer: 'System',
      time: '23 minutes ago',
      type: 'uploaded'
    },
    {
      id: 4,
      action: 'Document Verified',
      document: 'Insurance Certificate - DEF-456',
      officer: 'Niluka Perera',
      time: '1 hour ago',
      type: 'verified'
    }
  ];

  const workloadDistribution = [
    { officer: 'Priyanka Silva', pending: 5, completed: 23, efficiency: 95 },
    { officer: 'Rohan Fernando', pending: 8, completed: 19, efficiency: 88 },
    { officer: 'Niluka Perera', pending: 3, completed: 25, efficiency: 97 },
    { officer: 'Kasun Rajapaksa', pending: 2, completed: 21, efficiency: 92 }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'verified': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'rejected': return <X className="h-4 w-4 text-red-600" />;
      case 'uploaded': return <FileText className="h-4 w-4 text-blue-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const OverviewDashboard = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Documents</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalDocuments}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600">+12% from last week</span>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Verification</p>
              <p className="text-3xl font-bold text-orange-600">{stats.pendingVerification}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-600">Avg. processing: {stats.averageProcessingTime}h</span>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Verified Today</p>
              <p className="text-3xl font-bold text-green-600">{stats.verifiedToday}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600">{stats.processingRate}% processing rate</span>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rejected Documents</p>
              <p className="text-3xl font-bold text-red-600">{stats.rejectedDocuments}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <X className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-600">Need revision</span>
          </div>
        </div>
      </div>

      {/* Charts and Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Document Types Breakdown */}
        <div className="bg-white rounded-lg border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Document Types</h3>
            <p className="text-gray-600">Breakdown by document type</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {documentTypes.map((type, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{type.name}</span>
                      <span className="text-sm text-gray-500">{type.count} total</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(type.verified / type.count) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>{type.verified} verified</span>
                      <span>{type.pending} pending</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            <p className="text-gray-600">Latest document processing activities</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.document}</p>
                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      <span>{activity.officer}</span>
                      <span className="mx-1">•</span>
                      <span>{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Officer Workload */}
      <div className="bg-white rounded-lg border">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Officer Workload</h3>
              <p className="text-gray-600">Current workload distribution among verification officers</p>
            </div>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <th className="pb-3">Officer</th>
                  <th className="pb-3">Pending</th>
                  <th className="pb-3">Completed</th>
                  <th className="pb-3">Efficiency</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody className="space-y-3">
                {workloadDistribution.map((officer, index) => (
                  <tr key={index} className="border-t">
                    <td className="pt-3">
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                          <Users className="h-4 w-4 text-gray-600" />
                        </div>
                        <span className="font-medium text-gray-900">{officer.officer}</span>
                      </div>
                    </td>
                    <td className="pt-3">
                      <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                        {officer.pending}
                      </span>
                    </td>
                    <td className="pt-3">
                      <span className="text-gray-900 font-medium">{officer.completed}</span>
                    </td>
                    <td className="pt-3">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${officer.efficiency}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600">{officer.efficiency}%</span>
                      </div>
                    </td>
                    <td className="pt-3">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Document Administration</h1>
          <p className="text-gray-600">Manage and monitor document verification processes</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            <Download className="h-4 w-4 mr-2 inline" />
            Export Report
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <BarChart3 className="h-4 w-4 mr-2 inline" />
            Generate Analytics
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveView('overview')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeView === 'overview'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Overview & Analytics
          </button>
          <button
            onClick={() => setActiveView('verification')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeView === 'verification'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Document Verification
          </button>
          <button
            onClick={() => setActiveView('tracking')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeView === 'tracking'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Document Tracking
          </button>
        </nav>
      </div>

      {/* Content */}
      <div>
        {activeView === 'overview' && <OverviewDashboard />}
        {activeView === 'verification' && <DocumentVerification userRole="admin" />}
        {activeView === 'tracking' && <DocumentTracker userRole="admin" />}
      </div>
    </div>
  );
};

export default DocumentAdminDashboard;
