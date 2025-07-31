import React from 'react';
import { Link } from 'react-router-dom';
import { 
    Car, 
    Mail, 
    Phone, 
    MapPin, 
    Facebook, 
    Twitter, 
    Instagram, 
    Linkedin,
    Clock,
    Shield,
    Star
} from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { label: 'About Us', path: '/about' },
        { label: 'Our Services', path: '/services' },
        { label: 'Vehicle Fleet', path: '/vehicles' },
        { label: 'Pricing', path: '/pricing' },
        { label: 'Contact', path: '/contact' },
        { label: 'FAQ', path: '/faq' },
    ];

    const supportLinks = [
        { label: 'Help Center', path: '/help' },
        { label: 'Booking Guide', path: '/booking-guide' },
        { label: 'Terms of Service', path: '/terms' },
        { label: 'Privacy Policy', path: '/privacy' },
        { label: 'Refund Policy', path: '/refund-policy' },
        { label: 'Report Issue', path: '/report' },
    ];

    const features = [
        { icon: Clock, text: '24/7 Service' },
        { icon: Shield, text: 'Safe & Secure' },
        { icon: Star, text: 'Premium Quality' },
    ];

    return (
        <footer className="bg-gray-900 text-white">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center space-x-2 mb-4">
                            <Car className="h-8 w-8 text-blue-400" />
                            <span className="text-xl font-bold">TransferEase</span>
                        </div>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            Your trusted partner for premium vehicle transfer services. 
                            Safe, reliable, and professional transportation solutions 
                            across Sri Lanka.
                        </p>
                        
                        {/* Features */}
                        <div className="space-y-3">
                            {features.map((feature, index) => {
                                const Icon = feature.icon;
                                return (
                                    <div key={index} className="flex items-center space-x-2 text-sm text-gray-300">
                                        <Icon className="h-4 w-4 text-blue-400" />
                                        <span>{feature.text}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.path}>
                                    <Link 
                                        to={link.path}
                                        className="text-gray-300 hover:text-white transition-colors duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Support</h3>
                        <ul className="space-y-2">
                            {supportLinks.map((link) => (
                                <li key={link.path}>
                                    <Link 
                                        to={link.path}
                                        className="text-gray-300 hover:text-white transition-colors duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
                        <div className="space-y-3">
                            <div className="flex items-start space-x-3">
                                <MapPin className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                                <div className="text-gray-300">
                                    <p>123 Main Street</p>
                                    <p>Colombo 03, Sri Lanka</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                                <Phone className="h-5 w-5 text-blue-400 flex-shrink-0" />
                                <div className="text-gray-300">
                                    <p>+94 11 234 5678</p>
                                    <p>+94 77 123 4567</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                                <Mail className="h-5 w-5 text-blue-400 flex-shrink-0" />
                                <div className="text-gray-300">
                                    <p>info@transferease.lk</p>
                                    <p>support@transferease.lk</p>
                                </div>
                            </div>
                        </div>

                        {/* Business Hours */}
                        <div className="mt-6">
                            <h4 className="font-medium mb-2">Business Hours</h4>
                            <div className="text-gray-300 text-sm space-y-1">
                                <p>Monday - Friday: 6:00 AM - 10:00 PM</p>
                                <p>Saturday - Sunday: 7:00 AM - 9:00 PM</p>
                                <p className="text-blue-400 font-medium">24/7 Emergency Service</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Social Media & Newsletter */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        {/* Social Media Links */}
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-300">Follow us:</span>
                            <div className="flex space-x-3">
                                <a 
                                    href="#" 
                                    className="text-gray-400 hover:text-white transition-colors duration-200"
                                    aria-label="Facebook"
                                >
                                    <Facebook className="h-5 w-5" />
                                </a>
                                <a 
                                    href="#" 
                                    className="text-gray-400 hover:text-white transition-colors duration-200"
                                    aria-label="Twitter"
                                >
                                    <Twitter className="h-5 w-5" />
                                </a>
                                <a 
                                    href="#" 
                                    className="text-gray-400 hover:text-white transition-colors duration-200"
                                    aria-label="Instagram"
                                >
                                    <Instagram className="h-5 w-5" />
                                </a>
                                <a 
                                    href="#" 
                                    className="text-gray-400 hover:text-white transition-colors duration-200"
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin className="h-5 w-5" />
                                </a>
                            </div>
                        </div>

                        {/* Newsletter Signup */}
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-300 text-sm">Stay updated:</span>
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800 bg-gray-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 text-sm text-gray-400">
                        <div className="flex items-center space-x-4">
                            <p>&copy; {currentYear} TransferEase. All rights reserved.</p>
                            <span className="hidden md:inline">|</span>
                            <p className="hidden md:inline">Powered by Modern Technology</p>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                            <Link 
                                to="/sitemap" 
                                className="hover:text-white transition-colors duration-200"
                            >
                                Sitemap
                            </Link>
                            <span>|</span>
                            <Link 
                                to="/accessibility" 
                                className="hover:text-white transition-colors duration-200"
                            >
                                Accessibility
                            </Link>
                            <span>|</span>
                            <Link 
                                to="/cookies" 
                                className="hover:text-white transition-colors duration-200"
                            >
                                Cookies
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
