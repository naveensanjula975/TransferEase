import React, { useState } from 'react';
import { 
    TrendingUp, 
    TrendingDown, 
    Car, 
    FileText, 
    Clock, 
    CheckCircle,
    AlertCircle,
    Calendar,
    Users,
    Activity
} from 'lucide-react';
import { Card } from '../shared';

const StatCard = ({ 
    title, 
    value, 
    change, 
    changeType, 
    icon: Icon, 
    color = 'blue',
    subtitle,
    trend 
}) => {
    const colorMap = {
        blue: 'bg-blue-100 text-blue-600',
        green: 'bg-green-100 text-green-600',
        yellow: 'bg-yellow-100 text-yellow-600',
        purple: 'bg-purple-100 text-purple-600',
        red: 'bg-red-100 text-red-600',
        orange: 'bg-orange-100 text-orange-600'
    };

    const getTrendIcon = () => {
        if (changeType === 'increase') {
            return <TrendingUp className="h-4 w-4 text-green-600" />;
        } else if (changeType === 'decrease') {
            return <TrendingDown className="h-4 w-4 text-red-600" />;
        }
        return null;
    };

    const getTrendColor = () => {
        if (changeType === 'increase') return 'text-green-600';
        if (changeType === 'decrease') return 'text-red-600';
        return 'text-gray-600';
    };

    return (
        <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <div className="flex items-center space-x-3">
                        <div className={`p-3 rounded-lg ${colorMap[color]}`}>
                            <Icon className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600">{title}</p>
                            <p className="text-2xl font-bold text-gray-900">{value}</p>
                            {subtitle && (
                                <p className="text-xs text-gray-500">{subtitle}</p>
                            )}
                        </div>
                    </div>
                    
                    {change && (
                        <div className="mt-3 flex items-center space-x-1">
                            {getTrendIcon()}
                            <span className={`text-sm font-medium ${getTrendColor()}`}>
                                {change}
                            </span>
                            {trend && (
                                <span className="text-xs text-gray-500">vs last month</span>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
};

const QuickStatsGrid = ({ stats }) => {
    const defaultStats = [
        {
            title: 'Active Transfers',
            value: stats?.activeTransfers || 0,
            change: '+12%',
            changeType: 'increase',
            icon: Activity,
            color: 'blue',
            subtitle: 'In progress'
        },
        {
            title: 'Completed Transfers',
            value: stats?.completedTransfers || 0,
            change: '+8%',
            changeType: 'increase',
            icon: CheckCircle,
            color: 'green',
            subtitle: 'Successfully completed'
        },
        {
            title: 'My Vehicles',
            value: stats?.totalVehicles || 0,
            change: null,
            changeType: null,
            icon: Car,
            color: 'purple',
            subtitle: 'Registered vehicles'
        },
        {
            title: 'Pending Documents',
            value: stats?.pendingDocuments || 0,
            change: '-25%',
            changeType: 'decrease',
            icon: FileText,
            color: 'orange',
            subtitle: 'Awaiting upload'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {defaultStats.map((stat, index) => (
                <StatCard key={index} {...stat} />
            ))}
        </div>
    );
};

export { StatCard, QuickStatsGrid };
