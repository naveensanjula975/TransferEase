// Date and number formatting utilities
export const formatDate = (date, options = {}) => {
    const defaultOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        ...options
    };

    return new Date(date).toLocaleDateString('en-US', defaultOptions);
};

export const formatCurrency = (amount, currency = 'LKR') => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2
    }).format(amount);
};

export const formatPhoneNumber = (phone) => {
    // Format Sri Lankan phone numbers
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10 && cleaned.startsWith('0')) {
        return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
    }
    if (cleaned.length === 9) {
        return `0${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5)}`;
    }
    return phone;
};

export const formatVehicleNumber = (vehicleNumber) => {
    // Ensure proper vehicle number formatting
    return vehicleNumber.toUpperCase().replace(/\s+/g, '');
};

export const formatNIC = (nic) => {
    // Format NIC with proper spacing
    if (nic.length === 10) {
        return `${nic.slice(0, 9)}${nic.slice(9).toUpperCase()}`;
    }
    return nic;
};

export const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const truncateText = (text, maxLength = 50) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
};

export const capitalizeFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const capitalizeWords = (str) => {
    return str.replace(/\w\S*/g, (txt) =>
        txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
};
