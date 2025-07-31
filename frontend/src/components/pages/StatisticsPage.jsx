import { useState, useEffect } from 'react';
import { 
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Calendar,
  Download,
  Filter,
  Users,
  Car,
  FileText,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const StatisticsPage = () => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('last_30_days');
  const [selectedMetric, setSelectedMetric] = useState('transfers');
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({});

  // Mock statistics data
  const mockStats = {
    overview: {
      totalTransfers: { value: 1247, change: 12.5, trend: 'up' },
      totalVehicles: { value: 8956, change: 5.2, trend: 'up' },
      totalOwners: { value: 5643, change: 8.7, trend: 'up' },
      totalRevenue: { value: 10584000, change: -2.3, trend: 'down' }
    },
    transfers: {
      completed: 856,
      pending: 234,
      rejected: 157,
      daily: [
        { date: '2025-01-01', completed: 12, pending: 8, rejected: 2 },
        { date: '2025-01-02', completed: 15, pending: 6, rejected: 3 },
        { date: '2025-01-03', completed: 18, pending: 12, rejected: 1 },
        { date: '2025-01-04', completed: 14, pending: 9, rejected: 4 },
        { date: '2025-01-05', completed: 20, pending: 15, rejected: 2 },
        { date: '2025-01-06', completed: 16, pending: 7, rejected: 3 },
        { date: '2025-01-07', completed: 22, pending: 11, rejected: 1 }
      ]
    },
    vehicles: {
      byCategory: {
        car: 6234,
        suv: 1456,
        motorcycle: 892,
        van: 374
      },
      byFuelType: {
        petrol: 4567,
        diesel: 2234,
        hybrid: 1890,
        electric: 265
      },
      byYear: {
        '2020-2024': 3456,
        '2015-2019': 2987,
        '2010-2014': 1876,
        '2005-2009': 637
      }
    },
    revenue: {
      monthly: [
        { month: 'Jul 2024', amount: 850000 },
        { month: 'Aug 2024', amount: 920000 },
        { month: 'Sep 2024', amount: 1100000 },
        { month: 'Oct 2024', amount: 950000 },
        { month: 'Nov 2024', amount: 1050000 },
        { month: 'Dec 2024', amount: 1200000 },
        { month: 'Jan 2025', amount: 980000 }
      ],
      byService: {
        transfer_fee: 8500000,
        documentation: 1200000,
        inspection: 684000,
        expedited: 200000
      }
    },
    performance: {
      averageProcessingTime: 7.2, // days
      customerSatisfaction: 4.3, // out of 5
      documentAccuracy: 94.5, // percentage
      systemUptime: 99.8 // percentage
    }
  };

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setStats(mockStats);
      setIsLoading(false);
    }, 1000);
  }, [timeRange]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (value) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  const getTrendIcon = (trend) => {
    return trend === 'up' ? 
      <TrendingUp className="h-4 w-4 text-green-500" /> : 
      <TrendingDown className="h-4 w-4 text-red-500" />;
  };

  const getTrendColor = (trend) => {
    return trend === 'up' ? 'text-green-600' : 'text-red-600';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading statistics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Statistics & Analytics</h1>
              <p className="mt-2 text-gray-600">
                Comprehensive insights into transfer operations and system performance
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="last_7_days">Last 7 Days</option>
                <option value="last_30_days">Last 30 Days</option>
                <option value="last_90_days">Last 90 Days</option>
                <option value="last_year">Last Year</option>
              </select>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Transfers</p>
                <p className="text-2xl font-bold text-gray-900">{stats.overview.totalTransfers.value.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {getTrendIcon(stats.overview.totalTransfers.trend)}
              <span className={`ml-2 text-sm font-medium ${getTrendColor(stats.overview.totalTransfers.trend)}`}>
                {formatPercentage(stats.overview.totalTransfers.change)}
              </span>
              <span className="ml-2 text-sm text-gray-500">vs last period</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Vehicles</p>
                <p className="text-2xl font-bold text-gray-900">{stats.overview.totalVehicles.value.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <Car className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {getTrendIcon(stats.overview.totalVehicles.trend)}
              <span className={`ml-2 text-sm font-medium ${getTrendColor(stats.overview.totalVehicles.trend)}`}>
                {formatPercentage(stats.overview.totalVehicles.change)}
              </span>
              <span className="ml-2 text-sm text-gray-500">vs last period</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Owners</p>
                <p className="text-2xl font-bold text-gray-900">{stats.overview.totalOwners.value.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-full bg-yellow-100">
                <Users className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {getTrendIcon(stats.overview.totalOwners.trend)}
              <span className={`ml-2 text-sm font-medium ${getTrendColor(stats.overview.totalOwners.trend)}`}>
                {formatPercentage(stats.overview.totalOwners.change)}
              </span>
              <span className="ml-2 text-sm text-gray-500">vs last period</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.overview.totalRevenue.value)}</p>
              </div>
              <div className="p-3 rounded-full bg-purple-100">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {getTrendIcon(stats.overview.totalRevenue.trend)}
              <span className={`ml-2 text-sm font-medium ${getTrendColor(stats.overview.totalRevenue.trend)}`}>
                {formatPercentage(stats.overview.totalRevenue.change)}
              </span>
              <span className="ml-2 text-sm text-gray-500">vs last period</span>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Transfer Status Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Transfer Status Distribution</h3>
              <PieChart className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-green-500 mr-3"></div>
                  <span className="text-sm font-medium text-gray-700">Completed</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-gray-900">{stats.transfers.completed}</span>
                  <span className="text-xs text-gray-500 ml-2">
                    ({((stats.transfers.completed / (stats.transfers.completed + stats.transfers.pending + stats.transfers.rejected)) * 100).toFixed(1)}%)
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-yellow-500 mr-3"></div>
                  <span className="text-sm font-medium text-gray-700">Pending</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-gray-900">{stats.transfers.pending}</span>
                  <span className="text-xs text-gray-500 ml-2">
                    ({((stats.transfers.pending / (stats.transfers.completed + stats.transfers.pending + stats.transfers.rejected)) * 100).toFixed(1)}%)
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-red-500 mr-3"></div>
                  <span className="text-sm font-medium text-gray-700">Rejected</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-gray-900">{stats.transfers.rejected}</span>
                  <span className="text-xs text-gray-500 ml-2">
                    ({((stats.transfers.rejected / (stats.transfers.completed + stats.transfers.pending + stats.transfers.rejected)) * 100).toFixed(1)}%)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle Categories Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Vehicle Categories</h3>
              <BarChart3 className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {Object.entries(stats.vehicles.byCategory).map(([category, count]) => (
                <div key={category} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Car className="h-4 w-4 text-gray-400 mr-3" />
                    <span className="text-sm font-medium text-gray-700 capitalize">{category}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-gray-900">{count.toLocaleString()}</span>
                    <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(count / Math.max(...Object.values(stats.vehicles.byCategory))) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue and Performance Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Monthly Revenue */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Monthly Revenue Trend</h3>
              <DollarSign className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              {stats.revenue.monthly.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{item.month}</span>
                  <div className="flex items-center">
                    <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${(item.amount / Math.max(...stats.revenue.monthly.map(r => r.amount))) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 w-20 text-right">
                      {formatCurrency(item.amount)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Performance Metrics</h3>
              <BarChart3 className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Avg. Processing Time</span>
                  <span className="text-sm font-semibold text-gray-900">{stats.performance.averageProcessingTime} days</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Customer Satisfaction</span>
                  <span className="text-sm font-semibold text-gray-900">{stats.performance.customerSatisfaction}/5.0</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '86%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Document Accuracy</span>
                  <span className="text-sm font-semibold text-gray-900">{stats.performance.documentAccuracy}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '94.5%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">System Uptime</span>
                  <span className="text-sm font-semibold text-gray-900">{stats.performance.systemUptime}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '99.8%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
              <Download className="h-5 w-5 mr-2" />
              Download Detailed Report
            </button>
            <button className="flex items-center justify-center px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
              <Calendar className="h-5 w-5 mr-2" />
              Schedule Report
            </button>
            <button className="flex items-center justify-center px-4 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
              <Filter className="h-5 w-5 mr-2" />
              Custom Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
