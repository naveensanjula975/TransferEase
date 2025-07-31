import { useState, useEffect } from 'react';
import { 
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  Edit,
  Trash2,
  MapPin,
  User,
  Car,
  FileText,
  Phone,
  Mail,
  CreditCard,
  ArrowRight,
  MoreVertical,
  Download,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import { Link } from 'react-router-dom';
import Navbar from '../layout/Navbar';

const BookingsPage = () => {
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Booking statuses with their styling
  const bookingStatuses = {
    pending: { label: 'Pending', color: 'text-yellow-700 bg-yellow-100', icon: Clock },
    confirmed: { label: 'Confirmed', color: 'text-blue-700 bg-blue-100', icon: CheckCircle },
    in_progress: { label: 'In Progress', color: 'text-indigo-700 bg-indigo-100', icon: RefreshCw },
    completed: { label: 'Completed', color: 'text-green-700 bg-green-100', icon: CheckCircle },
    cancelled: { label: 'Cancelled', color: 'text-red-700 bg-red-100', icon: XCircle },
    rejected: { label: 'Rejected', color: 'text-gray-700 bg-gray-100', icon: XCircle }
  };

  // Service types
  const serviceTypes = [
    { id: 'transfer', label: 'Vehicle Transfer' },
    { id: 'registration', label: 'Vehicle Registration' },
    { id: 'inspection', label: 'Vehicle Inspection' },
    { id: 'license_renewal', label: 'License Renewal' },
    { id: 'document_verification', label: 'Document Verification' }
  ];

  // Mock bookings data
  const mockBookings = [
    {
      id: 'BK-001',
      serviceType: 'transfer',
      title: 'Vehicle Transfer - Toyota Aqua',
      description: 'Transfer of ownership for Toyota Aqua (ABC-1234)',
      vehicleDetails: {
        registrationNo: 'ABC-1234',
        make: 'Toyota',
        model: 'Aqua',
        year: 2018,
        chassisNo: 'JN1CV6EK7EM123456'
      },
      currentOwner: {
        name: 'John Doe',
        nic: '952341234V',
        contact: '+94 77 123 4567'
      },
      newOwner: {
        name: 'Jane Smith',
        nic: '851234567V',
        contact: '+94 76 987 6543'
      },
      appointmentDate: '2024-08-15T10:00:00Z',
      location: 'DMT Office - Colombo 07',
      status: 'confirmed',
      priority: 'normal',
      estimatedCost: 15000,
      paidAmount: 5000,
      remainingAmount: 10000,
      createdDate: '2024-07-25T09:15:00Z',
      lastUpdated: '2024-07-26T14:30:00Z',
      documents: [
        { name: 'Vehicle Registration', status: 'verified' },
        { name: 'Insurance Policy', status: 'verified' },
        { name: 'NIC Copies', status: 'pending' }
      ],
      notes: 'All documents ready. Awaiting appointment confirmation.',
      officerAssigned: 'Officer K. Perera',
      referenceNumber: 'TRF-2024-001'
    },
    {
      id: 'BK-002',
      serviceType: 'registration',
      title: 'New Vehicle Registration - Honda Vezel',
      description: 'First-time registration for imported Honda Vezel',
      vehicleDetails: {
        registrationNo: 'Pending',
        make: 'Honda',
        model: 'Vezel',
        year: 2020,
        chassisNo: 'JHMRU6H39FS123456'
      },
      currentOwner: {
        name: 'John Doe',
        nic: '952341234V',
        contact: '+94 77 123 4567'
      },
      appointmentDate: '2024-08-20T14:00:00Z',
      location: 'DMT Office - Kandy',
      status: 'pending',
      priority: 'high',
      estimatedCost: 75000,
      paidAmount: 0,
      remainingAmount: 75000,
      createdDate: '2024-07-28T11:20:00Z',
      lastUpdated: '2024-07-30T16:45:00Z',
      documents: [
        { name: 'Import Permit', status: 'verified' },
        { name: 'Invoice', status: 'verified' },
        { name: 'Insurance Policy', status: 'pending' }
      ],
      notes: 'Waiting for insurance policy verification.',
      officerAssigned: null,
      referenceNumber: 'REG-2024-002'
    },
    {
      id: 'BK-003',
      serviceType: 'inspection',
      title: 'Annual Vehicle Inspection - BMW X3',
      description: 'Annual safety and emission inspection',
      vehicleDetails: {
        registrationNo: 'BMW-2019',
        make: 'BMW',
        model: 'X3',
        year: 2019,
        chassisNo: 'WBAXG9C50KD123456'
      },
      currentOwner: {
        name: 'John Doe',
        nic: '952341234V',
        contact: '+94 77 123 4567'
      },
      appointmentDate: '2024-08-10T09:30:00Z',
      location: 'Vehicle Testing Station - Gampaha',
      status: 'completed',
      priority: 'normal',
      estimatedCost: 3500,
      paidAmount: 3500,
      remainingAmount: 0,
      createdDate: '2024-07-20T13:45:00Z',
      lastUpdated: '2024-08-10T12:00:00Z',
      documents: [
        { name: 'Vehicle Registration', status: 'verified' },
        { name: 'Previous Inspection Report', status: 'verified' }
      ],
      notes: 'Inspection passed successfully. Certificate issued.',
      officerAssigned: 'Inspector M. Silva',
      referenceNumber: 'INS-2024-003',
      completedDate: '2024-08-10T11:45:00Z'
    },
    {
      id: 'BK-004',
      serviceType: 'license_renewal',
      title: 'Driving License Renewal',
      description: 'Renewal of driving license Class B1',
      appointmentDate: '2024-08-25T11:00:00Z',
      location: 'DMT Office - Galle',
      status: 'in_progress',
      priority: 'normal',
      estimatedCost: 2500,
      paidAmount: 2500,
      remainingAmount: 0,
      createdDate: '2024-07-22T10:30:00Z',
      lastUpdated: '2024-08-01T09:15:00Z',
      documents: [
        { name: 'Current License', status: 'verified' },
        { name: 'Medical Certificate', status: 'verified' },
        { name: 'NIC Copy', status: 'verified' }
      ],
      notes: 'Medical examination completed. Processing new license.',
      officerAssigned: 'Officer R. Fernando',
      referenceNumber: 'LIC-2024-004'
    },
    {
      id: 'BK-005',
      serviceType: 'transfer',
      title: 'Vehicle Transfer - Suzuki Alto',
      description: 'Transfer of ownership for Suzuki Alto (KL-5678)',
      vehicleDetails: {
        registrationNo: 'KL-5678',
        make: 'Suzuki',
        model: 'Alto',
        year: 2016,
        chassisNo: 'MA3EW16SX60123456'
      },
      currentOwner: {
        name: 'John Doe',
        nic: '952341234V',
        contact: '+94 77 123 4567'
      },
      newOwner: {
        name: 'Mike Johnson',
        nic: '751234567V',
        contact: '+94 75 555 1234'
      },
      appointmentDate: '2024-07-30T15:00:00Z',
      location: 'DMT Office - Matara',
      status: 'cancelled',
      priority: 'normal',
      estimatedCost: 12000,
      paidAmount: 0,
      remainingAmount: 12000,
      createdDate: '2024-07-18T14:20:00Z',
      lastUpdated: '2024-07-29T10:00:00Z',
      documents: [
        { name: 'Vehicle Registration', status: 'pending' }
      ],
      notes: 'Cancelled due to buyer withdrawal.',
      officerAssigned: null,
      referenceNumber: 'TRF-2024-005',
      cancelledDate: '2024-07-29T10:00:00Z',
      cancelReason: 'Buyer withdrew from purchase'
    }
  ];

  useEffect(() => {
    // Simulate API call
    const loadBookings = async () => {
      try {
        setIsLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setBookings(mockBookings);
        setFilteredBookings(mockBookings);
      } catch (error) {
        showNotification('Failed to load bookings', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    loadBookings();
  }, [showNotification]);

  // Filter and search bookings
  useEffect(() => {
    let filtered = bookings;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(booking =>
        booking.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.referenceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.vehicleDetails?.registrationNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(booking => booking.status === statusFilter);
    }

    // Service filter
    if (serviceFilter !== 'all') {
      filtered = filtered.filter(booking => booking.serviceType === serviceFilter);
    }

    setFilteredBookings(filtered);
  }, [bookings, searchTerm, statusFilter, serviceFilter]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setIsDetailModalOpen(true);
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setBookings(bookings.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'cancelled', lastUpdated: new Date().toISOString() }
          : booking
      ));
      
      showNotification('Booking cancelled successfully', 'success');
    } catch (error) {
      showNotification('Failed to cancel booking', 'error');
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = bookingStatuses[status] || bookingStatuses.pending;
    const Icon = statusConfig.icon;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {statusConfig.label}
      </span>
    );
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
              <p className="mt-2 text-gray-600">
                Track and manage your service appointments
              </p>
            </div>
            <Link
              to="/transfer"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>New Booking</span>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {bookings.filter(b => b.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {bookings.filter(b => b.status === 'completed').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="bg-indigo-100 p-3 rounded-lg">
                <RefreshCw className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">
                  {bookings.filter(b => ['confirmed', 'in_progress'].includes(b.status)).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search bookings by reference, vehicle, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="min-w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                {Object.entries(bookingStatuses).map(([key, status]) => (
                  <option key={key} value={key}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Service Filter */}
            <div className="min-w-48">
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Services</option>
                {serviceTypes.map(service => (
                  <option key={service.id} value={service.id}>
                    {service.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <Calendar className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No bookings found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || statusFilter !== 'all' || serviceFilter !== 'all' 
                  ? 'Try adjusting your search or filters.'
                  : 'Get started by creating your first booking.'
                }
              </p>
              {!searchTerm && statusFilter === 'all' && serviceFilter === 'all' && (
                <div className="mt-6">
                  <Link
                    to="/transfer"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 inline-flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Create Booking</span>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            filteredBookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {booking.title}
                        </h3>
                        {getStatusBadge(booking.status)}
                        {booking.priority === 'high' && (
                          <span className="text-red-600 text-xs font-medium">HIGH PRIORITY</span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewDetails(booking)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        {booking.status === 'pending' && (
                          <button
                            onClick={() => handleCancelBooking(booking.id)}
                            className="text-red-600 hover:text-red-800 p-1"
                            title="Cancel Booking"
                          >
                            <XCircle className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">{booking.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center text-gray-600">
                        <FileText className="h-4 w-4 mr-2" />
                        <span>{booking.referenceNumber}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{formatDate(booking.appointmentDate)}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{booking.location}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <CreditCard className="h-4 w-4 mr-2" />
                        <span>{formatCurrency(booking.estimatedCost)}</span>
                      </div>
                    </div>

                    {booking.vehicleDetails && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center text-sm text-gray-600">
                          <Car className="h-4 w-4 mr-2" />
                          <span>
                            {booking.vehicleDetails.registrationNo} - {booking.vehicleDetails.make} {booking.vehicleDetails.model} ({booking.vehicleDetails.year})
                          </span>
                        </div>
                      </div>
                    )}

                    {booking.officerAssigned && (
                      <div className="mt-2 flex items-center text-sm text-gray-600">
                        <User className="h-4 w-4 mr-2" />
                        <span>Assigned to: {booking.officerAssigned}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {isDetailModalOpen && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Booking Details</h3>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Basic Info */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Basic Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Reference:</span>
                    <p className="font-medium">{selectedBooking.referenceNumber}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Status:</span>
                    <div className="mt-1">{getStatusBadge(selectedBooking.status)}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Appointment:</span>
                    <p className="font-medium">{formatDate(selectedBooking.appointmentDate)}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Location:</span>
                    <p className="font-medium">{selectedBooking.location}</p>
                  </div>
                </div>
              </div>

              {/* Vehicle Details */}
              {selectedBooking.vehicleDetails && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Vehicle Information</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Registration No:</span>
                      <p className="font-medium">{selectedBooking.vehicleDetails.registrationNo}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Make & Model:</span>
                      <p className="font-medium">{selectedBooking.vehicleDetails.make} {selectedBooking.vehicleDetails.model}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Year:</span>
                      <p className="font-medium">{selectedBooking.vehicleDetails.year}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Chassis No:</span>
                      <p className="font-medium">{selectedBooking.vehicleDetails.chassisNo}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Cost Information */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Cost Information</h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Estimated Cost:</span>
                    <p className="font-medium">{formatCurrency(selectedBooking.estimatedCost)}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Paid Amount:</span>
                    <p className="font-medium text-green-600">{formatCurrency(selectedBooking.paidAmount)}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Remaining:</span>
                    <p className="font-medium text-red-600">{formatCurrency(selectedBooking.remainingAmount)}</p>
                  </div>
                </div>
              </div>

              {/* Documents */}
              {selectedBooking.documents && selectedBooking.documents.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Documents</h4>
                  <div className="space-y-2">
                    {selectedBooking.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">{doc.name}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          doc.status === 'verified' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {doc.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              {selectedBooking.notes && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Notes</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{selectedBooking.notes}</p>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
              {selectedBooking.status === 'pending' && (
                <button
                  onClick={() => {
                    handleCancelBooking(selectedBooking.id);
                    setIsDetailModalOpen(false);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Cancel Booking
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsPage;
