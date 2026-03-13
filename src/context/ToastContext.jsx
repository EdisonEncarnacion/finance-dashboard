import React, { createContext, useContext, useState, useCallback } from 'react';
import { Toast } from '../components/ui/Toast';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
    const [toast, setToast] = useState({ isVisible: false, message: '' });

    const showToast = useCallback((message) => {
        setToast({ isVisible: true, message });
    }, []);

    const hideToast = useCallback(() => {
        setToast((prev) => ({ ...prev, isVisible: false }));
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <Toast
                isVisible={toast.isVisible}
                message={toast.message}
                onClose={hideToast}
            />
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}
