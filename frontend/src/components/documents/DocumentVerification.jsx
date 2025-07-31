import { useState } from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  CheckCircle, 
  X, 
  AlertTriangle,
  Clock,
  MessageSquare,
  User,
  Calendar,
  Filter,
  Search,
  MoreVertical
} from 'lucide-react';

const DocumentVerification = ({ userRole = 'admin' }) => {
  const [pendingDocuments, setPendingDocuments] = useState([
    {
      id: 'DOC006',
      applicationId: 'VT20250004',
      documentType: 'vehicleRegistration',
      documentName: 'Vehicle Registration Certificate',
      fileName: 'vehicle_reg_DEF4567.pdf',
      uploaderName: 'Saman Perera',
      uploaderNIC: '875432109V',
      uploadDate: new Date('2025-01-31'),
      vehicleRegNo: 'DEF-4567',
      size: 2.8,
      format: 'PDF',
      priority: 'high',
      comments: [],
      reviewDeadline: new Date('2025-02-02')
    },
    {
      id: 'DOC007',
      applicationId: 'VT20250004',
      documentType: 'newOwnerNIC',
      documentName: 'New Owner NIC Copy',
      fileName: 'nic_ravi_silva.jpg',
      uploaderName: 'Saman Perera',
      uploaderNIC: '875432109V',
      uploadDate: new Date('2025-01-31'),
      vehicleRegNo: 'DEF-4567',
      size: 1.9,
      format: 'JPG',
      priority: 'medium',
      comments: [],
      reviewDeadline: new Date('2025-02-02')
    },
    {
      id: 'DOC008',
      applicationId: 'VT20250005',
      documentType: 'saleAgreement',
      documentName: 'Vehicle Sale Agreement',
      fileName: 'sale_agreement_GHI7890.pdf',
      uploaderName: 'Kamala Jayawardena',
      uploaderNIC: '926781234V',
      uploadDate: new Date('2025-01-30'),
      vehicleRegNo: 'GHI-7890',
      size: 3.1,
      format: 'PDF',
      priority: 'urgent',
      comments: [
        {
          id: 1,
          author: 'System',
          message: 'Document uploaded and pending verification',
          timestamp: new Date('2025-01-30T10:30:00')
        }
      ],
      reviewDeadline: new Date('2025-02-01')
    }
  ]);

  const [selectedDocument, setSelectedDocument] = useState(null);
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleVerification = (documentId, status, comments = '') => {
    setPendingDocuments(prev => prev.filter(doc => doc.id !== documentId));
    
    // In a real app, this would make an API call
    console.log(`Document ${documentId} ${status}:`, comments);
    
    // Show success notification
    alert(`Document ${status} successfully!`);
  };

  const addComment = (documentId, comment) => {
    setPendingDocuments(prev => prev.map(doc => 
      doc.id === documentId 
        ? {
            ...doc,
            comments: [...doc.comments, {
              id: Date.now(),
              author: 'Admin Officer',
              message: comment,
              timestamp: new Date()
            }]
          }
        : doc
    ));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDocumentTypeIcon = (type) => {
    return <FileText className="h-5 w-5 text-blue-600" />;
  };

  const isOverdue = (deadline) => {
    return new Date() > deadline;
  };

  const filteredDocuments = pendingDocuments.filter(doc => {
    const matchesSearch = doc.documentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.uploaderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.vehicleRegNo?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPriority = filterPriority === 'all' || doc.priority === filterPriority;
    const matchesType = filterType === 'all' || doc.documentType === filterType;
    
    return matchesSearch && matchesPriority && matchesType;
  });

  const DocumentModal = ({ document, onClose }) => {
    const [comment, setComment] = useState('');
    const [decision, setDecision] = useState('');

    const handleSubmit = () => {
      if (decision && comment.trim()) {
        handleVerification(document.id, decision, comment);
        onClose();
      } else {
        alert('Please select a decision and provide comments');
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-4xl max-h-full overflow-y-auto">
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            {/* Document Preview */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Document Preview</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                {document.format === 'PDF' ? (
                  <div>
                    <FileText className="h-16 w-16 text-red-500 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">PDF Preview</p>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      <Download className="h-4 w-4 mr-2 inline" />
                      Download to View
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="w-full h-64 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                      <span className="text-gray-500">Image Preview</span>
                    </div>
                    <div className="flex justify-center space-x-2">
                      <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded">
                        Zoom In
                      </button>
                      <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded">
                        Zoom Out
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Document Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Document Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Size:</span>
                    <span>{document.size} MB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Format:</span>
                    <span>{document.format}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Upload Date:</span>
                    <span>{document.uploadDate.toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Vehicle:</span>
                    <span>{document.vehicleRegNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Priority:</span>
                    <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(document.priority)}`}>
                      {document.priority}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Verification Panel */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Verification Details</h3>
              
              {/* Uploader Info */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Uploader Information</h4>
                <div className="space-y-1 text-sm text-blue-800">
                  <div className="flex justify-between">
                    <span>Name:</span>
                    <span>{document.uploaderName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>NIC:</span>
                    <span>{document.uploaderNIC}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Application ID:</span>
                    <span>{document.applicationId}</span>
                  </div>
                </div>
              </div>

              {/* Comments History */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Comments</h4>
                <div className="max-h-32 overflow-y-auto space-y-2">
                  {document.comments.length === 0 ? (
                    <p className="text-gray-500 text-sm">No comments yet</p>
                  ) : (
                    document.comments.map(comment => (
                      <div key={comment.id} className="bg-gray-50 rounded p-3 text-sm">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-medium">{comment.author}</span>
                          <span className="text-gray-500 text-xs">
                            {comment.timestamp.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-gray-700">{comment.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Decision Section */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Verification Decision</h4>
                
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="verified"
                      checked={decision === 'verified'}
                      onChange={(e) => setDecision(e.target.value)}
                      className="mr-2"
                    />
                    <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
                    Approve Document
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="rejected"
                      checked={decision === 'rejected'}
                      onChange={(e) => setDecision(e.target.value)}
                      className="mr-2"
                    />
                    <X className="h-4 w-4 text-red-600 mr-1" />
                    Reject Document
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="pending"
                      checked={decision === 'pending'}
                      onChange={(e) => setDecision(e.target.value)}
                      className="mr-2"
                    />
                    <Clock className="h-4 w-4 text-yellow-600 mr-1" />
                    Request More Information
                  </label>
                </div>

                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add verification comments..."
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />

                <div className="flex space-x-3">
                  <button
                    onClick={handleSubmit}
                    disabled={!decision || !comment.trim()}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    Submit Decision
                  </button>
                  <button
                    onClick={() => {
                      if (comment.trim()) {
                        addComment(document.id, comment);
                        setComment('');
                      }
                    }}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Add Comment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Document Verification</h2>
          <p className="text-gray-600">
            Review and verify uploaded documents for vehicle transfer applications
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Pending Documents</p>
          <p className="text-2xl font-bold text-orange-600">{pendingDocuments.length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Priorities</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Document Types</option>
            <option value="vehicleRegistration">Vehicle Registration</option>
            <option value="newOwnerNIC">New Owner NIC</option>
            <option value="saleAgreement">Sale Agreement</option>
            <option value="insurance">Insurance</option>
          </select>
        </div>
      </div>

      {/* Documents List */}
      <div className="space-y-4">
        {filteredDocuments.length === 0 ? (
          <div className="bg-white rounded-lg border p-12 text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">All Caught Up!</h3>
            <p className="text-gray-600">No documents pending verification at the moment.</p>
          </div>
        ) : (
          filteredDocuments.map((document) => (
            <div
              key={document.id}
              className={`bg-white rounded-lg border p-6 hover:shadow-md transition-shadow ${
                isOverdue(document.reviewDeadline) ? 'border-red-200 bg-red-50' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getDocumentTypeIcon(document.documentType)}
                    <h3 className="text-lg font-medium text-gray-900">
                      {document.documentName}
                    </h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded border ${getPriorityColor(document.priority)}`}>
                      {document.priority}
                    </span>
                    {isOverdue(document.reviewDeadline) && (
                      <span className="px-2 py-1 text-xs font-medium rounded bg-red-100 text-red-800">
                        Overdue
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {document.uploaderName}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Uploaded: {document.uploadDate.toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      Due: {document.reviewDeadline.toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>Vehicle: {document.vehicleRegNo}</span>
                    <span>App ID: {document.applicationId}</span>
                    <span>{document.format} • {document.size} MB</span>
                  </div>

                  {document.comments.length > 0 && (
                    <div className="mt-3 flex items-center text-sm text-gray-500">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      {document.comments.length} comment(s)
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => setSelectedDocument(document)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Review Document
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Document Modal */}
      {selectedDocument && (
        <DocumentModal
          document={selectedDocument}
          onClose={() => setSelectedDocument(null)}
        />
      )}
    </div>
  );
};

export default DocumentVerification;
