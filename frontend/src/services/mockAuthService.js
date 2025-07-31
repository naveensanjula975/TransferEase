import { mockUsers } from '../data/mockUsers';

// Mock authentication service for TransferEase
export class MockAuthService {
    // Simulate network delay
    static async delay(ms = 800) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Login user with email and password
    static async login(email, password) {
        await this.delay();

        // Find user by email
        const user = mockUsers.find(u => u.email === email);

        if (!user) {
            throw new Error('User not found');
        }

        if (user.password !== password) {
            throw new Error('Invalid password');
        }

        if (!user.isActive) {
            throw new Error('Account is deactivated. Please contact support.');
        }

        // Create session token (simulated)
        const sessionToken = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        // Return user data without sensitive information
        const { password: _, ...userWithoutPassword } = user;

        return {
            user: {
                ...userWithoutPassword,
                lastLogin: new Date().toISOString()
            },
            token: sessionToken,
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
        };
    }

    // Admin login with enhanced security checks
    static async adminLogin(email, password) {
        await this.delay(1000); // Longer delay for admin login

        // Admin users are in the same mockUsers array but with role 'admin'
        const admin = mockUsers.find(u => u.email === email && u.role === 'admin');

        if (!admin) {
            throw new Error('Admin account not found');
        }

        if (admin.password !== password) {
            throw new Error('Invalid admin credentials');
        }

        if (!admin.isActive) {
            throw new Error('Admin account is deactivated');
        }

        // Create admin session token
        const sessionToken = `admin_session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        const { password: _, ...adminWithoutPassword } = admin;

        return {
            user: {
                ...adminWithoutPassword,
                lastLogin: new Date().toISOString(),
                permissions: this.getAdminPermissions(admin.role)
            },
            token: sessionToken,
            expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString() // 8 hours for admin
        };
    }

    // Register new user
    static async register(userData) {
        await this.delay(1200);

        // Check if email already exists
        const existingUser = mockUsers.find(u => u.email === userData.email);
        if (existingUser) {
            throw new Error('Email already registered');
        }

        // Check if NIC already exists
        const existingNIC = mockUsers.find(u => u.nic === userData.nic);
        if (existingNIC) {
            throw new Error('NIC already registered');
        }

        // Create new user
        const newUser = {
            id: Date.now(),
            email: userData.email,
            password: userData.password,
            name: `${userData.firstName} ${userData.lastName}`,
            firstName: userData.firstName,
            lastName: userData.lastName,
            nic: userData.nic,
            phone: userData.phone,
            address: userData.address || '',
            district: userData.district || '',
            province: userData.province || '',
            role: 'user',
            avatar: '/src/assets/default-avatar.png',
            isVerified: false, // Would require email verification in real app
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            lastLogin: null,
            stats: {
                totalVehicles: 0,
                activeTransfers: 0,
                completedTransfers: 0,
                totalSpent: 0,
                membershipLevel: 'Bronze',
                memberSince: new Date().toISOString().split('T')[0]
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
                dateOfBirth: userData.dateOfBirth || '',
                occupation: userData.occupation || '',
                employer: userData.employer || '',
                emergencyContact: {
                    name: '',
                    relationship: '',
                    phone: ''
                }
            }
        };

        // In a real app, this would be saved to database
        mockUsers.push(newUser);

        // Create session for newly registered user
        const sessionToken = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        const { password: _, ...userWithoutPassword } = newUser;

        return {
            user: {
                ...userWithoutPassword,
                lastLogin: new Date().toISOString()
            },
            token: sessionToken,
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        };
    }

    // Verify session token
    static async verifyToken(token) {
        await this.delay(200);

        // In real app, this would verify JWT token with backend
        // For mock, we'll check if token follows expected format
        if (!token || !token.startsWith('session_') && !token.startsWith('admin_session_')) {
            throw new Error('Invalid token');
        }

        // Extract timestamp from token to check expiry
        const tokenParts = token.split('_');
        if (tokenParts.length < 2) {
            throw new Error('Malformed token');
        }

        const tokenTimestamp = parseInt(tokenParts[1]);
        const expiryTime = token.startsWith('admin_session_')
            ? 8 * 60 * 60 * 1000  // 8 hours for admin
            : 24 * 60 * 60 * 1000; // 24 hours for user

        if (Date.now() - tokenTimestamp > expiryTime) {
            throw new Error('Token expired');
        }

        return { valid: true };
    }

    // Logout (invalidate token)
    static async logout(token) {
        await this.delay(200);

        // In real app, this would blacklist the token on backend
        // For mock, we'll just return success
        return { success: true };
    }

    // Refresh token
    static async refreshToken(token) {
        await this.delay(300);

        // Verify current token first
        await this.verifyToken(token);

        // Generate new token
        const isAdmin = token.startsWith('admin_session_');
        const newToken = `${isAdmin ? 'admin_session' : 'session'}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const expiryTime = isAdmin ? 8 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000;

        return {
            token: newToken,
            expiresAt: new Date(Date.now() + expiryTime).toISOString()
        };
    }

