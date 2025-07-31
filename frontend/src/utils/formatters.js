// Data formatting utilities for TransferEase application

// Currency formatting
export const formatCurrency = (amount, currency = 'LKR', locale = 'en-LK') => {
    if (amount === null || amount === undefined || isNaN(amount)) {
        return `${currency} 0`;
    }

    try {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency === 'LKR' ? 'LKR' : currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    } catch (error) {
        // Fallback for browsers that don't support LKR
        return `${currency} ${Number(amount).toLocaleString()}`;
    }
};

// Number formatting with commas
export const formatNumber = (number, decimals = 0) => {
    if (number === null || number === undefined || isNaN(number)) {
        return '0';
    }

    return Number(number).toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });
};

// Date formatting
export const formatDate = (date, format = 'full') => {
    if (!date) return '';

    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) return '';

    const options = {
        short: { year: 'numeric', month: 'short', day: 'numeric' },
        medium: { year: 'numeric', month: 'short', day: 'numeric', weekday: 'short' },
        full: { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' },
        dateOnly: { year: 'numeric', month: '2-digit', day: '2-digit' },
        timeOnly: { hour: '2-digit', minute: '2-digit' },
        datetime: {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }
    };

    try {
        if (format === 'dateOnly') {
            return dateObj.toLocaleDateString('en-CA'); // YYYY-MM-DD format
        }

        return dateObj.toLocaleDateString('en-US', options[format] || options.full);
    } catch (error) {
        return dateObj.toDateString();
    }
};

// Time formatting
export const formatTime = (date, includeSeconds = false) => {
    if (!date) return '';

    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) return '';

    const options = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    };

    if (includeSeconds) {
        options.second = '2-digit';
    }

    return dateObj.toLocaleTimeString('en-US', options);
};

// Relative time formatting (e.g., "2 hours ago")
export const formatRelativeTime = (date) => {
    if (!date) return '';

    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) return '';

    const now = new Date();
    const diffInSeconds = Math.floor((now - dateObj) / 1000);

    if (diffInSeconds < 60) {
        return 'Just now';
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
        return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
    }

    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) {
        return `${diffInWeeks} week${diffInWeeks === 1 ? '' : 's'} ago`;
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
        return `${diffInMonths} month${diffInMonths === 1 ? '' : 's'} ago`;
    }

    const diffInYears = Math.floor(diffInDays / 365);
    return `${diffInYears} year${diffInYears === 1 ? '' : 's'} ago`;
};

// Phone number formatting
export const formatPhoneNumber = (phone) => {
    if (!phone) return '';

    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '');

    // Handle Sri Lankan numbers
    if (cleaned.startsWith('94')) {
        // International format: +94 77 123 4567
        const country = cleaned.slice(0, 2);
        const operator = cleaned.slice(2, 4);
        const part1 = cleaned.slice(4, 7);
        const part2 = cleaned.slice(7, 11);
        return `+${country} ${operator} ${part1} ${part2}`;
    } else if (cleaned.startsWith('0')) {
        // Local format: 077 123 4567
        const operator = cleaned.slice(0, 3);
        const part1 = cleaned.slice(3, 6);
        const part2 = cleaned.slice(6, 10);
        return `${operator} ${part1} ${part2}`;
    }

    return phone; // Return as-is if format not recognized
};

// Vehicle registration formatting
export const formatVehicleRegistration = (regNo) => {
    if (!regNo) return '';

    // Remove spaces and convert to uppercase
    const cleaned = regNo.replace(/\s/g, '').toUpperCase();

    // Add hyphen if not present
    if (cleaned.length >= 7 && !cleaned.includes('-')) {
        const letters = cleaned.substring(0, cleaned.length - 4);
        const numbers = cleaned.substring(cleaned.length - 4);
        return `${letters}-${numbers}`;
    }

    return cleaned;
};

// NIC formatting
export const formatNIC = (nic) => {
    if (!nic) return '';

    // Remove spaces and convert to uppercase
    const cleaned = nic.replace(/\s/g, '').toUpperCase();

    // Add space before last character for old format
    if (cleaned.length === 10 && /^[0-9]{9}[VX]$/.test(cleaned)) {
        return `${cleaned.slice(0, 9)} ${cleaned.slice(9)}`;
    }

    return cleaned;
};

// File size formatting
export const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    if (!bytes) return '';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Percentage formatting
export const formatPercentage = (value, decimals = 1) => {
    if (value === null || value === undefined || isNaN(value)) {
        return '0%';
    }

    return `${Number(value).toFixed(decimals)}%`;
};

