// Custom hooks for common functionality
import { useState, useEffect } from 'react';

// Hook for local storage with state sync
export const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    const setValue = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error);
        }
    };

    return [storedValue, setValue];
};

// Hook for managing form state
export const useForm = (initialValues, validationRules = {}) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const handleChange = (name, value) => {
        setValues(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleBlur = (name) => {
        setTouched(prev => ({
            ...prev,
            [name]: true
        }));
    };

    const validate = () => {
        const newErrors = {};

        Object.keys(validationRules).forEach(field => {
            const rules = validationRules[field];
            const value = values[field];

            if (rules.required && (!value || value.trim() === '')) {
                newErrors[field] = `${field} is required`;
                return;
            }

            if (rules.validate && value) {
                const errorMessage = rules.validate(value);
                if (errorMessage) {
                    newErrors[field] = errorMessage;
                }
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const reset = () => {
        setValues(initialValues);
        setErrors({});
        setTouched({});
    };

    return {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        validate,
        reset,
        isValid: Object.keys(errors).length === 0
    };
};

// Hook for API calls
export const useApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const call = async (apiFunction, ...args) => {
        try {
            setLoading(true);
            setError(null);
            const result = await apiFunction(...args);
            return result;
        } catch (err) {
            setError(err.message || 'An error occurred');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, call };
};

// Hook for debouncing values
export const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};
