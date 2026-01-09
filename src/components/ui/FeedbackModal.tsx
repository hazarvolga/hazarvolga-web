"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, X } from "lucide-react";
import { useEffect } from "react";

interface FeedbackModalProps {
    isOpen: boolean;
    type: "success" | "error";
    title: string;
    message: string;
    onClose: () => void;
}

export default function FeedbackModal({ isOpen, type, title, message, onClose }: FeedbackModalProps) {
    // Close on escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-[101] flex items-center justify-center pointer-events-none p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                            className="pointer-events-auto w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden"
                        >
                            {/* Decorative gradient glow */}
                            <div className={`absolute top-0 left-0 w-full h-1 ${type === "success" ? "bg-emerald-500" : "bg-red-500"}`} />
                            <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[50px] opacity-20 ${type === "success" ? "bg-emerald-500" : "bg-red-500"}`} />

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="flex flex-col items-center text-center space-y-4 pt-2">
                                {/* Icon */}
                                <div className={`p-4 rounded-full ${type === "success" ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"}`}>
                                    {type === "success" ? <CheckCircle size={48} strokeWidth={1.5} /> : <XCircle size={48} strokeWidth={1.5} />}
                                </div>

                                {/* Content */}
                                <div className="space-y-2">
                                    <h3 className="text-xl font-medium text-white tracking-tight">
                                        {title}
                                    </h3>
                                    <p className="text-white/60 text-sm leading-relaxed">
                                        {message}
                                    </p>
                                </div>

                                {/* Action Button */}
                                <button
                                    onClick={onClose}
                                    className={`w-full py-3 px-4 rounded-xl font-medium text-sm transition-all duration-200 mt-2
                                        ${type === "success"
                                            ? "bg-white text-black hover:bg-gray-200"
                                            : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                                        }`}
                                >
                                    {type === 'success' ? 'Great!' : 'Close'}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
