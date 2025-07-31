import React, { useState } from 'react';
import { 
    FileText, 
    Clock, 
    CheckCircle, 
    AlertTriangle, 
    XCircle,
    Upload,
    Download,
    Eye,
    Calendar,
    User
} from 'lucide-react';
import { Card, Button } from '../shared';

const DocumentCard = ({ document, onView, onDownload, onUpload }) => {
    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed':
                return <CheckCircle className="h-5 w-5 text-green-500" />;
            case 'pending':
                return <Clock className="h-5 w-5 text-yellow-500" />;
            case 'missing':
                return <AlertTriangle className="h-5 w-5 text-red-500" />;
            case 'rejected':
                return <XCircle className="h-5 w-5 text-red-500" />;
            default:
                return <FileText className="h-5 w-5 text-gray-500" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'missing':
                return 'bg-red-100 text-red-800';
            case 'rejected':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'completed':
                return 'Verified';
            case 'pending':
                return 'Under Review';
            case 'missing':
                return 'Required';
            case 'rejected':
                return 'Rejected';
            default:
                return 'Unknown';
        }
    };

    return (
        <Card className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <FileText className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                        <h4 className="font-medium text-gray-900">{document.name}</h4>
                        <p className="text-sm text-gray-500">{document.type}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    {getStatusIcon(document.status)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(document.status)}`}>
                        {getStatusText(document.status)}
                    </span>
                </div>
            </div>

            {document.uploadedAt && (
                <div className="flex items-center space-x-2 text-xs text-gray-500 mb-3">
                    <Calendar className="h-3 w-3" />
                    <span>Uploaded: {new Date(document.uploadedAt).toLocaleDateString()}</span>
                </div>
            )}

            {document.verifiedBy && (
                <div className="flex items-center space-x-2 text-xs text-gray-500 mb-3">
                    <User className="h-3 w-3" />
                    <span>Verified by: {document.verifiedBy}</span>
                </div>
            )}

            <div className="flex items-center space-x-2">
                {document.status === 'missing' ? (
                    <Button 
                        size="sm" 
                        onClick={() => onUpload?.(document)}
                        className="flex items-center space-x-1"
                    >
                        <Upload className="h-3 w-3" />
                        <span>Upload</span>
                    </Button>
                ) : (
                    <>
                        <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => onView?.(document)}
                            className="flex items-center space-x-1"
                        >
                            <Eye className="h-3 w-3" />
                            <span>View</span>
                        </Button>
                        <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => onDownload?.(document)}
                            className="flex items-center space-x-1"
                        >
                            <Download className="h-3 w-3" />
                            <span>Download</span>
                        </Button>
                    </>
                )}
            </div>
        </Card>
    );
};

const DocumentsList = ({ documents, title = "Documents", onView, onDownload, onUpload }) => {
    const [filter, setFilter] = useState('all');

    const filteredDocuments = documents.filter(doc => {
        if (filter === 'all') return true;
        return doc.status === filter;
    });

    const statusCounts = documents.reduce((acc, doc) => {
        acc[doc.status] = (acc[doc.status] || 0) + 1;
        return acc;
    }, {});

    const filterOptions = [
        { value: 'all', label: 'All Documents', count: documents.length },
        { value: 'completed', label: 'Verified', count: statusCounts.completed || 0 },
        { value: 'pending', label: 'Under Review', count: statusCounts.pending || 0 },
        { value: 'missing', label: 'Required', count: statusCounts.missing || 0 },
        { value: 'rejected', label: 'Rejected', count: statusCounts.rejected || 0 }
    ];

    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                <div className="flex items-center space-x-2">
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

            {filteredDocuments.length === 0 ? (
                <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No documents found for the selected filter.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredDocuments.map((document) => (
                        <DocumentCard
                            key={document.id}
                            document={document}
                            onView={onView}
                            onDownload={onDownload}
                            onUpload={onUpload}
                        />
                    ))}
                </div>
            )}
        </Card>
    );
};

export { DocumentCard, DocumentsList };
