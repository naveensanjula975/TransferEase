import React, { useState } from 'react';
import { 
    BarChart3, 
    PieChart, 
    TrendingUp, 
    TrendingDown,
    Users,
    Car,
    DollarSign,
    FileText,
    Calendar,
    Download,
    Filter,
    RefreshCw,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';
import { Card, Button } from '../shared';

const AnalyticsCard = ({ 
    title, 
    value, 
    change, 
    changeType, 
    icon: Icon, 
    color = 'blue',
    subtitle,
    chartData 
}) => {
    const colorMap = {
        blue: 'bg-blue-100 text-blue-600',
        green: 'bg-green-100 text-green-600',
        yellow: 'bg-yellow-100 text-yellow-600',
        purple: 'bg-purple-100 text-purple-600',
        red: 'bg-red-100 text-red-600',
        orange: 'bg-orange-100 text-orange-600'
    };

    const getTrendIcon = () => {
        if (changeType === 'increase') {
            return <TrendingUp className="h-4 w-4 text-green-600" />;
        } else if (changeType === 'decrease') {
            return <TrendingDown className="h-4 w-4 text-red-600" />;
        }
        return null;
    };

    const getTrendColor = () => {
        if (changeType === 'increase') return 'text-green-600';
        if (changeType === 'decrease') return 'text-red-600';
        return 'text-gray-600';
    };

    return (
        <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-lg ${colorMap[color]}`}>
                        <Icon className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-600">{title}</p>
                        <p className="text-2xl font-bold text-gray-900">{value}</p>
                        {subtitle && (
                            <p className="text-xs text-gray-500">{subtitle}</p>
                        )}
                    </div>
                </div>
            </div>
            
            {change && (
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                        {getTrendIcon()}
                        <span className={`text-sm font-medium ${getTrendColor()}`}>
                            {change}
                        </span>
                        <span className="text-xs text-gray-500">vs last month</span>
                    </div>
                    {changeType === 'increase' ? (
                        <ArrowUpRight className="h-4 w-4 text-green-500" />
                    ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-500" />
                    )}
                </div>
            )}

            {chartData && (
                <div className="mt-4 h-16 bg-gray-50 rounded flex items-end justify-center space-x-1 p-2">
                    {chartData.map((point, index) => (
                        <div
                            key={index}
                            className={`bg-${color}-500 rounded-t`}
                            style={{ 
                                height: `${(point / Math.max(...chartData)) * 100}%`,
                                width: '8px'
                            }}
                        />
                    ))}
                </div>
            )}
        </Card>
    );
};

const ChartWidget = ({ title, data, type = 'bar', color = 'blue' }) => {
    const renderBarChart = () => (
        <div className="h-64 flex items-end justify-center space-x-2 p-4">
            {data.map((item, index) => (
                <div key={index} className="flex flex-col items-center space-y-2">
                    <div
                        className={`bg-${color}-500 rounded-t transition-all hover:bg-${color}-600`}
                        style={{ 
                            height: `${(item.value / Math.max(...data.map(d => d.value))) * 200}px`,
                            width: '40px'
                        }}
                    />
                    <span className="text-xs text-gray-600 transform -rotate-45 origin-center">
                        {item.label}
                    </span>
                </div>
            ))}
        </div>
    );

    const renderPieChart = () => (
        <div className="h-64 flex items-center justify-center">
            <div className="relative w-48 h-48">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-600"></div>
                <div className="absolute inset-4 rounded-full bg-white flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">
                            {data.reduce((sum, item) => sum + item.value, 0)}
                        </p>
                        <p className="text-sm text-gray-600">Total</p>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderLineChart = () => (
        <div className="h-64 flex items-end justify-center space-x-3 p-4">
            {data.map((item, index) => (
                <div key={index} className="flex flex-col items-center space-y-2">
                    <div className="relative">
                        <div
                            className={`w-3 h-3 bg-${color}-500 rounded-full`}
                            style={{ marginBottom: `${(item.value / Math.max(...data.map(d => d.value))) * 180}px` }}
                        />
                        {index < data.length - 1 && (
                            <div className={`absolute top-1.5 left-3 w-6 h-0.5 bg-${color}-300`} />
                        )}
                    </div>
                    <span className="text-xs text-gray-600">{item.label}</span>
                </div>
            ))}
        </div>
    );

    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                <Button variant="outline" size="sm">
                    <Download className="h-3 w-3 mr-1" />
                    Export
                </Button>
            </div>
            
            <div className="mb-4">
                {type === 'bar' && renderBarChart()}
                {type === 'pie' && renderPieChart()}
                {type === 'line' && renderLineChart()}
            </div>

            {data && (
                <div className="space-y-2">
                    {data.map((item, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-2">
                                <div className={`w-3 h-3 bg-${color}-500 rounded-full`} />
                                <span className="text-gray-700">{item.label}</span>
                            </div>
                            <span className="font-medium text-gray-900">{item.value}</span>
                        </div>
                    ))}
                </div>
            )}
        </Card>
    );
};

const AdminAnalytics = ({ analyticsData }) => {
    const [timeRange, setTimeRange] = useState('monthly');
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = async () => {
        setRefreshing(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setRefreshing(false);
    };

    const transferTrendsData = [
        { label: 'Jan', value: 145 },
        { label: 'Feb', value: 189 },
        { label: 'Mar', value: 234 },
        { label: 'Apr', value: 267 },
        { label: 'May', value: 298 },
        { label: 'Jun', value: 334 }
    ];

    const revenueTrendsData = [
        { label: 'Jan', value: 2.3 },
        { label: 'Feb', value: 3.1 },
        { label: 'Mar', value: 3.9 },
        { label: 'Apr', value: 4.6 },
        { label: 'May', value: 5.2 },
        { label: 'Jun', value: 6.1 }
    ];

    const statusDistributionData = [
        { label: 'Completed', value: 856 },
        { label: 'Pending Review', value: 234 },
        { label: 'Document Review', value: 156 },
        { label: 'Payment Verification', value: 89 },
        { label: 'Rejected', value: 157 }
    ];

    const userTypeData = [
        { label: 'Individual Owners', value: 3421 },
        { label: 'Vehicle Dealers', value: 1245 },
        { label: 'Leasing Companies', value: 768 },
        { label: 'Government Entities', value: 209 }
    ];

    const timeRangeOptions = [
        { value: 'daily', label: 'Daily' },
        { value: 'weekly', label: 'Weekly' },
        { value: 'monthly', label: 'Monthly' },
        { value: 'quarterly', label: 'Quarterly' },
        { value: 'yearly', label: 'Yearly' }
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Analytics & Reports</h2>
                <div className="flex items-center space-x-3">
                    <select
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        {timeRangeOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <Button
                        variant="outline"
                        onClick={handleRefresh}
                        disabled={refreshing}
                        className="flex items-center space-x-2"
                    >
                        <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                        <span>Refresh</span>
                    </Button>
                    <Button className="flex items-center space-x-2">
                        <Download className="h-4 w-4" />
                        <span>Export Report</span>
                    </Button>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <AnalyticsCard
                    title="Total Revenue"
                    value="LKR 10.5M"
                    change="+15.2%"
                    changeType="increase"
                    icon={DollarSign}
                    color="green"
                    subtitle="This month"
                    chartData={[45, 52, 68, 84, 72, 91, 105]}
                />
                <AnalyticsCard
                    title="Transfers Processed"
                    value="1,247"
                    change="+12.5%"
                    changeType="increase"
                    icon={Car}
                    color="blue"
                    subtitle="This month"
                    chartData={[125, 142, 167, 189, 198, 234, 267]}
                />
                <AnalyticsCard
                    title="Active Users"
                    value="4,892"
                    change="+8.3%"
                    changeType="increase"
                    icon={Users}
                    color="purple"
                    subtitle="Registered users"
                    chartData={[3200, 3567, 3891, 4234, 4512, 4678, 4892]}
                />
                <AnalyticsCard
                    title="Documents Processed"
                    value="8,456"
                    change="+22.1%"
                    changeType="increase"
                    icon={FileText}
                    color="orange"
                    subtitle="This month"
                    chartData={[567, 634, 712, 789, 845, 923, 1034]}
                />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartWidget
                    title="Transfer Trends"
                    data={transferTrendsData}
                    type="bar"
                    color="blue"
                />
                <ChartWidget
                    title="Revenue Trends (Millions LKR)"
                    data={revenueTrendsData}
                    type="line"
                    color="green"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartWidget
                    title="Transfer Status Distribution"
                    data={statusDistributionData}
                    type="pie"
                    color="purple"
                />
                <ChartWidget
                    title="User Types"
                    data={userTypeData}
                    type="bar"
                    color="orange"
                />
            </div>

            {/* Performance Metrics */}
            <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 border border-gray-200 rounded-lg">
                        <div className="text-3xl font-bold text-green-600 mb-2">94.5%</div>
                        <div className="text-sm text-gray-600">Success Rate</div>
                        <div className="text-xs text-gray-500 mt-1">+2.3% from last month</div>
                    </div>
                    <div className="text-center p-4 border border-gray-200 rounded-lg">
                        <div className="text-3xl font-bold text-blue-600 mb-2">3.2</div>
                        <div className="text-sm text-gray-600">Avg. Processing Days</div>
                        <div className="text-xs text-gray-500 mt-1">-0.5 days improvement</div>
                    </div>
                    <div className="text-center p-4 border border-gray-200 rounded-lg">
                        <div className="text-3xl font-bold text-purple-600 mb-2">4.7/5</div>
                        <div className="text-sm text-gray-600">Customer Satisfaction</div>
                        <div className="text-xs text-gray-500 mt-1">Based on 1,234 reviews</div>
                    </div>
                </div>
            </Card>

            {/* Recent Activity Summary */}
            <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Summary</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                            <Calendar className="h-5 w-5 text-blue-600" />
                            <span className="text-sm font-medium text-gray-900">Today's Activity</span>
                        </div>
                        <span className="text-sm text-blue-600">24 new transfers, 18 completed</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                            <Users className="h-5 w-5 text-green-600" />
                            <span className="text-sm font-medium text-gray-900">New Registrations</span>
                        </div>
                        <span className="text-sm text-green-600">12 new users today</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                            <DollarSign className="h-5 w-5 text-purple-600" />
                            <span className="text-sm font-medium text-gray-900">Revenue Today</span>
                        </div>
                        <span className="text-sm text-purple-600">LKR 153,000</span>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export { AnalyticsCard, ChartWidget, AdminAnalytics };
