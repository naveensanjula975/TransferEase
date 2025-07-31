import React, { useState } from 'react';
import { 
    Layout, 
    Smartphone, 
    Monitor, 
    Tablet, 
    Navigation, 
    User, 
    Settings,
    CheckCircle,
    Eye,
    Menu,
    Home,
    Car,
    Shield
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, Button } from '../shared';
import { PageLayout, Breadcrumb } from './';

const NavigationDemo = () => {
    const { user, isAuthenticated } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');
    const [viewMode, setViewMode] = useState('desktop');

    const features = [
        {
            icon: Layout,
            title: 'Responsive Design',
            description: 'Fully responsive navigation that adapts to different screen sizes',
            status: 'Implemented'
        },
        {
            icon: User,
            title: 'Role-Based Navigation',
            description: 'Different navigation items based on user roles (admin/user/guest)',
            status: 'Implemented'
        },
        {
            icon: Navigation,
            title: 'Dynamic Breadcrumbs',
            description: 'Auto-generated breadcrumbs based on current route',
            status: 'Implemented'
        },
        {
            icon: Smartphone,
            title: 'Mobile Drawer',
            description: 'Slide-out navigation drawer optimized for mobile devices',
            status: 'Implemented'
        },
        {
            icon: Settings,
            title: 'Collapsible Sidebar',
            description: 'Sidebar that can be collapsed for more content space',
            status: 'Implemented'
        },
        {
            icon: Eye,
            title: 'Visual Feedback',
            description: 'Active states, hover effects, and smooth transitions',
            status: 'Implemented'
        }
    ];

    const tabs = [
        { id: 'overview', label: 'Overview', icon: Layout },
        { id: 'features', label: 'Features', icon: CheckCircle },
        { id: 'responsive', label: 'Responsive', icon: Smartphone },
        { id: 'navigation', label: 'Navigation', icon: Menu }
    ];

    const customBreadcrumbItems = [
        { label: 'Components', href: '/components', icon: Layout },
        { label: 'Layout', href: '/components/layout' },
        { label: 'Navigation Demo' }
    ];

    const renderOverview = () => (
        <div className="space-y-6">
            <div className="text-center py-8">
                <Layout className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Navigation & Layout System
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    A comprehensive navigation and layout system with responsive design, 
                    role-based access control, and seamless user experience across all devices.
                </p>
            </div>

            {/* User Status */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Current User Status</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-3">
                            <User className="h-5 w-5 text-blue-600" />
                            <div>
                                <p className="font-medium text-gray-900">Authentication</p>
                                <p className="text-sm text-gray-600">
                                    {isAuthenticated ? 'Authenticated' : 'Guest'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Shield className="h-5 w-5 text-blue-600" />
                            <div>
                                <p className="font-medium text-gray-900">Role</p>
                                <p className="text-sm text-gray-600 capitalize">
                                    {user?.role || 'Guest'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Navigation className="h-5 w-5 text-blue-600" />
                            <div>
                                <p className="font-medium text-gray-900">Navigation</p>
                                <p className="text-sm text-gray-600">
                                    {isAuthenticated ? 'Full Access' : 'Limited'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <div className="p-6 text-center">
                        <Layout className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <h3 className="text-lg font-semibold text-gray-900">5</h3>
                        <p className="text-sm text-gray-600">Layout Components</p>
                    </div>
                </Card>
                <Card>
                    <div className="p-6 text-center">
                        <Menu className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <h3 className="text-lg font-semibold text-gray-900">3</h3>
                        <p className="text-sm text-gray-600">Navigation Modes</p>
                    </div>
                </Card>
                <Card>
                    <div className="p-6 text-center">
                        <CheckCircle className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                        <h3 className="text-lg font-semibold text-gray-900">100%</h3>
                        <p className="text-sm text-gray-600">Mobile Ready</p>
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

    const renderResponsive = () => (
        <div className="space-y-6">
            <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Responsive Design Showcase
                </h3>
                <p className="text-gray-600 mb-6">
                    Experience how the navigation adapts to different screen sizes
                </p>
                
                {/* View Mode Selector */}
                <div className="flex justify-center space-x-2 mb-6">
                    <Button
                        variant={viewMode === 'desktop' ? 'primary' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('desktop')}
                        className="flex items-center space-x-2"
                    >
                        <Monitor className="h-4 w-4" />
                        <span>Desktop</span>
                    </Button>
                    <Button
                        variant={viewMode === 'tablet' ? 'primary' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('tablet')}
                        className="flex items-center space-x-2"
                    >
                        <Tablet className="h-4 w-4" />
                        <span>Tablet</span>
                    </Button>
                    <Button
                        variant={viewMode === 'mobile' ? 'primary' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('mobile')}
                        className="flex items-center space-x-2"
                    >
                        <Smartphone className="h-4 w-4" />
                        <span>Mobile</span>
                    </Button>
                </div>
            </div>

            {/* Responsive Info */}
            <Card>
                <div className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                        {viewMode === 'desktop' && 'Desktop Experience'}
                        {viewMode === 'tablet' && 'Tablet Experience'}
                        {viewMode === 'mobile' && 'Mobile Experience'}
                    </h4>
                    
                    <div className="space-y-3">
                        {viewMode === 'desktop' && (
                            <>
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                    <span className="text-sm text-gray-700">Full horizontal navigation bar</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                    <span className="text-sm text-gray-700">Collapsible sidebar for authenticated users</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                    <span className="text-sm text-gray-700">Dropdown menus and profile controls</span>
                                </div>
                            </>
                        )}
                        
                        {viewMode === 'tablet' && (
                            <>
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                    <span className="text-sm text-gray-700">Simplified navigation bar layout</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                    <span className="text-sm text-gray-700">Touch-optimized interaction elements</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                    <span className="text-sm text-gray-700">Responsive sidebar behavior</span>
                                </div>
                            </>
                        )}
                        
                        {viewMode === 'mobile' && (
                            <>
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                    <span className="text-sm text-gray-700">Hamburger menu for navigation</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                    <span className="text-sm text-gray-700">Full-screen mobile drawer</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                    <span className="text-sm text-gray-700">Touch-friendly interface elements</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </Card>
        </div>
    );

    const renderNavigation = () => (
        <div className="space-y-6">
            <Card>
                <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Navigation Structure
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-medium text-gray-900 mb-2">Public Navigation</h4>
                            <div className="space-y-1 text-sm text-gray-600">
                                <div className="flex items-center space-x-2">
                                    <Home className="h-4 w-4" />
                                    <span>Home</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Car className="h-4 w-4" />
                                    <span>Vehicles</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="h-4 w-4 flex items-center justify-center text-xs">ℹ</span>
                                    <span>About</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="h-4 w-4 flex items-center justify-center text-xs">📞</span>
                                    <span>Contact</span>
                                </div>
                            </div>
                        </div>

                        {isAuthenticated && (
                            <div>
                                <h4 className="font-medium text-gray-900 mb-2">
                                    {user?.role === 'admin' ? 'Admin Navigation' : 'User Navigation'}
                                </h4>
                                <div className="space-y-1 text-sm text-gray-600">
                                    {user?.role === 'admin' ? (
                                        <>
                                            <div className="flex items-center space-x-2">
                                                <Shield className="h-4 w-4" />
                                                <span>Admin Dashboard</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <User className="h-4 w-4" />
                                                <span>User Management</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Car className="h-4 w-4" />
                                                <span>Vehicle Management</span>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex items-center space-x-2">
                                                <User className="h-4 w-4" />
                                                <span>Dashboard</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Car className="h-4 w-4" />
                                                <span>My Bookings</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="h-4 w-4 flex items-center justify-center text-xs">🔔</span>
                                                <span>Notifications</span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Card>

            <Card>
                <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Interactive Elements
                    </h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">Active Route Highlighting</span>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">Hover Effects</span>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">Smooth Transitions</span>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">Keyboard Navigation</span>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">Screen Reader Support</span>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );

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
                        <Layout className="h-8 w-8 text-blue-600" />
                        <h1 className="text-3xl font-bold text-gray-900">
                            Navigation & Layout Demo
                        </h1>
                    </div>
                    <p className="text-lg text-gray-600">
                        Comprehensive navigation and layout system with responsive design and role-based access.
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
                    {activeTab === 'responsive' && renderResponsive()}
                    {activeTab === 'navigation' && renderNavigation()}
                </div>
            </div>
        </PageLayout>
    );
};

export default NavigationDemo;
