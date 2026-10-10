import React, { useState } from 'react';
import { Camera, Search, MoreVertical, PlusCircle, RotateCcw } from 'lucide-react';

interface WhatsAppHeaderProps {
  onOpenNewClaim: () => void;
  onOpenCameraDirectly: () => void;
  onResetData: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  totalPendingCount: number;
}

export const WhatsAppHeader: React.FC<WhatsAppHeaderProps> = ({
  onOpenNewClaim,
  onOpenCameraDirectly,
  onResetData,
  searchQuery,
  onSearchChange,
  totalPendingCount,
}) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-[#0b141a] text-[#e9edef] border-b border-[#222e35]/60 sticky top-0 z-20 shrink-0">
      {/* WhatsApp Main Top Bar */}
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-[#e9edef] select-none">
            hendryaya Official
          </span>
          <span className="text-[11px] bg-[#00a884]/20 text-[#00a884] font-semibold px-2 py-0.5 rounded-full border border-[#00a884]/30">
            Transport Claim
          </span>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2 text-[#aebac1]">
          {/* Quick Camera button */}
          <button
            onClick={onOpenCameraDirectly}
            className="p-2 rounded-full hover:bg-[#202c33] active:scale-95 transition-all text-[#aebac1] hover:text-white"
            title="Kamera Resit Pantas"
            aria-label="Ambil Resit Pantas"
          >
            <Camera className="w-5 h-5" />
          </button>

          {/* Search Toggle button */}
          <button
            onClick={() => setIsSearchVisible(!isSearchVisible)}
            className={`p-2 rounded-full transition-all ${
              isSearchVisible ? 'bg-[#202c33] text-[#00a884]' : 'hover:bg-[#202c33] text-[#aebac1]'
            }`}
            title="Cari Tuntutan"
            aria-label="Cari Tuntutan"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Three dots menu */}
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-full hover:bg-[#202c33] active:scale-95 transition-all text-[#aebac1]"
              aria-label="Menu Pilihan"
            >
              <MoreVertical className="w-5 h-5" />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 top-11 w-56 bg-[#233138] border border-[#2a3942] rounded-xl shadow-2xl py-1.5 z-40 text-xs">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenNewClaim();
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-[#182229] flex items-center gap-2.5 text-[#e9edef]"
                >
                  <PlusCircle className="w-4 h-4 text-[#00a884]" /> Tambah Borang Claim
                </button>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenCameraDirectly();
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-[#182229] flex items-center gap-2.5 text-[#e9edef]"
                >
                  <Camera className="w-4 h-4 text-[#25d366]" /> Kamera Resit Pantas
                </button>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    if (window.confirm('Muat semula data contoh asal?')) {
                      onResetData();
                    }
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-[#182229] flex items-center gap-2.5 text-amber-300"
                >
                  <RotateCcw className="w-4 h-4" /> Reset Data Contoh
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Meta AI Search Bar (Identical to WhatsApp screenshot: "Ask Meta AI or Search") */}
      <div className={`px-4 pb-2.5 transition-all duration-200 ${isSearchVisible ? 'block' : 'block'}`}>
        <div className="relative flex items-center">
          <div className="absolute left-3.5 text-[#8696a0] pointer-events-none">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Ask Meta AI or Search (Cari claim, kedai, customer)..."
            className="w-full bg-[#202c33] text-[#e9edef] placeholder:text-[#8696a0] text-xs sm:text-sm pl-10 pr-9 py-2 rounded-full outline-none border border-transparent focus:border-[#00a884]/40 transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 text-[#8696a0] hover:text-white text-xs p-1"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
