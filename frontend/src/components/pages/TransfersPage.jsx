import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowUpDown,
  Calendar,
  Car,
  User,
  CreditCard
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const TransfersPage = () => {
  const { user } = useAuth();
  const [transfers, setTransfers] = useState([]);
  const [filteredTransfers, setFilteredTransfers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState('submittedDate');
  const [sortDirection, setSortDirection] = useState('desc');
  const [isLoading, setIsLoading] = useState(true);

  // Mock transfer data
  const mockTransfers = [
    {
      id: 'TRA-2025-001',
      vehicleRegNo: 'ABC-1234',
      vehicleMake: 'Toyota',
      vehicleModel: 'Aqua',
      currentOwner: 'Kasun Perera',
      newOwner: 'Nimal Silva',
      newOwnerNIC: '952341234V',
      status: 'under_review',
      submittedDate: '2025-01-15',
      lastUpdated: '2025-01-16',
      transferType: 'sale',
      transferFee: 8500,
      estimatedCompletion: '2025-01-25',
      progress: 60,
      documents: ['registration_cert', 'nic_copy', 'insurance'],
      paymentStatus: 'completed'
    },
    {
      id: 'TRA-2025-002',
      vehicleRegNo: 'XYZ-5678',
      vehicleMake: 'Honda',
      vehicleModel: 'Vezel',
      currentOwner: 'Kasun Perera',
      newOwner: 'Saman Fernando',
      newOwnerNIC: '881234567V',
      status: 'payment_pending',
      submittedDate: '2025-01-10',
      lastUpdated: '2025-01-12',
      transferType: 'gift',
      transferFee: 8500,
      estimatedCompletion: '2025-01-22',
      progress: 40,
      documents: ['registration_cert', 'nic_copy'],
      paymentStatus: 'pending'
    },
    {
      id: 'TRA-2025-003',
      vehicleRegNo: 'DEF-9012',
      vehicleMake: 'Nissan',
      vehicleModel: 'March',
      currentOwner: 'Kasun Perera',
      newOwner: 'Ruwan Jayasinghe',
      newOwnerNIC: '923456789V',
      status: 'completed',
      submittedDate: '2025-01-05',
      lastUpdated: '2025-01-14',
      transferType: 'sale',
      transferFee: 8500,
      estimatedCompletion: '2025-01-15',
      progress: 100,
      documents: ['registration_cert', 'nic_copy', 'insurance', 'inspection'],
      paymentStatus: 'completed'
    },
    {
      id: 'TRA-2025-004',
      vehicleRegNo: 'GHI-3456',
      vehicleMake: 'Suzuki',
      vehicleModel: 'Alto',
      currentOwner: 'Kasun Perera',
      newOwner: 'Mahinda Rajapaksa',
      newOwnerNIC: '871234567V',
      status: 'rejected',
      submittedDate: '2025-01-08',
      lastUpdated: '2025-01-11',
      transferType: 'sale',
      transferFee: 8500,
      estimatedCompletion: null,
      progress: 25,
      documents: ['registration_cert'],
      paymentStatus: 'not_required',
      rejectionReason: 'Incomplete documentation - missing insurance certificate'
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status', count: mockTransfers.length },
    { value: 'under_review', label: 'Under Review', count: 1 },
    { value: 'payment_pending', label: 'Payment Pending', count: 1 },
    { value: 'completed', label: 'Completed', count: 1 },
    { value: 'rejected', label: 'Rejected', count: 1 }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setTransfers(mockTransfers);
      setFilteredTransfers(mockTransfers);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = transfers.filter(transfer => {
      const matchesSearch = 
        transfer.vehicleRegNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transfer.newOwner.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transfer.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || transfer.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

    // Sort filtered results
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      if (sortField === 'submittedDate' || sortField === 'lastUpdated') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredTransfers(filtered);
  }, [transfers, searchTerm, statusFilter, sortField, sortDirection]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'under_review':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'payment_pending':
        return <CreditCard className="h-5 w-5 text-blue-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'under_review':
        return 'bg-yellow-100 text-yellow-800';
      case 'payment_pending':
        return 'bg-blue-100 text-blue-800';
      case 'rejected':
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
          <p className="text-gray-600">Loading your transfers...</p>
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
              <h1 className="text-3xl font-bold text-gray-900">Vehicle Transfers</h1>
              <p className="mt-2 text-gray-600">
                Manage and track your vehicle ownership transfer applications
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Link
                to="/transfer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-5 w-5 mr-2" />
                New Transfer
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {statusOptions.slice(1).map((status) => (
            <div key={status.value} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-gray-100">
                  {getStatusIcon(status.value)}
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{status.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{status.count}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by vehicle number, transfer ID, or new owner..."
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

        {/* Transfers Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    onClick={() => handleSort('id')}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center">
                      Transfer ID
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vehicle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    New Owner
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th 
                    onClick={() => handleSort('submittedDate')}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center">
                      Submitted
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransfers.map((transfer) => (
                  <tr key={transfer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{transfer.id}</div>
                      <div className="text-sm text-gray-500">
                        {transfer.transferType.charAt(0).toUpperCase() + transfer.transferType.slice(1)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Car className="h-8 w-8 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {transfer.vehicleRegNo}
                          </div>
                          <div className="text-sm text-gray-500">
                            {transfer.vehicleMake} {transfer.vehicleModel}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User className="h-8 w-8 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {transfer.newOwner}
                          </div>
                          <div className="text-sm text-gray-500">
                            {transfer.newOwnerNIC}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(transfer.status)}
                        <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(transfer.status)}`}>
                          {transfer.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      {transfer.status === 'rejected' && (
                        <div className="text-xs text-red-600 mt-1">
                          {transfer.rejectionReason}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(transfer.submittedDate).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        Updated: {new Date(transfer.lastUpdated).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            transfer.status === 'completed' ? 'bg-green-500' :
                            transfer.status === 'rejected' ? 'bg-red-500' : 'bg-blue-500'
                          }`}
                          style={{ width: `${transfer.progress}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {transfer.progress}% Complete
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTransfers.length === 0 && (
            <div className="text-center py-12">
              <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No transfers found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'You haven\'t initiated any vehicle transfers yet.'
                }
              </p>
              {!searchTerm && statusFilter === 'all' && (
                <Link
                  to="/transfer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Start Your First Transfer
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Pagination would go here if needed */}
      </div>
    </div>
  );
};

export default TransfersPage;
