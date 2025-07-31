import { useState, useEffect } from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  X,
  Search,
  Filter,
  Calendar,
  User,
  Car,
  RefreshCw,
  Archive,
  Trash2,
  Share2
} from 'lucide-react';

const DocumentTracker = ({ userId, userRole = 'user' }) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');

  // Mock document data
  const mockDocuments = [
    {
      id: 'DOC001',
      applicationId: 'VT20250001',
      name: 'Vehicle Registration Certificate',
      type: 'vehicleRegistration',
      fileName: 'vehicle_reg_CAR1234.pdf',
      uploadDate: new Date('2025-01-15'),
      status: 'verified',
      verifiedBy: 'Admin Officer',
      verificationDate: new Date('2025-01-16'),
      size: 2.4,
      format: 'PDF',
      vehicleRegNo: 'CAR-1234',
      comments: 'Document verified successfully'
    },
    {
      id: 'DOC002',
      applicationId: 'VT20250001',
      name: 'Current Owner NIC Copy',
      type: 'currentOwnerNIC',
      fileName: 'nic_john_silva.jpg',
      uploadDate: new Date('2025-01-15'),
      status: 'verified',
      verifiedBy: 'Admin Officer',
      verificationDate: new Date('2025-01-16'),
      size: 1.8,
      format: 'JPG',
      vehicleRegNo: 'CAR-1234',
      comments: 'Clear and readable'
    },
    {
      id: 'DOC003',
      applicationId: 'VT20250001',
      name: 'New Owner NIC Copy',
      type: 'newOwnerNIC',
      fileName: 'nic_mary_fernando.jpg',
      uploadDate: new Date('2025-01-15'),
      status: 'pending',
      size: 2.1,
      format: 'JPG',
      vehicleRegNo: 'CAR-1234',
      comments: 'Awaiting verification'
    },
    {
      id: 'DOC004',
      applicationId: 'VT20250002',
      name: 'Sale Agreement',
      type: 'saleAgreement',
      fileName: 'sale_agreement_ABC5678.pdf',
      uploadDate: new Date('2025-01-14'),
      status: 'rejected',
      verifiedBy: 'Admin Officer',
      verificationDate: new Date('2025-01-15'),
      size: 3.2,
      format: 'PDF',
      vehicleRegNo: 'ABC-5678',
      comments: 'Agreement incomplete - missing signatures'
    },
    {
      id: 'DOC005',
      applicationId: 'VT20250003',
      name: 'Insurance Certificate',
      type: 'insurance',
      fileName: 'insurance_XYZ9876.pdf',
      uploadDate: new Date('2025-01-13'),
      status: 'expired',
      size: 1.9,
      format: 'PDF',
      vehicleRegNo: 'XYZ-9876',
      comments: 'Insurance policy has expired'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDocuments(mockDocuments);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'rejected': return <X className="h-4 w-4 text-red-600" />;
      case 'expired': return <AlertTriangle className="h-4 w-4 text-gray-600" />;
      default: return <FileText className="h-4 w-4 text-blue-600" />;
    }
  };

  const getDocumentTypeName = (type) => {
    const typeMap = {
      vehicleRegistration: 'Vehicle Registration',
      currentOwnerNIC: 'Current Owner NIC',
      newOwnerNIC: 'New Owner NIC',
      saleAgreement: 'Sale Agreement',
      insurance: 'Insurance Certificate',
      taxClearance: 'Tax Clearance',
      inspection: 'Vehicle Inspection'
    };
    return typeMap[type] || type;
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.applicationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.vehicleRegNo?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    const matchesType = typeFilter === 'all' || doc.type === typeFilter;
    
    let matchesDate = true;
    if (dateRange !== 'all') {
      const now = new Date();
      const docDate = doc.uploadDate;
      
      switch (dateRange) {
        case 'today':
          matchesDate = docDate.toDateString() === now.toDateString();
          break;
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          matchesDate = docDate >= weekAgo;
          break;
        case 'month':
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          matchesDate = docDate >= monthAgo;
          break;
      }
    }
    
    return matchesSearch && matchesStatus && matchesType && matchesDate;
  });

  const handleDownload = (document) => {
    // Simulate download
    console.log('Downloading:', document.fileName);
    alert(`Downloading ${document.fileName}`);
  };

  const handleView = (document) => {
    // Simulate document preview
    console.log('Viewing:', document.fileName);
    alert(`Opening preview for ${document.fileName}`);
  };

  const handleStatusUpdate = (documentId, newStatus, comments = '') => {
    setDocuments(prev => prev.map(doc => 
      doc.id === documentId 
        ? { 
            ...doc, 
            status: newStatus, 
            verificationDate: new Date(),
            verifiedBy: 'Current User',
            comments 
          }
        : doc
    ));
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Document Tracker</h2>
          <p className="text-gray-600">
            Track and manage all your uploaded documents
          </p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="verified">Verified</option>
            <option value="rejected">Rejected</option>
            <option value="expired">Expired</option>
          </select>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="vehicleRegistration">Vehicle Registration</option>
            <option value="currentOwnerNIC">Current Owner NIC</option>
            <option value="newOwnerNIC">New Owner NIC</option>
            <option value="saleAgreement">Sale Agreement</option>
            <option value="insurance">Insurance</option>
          </select>

          {/* Date Filter */}
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Dates</option>
            <option value="today">Today</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
          </select>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{documents.length}</p>
              <p className="text-gray-600">Total Documents</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {documents.filter(d => d.status === 'verified').length}
              </p>
              <p className="text-gray-600">Verified</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-yellow-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {documents.filter(d => d.status === 'pending').length}
              </p>
              <p className="text-gray-600">Pending</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-red-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {documents.filter(d => d.status === 'rejected' || d.status === 'expired').length}
              </p>
              <p className="text-gray-600">Issues</p>
            </div>
          </div>
        </div>
      </div>

      {/* Documents List */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Documents ({filteredDocuments.length})
          </h3>
        </div>
        
        {filteredDocuments.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No documents found matching your criteria</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredDocuments.map((document) => (
              <div key={document.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      {getStatusIcon(document.status)}
                      <h4 className="text-lg font-medium text-gray-900">
                        {document.name}
                      </h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(document.status)}`}>
                        {document.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <Car className="h-4 w-4 mr-1" />
                        {document.vehicleRegNo || 'N/A'}
                      </div>
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-1" />
                        {document.format} • {document.size} MB
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {document.uploadDate.toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        App ID: {document.applicationId}
                      </div>
                    </div>

                    {document.comments && (
                      <p className="text-sm text-gray-600 italic">
                        "{document.comments}"
                      </p>
                    )}

                    {document.verificationDate && (
                      <p className="text-xs text-gray-500 mt-2">
                        Verified by {document.verifiedBy} on {document.verificationDate.toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleView(document)}
                      className="p-2 text-gray-500 hover:text-gray-700 rounded"
                      title="View Document"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDownload(document)}
                      className="p-2 text-gray-500 hover:text-gray-700 rounded"
                      title="Download"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                    
                    {userRole === 'admin' && (
                      <>
                        {document.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleStatusUpdate(document.id, 'verified', 'Document approved')}
                              className="p-2 text-green-500 hover:text-green-700 rounded"
                              title="Approve"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => {
                                const reason = prompt('Reason for rejection:');
                                if (reason) {
                                  handleStatusUpdate(document.id, 'rejected', reason);
                                }
                              }}
                              className="p-2 text-red-500 hover:text-red-700 rounded"
                              title="Reject"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => alert('Archive functionality would be implemented here')}
                          className="p-2 text-gray-500 hover:text-gray-700 rounded"
                          title="Archive"
                        >
                          <Archive className="h-4 w-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentTracker;
