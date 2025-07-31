// Mock API utilities for simulating backend interactions
import {
    mockUsers,
    mockVehicles,
    mockTransfers,
    mockDocuments,
    validateUserCredentials,
    findUserByEmail,
    findUserByNIC,
    findUserById,
    findVehiclesByOwner,
    findTransfersByUser,
    findDocumentsByTransfer
} from '../data';

// Simulate network delay
const simulateDelay = (min = 500, max = 2000) => {
    const delay = Math.random() * (max - min) + min;
    return new Promise(resolve => setTimeout(resolve, delay));
};

// Simulate API response
const createResponse = (data, success = true, message = null) => ({
    success,
    data,
    message,
    timestamp: new Date().toISOString()
});

// Authentication API
export const authAPI = {
    // Login user
    login: async (email, password, role = 'user') => {
        await simulateDelay();

        try {
            const user = validateUserCredentials(email, password, role);

            if (!user) {
                return createResponse(null, false, 'Invalid email or password');
            }

            if (!user.isActive) {
                return createResponse(null, false, 'Account is suspended. Please contact support.');
            }

            // Create session token (mock)
            const sessionToken = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

            // Remove password from response
            const { password: _, ...userWithoutPassword } = user;

            return createResponse({
                user: {
                    ...userWithoutPassword,
                    lastLogin: new Date().toISOString()
                },
                token: sessionToken,
                expiresIn: 86400 // 24 hours
            }, true, 'Login successful');

        } catch (error) {
            return createResponse(null, false, 'Login failed. Please try again.');
        }
    },

    // Register new user
    register: async (userData) => {
        await simulateDelay(1000, 3000);

        try {
            // Check if user already exists
            const existingEmailUser = findUserByEmail(userData.email);
            if (existingEmailUser) {
                return createResponse(null, false, 'An account with this email already exists');
            }

            const existingNICUser = findUserByNIC(userData.nic);
            if (existingNICUser) {
                return createResponse(null, false, 'An account with this NIC already exists');
            }

            // Create new user
            const newUser = {
                id: Date.now(),
                ...userData,
                role: 'user',
                isVerified: false,
                isActive: true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
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
                }
            };

            // In a real app, this would be saved to database
            mockUsers.push(newUser);

            // Remove password from response
            const { password: _, ...userWithoutPassword } = newUser;

            return createResponse({
                user: userWithoutPassword,
                message: 'Account created successfully. Please verify your email.'
            }, true, 'Registration successful');

        } catch (error) {
            return createResponse(null, false, 'Registration failed. Please try again.');
        }
    },

    // Forgot password
    forgotPassword: async (email) => {
        await simulateDelay();

        const user = findUserByEmail(email);
        if (!user) {
            return createResponse(null, false, 'No account found with this email address');
        }

        // Simulate sending reset email
        return createResponse(null, true, 'Password reset link sent to your email');
    },

    // Reset password
    resetPassword: async (token, newPassword) => {
        await simulateDelay();

        // In a real app, verify token and update password
        return createResponse(null, true, 'Password reset successfully');
    },

    // Verify account
    verifyAccount: async (userId, verificationCode) => {
        await simulateDelay();

        // In a real app, verify code and update user status
        const user = findUserById(userId);
        if (user) {
            user.isVerified = true;
            user.verifiedAt = new Date().toISOString();

            const { password: _, ...userWithoutPassword } = user;
            return createResponse(userWithoutPassword, true, 'Account verified successfully');
        }

        return createResponse(null, false, 'Invalid verification code');
    }
};

// User API
export const userAPI = {
    // Get user profile
    getProfile: async (userId) => {
        await simulateDelay(300, 800);

        const user = findUserById(userId);
        if (!user) {
            return createResponse(null, false, 'User not found');
        }

        const { password: _, ...userWithoutPassword } = user;
        return createResponse(userWithoutPassword, true);
    },

    // Update user profile
    updateProfile: async (userId, updates) => {
        await simulateDelay();

        const user = findUserById(userId);
        if (!user) {
            return createResponse(null, false, 'User not found');
        }

        // Update user data
        Object.assign(user, updates, { updatedAt: new Date().toISOString() });

        const { password: _, ...userWithoutPassword } = user;
        return createResponse(userWithoutPassword, true, 'Profile updated successfully');
    },

    // Change password
    changePassword: async (userId, currentPassword, newPassword) => {
        await simulateDelay();

        const user = findUserById(userId);
        if (!user || user.password !== currentPassword) {
            return createResponse(null, false, 'Current password is incorrect');
        }

        user.password = newPassword;
        user.updatedAt = new Date().toISOString();

        return createResponse(null, true, 'Password changed successfully');
    },

    // Get user statistics
    getUserStats: async (userId) => {
        await simulateDelay(200, 600);

        const user = findUserById(userId);
        if (!user) {
            return createResponse(null, false, 'User not found');
        }

        const vehicles = findVehiclesByOwner(userId);
        const transfers = findTransfersByUser(userId);

        const stats = {
            ...user.stats,
            vehicles: vehicles.length,
            activeTransfers: transfers.filter(t => ['submitted', 'under_review', 'approved'].includes(t.status)).length,
            completedTransfers: transfers.filter(t => t.status === 'completed').length,
            totalSpent: transfers.filter(t => t.fees?.paidAmount).reduce((sum, t) => sum + t.fees.paidAmount, 0)
        };

        return createResponse(stats, true);
    }
};

