// Mock Document Service for TransferEase Application
export class MockDocumentService {
    // Simulate network delay
    static async delay(ms = 500) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Get all documents for a user
    static async getUserDocuments(userId) {
        await this.delay();

        // This would typically fetch from an API
        const documents = [
            {
                id: 'DOC-001',
                userId: userId,
                title: 'National Identity Card',
                category: 'personal',
                type: 'image/jpeg',
                size: 2441544, // bytes
                uploadDate: '2024-07-15T10:30:00Z',
                expiryDate: null,
                status: 'active',
                isRequired: true,
                description: 'Copy of National Identity Card for verification',
                vehicleId: null,
                url: '/documents/nic_copy.jpg',
                verificationStatus: 'verified',
                verifiedBy: 'System Admin',
                verifiedDate: '2024-07-15T14:30:00Z',
                tags: ['identity', 'verification']
            },
            {
                id: 'DOC-002',
                userId: userId,
                title: 'Vehicle Registration Certificate',
                category: 'vehicle',
                type: 'application/pdf',
                size: 1887437,
                uploadDate: '2024-07-10T09:15:00Z',
                expiryDate: '2025-07-10T00:00:00Z',
                status: 'active',
                isRequired: true,
                description: 'Registration certificate for ABC-1234',
                vehicleId: 'VEH-001',
                vehicleNo: 'ABC-1234',
                url: '/documents/registration_abc1234.pdf',
                verificationStatus: 'verified',
                verifiedBy: 'Transport Authority',
                verifiedDate: '2024-07-10T16:20:00Z',
                tags: ['vehicle', 'registration']
            },
            {
                id: 'DOC-003',
                userId: userId,
                title: 'Insurance Policy',
                category: 'vehicle',
                type: 'application/pdf',
                size: 3355443,
                uploadDate: '2024-06-20T14:45:00Z',
                expiryDate: '2025-06-20T00:00:00Z',
                status: 'active',
                isRequired: true,
                description: 'Comprehensive insurance policy for ABC-1234',
                vehicleId: 'VEH-001',
                vehicleNo: 'ABC-1234',
                url: '/documents/insurance_abc1234.pdf',
                verificationStatus: 'verified',
                verifiedBy: 'Insurance Company',
                verifiedDate: '2024-06-20T18:30:00Z',
                tags: ['vehicle', 'insurance']
            },
            {
                id: 'DOC-004',
                userId: userId,
                title: 'Driving License',
                category: 'personal',
                type: 'image/png',
                size: 1572864,
                uploadDate: '2024-05-15T11:20:00Z',
                expiryDate: '2026-05-15T00:00:00Z',
                status: 'active',
                isRequired: true,
                description: 'Valid driving license for vehicle operation',
                vehicleId: null,
                url: '/documents/driving_license.png',
                verificationStatus: 'verified',
                verifiedBy: 'DMT Office',
                verifiedDate: '2024-05-15T15:45:00Z',
                tags: ['license', 'driving']
            },
            {
                id: 'DOC-005',
                userId: userId,
                title: 'Business Registration',
                category: 'business',
                type: 'application/pdf',
                size: 2202009,
                uploadDate: '2024-04-10T13:30:00Z',
                expiryDate: null,
                status: 'active',
                isRequired: false,
                description: 'Business registration certificate',
                vehicleId: null,
                url: '/documents/business_reg.pdf',
                verificationStatus: 'pending',
                verifiedBy: null,
                verifiedDate: null,
                tags: ['business', 'registration']
            }
        ];

        return {
            success: true,
            data: documents,
            total: documents.length
        };
    }

