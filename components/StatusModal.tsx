import React from 'react';
import { X } from 'lucide-react';

interface StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  subtitle: string;
  placeholder: string;
  justificativa: string;
  onJustificativaChange: (val: string) => void;
}

export const StatusModal: React.FC<StatusModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  subtitle,
  placeholder,
  justificativa,
  onJustificativaChange,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-[12px] w-[90%] max-w-[480px] p-6 flex flex-col gap-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col gap-2">
          <h3 className="font-poppins font-semibold text-lg text-[#142E82]">
            {title}
          </h3>
          <p className="text-[#5D657F] text-xs font-normal font-poppins">
            {subtitle}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-gray-700 font-poppins">
            Justificativa *
          </label>
          <textarea
            required
            rows={4}
            value={justificativa}
            onChange={(e) => onJustificativaChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-3 text-sm text-gray-900 border border-gray-200 rounded-[8px] focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 placeholder-gray-400 transition resize-none"
          />
        </div>

        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={onClose}
            className="border border-[#CDD0DA] text-gray-600 px-6 py-2 rounded-[8px] hover:bg-gray-50 transition-colors font-poppins font-medium text-sm"
          >
            Cancelar
          </button>
          
          <button
            type="button"
            disabled={!justificativa.trim()}
            onClick={onConfirm}
            className="bg-[#142E82] text-white px-6 py-2 rounded-[8px] hover:bg-[#0f2263] transition-colors font-poppins font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};
