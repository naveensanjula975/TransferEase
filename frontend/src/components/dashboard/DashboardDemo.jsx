import React, { useState } from 'react';
import { 
    Layout, 
    BarChart3, 
    Users, 
    Car, 
    FileText,
    CheckCircle,
    Clock,
    TrendingUp,
    Activity,
    Bell,
    Calendar,
    Eye,
    PlayCircle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, Button } from '../shared';
import { PageLayout } from '../layout';
import Dashboard from './Dashboard';

const DashboardDemo = () => {
    const { user, isAuthenticated } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');
    const [showLiveDashboard, setShowLiveDashboard] = useState(false);

    const features = [
        {
            icon: BarChart3,
            title: 'Real-time Statistics',
            description: 'Live dashboard with active transfers, completed applications, and success rates',
            status: 'Implemented'
        },
        {
            icon: Activity,
            title: 'Recent Activity Feed',
            description: 'Track recent transfer activities with status updates and timestamps',
            status: 'Implemented'
        },
        {
            icon: Bell,
            title: 'Smart Notifications',
            description: 'Contextual notifications for document requirements, approvals, and updates',
            status: 'Implemented'
        },
        {
            icon: Car,
            title: 'Vehicle Management',
            description: 'Overview of registered vehicles with quick access to details',
            status: 'Implemented'
        },
        {
            icon: FileText,
            title: 'Document Tracking',
            description: 'Monitor document upload status and pending requirements',
            status: 'Implemented'
        },
        {
            icon: TrendingUp,
            title: 'Progress Timeline',
            description: 'Visual progress tracking for ongoing transfer applications',
            status: 'Implemented'
        }
    ];

    const tabs = [
        { id: 'overview', label: 'Overview', icon: Layout },
        { id: 'features', label: 'Features', icon: CheckCircle },
        { id: 'data', label: 'Data Integration', icon: BarChart3 },
        { id: 'live', label: 'Live Dashboard', icon: PlayCircle }
    ];

    const customBreadcrumbItems = [
        { label: 'Components', href: '/components', icon: Layout },
        { label: 'Dashboard', href: '/components/dashboard' },
        { label: 'User Dashboard Demo' }
    ];

    const renderOverview = () => (
        <div className="space-y-6">
            <div className="text-center py-8">
                <BarChart3 className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    User Dashboard System
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    A comprehensive dashboard system providing users with real-time insights into their 
                    vehicle transfer activities, document status, and notifications.
                </p>
            </div>

            {/* Current User Status */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Current User Context</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-3">
                            <Users className="h-5 w-5 text-blue-600" />
                            <div>
                                <p className="font-medium text-gray-900">User</p>
                                <p className="text-sm text-gray-600">
                                    {isAuthenticated ? `${user?.firstName} ${user?.lastName}` : 'Not Authenticated'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Activity className="h-5 w-5 text-blue-600" />
                            <div>
                                <p className="font-medium text-gray-900">Dashboard Access</p>
                                <p className="text-sm text-gray-600">
                                    {isAuthenticated ? 'Full Access' : 'Login Required'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <BarChart3 className="h-5 w-5 text-blue-600" />
                            <div>
                                <p className="font-medium text-gray-900">Data Integration</p>
                                <p className="text-sm text-gray-600">Mock Data Active</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Dashboard Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                    <div className="p-6 text-center">
                        <Activity className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <h3 className="text-lg font-semibold text-gray-900">8</h3>
                        <p className="text-sm text-gray-600">Dashboard Sections</p>
                    </div>
                </Card>
                <Card>
                    <div className="p-6 text-center">
                        <Bell className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <h3 className="text-lg font-semibold text-gray-900">Real-time</h3>
                        <p className="text-sm text-gray-600">Notifications</p>
                    </div>
                </Card>
                <Card>
                    <div className="p-6 text-center">
                        <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                        <h3 className="text-lg font-semibold text-gray-900">Dynamic</h3>
                        <p className="text-sm text-gray-600">Progress Tracking</p>
                    </div>
                </Card>
                <Card>
                    <div className="p-6 text-center">
                        <CheckCircle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                        <h3 className="text-lg font-semibold text-gray-900">100%</h3>
                        <p className="text-sm text-gray-600">Responsive</p>
                    </div>
                </Card>
            </div>
        </div>
    );

    const renderFeatures = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                        <div className="p-6">
                            <div className="flex items-start space-x-4">
                                <div className="bg-blue-100 p-3 rounded-lg">
                                    <Icon className="h-6 w-6 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 mb-3">
                                        {feature.description}
                                    </p>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        <CheckCircle className="h-3 w-3 mr-1" />
                                        {feature.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Card>
                );
            })}
        </div>
    );

    const renderDataIntegration = () => (
        <div className="space-y-6">
            <Card>
                <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Mock Data Integration
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-medium text-gray-900 mb-2">Transfer Data</h4>
                            <div className="space-y-1 text-sm text-gray-600">
                                <div className="flex items-center justify-between">
                                    <span>User-specific transfer history</span>
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Real-time status tracking</span>
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Progress calculation</span>
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-medium text-gray-900 mb-2">Vehicle Data</h4>
                            <div className="space-y-1 text-sm text-gray-600">
                                <div className="flex items-center justify-between">
                                    <span>Vehicle ownership lookup</span>
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Registration details</span>
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Status management</span>
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-medium text-gray-900 mb-2">Document Management</h4>
                            <div className="space-y-1 text-sm text-gray-600">
                                <div className="flex items-center justify-between">
                                    <span>Document upload tracking</span>
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Verification status</span>
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Pending requirements</span>
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            <Card>
                <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Dashboard Statistics
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <h4 className="font-medium text-gray-900">Calculated Metrics</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Active transfer count</li>
                                <li>• Completion success rate</li>
                                <li>• Pending document count</li>
                                <li>• Vehicle registration status</li>
                            </ul>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-medium text-gray-900">Real-time Updates</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Transfer status changes</li>
                                <li>• Document verification updates</li>
                                <li>• Payment confirmations</li>
                                <li>• System notifications</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );

    const renderLiveDashboard = () => (
        <div className="space-y-6">
            {!isAuthenticated ? (
                <Card className="p-6 text-center">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Authentication Required
                    </h3>
                    <p className="text-gray-600 mb-4">
                        Please log in to view the live dashboard with your personalized data.
                    </p>
                    <Button
                        variant="primary"
                        onClick={() => window.location.href = '/login'}
                    >
                        Login to View Dashboard
                    </Button>
                </Card>
            ) : (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Live User Dashboard
                        </h3>
                        <Button
                            variant={showLiveDashboard ? "ghost" : "primary"}
                            onClick={() => setShowLiveDashboard(!showLiveDashboard)}
                        >
                            {showLiveDashboard ? 'Hide Dashboard' : 'Show Live Dashboard'}
                        </Button>
                    </div>
                    
                    {showLiveDashboard && (
                        <div className="border-2 border-blue-200 rounded-lg">
                            <Dashboard />
                        </div>
                    )}
                </div>
            )}
        </div>
    );

    if (showLiveDashboard && isAuthenticated) {
        return <Dashboard />;
    }

    return (
        <PageLayout 
            showSidebar={true} 
            breadcrumbItems={customBreadcrumbItems}
            containerClassName="p-6"
        >
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center space-x-3 mb-4">
                        <BarChart3 className="h-8 w-8 text-blue-600" />
                        <h1 className="text-3xl font-bold text-gray-900">
                            User Dashboard Demo
                        </h1>
                    </div>
                    <p className="text-lg text-gray-600">
                        Comprehensive user dashboard with real-time data integration and interactive features.
                    </p>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200 mb-8">
                    <nav className="-mb-px flex space-x-8">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                                        activeTab === tab.id
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    <Icon className="h-4 w-4" />
                                    <span>{tab.label}</span>
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Tab Content */}
                <div>
                    {activeTab === 'overview' && renderOverview()}
                    {activeTab === 'features' && renderFeatures()}
                    {activeTab === 'data' && renderDataIntegration()}
                    {activeTab === 'live' && renderLiveDashboard()}
                </div>
            </div>
        </PageLayout>
    );
};

export default DashboardDemo;
