// Mock transfer database for TransferEase application
export const mockTransfers = [
    {
        id: 1,
        applicationNo: 'TR-2024-001',

        // Vehicle information
        vehicleId: 3,
        vehicleRegistration: 'GHI-9012',
        vehicleMake: 'BMW',
        vehicleModel: 'X3',
        vehicleYear: 2019,
        chassisNo: 'WDDGF4HB1ER123456',
        engineNo: 'ENG456789123',

        // Current owner
        currentOwnerId: 1,
        currentOwnerName: 'John Doe',
        currentOwnerNIC: '952341234V',
        currentOwnerEmail: 'john.doe@email.com',
        currentOwnerPhone: '+94 77 123 4567',
        currentOwnerAddress: '123 Main Street, Colombo 07',

        // New owner
        newOwnerName: 'Sarah Johnson',
        newOwnerNIC: '891234567V',
        newOwnerEmail: 'sarah.johnson@email.com',
        newOwnerPhone: '+94 76 234 5678',
        newOwnerAddress: '456 Park Avenue, Mount Lavinia',
        newOwnerDistrict: 'Colombo',
        newOwnerProvince: 'Western',

        // Transfer details
        transferType: 'sale',
        transferReason: 'Upgrading to a newer vehicle',
        salePrice: 6200000,
        agreementDate: '2024-07-25T00:00:00.000Z',

        // Application status and timeline
        status: 'under_review',
        priority: 'normal',
        submittedAt: '2024-07-26T09:30:00.000Z',
        lastUpdated: '2024-07-30T14:20:00.000Z',
        expectedCompletion: '2024-08-10T00:00:00.000Z',

        // Processing stages
        stages: [
            {
                id: 1,
                name: 'Application Submitted',
                status: 'completed',
                completedAt: '2024-07-26T09:30:00.000Z',
                notes: 'Application submitted with all required documents'
            },
            {
                id: 2,
                name: 'Document Verification',
                status: 'completed',
                completedAt: '2024-07-28T11:15:00.000Z',
                notes: 'All documents verified successfully'
            },
            {
                id: 3,
                name: 'Background Check',
                status: 'in_progress',
                startedAt: '2024-07-28T11:30:00.000Z',
                notes: 'Running background checks on new owner'
            },
            {
                id: 4,
                name: 'Approval Review',
                status: 'pending',
                notes: 'Waiting for completion of background check'
            },
            {
                id: 5,
                name: 'Final Approval',
                status: 'pending',
                notes: 'Final approval from authorized officer'
            },
            {
                id: 6,
                name: 'Registration Update',
                status: 'pending',
                notes: 'Update vehicle registration with new owner details'
            }
        ],

        // Documents submitted
        documents: {
            vehicleRegistration: {
                fileName: 'vehicle_registration_GHI9012.pdf',
                uploadedAt: '2024-07-26T09:25:00.000Z',
                status: 'verified',
                verifiedBy: 'System Admin',
                verifiedAt: '2024-07-28T10:30:00.000Z'
            },
            currentOwnerNIC: {
                fileName: 'john_doe_nic.pdf',
                uploadedAt: '2024-07-26T09:26:00.000Z',
                status: 'verified',
                verifiedBy: 'System Admin',
                verifiedAt: '2024-07-28T10:35:00.000Z'
            },
            newOwnerNIC: {
                fileName: 'sarah_johnson_nic.pdf',
                uploadedAt: '2024-07-26T09:27:00.000Z',
                status: 'verified',
                verifiedBy: 'System Admin',
                verifiedAt: '2024-07-28T10:40:00.000Z'
            },
            saleAgreement: {
                fileName: 'sale_agreement_signed.pdf',
                uploadedAt: '2024-07-26T09:28:00.000Z',
                status: 'verified',
                verifiedBy: 'Legal Officer',
                verifiedAt: '2024-07-28T11:10:00.000Z'
            },
            insurance: {
                fileName: 'insurance_certificate.pdf',
                uploadedAt: '2024-07-26T09:29:00.000Z',
                status: 'verified',
                verifiedBy: 'System Admin',
                verifiedAt: '2024-07-28T10:45:00.000Z'
            }
        },

        // Financial details
        fees: {
            processingFee: 8500,
            documentationFee: 0,
            expeditedFee: 0,
            totalFees: 8500,
            paidAmount: 8500,
            paymentStatus: 'completed',
            paymentMethod: 'credit_card',
            paymentReference: 'PAY-2024-TR001-CC789',
            paidAt: '2024-07-26T09:35:00.000Z'
        },

        // Activity log
        activityLog: [
            {
                id: 1,
                timestamp: '2024-07-26T09:30:00.000Z',
                action: 'application_submitted',
                performedBy: 'John Doe',
                description: 'Transfer application submitted'
            },
            {
                id: 2,
                timestamp: '2024-07-26T09:35:00.000Z',
                action: 'payment_completed',
                performedBy: 'System',
                description: 'Processing fee payment completed'
            },
            {
                id: 3,
                timestamp: '2024-07-28T10:30:00.000Z',
                action: 'document_verified',
                performedBy: 'System Admin',
                description: 'Vehicle registration document verified'
            },
            {
                id: 4,
                timestamp: '2024-07-28T11:15:00.000Z',
                action: 'documents_approved',
                performedBy: 'System Admin',
                description: 'All documents verified and approved'
            },
            {
                id: 5,
                timestamp: '2024-07-28T11:30:00.000Z',
                action: 'background_check_started',
                performedBy: 'System',
                description: 'Background check initiated for new owner'
            }
        ],

        // Additional information
        estimatedProcessingDays: 15,
        actualProcessingDays: null,
        assignedOfficer: 'Admin User',
        createdAt: '2024-07-26T09:30:00.000Z',
        updatedAt: '2024-07-30T14:20:00.000Z'
    },

    {
        id: 2,
        applicationNo: 'TR-2024-002',

        vehicleId: 2,
        vehicleRegistration: 'DEF-5678',
        vehicleMake: 'Honda',
        vehicleModel: 'Civic',
        vehicleYear: 2020,
        chassisNo: 'WVWZZZ1JZYW123456',
        engineNo: 'ENG987654321',

        currentOwnerId: 1,
        currentOwnerName: 'John Doe',
        currentOwnerNIC: '952341234V',
        currentOwnerEmail: 'john.doe@email.com',
        currentOwnerPhone: '+94 77 123 4567',
        currentOwnerAddress: '123 Main Street, Colombo 07',

        newOwnerName: 'Michael Wilson',
        newOwnerNIC: '923456789V',
        newOwnerEmail: 'michael.wilson@email.com',
        newOwnerPhone: '+94 75 456 7890',
        newOwnerAddress: '789 Kandy Road, Peradeniya',
        newOwnerDistrict: 'Kandy',
        newOwnerProvince: 'Central',

        transferType: 'sale',
        transferReason: 'Financial needs - selling to clear debts',
        salePrice: 3600000,
        agreementDate: '2024-07-20T00:00:00.000Z',

        status: 'documents_required',
        priority: 'high',
        submittedAt: '2024-07-21T14:45:00.000Z',
        lastUpdated: '2024-07-29T16:30:00.000Z',
        expectedCompletion: '2024-08-15T00:00:00.000Z',

        stages: [
            {
                id: 1,
                name: 'Application Submitted',
                status: 'completed',
                completedAt: '2024-07-21T14:45:00.000Z',
                notes: 'Initial application submitted'
            },
            {
                id: 2,
                name: 'Document Verification',
                status: 'action_required',
                startedAt: '2024-07-22T09:00:00.000Z',
                notes: 'Missing new owner NIC copy - requested on 2024-07-29'
            },
            {
                id: 3,
                name: 'Background Check',
                status: 'pending',
                notes: 'Waiting for document verification completion'
            },
            {
                id: 4,
                name: 'Approval Review',
                status: 'pending',
                notes: 'Pending previous stages'
            },
            {
                id: 5,
                name: 'Final Approval',
                status: 'pending',
                notes: 'Pending previous stages'
            },
            {
                id: 6,
                name: 'Registration Update',
                status: 'pending',
                notes: 'Pending previous stages'
            }
        ],

        documents: {
            vehicleRegistration: {
                fileName: 'vehicle_registration_DEF5678.pdf',
                uploadedAt: '2024-07-21T14:40:00.000Z',
                status: 'verified',
                verifiedBy: 'System Admin',
                verifiedAt: '2024-07-22T10:15:00.000Z'
            },
            currentOwnerNIC: {
                fileName: 'john_doe_nic.pdf',
                uploadedAt: '2024-07-21T14:41:00.000Z',
                status: 'verified',
                verifiedBy: 'System Admin',
                verifiedAt: '2024-07-22T10:20:00.000Z'
            },
            newOwnerNIC: {
                fileName: null,
                uploadedAt: null,
                status: 'missing',
                requestedAt: '2024-07-29T16:30:00.000Z',
                notes: 'Document required for processing'
            },
            saleAgreement: {
                fileName: 'sale_agreement_draft.pdf',
                uploadedAt: '2024-07-21T14:42:00.000Z',
                status: 'pending_review',
                notes: 'Waiting for legal review'
            },
            insurance: {
                fileName: 'insurance_policy.pdf',
                uploadedAt: '2024-07-21T14:43:00.000Z',
                status: 'verified',
                verifiedBy: 'System Admin',
                verifiedAt: '2024-07-22T10:25:00.000Z'
            }
        },

        fees: {
            processingFee: 8500,
            documentationFee: 0,
            expeditedFee: 2500,
            totalFees: 11000,
            paidAmount: 11000,
            paymentStatus: 'completed',
            paymentMethod: 'bank_transfer',
            paymentReference: 'PAY-2024-TR002-BT456',
            paidAt: '2024-07-21T15:00:00.000Z'
        },

        activityLog: [
            {
                id: 1,
                timestamp: '2024-07-21T14:45:00.000Z',
                action: 'application_submitted',
                performedBy: 'John Doe',
                description: 'Transfer application submitted with expedited processing'
            },
            {
                id: 2,
                timestamp: '2024-07-21T15:00:00.000Z',
                action: 'payment_completed',
                performedBy: 'System',
                description: 'Processing and expedited fees paid via bank transfer'
            },
            {
                id: 3,
                timestamp: '2024-07-22T10:25:00.000Z',
                action: 'partial_verification',
                performedBy: 'System Admin',
                description: 'Partial document verification completed'
            },
            {
                id: 4,
                timestamp: '2024-07-29T16:30:00.000Z',
                action: 'document_requested',
                performedBy: 'System Admin',
                description: 'Requested new owner NIC copy'
            }
        ],

        estimatedProcessingDays: 10,
        actualProcessingDays: null,
        assignedOfficer: 'Admin User',
        createdAt: '2024-07-21T14:45:00.000Z',
        updatedAt: '2024-07-29T16:30:00.000Z'
    },

    {
        id: 3,
        applicationNo: 'TR-2024-003',

        vehicleId: 1,
        vehicleRegistration: 'ABC-1234',
        vehicleMake: 'Toyota',
        vehicleModel: 'Aqua',
        vehicleYear: 2018,
        chassisNo: 'JT2BF28K050123456',
        engineNo: 'ENG123456789',

        currentOwnerId: 1,
        currentOwnerName: 'John Doe',
        currentOwnerNIC: '952341234V',
        currentOwnerEmail: 'john.doe@email.com',
        currentOwnerPhone: '+94 77 123 4567',
        currentOwnerAddress: '123 Main Street, Colombo 07',

        newOwnerName: 'David Fernando',
        newOwnerNIC: '776543210V',
        newOwnerEmail: 'david.fernando@email.com',
        newOwnerPhone: '+94 71 234 5678',
        newOwnerAddress: '321 Beach Road, Negombo',
        newOwnerDistrict: 'Gampaha',
        newOwnerProvince: 'Western',

        transferType: 'gift',
        transferReason: 'Family gift - transferring to son',
        salePrice: 0,
        agreementDate: '2024-06-15T00:00:00.000Z',

        status: 'completed',
        priority: 'normal',
        submittedAt: '2024-06-16T10:20:00.000Z',
        lastUpdated: '2024-07-05T16:45:00.000Z',
        expectedCompletion: '2024-07-01T00:00:00.000Z',

        stages: [
            {
                id: 1,
                name: 'Application Submitted',
                status: 'completed',
                completedAt: '2024-06-16T10:20:00.000Z',
                notes: 'Gift transfer application submitted'
            },
            {
                id: 2,
                name: 'Document Verification',
                status: 'completed',
                completedAt: '2024-06-18T14:30:00.000Z',
                notes: 'All documents verified successfully'
            },
            {
                id: 3,
                name: 'Background Check',
                status: 'completed',
                completedAt: '2024-06-25T11:15:00.000Z',
                notes: 'Background check completed - no issues found'
            },
            {
                id: 4,
                name: 'Approval Review',
                status: 'completed',
                completedAt: '2024-07-02T09:30:00.000Z',
                notes: 'Application approved by reviewing officer'
            },
            {
                id: 5,
                name: 'Final Approval',
                status: 'completed',
                completedAt: '2024-07-03T15:20:00.000Z',
                notes: 'Final approval granted'
            },
            {
                id: 6,
                name: 'Registration Update',
                status: 'completed',
                completedAt: '2024-07-05T16:45:00.000Z',
                notes: 'Vehicle registration updated with new owner details'
            }
        ],

        documents: {
            vehicleRegistration: {
                fileName: 'vehicle_registration_ABC1234.pdf',
                uploadedAt: '2024-06-16T10:15:00.000Z',
                status: 'verified',
                verifiedBy: 'System Admin',
                verifiedAt: '2024-06-18T13:45:00.000Z'
            },
            currentOwnerNIC: {
                fileName: 'john_doe_nic.pdf',
                uploadedAt: '2024-06-16T10:16:00.000Z',
                status: 'verified',
                verifiedBy: 'System Admin',
                verifiedAt: '2024-06-18T13:50:00.000Z'
            },
            newOwnerNIC: {
                fileName: 'david_fernando_nic.pdf',
                uploadedAt: '2024-06-16T10:17:00.000Z',
                status: 'verified',
                verifiedBy: 'System Admin',
                verifiedAt: '2024-06-18T13:55:00.000Z'
            },
            giftDeclaration: {
                fileName: 'gift_declaration_signed.pdf',
                uploadedAt: '2024-06-16T10:18:00.000Z',
                status: 'verified',
                verifiedBy: 'Legal Officer',
                verifiedAt: '2024-06-18T14:20:00.000Z'
            },
            insurance: {
                fileName: 'insurance_certificate.pdf',
                uploadedAt: '2024-06-16T10:19:00.000Z',
                status: 'verified',
                verifiedBy: 'System Admin',
                verifiedAt: '2024-06-18T14:00:00.000Z'
            }
        },

        fees: {
            processingFee: 8500,
            documentationFee: 0,
            expeditedFee: 0,
            totalFees: 8500,
            paidAmount: 8500,
            paymentStatus: 'completed',
            paymentMethod: 'online',
            paymentReference: 'PAY-2024-TR003-ON123',
            paidAt: '2024-06-16T10:25:00.000Z'
        },

        activityLog: [
            {
                id: 1,
                timestamp: '2024-06-16T10:20:00.000Z',
                action: 'application_submitted',
                performedBy: 'John Doe',
                description: 'Gift transfer application submitted'
            },
            {
                id: 2,
                timestamp: '2024-06-16T10:25:00.000Z',
                action: 'payment_completed',
                performedBy: 'System',
                description: 'Processing fee payment completed online'
            },
            {
                id: 3,
                timestamp: '2024-06-18T14:30:00.000Z',
                action: 'documents_verified',
                performedBy: 'System Admin',
                description: 'All documents verified and approved'
            },
            {
                id: 4,
                timestamp: '2024-07-05T16:45:00.000Z',
                action: 'transfer_completed',
                performedBy: 'System',
                description: 'Vehicle transfer completed successfully'
            }
        ],

        estimatedProcessingDays: 15,
        actualProcessingDays: 19,
        assignedOfficer: 'Admin User',
        completedAt: '2024-07-05T16:45:00.000Z',
        createdAt: '2024-06-16T10:20:00.000Z',
        updatedAt: '2024-07-05T16:45:00.000Z'
    },

    {
        id: 4,
        applicationNo: 'TR-2024-004',

        vehicleId: 5,
        vehicleRegistration: 'MNO-7890',
        vehicleMake: 'Nissan',
        vehicleModel: 'March',
        vehicleYear: 2016,
        chassisNo: 'WBA3A5G50ENP12345',
        engineNo: 'ENG321654987',

        currentOwnerId: 3,
        currentOwnerName: 'Jane Smith',
        currentOwnerNIC: '887654321V',
        currentOwnerEmail: 'jane.smith@email.com',
        currentOwnerPhone: '+94 76 987 6543',
        currentOwnerAddress: '456 Galle Road, Dehiwala',

        newOwnerName: 'Robert Johnson',
        newOwnerNIC: '795432168V',
        newOwnerEmail: 'robert.johnson@email.com',
        newOwnerPhone: '+94 72 345 6789',
        newOwnerAddress: '654 Baseline Road, Colombo 09',
        newOwnerDistrict: 'Colombo',
        newOwnerProvince: 'Western',

        transferType: 'sale',
        transferReason: 'Upgrading to a larger vehicle',
        salePrice: 1650000,
        agreementDate: '2024-07-28T00:00:00.000Z',

        status: 'approved',
        priority: 'normal',
        submittedAt: '2024-07-29T11:15:00.000Z',
        lastUpdated: '2024-07-31T10:30:00.000Z',
        expectedCompletion: '2024-08-12T00:00:00.000Z',

        stages: [
            {
                id: 1,
                name: 'Application Submitted',
                status: 'completed',
                completedAt: '2024-07-29T11:15:00.000Z',
                notes: 'Application submitted with all documents'
            },
            {
                id: 2,
                name: 'Document Verification',
                status: 'completed',
                completedAt: '2024-07-30T15:45:00.000Z',
                notes: 'Fast-track verification completed'
            },
            {
                id: 3,
                name: 'Background Check',
                status: 'completed',
                completedAt: '2024-07-31T09:30:00.000Z',
                notes: 'Background check passed'
            },
            {
                id: 4,
                name: 'Approval Review',
                status: 'completed',
                completedAt: '2024-07-31T10:15:00.000Z',
                notes: 'Application approved for final processing'
            },
            {
                id: 5,
                name: 'Final Approval',
                status: 'completed',
                completedAt: '2024-07-31T10:30:00.000Z',
                notes: 'Final approval granted - ready for registration update'
            },
            {
                id: 6,
                name: 'Registration Update',
                status: 'pending',
                notes: 'Scheduled for processing within 2 business days'
            }
        ],

        documents: {
            vehicleRegistration: {
                fileName: 'vehicle_registration_MNO7890.pdf',
                uploadedAt: '2024-07-29T11:10:00.000Z',
                status: 'verified',
                verifiedBy: 'System Admin',
                verifiedAt: '2024-07-30T14:30:00.000Z'
            },
            currentOwnerNIC: {
                fileName: 'jane_smith_nic.pdf',
                uploadedAt: '2024-07-29T11:11:00.000Z',
                status: 'verified',
                verifiedBy: 'System Admin',
                verifiedAt: '2024-07-30T14:35:00.000Z'
            },
            newOwnerNIC: {
                fileName: 'robert_johnson_nic.pdf',
                uploadedAt: '2024-07-29T11:12:00.000Z',
                status: 'verified',
                verifiedBy: 'System Admin',
                verifiedAt: '2024-07-30T14:40:00.000Z'
            },
            saleAgreement: {
                fileName: 'sale_agreement_executed.pdf',
                uploadedAt: '2024-07-29T11:13:00.000Z',
                status: 'verified',
                verifiedBy: 'Legal Officer',
                verifiedAt: '2024-07-30T15:30:00.000Z'
            },
            insurance: {
                fileName: 'insurance_transfer_cert.pdf',
                uploadedAt: '2024-07-29T11:14:00.000Z',
                status: 'verified',
                verifiedBy: 'System Admin',
                verifiedAt: '2024-07-30T14:45:00.000Z'
            }
        },

        fees: {
            processingFee: 8500,
            documentationFee: 0,
            expeditedFee: 0,
            totalFees: 8500,
            paidAmount: 8500,
            paymentStatus: 'completed',
            paymentMethod: 'credit_card',
            paymentReference: 'PAY-2024-TR004-CC890',
            paidAt: '2024-07-29T11:20:00.000Z'
        },

        activityLog: [
            {
                id: 1,
                timestamp: '2024-07-29T11:15:00.000Z',
                action: 'application_submitted',
                performedBy: 'Jane Smith',
                description: 'Transfer application submitted'
            },
            {
                id: 2,
                timestamp: '2024-07-29T11:20:00.000Z',
                action: 'payment_completed',
                performedBy: 'System',
                description: 'Processing fee paid via credit card'
            },
            {
                id: 3,
                timestamp: '2024-07-30T15:45:00.000Z',
                action: 'documents_verified',
                performedBy: 'System Admin',
                description: 'All documents verified successfully'
            },
            {
                id: 4,
                timestamp: '2024-07-31T10:30:00.000Z',
                action: 'application_approved',
                performedBy: 'Admin User',
                description: 'Application approved for final processing'
            }
        ],

        estimatedProcessingDays: 15,
        actualProcessingDays: null,
        assignedOfficer: 'Admin User',
        createdAt: '2024-07-29T11:15:00.000Z',
        updatedAt: '2024-07-31T10:30:00.000Z'
    }
];

