import React, { useState, useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  message: string;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 animate-bounce">
      <div className="bg-gray-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10">
        <CheckCircle2 className="text-emerald-500" size={20} />
        <span className="font-bold">{message}</span>
        <button onClick={onClose} className="ml-2 text-gray-400 hover:text-white">
          <X size={16} />
        </button>
      </div>
    </div>
  );
};
