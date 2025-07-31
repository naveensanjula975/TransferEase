import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Car,
  Calendar,
  Users,
  FileText,
  ArrowUpDown,
  MoreVertical,
  CheckCircle,
  AlertTriangle,
  Clock,
  Fuel,
  Gauge,
  MapPin
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const VehiclesPage = () => {
  const { user } = useAuth();
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState('registrationDate');
  const [sortDirection, setSortDirection] = useState('desc');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  // Mock vehicle data
  const mockVehicles = [
    {
      id: 'VEH-001',
      registrationNo: 'ABC-1234',
      make: 'Toyota',
      model: 'Aqua',
      year: 2018,
      category: 'car',
      fuelType: 'hybrid',
      engineCapacity: '1500cc',
      color: 'Silver',
      chassisNo: 'JN1CV6EK7EM123456',
      engineNo: 'QG15DE789012',
      registrationDate: '2018-03-15',
      expiryDate: '2025-03-15',
      status: 'active',
      ownershipStatus: 'owned',
      currentValue: 3500000,
      transferHistory: [
        { date: '2018-03-15', from: 'Dealership', to: 'Kasun Perera', reason: 'Initial Purchase' }
      ],
      documents: {
        registration: { status: 'valid', expiry: '2025-03-15' },
        insurance: { status: 'valid', expiry: '2025-05-20' },
        license: { status: 'valid', expiry: '2024-12-31' },
        inspection: { status: 'valid', expiry: '2024-08-15' }
      },
      mileage: 45000,
      location: 'Colombo',
      features: ['Air Conditioning', 'Power Steering', 'ABS', 'Airbags']
    },
    {
      id: 'VEH-002',
      registrationNo: 'XYZ-5678',
      make: 'Honda',
      model: 'Vezel',
      year: 2019,
      category: 'suv',
      fuelType: 'petrol',
      engineCapacity: '1500cc',
      color: 'White',
      chassisNo: 'JHMRU6H39FS123456',
      engineNo: 'L15B789012',
      registrationDate: '2019-07-22',
      expiryDate: '2025-07-22',
      status: 'active',
      ownershipStatus: 'owned',
      currentValue: 5200000,
      transferHistory: [
        { date: '2019-07-22', from: 'Dealership', to: 'Kasun Perera', reason: 'Initial Purchase' }
      ],
      documents: {
        registration: { status: 'valid', expiry: '2025-07-22' },
        insurance: { status: 'expiring_soon', expiry: '2024-02-10' },
        license: { status: 'valid', expiry: '2024-12-31' },
        inspection: { status: 'expired', expiry: '2024-01-05' }
      },
      mileage: 32000,
      location: 'Kandy',
      features: ['Cruise Control', 'Reverse Camera', 'Bluetooth', 'Alloy Wheels']
    },
    {
      id: 'VEH-003',
      registrationNo: 'DEF-9012',
      make: 'Nissan',
      model: 'March',
      year: 2020,
      category: 'car',
      fuelType: 'petrol',
      engineCapacity: '1200cc',
      color: 'Red',
      chassisNo: 'JN1BK32D1KU123456',
      engineNo: 'HR12DE789012',
      registrationDate: '2020-01-10',
      expiryDate: '2026-01-10',
      status: 'transferred',
      ownershipStatus: 'transferred',
      currentValue: 2800000,
      transferHistory: [
        { date: '2020-01-10', from: 'Dealership', to: 'Kasun Perera', reason: 'Initial Purchase' },
        { date: '2025-01-14', from: 'Kasun Perera', to: 'Ruwan Jayasinghe', reason: 'Sale' }
      ],
      documents: {
        registration: { status: 'transferred', expiry: '2026-01-10' },
        insurance: { status: 'transferred', expiry: '2025-06-15' },
        license: { status: 'transferred', expiry: '2024-12-31' },
        inspection: { status: 'transferred', expiry: '2024-09-10' }
      },
      mileage: 28000,
      location: 'Galle',
      features: ['Power Windows', 'Central Locking', 'Radio/CD']
    },
    {
      id: 'VEH-004',
      registrationNo: 'GHI-3456',
      make: 'Suzuki',
      model: 'Alto',
      year: 2017,
      category: 'car',
      fuelType: 'petrol',
      engineCapacity: '800cc',
      color: 'Blue',
      chassisNo: 'MALDF42A6J2123456',
      engineNo: 'F8B789012',
      registrationDate: '2017-11-05',
      expiryDate: '2024-11-05',
      status: 'expired',
      ownershipStatus: 'owned',
      currentValue: 1500000,
      transferHistory: [
        { date: '2017-11-05', from: 'Dealership', to: 'Kasun Perera', reason: 'Initial Purchase' }
      ],
      documents: {
        registration: { status: 'expired', expiry: '2024-11-05' },
        insurance: { status: 'expired', expiry: '2024-01-20' },
        license: { status: 'valid', expiry: '2024-12-31' },
        inspection: { status: 'expired', expiry: '2023-11-05' }
      },
      mileage: 65000,
      location: 'Matara',
      features: ['Air Conditioning', 'Power Steering']
    }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories', count: mockVehicles.length },
    { value: 'car', label: 'Cars', count: 3 },
    { value: 'suv', label: 'SUVs', count: 1 },
    { value: 'motorcycle', label: 'Motorcycles', count: 0 },
    { value: 'van', label: 'Vans', count: 0 }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status', count: mockVehicles.length },
    { value: 'active', label: 'Active', count: 2 },
    { value: 'transferred', label: 'Transferred', count: 1 },
    { value: 'expired', label: 'Expired', count: 1 }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setVehicles(mockVehicles);
      setFilteredVehicles(mockVehicles);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = vehicles.filter(vehicle => {
      const matchesSearch = 
        vehicle.registrationNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.chassisNo.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = categoryFilter === 'all' || vehicle.category === categoryFilter;
      const matchesStatus = statusFilter === 'all' || vehicle.status === statusFilter;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });

    // Sort filtered results
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      if (sortField === 'registrationDate') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredVehicles(filtered);
  }, [vehicles, searchTerm, categoryFilter, statusFilter, sortField, sortDirection]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'transferred':
        return <Users className="h-5 w-5 text-blue-500" />;
      case 'expired':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'transferred':
        return 'bg-blue-100 text-blue-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDocumentStatus = (documents) => {
    const statuses = Object.values(documents).map(doc => doc.status);
    if (statuses.includes('expired')) return 'expired';
    if (statuses.includes('expiring_soon')) return 'expiring_soon';
    return 'valid';
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your vehicles...</p>
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
              <h1 className="text-3xl font-bold text-gray-900">My Vehicles</h1>
              <p className="mt-2 text-gray-600">
                Manage your vehicle portfolio and ownership records
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Link
                to="/vehicles/add"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Vehicle
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-blue-100">
                <Car className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Vehicles</p>
                <p className="text-2xl font-bold text-gray-900">{vehicles.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-gray-900">
                  {vehicles.filter(v => v.status === 'active').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-yellow-100">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Need Attention</p>
                <p className="text-2xl font-bold text-gray-900">
                  {vehicles.filter(v => getDocumentStatus(v.documents) !== 'valid').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-purple-100">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Portfolio Value</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(vehicles.reduce((sum, v) => sum + v.currentValue, 0))}
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
                  placeholder="Search by registration number, make, model, or chassis number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {categoryOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label} ({option.count})
                  </option>
                ))}
              </select>
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

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <Car className="h-8 w-8 text-gray-400 mr-3" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {vehicle.registrationNo}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {vehicle.make} {vehicle.model} ({vehicle.year})
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(vehicle.status)}
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(vehicle.status)}`}>
                    {vehicle.status.toUpperCase()}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {formatCurrency(vehicle.currentValue)}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Fuel className="h-4 w-4 mr-2" />
                    {vehicle.fuelType.charAt(0).toUpperCase() + vehicle.fuelType.slice(1)} • {vehicle.engineCapacity}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Gauge className="h-4 w-4 mr-2" />
                    {vehicle.mileage.toLocaleString()} km
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {vehicle.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    Registered: {new Date(vehicle.registrationDate).toLocaleDateString()}
                  </div>
                </div>

                {/* Document Status */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Document Status</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      getDocumentStatus(vehicle.documents) === 'valid' ? 'bg-green-100 text-green-800' :
                      getDocumentStatus(vehicle.documents) === 'expiring_soon' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {getDocumentStatus(vehicle.documents) === 'valid' ? 'All Valid' :
                       getDocumentStatus(vehicle.documents) === 'expiring_soon' ? 'Some Expiring' :
                       'Some Expired'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(vehicle.documents).map(([type, doc]) => (
                      <div key={type} className="flex items-center text-xs text-gray-600">
                        <div className={`w-2 h-2 rounded-full mr-2 ${
                          doc.status === 'valid' ? 'bg-green-400' :
                          doc.status === 'expiring_soon' ? 'bg-yellow-400' :
                          'bg-red-400'
                        }`}></div>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2 pt-4 border-t border-gray-200">
                  <button className="flex-1 flex items-center justify-center px-3 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </button>
                  {vehicle.status === 'active' && (
                    <button className="flex-1 flex items-center justify-center px-3 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                      <Users className="h-4 w-4 mr-2" />
                      Transfer
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredVehicles.length === 0 && (
          <div className="text-center py-12">
            <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No vehicles found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || categoryFilter !== 'all' || statusFilter !== 'all'
                ? 'Try adjusting your search or filter criteria.'
                : 'You haven\'t registered any vehicles yet.'
              }
            </p>
            {!searchTerm && categoryFilter === 'all' && statusFilter === 'all' && (
              <Link
                to="/vehicles/add"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Vehicle
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VehiclesPage;
