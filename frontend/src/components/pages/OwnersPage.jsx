import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Car,
  ArrowUpDown,
  MoreVertical,
  CheckCircle,
  AlertTriangle,
  Clock,
  Users,
  FileText,
  Shield,
  Building
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const OwnersPage = () => {
  const { user } = useAuth();
  const [owners, setOwners] = useState([]);
  const [filteredOwners, setFilteredOwners] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState('registeredDate');
  const [sortDirection, setSortDirection] = useState('desc');
  const [isLoading, setIsLoading] = useState(true);

  // Mock owner data
  const mockOwners = [
    {
      id: 'OWN-001',
      nic: '952341234V',
      name: 'Nimal Silva',
      email: 'nimal.silva@email.com',
      phone: '+94 77 123 4567',
      address: '123, Galle Road, Colombo 03',
      district: 'Colombo',
      province: 'Western',
      registeredDate: '2024-06-15',
      status: 'verified',
      ownershipType: 'individual',
      vehicleCount: 2,
      totalTransfers: 3,
      lastActivity: '2025-01-15',
      creditScore: 750,
      vehicles: [
        { regNo: 'CAR-001', make: 'Toyota', model: 'Prius', year: 2019 },
        { regNo: 'CAR-002', make: 'Honda', model: 'Civic', year: 2020 }
      ],
      transferHistory: [
        { date: '2025-01-15', vehicleRegNo: 'ABC-1234', type: 'received', from: 'Kasun Perera' },
        { date: '2024-12-10', vehicleRegNo: 'XYZ-789', type: 'transferred', to: 'Saman Fernando' },
        { date: '2024-11-05', vehicleRegNo: 'DEF-456', type: 'received', from: 'Ruwan Perera' }
      ],
      documents: {
        nic: { status: 'verified', uploadDate: '2024-06-15' },
        license: { status: 'verified', uploadDate: '2024-06-15', expiry: '2028-06-15' },
        addressProof: { status: 'verified', uploadDate: '2024-06-15' }
      },
      riskLevel: 'low'
    },
    {
      id: 'OWN-002',
      nic: '881234567V',
      name: 'Saman Fernando',
      email: 'saman.fernando@email.com',
      phone: '+94 71 234 5678',
      address: '456, Kandy Road, Kandy',
      district: 'Kandy',
      province: 'Central',
      registeredDate: '2024-08-22',
      status: 'pending_verification',
      ownershipType: 'individual',
      vehicleCount: 1,
      totalTransfers: 1,
      lastActivity: '2025-01-12',
      creditScore: 680,
      vehicles: [
        { regNo: 'XYZ-5678', make: 'Honda', model: 'Vezel', year: 2019 }
      ],
      transferHistory: [
        { date: '2025-01-10', vehicleRegNo: 'XYZ-5678', type: 'received', from: 'Kasun Perera' }
      ],
      documents: {
        nic: { status: 'verified', uploadDate: '2024-08-22' },
        license: { status: 'pending', uploadDate: '2024-08-22' },
        addressProof: { status: 'rejected', uploadDate: '2024-08-22', reason: 'Document unclear' }
      },
      riskLevel: 'medium'
    },
    {
      id: 'OWN-003',
      nic: '923456789V',
      name: 'Ruwan Jayasinghe',
      email: 'ruwan.jayasinghe@email.com',
      phone: '+94 75 345 6789',
      address: '789, Matara Road, Galle',
      district: 'Galle',
      province: 'Southern',
      registeredDate: '2024-12-05',
      status: 'verified',
      ownershipType: 'individual',
      vehicleCount: 1,
      totalTransfers: 1,
      lastActivity: '2025-01-14',
      creditScore: 720,
      vehicles: [
        { regNo: 'DEF-9012', make: 'Nissan', model: 'March', year: 2020 }
      ],
      transferHistory: [
        { date: '2025-01-14', vehicleRegNo: 'DEF-9012', type: 'received', from: 'Kasun Perera' }
      ],
      documents: {
        nic: { status: 'verified', uploadDate: '2024-12-05' },
        license: { status: 'verified', uploadDate: '2024-12-05', expiry: '2027-12-05' },
        addressProof: { status: 'verified', uploadDate: '2024-12-05' }
      },
      riskLevel: 'low'
    },
    {
      id: 'OWN-004',
      nic: '199012345678',
      name: 'ABC Motors (Pvt) Ltd',
      email: 'info@abcmotors.lk',
      phone: '+94 11 234 5678',
      address: '12, Industrial Zone, Colombo 15',
      district: 'Colombo',
      province: 'Western',
      registeredDate: '2023-03-10',
      status: 'verified',
      ownershipType: 'company',
      vehicleCount: 15,
      totalTransfers: 45,
      lastActivity: '2025-01-16',
      creditScore: 850,
      vehicles: [
        { regNo: 'COM-001', make: 'Toyota', model: 'Hiace', year: 2021 },
        { regNo: 'COM-002', make: 'Isuzu', model: 'D-Max', year: 2022 },
        { regNo: 'COM-003', make: 'Mitsubishi', model: 'Montero', year: 2020 }
      ],
      transferHistory: [
        { date: '2025-01-16', vehicleRegNo: 'COM-001', type: 'transferred', to: 'John Doe' },
        { date: '2025-01-14', vehicleRegNo: 'COM-002', type: 'transferred', to: 'Jane Smith' }
      ],
      documents: {
        businessRegistration: { status: 'verified', uploadDate: '2023-03-10' },
        taxClearance: { status: 'verified', uploadDate: '2024-01-15', expiry: '2025-01-15' },
        addressProof: { status: 'verified', uploadDate: '2023-03-10' }
      },
      riskLevel: 'low'
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status', count: mockOwners.length },
    { value: 'verified', label: 'Verified', count: 3 },
    { value: 'pending_verification', label: 'Pending Verification', count: 1 },
    { value: 'suspended', label: 'Suspended', count: 0 }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setOwners(mockOwners);
      setFilteredOwners(mockOwners);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = owners.filter(owner => {
      const matchesSearch = 
        owner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        owner.nic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        owner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        owner.phone.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || owner.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

    // Sort filtered results
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      if (sortField === 'registeredDate' || sortField === 'lastActivity') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredOwners(filtered);
  }, [owners, searchTerm, statusFilter, sortField, sortDirection]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending_verification':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'suspended':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <User className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'pending_verification':
        return 'bg-yellow-100 text-yellow-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskLevelColor = (riskLevel) => {
    switch (riskLevel) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading vehicle owners...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Vehicle Owners</h1>
              <p className="mt-2 text-gray-600">
                Manage vehicle ownership records and owner verification
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Link
                to="/owners/add"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Owner
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-blue-100">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Owners</p>
                <p className="text-2xl font-bold text-gray-900">{owners.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Verified</p>
                <p className="text-2xl font-bold text-gray-900">
                  {owners.filter(o => o.status === 'verified').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-yellow-100">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {owners.filter(o => o.status === 'pending_verification').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-purple-100">
                <Car className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Vehicles</p>
                <p className="text-2xl font-bold text-gray-900">
                  {owners.reduce((sum, o) => sum + o.vehicleCount, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, NIC, email, or phone number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label} ({option.count})
                  </option>
                ))}
              </select>
              <button className="flex items-center px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                <Filter className="h-5 w-5 mr-2" />
                More Filters
              </button>
            </div>
          </div>
        </div>

        {/* Owners Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    onClick={() => handleSort('name')}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center">
                      Owner Details
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact & Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status & Verification
                  </th>
                  <th 
                    onClick={() => handleSort('vehicleCount')}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center">
                      Vehicles
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort('lastActivity')}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center">
                      Activity
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOwners.map((owner) => (
                  <tr key={owner.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {owner.ownershipType === 'company' ? (
                            <Building className="h-10 w-10 text-gray-400" />
                          ) : (
                            <User className="h-10 w-10 text-gray-400" />
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {owner.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {owner.nic}
                          </div>
                          <div className="text-xs text-gray-400">
                            {owner.ownershipType === 'company' ? 'Company' : 'Individual'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center mb-1">
                          <Mail className="h-4 w-4 text-gray-400 mr-2" />
                          {owner.email}
                        </div>
                        <div className="flex items-center mb-1">
                          <Phone className="h-4 w-4 text-gray-400 mr-2" />
                          {owner.phone}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-500">
                            {owner.district}, {owner.province}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center mb-2">
                        {getStatusIcon(owner.status)}
                        <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(owner.status)}`}>
                          {owner.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 text-gray-400 mr-2" />
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskLevelColor(owner.riskLevel)}`}>
                          {owner.riskLevel.toUpperCase()} RISK
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Credit Score: {owner.creditScore}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {owner.vehicleCount} vehicles
                      </div>
                      <div className="text-sm text-gray-500">
                        {owner.totalTransfers} transfers
                      </div>
                      {owner.vehicles.slice(0, 2).map((vehicle, index) => (
                        <div key={index} className="text-xs text-gray-400">
                          {vehicle.regNo} - {vehicle.make} {vehicle.model}
                        </div>
                      ))}
                      {owner.vehicleCount > 2 && (
                        <div className="text-xs text-blue-600">
                          +{owner.vehicleCount - 2} more
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        Last Activity
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(owner.lastActivity).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        Registered: {new Date(owner.registeredDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOwners.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No owners found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'No vehicle owners are registered in the system yet.'
                }
              </p>
              {!searchTerm && statusFilter === 'all' && (
                <Link
                  to="/owners/add"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Owner
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnersPage;
