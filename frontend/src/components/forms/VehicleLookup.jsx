import { useState } from 'react';
import { Search, CheckCircle, AlertTriangle, Car, User, Calendar, Palette } from 'lucide-react';

const VehicleLookup = ({ onVehicleSelect, selectedVehicle }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');

  // Mock vehicle database
  const mockVehicles = [
    {
      regNo: 'CAR-1234',
      make: 'Toyota',
      model: 'Aqua',
      year: 2018,
      color: 'White',
      chassisNo: 'JTDKB20U882123456',
      engineNo: '1NZ-FXE12345',
      owner: {
        name: 'John Silva',
        nic: '952341234V',
        address: '123 Main Street, Colombo 03'
      },
      status: 'Active',
      registeredDate: '2018-05-15',
      lastTransfer: null
    },
    {
      regNo: 'ABC-5678',
      make: 'Honda',
      model: 'Civic',
      year: 2020,
      color: 'Silver',
      chassisNo: 'JHMFC2F59AX123456',
      engineNo: 'R18A112345',
      owner: {
        name: 'Mary Fernando',
        nic: '198523456789',
        address: '456 Park Avenue, Kandy'
      },
      status: 'Active',
      registeredDate: '2020-03-10',
      lastTransfer: '2021-08-20'
    },
    {
      regNo: 'XYZ-9876',
      make: 'Nissan',
      model: 'March',
      year: 2019,
      color: 'Blue',
      chassisNo: 'JN1AZ4EH5KM123456',
      engineNo: 'HR12DE12345',
      owner: {
        name: 'David Perera',
        nic: '871234567V',
        address: '789 Hill Road, Galle'
      },
      status: 'Active',
      registeredDate: '2019-07-22',
      lastTransfer: null
    }
  ];

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setError('Please enter a vehicle registration number');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const results = mockVehicles.filter(vehicle => 
        vehicle.regNo.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      if (results.length === 0) {
        setError('Vehicle not found. Please check the registration number and try again.');
        setSearchResults([]);
      } else {
        setSearchResults(results);
      }
    } catch (error) {
      setError('Failed to search for vehicle. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Vehicle Lookup</h3>
        <p className="text-sm text-gray-600 mb-4">
          Enter the vehicle registration number to automatically populate vehicle details.
        </p>
      </div>

      {/* Search Input */}
      <div className="flex space-x-3">
        <div className="flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toUpperCase())}
            onKeyPress={handleKeyPress}
            placeholder="Enter registration number (e.g., CAR-1234)"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={isLoading || !searchTerm.trim()}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Searching...
            </>
          ) : (
            <>
              <Search className="h-5 w-5 mr-2" />
              Search
            </>
          )}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-md font-medium text-gray-900">Search Results</h4>
          {searchResults.map((vehicle) => (
            <div
              key={vehicle.regNo}
              className={`border rounded-lg p-6 cursor-pointer transition-all ${
                selectedVehicle?.regNo === vehicle.regNo
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => onVehicleSelect(vehicle)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <Car className="h-6 w-6 text-blue-600" />
                    <div>
                      <h5 className="text-lg font-semibold text-gray-900">
                        {vehicle.regNo}
                      </h5>
                      <p className="text-gray-600">
                        {vehicle.year} {vehicle.make} {vehicle.model}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Palette className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">Color:</span>
                      <span className="font-medium">{vehicle.color}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">Registered:</span>
                      <span className="font-medium">{formatDate(vehicle.registeredDate)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-600">Status:</span>
                      <span className="font-medium text-green-600">{vehicle.status}</span>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Current Owner</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p className="font-medium">{vehicle.owner.name}</p>
                      <p>NIC: {vehicle.owner.nic}</p>
                      <p>{vehicle.owner.address}</p>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-gray-500">
                    <div>
                      <span className="font-medium">Chassis No:</span> {vehicle.chassisNo}
                    </div>
                    <div>
                      <span className="font-medium">Engine No:</span> {vehicle.engineNo}
                    </div>
                  </div>

                  {vehicle.lastTransfer && (
                    <div className="mt-3 text-xs text-gray-500">
                      <span className="font-medium">Last Transfer:</span> {formatDate(vehicle.lastTransfer)}
                    </div>
                  )}
                </div>

                {selectedVehicle?.regNo === vehicle.regNo && (
                  <CheckCircle className="h-6 w-6 text-blue-600 ml-4" />
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Selected Vehicle Confirmation */}
      {selectedVehicle && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            <div>
              <p className="text-green-800 font-medium">Vehicle Selected</p>
              <p className="text-green-700 text-sm">
                {selectedVehicle.regNo} - {selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Manual Entry Option */}
      <div className="border-t pt-6">
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-2">
            Can't find your vehicle? You can enter details manually.
          </p>
          <button
            onClick={() => onVehicleSelect(null)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Enter Vehicle Details Manually
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleLookup;
