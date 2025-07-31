import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Breadcrumb from './Breadcrumb';

const PageLayout = ({ 
    children, 
    showSidebar = true, 
    showFooter = true,
    showBreadcrumb = true,
    breadcrumbItems = null,
    className = '',
    containerClassName = '' 
}) => {
    const { isAuthenticated } = useAuth();

    // Determine if sidebar should be shown
    const shouldShowSidebar = showSidebar && isAuthenticated;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Navigation Bar */}
            <Navbar />

            <div className="flex flex-1">
                {/* Sidebar */}
                {shouldShowSidebar && <Sidebar />}

                {/* Main Content Area */}
                <main 
                    className={`flex-1 transition-all duration-300 ${
                        shouldShowSidebar ? 'md:ml-64' : ''
                    } ${className}`}
                    style={{
                        // Ensure content doesn't go under the navbar
                        paddingTop: shouldShowSidebar ? '0' : '0',
                        minHeight: 'calc(100vh - 4rem)' // Account for navbar height
                    }}
                >
                    {/* Breadcrumb */}
                    {showBreadcrumb && (
                        <div className="bg-white border-b border-gray-200">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                                <Breadcrumb customItems={breadcrumbItems} />
                            </div>
                        </div>
                    )}

                    <div className={`${containerClassName}`}>
                        {children}
                    </div>
                </main>
            </div>

            {/* Footer */}
            {showFooter && <Footer />}
        </div>
    );
};

export default PageLayout;