// Transfer lookup functions
export const findTransferById = (id) => {
    return mockTransfers.find(transfer => transfer.id === parseInt(id));
};

export const findTransferByApplicationNo = (applicationNo) => {
    return mockTransfers.find(transfer => transfer.applicationNo === applicationNo);
};

export const findTransfersByUser = (userId) => {
    return mockTransfers.filter(transfer => transfer.currentOwnerId === parseInt(userId));
};

export const findTransfersByStatus = (status) => {
    return mockTransfers.filter(transfer => transfer.status === status);
};

export const findTransfersByVehicle = (vehicleId) => {
    return mockTransfers.filter(transfer => transfer.vehicleId === parseInt(vehicleId));
};

// Transfer statistics
export const getTransferStatistics = () => {
    const totalTransfers = mockTransfers.length;
    const completedTransfers = mockTransfers.filter(t => t.status === 'completed').length;
    const pendingTransfers = mockTransfers.filter(t => t.status !== 'completed' && t.status !== 'rejected').length;
    const rejectedTransfers = mockTransfers.filter(t => t.status === 'rejected').length;

    const transfersByStatus = mockTransfers.reduce((acc, transfer) => {
        acc[transfer.status] = (acc[transfer.status] || 0) + 1;
        return acc;
    }, {});

    const transfersByType = mockTransfers.reduce((acc, transfer) => {
        acc[transfer.transferType] = (acc[transfer.transferType] || 0) + 1;
        return acc;
    }, {});

    const averageProcessingTime = Math.round(
        mockTransfers
            .filter(t => t.actualProcessingDays)
            .reduce((sum, t) => sum + t.actualProcessingDays, 0) /
        mockTransfers.filter(t => t.actualProcessingDays).length || 0
    );

    const totalRevenue = mockTransfers.reduce((sum, transfer) => sum + transfer.fees.totalFees, 0);

    return {
        totalTransfers,
        completedTransfers,
        pendingTransfers,
        rejectedTransfers,
        transfersByStatus,
        transfersByType,
        averageProcessingTime,
        totalRevenue
    };
};

