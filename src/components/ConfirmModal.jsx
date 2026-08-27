import React from 'react';
import { AlertTriangle, Trash2, RotateCcw, X, ShieldAlert, Check } from 'lucide-react';

export function ConfirmModal({ 
  isOpen, 
  title = "Are you sure?", 
  message = "This action cannot be undone.", 
  confirmText = "Yes, Delete", 
  cancelText = "Cancel",
  type = "danger", // "danger" | "warning" | "info"
  onConfirm, 
  onClose 
}) {
  if (!isOpen) return null;

  const isDanger = type === "danger";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4">
          {/* Icon Badge */}
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
            isDanger ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-700'
          }`}>
            {isDanger ? (
              <Trash2 className="w-6 h-6" />
            ) : (
              <AlertTriangle className="w-6 h-6" />
            )}
          </div>

          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900 leading-snug">
              {title}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2.5 pt-5 mt-5 border-t border-slate-100 text-xs">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition"
          >
            {cancelText}
          </button>
          
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-5 py-2 font-bold text-white rounded-lg shadow transition flex items-center gap-1.5 ${
              isDanger 
                ? 'bg-rose-600 hover:bg-rose-700' 
                : 'bg-amber-600 hover:bg-amber-700'
            }`}
          >
            {isDanger ? <Trash2 className="w-3.5 h-3.5" /> : <RotateCcw className="w-3.5 h-3.5" />}
            <span>{confirmText}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
