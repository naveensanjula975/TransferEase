import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Download, 
  FileText, 
  File, 
  Image, 
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  ArrowLeft
} from 'lucide-react';

const DownloadPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const downloadCategories = [
    { id: 'all', name: 'All Documents', count: 12 },
    { id: 'forms', name: 'Application Forms', count: 5 },
    { id: 'guides', name: 'User Guides', count: 3 },
    { id: 'legal', name: 'Legal Documents', count: 2 },
    { id: 'samples', name: 'Sample Documents', count: 2 }
  ];

  const documents = [
    {
      id: 1,
      name: 'Vehicle Transfer Application Form',
      description: 'Official form for initiating vehicle ownership transfer',
      category: 'forms',
      type: 'PDF',
      size: '2.1 MB',
      downloads: 15420,
      lastUpdated: '2025-01-15',
      isRequired: true,
      icon: FileText
    },
    {
      id: 2,
      name: 'Document Checklist',
      description: 'Complete list of required documents for transfer',
      category: 'guides',
      type: 'PDF',
      size: '856 KB',
      downloads: 8750,
      lastUpdated: '2025-01-10',
      isRequired: true,
      icon: CheckCircle
    },
    {
      id: 3,
      name: 'Transfer User Guide',
      description: 'Step-by-step guide for completing online transfer',
      category: 'guides',
      type: 'PDF',
      size: '4.2 MB',
      downloads: 12300,
      lastUpdated: '2025-01-12',
      isRequired: false,
      icon: File
    },
    {
      id: 4,
      name: 'NIC Verification Form',
      description: 'Form for National Identity Card verification',
      category: 'forms',
      type: 'PDF',
      size: '1.8 MB',
      downloads: 9850,
      lastUpdated: '2025-01-08',
      isRequired: true,
      icon: FileText
    },
    {
      id: 5,
      name: 'Sample Insurance Certificate',
      description: 'Example of valid insurance certificate format',
      category: 'samples',
      type: 'PDF',
      size: '1.2 MB',
      downloads: 5400,
      lastUpdated: '2025-01-05',
      isRequired: false,
      icon: Image
    },
    {
      id: 6,
      name: 'Transfer Terms & Conditions',
      description: 'Legal terms and conditions for vehicle transfer',
      category: 'legal',
      type: 'PDF',
      size: '920 KB',
      downloads: 3200,
      lastUpdated: '2025-01-01',
      isRequired: false,
      icon: FileText
    },
    {
      id: 7,
      name: 'Payment Receipt Template',
      description: 'Template for payment documentation',
      category: 'samples',
      type: 'PDF',
      size: '650 KB',
      downloads: 2800,
      lastUpdated: '2024-12-28',
      isRequired: false,
      icon: File
    },
    {
      id: 8,
      name: 'Vehicle Inspection Form',
      description: 'Form for vehicle condition assessment',
      category: 'forms',
      type: 'PDF',
      size: '1.5 MB',
      downloads: 7200,
      lastUpdated: '2025-01-03',
      isRequired: false,
      icon: FileText
    }
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDownload = (document) => {
    // Simulate file download
    console.log(`Downloading: ${document.name}`);
    // In a real app, this would trigger actual file download
  };

  const getFileIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return FileText;
      case 'doc':
      case 'docx':
        return File;
      case 'jpg':
      case 'png':
        return Image;
      default:
        return File;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link
                to="/"
                className="flex items-center text-gray-600 hover:text-blue-600 mr-6"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Home
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">Download Center</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Forms & Documents
          </h1>
          <p className="text-lg text-gray-600">
            Download all necessary forms and documents for your vehicle transfer process.
          </p>
        </div>

        {/* Important Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <AlertCircle className="h-6 w-6 text-blue-600 mt-0.5 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Important Information
              </h3>
              <ul className="text-blue-800 space-y-1 text-sm">
                <li>• All documents marked as "Required" must be completed and submitted</li>
                <li>• Please ensure you have the latest version of each document</li>
                <li>• Documents should be printed on A4 size paper for official use</li>
                <li>• For online transfers, you can fill forms digitally through our platform</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories and Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {downloadCategories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{category.name}</span>
                      <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
              <div className="space-y-3">
                <Link
                  to="/register"
                  className="block text-sm text-blue-600 hover:text-blue-700"
                >
                  → Start Online Transfer
                </Link>
                <Link
                  to="/login"
                  className="block text-sm text-blue-600 hover:text-blue-700"
                >
                  → Sign In to Dashboard
                </Link>
                <a
                  href="#support"
                  className="block text-sm text-blue-600 hover:text-blue-700"
                >
                  → Contact Support
                </a>
                <a
                  href="#faq"
                  className="block text-sm text-blue-600 hover:text-blue-700"
                >
                  → View FAQ
                </a>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Filter Bar */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search documents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button className="flex items-center px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  <Filter className="h-5 w-5 mr-2" />
                  Filter
                </button>
              </div>
            </div>

            {/* Documents Grid */}
            <div className="grid gap-6">
              {filteredDocuments.map(document => {
                const IconComponent = document.icon;
                const FileIcon = getFileIcon(document.type);
                
                return (
                  <div key={document.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="p-3 bg-blue-100 rounded-lg">
                          <IconComponent className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <h3 className="text-lg font-semibold text-gray-900 mr-2">
                              {document.name}
                            </h3>
                            {document.isRequired && (
                              <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                                Required
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 mb-3">{document.description}</p>
                          <div className="flex items-center text-sm text-gray-500 space-x-4">
                            <div className="flex items-center">
                              <FileIcon className="h-4 w-4 mr-1" />
                              {document.type}
                            </div>
                            <div>{document.size}</div>
                            <div className="flex items-center">
                              <Download className="h-4 w-4 mr-1" />
                              {document.downloads.toLocaleString()} downloads
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              Updated {new Date(document.lastUpdated).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDownload(document)}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ml-4"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredDocuments.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
                <p className="text-gray-600">
                  Try adjusting your search terms or category filter.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help?</h2>
            <p className="text-gray-600 mb-6">
              If you can't find what you're looking for or need assistance with any documents, we're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+94112694000"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Clock className="h-5 w-5 mr-2" />
                Call Support: +94 11 269 4000
              </a>
              <a
                href="mailto:support@transferease.gov.lk"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Email: support@transferease.gov.lk
              </a>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Support hours: Monday - Friday, 8:00 AM - 5:00 PM
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;
