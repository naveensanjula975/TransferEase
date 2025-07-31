// Mock vehicle database for TransferEase application
export const mockVehicles = [
    {
        id: 1,
        registrationNo: 'ABC-1234',
        chassisNo: 'JT2BF28K050123456',
        engineNo: 'ENG123456789',

        // Vehicle details
        make: 'Toyota',
        model: 'Aqua',
        year: 2018,
        color: 'White',
        fuelType: 'Hybrid',
        engineCapacity: '1500cc',
        transmission: 'CVT',
        bodyType: 'Hatchback',

        // Current owner
        currentOwnerId: 1,
        currentOwnerName: 'John Doe',
        currentOwnerNIC: '952341234V',

        // Registration details
        registeredDate: '2018-03-15T00:00:00.000Z',
        lastTransferDate: '2021-08-20T00:00:00.000Z',
        registrationExpiry: '2025-03-15T00:00:00.000Z',

        // Insurance details
        insuranceProvider: 'Ceylinco Insurance',
        insurancePolicyNo: 'CIC-2024-001234',
        insuranceExpiry: '2025-02-28T00:00:00.000Z',
        insuranceValue: 3500000,

        // Financial details
        purchasePrice: 3200000,
        currentMarketValue: 2800000,
        outstandingLoan: 0,
        loanProvider: null,

        // Status
        status: 'active', // active, pending_transfer, transferred, impounded
        condition: 'excellent', // excellent, good, fair, poor
        mileage: 45000,
        lastServiceDate: '2024-06-15T00:00:00.000Z',
        nextServiceDue: '2024-12-15T00:00:00.000Z',

        // Transfer history
        transferHistory: [
            {
                id: 1,
                date: '2021-08-20T00:00:00.000Z',
                fromOwner: 'Previous Owner Name',
                fromNIC: '851234567V',
                toOwner: 'John Doe',
                toNIC: '952341234V',
                transferType: 'sale',
                price: 3200000,
                status: 'completed'
            }
        ],

        // Documents
        documents: {
            registration: {
                status: 'valid',
                uploadedAt: '2024-01-15T00:00:00.000Z',
                expiryDate: '2025-03-15T00:00:00.000Z'
            },
            insurance: {
                status: 'valid',
                uploadedAt: '2024-02-01T00:00:00.000Z',
                expiryDate: '2025-02-28T00:00:00.000Z'
            },
            emissionTest: {
                status: 'valid',
                uploadedAt: '2024-01-10T00:00:00.000Z',
                expiryDate: '2025-01-10T00:00:00.000Z'
            }
        },

        // Additional info
        features: ['Air Conditioning', 'Power Steering', 'Central Locking', 'ABS'],
        createdAt: '2024-01-15T08:30:00.000Z',
        updatedAt: '2024-07-30T10:15:00.000Z'
    },

    {
        id: 2,
        registrationNo: 'DEF-5678',
        chassisNo: 'WVWZZZ1JZYW123456',
        engineNo: 'ENG987654321',

        make: 'Honda',
        model: 'Civic',
        year: 2020,
        color: 'Silver',
        fuelType: 'Petrol',
        engineCapacity: '1800cc',
        transmission: 'Manual',
        bodyType: 'Sedan',

        currentOwnerId: 1,
        currentOwnerName: 'John Doe',
        currentOwnerNIC: '952341234V',

        registeredDate: '2020-05-10T00:00:00.000Z',
        lastTransferDate: '2022-11-15T00:00:00.000Z',
        registrationExpiry: '2025-05-10T00:00:00.000Z',

        insuranceProvider: 'AIA Insurance',
        insurancePolicyNo: 'AIA-2024-005678',
        insuranceExpiry: '2025-04-30T00:00:00.000Z',
        insuranceValue: 4200000,

        purchasePrice: 4500000,
        currentMarketValue: 3800000,
        outstandingLoan: 1200000,
        loanProvider: 'Commercial Bank',

        status: 'active',
        condition: 'good',
        mileage: 32000,
        lastServiceDate: '2024-05-20T00:00:00.000Z',
        nextServiceDue: '2024-11-20T00:00:00.000Z',

        transferHistory: [
            {
                id: 2,
                date: '2022-11-15T00:00:00.000Z',
                fromOwner: 'Sarah Johnson',
                fromNIC: '891234567V',
                toOwner: 'John Doe',
                toNIC: '952341234V',
                transferType: 'sale',
                price: 4500000,
                status: 'completed'
            }
        ],

        documents: {
            registration: {
                status: 'valid',
                uploadedAt: '2024-01-15T00:00:00.000Z',
                expiryDate: '2025-05-10T00:00:00.000Z'
            },
            insurance: {
                status: 'valid',
                uploadedAt: '2024-04-01T00:00:00.000Z',
                expiryDate: '2025-04-30T00:00:00.000Z'
            },
            emissionTest: {
                status: 'expired',
                uploadedAt: '2023-12-15T00:00:00.000Z',
                expiryDate: '2024-12-15T00:00:00.000Z'
            }
        },

        features: ['Sunroof', 'Leather Seats', 'Navigation System', 'Backup Camera'],
        createdAt: '2024-01-15T08:30:00.000Z',
        updatedAt: '2024-07-30T10:15:00.000Z'
    },

    {
        id: 3,
        registrationNo: 'GHI-9012',
        chassisNo: 'WDDGF4HB1ER123456',
        engineNo: 'ENG456789123',

        make: 'BMW',
        model: 'X3',
        year: 2019,
        color: 'Black',
        fuelType: 'Diesel',
        engineCapacity: '2000cc',
        transmission: 'Automatic',
        bodyType: 'SUV',

        currentOwnerId: 1,
        currentOwnerName: 'John Doe',
        currentOwnerNIC: '952341234V',

        registeredDate: '2019-07-22T00:00:00.000Z',
        lastTransferDate: '2023-02-10T00:00:00.000Z',
        registrationExpiry: '2024-07-22T00:00:00.000Z',

        insuranceProvider: 'Union Assurance',
        insurancePolicyNo: 'UA-2024-009012',
        insuranceExpiry: '2025-01-31T00:00:00.000Z',
        insuranceValue: 7500000,

        purchasePrice: 8200000,
        currentMarketValue: 6500000,
        outstandingLoan: 2800000,
        loanProvider: 'Sampath Bank',

        status: 'pending_transfer',
        condition: 'excellent',
        mileage: 28000,
        lastServiceDate: '2024-07-10T00:00:00.000Z',
        nextServiceDue: '2025-01-10T00:00:00.000Z',

        transferHistory: [
            {
                id: 3,
                date: '2023-02-10T00:00:00.000Z',
                fromOwner: 'Michael Brown',
                fromNIC: '801234567V',
                toOwner: 'John Doe',
                toNIC: '952341234V',
                transferType: 'sale',
                price: 8200000,
                status: 'completed'
            }
        ],

        documents: {
            registration: {
                status: 'expiring_soon',
                uploadedAt: '2024-01-15T00:00:00.000Z',
                expiryDate: '2024-07-22T00:00:00.000Z'
            },
            insurance: {
                status: 'valid',
                uploadedAt: '2024-01-01T00:00:00.000Z',
                expiryDate: '2025-01-31T00:00:00.000Z'
            },
            emissionTest: {
                status: 'valid',
                uploadedAt: '2024-06-01T00:00:00.000Z',
                expiryDate: '2025-06-01T00:00:00.000Z'
            }
        },

        features: ['All-Wheel Drive', 'Premium Sound System', 'Heated Seats', 'Panoramic Roof'],
        createdAt: '2024-01-15T08:30:00.000Z',
        updatedAt: '2024-07-30T10:15:00.000Z'
    },

    {
        id: 4,
        registrationNo: 'JKL-3456',
        chassisNo: 'KMHD35LA0EU123456',
        engineNo: 'ENG789123456',

        make: 'Suzuki',
        model: 'Alto',
        year: 2017,
        color: 'Red',
        fuelType: 'Petrol',
        engineCapacity: '800cc',
        transmission: 'Manual',
        bodyType: 'Hatchback',

        currentOwnerId: 1,
        currentOwnerName: 'John Doe',
        currentOwnerNIC: '952341234V',

        registeredDate: '2017-12-05T00:00:00.000Z',
        lastTransferDate: '2020-06-18T00:00:00.000Z',
        registrationExpiry: '2024-12-05T00:00:00.000Z',

        insuranceProvider: 'LOLC Insurance',
        insurancePolicyNo: 'LOLC-2024-003456',
        insuranceExpiry: '2024-12-31T00:00:00.000Z',
        insuranceValue: 1800000,

        purchasePrice: 1950000,
        currentMarketValue: 1500000,
        outstandingLoan: 0,
        loanProvider: null,

        status: 'active',
        condition: 'fair',
        mileage: 68000,
        lastServiceDate: '2024-04-15T00:00:00.000Z',
        nextServiceDue: '2024-10-15T00:00:00.000Z',

        transferHistory: [
            {
                id: 4,
                date: '2020-06-18T00:00:00.000Z',
                fromOwner: 'Priya Perera',
                fromNIC: '871234567V',
                toOwner: 'John Doe',
                toNIC: '952341234V',
                transferType: 'gift',
                price: 0,
                status: 'completed'
            }
        ],

        documents: {
            registration: {
                status: 'expiring_soon',
                uploadedAt: '2024-01-15T00:00:00.000Z',
                expiryDate: '2024-12-05T00:00:00.000Z'
            },
            insurance: {
                status: 'expiring_soon',
                uploadedAt: '2024-01-01T00:00:00.000Z',
                expiryDate: '2024-12-31T00:00:00.000Z'
            },
            emissionTest: {
                status: 'expired',
                uploadedAt: '2023-10-01T00:00:00.000Z',
                expiryDate: '2024-10-01T00:00:00.000Z'
            }
        },

        features: ['Basic Audio System', 'Manual Windows'],
        createdAt: '2024-01-15T08:30:00.000Z',
        updatedAt: '2024-07-30T10:15:00.000Z'
    },

    {
        id: 5,
        registrationNo: 'MNO-7890',
        chassisNo: 'WBA3A5G50ENP12345',
        engineNo: 'ENG321654987',

        make: 'Nissan',
        model: 'March',
        year: 2016,
        color: 'Blue',
        fuelType: 'Petrol',
        engineCapacity: '1200cc',
        transmission: 'CVT',
        bodyType: 'Hatchback',

        currentOwnerId: 3,
        currentOwnerName: 'Jane Smith',
        currentOwnerNIC: '887654321V',

        registeredDate: '2016-09-12T00:00:00.000Z',
        lastTransferDate: '2019-04-25T00:00:00.000Z',
        registrationExpiry: '2024-09-12T00:00:00.000Z',

        insuranceProvider: 'Janashakthi Insurance',
        insurancePolicyNo: 'JI-2024-007890',
        insuranceExpiry: '2024-11-30T00:00:00.000Z',
        insuranceValue: 2100000,

        purchasePrice: 2300000,
        currentMarketValue: 1800000,
        outstandingLoan: 450000,
        loanProvider: 'People\'s Bank',

        status: 'active',
        condition: 'good',
        mileage: 72000,
        lastServiceDate: '2024-06-30T00:00:00.000Z',
        nextServiceDue: '2024-12-30T00:00:00.000Z',

        transferHistory: [
            {
                id: 5,
                date: '2019-04-25T00:00:00.000Z',
                fromOwner: 'Kasun Silva',
                fromNIC: '861234567V',
                toOwner: 'Jane Smith',
                toNIC: '887654321V',
                transferType: 'sale',
                price: 2300000,
                status: 'completed'
            }
        ],

        documents: {
            registration: {
                status: 'expiring_soon',
                uploadedAt: '2024-03-20T00:00:00.000Z',
                expiryDate: '2024-09-12T00:00:00.000Z'
            },
            insurance: {
                status: 'valid',
                uploadedAt: '2024-11-01T00:00:00.000Z',
                expiryDate: '2024-11-30T00:00:00.000Z'
            },
            emissionTest: {
                status: 'valid',
                uploadedAt: '2024-05-15T00:00:00.000Z',
                expiryDate: '2025-05-15T00:00:00.000Z'
            }
        },

        features: ['Air Conditioning', 'Power Steering', 'Electric Windows'],
        createdAt: '2024-03-20T10:00:00.000Z',
        updatedAt: '2024-07-30T15:20:00.000Z'
    }
];

