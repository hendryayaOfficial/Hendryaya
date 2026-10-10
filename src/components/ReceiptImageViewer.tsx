import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut, RotateCw, Download, Calendar, Tag } from 'lucide-react';
import { ReceiptImage } from '../types';

interface ReceiptImageViewerProps {
  receipt: ReceiptImage | null;
  onClose: () => void;
  onDelete?: (receiptId: string) => void;
  canDelete?: boolean;
}

export const ReceiptImageViewer: React.FC<ReceiptImageViewerProps> = ({
  receipt,
  onClose,
  onDelete,
  canDelete = false,
}) => {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  if (!receipt) return null;

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.3, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.3, 0.6));
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = receipt.dataUrl;
    link.download = `resit-claim-${receipt.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between select-none animate-fadeIn">
      {/* Top Bar */}
      <div className="p-4 flex items-center justify-between bg-black/50 backdrop-blur-md text-white z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 active:scale-95 transition-all text-white"
            aria-label="Tutup"
          >
            <X className="w-6 h-6" />
          </button>
          <div>
            <p className="text-sm font-semibold truncate max-w-[200px] sm:max-w-md">
              {receipt.caption || 'Resit Bukti Claim'}
            </p>
            <div className="flex items-center gap-2 text-xs text-white/60">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" /> {receipt.timestamp}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1 capitalize">
                <Tag className="w-3 h-3" /> Dari {receipt.source}
              </span>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={handleZoomOut}
            className="p-2 rounded-lg hover:bg-white/10 active:scale-95 text-white/80 hover:text-white"
            title="Kecilkan (Zoom Out)"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          <button
            onClick={handleZoomIn}
            className="p-2 rounded-lg hover:bg-white/10 active:scale-95 text-white/80 hover:text-white"
            title="Besarkan (Zoom In)"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
          <button
            onClick={handleRotate}
            className="p-2 rounded-lg hover:bg-white/10 active:scale-95 text-white/80 hover:text-white"
            title="Pusing 90° (Rotate)"
          >
            <RotateCw className="w-5 h-5" />
          </button>
          <button
            onClick={handleDownload}
            className="p-2 rounded-lg hover:bg-white/10 active:scale-95 text-white/80 hover:text-white"
            title="Muat Turun Gambar"
          >
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Middle Interactive Canvas */}
      <div
        className="flex-1 overflow-auto flex items-center justify-center p-4 cursor-grab active:cursor-grabbing"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div
          className="transition-transform duration-200 ease-out flex items-center justify-center"
          style={{
            transform: `scale(${zoom}) rotate(${rotation}deg)`,
          }}
        >
          <img
            src={receipt.dataUrl}
            alt={receipt.caption || 'Resit Tuntutan'}
            className="max-h-[75vh] max-w-[90vw] object-contain rounded shadow-2xl border border-white/10 select-none pointer-events-none"
          />
        </div>
      </div>

      {/* Bottom Footer Details */}
      <div className="p-4 bg-black/60 backdrop-blur-md flex items-center justify-between text-xs text-white/70">
        <span>Klik atau seret untuk melihat butiran nombor resit & amaun</span>
        {canDelete && onDelete && (
          <button
            onClick={() => {
              if (window.confirm('Adakah anda pasti ingin memadam gambar resit ini?')) {
                onDelete(receipt.id);
                onClose();
              }
            }}
            className="text-red-400 hover:text-red-300 font-medium py-1 px-3 rounded hover:bg-red-500/10"
          >
            Padam Resit Ini
          </button>
        )}
      </div>
    </div>
  );
};
