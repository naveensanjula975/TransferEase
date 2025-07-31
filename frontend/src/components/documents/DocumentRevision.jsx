import { useState } from 'react';
import { 
  FileText, 
  Download, 
  RotateCcw, 
  CheckCircle, 
  X, 
  AlertTriangle,
  Clock,
  Upload,
  Trash2,
  Edit3,
  Eye,
  RefreshCw
} from 'lucide-react';
import DocumentUploader from '../forms/DocumentUploader';

const DocumentRevision = ({ userRole = 'user' }) => {
  const [rejectedDocuments, setRejectedDocuments] = useState([
    {
      id: 'DOC003',
      applicationId: 'VT20250002',
      documentType: 'vehicleRegistration',
      documentName: 'Vehicle Registration Certificate',
      fileName: 'vehicle_reg_abc123_v1.pdf',
      originalUploadDate: new Date('2025-01-28'),
      rejectionDate: new Date('2025-01-30'),
      rejectionReason: 'Document image quality is poor. Text is not clearly readable, especially the vehicle registration number section.',
      adminComments: 'Please upload a higher quality scan or photo. Ensure all text is clearly visible and the document is not blurry.',
      priority: 'high',
      size: 2.3,
      format: 'PDF',
      vehicleRegNo: 'ABC-123',
      daysToResubmit: 7,
      revisionCount: 1,
      status: 'rejected'
    },
    {
      id: 'DOC004',
      applicationId: 'VT20250002',
      documentType: 'newOwnerNIC',
      documentName: 'New Owner NIC Copy',
      fileName: 'nic_john_doe_v1.jpg',
      originalUploadDate: new Date('2025-01-28'),
      rejectionDate: new Date('2025-01-30'),
      rejectionReason: 'NIC copy appears to be a photocopy of a photocopy. Original or certified copy required.',
      adminComments: 'Please provide either: 1) A clear photo/scan of the original NIC, or 2) A certified copy from Grama Niladhari office.',
      priority: 'high',
      size: 1.8,
      format: 'JPG',
      vehicleRegNo: 'ABC-123',
      daysToResubmit: 7,
      revisionCount: 1,
      status: 'rejected'
    },
    {
      id: 'DOC005',
      applicationId: 'VT20250003',
      documentType: 'saleAgreement',
      documentName: 'Vehicle Sale Agreement',
      fileName: 'sale_agreement_xyz789.pdf',
      originalUploadDate: new Date('2025-01-29'),
      rejectionDate: new Date('2025-01-31'),
      rejectionReason: 'Sale agreement is missing required signatures from both buyer and seller.',
      adminComments: 'Please ensure both parties have signed the agreement. Witness signatures are also required as per regulations.',
      priority: 'urgent',
      size: 2.1,
      format: 'PDF',
      vehicleRegNo: 'XYZ-789',
      daysToResubmit: 5,
      revisionCount: 2,
      status: 'rejected'
    }
  ]);

  const [showUploader, setShowUploader] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const handleResubmission = (documentId, newFiles) => {
    setRejectedDocuments(prev => prev.map(doc => 
      doc.id === documentId 
        ? {
            ...doc,
            status: 'resubmitted',
            resubmissionDate: new Date(),
            revisionCount: doc.revisionCount + 1,
            newFileName: newFiles[0]?.name || `${doc.documentType}_v${doc.revisionCount + 1}.${doc.format.toLowerCase()}`
          }
        : doc
    ));
    
    setShowUploader(null);
    alert('Document resubmitted successfully! You will be notified once it\'s reviewed.');
  };

  const deleteDocument = (documentId) => {
    if (window.confirm('Are you sure you want to delete this document? This action cannot be undone.')) {
      setRejectedDocuments(prev => prev.filter(doc => doc.id !== documentId));
      alert('Document deleted successfully.');
    }
  };

  const getDaysRemaining = (rejectionDate, daysToResubmit) => {
    const deadline = new Date(rejectionDate);
    deadline.setDate(deadline.getDate() + daysToResubmit);
    const today = new Date();
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'resubmitted': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'expired': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

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
                  <span className="text-gray-600">Original Upload:</span>
                  <div className="font-medium">{document.originalUploadDate.toLocaleDateString()}</div>
                </div>
                <div>
                  <span className="text-gray-600">Rejection Date:</span>
                  <div className="font-medium">{document.rejectionDate.toLocaleDateString()}</div>
                </div>
                <div>
                  <span className="text-gray-600">File Size:</span>
                  <div className="font-medium">{document.size} MB</div>
                </div>
                <div>
                  <span className="text-gray-600">Revision Count:</span>
                  <div className="font-medium">{document.revisionCount}</div>
                </div>
              </div>
            </div>

            {/* Rejection Details */}
            <div className="bg-red-50 rounded-lg p-4">
              <h3 className="font-medium text-red-900 mb-3">Rejection Details</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-red-700 text-sm font-medium">Reason for Rejection:</span>
                  <p className="text-red-800 mt-1">{document.rejectionReason}</p>
                </div>
                <div>
                  <span className="text-red-700 text-sm font-medium">Admin Comments:</span>
                  <p className="text-red-800 mt-1">{document.adminComments}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  onClose();
                  setShowUploader(document.id);
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Upload className="h-4 w-4 mr-2 inline" />
                Resubmit Document
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
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
          <h2 className="text-2xl font-bold text-gray-900">Document Revision</h2>
          <p className="text-gray-600">
            Review rejected documents and resubmit corrected versions
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Documents Requiring Action</p>
          <p className="text-2xl font-bold text-red-600">{rejectedDocuments.length}</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <X className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Rejected</p>
              <p className="text-2xl font-bold text-red-600">
                {rejectedDocuments.filter(doc => doc.status === 'rejected').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <RefreshCw className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Resubmitted</p>
              <p className="text-2xl font-bold text-blue-600">
                {rejectedDocuments.filter(doc => doc.status === 'resubmitted').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Urgent</p>
              <p className="text-2xl font-bold text-orange-600">
                {rejectedDocuments.filter(doc => doc.priority === 'urgent').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Documents List */}
      <div className="space-y-4">
        {rejectedDocuments.length === 0 ? (
          <div className="bg-white rounded-lg border p-12 text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">All Documents Approved!</h3>
            <p className="text-gray-600">You have no documents requiring revision at this time.</p>
          </div>
        ) : (
          rejectedDocuments.map((document) => {
            const daysRemaining = getDaysRemaining(document.rejectionDate, document.daysToResubmit);
            const isExpiring = daysRemaining <= 2;
            const isExpired = daysRemaining < 0;

            return (
              <div
                key={document.id}
                className={`bg-white rounded-lg border p-6 ${
                  isExpired ? 'border-red-300 bg-red-50' : 
                  isExpiring ? 'border-orange-300 bg-orange-50' : 
                  'hover:shadow-md'
                } transition-shadow`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <FileText className="h-6 w-6 text-red-600" />
                      <h3 className="text-lg font-medium text-gray-900">
                        {document.documentName}
                      </h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded border ${getStatusColor(document.status)}`}>
                        {document.status}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded border ${getPriorityColor(document.priority)}`}>
                        {document.priority}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                      <div>
                        <span className="font-medium">Vehicle:</span> {document.vehicleRegNo}
                      </div>
                      <div>
                        <span className="font-medium">Rejected:</span> {document.rejectionDate.toLocaleDateString()}
                      </div>
                      <div>
                        <span className="font-medium">Revisions:</span> {document.revisionCount}
                      </div>
                      <div className={`font-medium ${
                        isExpired ? 'text-red-600' : 
                        isExpiring ? 'text-orange-600' : 
                        'text-gray-600'
                      }`}>
                        {isExpired ? 'Expired' : 
                         isExpiring ? `${daysRemaining} day(s) left` : 
                         `${daysRemaining} day(s) remaining`}
                      </div>
                    </div>

                    <div className="bg-red-50 rounded-lg p-3 mb-4">
                      <p className="text-red-800 text-sm">
                        <span className="font-medium">Rejection Reason:</span> {document.rejectionReason}
                      </p>
                    </div>

                    {document.status === 'resubmitted' && (
                      <div className="bg-blue-50 rounded-lg p-3 mb-4">
                        <p className="text-blue-800 text-sm">
                          <CheckCircle className="h-4 w-4 inline mr-1" />
                          Document resubmitted on {document.resubmissionDate?.toLocaleDateString()}. 
                          Currently under review.
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

                    {document.status === 'rejected' && !isExpired && (
                      <button
                        onClick={() => setShowUploader(document.id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        <Upload className="h-4 w-4 mr-2 inline" />
                        Resubmit
                      </button>
                    )}

                    <button
                      onClick={() => deleteDocument(document.id)}
                      className="p-2 text-red-400 hover:text-red-600"
                      title="Delete Document"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Document Uploader Modal */}
      {showUploader && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-full overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Resubmit Document</h2>
              <button
                onClick={() => setShowUploader(null)}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <DocumentUploader
                maxFiles={1}
                onUpload={(files) => handleResubmission(showUploader, files)}
                documentType={rejectedDocuments.find(doc => doc.id === showUploader)?.documentType}
              />
            </div>
          </div>
        </div>
      )}

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

export default DocumentRevision;
