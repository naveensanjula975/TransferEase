import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
    Car, 
    FileText, 
    Clock, 
    CheckCircle, 
    AlertCircle, 
    Plus, 
    Upload, 
    CreditCard,
    Eye,
    Download,
    Bell,
    TrendingUp,
    Calendar,
    Activity,
    ArrowRight,
    Star,
    Shield,
    Users
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, Button, ProgressBar } from '../shared';
import { PageLayout } from '../layout';
import { QuickStatsGrid } from './';
import { 
    mockTransfers, 
    mockVehicles, 
    mockDocuments, 
    findTransfersByUser,
    findVehiclesByOwner,
    findDocumentsByUser,
    getTransferStatistics,
    getVehicleStatistics
} from '../../data';

const Dashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({});
    const [recentTransfers, setRecentTransfers] = useState([]);
    const [userVehicles, setUserVehicles] = useState([]);
    const [pendingDocuments, setPendingDocuments] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Load user-specific data
                const userTransfers = findTransfersByUser(user?.id);
                const vehicles = findVehiclesByOwner(user?.id);
                const documents = findDocumentsByUser(user?.id);

                setRecentTransfers(userTransfers.slice(0, 5));
                setUserVehicles(vehicles.slice(0, 3));
                setPendingDocuments(documents.filter(doc => doc.status === 'pending').slice(0, 4));

                // Calculate statistics
                const transferStats = getTransferStatistics();
                const vehicleStats = getVehicleStatistics();
                
                setStats({
                    activeTransfers: userTransfers.filter(t => ['pending', 'processing', 'review'].includes(t.status)).length,
                    completedTransfers: userTransfers.filter(t => t.status === 'completed').length,
                    totalVehicles: vehicles.length,
                    pendingDocuments: documents.filter(doc => doc.status === 'pending').length,
                    totalDocuments: documents.length,
                    successRate: Math.round((userTransfers.filter(t => t.status === 'completed').length / Math.max(userTransfers.length, 1)) * 100)
                });

                // Mock notifications
                setNotifications([
                    {
                        id: 1,
                        type: 'success',
                        title: 'Transfer Approved',
                        message: 'Your vehicle transfer for ABC-1234 has been approved.',
                        time: '2 hours ago',
                        read: false
                    },
                    {
                        id: 2,
                        type: 'warning',
                        title: 'Document Required',
                        message: 'Please upload the insurance certificate for your pending transfer.',
                        time: '1 day ago',
                        read: false
                    },
                    {
                        id: 3,
                        type: 'info',
                        title: 'Payment Confirmed',
                        message: 'Payment of Rs. 5,000 has been processed successfully.',
                        time: '3 days ago',
                        read: true
                    }
                ]);

                setLoading(false);
            } catch (error) {
                console.error('Error loading dashboard data:', error);
                setLoading(false);
            }
        };

        loadDashboardData();
    }, [user?.id]);

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed':
            case 'approved':
                return <CheckCircle className="h-4 w-4 text-green-600" />;
            case 'pending':
            case 'review':
                return <Clock className="h-4 w-4 text-yellow-600" />;
            case 'rejected':
            case 'failed':
                return <AlertCircle className="h-4 w-4 text-red-600" />;
            default:
                return <Clock className="h-4 w-4 text-gray-600" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
            case 'approved':
                return 'text-green-600 bg-green-50';
            case 'pending':
            case 'review':
                return 'text-yellow-600 bg-yellow-50';
            case 'rejected':
            case 'failed':
                return 'text-red-600 bg-red-50';
            default:
                return 'text-gray-600 bg-gray-50';
        }
    };

    const quickActions = [
        {
            icon: Plus,
            title: 'Start New Transfer',
            description: 'Begin a new vehicle transfer process',
            href: '/transfer/new',
            color: 'bg-blue-600 hover:bg-blue-700',
            textColor: 'text-white'
        },
        {
            icon: Upload,
            title: 'Upload Documents',
            description: 'Upload required documents',
            href: '/documents/upload',
            color: 'bg-green-600 hover:bg-green-700',
            textColor: 'text-white'
        },
        {
            icon: Eye,
            title: 'View Vehicles',
            description: 'Manage your registered vehicles',
            href: '/vehicles',
            color: 'bg-purple-600 hover:bg-purple-700',
            textColor: 'text-white'
        },
        {
            icon: CreditCard,
            title: 'Payment History',
            description: 'View transaction history',
            href: '/payments',
            color: 'bg-orange-600 hover:bg-orange-700',
            textColor: 'text-white'
        }
    ];

    if (loading) {
        return (
            <PageLayout containerClassName="p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="animate-pulse space-y-6">
                        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
                            ))}
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </PageLayout>
        );
    }

    return (
        <PageLayout containerClassName="p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Welcome Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold mb-2">
                                Welcome back, {user?.firstName}!
                            </h1>
                            <p className="text-blue-100">
                                Manage your vehicle transfers and track your progress
                            </p>
                        </div>
                        <div className="hidden md:flex items-center space-x-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold">{stats.successRate}%</div>
                                <div className="text-xs text-blue-100">Success Rate</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold">{stats.totalVehicles}</div>
                                <div className="text-xs text-blue-100">Vehicles</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <QuickStatsGrid stats={stats} />

                {/* Quick Actions */}
                <Card className="p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {quickActions.map((action, index) => {
                            const Icon = action.icon;
                            return (
                                <Link
                                    key={index}
                                    to={action.href}
                                    className={`${action.color} ${action.textColor} p-4 rounded-lg transition-colors group`}
                                >
                                    <div className="flex items-center space-x-3">
                                        <Icon className="h-6 w-6" />
                                        <div>
                                            <div className="font-medium">{action.title}</div>
                                            <div className="text-sm opacity-90">{action.description}</div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Recent Transfer Activity */}
                    <Card className="lg:col-span-2 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-900">Recent Transfer Activity</h2>
                            <Link 
                                to="/transfers" 
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                            >
                                View All <ArrowRight className="h-4 w-4 ml-1" />
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {recentTransfers.length > 0 ? (
                                recentTransfers.map((transfer) => (
                                    <div key={transfer.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <div className="p-2 bg-white rounded-lg">
                                                <Car className="h-5 w-5 text-gray-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {transfer.vehicleInfo?.registrationNumber}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {transfer.vehicleInfo?.makeModel}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Applied: {new Date(transfer.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            {getStatusIcon(transfer.status)}
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transfer.status)}`}>
                                                {transfer.status.charAt(0).toUpperCase() + transfer.status.slice(1)}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <Car className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                                    <p>No transfers yet. Start your first vehicle transfer!</p>
                                    <Link to="/transfer/new" className="text-blue-600 hover:text-blue-800 text-sm">
                                        Start New Transfer
                                    </Link>
                                </div>
                            )}
                        </div>
                    </Card>

                    {/* Notifications */}
                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
                            <Link 
                                to="/notifications" 
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                            >
                                <Bell className="h-4 w-4 mr-1" />
                                All
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {notifications.slice(0, 3).map((notification) => (
                                <div key={notification.id} className={`p-3 rounded-lg border-l-4 ${
                                    notification.type === 'success' ? 'border-green-400 bg-green-50' :
                                    notification.type === 'warning' ? 'border-yellow-400 bg-yellow-50' :
                                    'border-blue-400 bg-blue-50'
                                }`}>
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-900">
                                                {notification.title}
                                            </p>
                                            <p className="text-xs text-gray-600 mt-1">
                                                {notification.message}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-2">
                                                {notification.time}
                                            </p>
                                        </div>
                                        {!notification.read && (
                                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* My Vehicles */}
                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-900">My Vehicles</h2>
                            <Link 
                                to="/vehicles" 
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                            >
                                View All <ArrowRight className="h-4 w-4 ml-1" />
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {userVehicles.length > 0 ? (
                                userVehicles.map((vehicle) => (
                                    <div key={vehicle.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <div className="p-2 bg-white rounded-lg">
                                                <Car className="h-5 w-5 text-gray-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {vehicle.registrationNumber}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {vehicle.makeModel} ({vehicle.year})
                                                </p>
                                            </div>
                                        </div>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vehicle.status)}`}>
                                            {vehicle.status}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-4 text-gray-500">
                                    <Car className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                                    <p className="text-sm">No vehicles registered</p>
                                </div>
                            )}
                        </div>
                    </Card>

                    {/* Document Status */}
                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-900">Document Status</h2>
                            <Link 
                                to="/documents" 
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                            >
                                Manage <ArrowRight className="h-4 w-4 ml-1" />
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {pendingDocuments.length > 0 ? (
                                pendingDocuments.map((document) => (
                                    <div key={document.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <div className="p-2 bg-white rounded-lg">
                                                <FileText className="h-5 w-5 text-gray-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900 text-sm">
                                                    {document.name}
                                                </p>
                                                <p className="text-xs text-gray-600">
                                                    {document.type}
                                                </p>
                                            </div>
                                        </div>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(document.status)}`}>
                                            {document.status}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-4 text-gray-500">
                                    <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-300" />
                                    <p className="text-sm">All documents up to date!</p>
                                </div>
                            )}
                        </div>
                    </Card>
                </div>

                {/* Transfer Progress */}
                {recentTransfers.length > 0 && (
                    <Card className="p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Transfer Timeline</h2>
                        <div className="space-y-4">
                            {recentTransfers.slice(0, 2).map((transfer) => (
                                <div key={transfer.id} className="border rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="font-medium text-gray-900">
                                            {transfer.vehicleInfo?.registrationNumber} - {transfer.vehicleInfo?.makeModel}
                                        </h3>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transfer.status)}`}>
                                            {transfer.status}
                                        </span>
                                    </div>
                                    <ProgressBar 
                                        progress={
                                            transfer.status === 'completed' ? 100 :
                                            transfer.status === 'review' ? 75 :
                                            transfer.status === 'processing' ? 50 :
                                            transfer.status === 'pending' ? 25 : 10
                                        }
                                        className="mb-3"
                                    />
                                    <div className="grid grid-cols-4 gap-2 text-xs">
                                        <div className={`text-center ${['pending', 'processing', 'review', 'completed'].includes(transfer.status) ? 'text-blue-600' : 'text-gray-400'}`}>
                                            Application
                                        </div>
                                        <div className={`text-center ${['processing', 'review', 'completed'].includes(transfer.status) ? 'text-blue-600' : 'text-gray-400'}`}>
                                            Processing
                                        </div>
                                        <div className={`text-center ${['review', 'completed'].includes(transfer.status) ? 'text-blue-600' : 'text-gray-400'}`}>
                                            Review
                                        </div>
                                        <div className={`text-center ${transfer.status === 'completed' ? 'text-green-600' : 'text-gray-400'}`}>
                                            Completed
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                )}
            </div>
        </PageLayout>
    );
};

export default Dashboard;
