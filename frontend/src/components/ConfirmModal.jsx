import React from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';

const ConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in font-sans">
      <div className="w-full max-w-md glass-panel bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 animate-scale-in">
        
        {/* Header/Body combined in confirm dialogs */}
        <div className="p-6 text-center">
          <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 mb-4">
            <AlertTriangle className="w-6 h-6 animate-pulse" />
          </div>
          
          <h3 className="text-lg font-bold text-white mb-2">Delete Task</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            Are you sure you want to permanently delete this task? This action is irreversible.
          </p>

          {/* Action buttons */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-950/40 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-semibold rounded-xl text-xs sm:text-sm transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-semibold rounded-xl shadow-lg shadow-red-600/20 hover:shadow-red-600/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center gap-1.5 text-xs sm:text-sm cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>Yes, Delete Task</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ConfirmModal;
