import React, { useState } from 'react';
import { 
    Users, 
    UserCheck, 
    UserX, 
    Shield, 
    Mail, 
    Phone,
    Calendar,
    MapPin,
    Eye,
    Edit,
    Trash2,
    Flag,
    Search,
    Filter,
    Download,
    MoreVertical
} from 'lucide-react';
import { Card, Button } from '../shared';

const UserCard = ({ user, onView, onEdit, onDelete, onFlag, onContact }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'verified':
                return 'bg-green-100 text-green-800';
            case 'pending_verification':
                return 'bg-yellow-100 text-yellow-800';
            case 'suspended':
                return 'bg-red-100 text-red-800';
            case 'flagged':
                return 'bg-orange-100 text-orange-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'verified':
                return <UserCheck className="h-4 w-4 text-green-500" />;
            case 'pending_verification':
                return <Users className="h-4 w-4 text-yellow-500" />;
            case 'suspended':
                return <UserX className="h-4 w-4 text-red-500" />;
            case 'flagged':
                return <Flag className="h-4 w-4 text-orange-500" />;
            default:
                return <Users className="h-4 w-4 text-gray-500" />;
        }
    };

    return (
        <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">{user.name}</h3>
                        <p className="text-sm text-gray-500">{user.id}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    {getStatusIcon(user.status)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                        {user.status.replace('_', ' ').toUpperCase()}
                    </span>
                </div>
            </div>

            <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span>{user.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>{user.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Registered: {new Date(user.registeredDate).toLocaleDateString()}</span>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-center">
                    <p className="text-lg font-semibold text-gray-900">{user.transfersCount}</p>
                    <p className="text-xs text-gray-500">Transfers</p>
                </div>
                <div className="text-center">
                    <p className="text-lg font-semibold text-gray-900">{user.vehiclesCount}</p>
                    <p className="text-xs text-gray-500">Vehicles</p>
                </div>
                <div className="text-center">
                    <p className="text-lg font-semibold text-gray-900">{user.documentsSubmitted}</p>
                    <p className="text-xs text-gray-500">Documents</p>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onView?.(user)}
                        className="flex items-center space-x-1"
                    >
                        <Eye className="h-3 w-3" />
                        <span>View</span>
                    </Button>
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onEdit?.(user)}
                        className="flex items-center space-x-1"
                    >
                        <Edit className="h-3 w-3" />
                        <span>Edit</span>
                    </Button>
                </div>
                
                <div className="flex items-center space-x-1">
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onContact?.(user)}
                        className="p-2"
                    >
                        <Mail className="h-3 w-3" />
                    </Button>
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onFlag?.(user)}
                        className="p-2"
                    >
                        <Flag className="h-3 w-3" />
                    </Button>
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onDelete?.(user)}
                        className="p-2 text-red-600 hover:bg-red-50"
                    >
                        <Trash2 className="h-3 w-3" />
                    </Button>
                </div>
            </div>
        </Card>
    );
};

const UserManagement = ({ 
    users, 
    onView, 
    onEdit, 
    onDelete, 
    onFlag, 
    onContact,
    onBulkAction 
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedUsers, setSelectedUsers] = useState([]);

    const filteredUsers = users.filter(user => {
        const matchesSearch = 
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.id.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });

    const statusCounts = users.reduce((acc, user) => {
        acc[user.status] = (acc[user.status] || 0) + 1;
        return acc;
    }, {});

    const filterOptions = [
        { value: 'all', label: 'All Users', count: users.length },
        { value: 'verified', label: 'Verified', count: statusCounts.verified || 0 },
        { value: 'pending_verification', label: 'Pending', count: statusCounts.pending_verification || 0 },
        { value: 'suspended', label: 'Suspended', count: statusCounts.suspended || 0 },
        { value: 'flagged', label: 'Flagged', count: statusCounts.flagged || 0 }
    ];

    const handleSelectUser = (userId) => {
        setSelectedUsers(prev => 
            prev.includes(userId) 
                ? prev.filter(id => id !== userId)
                : [...prev, userId]
        );
    };

    const handleSelectAll = () => {
        if (selectedUsers.length === filteredUsers.length) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(filteredUsers.map(user => user.id));
        }
    };

    return (
        <div className="space-y-6">
            {/* Header with Actions */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
                <div className="flex items-center space-x-3">
                    {selectedUsers.length > 0 && (
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">
                                {selectedUsers.length} selected
                            </span>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => onBulkAction?.('verify', selectedUsers)}
                            >
                                Bulk Verify
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => onBulkAction?.('suspend', selectedUsers)}
                                className="text-red-600 hover:bg-red-50"
                            >
                                Bulk Suspend
                            </Button>
                        </div>
                    )}
                    <Button
                        variant="outline"
                        className="flex items-center space-x-2"
                    >
                        <Download className="h-4 w-4" />
                        <span>Export Users</span>
                    </Button>
                </div>
            </div>

            {/* Search and Filters */}
            <Card className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <input
                                type="text"
                                placeholder="Search users by name, email, or ID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        <Filter className="h-4 w-4 text-gray-500" />
                        {filterOptions.map(option => (
                            <button
                                key={option.value}
                                onClick={() => setStatusFilter(option.value)}
                                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                                    statusFilter === option.value
                                        ? 'bg-blue-100 text-blue-700'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                {option.label} ({option.count})
                            </button>
                        ))}
                    </div>
                </div>

                {/* Bulk Actions */}
                {filteredUsers.length > 0 && (
                    <div className="mt-4 flex items-center space-x-4">
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={selectedUsers.length === filteredUsers.length}
                                onChange={handleSelectAll}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-600">Select All</span>
                        </label>
                        <span className="text-sm text-gray-500">
                            {filteredUsers.length} users found
                        </span>
                    </div>
                )}
            </Card>

            {/* Users Grid */}
            {filteredUsers.length === 0 ? (
                <Card className="p-12 text-center">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">
                        {searchTerm || statusFilter !== 'all' 
                            ? 'No users found matching your criteria.'
                            : 'No users registered yet.'
                        }
                    </p>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredUsers.map((user) => (
                        <div key={user.id} className="relative">
                            <label className="absolute top-2 left-2 z-10">
                                <input
                                    type="checkbox"
                                    checked={selectedUsers.includes(user.id)}
                                    onChange={() => handleSelectUser(user.id)}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                            </label>
                            <UserCard
                                user={user}
                                onView={onView}
                                onEdit={onEdit}
                                onDelete={onDelete}
                                onFlag={onFlag}
                                onContact={onContact}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export { UserCard, UserManagement };