// Transfer status helpers
export const getTransferStatusDisplay = (status) => {
    const statusMap = {
        'submitted': { label: 'Submitted', color: 'blue' },
        'under_review': { label: 'Under Review', color: 'yellow' },
        'documents_required': { label: 'Documents Required', color: 'orange' },
        'approved': { label: 'Approved', color: 'green' },
        'rejected': { label: 'Rejected', color: 'red' },
        'completed': { label: 'Completed', color: 'emerald' },
        'cancelled': { label: 'Cancelled', color: 'gray' }
    };

    return statusMap[status] || { label: 'Unknown', color: 'gray' };
};

// Document status helpers
export const getDocumentStatusCounts = () => {
    const statusCounts = {
        verified: 0,
        pending_review: 0,
        missing: 0,
        rejected: 0
    };

    mockTransfers.forEach(transfer => {
        Object.values(transfer.documents).forEach(doc => {
            if (doc.status && statusCounts.hasOwnProperty(doc.status)) {
                statusCounts[doc.status]++;
            }
        });
    });

    return statusCounts;
};

// Recent activity helpers
export const getRecentActivity = (limit = 10) => {
    const allActivities = mockTransfers.flatMap(transfer =>
        transfer.activityLog.map(activity => ({
            ...activity,
            transferId: transfer.id,
            applicationNo: transfer.applicationNo,
            vehicleRegistration: transfer.vehicleRegistration
        }))
    );

    return allActivities
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, limit);
};

export default mockTransfers;
