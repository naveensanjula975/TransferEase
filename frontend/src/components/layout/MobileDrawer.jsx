import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const MobileDrawer = ({ isOpen, onClose, navigationItems }) => {
    const { user, logout, isAuthenticated } = useAuth();
    const location = useLocation();

    // Close drawer when route changes
    useEffect(() => {
        onClose();
    }, [location.pathname, onClose]);

    // Prevent body scroll when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleLogout = async () => {
        try {
            await logout();
            onClose();
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const isActiveRoute = (path) => {
        return location.pathname === path || location.pathname.startsWith(path + '/');
    };

    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
                    onClick={onClose}
                />
            )}

            {/* Drawer */}
            <div 
                className={`fixed top-0 left-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-500 hover:text-gray-700 rounded-md"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* User Info (if authenticated) */}
                {isAuthenticated && (
                    <div className="p-4 border-b border-gray-200 bg-gray-50">
                        <div className="flex items-center space-x-3">
                            <div className="h-12 w-12 bg-blue-600 text-white rounded-full flex items-center justify-center">
                                <User className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">
                                    {user?.firstName} {user?.lastName}
                                </p>
                                <p className="text-xs text-gray-500 capitalize">
                                    {user?.role}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation Items */}
                <nav className="flex-1 overflow-y-auto py-4">
                    <div className="px-4 space-y-1">
                        {navigationItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = isActiveRoute(item.path);
                            
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                                        isActive
                                            ? 'text-blue-600 bg-blue-50'
                                            : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                                    }`}
                                >
                                    <Icon className="h-5 w-5" />
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                </nav>

                {/* Footer Actions */}
                {isAuthenticated ? (
                    <div className="border-t border-gray-200 p-4 space-y-2">
                        <Link
                            to="/profile"
                            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                        >
                            <User className="h-5 w-5" />
                            <span>Profile</span>
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-3 w-full text-left px-3 py-2 rounded-lg text-base font-medium text-red-600 hover:bg-red-50 transition-colors"
                        >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span>Sign Out</span>
                        </button>
                    </div>
                ) : (
                    <div className="border-t border-gray-200 p-4 space-y-2">
                        <Link
                            to="/login"
                            className="block w-full text-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                        >
                            Sign In
                        </Link>
                        <Link
                            to="/register"
                            className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
                        >
                            Register
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
};

export default MobileDrawer;