// Vehicle API
export const vehicleAPI = {
    // Get user vehicles
    getUserVehicles: async (userId) => {
        await simulateDelay(300, 1000);

        const vehicles = findVehiclesByOwner(userId);
        return createResponse(vehicles, true);
    },

    // Get vehicle details
    getVehicleDetails: async (vehicleId) => {
        await simulateDelay();

        const vehicle = mockVehicles.find(v => v.id === parseInt(vehicleId));
        if (!vehicle) {
            return createResponse(null, false, 'Vehicle not found');
        }

        return createResponse(vehicle, true);
    },

    // Search vehicle by registration
    searchVehicle: async (registrationNo) => {
        await simulateDelay();

        const vehicle = mockVehicles.find(v =>
            v.registrationNo.toLowerCase() === registrationNo.toLowerCase()
        );

        if (!vehicle) {
            return createResponse(null, false, 'Vehicle not found');
        }

        return createResponse(vehicle, true);
    }
};

// Transfer API
export const transferAPI = {
    // Get user transfers
    getUserTransfers: async (userId) => {
        await simulateDelay(400, 1200);

        const transfers = findTransfersByUser(userId);
        return createResponse(transfers, true);
    },

    // Get transfer details
    getTransferDetails: async (transferId) => {
        await simulateDelay();

        const transfer = mockTransfers.find(t => t.id === parseInt(transferId));
        if (!transfer) {
            return createResponse(null, false, 'Transfer not found');
        }

        return createResponse(transfer, true);
    },

    // Submit transfer application
    submitTransfer: async (transferData) => {
        await simulateDelay(2000, 4000);

        try {
            const newTransfer = {
                id: Date.now(),
                applicationNo: `TR-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
                ...transferData,
                status: 'submitted',
                submittedAt: new Date().toISOString(),
                lastUpdated: new Date().toISOString(),
                stages: [
                    {
                        id: 1,
                        name: 'Application Submitted',
                        status: 'completed',
                        completedAt: new Date().toISOString(),
                        notes: 'Application submitted successfully'
                    },
                    {
                        id: 2,
                        name: 'Document Verification',
                        status: 'pending',
                        notes: 'Awaiting document verification'
                    }
                ],
                activityLog: [
                    {
                        id: 1,
                        timestamp: new Date().toISOString(),
                        action: 'application_submitted',
                        performedBy: transferData.currentOwnerName,
                        description: 'Transfer application submitted'
                    }
                ]
            };

            mockTransfers.push(newTransfer);

            return createResponse(newTransfer, true, 'Transfer application submitted successfully');

        } catch (error) {
            return createResponse(null, false, 'Failed to submit transfer application');
        }
    },

    // Update transfer status (admin only)
    updateTransferStatus: async (transferId, status, notes = '') => {
        await simulateDelay();

        const transfer = mockTransfers.find(t => t.id === parseInt(transferId));
        if (!transfer) {
            return createResponse(null, false, 'Transfer not found');
        }

        transfer.status = status;
        transfer.lastUpdated = new Date().toISOString();

        // Add activity log entry
        transfer.activityLog.push({
            id: transfer.activityLog.length + 1,
            timestamp: new Date().toISOString(),
            action: 'status_updated',
            performedBy: 'Admin User',
            description: `Status updated to ${status}${notes ? ': ' + notes : ''}`
        });

        return createResponse(transfer, true, 'Transfer status updated');
    }
};

// Document API
export const documentAPI = {
    // Upload document
    uploadDocument: async (transferId, documentType, file) => {
        await simulateDelay(1500, 3500);

        try {
            const newDocument = {
                id: Date.now(),
                fileName: `${documentType}_${Date.now()}.${file.name.split('.').pop()}`,
                originalName: file.name,
                fileSize: file.size,
                mimeType: file.type,
                documentType,
                transferId: parseInt(transferId),
                uploadedAt: new Date().toISOString(),
                status: 'pending_review',
                isRequired: true,
                downloadUrl: `/api/documents/${Date.now()}/download`,
                thumbnailUrl: `/api/documents/${Date.now()}/thumbnail`,
                checksum: Math.random().toString(36).substr(2, 20),
                isEncrypted: false,
                accessLevel: 'restricted'
            };

            mockDocuments.push(newDocument);

            return createResponse(newDocument, true, 'Document uploaded successfully');

        } catch (error) {
            return createResponse(null, false, 'Failed to upload document');
        }
    },

    // Get transfer documents
    getTransferDocuments: async (transferId) => {
        await simulateDelay();

        const documents = findDocumentsByTransfer(transferId);
        return createResponse(documents, true);
    },

    // Verify document (admin only)
    verifyDocument: async (documentId, status, notes = '') => {
        await simulateDelay();

        const document = mockDocuments.find(d => d.id === parseInt(documentId));
        if (!document) {
            return createResponse(null, false, 'Document not found');
        }

        document.status = status;
        document.verifiedAt = new Date().toISOString();
        document.verifiedBy = 'Admin User';
        document.verificationNotes = notes;

        return createResponse(document, true, 'Document verification updated');
    },

    // Download document
    downloadDocument: async (documentId) => {
        await simulateDelay(500, 1500);

        const document = mockDocuments.find(d => d.id === parseInt(documentId));
        if (!document) {
            return createResponse(null, false, 'Document not found');
        }

        // In a real app, this would return the actual file
        return createResponse({
            downloadUrl: document.downloadUrl,
            fileName: document.originalName,
            fileSize: document.fileSize
        }, true);
    }
};

// Payment API
export const paymentAPI = {
    // Process payment
    processPayment: async (transferId, paymentData) => {
        await simulateDelay(2000, 5000);

        try {
            const payment = {
                id: Date.now(),
                transferId: parseInt(transferId),
                amount: paymentData.amount,
                paymentMethod: paymentData.paymentMethod,
                reference: `PAY-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`,
                status: Math.random() > 0.1 ? 'completed' : 'failed', // 90% success rate
                processedAt: new Date().toISOString(),
                gateway: paymentData.paymentMethod === 'credit_card' ? 'Stripe' : 'Bank Transfer'
            };

            if (payment.status === 'failed') {
                return createResponse(payment, false, 'Payment processing failed. Please try again.');
            }

            return createResponse(payment, true, 'Payment processed successfully');

        } catch (error) {
            return createResponse(null, false, 'Payment processing error');
        }
    },

    // Get payment history
    getPaymentHistory: async (userId) => {
        await simulateDelay();

        const userTransfers = findTransfersByUser(userId);
        const payments = userTransfers
            .filter(t => t.fees?.paymentStatus === 'completed')
            .map(t => ({
                id: t.id,
                transferId: t.id,
                applicationNo: t.applicationNo,
                amount: t.fees.totalFees,
                reference: t.fees.paymentReference,
                paidAt: t.fees.paidAt,
                paymentMethod: t.fees.paymentMethod
            }));

        return createResponse(payments, true);
    }
};

// Admin API
export const adminAPI = {
    // Get dashboard statistics
    getDashboardStats: async () => {
        await simulateDelay(800, 1500);

        const stats = {
            users: {
                total: mockUsers.length,
                active: mockUsers.filter(u => u.isActive).length,
                verified: mockUsers.filter(u => u.isVerified).length,
                newThisMonth: mockUsers.filter(u => {
                    const createdDate = new Date(u.createdAt);
                    const thisMonth = new Date();
                    return createdDate.getMonth() === thisMonth.getMonth() &&
                        createdDate.getFullYear() === thisMonth.getFullYear();
                }).length
            },
            vehicles: {
                total: mockVehicles.length,
                active: mockVehicles.filter(v => v.status === 'active').length,
                pendingTransfer: mockVehicles.filter(v => v.status === 'pending_transfer').length
            },
            transfers: {
                total: mockTransfers.length,
                pending: mockTransfers.filter(t => ['submitted', 'under_review'].includes(t.status)).length,
                approved: mockTransfers.filter(t => t.status === 'approved').length,
                completed: mockTransfers.filter(t => t.status === 'completed').length,
                thisMonth: mockTransfers.filter(t => {
                    const submittedDate = new Date(t.submittedAt);
                    const thisMonth = new Date();
                    return submittedDate.getMonth() === thisMonth.getMonth() &&
                        submittedDate.getFullYear() === thisMonth.getFullYear();
                }).length
            },
            revenue: {
                total: mockTransfers.reduce((sum, t) => sum + (t.fees?.totalFees || 0), 0),
                thisMonth: mockTransfers
                    .filter(t => {
                        const submittedDate = new Date(t.submittedAt);
                        const thisMonth = new Date();
                        return submittedDate.getMonth() === thisMonth.getMonth() &&
                            submittedDate.getFullYear() === thisMonth.getFullYear();
                    })
                    .reduce((sum, t) => sum + (t.fees?.totalFees || 0), 0)
            }
        };

        return createResponse(stats, true);
    },

    // Get pending transfers
    getPendingTransfers: async () => {
        await simulateDelay();

        const pendingTransfers = mockTransfers.filter(t =>
            ['submitted', 'under_review', 'documents_required'].includes(t.status)
        );

        return createResponse(pendingTransfers, true);
    },

    // Get recent activity
    getRecentActivity: async (limit = 20) => {
        await simulateDelay();

        const allActivities = mockTransfers.flatMap(transfer =>
            transfer.activityLog.map(activity => ({
                ...activity,
                transferId: transfer.id,
                applicationNo: transfer.applicationNo
            }))
        );

        const recentActivities = allActivities
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .slice(0, limit);

        return createResponse(recentActivities, true);
    }
};

// Export all API modules
export default {
    auth: authAPI,
    user: userAPI,
    vehicle: vehicleAPI,
    transfer: transferAPI,
    document: documentAPI,
    payment: paymentAPI,
    admin: adminAPI
};
