// Mock document database for TransferEase application
export const mockDocuments = [
    {
        id: 1,
        fileName: 'vehicle_registration_ABC1234.pdf',
        originalName: 'Vehicle Registration Certificate.pdf',
        fileSize: 245760, // 240 KB
        mimeType: 'application/pdf',

        // Document metadata
        documentType: 'vehicle_registration',
        vehicleId: 1,
        vehicleRegistration: 'ABC-1234',
        transferId: 3,
        applicationNo: 'TR-2024-003',

        // Upload details
        uploadedBy: 'John Doe',
        uploadedByUserId: 1,
        uploadedAt: '2024-06-16T10:15:00.000Z',

        // Verification details
        status: 'verified',
        verifiedBy: 'System Admin',
        verifiedByUserId: 2,
        verifiedAt: '2024-06-18T13:45:00.000Z',
        verificationNotes: 'Document is valid and matches vehicle records',

        // Document properties
        isRequired: true,
        expiryDate: '2025-03-15T00:00:00.000Z',
        issuedDate: '2020-03-15T00:00:00.000Z',
        issuingAuthority: 'Department of Motor Traffic',

        // File properties
        downloadUrl: '/api/documents/1/download',
        thumbnailUrl: '/api/documents/1/thumbnail',
        pageCount: 2,

        // Security
        checksum: 'a1b2c3d4e5f6g7h8i9j0',
        isEncrypted: false,
        accessLevel: 'restricted',

        createdAt: '2024-06-16T10:15:00.000Z',
        updatedAt: '2024-06-18T13:45:00.000Z'
    },

    {
        id: 2,
        fileName: 'john_doe_nic.pdf',
        originalName: 'NIC Copy - John Doe.pdf',
        fileSize: 189440, // 185 KB
        mimeType: 'application/pdf',

        documentType: 'current_owner_nic',
        vehicleId: 1,
        vehicleRegistration: 'ABC-1234',
        transferId: 3,
        applicationNo: 'TR-2024-003',

        uploadedBy: 'John Doe',
        uploadedByUserId: 1,
        uploadedAt: '2024-06-16T10:16:00.000Z',

        status: 'verified',
        verifiedBy: 'System Admin',
        verifiedByUserId: 2,
        verifiedAt: '2024-06-18T13:50:00.000Z',
        verificationNotes: 'NIC details match owner records',

        isRequired: true,
        expiryDate: null, // NIC doesn't expire
        issuedDate: '2015-05-20T00:00:00.000Z',
        issuingAuthority: 'Department of Registration of Persons',

        downloadUrl: '/api/documents/2/download',
        thumbnailUrl: '/api/documents/2/thumbnail',
        pageCount: 1,

        checksum: 'b2c3d4e5f6g7h8i9j0k1',
        isEncrypted: false,
        accessLevel: 'restricted',

        createdAt: '2024-06-16T10:16:00.000Z',
        updatedAt: '2024-06-18T13:50:00.000Z'
    },

    {
        id: 3,
        fileName: 'david_fernando_nic.pdf',
        originalName: 'NIC Copy - David Fernando.pdf',
        fileSize: 195584, // 191 KB
        mimeType: 'application/pdf',

        documentType: 'new_owner_nic',
        vehicleId: 1,
        vehicleRegistration: 'ABC-1234',
        transferId: 3,
        applicationNo: 'TR-2024-003',

        uploadedBy: 'John Doe',
        uploadedByUserId: 1,
        uploadedAt: '2024-06-16T10:17:00.000Z',

        status: 'verified',
        verifiedBy: 'System Admin',
        verifiedByUserId: 2,
        verifiedAt: '2024-06-18T13:55:00.000Z',
        verificationNotes: 'New owner NIC verified successfully',

        isRequired: true,
        expiryDate: null,
        issuedDate: '1995-03-18T00:00:00.000Z',
        issuingAuthority: 'Department of Registration of Persons',

        downloadUrl: '/api/documents/3/download',
        thumbnailUrl: '/api/documents/3/thumbnail',
        pageCount: 1,

        checksum: 'c3d4e5f6g7h8i9j0k1l2',
        isEncrypted: false,
        accessLevel: 'restricted',

        createdAt: '2024-06-16T10:17:00.000Z',
        updatedAt: '2024-06-18T13:55:00.000Z'
    },

    {
        id: 4,
        fileName: 'gift_declaration_signed.pdf',
        originalName: 'Gift Declaration Form - Signed.pdf',
        fileSize: 156672, // 153 KB
        mimeType: 'application/pdf',

        documentType: 'gift_declaration',
        vehicleId: 1,
        vehicleRegistration: 'ABC-1234',
        transferId: 3,
        applicationNo: 'TR-2024-003',

        uploadedBy: 'John Doe',
        uploadedByUserId: 1,
        uploadedAt: '2024-06-16T10:18:00.000Z',

        status: 'verified',
        verifiedBy: 'Legal Officer',
        verifiedByUserId: 2,
        verifiedAt: '2024-06-18T14:20:00.000Z',
        verificationNotes: 'Gift declaration properly executed with signatures',

        isRequired: true,
        expiryDate: null,
        issuedDate: '2024-06-15T00:00:00.000Z',
        issuingAuthority: 'Self-Declaration',

        downloadUrl: '/api/documents/4/download',
        thumbnailUrl: '/api/documents/4/thumbnail',
        pageCount: 3,

        checksum: 'd4e5f6g7h8i9j0k1l2m3',
        isEncrypted: false,
        accessLevel: 'restricted',

        createdAt: '2024-06-16T10:18:00.000Z',
        updatedAt: '2024-06-18T14:20:00.000Z'
    },

    {
        id: 5,
        fileName: 'insurance_certificate.pdf',
        originalName: 'Insurance Certificate.pdf',
        fileSize: 223232, // 218 KB
        mimeType: 'application/pdf',

        documentType: 'insurance',
        vehicleId: 1,
        vehicleRegistration: 'ABC-1234',
        transferId: 3,
        applicationNo: 'TR-2024-003',

        uploadedBy: 'John Doe',
        uploadedByUserId: 1,
        uploadedAt: '2024-06-16T10:19:00.000Z',

        status: 'verified',
        verifiedBy: 'System Admin',
        verifiedByUserId: 2,
        verifiedAt: '2024-06-18T14:00:00.000Z',
        verificationNotes: 'Valid insurance certificate',

        isRequired: true,
        expiryDate: '2025-02-28T00:00:00.000Z',
        issuedDate: '2024-03-01T00:00:00.000Z',
        issuingAuthority: 'Ceylinco Insurance',

        downloadUrl: '/api/documents/5/download',
        thumbnailUrl: '/api/documents/5/thumbnail',
        pageCount: 1,

        checksum: 'e5f6g7h8i9j0k1l2m3n4',
        isEncrypted: false,
        accessLevel: 'restricted',

        createdAt: '2024-06-16T10:19:00.000Z',
        updatedAt: '2024-06-18T14:00:00.000Z'
    },

    {
        id: 6,
        fileName: 'vehicle_registration_GHI9012.pdf',
        originalName: 'Vehicle Registration - BMW X3.pdf',
        fileSize: 267264, // 261 KB
        mimeType: 'application/pdf',

        documentType: 'vehicle_registration',
        vehicleId: 3,
        vehicleRegistration: 'GHI-9012',
        transferId: 1,
        applicationNo: 'TR-2024-001',

        uploadedBy: 'John Doe',
        uploadedByUserId: 1,
        uploadedAt: '2024-07-26T09:25:00.000Z',

        status: 'verified',
        verifiedBy: 'System Admin',
        verifiedByUserId: 2,
        verifiedAt: '2024-07-28T10:30:00.000Z',
        verificationNotes: 'Registration document verified',

        isRequired: true,
        expiryDate: '2024-07-22T00:00:00.000Z',
        issuedDate: '2019-07-22T00:00:00.000Z',
        issuingAuthority: 'Department of Motor Traffic',

        downloadUrl: '/api/documents/6/download',
        thumbnailUrl: '/api/documents/6/thumbnail',
        pageCount: 2,

        checksum: 'f6g7h8i9j0k1l2m3n4o5',
        isEncrypted: false,
        accessLevel: 'restricted',

        createdAt: '2024-07-26T09:25:00.000Z',
        updatedAt: '2024-07-28T10:30:00.000Z'
    },

    {
        id: 7,
        fileName: 'sale_agreement_signed.pdf',
        originalName: 'Vehicle Sale Agreement - BMW X3.pdf',
        fileSize: 312320, // 305 KB
        mimeType: 'application/pdf',

        documentType: 'sale_agreement',
        vehicleId: 3,
        vehicleRegistration: 'GHI-9012',
        transferId: 1,
        applicationNo: 'TR-2024-001',

        uploadedBy: 'John Doe',
        uploadedByUserId: 1,
        uploadedAt: '2024-07-26T09:28:00.000Z',

        status: 'verified',
        verifiedBy: 'Legal Officer',
        verifiedByUserId: 2,
        verifiedAt: '2024-07-28T11:10:00.000Z',
        verificationNotes: 'Sale agreement properly executed',

        isRequired: true,
        expiryDate: null,
        issuedDate: '2024-07-25T00:00:00.000Z',
        issuingAuthority: 'Private Agreement',

        downloadUrl: '/api/documents/7/download',
        thumbnailUrl: '/api/documents/7/thumbnail',
        pageCount: 4,

        checksum: 'g7h8i9j0k1l2m3n4o5p6',
        isEncrypted: false,
        accessLevel: 'restricted',

        createdAt: '2024-07-26T09:28:00.000Z',
        updatedAt: '2024-07-28T11:10:00.000Z'
    },

    {
        id: 8,
        fileName: 'pending_nic_document.pdf',
        originalName: 'New Owner NIC - Pending.pdf',
        fileSize: 0, // Not uploaded yet
        mimeType: null,

        documentType: 'new_owner_nic',
        vehicleId: 2,
        vehicleRegistration: 'DEF-5678',
        transferId: 2,
        applicationNo: 'TR-2024-002',

        uploadedBy: null,
        uploadedByUserId: null,
        uploadedAt: null,

        status: 'missing',
        verifiedBy: null,
        verifiedByUserId: null,
        verifiedAt: null,
        verificationNotes: null,
        requestedAt: '2024-07-29T16:30:00.000Z',

        isRequired: true,
        expiryDate: null,
        issuedDate: null,
        issuingAuthority: 'Department of Registration of Persons',

        downloadUrl: null,
        thumbnailUrl: null,
        pageCount: null,

        checksum: null,
        isEncrypted: false,
        accessLevel: 'restricted',

        createdAt: '2024-07-21T14:45:00.000Z',
        updatedAt: '2024-07-29T16:30:00.000Z'
    }
];

