import { useState } from 'react';
import { 
  FileText, 
  Upload, 
  Search, 
  Filter,
  Download,
  Eye,
  Clock,
  CheckCircle,
  X,
  AlertTriangle,
  MoreVertical,
  Calendar,
  User
} from 'lucide-react';
import DocumentManager from './DocumentManager';
import DocumentRevision from './DocumentRevision';

const DocumentUserDashboard = () => {
  const [activeView, setActiveView] = useState('overview');
  
  // Mock user documents data
  const userDocuments = [
    {
      id: 'DOC001',
      applicationId: 'VT20250001',
      documentType: 'vehicleRegistration',
      documentName: 'Vehicle Registration Certificate',
      fileName: 'vehicle_reg_abc123.pdf',
      uploadDate: new Date('2025-01-30'),
      status: 'verified',
      vehicleRegNo: 'ABC-123',
      size: 2.5,
      format: 'PDF',
      verificationDate: new Date('2025-01-31'),
      verifiedBy: 'Admin Officer'
    },
    {
      id: 'DOC002',
      applicationId: 'VT20250001',
      documentType: 'newOwnerNIC',
      documentName: 'New Owner NIC Copy',
      fileName: 'nic_john_doe.jpg',
      uploadDate: new Date('2025-01-30'),
      status: 'verified',
      vehicleRegNo: 'ABC-123',
      size: 1.8,
      format: 'JPG',
      verificationDate: new Date('2025-01-31'),
      verifiedBy: 'Admin Officer'
    },
    {
      id: 'DOC003',
      applicationId: 'VT20250002',
      documentType: 'vehicleRegistration',
      documentName: 'Vehicle Registration Certificate',
      fileName: 'vehicle_reg_def456.pdf',
      uploadDate: new Date('2025-01-28'),
      status: 'rejected',
      vehicleRegNo: 'DEF-456',
      size: 2.3,
      format: 'PDF',
      rejectionReason: 'Document image quality is poor',
      rejectionDate: new Date('2025-01-30')
    },
    {
      id: 'DOC004',
      applicationId: 'VT20250003',
      documentType: 'saleAgreement',
      documentName: 'Vehicle Sale Agreement',
      fileName: 'sale_agreement_ghi789.pdf',
      uploadDate: new Date('2025-01-31'),
      status: 'pending',
      vehicleRegNo: 'GHI-789',
      size: 3.1,
      format: 'PDF',
      estimatedVerification: new Date('2025-02-02')
    }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedDocument, setSelectedDocument] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'resubmitted': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'rejected': return <X className="h-4 w-4 text-red-600" />;
      case 'resubmitted': return <Upload className="h-4 w-4 text-blue-600" />;
      default: return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const filteredDocuments = userDocuments.filter(doc => {
    const matchesSearch = doc.documentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.vehicleRegNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.applicationId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getDocumentStats = () => {
    const total = userDocuments.length;
    const verified = userDocuments.filter(doc => doc.status === 'verified').length;
    const pending = userDocuments.filter(doc => doc.status === 'pending').length;
    const rejected = userDocuments.filter(doc => doc.status === 'rejected').length;
    
    return { total, verified, pending, rejected };
  };

  const stats = getDocumentStats();

  const DocumentDetailModal = ({ document, onClose }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{document.documentName}</h2>
              <p className="text-gray-600">{document.fileName}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Status Banner */}
            <div className={`rounded-lg p-4 border ${getStatusColor(document.status)}`}>
              <div className="flex items-center">
                {getStatusIcon(document.status)}
                <span className="ml-2 font-medium">
                  Status: {document.status.charAt(0).toUpperCase() + document.status.slice(1)}
                </span>
              </div>
              {document.status === 'pending' && document.estimatedVerification && (
                <p className="mt-2 text-sm">
                  Estimated verification: {document.estimatedVerification.toLocaleDateString()}
                </p>
              )}
              {document.status === 'verified' && document.verificationDate && (
                <p className="mt-2 text-sm">
                  Verified on {document.verificationDate.toLocaleDateString()} by {document.verifiedBy}
                </p>
              )}
              {document.status === 'rejected' && document.rejectionReason && (
                <p className="mt-2 text-sm">
                  Rejected: {document.rejectionReason}
                </p>
              )}
            </div>

            {/* Document Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">Document Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Application ID:</span>
                  <div className="font-medium">{document.applicationId}</div>
                </div>
                <div>
                  <span className="text-gray-600">Vehicle:</span>
                  <div className="font-medium">{document.vehicleRegNo}</div>
                </div>
                <div>
                  <span className="text-gray-600">Upload Date:</span>
                  <div className="font-medium">{document.uploadDate.toLocaleDateString()}</div>
                </div>
                <div>
                  <span className="text-gray-600">File Size:</span>
                  <div className="font-medium">{document.size} MB</div>
                </div>
                <div>
                  <span className="text-gray-600">Format:</span>
                  <div className="font-medium">{document.format}</div>
                </div>
                <div>
                  <span className="text-gray-600">Document Type:</span>
                  <div className="font-medium">{document.documentType}</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-3">
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Download className="h-4 w-4 mr-2 inline" />
                Download Document
              </button>
              {document.status === 'rejected' && (
                <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                  <Upload className="h-4 w-4 mr-2 inline" />
                  Resubmit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const OverviewDashboard = () => (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Total Documents</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Verified</p>
              <p className="text-2xl font-bold text-green-600">{stats.verified}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <X className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Rejected</p>
              <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="verified">Verified</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
            <option value="resubmitted">Resubmitted</option>
          </select>
        </div>
      </div>

      {/* Documents List */}
      <div className="space-y-4">
        {filteredDocuments.length === 0 ? (
          <div className="bg-white rounded-lg border p-12 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Documents Found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or upload new documents.</p>
          </div>
        ) : (
          filteredDocuments.map((document) => (
            <div key={document.id} className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <FileText className="h-6 w-6 text-blue-600" />
                    <h3 className="text-lg font-medium text-gray-900">
                      {document.documentName}
                    </h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded border ${getStatusColor(document.status)}`}>
                      {getStatusIcon(document.status)}
                      <span className="ml-1">{document.status}</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      Application: {document.applicationId}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Uploaded: {document.uploadDate.toLocaleDateString()}
                    </div>
                    <div>
                      Vehicle: {document.vehicleRegNo}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>{document.format} • {document.size} MB</span>
                    <span>{document.fileName}</span>
                  </div>

                  {document.status === 'rejected' && document.rejectionReason && (
                    <div className="mt-3 p-3 bg-red-50 rounded-lg">
                      <p className="text-red-800 text-sm">
                        <AlertTriangle className="h-4 w-4 inline mr-1" />
                        {document.rejectionReason}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => setSelectedDocument(document)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                    title="View Details"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                  <button
                    className="p-2 text-gray-400 hover:text-gray-600"
                    title="Download"
                  >
                    <Download className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Documents</h1>
          <p className="text-gray-600">Manage your uploaded documents and track verification status</p>
        </div>
        <button
          onClick={() => setActiveView('upload')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Upload className="h-4 w-4 mr-2 inline" />
          Upload New Document
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveView('overview')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeView === 'overview'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            My Documents
          </button>
          <button
            onClick={() => setActiveView('upload')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeView === 'upload'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Upload Documents
          </button>
          <button
            onClick={() => setActiveView('revision')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeView === 'revision'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Document Revision
          </button>
        </nav>
      </div>

      {/* Content */}
      <div>
        {activeView === 'overview' && <OverviewDashboard />}
        {activeView === 'upload' && (
          <div className="bg-white rounded-lg border p-6">
            <DocumentManager userRole="user" />
          </div>
        )}
        {activeView === 'revision' && <DocumentRevision userRole="user" />}
      </div>

      {/* Document Detail Modal */}
      {selectedDocument && (
        <DocumentDetailModal
          document={selectedDocument}
          onClose={() => setSelectedDocument(null)}
        />
      )}
    </div>
  );
};

export default DocumentUserDashboard;