// Vehicle lookup functions
export const findVehicleByRegistration = (registrationNo) => {
    return mockVehicles.find(vehicle =>
        vehicle.registrationNo.toLowerCase() === registrationNo.toLowerCase()
    );
};

export const findVehiclesByOwner = (ownerId) => {
    return mockVehicles.filter(vehicle => vehicle.currentOwnerId === parseInt(ownerId));
};

export const findVehiclesByStatus = (status) => {
    return mockVehicles.filter(vehicle => vehicle.status === status);
};

export const findVehiclesByMakeModel = (make, model = null) => {
    return mockVehicles.filter(vehicle => {
        const makeMatch = vehicle.make.toLowerCase() === make.toLowerCase();
        if (model) {
            return makeMatch && vehicle.model.toLowerCase() === model.toLowerCase();
        }
        return makeMatch;
    });
};

// Vehicle statistics
export const getVehicleStatistics = () => {
    const totalVehicles = mockVehicles.length;
    const activeVehicles = mockVehicles.filter(v => v.status === 'active').length;
    const pendingTransfers = mockVehicles.filter(v => v.status === 'pending_transfer').length;

    const vehiclesByMake = mockVehicles.reduce((acc, vehicle) => {
        acc[vehicle.make] = (acc[vehicle.make] || 0) + 1;
        return acc;
    }, {});

    const vehiclesByYear = mockVehicles.reduce((acc, vehicle) => {
        acc[vehicle.year] = (acc[vehicle.year] || 0) + 1;
        return acc;
    }, {});

    const averageAge = Math.round(
        mockVehicles.reduce((sum, vehicle) => sum + (new Date().getFullYear() - vehicle.year), 0) / totalVehicles
    );

    return {
        totalVehicles,
        activeVehicles,
        pendingTransfers,
        vehiclesByMake,
        vehiclesByYear,
        averageAge,
        totalValue: mockVehicles.reduce((sum, vehicle) => sum + vehicle.currentMarketValue, 0)
    };
};

// Document status helpers
export const getDocumentStatusCounts = () => {
    const statusCounts = {
        valid: 0,
        expired: 0,
        expiring_soon: 0,
        missing: 0
    };

    mockVehicles.forEach(vehicle => {
        Object.values(vehicle.documents).forEach(doc => {
            statusCounts[doc.status] = (statusCounts[doc.status] || 0) + 1;
        });
    });

    return statusCounts;
};

// Transfer history helpers
export const getTransferHistory = (vehicleId = null) => {
    if (vehicleId) {
        const vehicle = mockVehicles.find(v => v.id === parseInt(vehicleId));
        return vehicle ? vehicle.transferHistory : [];
    }

    return mockVehicles.flatMap(vehicle =>
        vehicle.transferHistory.map(transfer => ({
            ...transfer,
            vehicleId: vehicle.id,
            vehicleRegistration: vehicle.registrationNo,
            vehicleMake: vehicle.make,
            vehicleModel: vehicle.model
        }))
    );
};

export default mockVehicles;
