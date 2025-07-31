// Form validation rules and utilities for TransferEase application

// Email validation
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        return { isValid: false, error: 'Email is required' };
    }

    if (!emailRegex.test(email)) {
        return { isValid: false, error: 'Please enter a valid email address' };
    }

    return { isValid: true };
};

// Password validation
export const validatePassword = (password) => {
    if (!password) {
        return { isValid: false, error: 'Password is required' };
    }

    if (password.length < 8) {
        return { isValid: false, error: 'Password must be at least 8 characters long' };
    }

    if (!/(?=.*[a-z])/.test(password)) {
        return { isValid: false, error: 'Password must contain at least one lowercase letter' };
    }

    if (!/(?=.*[A-Z])/.test(password)) {
        return { isValid: false, error: 'Password must contain at least one uppercase letter' };
    }

    if (!/(?=.*\d)/.test(password)) {
        return { isValid: false, error: 'Password must contain at least one number' };
    }

    return { isValid: true };
};

// Confirm password validation
export const validateConfirmPassword = (password, confirmPassword) => {
    if (!confirmPassword) {
        return { isValid: false, error: 'Please confirm your password' };
    }

    if (password !== confirmPassword) {
        return { isValid: false, error: 'Passwords do not match' };
    }

    return { isValid: true };
};

// NIC validation for Sri Lankan National Identity Cards
export const validateNIC = (nic) => {
    if (!nic) {
        return { isValid: false, error: 'NIC is required' };
    }

    // Remove spaces and convert to uppercase
    const cleanNIC = nic.replace(/\s/g, '').toUpperCase();

    // Old format: 9 digits + V/X (e.g., 952341234V)
    const oldFormat = /^[0-9]{9}[VvXx]$/;

    // New format: 12 digits (e.g., 199523412345)
    const newFormat = /^[0-9]{12}$/;

    if (!oldFormat.test(cleanNIC) && !newFormat.test(cleanNIC)) {
        return {
            isValid: false,
            error: 'Please enter a valid NIC number (9 digits + V/X or 12 digits)'
        };
    }

    // Additional validation for birth year
    if (oldFormat.test(cleanNIC)) {
        const year = parseInt(cleanNIC.substring(0, 2));
        const days = parseInt(cleanNIC.substring(2, 5));

        // Check if days are in valid range (1-366 for males, 501-866 for females)
        if ((days < 1 || days > 366) && (days < 501 || days > 866)) {
            return { isValid: false, error: 'Invalid NIC format - incorrect day value' };
        }
    } else if (newFormat.test(cleanNIC)) {
        const year = parseInt(cleanNIC.substring(0, 4));
        const days = parseInt(cleanNIC.substring(4, 7));

        // Check year range (should be reasonable birth year)
        if (year < 1900 || year > new Date().getFullYear()) {
            return { isValid: false, error: 'Invalid NIC format - incorrect year' };
        }

        // Check if days are in valid range
        if ((days < 1 || days > 366) && (days < 501 || days > 866)) {
            return { isValid: false, error: 'Invalid NIC format - incorrect day value' };
        }
    }

    return { isValid: true };
};

// Phone number validation for Sri Lankan numbers
export const validatePhone = (phone) => {
    if (!phone) {
        return { isValid: false, error: 'Phone number is required' };
    }

    // Remove spaces, hyphens, and plus signs
    const cleanPhone = phone.replace(/[\s\-\+]/g, '');

    // Sri Lankan mobile numbers: 94771234567 or 0771234567
    const mobilePattern = /^(94|0)?[7][0-9]{8}$/;

    // Sri Lankan landline numbers: 94112345678 or 0112345678
    const landlinePattern = /^(94|0)?[1-9][1-9][0-9]{7}$/;

    if (!mobilePattern.test(cleanPhone) && !landlinePattern.test(cleanPhone)) {
        return {
            isValid: false,
            error: 'Please enter a valid Sri Lankan phone number'
        };
    }

    return { isValid: true };
};

// Vehicle registration number validation
export const validateVehicleRegistration = (regNo) => {
    if (!regNo) {
        return { isValid: false, error: 'Vehicle registration number is required' };
    }

    // Remove spaces and convert to uppercase
    const cleanRegNo = regNo.replace(/\s/g, '').toUpperCase();

    // Sri Lankan vehicle registration patterns:
    // Old format: ABC-1234
    // New format: ABC-1234 or ABCD-1234
    const regPattern = /^[A-Z]{2,4}-[0-9]{4}$/;

    if (!regPattern.test(cleanRegNo)) {
        return {
            isValid: false,
            error: 'Please enter a valid vehicle registration number (e.g., ABC-1234)'
        };
    }

    return { isValid: true };
};

// Chassis number validation
export const validateChassisNumber = (chassisNo) => {
    if (!chassisNo) {
        return { isValid: false, error: 'Chassis number is required' };
    }

    // Remove spaces and convert to uppercase
    const cleanChassisNo = chassisNo.replace(/\s/g, '').toUpperCase();

    // Standard VIN format: 17 characters (letters and numbers, no I, O, Q)
    const vinPattern = /^[A-HJ-NPR-Z0-9]{17}$/;

    if (!vinPattern.test(cleanChassisNo)) {
        return {
            isValid: false,
            error: 'Please enter a valid 17-character chassis number'
        };
    }

    return { isValid: true };
};