// Document type definitions
export const documentTypes = {
    vehicle_registration: {
        label: 'Vehicle Registration Certificate',
        required: true,
        acceptedFormats: ['pdf', 'jpg', 'jpeg', 'png'],
        maxSize: 5242880, // 5MB
        description: 'Current vehicle registration certificate'
    },
    current_owner_nic: {
        label: 'Current Owner NIC Copy',
        required: true,
        acceptedFormats: ['pdf', 'jpg', 'jpeg', 'png'],
        maxSize: 2097152, // 2MB
        description: 'Clear copy of current owner\'s National Identity Card'
    },
    new_owner_nic: {
        label: 'New Owner NIC Copy',
        required: true,
        acceptedFormats: ['pdf', 'jpg', 'jpeg', 'png'],
        maxSize: 2097152, // 2MB
        description: 'Clear copy of new owner\'s National Identity Card'
    },
    sale_agreement: {
        label: 'Sale Agreement',
        required: true, // Only for sale transfers
        acceptedFormats: ['pdf'],
        maxSize: 10485760, // 10MB
        description: 'Signed sale agreement between parties'
    },
    gift_declaration: {
        label: 'Gift Declaration',
        required: true, // Only for gift transfers
        acceptedFormats: ['pdf'],
        maxSize: 5242880, // 5MB
        description: 'Signed gift declaration form'
    },
    inheritance_proof: {
        label: 'Inheritance Documentation',
        required: true, // Only for inheritance transfers
        acceptedFormats: ['pdf'],
        maxSize: 10485760, // 10MB
        description: 'Legal documents proving inheritance rights'
    },
    insurance: {
        label: 'Insurance Certificate',
        required: true,
        acceptedFormats: ['pdf', 'jpg', 'jpeg', 'png'],
        maxSize: 3145728, // 3MB
        description: 'Valid insurance certificate for the vehicle'
    },
    tax_clearance: {
        label: 'Tax Clearance Certificate',
        required: false,
        acceptedFormats: ['pdf'],
        maxSize: 3145728, // 3MB
        description: 'Tax clearance certificate (if applicable)'
    },
    inspection_report: {
        label: 'Vehicle Inspection Report',
        required: false,
        acceptedFormats: ['pdf'],
        maxSize: 5242880, // 5MB
        description: 'Recent vehicle inspection report'
    }
};

