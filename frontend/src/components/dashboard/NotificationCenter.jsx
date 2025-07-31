import React, { useState } from 'react';
import { 
    Bell, 
    X, 
    CheckCircle, 
    AlertTriangle, 
    Info, 
    AlertCircle,
    Clock,
    User,
    FileText,
    Car,
    CreditCard,
    Settings
} from 'lucide-react';
import { Card, Button } from '../shared';

const NotificationItem = ({ notification, onDismiss, onAction }) => {
    const getNotificationIcon = (type) => {
        switch (type) {
            case 'success':
                return <CheckCircle className="h-5 w-5 text-green-500" />;
            case 'warning':
                return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
            case 'error':
                return <AlertCircle className="h-5 w-5 text-red-500" />;
            case 'info':
                return <Info className="h-5 w-5 text-blue-500" />;
            case 'document':
                return <FileText className="h-5 w-5 text-purple-500" />;
            case 'transfer':
                return <Car className="h-5 w-5 text-blue-500" />;
            case 'payment':
                return <CreditCard className="h-5 w-5 text-green-500" />;
            case 'system':
                return <Settings className="h-5 w-5 text-gray-500" />;
            default:
                return <Bell className="h-5 w-5 text-gray-500" />;
        }
    };

    const getNotificationBorderColor = (type) => {
        switch (type) {
            case 'success':
                return 'border-l-green-500';
            case 'warning':
                return 'border-l-yellow-500';
            case 'error':
                return 'border-l-red-500';
            case 'info':
                return 'border-l-blue-500';
            case 'document':
                return 'border-l-purple-500';
            case 'transfer':
                return 'border-l-blue-500';
            case 'payment':
                return 'border-l-green-500';
            case 'system':
                return 'border-l-gray-500';
            default:
                return 'border-l-gray-500';
        }
    };

    return (
        <div className={`p-4 border-l-4 ${getNotificationBorderColor(notification.type)} bg-white hover:bg-gray-50 transition-colors`}>
            <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                    <div className="flex-shrink-0 mt-0.5">
                        {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 mb-1">
                            {notification.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">
                            {notification.message}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <div className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span>{new Date(notification.timestamp).toLocaleString()}</span>
                            </div>
                            {notification.user && (
                                <div className="flex items-center space-x-1">
                                    <User className="h-3 w-3" />
                                    <span>{notification.user}</span>
                                </div>
                            )}
                        </div>
                        {notification.actionLabel && (
                            <div className="mt-3">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => onAction?.(notification)}
                                    className="text-xs"
                                >
                                    {notification.actionLabel}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
                <button
                    onClick={() => onDismiss?.(notification.id)}
                    className="flex-shrink-0 p-1 hover:bg-gray-200 rounded-full transition-colors"
                >
                    <X className="h-4 w-4 text-gray-400" />
                </button>
            </div>
        </div>
    );
};

const NotificationCenter = ({ notifications, onDismiss, onAction, onMarkAllRead }) => {
    const [filter, setFilter] = useState('all');

    const filteredNotifications = notifications.filter(notification => {
        if (filter === 'all') return true;
        if (filter === 'unread') return !notification.read;
        return notification.type === filter;
    });

    const unreadCount = notifications.filter(n => !n.read).length;

    const filterOptions = [
        { value: 'all', label: 'All', count: notifications.length },
        { value: 'unread', label: 'Unread', count: unreadCount },
        { value: 'transfer', label: 'Transfers', count: notifications.filter(n => n.type === 'transfer').length },
        { value: 'document', label: 'Documents', count: notifications.filter(n => n.type === 'document').length },
        { value: 'payment', label: 'Payments', count: notifications.filter(n => n.type === 'payment').length },
        { value: 'system', label: 'System', count: notifications.filter(n => n.type === 'system').length }
    ];

    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                    <Bell className="h-5 w-5 text-gray-700" />
                    <h3 className="text-lg font-semibold text-gray-900">
                        Notifications
                        {unreadCount > 0 && (
                            <span className="ml-2 px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">
                                {unreadCount} new
                            </span>
                        )}
                    </h3>
                </div>
                {unreadCount > 0 && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onMarkAllRead}
                        className="text-xs"
                    >
                        Mark All Read
                    </Button>
                )}
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
                {filterOptions.map(option => (
                    <button
                        key={option.value}
                        onClick={() => setFilter(option.value)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                            filter === option.value
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        {option.label} ({option.count})
                    </button>
                ))}
            </div>

            {filteredNotifications.length === 0 ? (
                <div className="text-center py-8">
                    <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">
                        {filter === 'unread' 
                            ? 'No unread notifications'
                            : filter === 'all'
                            ? 'No notifications yet'
                            : `No ${filter} notifications`
                        }
                    </p>
                </div>
            ) : (
                <div className="space-y-1 max-h-96 overflow-y-auto">
                    {filteredNotifications.map((notification) => (
                        <NotificationItem
                            key={notification.id}
                            notification={notification}
                            onDismiss={onDismiss}
                            onAction={onAction}
                        />
                    ))}
                </div>
            )}
        </Card>
    );
};

export { NotificationItem, NotificationCenter };