// Engine number validation
export const validateEngineNumber = (engineNo) => {
    if (!engineNo) {
        return { isValid: false, error: 'Engine number is required' };
    }

    // Engine numbers can vary but typically 6-17 alphanumeric characters
    const cleanEngineNo = engineNo.replace(/\s/g, '').toUpperCase();

    if (cleanEngineNo.length < 6 || cleanEngineNo.length > 17) {
        return {
            isValid: false,
            error: 'Engine number must be between 6 and 17 characters'
        };
    }

    // Should contain only letters and numbers
    if (!/^[A-Z0-9]+$/.test(cleanEngineNo)) {
        return {
            isValid: false,
            error: 'Engine number should contain only letters and numbers'
        };
    }

    return { isValid: true };
};

// Name validation
export const validateName = (name, fieldName = 'Name') => {
    if (!name) {
        return { isValid: false, error: `${fieldName} is required` };
    }

    if (name.trim().length < 2) {
        return { isValid: false, error: `${fieldName} must be at least 2 characters long` };
    }

    if (name.trim().length > 100) {
        return { isValid: false, error: `${fieldName} must not exceed 100 characters` };
    }

    // Should contain only letters, spaces, hyphens, and apostrophes
    if (!/^[a-zA-Z\s\-'\.]+$/.test(name)) {
        return {
            isValid: false,
            error: `${fieldName} should contain only letters, spaces, hyphens, and apostrophes`
        };
    }

    return { isValid: true };
};

// Address validation
export const validateAddress = (address) => {
    if (!address) {
        return { isValid: false, error: 'Address is required' };
    }

    if (address.trim().length < 10) {
        return { isValid: false, error: 'Please enter a complete address' };
    }

    if (address.trim().length > 500) {
        return { isValid: false, error: 'Address must not exceed 500 characters' };
    }

    return { isValid: true };
};

// Amount validation (for sale price, etc.)
export const validateAmount = (amount, fieldName = 'Amount', min = 0, max = null) => {
    if (!amount && amount !== 0) {
        return { isValid: false, error: `${fieldName} is required` };
    }

    const numAmount = parseFloat(amount);

    if (isNaN(numAmount)) {
        return { isValid: false, error: `${fieldName} must be a valid number` };
    }

    if (numAmount < min) {
        return { isValid: false, error: `${fieldName} must be at least ${min.toLocaleString()}` };
    }

    if (max && numAmount > max) {
        return { isValid: false, error: `${fieldName} must not exceed ${max.toLocaleString()}` };
    }

    return { isValid: true };
};

// Date validation
export const validateDate = (date, fieldName = 'Date', allowFuture = true, allowPast = true) => {
    if (!date) {
        return { isValid: false, error: `${fieldName} is required` };
    }

    const dateObj = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(dateObj.getTime())) {
        return { isValid: false, error: `Please enter a valid ${fieldName.toLowerCase()}` };
    }

    if (!allowPast && dateObj < today) {
        return { isValid: false, error: `${fieldName} cannot be in the past` };
    }

    if (!allowFuture && dateObj > today) {
        return { isValid: false, error: `${fieldName} cannot be in the future` };
    }

    return { isValid: true };
};

// File validation
export const validateFile = (file, allowedTypes = [], maxSize = 5242880) => {
    if (!file) {
        return { isValid: false, error: 'File is required' };
    }

    if (file.size > maxSize) {
        return {
            isValid: false,
            error: `File size must not exceed ${(maxSize / 1024 / 1024).toFixed(1)}MB`
        };
    }

    if (allowedTypes.length > 0) {
        const fileExtension = file.name.split('.').pop().toLowerCase();
        if (!allowedTypes.includes(fileExtension)) {
            return {
                isValid: false,
                error: `File type not allowed. Accepted types: ${allowedTypes.join(', ')}`
            };
        }
    }

    return { isValid: true };
};

// Form validation utility
export const validateForm = (data, rules) => {
    const errors = {};
    let isValid = true;

    for (const [field, fieldRules] of Object.entries(rules)) {
        const value = data[field];

        for (const rule of fieldRules) {
            const result = rule(value);
            if (!result.isValid) {
                errors[field] = result.error;
                isValid = false;
                break; // Stop at first error for this field
            }
        }
    }

    return { isValid, errors };
};

// Common validation rule builders
export const required = (fieldName = 'Field') => (value) => {
    if (!value || (typeof value === 'string' && !value.trim())) {
        return { isValid: false, error: `${fieldName} is required` };
    }
    return { isValid: true };
};

export const minLength = (min, fieldName = 'Field') => (value) => {
    if (value && value.length < min) {
        return { isValid: false, error: `${fieldName} must be at least ${min} characters long` };
    }
    return { isValid: true };
};

export const maxLength = (max, fieldName = 'Field') => (value) => {
    if (value && value.length > max) {
        return { isValid: false, error: `${fieldName} must not exceed ${max} characters` };
    }
    return { isValid: true };
};

export const pattern = (regex, errorMessage) => (value) => {
    if (value && !regex.test(value)) {
        return { isValid: false, error: errorMessage };
    }
    return { isValid: true };
};

export const min = (minValue, fieldName = 'Value') => (value) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue < minValue) {
        return { isValid: false, error: `${fieldName} must be at least ${minValue}` };
    }
    return { isValid: true };
};

export const max = (maxValue, fieldName = 'Value') => (value) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > maxValue) {
        return { isValid: false, error: `${fieldName} must not exceed ${maxValue}` };
    }
    return { isValid: true };
};