// Document lookup functions
export const findDocumentById = (id) => {
    return mockDocuments.find(doc => doc.id === parseInt(id));
};

export const findDocumentsByTransfer = (transferId) => {
    return mockDocuments.filter(doc => doc.transferId === parseInt(transferId));
};

export const findDocumentsByVehicle = (vehicleId) => {
    return mockDocuments.filter(doc => doc.vehicleId === parseInt(vehicleId));
};

export const findDocumentsByStatus = (status) => {
    return mockDocuments.filter(doc => doc.status === status);
};

export const findDocumentsByType = (type) => {
    return mockDocuments.filter(doc => doc.documentType === type);
};

export const findDocumentsByUser = (userId) => {
    return mockDocuments.filter(doc => doc.uploadedByUserId === userId);
};

// Document validation functions
export const validateDocumentType = (file, documentType) => {
    const typeConfig = documentTypes[documentType];
    if (!typeConfig) {
        return { isValid: false, error: 'Invalid document type' };
    }

    // Check file size
    if (file.size > typeConfig.maxSize) {
        return {
            isValid: false,
            error: `File size exceeds maximum allowed size of ${(typeConfig.maxSize / 1024 / 1024).toFixed(1)}MB`
        };
    }

    // Check file format
    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (!typeConfig.acceptedFormats.includes(fileExtension)) {
        return {
            isValid: false,
            error: `File format not supported. Accepted formats: ${typeConfig.acceptedFormats.join(', ')}`
        };
    }

    return { isValid: true };
};

