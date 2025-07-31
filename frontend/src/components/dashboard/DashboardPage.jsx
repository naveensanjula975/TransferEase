import React, { useState } from 'react';
import { 
    LayoutDashboard,
    Users,
    Car,
    FileText,
    Bell,
    Activity,
    BarChart3,
    Settings,
    Plus,
    Filter,
    Download,
    RefreshCw
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { PageLayout } from '../layout';
import { Button, Card } from '../shared';
import { 
    Dashboard, 
    QuickStatsGrid,
    DocumentsList,
    VehiclesList,
    NotificationCenter,
    ActivityTimeline
} from './';

const DashboardPage = () => {
    const { user } = useAuth();
    const [activeView, setActiveView] = useState('overview');
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = async () => {
        setRefreshing(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setRefreshing(false);
    };

    const viewOptions = [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'vehicles', label: 'My Vehicles', icon: Car },
        { id: 'documents', label: 'Documents', icon: FileText },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'activity', label: 'Activity', icon: Activity },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 }
    ];

    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Dashboard', href: '/dashboard' }
    ];

    const renderContent = () => {
        switch (activeView) {
            case 'overview':
                return <Dashboard />;
            case 'vehicles':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900">My Vehicles</h2>
                            <div className="flex items-center space-x-3">
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
                                    <Plus className="h-4 w-4" />
                                    <span>Add Vehicle</span>
                                </Button>
                            </div>
                        </div>
                        <VehiclesList 
                            vehicles={[]} // Would be populated from context/API
                            onView={(vehicle) => console.log('View vehicle:', vehicle)}
                            onEdit={(vehicle) => console.log('Edit vehicle:', vehicle)}
                            onDelete={(vehicle) => console.log('Delete vehicle:', vehicle)}
                            onInitiateTransfer={(vehicle) => console.log('Transfer vehicle:', vehicle)}
                            onAddNew={() => console.log('Add new vehicle')}
                        />
                    </div>
                );
            case 'documents':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900">Documents</h2>
                            <div className="flex items-center space-x-3">
                                <Button
                                    variant="outline"
                                    className="flex items-center space-x-2"
                                >
                                    <Download className="h-4 w-4" />
                                    <span>Export All</span>
                                </Button>
                                <Button className="flex items-center space-x-2">
                                    <Plus className="h-4 w-4" />
                                    <span>Upload Document</span>
                                </Button>
                            </div>
                        </div>
                        <DocumentsList 
                            documents={[]} // Would be populated from context/API
                            onView={(doc) => console.log('View document:', doc)}
                            onDownload={(doc) => console.log('Download document:', doc)}
                            onUpload={(doc) => console.log('Upload document:', doc)}
                        />
                    </div>
                );
            case 'notifications':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
                            <Button
                                variant="outline"
                                className="flex items-center space-x-2"
                            >
                                <Settings className="h-4 w-4" />
                                <span>Notification Settings</span>
                            </Button>
                        </div>
                        <NotificationCenter 
                            notifications={[]} // Would be populated from context/API
                            onDismiss={(id) => console.log('Dismiss notification:', id)}
                            onAction={(notification) => console.log('Action on notification:', notification)}
                            onMarkAllRead={() => console.log('Mark all read')}
                        />
                    </div>
                );
            case 'activity':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900">Activity Timeline</h2>
                            <div className="flex items-center space-x-3">
                                <Button
                                    variant="outline"
                                    className="flex items-center space-x-2"
                                >
                                    <Filter className="h-4 w-4" />
                                    <span>Filter</span>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="flex items-center space-x-2"
                                >
                                    <Download className="h-4 w-4" />
                                    <span>Export</span>
                                </Button>
                            </div>
                        </div>
                        <ActivityTimeline 
                            activities={[]} // Would be populated from context/API
                            title="Recent Activity"
                        />
                    </div>
                );
            case 'analytics':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900">Analytics & Reports</h2>
                            <Button
                                variant="outline"
                                className="flex items-center space-x-2"
                            >
                                <Download className="h-4 w-4" />
                                <span>Generate Report</span>
                            </Button>
                        </div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Transfer Statistics</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Success Rate</span>
                                        <span className="text-sm font-medium">94.5%</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Average Processing Time</span>
                                        <span className="text-sm font-medium">3.2 days</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Total Transfers</span>
                                        <span className="text-sm font-medium">24</span>
                                    </div>
                                </div>
                            </Card>
                            
                            <Card className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Status</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Verified Documents</span>
                                        <span className="text-sm font-medium">18</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Pending Review</span>
                                        <span className="text-sm font-medium">3</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Missing Documents</span>
                                        <span className="text-sm font-medium">1</span>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                );
            default:
                return <Dashboard />;
        }
    };

    return (
        <PageLayout breadcrumbItems={breadcrumbItems}>
            <div className="space-y-6">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">Welcome back, {user?.firstName || 'User'}!</h1>
                            <p className="text-blue-100 mt-1">
                                Here's what's happening with your vehicle transfers today.
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-blue-100 text-sm">Today's Date</p>
                            <p className="text-white font-medium">{new Date().toLocaleDateString()}</p>
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
                                            ? 'bg-blue-100 text-blue-700'
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
                    {renderContent()}
                </div>
            </div>
        </PageLayout>
    );
};

export default DashboardPage;
