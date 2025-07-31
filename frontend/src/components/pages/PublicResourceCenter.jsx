import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Download, 
  Calendar, 
  Search,
  Filter,
  Eye,
  ExternalLink,
  CheckCircle,
  AlertTriangle,
  Info,
  User,
  Building
} from 'lucide-react';

const PublicResourceCenter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [languageFilter, setLanguageFilter] = useState('all');

  // Mock document categories and resources
  const documentCategories = [
    'Transfer Forms',
    'Requirements',
    'Guidelines',
    'Fee Schedules',
    'Legal Documents',
    'Help Guides'
  ];

  const availableDocuments = [
    {
      id: 1,
      title: 'Vehicle Transfer Application Form',
      description: 'Official form for initiating vehicle ownership transfer',
      category: 'Transfer Forms',
      type: 'PDF',
      size: '2.3 MB',
      language: 'English',
      lastUpdated: '2025-01-15',
      downloads: 1247,
      required: true,
      fillable: true
    },
    {
      id: 2,
      title: 'Vehicle Transfer Application Form (Sinhala)',
      description: 'Official form for initiating vehicle ownership transfer in Sinhala',
      category: 'Transfer Forms',
      type: 'PDF',
      size: '2.4 MB',
      language: 'Sinhala',
      lastUpdated: '2025-01-15',
      downloads: 892,
      required: true,
      fillable: true
    },
    {
      id: 3,
      title: 'Required Documents Checklist',
      description: 'Complete list of documents needed for vehicle transfer',
      category: 'Requirements',
      type: 'PDF',
      size: '1.1 MB',
      language: 'English',
      lastUpdated: '2025-01-10',
      downloads: 2156,
      required: false,
      fillable: false
    },
    {
      id: 4,
      title: 'Transfer Fee Schedule 2025',
      description: 'Official fee structure for all vehicle transfer types',
      category: 'Fee Schedules',
      type: 'PDF',
      size: '0.8 MB',
      language: 'English',
      lastUpdated: '2025-01-01',
      downloads: 3421,
      required: false,
      fillable: false
    },
    {
      id: 5,
      title: 'Step-by-Step Transfer Guide',
      description: 'Comprehensive guide for completing vehicle transfers',
      category: 'Help Guides',
      type: 'PDF',
      size: '4.2 MB',
      language: 'English',
      lastUpdated: '2025-01-20',
      downloads: 1789,
      required: false,
      fillable: false
    },
    {
      id: 6,
      title: 'Vehicle Inspection Report Form',
      description: 'Form for vehicle condition assessment',
      category: 'Transfer Forms',
      type: 'PDF',
      size: '1.8 MB',
      language: 'English',
      lastUpdated: '2025-01-12',
      downloads: 654,
      required: true,
      fillable: true
    },
    {
      id: 7,
      title: 'Legal Requirements Documentation',
      description: 'Legal framework and requirements for vehicle transfers',
      category: 'Legal Documents',
      type: 'PDF',
      size: '3.1 MB',
      language: 'English',
      lastUpdated: '2024-12-15',
      downloads: 432,
      required: false,
      fillable: false
    },
    {
      id: 8,
      title: 'Online Transfer Guidelines',
      description: 'Instructions for using the digital transfer platform',
      category: 'Guidelines',
      type: 'PDF',
      size: '2.7 MB',
      language: 'English',
      lastUpdated: '2025-01-25',
      downloads: 987,
      required: false,
      fillable: false
    }
  ];

  const quickLinks = [
    {
      title: 'Start Online Transfer',
      description: 'Begin your vehicle transfer application online',
      link: '/register',
      icon: FileText,
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      title: 'DMT Office Locations',
      description: 'Find your nearest DMT office for in-person services',
      link: '#',
      icon: Building,
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      title: 'Contact Support',
      description: 'Get help with your transfer application',
      link: '#',
      icon: User,
      color: 'bg-purple-600 hover:bg-purple-700'
    }
  ];

  const announcements = [
    {
      id: 1,
      type: 'info',
      title: 'New Online Transfer System',
      message: 'The new digital platform is now live! Complete transfers entirely online.',
      date: '2025-01-15',
      important: true
    },
    {
      id: 2,
      type: 'warning',
      title: 'Updated Fee Structure',
      message: 'Transfer fees have been updated for 2025. Please refer to the latest fee schedule.',
      date: '2025-01-01',
      important: true
    },
    {
      id: 3,
      type: 'success',
      title: 'Processing Time Improvement',
      message: 'Average transfer processing time has been reduced to 3-5 business days.',
      date: '2024-12-20',
      important: false
    }
  ];

  const filteredDocuments = availableDocuments.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || doc.category === categoryFilter;
    const matchesLanguage = languageFilter === 'all' || doc.language === languageFilter;
    
    return matchesSearch && matchesCategory && matchesLanguage;
  });

  const getAnnouncementIcon = (type) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'success': return <CheckCircle className="h-5 w-5 text-green-600" />;
      default: return <Info className="h-5 w-5 text-blue-600" />;
    }
  };

  const getAnnouncementColor = (type) => {
    switch (type) {
      case 'warning': return 'border-yellow-400 bg-yellow-50';
      case 'success': return 'border-green-400 bg-green-50';
      default: return 'border-blue-400 bg-blue-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">TransferEase Resources</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-900 text-sm font-medium"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Download Center</h1>
          <p className="text-xl text-blue-100 mb-8">
            Access all forms, documents, and resources for vehicle transfers
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search documents and forms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-gray-900 bg-white rounded-lg shadow-lg focus:ring-2 focus:ring-blue-300 text-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Announcements */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Important Announcements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className={`rounded-lg border-l-4 p-6 ${getAnnouncementColor(announcement.type)} ${
                  announcement.important ? 'ring-2 ring-opacity-50' : ''
                }`}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    {getAnnouncementIcon(announcement.type)}
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">{announcement.title}</h3>
                    <p className="text-gray-700 mt-2">{announcement.message}</p>
                    <p className="text-sm text-gray-500 mt-3">{announcement.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickLinks.map((link, index) => (
              <Link
                key={index}
                to={link.link}
                className={`${link.color} text-white p-6 rounded-lg transition-colors duration-200 block`}
              >
                <link.icon className="h-8 w-8 mb-4" />
                <h3 className="text-lg font-semibold mb-2">{link.title}</h3>
                <p className="text-sm opacity-90">{link.description}</p>
                <ExternalLink className="h-4 w-4 mt-4" />
              </Link>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                {documentCategories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <select
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Languages</option>
                <option value="English">English</option>
                <option value="Sinhala">Sinhala</option>
                <option value="Tamil">Tamil</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setCategoryFilter('all');
                  setLanguageFilter('all');
                }}
                className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((document) => (
            <div key={document.id} className="bg-white rounded-lg border hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {document.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {document.description}
                    </p>
                  </div>
                  {document.required && (
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">
                      Required
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-4 text-xs text-gray-500 mb-4">
                  <span className="flex items-center">
                    <FileText className="h-3 w-3 mr-1" />
                    {document.type}
                  </span>
                  <span>{document.size}</span>
                  <span>{document.language}</span>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    Updated: {document.lastUpdated}
                  </span>
                  <span>{document.downloads.toLocaleString()} downloads</span>
                </div>

                {document.fillable && (
                  <div className="text-xs text-green-600 mb-4 flex items-center">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Fillable PDF
                  </div>
                )}

                <div className="flex space-x-2">
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium flex items-center justify-center">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </button>
                  <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-16 bg-gray-100 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Additional Help?</h2>
          <p className="text-gray-600 mb-6">
            Can't find what you're looking for? Our support team is here to assist you.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
              Contact Support
            </button>
            <Link
              to="/"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-white font-medium"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicResourceCenter;
