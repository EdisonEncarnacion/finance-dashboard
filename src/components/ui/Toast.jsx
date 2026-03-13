import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export function Toast({ message, isVisible, onClose }) {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                    className="fixed top-6 right-6 z-[9999] flex items-center gap-3 px-5 py-3.5 bg-[#0f172a] border border-[#1e293b] rounded-2xl shadow-2xl overflow-hidden group"
                >
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500/10 text-[#22c55e]">
                            <CheckCircle2 size={18} strokeWidth={2.5} />
                        </div>

                        <p className="text-sm font-semibold text-[#e2e8f0] tracking-tight">
                            {message}
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
