// Mock user database for TransferEase application
export const mockUsers = [
    {
        id: 1,
        email: 'john.doe@email.com',
        password: 'password123', // In real app, this would be hashed
        name: 'John Doe',
        nic: '952341234V',
        phone: '+94 77 123 4567',
        address: '123 Main Street, Colombo 07',
        district: 'Colombo',
        province: 'Western',
        role: 'user',
        avatar: '/src/assets/default-avatar.png',
        isVerified: true,
        isActive: true,
        createdAt: '2024-01-15T08:30:00.000Z',
        updatedAt: '2024-07-30T10:15:00.000Z',
        lastLogin: '2024-07-31T09:00:00.000Z',

        // User statistics
        stats: {
            totalVehicles: 4,
            activeTransfers: 2,
            completedTransfers: 5,
            totalSpent: 67500,
            membershipLevel: 'Gold',
            memberSince: '2024-01-15'
        },

        // User preferences
        preferences: {
            emailNotifications: true,
            smsNotifications: true,
            pushNotifications: true,
            language: 'en',
            theme: 'light',
            currency: 'LKR'
        },

        // Personal details
        details: {
            dateOfBirth: '1995-05-15',
            occupation: 'Software Engineer',
            employer: 'Tech Solutions Ltd',
            emergencyContact: {
                name: 'Jane Doe',
                relationship: 'Spouse',
                phone: '+94 76 987 6543'
            }
        }
    },

    {
        id: 2,
        email: 'admin@transferease.com',
        password: 'admin123',
        name: 'Admin User',
        nic: '851234567V',
        phone: '+94 11 234 5678',
        address: 'TransferEase Headquarters, Colombo 03',
        district: 'Colombo',
        province: 'Western',
        role: 'admin',
        avatar: '/src/assets/default-avatar.png',
        isVerified: true,
        isActive: true,
        createdAt: '2023-06-01T00:00:00.000Z',
        updatedAt: '2024-07-31T08:00:00.000Z',
        lastLogin: '2024-07-31T08:00:00.000Z',

        // Admin statistics
        stats: {
            totalVehicles: 0,
            activeTransfers: 0,
            completedTransfers: 0,
            totalSpent: 0,
            membershipLevel: 'Admin',
            memberSince: '2023-06-01'
        },

        preferences: {
            emailNotifications: true,
            smsNotifications: false,
            pushNotifications: true,
            language: 'en',
            theme: 'light',
            currency: 'LKR'
        },

        // Admin specific data
        adminData: {
            department: 'System Administration',
            permissions: ['all'],
            lastSystemCheck: '2024-07-31T07:30:00.000Z',
            activeSession: true
        }
    },

    {
        id: 3,
        email: 'jane.smith@email.com',
        password: 'password456',
        name: 'Jane Smith',
        nic: '887654321V',
        phone: '+94 76 987 6543',
        address: '456 Galle Road, Dehiwala',
        district: 'Colombo',
        province: 'Western',
        role: 'user',
        avatar: '/src/assets/default-avatar.png',
        isVerified: true,
        isActive: true,
        createdAt: '2024-03-20T10:00:00.000Z',
        updatedAt: '2024-07-30T15:20:00.000Z',
        lastLogin: '2024-07-30T18:45:00.000Z',

        stats: {
            totalVehicles: 1,
            activeTransfers: 1,
            completedTransfers: 3,
            totalSpent: 25500,
            membershipLevel: 'Silver',
            memberSince: '2024-03-20'
        },

        preferences: {
            emailNotifications: true,
            smsNotifications: true,
            pushNotifications: false,
            language: 'en',
            theme: 'dark',
            currency: 'LKR'
        },

        details: {
            dateOfBirth: '1988-12-08',
            occupation: 'Teacher',
            employer: 'St. Thomas College',
            emergencyContact: {
                name: 'Robert Smith',
                relationship: 'Brother',
                phone: '+94 77 456 7890'
            }
        }
    },

    {
        id: 4,
        email: 'michael.wilson@email.com',
        password: 'password789',
        name: 'Michael Wilson',
        nic: '923456789V',
        phone: '+94 75 456 7890',
        address: '789 Kandy Road, Peradeniya',
        district: 'Kandy',
        province: 'Central',
        role: 'user',
        avatar: '/src/assets/default-avatar.png',
        isVerified: false,
        isActive: true,
        createdAt: '2024-07-10T14:30:00.000Z',
        updatedAt: '2024-07-10T14:30:00.000Z',
        lastLogin: '2024-07-15T09:20:00.000Z',

        stats: {
            totalVehicles: 0,
            activeTransfers: 0,
            completedTransfers: 0,
            totalSpent: 0,
            membershipLevel: 'Bronze',
            memberSince: '2024-07-10'
        },

        preferences: {
            emailNotifications: true,
            smsNotifications: true,
            pushNotifications: true,
            language: 'en',
            theme: 'light',
            currency: 'LKR'
        },

        details: {
            dateOfBirth: '1992-09-25',
            occupation: 'Business Owner',
            employer: 'Wilson Enterprises',
            emergencyContact: {
                name: 'Sarah Wilson',
                relationship: 'Wife',
                phone: '+94 74 123 4567'
            }
        }
    },

    {
        id: 5,
        email: 'david.fernando@email.com',
        password: 'password321',
        name: 'David Fernando',
        nic: '776543210V',
        phone: '+94 71 234 5678',
        address: '321 Beach Road, Negombo',
        district: 'Gampaha',
        province: 'Western',
        role: 'user',
        avatar: '/src/assets/default-avatar.png',
        isVerified: true,
        isActive: true,
        createdAt: '2023-11-05T16:45:00.000Z',
        updatedAt: '2024-07-29T11:30:00.000Z',
        lastLogin: '2024-07-29T19:15:00.000Z',

        stats: {
            totalVehicles: 2,
            activeTransfers: 0,
            completedTransfers: 8,
            totalSpent: 102000,
            membershipLevel: 'Platinum',
            memberSince: '2023-11-05'
        },

        preferences: {
            emailNotifications: true,
            smsNotifications: false,
            pushNotifications: true,
            language: 'si',
            theme: 'light',
            currency: 'LKR'
        },

        details: {
            dateOfBirth: '1977-03-12',
            occupation: 'Doctor',
            employer: 'National Hospital',
            emergencyContact: {
                name: 'Maria Fernando',
                relationship: 'Wife',
                phone: '+94 70 987 6543'
            }
        }
    }
];

