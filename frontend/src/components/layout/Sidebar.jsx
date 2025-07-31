import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
    Home, 
    Car, 
    User, 
    Settings, 
    Bell, 
    FileText, 
    BarChart3, 
    Shield, 
    Users, 
    Calendar,
    CreditCard,
    MessageSquare,
    ChevronLeft,
    ChevronRight,
    LogOut
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const location = useLocation();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const isActiveRoute = (path) => {
        return location.pathname === path || location.pathname.startsWith(path + '/');
    };

    // Get sidebar items based on user role
    const getSidebarItems = () => {
        if (!isAuthenticated) return [];

        const commonItems = [
            {
                section: 'Main',
                items: [
                    { path: '/dashboard', label: 'Dashboard', icon: Home },
                    { path: '/profile', label: 'Profile', icon: User },
                    { path: '/settings', label: 'Settings', icon: Settings },
                ]
            }
        ];

        if (user?.role === 'admin') {
            return [
                {
                    section: 'Admin',
                    items: [
                        { path: '/admin/dashboard', label: 'Admin Dashboard', icon: Shield },
                        { path: '/admin/users', label: 'User Management', icon: Users },
                        { path: '/admin/vehicles', label: 'Vehicle Management', icon: Car },
                        { path: '/admin/bookings', label: 'Booking Management', icon: Calendar },
                        { path: '/admin/reports', label: 'Reports', icon: BarChart3 },
                        { path: '/admin/messages', label: 'Messages', icon: MessageSquare },
                    ]
                },
                ...commonItems
            ];
        }

        // Regular user items
        return [
            {
                section: 'Dashboard',
                items: [
                    { path: '/dashboard', label: 'Overview', icon: Home },
                    { path: '/bookings', label: 'My Bookings', icon: Car },
                    { path: '/notifications', label: 'Notifications', icon: Bell },
                    { path: '/documents', label: 'Documents', icon: FileText },
                ]
            },
            {
                section: 'Account',
                items: [
                    { path: '/profile', label: 'Profile', icon: User },
                    { path: '/payment-methods', label: 'Payment Methods', icon: CreditCard },
                    { path: '/settings', label: 'Settings', icon: Settings },
                ]
            }
        ];
    };

    const sidebarSections = getSidebarItems();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    // Don't render sidebar if user is not authenticated
    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 transition-all duration-300 z-40 ${
            isCollapsed ? 'w-16' : 'w-64'
        }`}>
            {/* Collapse Toggle */}
            <div className="flex items-center justify-end p-4 border-b border-gray-200">
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                >
                    {isCollapsed ? (
                        <ChevronRight className="h-4 w-4" />
                    ) : (
                        <ChevronLeft className="h-4 w-4" />
                    )}
                </button>
            </div>

            {/* User Info */}
            {!isCollapsed && (
                <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-blue-600 text-white rounded-full flex items-center justify-center">
                            <User className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                                {user?.firstName} {user?.lastName}
                            </p>
                            <p className="text-xs text-gray-500 capitalize">
                                {user?.role}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto">
                <div className="px-3 py-4 space-y-6">
                    {sidebarSections.map((section) => (
                        <div key={section.section}>
                            {!isCollapsed && (
                                <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    {section.section}
                                </h3>
                            )}
                            <ul className={`space-y-1 ${!isCollapsed ? 'mt-2' : ''}`}>
                                {section.items.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = isActiveRoute(item.path);
                                    
                                    return (
                                        <li key={item.path}>
                                            <Link
                                                to={item.path}
                                                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                                                    isActive
                                                        ? 'bg-blue-100 text-blue-700'
                                                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                                                }`}
                                                title={isCollapsed ? item.label : ''}
                                            >
                                                <Icon
                                                    className={`flex-shrink-0 h-5 w-5 ${
                                                        isActive
                                                            ? 'text-blue-500'
                                                            : 'text-gray-400 group-hover:text-gray-500'
                                                    } ${isCollapsed ? 'mx-auto' : 'mr-3'}`}
                                                />
                                                {!isCollapsed && (
                                                    <span className="truncate">{item.label}</span>
                                                )}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </div>
            </nav>

            {/* Logout Button */}
            <div className="border-t border-gray-200 p-3">
                <button
                    onClick={handleLogout}
                    className={`group flex items-center w-full px-2 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors ${
                        isCollapsed ? 'justify-center' : ''
                    }`}
                    title={isCollapsed ? 'Sign Out' : ''}
                >
                    <LogOut
                        className={`flex-shrink-0 h-5 w-5 ${
                            isCollapsed ? 'mx-auto' : 'mr-3'
                        }`}
                    />
                    {!isCollapsed && <span>Sign Out</span>}
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
