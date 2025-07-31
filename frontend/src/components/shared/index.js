// Shared UI Components Index
// This file exports all shared components for easy importing throughout the application

// Button Components
export { default as Button } from './Button';
export { PrimaryButton, SecondaryButton, DangerButton, SuccessButton, WarningButton, IconButton } from './Button';

// Input Components
export { default as Input } from './Input';
export { Textarea, Select } from './Input';

// Modal Components
export { default as Modal } from './Modal';
export { ConfirmModal, AlertModal } from './Modal';

// Loading Components
export { default as LoadingSpinner } from './LoadingSpinner';
export { PulseLoader, Skeleton, ProgressBar, ButtonLoader } from './LoadingSpinner';

// File Upload
export { default as FileUpload } from './FileUpload';

// Data Table
export { default as DataTable } from './DataTable';

// Toast Components
export { default as Toast } from './Toast';
export { ToastProvider, useToast, SimpleToast } from './Toast';

// Breadcrumb Components
export { default as Breadcrumb } from './Breadcrumb';
export { BreadcrumbItem, SimpleBreadcrumb } from './Breadcrumb';

// Card Components
export { default as Card } from './Card';
export { CardHeader, CardBody, CardFooter, StatCard, InfoCard } from './Card';

// Re-export all components as named exports for convenience
import Button, { PrimaryButton, SecondaryButton, DangerButton, SuccessButton, WarningButton, IconButton } from './Button';
import Input, { Textarea, Select } from './Input';
import Modal, { ConfirmModal, AlertModal } from './Modal';
import LoadingSpinner, { PulseLoader, Skeleton, ProgressBar, ButtonLoader } from './LoadingSpinner';
import FileUpload from './FileUpload';
import DataTable from './DataTable';
import Toast, { ToastProvider, useToast, SimpleToast } from './Toast';
import Breadcrumb, { BreadcrumbItem, SimpleBreadcrumb } from './Breadcrumb';
import Card, { CardHeader, CardBody, CardFooter, StatCard, InfoCard } from './Card';

export const SharedComponents = {
    // Button variants
    Button,
    PrimaryButton,
    SecondaryButton,
    DangerButton,
    SuccessButton,
    WarningButton,
    IconButton,

    // Input variants
    Input,
    Textarea,
    Select,

    // Modal variants
    Modal,
    ConfirmModal,
    AlertModal,

    // Loading variants
    LoadingSpinner,
    PulseLoader,
    Skeleton,
    ProgressBar,
    ButtonLoader,

    // File handling
    FileUpload,

    // Data display
    DataTable,

    // Notifications
    Toast,
    ToastProvider,
    useToast,
    SimpleToast,

    // Navigation
    Breadcrumb,
    BreadcrumbItem,
    SimpleBreadcrumb,

    // Layout
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    StatCard,
    InfoCard
};

export default SharedComponents;
