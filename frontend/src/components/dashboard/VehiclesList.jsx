import React, { useState } from 'react';
import { 
    Car, 
    Calendar, 
    MapPin, 
    Fuel, 
    Settings, 
    Eye,
    Edit,
    Trash2,
    Plus,
    Search,
    Filter
} from 'lucide-react';
import { Card, Button } from '../shared';

const VehicleCard = ({ vehicle, onView, onEdit, onDelete, onInitiateTransfer }) => {
    const getVehicleImage = (make, model) => {
        // Return placeholder or actual image based on vehicle
        const imageMap = {
            'BMW': '/src/assets/BmwPic.png',
            'Toyota': '/src/assets/Toyota.png',
            'Mini Cooper': '/src/assets/mini-cooper.png',
            'SUV': '/src/assets/SuvPic.png'
        };
        
        return imageMap[make] || imageMap[model] || '/src/assets/default-car.png';
    };

    return (
        <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start space-x-4">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <img 
                        src={getVehicleImage(vehicle.make, vehicle.model)}
                        alt={`${vehicle.make} ${vehicle.model}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.src = '/src/assets/default-car.png';
                        }}
                    />
                </div>
                
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                        <div>
                            <h3 className="font-semibold text-gray-900 text-lg">
                                {vehicle.make} {vehicle.model}
                            </h3>
                            <p className="text-sm text-gray-500">{vehicle.year}</p>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onView?.(vehicle)}
                                className="p-2"
                            >
                                <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onEdit?.(vehicle)}
                                className="p-2"
                            >
                                <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onDelete?.(vehicle)}
                                className="p-2 text-red-600 hover:bg-red-50"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-2 mb-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Car className="h-4 w-4" />
                            <span>VIN: {vehicle.vin}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <span>Registered: {new Date(vehicle.registrationDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <MapPin className="h-4 w-4" />
                            <span>{vehicle.registrationState}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Fuel className="h-4 w-4" />
                            <span>{vehicle.fuelType} • {vehicle.transmission}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                vehicle.status === 'active' 
                                    ? 'bg-green-100 text-green-800'
                                    : vehicle.status === 'in_transfer'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-gray-100 text-gray-800'
                            }`}>
                                {vehicle.status === 'active' ? 'Active' : 
                                 vehicle.status === 'in_transfer' ? 'In Transfer' : 'Inactive'}
                            </span>
                        </div>
                        
                        {vehicle.status === 'active' && (
                            <Button
                                size="sm"
                                onClick={() => onInitiateTransfer?.(vehicle)}
                                className="flex items-center space-x-1"
                            >
                                <Settings className="h-3 w-3" />
                                <span>Transfer</span>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
};

const VehiclesList = ({ 
    vehicles, 
    title = "My Vehicles", 
    onView, 
    onEdit, 
    onDelete, 
    onInitiateTransfer,
    onAddNew 
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const filteredVehicles = vehicles.filter(vehicle => {
        const matchesSearch = 
            vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vehicle.vin.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === 'all' || vehicle.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });

    const statusCounts = vehicles.reduce((acc, vehicle) => {
        acc[vehicle.status] = (acc[vehicle.status] || 0) + 1;
        return acc;
    }, {});

    const filterOptions = [
        { value: 'all', label: 'All Vehicles', count: vehicles.length },
        { value: 'active', label: 'Active', count: statusCounts.active || 0 },
        { value: 'in_transfer', label: 'In Transfer', count: statusCounts.in_transfer || 0 },
        { value: 'inactive', label: 'Inactive', count: statusCounts.inactive || 0 }
    ];

    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                <Button onClick={onAddNew} className="flex items-center space-x-2">
                    <Plus className="h-4 w-4" />
                    <span>Add Vehicle</span>
                </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                        type="text"
                        placeholder="Search vehicles..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                
                <div className="flex items-center space-x-2">
                    <Filter className="h-4 w-4 text-gray-500" />
                    {filterOptions.map(option => (
                        <button
                            key={option.value}
                            onClick={() => setStatusFilter(option.value)}
                            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                                statusFilter === option.value
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            {option.label} ({option.count})
                        </button>
                    ))}
                </div>
            </div>

            {filteredVehicles.length === 0 ? (
                <div className="text-center py-8">
                    <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">
                        {searchTerm || statusFilter !== 'all' 
                            ? 'No vehicles found matching your criteria.'
                            : 'No vehicles registered yet.'
                        }
                    </p>
                    {!searchTerm && statusFilter === 'all' && (
                        <Button onClick={onAddNew} className="mt-4">
                            Add Your First Vehicle
                        </Button>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredVehicles.map((vehicle) => (
                        <VehicleCard
                            key={vehicle.id}
                            vehicle={vehicle}
                            onView={onView}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onInitiateTransfer={onInitiateTransfer}
                        />
                    ))}
                </div>
            )}
        </Card>
    );
};

export { VehicleCard, VehiclesList };
