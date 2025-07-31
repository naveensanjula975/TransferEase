// Utility functions exports for TransferEase application
export {
    validateEmail,
    validatePassword,
    validateConfirmPassword,
    validateNIC,
    validatePhone,
    validateVehicleRegistration,
    validateChassisNumber,
    validateEngineNumber,
    validateName,
    validateAddress,
    validateAmount,
    validateDate,
    validateFile,
    validateForm,
    required,
    minLength,
    maxLength,
    pattern,
    min,
    max
} from './validation';

export {
    formatCurrency,
    formatNumber,
    formatDate,
    formatTime,
    formatRelativeTime,
    formatPhoneNumber,
    formatVehicleRegistration,
    formatNIC,
    formatFileSize,
    formatPercentage,
    formatTitleCase,
    capitalize,
    truncateText,
    formatAddress,
    formatStatusBadge,
    formatPriority,
    formatDuration,
    formatApplicationNumber,
    maskSensitiveInfo,
    formatTransferType
} from './formatters';

export { default as mockAPI } from './mockAPI';
