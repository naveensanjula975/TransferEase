import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
    Users,
    Car,
    FileText,
    DollarSign,
    TrendingUp,
    TrendingDown,
    Eye,
    Download,
    Settings,
    AlertTriangle,
    CheckCircle,
    Clock,
    BarChart3,
    PieChart,
    Activity,
    Shield,
    Bell,
    Search,
    Filter,
    RefreshCw,
    UserCheck,
    UserX,
    XCircle,
    ArrowUpRight,
    ArrowDownRight,
    Calendar,
    MapPin,
    CreditCard,
    Database,
    Server,
    Monitor,
    Wifi,
    HardDrive,
    Cpu,
    MoreVertical,
    Edit,
    Trash2,
    Flag,
    Mail
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { PageLayout } from '../layout';
import { Card, Button, ProgressBar } from '../shared';
import { 
    UserManagement, 
    TransferQueue, 
    AdminAnalytics 
} from './';
import { 
    mockTransfers, 
    mockUsers, 
    mockVehicles, 
    mockDocuments,
    getTransferStatistics,
    getUserStatistics
} from '../../data';

const AdminDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [activeView, setActiveView] = useState('overview');
    const [dashboardData, setDashboardData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [timeRange, setTimeRange] = useState('today');
    const [refreshing, setRefreshing] = useState(false);

    // Mock comprehensive admin data
    const mockAdminData = {
        systemOverview: {
            totalUsers: 5643,
            totalVehicles: 8956,
            totalTransfers: 1247,
            totalRevenue: 10584000,
            todayStats: {
                newUsers: 12,
                newTransfers: 24,
                completedTransfers: 18,
                revenue: 153000,
                pendingApprovals: 45,
                documentsProcessed: 89
            },
            trends: {
                users: { change: 8.3, type: 'increase' },
                transfers: { change: 12.5, type: 'increase' },
                revenue: { change: 15.2, type: 'increase' },
                satisfaction: { change: 2.1, type: 'decrease' }
            }
        },
        transferQueue: [
            {
                id: 'TRA-2025-001',
                vehicle: 'CAA-1234 - Toyota Prius 2020',
                fromOwner: 'Kasun Perera',
                toOwner: 'Nimal Silva',
                submittedDate: '2025-01-15T10:30:00Z',
                priority: 'high',
                status: 'pending_review',
                documentsComplete: 85,
                paymentStatus: 'completed',
                estimatedCompletion: '2025-01-18',
                amount: 45000
            },
            {
                id: 'TRA-2025-002',
                vehicle: 'CAB-5678 - Honda Civic 2019',
                fromOwner: 'Saman Fernando',
                toOwner: 'Ruwan Perera',
                submittedDate: '2025-01-14T14:20:00Z',
                priority: 'medium',
                status: 'document_review',
                documentsComplete: 60,
                paymentStatus: 'pending',
                estimatedCompletion: '2025-01-20',
                amount: 38000
            },
            {
                id: 'TRA-2025-003',
                vehicle: 'CAC-9012 - BMW X5 2021',
                fromOwner: 'ABC Motors Pvt Ltd',
                toOwner: 'Priya Jayasinghe',
                submittedDate: '2025-01-16T09:15:00Z',
                priority: 'urgent',
                status: 'payment_verification',
                documentsComplete: 100,
                paymentStatus: 'verifying',
                estimatedCompletion: '2025-01-17',
                amount: 125000
            }
        ],
        userManagement: {
            totalUsers: 5643,
            activeUsers: 4892,
            pendingVerification: 156,
            suspendedUsers: 23,
            newRegistrations: 89,
            recentUsers: [
                {
                    id: 'USR-001',
                    name: 'Dinesh Rajapaksa',
                    email: 'dinesh.r@email.com',
                    phone: '+94771234567',
                    registeredDate: '2025-01-16T08:30:00Z',
                    status: 'pending_verification',
                    documentsSubmitted: 3,
                    transfersCount: 0,
                    vehiclesCount: 1
                },
                {
                    id: 'USR-002',
                    name: 'Lakshika Perera',
                    email: 'lakshika.p@email.com',
                    phone: '+94712345678',
                    registeredDate: '2025-01-15T16:45:00Z',
                    status: 'verified',
                    documentsSubmitted: 5,
                    transfersCount: 2,
                    vehiclesCount: 2
                }
            ]
        },
        analytics: {
            transferStats: {
                pending: 234,
                underReview: 156,
                completed: 856,
                rejected: 157,
                paymentPending: 89
            },
            monthlyTrends: [
                { month: 'Jan', transfers: 145, revenue: 2340000, users: 234 },
                { month: 'Feb', transfers: 189, revenue: 3120000, users: 278 },
                { month: 'Mar', transfers: 234, revenue: 3890000, users: 345 },
                { month: 'Apr', transfers: 267, revenue: 4560000, users: 389 }
            ],
            topPerformers: [
                { category: 'Vehicle Dealers', count: 145, percentage: 34.2 },
                { category: 'Individual Owners', count: 98, percentage: 23.1 },
                { category: 'Leasing Companies', count: 76, percentage: 17.9 },
                { category: 'Government Entities', count: 43, percentage: 10.1 }
            ]
        },
        systemHealth: {
            serverStatus: 'healthy',
            uptime: 99.8,
            responseTime: 245,
            activeConnections: 1247,
            databaseHealth: 'optimal',
            metrics: {
                cpu: 76,
                memory: 68,
                storage: 45,
                network: 92,
                database: 88
            },
            recentIssues: [
                {
                    id: 'ISS-001',
                    title: 'High Memory Usage',
                    description: 'Memory usage peaked at 95% during peak hours',
                    severity: 'warning',
                    timestamp: '2025-01-16T14:30:00Z',
                    status: 'monitoring'
                }
            ]
        },
        notifications: [
            {
                id: 'NOT-001',
                type: 'urgent',
                title: 'Critical Transfer Review Required',
                message: 'High-value transfer TRA-2025-003 requires immediate attention',
                timestamp: '2025-01-16T15:45:00Z',
                actionRequired: true,
                assignee: 'Senior Administrator'
            },
            {
                id: 'NOT-002',
                type: 'system',
                title: 'System Maintenance Scheduled',
                message: 'Planned maintenance window: Jan 18, 2025 02:00-04:00 AM',
                timestamp: '2025-01-16T12:00:00Z',
                actionRequired: false,
                assignee: 'IT Team'
            }
        ]
    };

    useEffect(() => {
        const loadAdminData = async () => {
            setIsLoading(true);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            setDashboardData(mockAdminData);
            setIsLoading(false);
        };

        loadAdminData();
    }, [timeRange]);

    const handleRefresh = async () => {
        setRefreshing(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setRefreshing(false);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-LK', {
            style: 'currency',
            currency: 'LKR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed':
                return <CheckCircle className="h-4 w-4 text-green-500" />;
            case 'pending_review':
                return <Clock className="h-4 w-4 text-yellow-500" />;
            case 'document_review':
                return <FileText className="h-4 w-4 text-blue-500" />;
            case 'payment_verification':
                return <CreditCard className="h-4 w-4 text-purple-500" />;
            case 'rejected':
                return <XCircle className="h-4 w-4 text-red-500" />;
            default:
                return <Clock className="h-4 w-4 text-gray-500" />;
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'urgent':
                return 'bg-red-100 text-red-800';
            case 'high':
                return 'bg-orange-100 text-orange-800';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800';
            case 'low':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const breadcrumbItems = [
        { label: 'Admin', href: '/admin' },
        { label: 'Dashboard', href: '/admin/dashboard' }
    ];

    if (isLoading) {
        return (
            <PageLayout breadcrumbItems={breadcrumbItems}>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
                    </div>
                </div>
            </PageLayout>
        );
    }

    const renderOverview = () => (
        <div className="space-y-6">
            {/* System Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Users</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {dashboardData.systemOverview?.totalUsers?.toLocaleString()}
                            </p>
                            <div className="flex items-center mt-2">
                                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                                <span className="text-sm text-green-600">
                                    +{dashboardData.systemOverview?.trends?.users?.change}%
                                </span>
                            </div>
                        </div>
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <Users className="h-6 w-6 text-blue-600" />
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Transfers</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {dashboardData.systemOverview?.totalTransfers?.toLocaleString()}
                            </p>
                            <div className="flex items-center mt-2">
                                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                                <span className="text-sm text-green-600">
                                    +{dashboardData.systemOverview?.trends?.transfers?.change}%
                                </span>
                            </div>
                        </div>
                        <div className="p-3 bg-green-100 rounded-lg">
                            <Car className="h-6 w-6 text-green-600" />
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {formatCurrency(dashboardData.systemOverview?.totalRevenue)}
                            </p>
                            <div className="flex items-center mt-2">
                                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                                <span className="text-sm text-green-600">
                                    +{dashboardData.systemOverview?.trends?.revenue?.change}%
                                </span>
                            </div>
                        </div>
                        <div className="p-3 bg-purple-100 rounded-lg">
                            <DollarSign className="h-6 w-6 text-purple-600" />
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Pending Actions</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {dashboardData.systemOverview?.todayStats?.pendingApprovals}
                            </p>
                            <div className="flex items-center mt-2">
                                <Clock className="h-4 w-4 text-orange-500 mr-1" />
                                <span className="text-sm text-orange-600">Needs attention</span>
                            </div>
                        </div>
                        <div className="p-3 bg-orange-100 rounded-lg">
                            <AlertTriangle className="h-6 w-6 text-orange-600" />
                        </div>
                    </div>
                </Card>
            </div>

            {/* Transfer Queue */}
            <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Transfer Review Queue</h3>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                            <Filter className="h-4 w-4 mr-2" />
                            Filter
                        </Button>
                        <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Export
                        </Button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 font-medium text-gray-600">Transfer ID</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600">Vehicle</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600">From → To</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600">Priority</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600">Amount</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dashboardData.transferQueue?.map((transfer) => (
                                <tr key={transfer.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-3 px-4">
                                        <div className="font-medium text-gray-900">{transfer.id}</div>
                                        <div className="text-sm text-gray-500">
                                            {new Date(transfer.submittedDate).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="font-medium text-gray-900">{transfer.vehicle}</div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="text-sm">
                                            <div className="text-gray-900">{transfer.fromOwner}</div>
                                            <div className="text-gray-500">→ {transfer.toOwner}</div>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center space-x-2">
                                            {getStatusIcon(transfer.status)}
                                            <span className="text-sm text-gray-700">
                                                {transfer.status.replace('_', ' ').toUpperCase()}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(transfer.priority)}`}>
                                            {transfer.priority.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className="font-medium text-gray-900">
                                            {formatCurrency(transfer.amount)}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center space-x-2">
                                            <Button size="sm" variant="outline">
                                                <Eye className="h-3 w-3" />
                                            </Button>
                                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                                Approve
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* System Health and Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Real-time Activity</h3>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                        <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                            <div className="p-1 bg-blue-100 rounded-full">
                                <Users className="h-4 w-4 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">New user registration</p>
                                <p className="text-xs text-gray-500">Kasun Perera registered with verified documents</p>
                                <p className="text-xs text-gray-400">2 minutes ago</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                            <div className="p-1 bg-green-100 rounded-full">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">Transfer approved</p>
                                <p className="text-xs text-gray-500">TRA-2025-001 approved and completed</p>
                                <p className="text-xs text-gray-400">5 minutes ago</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                            <div className="p-1 bg-orange-100 rounded-full">
                                <AlertTriangle className="h-4 w-4 text-orange-600" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">Document requires review</p>
                                <p className="text-xs text-gray-500">TRA-2025-002 has unclear vehicle certificate</p>
                                <p className="text-xs text-gray-400">8 minutes ago</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                            <div className="p-1 bg-purple-100 rounded-full">
                                <DollarSign className="h-4 w-4 text-purple-600" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">Payment received</p>
                                <p className="text-xs text-gray-500">Rs. 12,500 payment for TRA-2025-003</p>
                                <p className="text-xs text-gray-400">12 minutes ago</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <Button variant="outline" size="sm" className="w-full">
                            <Eye className="h-4 w-4 mr-2" />
                            View All Activity
                        </Button>
                    </div>
                </Card>

                <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
                    <div className="space-y-4">
                        {Object.entries(dashboardData.systemHealth?.metrics || {}).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    {key === 'cpu' && <Cpu className="h-4 w-4 text-blue-500" />}
                                    {key === 'memory' && <Server className="h-4 w-4 text-green-500" />}
                                    {key === 'storage' && <HardDrive className="h-4 w-4 text-purple-500" />}
                                    {key === 'network' && <Wifi className="h-4 w-4 text-orange-500" />}
                                    {key === 'database' && <Database className="h-4 w-4 text-red-500" />}
                                    <span className="text-sm font-medium text-gray-700 capitalize">{key}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <ProgressBar 
                                        progress={value} 
                                        className="w-20" 
                                        color={value > 80 ? 'red' : value > 60 ? 'yellow' : 'green'}
                                    />
                                    <span className="text-sm text-gray-600 w-10">{value}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <Button 
                            className="h-16 flex flex-col items-center justify-center"
                            onClick={() => setActiveView('users')}
                        >
                            <Users className="h-5 w-5 mb-1" />
                            <span className="text-xs">User Management</span>
                        </Button>
                        <Button 
                            className="h-16 flex flex-col items-center justify-center"
                            onClick={() => navigate('/admin/vehicles')}
                        >
                            <Car className="h-5 w-5 mb-1" />
                            <span className="text-xs">Vehicle Registry</span>
                        </Button>
                        <Button 
                            className="h-16 flex flex-col items-center justify-center"
                            onClick={() => setActiveView('transfers')}
                        >
                            <FileText className="h-5 w-5 mb-1" />
                            <span className="text-xs">Document Review</span>
                        </Button>
                        <Button 
                            className="h-16 flex flex-col items-center justify-center"
                            onClick={() => setActiveView('analytics')}
                        >
                            <BarChart3 className="h-5 w-5 mb-1" />
                            <span className="text-xs">Analytics</span>
                        </Button>
                        <Button 
                            className="h-16 flex flex-col items-center justify-center"
                            onClick={() => setActiveView('settings')}
                        >
                            <Settings className="h-5 w-5 mb-1" />
                            <span className="text-xs">System Settings</span>
                        </Button>
                        <Button 
                            className="h-16 flex flex-col items-center justify-center"
                            onClick={() => setActiveView('system')}
                        >
                            <Shield className="h-5 w-5 mb-1" />
                            <span className="text-xs">Security Logs</span>
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );

    const renderSystemHealth = () => (
        <div className="space-y-6">
            {/* System Status Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Server Uptime</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {dashboardData.systemHealth?.uptime}%
                            </p>
                            <div className="flex items-center mt-2">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                                <span className="text-sm text-green-600">Healthy</span>
                            </div>
                        </div>
                        <div className="p-3 bg-green-100 rounded-lg">
                            <Server className="h-6 w-6 text-green-600" />
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Response Time</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {dashboardData.systemHealth?.responseTime}ms
                            </p>
                            <div className="flex items-center mt-2">
                                <Activity className="h-4 w-4 text-blue-500 mr-1" />
                                <span className="text-sm text-blue-600">Optimal</span>
                            </div>
                        </div>
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <Wifi className="h-6 w-6 text-blue-600" />
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Active Connections</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {dashboardData.systemHealth?.activeConnections?.toLocaleString()}
                            </p>
                            <div className="flex items-center mt-2">
                                <Users className="h-4 w-4 text-purple-500 mr-1" />
                                <span className="text-sm text-purple-600">Concurrent</span>
                            </div>
                        </div>
                        <div className="p-3 bg-purple-100 rounded-lg">
                            <Users className="h-6 w-6 text-purple-600" />
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Database Status</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {dashboardData.systemHealth?.databaseHealth}
                            </p>
                            <div className="flex items-center mt-2">
                                <Database className="h-4 w-4 text-green-500 mr-1" />
                                <span className="text-sm text-green-600">Optimal</span>
                            </div>
                        </div>
                        <div className="p-3 bg-orange-100 rounded-lg">
                            <Database className="h-6 w-6 text-orange-600" />
                        </div>
                    </div>
                </Card>
            </div>

            {/* Resource Usage */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">System Resources</h3>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-gray-600">CPU Usage</span>
                                <span className="text-sm text-gray-900">{dashboardData.systemHealth?.metrics?.cpu}%</span>
                            </div>
                            <ProgressBar 
                                progress={dashboardData.systemHealth?.metrics?.cpu || 0} 
                                className="h-2"
                                color={dashboardData.systemHealth?.metrics?.cpu > 80 ? 'red' : dashboardData.systemHealth?.metrics?.cpu > 60 ? 'yellow' : 'green'}
                            />
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-gray-600">Memory Usage</span>
                                <span className="text-sm text-gray-900">{dashboardData.systemHealth?.metrics?.memory}%</span>
                            </div>
                            <ProgressBar 
                                progress={dashboardData.systemHealth?.metrics?.memory || 0} 
                                className="h-2"
                                color={dashboardData.systemHealth?.metrics?.memory > 80 ? 'red' : dashboardData.systemHealth?.metrics?.memory > 60 ? 'yellow' : 'green'}
                            />
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-gray-600">Storage Usage</span>
                                <span className="text-sm text-gray-900">{dashboardData.systemHealth?.metrics?.storage}%</span>
                            </div>
                            <ProgressBar 
                                progress={dashboardData.systemHealth?.metrics?.storage || 0} 
                                className="h-2"
                                color={dashboardData.systemHealth?.metrics?.storage > 80 ? 'red' : dashboardData.systemHealth?.metrics?.storage > 60 ? 'yellow' : 'green'}
                            />
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-gray-600">Database Performance</span>
                                <span className="text-sm text-gray-900">{dashboardData.systemHealth?.metrics?.database}%</span>
                            </div>
                            <ProgressBar 
                                progress={dashboardData.systemHealth?.metrics?.database || 0} 
                                className="h-2"
                                color="green"
                            />
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent System Events</h3>
                    <div className="space-y-3">
                        {dashboardData.systemHealth?.recentIssues?.map((issue, index) => (
                            <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                                <div className={`p-1 rounded-full ${
                                    issue.severity === 'critical' ? 'bg-red-100' :
                                    issue.severity === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                                }`}>
                                    <AlertTriangle className={`h-4 w-4 ${
                                        issue.severity === 'critical' ? 'text-red-600' :
                                        issue.severity === 'warning' ? 'text-yellow-600' : 'text-blue-600'
                                    }`} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">{issue.title}</p>
                                    <p className="text-xs text-gray-500">{issue.description}</p>
                                    <p className="text-xs text-gray-400 mt-1">{new Date(issue.timestamp).toLocaleString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );

    const renderSettings = () => (
        <div className="space-y-6">
            {/* System Configuration */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">System Configuration</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                                <p className="font-medium text-gray-900">Maintenance Mode</p>
                                <p className="text-sm text-gray-500">Enable system maintenance mode</p>
                            </div>
                            <div className="flex items-center">
                                <input type="checkbox" className="toggle" />
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                                <p className="font-medium text-gray-900">Auto Backup</p>
                                <p className="text-sm text-gray-500">Automatic daily database backups</p>
                            </div>
                            <div className="flex items-center">
                                <input type="checkbox" className="toggle" defaultChecked />
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                                <p className="font-medium text-gray-900">Email Notifications</p>
                                <p className="text-sm text-gray-500">Send admin email notifications</p>
                            </div>
                            <div className="flex items-center">
                                <input type="checkbox" className="toggle" defaultChecked />
                            </div>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
                    <div className="space-y-4">
                        <div className="p-3 bg-gray-50 rounded-lg">
                            <label className="block font-medium text-gray-900 mb-2">Session Timeout (minutes)</label>
                            <input 
                                type="number" 
                                defaultValue="30" 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                            <label className="block font-medium text-gray-900 mb-2">Max Login Attempts</label>
                            <input 
                                type="number" 
                                defaultValue="5" 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                                <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                                <p className="text-sm text-gray-500">Require 2FA for admin access</p>
                            </div>
                            <div className="flex items-center">
                                <input type="checkbox" className="toggle" defaultChecked />
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Transfer Settings */}
            <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Transfer Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                        <label className="block font-medium text-gray-900 mb-2">Auto-Approval Threshold (Rs.)</label>
                        <input 
                            type="number" 
                            defaultValue="50000" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">Transfers below this amount are auto-approved</p>
                    </div>
                    <div>
                        <label className="block font-medium text-gray-900 mb-2">Review Period (days)</label>
                        <input 
                            type="number" 
                            defaultValue="3" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">Maximum time for document review</p>
                    </div>
                    <div>
                        <label className="block font-medium text-gray-900 mb-2">Transfer Fee (%)</label>
                        <input 
                            type="number" 
                            step="0.1" 
                            defaultValue="2.5" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">Percentage of vehicle value</p>
                    </div>
                </div>
            </Card>

            {/* System Actions */}
            <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">System Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
                        <Database className="h-5 w-5 mb-1" />
                        <span className="text-xs">Backup Database</span>
                    </Button>
                    <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
                        <Download className="h-5 w-5 mb-1" />
                        <span className="text-xs">Export Logs</span>
                    </Button>
                    <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
                        <RefreshCw className="h-5 w-5 mb-1" />
                        <span className="text-xs">Clear Cache</span>
                    </Button>
                    <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
                        <Shield className="h-5 w-5 mb-1" />
                        <span className="text-xs">Security Scan</span>
                    </Button>
                </div>
            </Card>

            {/* Save Settings */}
            <div className="flex justify-end space-x-4">
                <Button variant="outline">
                    Cancel
                </Button>
                <Button>
                    Save Settings
                </Button>
            </div>
        </div>
    );

    const viewOptions = [
        { id: 'overview', label: 'Overview', icon: BarChart3 },
        { id: 'transfers', label: 'Transfer Queue', icon: Car },
        { id: 'users', label: 'User Management', icon: Users },
        { id: 'analytics', label: 'Analytics', icon: PieChart },
        { id: 'system', label: 'System Health', icon: Monitor },
        { id: 'settings', label: 'Settings', icon: Settings }
    ];

    return (
        <PageLayout breadcrumbItems={breadcrumbItems}>
            <div className="space-y-6">
                {/* Header */}
                <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-lg p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">Administrator Dashboard</h1>
                            <p className="text-slate-300 mt-1">
                                System overview and management controls
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Button
                                variant="outline"
                                onClick={handleRefresh}
                                disabled={refreshing}
                                className="border-white text-white hover:bg-white hover:text-slate-900"
                            >
                                <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                                Refresh
                            </Button>
                            <div className="text-right">
                                <p className="text-slate-300 text-sm">System Status</p>
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                    <span className="text-white font-medium">Operational</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <Card className="p-1">
                    <div className="flex items-center space-x-1 overflow-x-auto">
                        {viewOptions.map((option) => {
                            const Icon = option.icon;
                            return (
                                <button
                                    key={option.id}
                                    onClick={() => setActiveView(option.id)}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                                        activeView === option.id
                                            ? 'bg-slate-100 text-slate-700'
                                            : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    <Icon className="h-4 w-4" />
                                    <span>{option.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </Card>

                {/* Content */}
                <div className="min-h-screen">
                    {activeView === 'overview' && renderOverview()}
                    {activeView === 'transfers' && (
                        <TransferQueue
                            transfers={dashboardData.transferQueue || []}
                            onView={(transfer) => console.log('View transfer:', transfer)}
                            onApprove={(transfer) => console.log('Approve transfer:', transfer)}
                            onReject={(transfer) => console.log('Reject transfer:', transfer)}
                            onContact={(transfer) => console.log('Contact for transfer:', transfer)}
                            onBulkAction={(action, transfers) => console.log('Bulk action:', action, transfers)}
                        />
                    )}
                    {activeView === 'users' && (
                        <UserManagement
                            users={dashboardData.userManagement?.recentUsers || []}
                            onView={(user) => console.log('View user:', user)}
                            onEdit={(user) => console.log('Edit user:', user)}
                            onDelete={(user) => console.log('Delete user:', user)}
                            onFlag={(user) => console.log('Flag user:', user)}
                            onContact={(user) => console.log('Contact user:', user)}
                            onBulkAction={(action, users) => console.log('Bulk action:', action, users)}
                        />
                    )}
                    {activeView === 'analytics' && (
                        <AdminAnalytics
                            analyticsData={dashboardData.analytics || {}}
                        />
                    )}
                    {activeView === 'system' && renderSystemHealth()}
                    {activeView === 'settings' && renderSettings()}
                </div>
            </div>
        </PageLayout>
    );
};

export default AdminDashboard;
