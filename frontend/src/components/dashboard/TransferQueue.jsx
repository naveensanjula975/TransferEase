import React, { useState } from 'react';
import { 
    Car, 
    Clock, 
    CheckCircle, 
    XCircle, 
    AlertTriangle,
    Eye,
    Download,
    Filter,
    Search,
    MoreVertical,
    User,
    Calendar,
    DollarSign,
    FileText,
    CreditCard,
    MapPin,
    Phone,
    Mail
} from 'lucide-react';
import { Card, Button, ProgressBar } from '../shared';

const TransferCard = ({ transfer, onView, onApprove, onReject, onContact }) => {
    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed':
                return <CheckCircle className="h-5 w-5 text-green-500" />;
            case 'pending_review':
                return <Clock className="h-5 w-5 text-yellow-500" />;
            case 'document_review':
                return <FileText className="h-5 w-5 text-blue-500" />;
            case 'payment_verification':
                return <CreditCard className="h-5 w-5 text-purple-500" />;
            case 'rejected':
                return <XCircle className="h-5 w-5 text-red-500" />;
            default:
                return <Clock className="h-5 w-5 text-gray-500" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'pending_review':
                return 'bg-yellow-100 text-yellow-800';
            case 'document_review':
                return 'bg-blue-100 text-blue-800';
            case 'payment_verification':
                return 'bg-purple-100 text-purple-800';
            case 'rejected':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'urgent':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'high':
                return 'bg-orange-100 text-orange-800 border-orange-200';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'low':
                return 'bg-green-100 text-green-800 border-green-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-LK', {
            style: 'currency',
            currency: 'LKR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    return (
        <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{transfer.id}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(transfer.priority)}`}>
                            {transfer.priority.toUpperCase()}
                        </span>
                    </div>
                    <p className="text-sm text-gray-500">
                        Submitted: {new Date(transfer.submittedDate).toLocaleDateString()}
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    {getStatusIcon(transfer.status)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transfer.status)}`}>
                        {transfer.status.replace('_', ' ').toUpperCase()}
                    </span>
                </div>
            </div>

            {/* Vehicle Information */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-center space-x-2 mb-2">
                    <Car className="h-4 w-4 text-gray-600" />
                    <span className="font-medium text-gray-900">{transfer.vehicle}</span>
                </div>
                <div className="text-sm text-gray-600">
                    <p>Amount: <span className="font-medium text-gray-900">{formatCurrency(transfer.amount)}</span></p>
                </div>
            </div>

            {/* Transfer Parties */}
            <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">From: {transfer.fromOwner}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">To: {transfer.toOwner}</p>
                    </div>
                </div>
            </div>

            {/* Progress and Payment Status */}
            <div className="space-y-3 mb-4">
                <div>
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">Documents Complete</span>
                        <span className="text-sm font-medium text-gray-900">{transfer.documentsComplete}%</span>
                    </div>
                    <ProgressBar 
                        progress={transfer.documentsComplete} 
                        color={transfer.documentsComplete === 100 ? 'green' : transfer.documentsComplete > 60 ? 'yellow' : 'red'}
                    />
                </div>
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Payment Status:</span>
                    <span className={`font-medium ${
                        transfer.paymentStatus === 'completed' ? 'text-green-600' :
                        transfer.paymentStatus === 'pending' ? 'text-yellow-600' :
                        transfer.paymentStatus === 'verifying' ? 'text-blue-600' : 'text-gray-600'
                    }`}>
                        {transfer.paymentStatus.replace('_', ' ').toUpperCase()}
                    </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Est. Completion:</span>
                    <span className="font-medium text-gray-900">
                        {new Date(transfer.estimatedCompletion).toLocaleDateString()}
                    </span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onView?.(transfer)}
                    className="flex items-center space-x-1"
                >
                    <Eye className="h-3 w-3" />
                    <span>View Details</span>
                </Button>
                
                <div className="flex items-center space-x-2">
                    {transfer.status === 'pending_review' && (
                        <>
                            <Button
                                size="sm"
                                onClick={() => onApprove?.(transfer)}
                                className="bg-green-600 hover:bg-green-700 text-white"
                            >
                                Approve
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => onReject?.(transfer)}
                                className="text-red-600 hover:bg-red-50"
                            >
                                Reject
                            </Button>
                        </>
                    )}
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onContact?.(transfer)}
                        className="p-2"
                    >
                        <Mail className="h-3 w-3" />
                    </Button>
                </div>
            </div>
        </Card>
    );
};

