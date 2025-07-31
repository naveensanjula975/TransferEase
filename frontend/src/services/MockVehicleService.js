// Mock service for vehicle operations
class MockVehicleService {
    constructor() {
        this.vehicles = this.getInitialVehicles();
    }

    getInitialVehicles() {
        return [
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
                purchasePrice: 4200000,
                transferHistory: [
                    {
                        id: 'TH-001',
                        date: '2018-03-15',
                        from: 'Dealership',
                        to: 'John Doe',
                        reason: 'Initial Purchase',
                        transferFee: 15000,
                        status: 'completed'
                    }
                ],
                documents: {
                    registration: {
                        status: 'valid',
                        expiry: '2025-03-15',
                        documentId: 'REG-001',
                        issueDate: '2018-03-15'
                    },
                    insurance: {
                        status: 'valid',
                        expiry: '2025-05-20',
                        provider: 'AIA Insurance',
                        policyNo: 'POL-123456',
                        documentId: 'INS-001'
                    },
                    license: {
                        status: 'valid',
                        expiry: '2024-12-31',
                        documentId: 'LIC-001'
                    },
                    inspection: {
                        status: 'valid',
                        expiry: '2024-08-15',
                        station: 'Vehicle Testing Station - Gampaha',
                        documentId: 'INSP-001'
                    }
                },
                mileage: 45000,
                location: 'Colombo',
                features: ['Air Conditioning', 'Power Steering', 'ABS', 'Airbags'],
                serviceHistory: [
                    {
                        date: '2024-01-15',
                        type: 'Regular Service',
                        mileage: 43000,
                        cost: 15000,
                        garage: 'Toyota Service Center',
                        description: 'Oil change, filter replacement, general inspection'
                    },
                    {
                        date: '2023-07-20',
                        type: 'Major Service',
                        mileage: 38000,
                        cost: 35000,
                        garage: 'Toyota Service Center',
                        description: 'Brake pad replacement, timing belt change'
                    }
                ],
                fuelEfficiency: '22 km/l',
                transmission: 'CVT',
                driveType: 'Front Wheel Drive',
                seatingCapacity: 5,
                owner: {
                    name: 'John Doe',
                    nic: '952341234V',
                    contact: '+94 77 123 4567',
                    email: 'john.doe@email.com'
                }
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
                purchasePrice: 5800000,
                transferHistory: [
                    {
                        id: 'TH-002',
                        date: '2019-07-22',
                        from: 'Dealership',
                        to: 'John Doe',
                        reason: 'Initial Purchase',
                        transferFee: 18000,
                        status: 'completed'
                    }
                ],
                documents: {
                    registration: {
                        status: 'valid',
                        expiry: '2025-07-22',
                        documentId: 'REG-002',
                        issueDate: '2019-07-22'
                    },
                    insurance: {
                        status: 'expiring_soon',
                        expiry: '2024-02-10',
                        provider: 'CEYLINCO Insurance',
                        policyNo: 'POL-789012',
                        documentId: 'INS-002'
                    },
                    license: {
                        status: 'valid',
                        expiry: '2024-12-31',
                        documentId: 'LIC-002'
                    },
                    inspection: {
                        status: 'expired',
                        expiry: '2024-01-05',
                        station: 'Vehicle Testing Station - Kandy',
                        documentId: 'INSP-002'
                    }
                },
                mileage: 32000,
                location: 'Kandy',
                features: ['Cruise Control', 'Reverse Camera', 'Bluetooth', 'Alloy Wheels'],
                serviceHistory: [
                    {
                        date: '2023-12-10',
                        type: 'Regular Service',
                        mileage: 30000,
                        cost: 18000,
                        garage: 'Honda Service Center',
                        description: 'Oil change, brake inspection, AC service'
                    }
                ],
                fuelEfficiency: '15 km/l',
                transmission: 'CVT',
                driveType: 'All Wheel Drive',
                seatingCapacity: 5,
                owner: {
                    name: 'John Doe',
                    nic: '952341234V',
                    contact: '+94 77 123 4567',
                    email: 'john.doe@email.com'
                }
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
                purchasePrice: 3200000,
                transferHistory: [
                    {
                        id: 'TH-003',
                        date: '2020-01-10',
                        from: 'Dealership',
                        to: 'John Doe',
                        reason: 'Initial Purchase',
                        transferFee: 12000,
                        status: 'completed'
                    },
                    {
                        id: 'TH-004',
                        date: '2025-01-14',
                        from: 'John Doe',
                        to: 'Ruwan Jayasinghe',
                        reason: 'Sale',
                        transferFee: 12000,
                        status: 'completed'
                    }
                ],
                documents: {
                    registration: {
                        status: 'transferred',
                        expiry: '2026-01-10',
                        documentId: 'REG-003',
                        issueDate: '2020-01-10'
                    },
                    insurance: {
                        status: 'transferred',
                        expiry: '2025-06-15',
                        provider: 'AIA Insurance',
                        policyNo: 'POL-345678',
                        documentId: 'INS-003'
                    },
                    license: {
                        status: 'transferred',
                        expiry: '2024-12-31',
                        documentId: 'LIC-003'
                    },
                    inspection: {
                        status: 'transferred',
                        expiry: '2024-09-10',
                        station: 'Vehicle Testing Station - Galle',
                        documentId: 'INSP-003'
                    }
                },
                mileage: 28000,
                location: 'Galle',
                features: ['Power Windows', 'Central Locking', 'Radio/CD'],
                serviceHistory: [
                    {
                        date: '2024-01-14',
                        type: 'Pre-transfer Inspection',
                        mileage: 28000,
                        cost: 5000,
                        garage: 'Authorized Service Center',
                        description: 'Complete vehicle inspection before transfer'
                    }
                ],
                fuelEfficiency: '18 km/l',
                transmission: 'Manual',
                driveType: 'Front Wheel Drive',
                seatingCapacity: 5,
                previousOwner: {
                    name: 'John Doe',
                    nic: '952341234V'
                },
                newOwner: {
                    name: 'Ruwan Jayasinghe',
                    nic: '851234567V'
                }
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
                purchasePrice: 1800000,
                transferHistory: [
                    {
                        id: 'TH-005',
                        date: '2017-11-05',
                        from: 'Dealership',
                        to: 'John Doe',
                        reason: 'Initial Purchase',
                        transferFee: 8000,
                        status: 'completed'
                    }
                ],
                documents: {
                    registration: {
                        status: 'expired',
                        expiry: '2024-11-05',
                        documentId: 'REG-004',
                        issueDate: '2017-11-05'
                    },
                    insurance: {
                        status: 'expired',
                        expiry: '2024-01-20',
                        provider: 'CEYLINCO Insurance',
                        policyNo: 'POL-901234',
                        documentId: 'INS-004'
                    },
                    license: {
                        status: 'valid',
                        expiry: '2024-12-31',
                        documentId: 'LIC-004'
                    },
                    inspection: {
                        status: 'expired',
                        expiry: '2023-11-05',
                        station: 'Vehicle Testing Station - Matara',
                        documentId: 'INSP-004'
                    }
                },
                mileage: 65000,
                location: 'Matara',
                features: ['Air Conditioning', 'Power Steering'],
                serviceHistory: [
                    {
                        date: '2023-05-20',
                        type: 'Regular Service',
                        mileage: 62000,
                        cost: 12000,
                        garage: 'Local Garage',
                        description: 'Oil change, brake adjustment'
                    }
                ],
                fuelEfficiency: '20 km/l',
                transmission: 'Manual',
                driveType: 'Front Wheel Drive',
                seatingCapacity: 5,
                owner: {
                    name: 'John Doe',
                    nic: '952341234V',
                    contact: '+94 77 123 4567',
                    email: 'john.doe@email.com'
                }
            }
        ];
    }

    // Simulate network delay
    delay(ms = 500) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Get all vehicles for current user
    async getUserVehicles(userId = 'user-1') {
        await this.delay();
        // In real app, filter by userId
        return {
            success: true,
            data: this.vehicles,
            total: this.vehicles.length
        };
    }

    // Get vehicle by ID
    async getVehicleById(vehicleId) {
        await this.delay();
        const vehicle = this.vehicles.find(v => v.id === vehicleId);

        if (!vehicle) {
            return {
                success: false,
                error: 'Vehicle not found'
            };
        }

        return {
            success: true,
            data: vehicle
        };
    }

    // Add new vehicle
    async addVehicle(vehicleData) {
        await this.delay(1000);

        const newVehicle = {
            id: `VEH-${String(this.vehicles.length + 1).padStart(3, '0')}`,
            ...vehicleData,
            status: 'active',
            ownershipStatus: 'owned',
            registrationDate: new Date().toISOString().split('T')[0],
            transferHistory: [
                {
                    id: `TH-${Date.now()}`,
                    date: new Date().toISOString().split('T')[0],
                    from: vehicleData.previousOwner || 'Dealership',
                    to: vehicleData.owner?.name || 'Current Owner',
                    reason: vehicleData.transferReason || 'Initial Purchase',
                    transferFee: vehicleData.transferFee || 15000,
                    status: 'completed'
                }
            ],
            serviceHistory: [],
            documents: {
                registration: {
                    status: 'valid',
                    expiry: new Date(Date.now() + (365 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
                    documentId: `REG-${Date.now()}`,
                    issueDate: new Date().toISOString().split('T')[0]
                },
                insurance: {
                    status: 'pending',
                    expiry: null,
                    provider: null,
                    policyNo: null,
                    documentId: null
                },
                license: {
                    status: 'pending',
                    expiry: null,
                    documentId: null
                },
                inspection: {
                    status: 'pending',
                    expiry: null,
                    station: null,
                    documentId: null
                }
            }
        };

        this.vehicles.unshift(newVehicle);

        return {
            success: true,
            data: newVehicle,
            message: 'Vehicle added successfully'
        };
    }

    // Update vehicle information
    async updateVehicle(vehicleId, updateData) {
        await this.delay();

        const vehicleIndex = this.vehicles.findIndex(v => v.id === vehicleId);
        if (vehicleIndex === -1) {
            return {
                success: false,
                error: 'Vehicle not found'
            };
        }

        this.vehicles[vehicleIndex] = {
            ...this.vehicles[vehicleIndex],
            ...updateData,
            lastUpdated: new Date().toISOString()
        };

        return {
            success: true,
            data: this.vehicles[vehicleIndex],
            message: 'Vehicle updated successfully'
        };
    }

    // Transfer vehicle ownership
    async transferVehicle(vehicleId, transferData) {
        await this.delay(1500);

        const vehicleIndex = this.vehicles.findIndex(v => v.id === vehicleId);
        if (vehicleIndex === -1) {
            return {
                success: false,
                error: 'Vehicle not found'
            };
        }

        if (this.vehicles[vehicleIndex].status !== 'active') {
            return {
                success: false,
                error: 'Vehicle is not eligible for transfer'
            };
        }

        const transferRecord = {
            id: `TH-${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
            from: this.vehicles[vehicleIndex].owner.name,
            to: transferData.newOwner.name,
            reason: transferData.reason || 'Ownership Transfer',
            transferFee: transferData.transferFee || 15000,
            status: 'pending'
        };

        this.vehicles[vehicleIndex].transferHistory.push(transferRecord);
        this.vehicles[vehicleIndex].status = 'transfer_pending';
        this.vehicles[vehicleIndex].lastUpdated = new Date().toISOString();

        return {
            success: true,
            data: {
                vehicle: this.vehicles[vehicleIndex],
                transferRecord: transferRecord
            },
            message: 'Vehicle transfer initiated successfully'
        };
    }

    // Add service record
    async addServiceRecord(vehicleId, serviceData) {
        await this.delay();

        const vehicleIndex = this.vehicles.findIndex(v => v.id === vehicleId);
        if (vehicleIndex === -1) {
            return {
                success: false,
                error: 'Vehicle not found'
            };
        }

        const serviceRecord = {
            id: `SRV-${Date.now()}`,
            ...serviceData,
            date: serviceData.date || new Date().toISOString().split('T')[0]
        };

        this.vehicles[vehicleIndex].serviceHistory.unshift(serviceRecord);

        // Update mileage if provided
        if (serviceData.mileage && serviceData.mileage > this.vehicles[vehicleIndex].mileage) {
            this.vehicles[vehicleIndex].mileage = serviceData.mileage;
        }

        return {
            success: true,
            data: serviceRecord,
            message: 'Service record added successfully'
        };
    }

    // Update document status
    async updateDocumentStatus(vehicleId, documentType, documentData) {
        await this.delay();

        const vehicleIndex = this.vehicles.findIndex(v => v.id === vehicleId);
        if (vehicleIndex === -1) {
            return {
                success: false,
                error: 'Vehicle not found'
            };
        }

        if (!this.vehicles[vehicleIndex].documents[documentType]) {
            return {
                success: false,
                error: 'Document type not found'
            };
        }

        this.vehicles[vehicleIndex].documents[documentType] = {
            ...this.vehicles[vehicleIndex].documents[documentType],
            ...documentData
        };

        return {
            success: true,
            data: this.vehicles[vehicleIndex].documents[documentType],
            message: 'Document status updated successfully'
        };
    }

    // Get vehicle statistics
    async getVehicleStats(userId = 'user-1') {
        await this.delay(300);

        const userVehicles = this.vehicles; // In real app, filter by userId

        const stats = {
            total: userVehicles.length,
            active: userVehicles.filter(v => v.status === 'active').length,
            transferred: userVehicles.filter(v => v.status === 'transferred').length,
            expired: userVehicles.filter(v => v.status === 'expired').length,
            needAttention: userVehicles.filter(v => {
                const docStatuses = Object.values(v.documents).map(doc => doc.status);
                return docStatuses.includes('expired') || docStatuses.includes('expiring_soon');
            }).length,
            totalValue: userVehicles.reduce((sum, v) => sum + v.currentValue, 0),
            totalMileage: userVehicles.reduce((sum, v) => sum + v.mileage, 0)
        };

        // Calculate average values
        stats.averageValue = stats.total > 0 ? Math.round(stats.totalValue / stats.total) : 0;
        stats.averageMileage = stats.total > 0 ? Math.round(stats.totalMileage / stats.total) : 0;
        stats.averageAge = stats.total > 0 ? new Date().getFullYear() - (userVehicles.reduce((sum, v) => sum + v.year, 0) / stats.total) : 0;

        return {
            success: true,
            data: stats
        };
    }

    // Search vehicles
    async searchVehicles(query, filters = {}) {
        await this.delay();

        let results = [...this.vehicles];

        // Text search
        if (query) {
            const searchTerm = query.toLowerCase();
            results = results.filter(vehicle =>
                vehicle.registrationNo.toLowerCase().includes(searchTerm) ||
                vehicle.make.toLowerCase().includes(searchTerm) ||
                vehicle.model.toLowerCase().includes(searchTerm) ||
                vehicle.chassisNo.toLowerCase().includes(searchTerm) ||
                vehicle.engineNo.toLowerCase().includes(searchTerm) ||
                vehicle.color.toLowerCase().includes(searchTerm)
            );
        }

        // Status filter
        if (filters.status && filters.status !== 'all') {
            results = results.filter(vehicle => vehicle.status === filters.status);
        }

        // Category filter
        if (filters.category && filters.category !== 'all') {
            results = results.filter(vehicle => vehicle.category === filters.category);
        }

        // Fuel type filter
        if (filters.fuelType && filters.fuelType !== 'all') {
            results = results.filter(vehicle => vehicle.fuelType === filters.fuelType);
        }

        // Year range filter
        if (filters.yearFrom) {
            results = results.filter(vehicle => vehicle.year >= parseInt(filters.yearFrom));
        }

        if (filters.yearTo) {
            results = results.filter(vehicle => vehicle.year <= parseInt(filters.yearTo));
        }

        // Value range filter
        if (filters.valueFrom) {
            results = results.filter(vehicle => vehicle.currentValue >= parseInt(filters.valueFrom));
        }

        if (filters.valueTo) {
            results = results.filter(vehicle => vehicle.currentValue <= parseInt(filters.valueTo));
        }

        return {
            success: true,
            data: results,
            total: results.length,
            query,
            filters
        };
    }

    // Get makes and models for dropdowns
    async getVehicleMakes() {
        await this.delay(200);

        const makes = [
            { value: 'toyota', label: 'Toyota', models: ['Aqua', 'Prius', 'Corolla', 'Camry', 'Land Cruiser'] },
            { value: 'honda', label: 'Honda', models: ['Vezel', 'Civic', 'Accord', 'CR-V', 'Insight'] },
            { value: 'nissan', label: 'Nissan', models: ['March', 'Leaf', 'X-Trail', 'Note', 'Sylphy'] },
            { value: 'suzuki', label: 'Suzuki', models: ['Alto', 'Swift', 'Wagon R', 'Vitara', 'Baleno'] },
            { value: 'mazda', label: 'Mazda', models: ['Axela', 'Demio', 'CX-5', 'Atenza', 'Roadster'] },
            { value: 'bmw', label: 'BMW', models: ['X1', 'X3', 'X5', '3 Series', '5 Series'] },
            { value: 'mercedes', label: 'Mercedes-Benz', models: ['A-Class', 'C-Class', 'E-Class', 'GLA', 'GLC'] }
        ];

        return {
            success: true,
            data: makes
        };
    }
}

// Create singleton instance
const mockVehicleService = new MockVehicleService();

export default mockVehicleService;
