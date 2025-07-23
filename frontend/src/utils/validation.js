// Validation utilities for forms
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validateNIC = (nic) => {
    // Sri Lankan NIC validation (old format: 9 digits + V/X, new format: 12 digits)
    const oldNICRegex = /^\d{9}[vVxX]$/;
    const newNICRegex = /^\d{12}$/;
    return oldNICRegex.test(nic) || newNICRegex.test(nic);
};

export const validatePassword = (password) => {
    // At least 6 characters, contains letters and numbers
    return password.length >= 6 && /^(?=.*[A-Za-z])(?=.*\d)/.test(password);
};

export const validatePhoneNumber = (phone) => {
    // Sri Lankan phone number validation
    const phoneRegex = /^(\+94|0)?[1-9]\d{8}$/;
    return phoneRegex.test(phone);
};

export const validateVehicleNumber = (vehicleNumber) => {
    // Sri Lankan vehicle number format validation
    const vehicleRegex = /^[A-Z]{2,3}-\d{4}$/;
    return vehicleRegex.test(vehicleNumber);
};

export const validateEmployeeId = (employeeId) => {
    // Employee ID format: EM followed by 4+ digits
    const empIdRegex = /^EM\d{4,}$/i;
    return empIdRegex.test(employeeId);
};

// Form validation helper
export const getFieldError = (fieldName, value, rules = {}) => {
    if (rules.required && (!value || value.trim() === '')) {
        return `${fieldName} is required`;
    }

    if (rules.minLength && value.length < rules.minLength) {
        return `${fieldName} must be at least ${rules.minLength} characters`;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
        return `${fieldName} must not exceed ${rules.maxLength} characters`;
    }

    if (rules.pattern && !rules.pattern.test(value)) {
        return rules.patternMessage || `Invalid ${fieldName.toLowerCase()} format`;
    }

    return null;
};