// Document statistics
export const getDocumentStatistics = () => {
    const totalDocuments = mockDocuments.length;
    const verifiedDocuments = mockDocuments.filter(doc => doc.status === 'verified').length;
    const pendingDocuments = mockDocuments.filter(doc => doc.status === 'pending_review').length;
    const missingDocuments = mockDocuments.filter(doc => doc.status === 'missing').length;
    const rejectedDocuments = mockDocuments.filter(doc => doc.status === 'rejected').length;

    const documentsByType = mockDocuments.reduce((acc, doc) => {
        acc[doc.documentType] = (acc[doc.documentType] || 0) + 1;
        return acc;
    }, {});

    const documentsByStatus = mockDocuments.reduce((acc, doc) => {
        acc[doc.status] = (acc[doc.status] || 0) + 1;
        return acc;
    }, {});

    const averageFileSize = Math.round(
        mockDocuments
            .filter(doc => doc.fileSize > 0)
            .reduce((sum, doc) => sum + doc.fileSize, 0) /
        mockDocuments.filter(doc => doc.fileSize > 0).length || 0
    );

    return {
        totalDocuments,
        verifiedDocuments,
        pendingDocuments,
        missingDocuments,
        rejectedDocuments,
        documentsByType,
        documentsByStatus,
        averageFileSize
    };
};

// Document status helpers
export const getDocumentStatusDisplay = (status) => {
    const statusMap = {
        'verified': { label: 'Verified', color: 'green', icon: 'CheckCircle' },
        'pending_review': { label: 'Pending Review', color: 'yellow', icon: 'Clock' },
        'missing': { label: 'Missing', color: 'red', icon: 'AlertCircle' },
        'rejected': { label: 'Rejected', color: 'red', icon: 'XCircle' },
        'expired': { label: 'Expired', color: 'gray', icon: 'Calendar' }
    };

    return statusMap[status] || { label: 'Unknown', color: 'gray', icon: 'FileText' };
};

// Required documents for transfer types
export const getRequiredDocuments = (transferType) => {
    const baseDocuments = [
        'vehicle_registration',
        'current_owner_nic',
        'new_owner_nic',
        'insurance'
    ];

    switch (transferType) {
        case 'sale':
            return [...baseDocuments, 'sale_agreement'];
        case 'gift':
            return [...baseDocuments, 'gift_declaration'];
        case 'inheritance':
            return [...baseDocuments, 'inheritance_proof'];
        default:
            return baseDocuments;
    }
};

// Document expiry helpers
export const getExpiringDocuments = (daysAhead = 30) => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() + daysAhead);

    return mockDocuments.filter(doc => {
        if (!doc.expiryDate) return false;
        return new Date(doc.expiryDate) <= cutoffDate && new Date(doc.expiryDate) > new Date();
    });
};

export const getExpiredDocuments = () => {
    return mockDocuments.filter(doc => {
        if (!doc.expiryDate) return false;
        return new Date(doc.expiryDate) < new Date();
    });
};

export default mockDocuments;