    // Reset password (mock)
    static async resetPassword(email) {
        await this.delay(1000);

        const user = mockUsers.find(u => u.email === email);
        if (!user) {
            throw new Error('Email not found');
        }

        // In real app, this would send reset email
        return {
            message: 'Password reset link sent to your email',
            resetToken: `reset_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        };
    }

    // Change password
    static async changePassword(userId, currentPassword, newPassword) {
        await this.delay(500);

        const user = mockUsers.find(u => u.id === userId);
        if (!user) {
            throw new Error('User not found');
        }

        if (user.password !== currentPassword) {
            throw new Error('Current password is incorrect');
        }

        // Update password (in real app, would hash the password)
        user.password = newPassword;
        user.updatedAt = new Date().toISOString();

        return { success: true, message: 'Password updated successfully' };
    }

    // Get user permissions based on role
    static getAdminPermissions(role) {
        const basePermissions = ['view_profile', 'update_profile'];

        if (role === 'admin') {
            return [
                ...basePermissions,
                'view_all_transfers',
                'approve_transfers',
                'reject_transfers',
                'manage_users',
                'view_analytics',
                'export_data',
                'system_settings',
                'view_reports',
                'manage_documents',
                'process_payments'
            ];
        }

        return basePermissions;
    }

    // Get user by ID
    static async getUserById(userId) {
        await this.delay(200);

        const user = mockUsers.find(u => u.id === userId);
        if (!user) {
            throw new Error('User not found');
        }

        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    // Update user profile
    static async updateProfile(userId, updates) {
        await this.delay(400);

        const userIndex = mockUsers.findIndex(u => u.id === userId);
        if (userIndex === -1) {
            throw new Error('User not found');
        }

        // Update user data
        mockUsers[userIndex] = {
            ...mockUsers[userIndex],
            ...updates,
            updatedAt: new Date().toISOString()
        };

        const { password: _, ...userWithoutPassword } = mockUsers[userIndex];
        return userWithoutPassword;
    }

    // Validate NIC format
    static validateNIC(nic) {
        // Old NIC format (9 digits + V/X) or New NIC format (12 digits)
        const oldNICPattern = /^[0-9]{9}[vVxX]$/;
        const newNICPattern = /^[0-9]{12}$/;
        return oldNICPattern.test(nic) || newNICPattern.test(nic);
    }

    // Validate Sri Lankan phone number
    static validatePhoneNumber(phone) {
        // Remove spaces and hyphens for validation
        const cleanPhone = phone.replace(/[\s-]/g, '');

        // Sri Lankan mobile numbers: +94 7X XXX XXXX or 07X XXX XXXX
        const sriLankanMobilePattern = /^(\+94|0)?7[0-9]{8}$/;

        return sriLankanMobilePattern.test(cleanPhone);
    }

    // Get authentication statistics (for admin dashboard)
    static async getAuthStats() {
        await this.delay(300);

        const totalUsers = mockUsers.filter(u => u.role === 'user').length;
        const totalAdmins = mockUsers.filter(u => u.role === 'admin').length;
        const activeUsers = mockUsers.filter(u => u.isActive && u.role === 'user').length;
        const verifiedUsers = mockUsers.filter(u => u.isVerified && u.role === 'user').length;

        // Calculate users registered in last 30 days
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const recentUsers = mockUsers.filter(u =>
            u.role === 'user' && new Date(u.createdAt) > thirtyDaysAgo
        ).length;

        return {
            totalUsers,
            totalAdmins,
            activeUsers,
            verifiedUsers,
            recentUsers,
            verificationRate: totalUsers > 0 ? (verifiedUsers / totalUsers * 100).toFixed(1) : 0,
            activeRate: totalUsers > 0 ? (activeUsers / totalUsers * 100).toFixed(1) : 0
        };
    }
}

export default MockAuthService;
