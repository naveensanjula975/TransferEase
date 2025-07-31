import React, { useState } from 'react';
import { 
    Shield, 
    Users, 
    Car, 
    BarChart3, 
    Settings,
    CheckCircle,
    Monitor,
    Database,
    Activity,
    AlertTriangle,
    Bell,
    TrendingUp,
    Eye,
    Download
} from 'lucide-react';
import { Card, Button } from '../shared';
import { AdminDashboard } from './';

const AdminDashboardDemo = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [showLiveDashboard, setShowLiveDashboard] = useState(false);

    const demoTabs = [
        { id: 'overview', label: 'Demo Overview', icon: Shield },
        { id: 'features', label: 'Admin Features', icon: Settings },
        { id: 'capabilities', label: 'System Capabilities', icon: Monitor },
        { id: 'live', label: 'Live Dashboard', icon: Activity }
    ];

    const adminFeatures = [
        {
            icon: Users,
            title: 'User Management',
            description: 'Complete user administration with verification, suspension, and bulk operations',
            features: ['User verification workflow', 'Account suspension/activation', 'Bulk user operations', 'User communication tools']
        },
        {
            icon: Car,
            title: 'Transfer Queue Management',
            description: 'Advanced transfer processing with priority handling and approval workflows',
            features: ['Priority-based queue processing', 'Transfer approval/rejection', 'Document verification', 'Payment status tracking']
        },
        {
            icon: BarChart3,
            title: 'Advanced Analytics',
            description: 'Comprehensive reporting and analytics with real-time data visualization',
            features: ['Revenue trend analysis', 'Transfer performance metrics', 'User behavior analytics', 'Custom report generation']
        },
        {
            icon: Monitor,
            title: 'System Monitoring',
            description: 'Real-time system health monitoring and performance tracking',
            features: ['Server performance monitoring', 'Database health tracking', 'Network status monitoring', 'Automated alert system']
        },
        {
            icon: Database,
            title: 'Data Management',
            description: 'Secure data handling with backup and recovery capabilities',
            features: ['Automated data backups', 'Data integrity checks', 'Export/import functionality', 'Data retention policies']
        },
        {
            icon: Bell,
            title: 'Notification Center',
            description: 'Centralized notification management with priority handling',
            features: ['Priority-based notifications', 'Bulk notification actions', 'Custom notification rules', 'Email/SMS integration']
        }
    ];

    const systemCapabilities = [
        {
            category: 'Administrative Controls',
            items: [
                'Role-based access control with granular permissions',
                'Multi-level approval workflows for sensitive operations',
                'Audit trail logging for all administrative actions',
                'System configuration and settings management'
            ]
        },
        {
            category: 'Data Analytics & Reporting',
            items: [
                'Real-time dashboard with key performance indicators',
                'Custom report builder with flexible parameters',
                'Automated report scheduling and distribution',
                'Data export in multiple formats (PDF, Excel, CSV)'
            ]
        },
        {
            category: 'Security & Compliance',
            items: [
                'Advanced security monitoring and threat detection',
                'Compliance reporting for regulatory requirements',
                'Data encryption and secure communication protocols',
                'Regular security audits and vulnerability assessments'
            ]
        },
        {
            category: 'Performance & Scalability',
            items: [
                'High-performance architecture supporting concurrent users',
                'Automatic scaling based on system load',
                'Performance optimization and resource management',
                ' 99.9% uptime guarantee with redundancy systems'
            ]
        }
    ];

    const renderOverview = () => (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
                    <Shield className="w-8 h-8 text-slate-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Administrative Dashboard Demo
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Comprehensive administrative interface with advanced user management, 
                    transfer processing, analytics, and system monitoring capabilities.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6 text-center">
                    <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">User Management</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Complete user administration with verification workflows and bulk operations
                    </p>
                    <div className="space-y-2 text-left">
                        <div className="flex items-center text-xs text-gray-600">
                            <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                            User verification & approval
                        </div>
                        <div className="flex items-center text-xs text-gray-600">
                            <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                            Account suspension/activation
                        </div>
                        <div className="flex items-center text-xs text-gray-600">
                            <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                            Bulk user operations
                        </div>
                    </div>
                </Card>

                <Card className="p-6 text-center">
                    <Car className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Transfer Processing</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Advanced transfer queue management with priority handling and approvals
                    </p>
                    <div className="space-y-2 text-left">
                        <div className="flex items-center text-xs text-gray-600">
                            <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                            Priority-based queue processing
                        </div>
                        <div className="flex items-center text-xs text-gray-600">
                            <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                            Transfer approval/rejection
                        </div>
                        <div className="flex items-center text-xs text-gray-600">
                            <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                            Document verification
                        </div>
                    </div>
                </Card>

                <Card className="p-6 text-center">
                    <BarChart3 className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics & Reports</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Comprehensive analytics with real-time data visualization and reporting
                    </p>
                    <div className="space-y-2 text-left">
                        <div className="flex items-center text-xs text-gray-600">
                            <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                            Real-time analytics dashboard
                        </div>
                        <div className="flex items-center text-xs text-gray-600">
                            <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                            Custom report generation
                        </div>
                        <div className="flex items-center text-xs text-gray-600">
                            <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                            Performance metrics tracking
                        </div>
                    </div>
                </Card>
            </div>

            <Card className="p-6 bg-gradient-to-r from-slate-50 to-slate-100">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Enterprise-Grade Administration
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Built for scale with advanced security, comprehensive monitoring, 
                            and powerful administrative tools for managing large-scale vehicle transfer operations.
                        </p>
                        <div className="flex items-center space-x-6 text-sm text-gray-600">
                            <div className="flex items-center">
                                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                                <span>99.9% Uptime</span>
                            </div>
                            <div className="flex items-center">
                                <Shield className="h-4 w-4 text-blue-500 mr-1" />
                                <span>Enterprise Security</span>
                            </div>
                            <div className="flex items-center">
                                <Monitor className="h-4 w-4 text-purple-500 mr-1" />
                                <span>Real-time Monitoring</span>
                            </div>
                        </div>
                    </div>
                    <Button
                        onClick={() => setShowLiveDashboard(true)}
                        className="bg-slate-700 hover:bg-slate-800"
                    >
                        View Live Dashboard
                    </Button>
                </div>
            </Card>
        </div>
    );

    const renderFeatures = () => (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Administrative Features</h2>
                <p className="text-gray-600">
                    Comprehensive suite of administrative tools and capabilities
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {adminFeatures.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                        <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-gray-100 rounded-lg">
                                    <Icon className="h-6 w-6 text-gray-700" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                                    <p className="text-sm text-gray-600 mb-4">{feature.description}</p>
                                    <ul className="space-y-1">
                                        {feature.features.map((item, itemIndex) => (
                                            <li key={itemIndex} className="text-xs text-gray-600 flex items-center">
                                                <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );

    const renderCapabilities = () => (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">System Capabilities</h2>
                <p className="text-gray-600">
                    Enterprise-level capabilities for robust vehicle transfer administration
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {systemCapabilities.map((capability, index) => (
                    <Card key={index} className="p-6">
                        <h3 className="font-semibold text-gray-900 mb-4">{capability.category}</h3>
                        <ul className="space-y-3">
                            {capability.items.map((item, itemIndex) => (
                                <li key={itemIndex} className="text-sm text-gray-600 flex items-start">
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </Card>
                ))}
            </div>

            <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready for Production</h3>
                    <p className="text-gray-600 mb-4">
                        The administrative dashboard is built with enterprise-grade security, 
                        scalability, and performance in mind, ready to handle large-scale operations.
                    </p>
                    <div className="flex items-center justify-center space-x-8 text-sm">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">10K+</div>
                            <div className="text-gray-600">Concurrent Users</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">99.9%</div>
                            <div className="text-gray-600">Uptime SLA</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">24/7</div>
                            <div className="text-gray-600">Monitoring</div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );

    if (showLiveDashboard) {
        return (
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">Live Administrative Dashboard</h2>
                    <Button
                        variant="outline"
                        onClick={() => setShowLiveDashboard(false)}
                    >
                        Back to Demo
                    </Button>
                </div>
                <AdminDashboard />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Demo Navigation */}
            <Card className="p-1">
                <div className="flex items-center space-x-1">
                    {demoTabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    activeTab === tab.id
                                        ? 'bg-slate-100 text-slate-700'
                                        : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                <Icon className="h-4 w-4" />
                                <span>{tab.label}</span>
                            </button>
                        );
                    })}
                </div>
            </Card>

            {/* Demo Content */}
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'features' && renderFeatures()}
            {activeTab === 'capabilities' && renderCapabilities()}
            {activeTab === 'live' && (
                <div className="text-center py-12">
                    <Activity className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Ready to Explore the Live Dashboard?
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Experience the full administrative interface with live data and interactive features.
                    </p>
                    <Button
                        onClick={() => setShowLiveDashboard(true)}
                        className="bg-slate-700 hover:bg-slate-800"
                    >
                        Launch Live Dashboard
                    </Button>
                </div>
            )}
        </div>
    );
};

export default AdminDashboardDemo;
