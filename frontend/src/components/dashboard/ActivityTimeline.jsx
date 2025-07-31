import React, { useState } from 'react';
import { 
    Clock, 
    CheckCircle, 
    AlertCircle, 
    XCircle, 
    FileText,
    Car,
    User,
    Calendar,
    MapPin,
    ArrowRight,
    Filter,
    Search
} from 'lucide-react';
import { Card, Button } from '../shared';

const TimelineItem = ({ activity, isLast = false }) => {
    const getActivityIcon = (type, status) => {
        if (status === 'completed') {
            return <CheckCircle className="h-5 w-5 text-green-500" />;
        } else if (status === 'failed' || status === 'rejected') {
            return <XCircle className="h-5 w-5 text-red-500" />;
        } else if (status === 'pending') {
            return <Clock className="h-5 w-5 text-yellow-500" />;
        }

        switch (type) {
            case 'document':
                return <FileText className="h-5 w-5 text-blue-500" />;
            case 'transfer':
                return <Car className="h-5 w-5 text-purple-500" />;
            case 'user':
                return <User className="h-5 w-5 text-gray-500" />;
            default:
                return <Clock className="h-5 w-5 text-gray-500" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'failed':
            case 'rejected':
                return 'bg-red-100 text-red-800';
            case 'in_progress':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getConnectorColor = (status) => {
        switch (status) {
            case 'completed':
                return 'bg-green-500';
            case 'pending':
                return 'bg-yellow-500';
            case 'failed':
            case 'rejected':
                return 'bg-red-500';
            case 'in_progress':
                return 'bg-blue-500';
            default:
                return 'bg-gray-300';
        }
    };

    return (
        <div className="relative pb-8">
            <div className="flex items-start space-x-4">
                {/* Timeline connector */}
                <div className="relative flex flex-col items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full bg-white border-2 ${
                        activity.status === 'completed' ? 'border-green-500' :
                        activity.status === 'pending' ? 'border-yellow-500' :
                        activity.status === 'failed' || activity.status === 'rejected' ? 'border-red-500' :
                        'border-gray-300'
                    }`}>
                        {getActivityIcon(activity.type, activity.status)}
                    </div>
                    {!isLast && (
                        <div className={`w-0.5 h-16 mt-2 ${getConnectorColor(activity.status)}`} />
                    )}
                </div>

                {/* Activity content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                        <div>
                            <h4 className="text-sm font-medium text-gray-900">
                                {activity.title}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                                {activity.description}
                            </p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                            {activity.status.replace('_', ' ').toUpperCase()}
                        </span>
                    </div>

                    <div className="flex items-center space-x-4 text-xs text-gray-500 mb-2">
                        <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(activity.timestamp).toLocaleString()}</span>
                        </div>
                        {activity.location && (
                            <div className="flex items-center space-x-1">
                                <MapPin className="h-3 w-3" />
                                <span>{activity.location}</span>
                            </div>
                        )}
                        {activity.user && (
                            <div className="flex items-center space-x-1">
                                <User className="h-3 w-3" />
                                <span>{activity.user}</span>
                            </div>
                        )}
                    </div>

                    {activity.details && (
                        <div className="bg-gray-50 rounded-lg p-3 mt-2">
                            <div className="text-xs text-gray-600">
                                {typeof activity.details === 'string' ? (
                                    <p>{activity.details}</p>
                                ) : (
                                    <div className="space-y-1">
                                        {Object.entries(activity.details).map(([key, value]) => (
                                            <div key={key} className="flex justify-between">
                                                <span className="font-medium">{key}:</span>
                                                <span>{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {activity.actionRequired && (
                        <div className="mt-3">
                            <Button size="sm" variant="outline" className="text-xs">
                                {activity.actionLabel || 'Take Action'}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const ActivityTimeline = ({ 
    activities, 
    title = "Activity Timeline",
    showFilters = true,
    maxHeight = "600px"
}) => {
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredActivities = activities.filter(activity => {
        const matchesFilter = filter === 'all' || activity.status === filter || activity.type === filter;
        const matchesSearch = searchTerm === '' || 
            activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            activity.description.toLowerCase().includes(searchTerm.toLowerCase());
        
        return matchesFilter && matchesSearch;
    });

    const statusCounts = activities.reduce((acc, activity) => {
        acc[activity.status] = (acc[activity.status] || 0) + 1;
        return acc;
    }, {});

    const typeCounts = activities.reduce((acc, activity) => {
        acc[activity.type] = (acc[activity.type] || 0) + 1;
        return acc;
    }, {});

    const filterOptions = [
        { value: 'all', label: 'All Activities', count: activities.length },
        { value: 'completed', label: 'Completed', count: statusCounts.completed || 0 },
        { value: 'pending', label: 'Pending', count: statusCounts.pending || 0 },
        { value: 'in_progress', label: 'In Progress', count: statusCounts.in_progress || 0 },
        { value: 'failed', label: 'Failed', count: statusCounts.failed || 0 },
        { value: 'document', label: 'Documents', count: typeCounts.document || 0 },
        { value: 'transfer', label: 'Transfers', count: typeCounts.transfer || 0 }
    ];

    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">{filteredActivities.length} activities</span>
                </div>
            </div>

            {showFilters && (
                <div className="space-y-4 mb-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                            type="text"
                            placeholder="Search activities..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                    </div>

                    <div className="flex flex-wrap gap-2">
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
                </div>
            )}

            <div 
                className="overflow-y-auto"
                style={{ maxHeight }}
            >
                {filteredActivities.length === 0 ? (
                    <div className="text-center py-8">
                        <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">
                            {searchTerm || filter !== 'all' 
                                ? 'No activities found matching your criteria.'
                                : 'No activities yet.'
                            }
                        </p>
                    </div>
                ) : (
                    <div className="space-y-0">
                        {filteredActivities.map((activity, index) => (
                            <TimelineItem
                                key={activity.id}
                                activity={activity}
                                isLast={index === filteredActivities.length - 1}
                            />
                        ))}
                    </div>
                )}
            </div>
        </Card>
    );
};

export { TimelineItem, ActivityTimeline };