    // Upload a new document
    static async uploadDocument(documentData) {
        await this.delay(1500); // Longer delay for upload simulation

        // Simulate validation
        if (!documentData.title || !documentData.category) {
            throw new Error('Title and category are required');
        }

        if (!documentData.file) {
            throw new Error('File is required');
        }

        // Check file size (10MB limit)
        if (documentData.file.size > 10 * 1024 * 1024) {
            throw new Error('File size must be less than 10MB');
        }

        // Check file type
        const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        if (!allowedTypes.includes(documentData.file.type)) {
            throw new Error('Only JPG, PNG, and PDF files are allowed');
        }

        // Create new document
        const newDocument = {
            id: `DOC-${Date.now()}`,
            userId: documentData.userId,
            title: documentData.title,
            category: documentData.category,
            type: documentData.file.type,
            size: documentData.file.size,
            uploadDate: new Date().toISOString(),
            expiryDate: documentData.expiryDate || null,
            status: 'active',
            isRequired: false,
            description: documentData.description || `User uploaded document: ${documentData.title}`,
            vehicleId: documentData.vehicleId || null,
            vehicleNo: documentData.vehicleNo || null,
            url: `#uploaded-${Date.now()}`, // Simulated URL
            verificationStatus: 'pending',
            verifiedBy: null,
            verifiedDate: null,
            tags: documentData.tags || []
        };

        return {
            success: true,
            data: newDocument,
            message: 'Document uploaded successfully'
        };
    }

    // Delete a document
    static async deleteDocument(documentId, userId) {
        await this.delay();

        // Simulate authorization check
        if (!userId) {
            throw new Error('User authentication required');
        }

        return {
            success: true,
            message: 'Document deleted successfully'
        };
    }

    // Update document details
    static async updateDocument(documentId, updates, userId) {
        await this.delay();

        if (!userId) {
            throw new Error('User authentication required');
        }

        const updatedDocument = {
            id: documentId,
            ...updates,
            updatedDate: new Date().toISOString()
        };

        return {
            success: true,
            data: updatedDocument,
            message: 'Document updated successfully'
        };
    }

    // Verify a document (admin only)
    static async verifyDocument(documentId, verificationData, adminId) {
        await this.delay();

        if (!adminId) {
            throw new Error('Admin authentication required');
        }

        const verifiedDocument = {
            verificationStatus: verificationData.status, // 'verified' or 'rejected'
            verifiedBy: verificationData.verifierName,
            verifiedDate: new Date().toISOString(),
            verificationNotes: verificationData.notes || ''
        };

        return {
            success: true,
            data: verifiedDocument,
            message: `Document ${verificationData.status} successfully`
        };
    }

    // Get document statistics
    static async getDocumentStats(userId) {
        await this.delay(300);

        return {
            success: true,
            data: {
                total: 6,
                verified: 4,
                pending: 1,
                expiringSoon: 1,
                byCategory: {
                    personal: 2,
                    vehicle: 3,
                    business: 1,
                    legal: 0
                }
            }
        };
    }

    // Download document
    static async downloadDocument(documentId, userId) {
        await this.delay();

        if (!userId) {
            throw new Error('User authentication required');
        }

        // Simulate file download
        return {
            success: true,
            data: {
                downloadUrl: `#download-${documentId}`,
                fileName: `document-${documentId}.pdf`
            },
            message: 'Document download initiated'
        };
    }

    // Get documents by vehicle
    static async getVehicleDocuments(vehicleId, userId) {
        await this.delay();

        // Filter documents by vehicle
        const allDocs = await this.getUserDocuments(userId);
        const vehicleDocs = allDocs.data.filter(doc => doc.vehicleId === vehicleId);

        return {
            success: true,
            data: vehicleDocs,
            total: vehicleDocs.length
        };
    }

    // Check document requirements
    static async checkRequiredDocuments(userId, userType = 'individual') {
        await this.delay();

        const requiredDocs = {
            individual: [
                { type: 'personal', name: 'National Identity Card', required: true },
                { type: 'personal', name: 'Driving License', required: true }
            ],
            business: [
                { type: 'personal', name: 'National Identity Card', required: true },
                { type: 'business', name: 'Business Registration', required: true },
                { type: 'personal', name: 'Driving License', required: true }
            ]
        };

        const userDocs = await this.getUserDocuments(userId);
        const uploadedTypes = userDocs.data.map(doc => ({ type: doc.category, name: doc.title }));

        const missing = requiredDocs[userType]?.filter(req =>
            !uploadedTypes.some(uploaded =>
                uploaded.name.toLowerCase().includes(req.name.toLowerCase())
            )
        ) || [];

        return {
            success: true,
            data: {
                required: requiredDocs[userType] || [],
                uploaded: uploadedTypes,
                missing: missing,
                isComplete: missing.length === 0
            }
        };
    }
}

export default MockDocumentService;
