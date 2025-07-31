import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
    Menu, 
    X, 
    ChevronDown, 
    User, 
    Settings, 
    LogOut, 
    Car,
    Home,
    Info,
    Phone,
    Shield,
    Bell
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../shared';
import MobileDrawer from './MobileDrawer';

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsProfileDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
            setIsProfileDropdownOpen(false);
            setIsMobileMenuOpen(false);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const isActiveRoute = (path) => {
        return location.pathname === path;
    };

    // Navigation items based on user role
    const getNavigationItems = () => {
        const commonItems = [
            { path: '/', label: 'Home', icon: Home },
            { path: '/vehicles', label: 'Vehicles', icon: Car },
            { path: '/about', label: 'About', icon: Info },
            { path: '/contact', label: 'Contact', icon: Phone },
        ];

        if (!isAuthenticated) {
            return commonItems;
        }

        if (user?.role === 'admin') {
            return [
                ...commonItems,
                { path: '/admin/dashboard', label: 'Admin Dashboard', icon: Shield },
                { path: '/admin/users', label: 'User Management', icon: User },
                { path: '/admin/vehicles', label: 'Vehicle Management', icon: Car },
            ];
        }

        // Regular user items
        return [
            ...commonItems,
            { path: '/dashboard', label: 'Dashboard', icon: User },
            { path: '/bookings', label: 'My Bookings', icon: Car },
            { path: '/notifications', label: 'Notifications', icon: Bell },
        ];
    };

    const navigationItems = getNavigationItems();

    return (
        <>
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/" className="flex items-center space-x-2">
                                <Car className="h-8 w-8 text-blue-600" />
                                <span className="text-xl font-bold text-gray-900">
                                    TransferEase
                                </span>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            {navigationItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                            isActiveRoute(item.path)
                                                ? 'text-blue-600 bg-blue-50'
                                                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                                        }`}
                                    >
                                        <Icon className="h-4 w-4" />
                                        <span>{item.label}</span>
                                    </Link>
                                );
                            })}
                        </div>

                        {/* User Authentication Section */}
                        <div className="hidden md:flex items-center space-x-4">
                            {isAuthenticated ? (
                                <div className="relative" ref={dropdownRef}>
                                    <button
                                        onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                        className="flex items-center space-x-2 bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors"
                                    >
                                        <div className="h-8 w-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
                                            <User className="h-4 w-4" />
                                        </div>
                                        <span className="text-sm font-medium text-gray-700">
                                            {user?.firstName || 'User'}
                                        </span>
                                        <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${
                                            isProfileDropdownOpen ? 'rotate-180' : ''
                                        }`} />
                                    </button>

                                    {/* Profile Dropdown */}
                                    {isProfileDropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50">
                                            <div className="px-4 py-2 border-b border-gray-100">
                                                <p className="text-sm font-medium text-gray-900">
                                                    {user?.firstName} {user?.lastName}
                                                </p>
                                                <p className="text-xs text-gray-500 capitalize">
                                                    {user?.role}
                                                </p>
                                            </div>
                                            <Link
                                                to="/profile"
                                                className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                                onClick={() => setIsProfileDropdownOpen(false)}
                                            >
                                                <User className="h-4 w-4" />
                                                <span>Profile</span>
                                            </Link>
                                            <Link
                                                to="/settings"
                                                className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                                onClick={() => setIsProfileDropdownOpen(false)}
                                            >
                                                <Settings className="h-4 w-4" />
                                                <span>Settings</span>
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center space-x-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                            >
                                                <LogOut className="h-4 w-4" />
                                                <span>Sign Out</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center space-x-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => navigate('/login')}
                                    >
                                        Sign In
                                    </Button>
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        onClick={() => navigate('/register')}
                                    >
                                        Register
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900"
                            >
                                {isMobileMenuOpen ? (
                                    <X className="h-6 w-6" />
                                ) : (
                                    <Menu className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Drawer */}
            <MobileDrawer 
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
                navigationItems={navigationItems}
            />
        </>
    );
};

export default Navbar;
