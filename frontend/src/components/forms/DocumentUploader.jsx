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
  ZoomOut
} from 'lucide-react';

const DocumentUploader = ({ 
  documents, 
  onDocumentUpload, 
  onDocumentRemove, 
  requiredDocuments 
}) => {
  const [dragOver, setDragOver] = useState(null);
  const [previewDocument, setPreviewDocument] = useState(null);
  const [previewZoom, setPreviewZoom] = useState(100);
  const fileInputRefs = useRef({});

  const maxFileSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];

  const validateFile = (file) => {
    const errors = [];
    
    if (file.size > maxFileSize) {
      errors.push('File size must be less than 5MB');
    }
    
    if (!allowedTypes.includes(file.type)) {
      errors.push('File must be PDF, JPG, or PNG');
    }
    
    return errors;
  };

  const handleFileSelect = (documentKey, file) => {
    const errors = validateFile(file);
    
    if (errors.length > 0) {
      alert(`Upload failed:\n${errors.join('\n')}`);
      return;
    }

    // Create file preview URL
    const fileWithPreview = {
      ...file,
      id: Date.now(),
      uploadDate: new Date(),
      previewUrl: URL.createObjectURL(file)
    };

    onDocumentUpload(documentKey, fileWithPreview);
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
    if (type.startsWith('image/')) {
      return <Image className="h-8 w-8 text-blue-500" />;
    }
    return <FileText className="h-8 w-8 text-gray-500" />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const DocumentPreview = ({ document, onClose }) => {
    const isImage = document.type.startsWith('image/');
    const isPDF = document.type === 'application/pdf';

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-4xl max-h-full overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div>
              <h3 className="text-lg font-medium text-gray-900">{document.name}</h3>
              <p className="text-sm text-gray-500">
                {formatFileSize(document.size)} • {document.type}
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
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Preview not available for this file type</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Document Upload</h3>
        <p className="text-sm text-gray-600">
          Upload all required documents. Files must be PDF, JPG, or PNG format, max 5MB each.
        </p>
      </div>

      <div className="space-y-4">
        {requiredDocuments.map((doc) => {
          const uploadedDoc = documents[doc.key];
          const isRequired = doc.required;
          const isUploaded = !!uploadedDoc;

          return (
            <div key={doc.key} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">{doc.label}</span>
                  {isRequired && <span className="text-red-500 text-sm">*</span>}
                </div>
                <div className="flex items-center space-x-2">
                  {isUploaded ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : isRequired ? (
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                  ) : (
                    <div className="h-5 w-5" />
                  )}
                </div>
              </div>

              {isUploaded ? (
                /* Uploaded Document Display */
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getFileIcon(uploadedDoc.type)}
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {uploadedDoc.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(uploadedDoc.size)} • Uploaded {uploadedDoc.uploadDate.toLocaleDateString()}
                      </p>
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
                    <button
                      onClick={() => onDocumentRemove(doc.key)}
                      className="p-2 text-red-500 hover:text-red-700 rounded"
                      title="Remove"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ) : (
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
              )}
            </div>
          );
        })}
      </div>

      {/* Upload Guidelines */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-900 mb-2">Upload Guidelines</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Ensure documents are clear and readable</li>
          <li>• All text should be visible and not blurred</li>
          <li>• Documents should be recent and valid</li>
          <li>• Scanned copies are acceptable if clear</li>
          <li>• File names should be descriptive</li>
        </ul>
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

export default DocumentUploader;
