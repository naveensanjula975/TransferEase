// Application constants
export const USER_ROLES = {
    USER: 'user',
    ADMIN: 'admin',
    SUPER_ADMIN: 'super_admin'
};

export const TRANSFER_STATUS = {
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled'
};

export const PAYMENT_STATUS = {
    PENDING: 'pending',
    PAID: 'paid',
    FAILED: 'failed',
    REFUNDED: 'refunded'
};

export const VEHICLE_TYPES = [
    'Car',
    'Motorcycle',
    'Van',
    'Bus',
    'Truck',
    'Three Wheeler',
    'Other'
];

export const DOCUMENT_TYPES = {
    VEHICLE_REGISTRATION: 'vehicle_registration',
    OWNER_NIC: 'owner_nic',
    BUYER_NIC: 'buyer_nic',
    INSURANCE_CERTIFICATE: 'insurance_certificate',
    REVENUE_LICENSE: 'revenue_license',
    EMISSION_TEST: 'emission_test',
    OTHER: 'other'
};

export const FILE_UPLOAD_LIMITS = {
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'],
    MAX_FILES_PER_TYPE: 3
};

export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    ADMIN_LOGIN: '/admin/login',
    REGISTER: '/signup',
    DASHBOARD: '/dashboard',
    ADMIN_DASHBOARD: '/admin/dashboard',
    TRANSFERS: '/transfers',
    VEHICLES: '/vehicles',
    OWNERS: '/owners',
    STATISTICS: '/statistics',
    NOTIFICATIONS: '/notifications',
    SETTINGS: '/settings',
    DOWNLOADS: '/downloads',
    TRANSFER_FORM: '/transfer'
};

export const API_ENDPOINTS = {
    // Authentication
    LOGIN: '/api/auth/login',
    ADMIN_LOGIN: '/api/auth/admin-login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    REFRESH_TOKEN: '/api/auth/refresh',

    // Users
    USER_PROFILE: '/api/users/profile',
    UPDATE_PROFILE: '/api/users/profile',

    // Transfers
    TRANSFERS: '/api/transfers',
    CREATE_TRANSFER: '/api/transfers',
    UPDATE_TRANSFER: '/api/transfers',

    // Vehicles
    VEHICLES: '/api/vehicles',
    VEHICLE_DETAILS: '/api/vehicles',

    // File Upload
    UPLOAD_DOCUMENT: '/api/uploads/documents',

    // Admin
    ADMIN_DASHBOARD: '/api/admin/dashboard',
    ADMIN_USERS: '/api/admin/users',
    ADMIN_TRANSFERS: '/api/admin/transfers'
};

export const NOTIFICATION_TYPES = {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info'
};

export const LOCAL_STORAGE_KEYS = {
    AUTH_TOKEN: 'transferease_auth_token',
    USER_DATA: 'transferease_user_data',
    FORM_DATA: 'transferease_form_data',
    THEME: 'transferease_theme'
};

export const FORM_STEPS = {
    VEHICLE_INFO: 1,
    OWNER_INFO: 2,
    BUYER_INFO: 3,
    DOCUMENTS: 4,
    PAYMENT: 5,
    CONFIRMATION: 6
};

export const VALIDATION_MESSAGES = {
    REQUIRED: 'This field is required',
    INVALID_EMAIL: 'Please enter a valid email address',
    INVALID_NIC: 'Please enter a valid NIC number',
    INVALID_PHONE: 'Please enter a valid phone number',
    INVALID_VEHICLE_NUMBER: 'Please enter a valid vehicle number (e.g., ABC-1234)',
    PASSWORD_TOO_SHORT: 'Password must be at least 6 characters',
    PASSWORDS_DONT_MATCH: 'Passwords do not match',
    INVALID_FILE_TYPE: 'Please upload a valid file type (JPEG, PNG, PDF)',
    FILE_TOO_LARGE: 'File size must be less than 5MB'
};
