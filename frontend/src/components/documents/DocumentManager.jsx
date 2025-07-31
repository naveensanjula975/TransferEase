import { useState, useRef } from 'react';
import { 
  Upload, 
  X, 
  Eye, 
  Download, 
  FileText, 
  Image, 
  CheckCircle, 
  AlertTriangle,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Clock,
  Shield,
  File,
  Camera,
  Scan,
  RefreshCw
} from 'lucide-react';

const DocumentManager = ({ 
  applicationId,
  documents = {},
  onDocumentUpload,
  onDocumentRemove,
  onDocumentUpdate,
  requiredDocuments = [],
  mode = 'upload' // 'upload', 'review', 'readonly'
}) => {
  const [dragOver, setDragOver] = useState(null);
  const [previewDocument, setPreviewDocument] = useState(null);
  const [previewZoom, setPreviewZoom] = useState(100);
  const [uploadProgress, setUploadProgress] = useState({});
  const [validationResults, setValidationResults] = useState({});
  const fileInputRefs = useRef({});

  const maxFileSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];

  // Enhanced validation with detailed feedback
  const validateDocument = (file, documentType) => {
    const errors = [];
    const warnings = [];
    
    // File size validation
    if (file.size > maxFileSize) {
      errors.push('File size must be less than 5MB');
    }
    
    // File type validation
    if (!allowedTypes.includes(file.type)) {
      errors.push('File must be PDF, JPG, or PNG');
    }
    
    // Document-specific validations
    if (documentType === 'vehicleRegistration' && file.type !== 'application/pdf') {
      warnings.push('Vehicle registration should preferably be in PDF format');
    }
    
    if (documentType === 'nicCopy' && !file.type.startsWith('image/')) {
      warnings.push('NIC copies are typically clearer as images (JPG/PNG)');
    }
    
    // File name validation
    if (file.name.length > 100) {
      warnings.push('File name is very long, consider shortening it');
    }
    
    return { errors, warnings, isValid: errors.length === 0 };
  };

  const simulateUpload = (file, documentKey) => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10 + Math.random() * 20;
        setUploadProgress(prev => ({
          ...prev,
          [documentKey]: Math.min(progress, 100)
        }));
        
        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setUploadProgress(prev => {
              const newProgress = { ...prev };
              delete newProgress[documentKey];
              return newProgress;
            });
            resolve();
          }, 500);
        }
      }, 200);
    });
  };

  const handleFileSelect = async (documentKey, file) => {
    const validation = validateDocument(file, documentKey);
    setValidationResults(prev => ({
      ...prev,
      [documentKey]: validation
    }));
    
    if (!validation.isValid) {
      return;
    }

    // Simulate upload progress
    await simulateUpload(file, documentKey);

    // Create file with metadata
    const fileWithMetadata = {
      ...file,
      id: Date.now(),
      documentType: documentKey,
      uploadDate: new Date(),
      previewUrl: URL.createObjectURL(file),
      status: 'uploaded',
      validation: validation
    };

    onDocumentUpload(documentKey, fileWithMetadata);
  };

  const handleDrop = (e, documentKey) => {
    e.preventDefault();
    setDragOver(null);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(documentKey, files[0]);
    }
  };

  const handleDragOver = (e, documentKey) => {
    e.preventDefault();
    setDragOver(documentKey);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(null);
  };

  const getFileIcon = (type) => {
    if (type === 'application/pdf') {
      return <FileText className="h-8 w-8 text-red-500" />;
    }
    if (type?.startsWith('image/')) {
      return <Image className="h-8 w-8 text-blue-500" />;
    }
    return <File className="h-8 w-8 text-gray-500" />;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'uploaded': return 'text-blue-600';
      case 'verified': return 'text-green-600';
      case 'rejected': return 'text-red-600';
      case 'pending': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const DocumentPreview = ({ document, onClose }) => {
    const isImage = document.type?.startsWith('image/');
    const isPDF = document.type === 'application/pdf';

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-4xl max-h-full overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div>
              <h3 className="text-lg font-medium text-gray-900">{document.name}</h3>
              <p className="text-sm text-gray-500">
                {formatFileSize(document.size)} • {document.type} • 
                <span className={`ml-1 ${getStatusColor(document.status)}`}>
                  {document.status}
                </span>
              </p>
            </div>
            <div className="flex items-center space-x-3">
              {isImage && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setPreviewZoom(Math.max(25, previewZoom - 25))}
                    className="p-2 text-gray-500 hover:text-gray-700"
                  >
                    <ZoomOut className="h-4 w-4" />
                  </button>
                  <span className="text-sm text-gray-600">{previewZoom}%</span>
                  <button
                    onClick={() => setPreviewZoom(Math.min(200, previewZoom + 25))}
                    className="p-2 text-gray-500 hover:text-gray-700"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setPreviewZoom(100)}
                    className="p-2 text-gray-500 hover:text-gray-700"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                </div>
              )}
              <button
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 max-h-96 overflow-auto">
            {isImage ? (
              <img
                src={document.previewUrl}
                alt={document.name}
                style={{ transform: `scale(${previewZoom / 100})` }}
                className="max-w-full h-auto transition-transform origin-top-left"
              />
            ) : isPDF ? (
              <div className="text-center py-8">
                <FileText className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">PDF Preview not available</p>
                <a
                  href={document.previewUrl}
                  download={document.name}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download to View
                </a>
              </div>
            ) : (
              <div className="text-center py-8">
                <File className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Preview not available for this file type</p>
              </div>
            )}
          </div>

          {/* Document Actions */}
          {mode === 'review' && (
            <div className="border-t p-4 bg-gray-50">
              <div className="flex justify-center space-x-3">
                <button
                  onClick={() => onDocumentUpdate?.(document.documentType, { status: 'verified' })}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <CheckCircle className="h-4 w-4 mr-2 inline" />
                  Approve
                </button>
                <button
                  onClick={() => onDocumentUpdate?.(document.documentType, { status: 'rejected' })}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  <X className="h-4 w-4 mr-2 inline" />
                  Reject
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const DocumentCard = ({ doc, uploadedDoc }) => {
    const isRequired = doc.required;
    const isUploaded = !!uploadedDoc;
    const progress = uploadProgress[doc.key];
    const validation = validationResults[doc.key];

    return (
      <div className="border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-900">{doc.label}</span>
            {isRequired && <span className="text-red-500 text-sm">*</span>}
            {doc.description && (
              <span className="text-xs text-gray-500">({doc.description})</span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {isUploaded ? (
              <div className="flex items-center space-x-1">
                <div className={`h-2 w-2 rounded-full ${
                  uploadedDoc.status === 'verified' ? 'bg-green-500' :
                  uploadedDoc.status === 'rejected' ? 'bg-red-500' :
                  uploadedDoc.status === 'pending' ? 'bg-yellow-500' :
                  'bg-blue-500'
                }`}></div>
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
            ) : isRequired ? (
              <AlertTriangle className="h-5 w-5 text-red-500" />
            ) : (
              <div className="h-5 w-5" />
            )}
          </div>
        </div>

        {/* Validation Messages */}
        {validation && (
          <div className="mb-3 space-y-1">
            {validation.errors.map((error, idx) => (
              <div key={idx} className="flex items-center text-xs text-red-600">
                <AlertTriangle className="h-3 w-3 mr-1" />
                {error}
              </div>
            ))}
            {validation.warnings.map((warning, idx) => (
              <div key={idx} className="flex items-center text-xs text-yellow-600">
                <AlertTriangle className="h-3 w-3 mr-1" />
                {warning}
              </div>
            ))}
          </div>
        )}

        {/* Upload Progress */}
        {progress !== undefined && (
          <div className="mb-3">
            <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
              <span>Uploading...</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {isUploaded ? (
          /* Uploaded Document Display */
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              {getFileIcon(uploadedDoc.type)}
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {uploadedDoc.name}
                </p>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <span>{formatFileSize(uploadedDoc.size)}</span>
                  <span>•</span>
                  <span>Uploaded {uploadedDoc.uploadDate?.toLocaleDateString()}</span>
                  {uploadedDoc.status && (
                    <>
                      <span>•</span>
                      <span className={getStatusColor(uploadedDoc.status)}>
                        {uploadedDoc.status}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setPreviewDocument(uploadedDoc)}
                className="p-2 text-gray-500 hover:text-gray-700 rounded"
                title="Preview"
              >
                <Eye className="h-4 w-4" />
              </button>
              <a
                href={uploadedDoc.previewUrl}
                download={uploadedDoc.name}
                className="p-2 text-gray-500 hover:text-gray-700 rounded"
                title="Download"
              >
                <Download className="h-4 w-4" />
              </a>
              {mode === 'upload' && (
                <button
                  onClick={() => onDocumentRemove(doc.key)}
                  className="p-2 text-red-500 hover:text-red-700 rounded"
                  title="Remove"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        ) : mode === 'upload' ? (
          /* Upload Area */
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              dragOver === doc.key
                ? 'border-blue-400 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDrop={(e) => handleDrop(e, doc.key)}
            onDragOver={(e) => handleDragOver(e, doc.key)}
            onDragLeave={handleDragLeave}
          >
            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-3" />
            <p className="text-sm text-gray-600 mb-2">
              Drag and drop your file here, or{' '}
              <button
                onClick={() => fileInputRefs.current[doc.key]?.click()}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                browse
              </button>
            </p>
            <p className="text-xs text-gray-500">
              PDF, JPG, PNG up to 5MB
            </p>
            
            {/* Alternative Upload Options */}
            <div className="mt-3 flex justify-center space-x-2">
              <button
                onClick={() => fileInputRefs.current[doc.key]?.click()}
                className="flex items-center px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200"
              >
                <Upload className="h-3 w-3 mr-1" />
                Upload File
              </button>
              <button
                onClick={() => alert('Camera capture would be implemented here')}
                className="flex items-center px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full hover:bg-green-200"
              >
                <Camera className="h-3 w-3 mr-1" />
                Take Photo
              </button>
              <button
                onClick={() => alert('Document scanning would be implemented here')}
                className="flex items-center px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200"
              >
                <Scan className="h-3 w-3 mr-1" />
                Scan
              </button>
            </div>

            <input
              ref={(el) => (fileInputRefs.current[doc.key] = el)}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  handleFileSelect(doc.key, file);
                }
              }}
              className="hidden"
            />
          </div>
        ) : (
          /* Read-only mode */
          <div className="text-center py-4 text-gray-500">
            <File className="h-8 w-8 mx-auto mb-2" />
            <p className="text-sm">No document uploaded</p>
          </div>
        )}
      </div>
    );
  };

  const completedDocs = requiredDocuments.filter(doc => documents[doc.key]).length;
  const totalDocs = requiredDocuments.length;
  const completionPercentage = totalDocs > 0 ? (completedDocs / totalDocs) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Document Management</h3>
          <p className="text-sm text-gray-600">
            {mode === 'upload' ? 'Upload all required documents to proceed' :
             mode === 'review' ? 'Review and verify uploaded documents' :
             'View uploaded documents'}
          </p>
        </div>
        {applicationId && (
          <div className="text-right">
            <p className="text-sm text-gray-500">Application ID</p>
            <p className="font-mono text-sm font-medium">{applicationId}</p>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="bg-white border rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Document Upload Progress
          </span>
          <span className="text-sm text-gray-600">
            {completedDocs} of {totalDocs} documents uploaded
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {completionPercentage === 100 ? 'All documents uploaded' : 
           `${Math.round(completionPercentage)}% complete`}
        </p>
      </div>

      {/* Document Cards */}
      <div className="space-y-4">
        {requiredDocuments.map((doc) => (
          <DocumentCard
            key={doc.key}
            doc={doc}
            uploadedDoc={documents[doc.key]}
          />
        ))}
      </div>

      {/* Upload Guidelines */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <Shield className="h-5 w-5 text-blue-500 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-900 mb-2">Document Guidelines</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Ensure documents are clear, readable, and not blurred</li>
              <li>• All text and details should be clearly visible</li>
              <li>• Documents should be recent and valid (not expired)</li>
              <li>• Scanned copies are acceptable if of good quality</li>
              <li>• File names should be descriptive and professional</li>
              <li>• For best results, use PDF format for official documents</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center">
          <Shield className="h-5 w-5 text-green-500 mr-2" />
          <div>
            <p className="text-green-800 font-medium text-sm">Secure Document Handling</p>
            <p className="text-green-700 text-sm">
              All uploaded documents are encrypted and securely stored. Access is restricted to authorized personnel only.
            </p>
          </div>
        </div>
      </div>

      {/* Document Preview Modal */}
      {previewDocument && (
        <DocumentPreview
          document={previewDocument}
          onClose={() => {
            setPreviewDocument(null);
            setPreviewZoom(100);
          }}
        />
      )}
    </div>
  );
};

export default DocumentManager;