// Title case formatting
export const formatTitleCase = (str) => {
    if (!str) return '';

    return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

// Capitalize first letter
export const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Truncate text with ellipsis
export const truncateText = (text, maxLength = 50, suffix = '...') => {
    if (!text) return '';
    if (text.length <= maxLength) return text;

    return text.substring(0, maxLength - suffix.length) + suffix;
};

// Format address for display
export const formatAddress = (address, maxLines = 2) => {
    if (!address) return '';

    const words = address.split(' ');
    const lines = [];
    let currentLine = '';

    words.forEach(word => {
        if (currentLine.length + word.length + 1 <= 30) {
            currentLine += (currentLine ? ' ' : '') + word;
        } else {
            if (currentLine) lines.push(currentLine);
            currentLine = word;
        }
    });

    if (currentLine) lines.push(currentLine);

    if (lines.length > maxLines) {
        return lines.slice(0, maxLines - 1).join('\n') + '\n...';
    }

    return lines.join('\n');
};

// Status badge formatting
export const formatStatusBadge = (status) => {
    const statusMap = {
        // Transfer statuses
        'submitted': { label: 'Submitted', color: 'blue' },
        'under_review': { label: 'Under Review', color: 'yellow' },
        'documents_required': { label: 'Documents Required', color: 'orange' },
        'approved': { label: 'Approved', color: 'green' },
        'rejected': { label: 'Rejected', color: 'red' },
        'completed': { label: 'Completed', color: 'emerald' },
        'cancelled': { label: 'Cancelled', color: 'gray' },

        // Document statuses
        'verified': { label: 'Verified', color: 'green' },
        'pending_review': { label: 'Pending Review', color: 'yellow' },
        'missing': { label: 'Missing', color: 'red' },
        'expired': { label: 'Expired', color: 'gray' },

        // Vehicle statuses
        'active': { label: 'Active', color: 'green' },
        'pending_transfer': { label: 'Pending Transfer', color: 'yellow' },
        'transferred': { label: 'Transferred', color: 'blue' },
        'impounded': { label: 'Impounded', color: 'red' },

        // User statuses
        'verified': { label: 'Verified', color: 'green' },
        'unverified': { label: 'Unverified', color: 'yellow' },
        'suspended': { label: 'Suspended', color: 'red' },

        // Payment statuses
        'paid': { label: 'Paid', color: 'green' },
        'pending': { label: 'Pending', color: 'yellow' },
        'failed': { label: 'Failed', color: 'red' },
        'refunded': { label: 'Refunded', color: 'blue' }
    };

    return statusMap[status] || { label: capitalize(status), color: 'gray' };
};

// Priority formatting
export const formatPriority = (priority) => {
    const priorityMap = {
        'low': { label: 'Low', color: 'green' },
        'normal': { label: 'Normal', color: 'blue' },
        'high': { label: 'High', color: 'yellow' },
        'urgent': { label: 'Urgent', color: 'red' }
    };

    return priorityMap[priority] || { label: 'Normal', color: 'blue' };
};

// Duration formatting (in days, hours, minutes)
export const formatDuration = (milliseconds) => {
    if (!milliseconds || milliseconds < 0) return '';

    const totalSeconds = Math.floor(milliseconds / 1000);
    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    const parts = [];

    if (days > 0) parts.push(`${days} day${days === 1 ? '' : 's'}`);
    if (hours > 0) parts.push(`${hours} hour${hours === 1 ? '' : 's'}`);
    if (minutes > 0 && days === 0) parts.push(`${minutes} minute${minutes === 1 ? '' : 's'}`);

    if (parts.length === 0) return 'Less than a minute';

    return parts.join(', ');
};

// Application number formatting
export const formatApplicationNumber = (appNo) => {
    if (!appNo) return '';

    // Ensure consistent format: TR-YYYY-XXX
    if (appNo.startsWith('TR-')) {
        return appNo.toUpperCase();
    }

    return `TR-${appNo}`.toUpperCase();
};

// Mask sensitive information
export const maskSensitiveInfo = (text, visibleChars = 4, maskChar = '*') => {
    if (!text || text.length <= visibleChars) return text;

    const visible = text.slice(-visibleChars);
    const masked = maskChar.repeat(text.length - visibleChars);

    return masked + visible;
};

// Format transfer type
export const formatTransferType = (type) => {
    const typeMap = {
        'sale': 'Sale',
        'gift': 'Gift',
        'inheritance': 'Inheritance',
        'lease': 'Lease Transfer',
        'court_order': 'Court Order'
    };

    return typeMap[type] || capitalize(type);
};