const TransferQueue = ({ 
    transfers, 
    onView, 
    onApprove, 
    onReject, 
    onContact,
    onBulkAction 
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [priorityFilter, setPriorityFilter] = useState('all');
    const [selectedTransfers, setSelectedTransfers] = useState([]);

    const filteredTransfers = transfers.filter(transfer => {
        const matchesSearch = 
            transfer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transfer.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transfer.fromOwner.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transfer.toOwner.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === 'all' || transfer.status === statusFilter;
        const matchesPriority = priorityFilter === 'all' || transfer.priority === priorityFilter;
        
        return matchesSearch && matchesStatus && matchesPriority;
    });

    const statusCounts = transfers.reduce((acc, transfer) => {
        acc[transfer.status] = (acc[transfer.status] || 0) + 1;
        return acc;
    }, {});

    const priorityCounts = transfers.reduce((acc, transfer) => {
        acc[transfer.priority] = (acc[transfer.priority] || 0) + 1;
        return acc;
    }, {});

    const statusOptions = [
        { value: 'all', label: 'All Status', count: transfers.length },
        { value: 'pending_review', label: 'Pending Review', count: statusCounts.pending_review || 0 },
        { value: 'document_review', label: 'Document Review', count: statusCounts.document_review || 0 },
        { value: 'payment_verification', label: 'Payment Verification', count: statusCounts.payment_verification || 0 },
        { value: 'completed', label: 'Completed', count: statusCounts.completed || 0 },
        { value: 'rejected', label: 'Rejected', count: statusCounts.rejected || 0 }
    ];

    const priorityOptions = [
        { value: 'all', label: 'All Priority', count: transfers.length },
        { value: 'urgent', label: 'Urgent', count: priorityCounts.urgent || 0 },
        { value: 'high', label: 'High', count: priorityCounts.high || 0 },
        { value: 'medium', label: 'Medium', count: priorityCounts.medium || 0 },
        { value: 'low', label: 'Low', count: priorityCounts.low || 0 }
    ];

    const handleSelectTransfer = (transferId) => {
        setSelectedTransfers(prev => 
            prev.includes(transferId) 
                ? prev.filter(id => id !== transferId)
                : [...prev, transferId]
        );
    };

    const handleSelectAll = () => {
        if (selectedTransfers.length === filteredTransfers.length) {
            setSelectedTransfers([]);
        } else {
            setSelectedTransfers(filteredTransfers.map(transfer => transfer.id));
        }
    };

    return (
        <div className="space-y-6">
            {/* Header with Actions */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Transfer Review Queue</h2>
                <div className="flex items-center space-x-3">
                    {selectedTransfers.length > 0 && (
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">
                                {selectedTransfers.length} selected
                            </span>
                            <Button
                                size="sm"
                                onClick={() => onBulkAction?.('approve', selectedTransfers)}
                                className="bg-green-600 hover:bg-green-700"
                            >
                                Bulk Approve
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => onBulkAction?.('reject', selectedTransfers)}
                                className="text-red-600 hover:bg-red-50"
                            >
                                Bulk Reject
                            </Button>
                        </div>
                    )}
                    <Button
                        variant="outline"
                        className="flex items-center space-x-2"
                    >
                        <Download className="h-4 w-4" />
                        <span>Export Queue</span>
                    </Button>
                </div>
            </div>

            {/* Search and Filters */}
            <Card className="p-6">
                <div className="space-y-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                            type="text"
                            placeholder="Search transfers by ID, vehicle, or owner..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    
                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center space-x-2">
                            <Filter className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium text-gray-700">Status:</span>
                            {statusOptions.map(option => (
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

                        <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-700">Priority:</span>
                            {priorityOptions.map(option => (
                                <button
                                    key={option.value}
                                    onClick={() => setPriorityFilter(option.value)}
                                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                                        priorityFilter === option.value
                                            ? 'bg-orange-100 text-orange-700'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    {option.label} ({option.count})
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Bulk Actions */}
                    {filteredTransfers.length > 0 && (
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={selectedTransfers.length === filteredTransfers.length}
                                    onChange={handleSelectAll}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-600">Select All</span>
                            </label>
                            <span className="text-sm text-gray-500">
                                {filteredTransfers.length} transfers found
                            </span>
                        </div>
                    )}
                </div>
            </Card>

            {/* Transfers Grid */}
            {filteredTransfers.length === 0 ? (
                <Card className="p-12 text-center">
                    <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">
                        {searchTerm || statusFilter !== 'all' || priorityFilter !== 'all'
                            ? 'No transfers found matching your criteria.'
                            : 'No transfers in queue.'
                        }
                    </p>
                </Card>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredTransfers.map((transfer) => (
                        <div key={transfer.id} className="relative">
                            <label className="absolute top-2 left-2 z-10">
                                <input
                                    type="checkbox"
                                    checked={selectedTransfers.includes(transfer.id)}
                                    onChange={() => handleSelectTransfer(transfer.id)}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                            </label>
                            <TransferCard
                                transfer={transfer}
                                onView={onView}
                                onApprove={onApprove}
                                onReject={onReject}
                                onContact={onContact}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export { TransferCard, TransferQueue };