// User lookup functions
export const findUserByEmail = (email) => {
    return mockUsers.find(user => user.email.toLowerCase() === email.toLowerCase());
};

export const findUserByNIC = (nic) => {
    return mockUsers.find(user => user.nic === nic);
};

export const findUserById = (id) => {
    return mockUsers.find(user => user.id === parseInt(id));
};

export const findUsersByRole = (role) => {
    return mockUsers.filter(user => user.role === role);
};

// Authentication helpers
export const validateUserCredentials = (email, password, role = 'user') => {
    const user = findUserByEmail(email);
    if (!user || user.password !== password || user.role !== role) {
        return null;
    }
    return user;
};

// User statistics
export const getUserStatistics = () => {
    const totalUsers = mockUsers.length;
    const activeUsers = mockUsers.filter(user => user.isActive).length;
    const verifiedUsers = mockUsers.filter(user => user.isVerified).length;
    const usersByRole = {
        admin: findUsersByRole('admin').length,
        user: findUsersByRole('user').length
    };

    return {
        totalUsers,
        activeUsers,
        verifiedUsers,
        usersByRole,
        recentRegistrations: mockUsers
            .filter(user => {
                const oneWeekAgo = new Date();
                oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                return new Date(user.createdAt) > oneWeekAgo;
            })
            .length
    };
};

// Mock verification codes for testing
export const mockVerificationCodes = {
    'john.doe@email.com': '123456',
    'jane.smith@email.com': '789012',
    'michael.wilson@email.com': '345678',
    'david.fernando@email.com': '901234'
};

export default mockUsers;
