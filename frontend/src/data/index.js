// Mock data exports for TransferEase application
export {
    default as mockUsers,
    findUserByEmail,
    findUserByNIC,
    findUserById,
    findUsersByRole,
    validateUserCredentials,
    getUserStatistics,
    mockVerificationCodes
} from './mockUsers';

export {
    default as mockVehicles,
    findVehicleByRegistration,
    findVehiclesByOwner,
    findVehiclesByStatus,
    findVehiclesByMakeModel,
    getVehicleStatistics,
    getDocumentStatusCounts as getVehicleDocumentStatusCounts,
    getTransferHistory as getVehicleTransferHistory
} from './mockVehicles';

export {
    default as mockTransfers,
    findTransferById,
    findTransferByApplicationNo,
    findTransfersByUser,
    findTransfersByStatus,
    findTransfersByVehicle,
    getTransferStatistics,
    getTransferStatusDisplay,
    getDocumentStatusCounts as getTransferDocumentStatusCounts,
    getRecentActivity
} from './mockTransfers';

export {
    default as mockDocuments,
    documentTypes,
    findDocumentById,
    findDocumentsByTransfer,
    findDocumentsByVehicle,
    findDocumentsByUser,
    findDocumentsByStatus,
    findDocumentsByType,
    validateDocumentType,
    getDocumentStatistics,
    getDocumentStatusDisplay,
    getRequiredDocuments,
    getExpiringDocuments,
    getExpiredDocuments
} from './mockDocuments';
