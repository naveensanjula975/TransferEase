import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumb = ({ customItems = null, className = '' }) => {
    const location = useLocation();
    
    // If custom items are provided, use those
    if (customItems) {
        return (
            <nav className={`flex ${className}`} aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2">
                    {customItems.map((item, index) => (
                        <li key={index} className="flex items-center">
                            {index > 0 && (
                                <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
                            )}
                            {item.href ? (
                                <Link
                                    to={item.href}
                                    className={`text-sm font-medium ${
                                        index === customItems.length - 1
                                            ? 'text-gray-900'
                                            : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    {item.icon && <item.icon className="h-4 w-4 mr-1 inline" />}
                                    {item.label}
                                </Link>
                            ) : (
                                <span className="text-sm font-medium text-gray-900">
                                    {item.icon && <item.icon className="h-4 w-4 mr-1 inline" />}
                                    {item.label}
                                </span>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>
        );
    }

    // Auto-generate breadcrumbs from current path
    const pathnames = location.pathname.split('/').filter(x => x);
    
    // Define route labels
    const routeLabels = {
        '': 'Home',
        'dashboard': 'Dashboard',
        'admin': 'Admin',
        'users': 'Users',
        'vehicles': 'Vehicles',
        'bookings': 'Bookings',
        'reports': 'Reports',
        'messages': 'Messages',
        'profile': 'Profile',
        'settings': 'Settings',
        'notifications': 'Notifications',
        'documents': 'Documents',
        'payment-methods': 'Payment Methods',
        'about': 'About',
        'contact': 'Contact',
        'services': 'Services',
        'pricing': 'Pricing',
        'help': 'Help',
        'login': 'Sign In',
        'register': 'Register',
        'forgot-password': 'Forgot Password'
    };

    const breadcrumbItems = [
        { label: 'Home', href: '/', icon: Home }
    ];

    let currentPath = '';
    pathnames.forEach((pathname, index) => {
        currentPath += `/${pathname}`;
        const isLast = index === pathnames.length - 1;
        
        breadcrumbItems.push({
            label: routeLabels[pathname] || pathname.charAt(0).toUpperCase() + pathname.slice(1),
            href: isLast ? null : currentPath
        });
    });

    // Don't show breadcrumb for home page
    if (pathnames.length === 0) {
        return null;
    }

    return (
        <nav className={`flex ${className}`} aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
                {breadcrumbItems.map((item, index) => (
                    <li key={index} className="flex items-center">
                        {index > 0 && (
                            <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
                        )}
                        {item.href ? (
                            <Link
                                to={item.href}
                                className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                {item.icon && <item.icon className="h-4 w-4 mr-1 inline" />}
                                {item.label}
                            </Link>
                        ) : (
                            <span className="text-sm font-medium text-gray-900">
                                {item.icon && <item.icon className="h-4 w-4 mr-1 inline" />}
                                {item.label}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
