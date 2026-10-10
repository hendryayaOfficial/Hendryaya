import React, { useState } from 'react';
import {
  Camera,
  Edit2,
  TrendingUp,
  Receipt,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ChevronRight,
  Plus,
  Eye,
} from 'lucide-react';
import { TransportClaim, ReceiptImage } from '../types';
import { ReceiptImageViewer } from './ReceiptImageViewer';

interface UpdatesTabProps {
  claims: TransportClaim[];
  onSelectClaim: (claim: TransportClaim) => void;
  onOpenNewClaim: () => void;
  onOpenCamera: () => void;
}

export const UpdatesTab: React.FC<UpdatesTabProps> = ({
  claims,
  onSelectClaim,
  onOpenNewClaim,
  onOpenCamera,
}) => {
  const [selectedReceipt, setSelectedReceipt] = useState<ReceiptImage | null>(null);

  // Financial calculations
  const totalAmount = claims.reduce((sum, c) => sum + c.amount, 0);
  const lulusAmount = claims.filter((c) => c.status === 'Lulus').reduce((sum, c) => sum + c.amount, 0);
  const prosesAmount = claims.filter((c) => c.status === 'proses').reduce((sum, c) => sum + c.amount, 0);
  const diluluskanAmount = claims.filter((c) => c.status === 'diluluskan').reduce((sum, c) => sum + c.amount, 0);

  // Category aggregations
  const categoryTotals: Record<string, number> = {
    petrol: 0,
    diesel: 0,
    TNG: 0,
    hotel: 0,
    parking: 0,
    other: 0,
  };
  claims.forEach((c) => {
    if (categoryTotals[c.category] !== undefined) {
      categoryTotals[c.category] += c.amount;
    } else {
      categoryTotals.other += c.amount;
    }
  });

  // Extract all receipts across claims
  const allReceipts = claims.flatMap((c) =>
    (c.receipts || []).map((r) => ({ ...r, claimShop: c.shopName, claimAmount: c.amount }))
  );

  return (
    <div className="flex-1 overflow-y-auto bg-[#0b141a] text-[#e9edef] p-4 space-y-6 select-none">
      {/* Top Section: Status / Cerita Claim (Identical to Image 2) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-white">Status Tuntutan Terkini</h2>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
          {/* Add Status Card */}
          <div
            onClick={onOpenNewClaim}
            className="w-28 h-40 rounded-2xl bg-[#182229] border border-[#222e35] flex flex-col justify-between p-2.5 shrink-0 cursor-pointer hover:border-[#00a884] transition-all group"
          >
            <div className="relative w-10 h-10 rounded-full bg-[#202c33] flex items-center justify-center">
              <span className="text-lg">👤</span>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#00a884] rounded-full border-2 border-[#182229] flex items-center justify-center text-[#111b21]">
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-white group-hover:text-[#00a884] transition-colors">
                Add claim
              </p>
              <p className="text-[10px] text-[#8696a0]">Borang baru</p>
            </div>
          </div>

          {/* Status cards matching screenshot */}
          {claims.slice(0, 5).map((c) => (
            <div
              key={c.id}
              onClick={() => onSelectClaim(c)}
              className="w-28 h-40 rounded-2xl bg-[#182229] border border-[#222e35] flex flex-col justify-between p-2.5 shrink-0 cursor-pointer hover:border-[#00a884] transition-all relative overflow-hidden group"
            >
              {/* Background preview if receipt exists */}
              {c.receipts && c.receipts[0] && (
                <img
                  src={c.receipts[0].dataUrl}
                  alt={c.shopName}
                  className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all"
                />
              )}

              <div className="relative z-10 w-9 h-9 rounded-full p-0.5 border-2 border-[#00a884] bg-[#202c33] flex items-center justify-center">
                <span className="text-sm font-bold">
                  {c.category === 'petrol'
                    ? '⛽'
                    : c.category === 'diesel'
                    ? '🚛'
                    : c.category === 'TNG'
                    ? '💳'
                    : c.category === 'hotel'
                    ? '🏨'
                    : c.category === 'parking'
                    ? '🅿️'
                    : '📦'}
                </span>
              </div>

              <div className="relative z-10">
                <p className="text-xs font-semibold text-white truncate">{c.customerName.split(' ')[0]}</p>
                <p className="text-[10px] text-[#00a884] font-bold">RM {c.amount.toFixed(0)}</p>
                <p className="text-[9px] text-[#8696a0] truncate">{c.shopName}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Financial Analytics & Summary Cards */}
      <div className="bg-[#182229] rounded-2xl p-4 border border-[#222e35] space-y-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#00a884]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#8696a0]">
              Ringkasan Tuntutan Semasa
            </h3>
          </div>
          <span className="text-xs font-bold text-[#00a884] bg-[#00a884]/10 px-2.5 py-0.5 rounded-full border border-[#00a884]/20">
            {claims.length} Tuntutan
          </span>
        </div>

        {/* Big Total */}
        <div>
          <span className="text-[11px] text-[#8696a0]">Jumlah Keseluruhan Dituntut</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-[#25d366]">
            RM {totalAmount.toFixed(2)}
          </p>
        </div>

        {/* 3 Status breakdowns */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#222e35]">
          <div className="bg-[#202c33] p-2.5 rounded-xl border border-amber-500/20">
            <span className="text-[10px] text-amber-300 font-semibold flex items-center gap-1">
              <Clock className="w-3 h-3" /> Proses
            </span>
            <p className="text-xs sm:text-sm font-bold text-white mt-1">RM {prosesAmount.toFixed(2)}</p>
          </div>
          <div className="bg-[#202c33] p-2.5 rounded-xl border border-teal-500/20">
            <span className="text-[10px] text-teal-300 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Diluluskan
            </span>
            <p className="text-xs sm:text-sm font-bold text-white mt-1">RM {diluluskanAmount.toFixed(2)}</p>
          </div>
          <div className="bg-[#202c33] p-2.5 rounded-xl border border-emerald-500/20">
            <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Lulus
            </span>
            <p className="text-xs sm:text-sm font-bold text-[#25d366] mt-1">RM {lulusAmount.toFixed(2)}</p>
          </div>
        </div>

        {/* Category breakdown bars */}
        <div className="pt-2 border-t border-[#222e35] space-y-2">
          <span className="text-[11px] font-semibold text-[#8696a0] uppercase tracking-wide">
            Pecahan Mengikut Jenis Claim
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            <div className="flex items-center justify-between bg-[#202c33] p-2 rounded-lg">
              <span>⛽ Petrol</span>
              <span className="font-bold text-white">RM {categoryTotals.petrol.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between bg-[#202c33] p-2 rounded-lg">
              <span>🚛 Diesel</span>
              <span className="font-bold text-white">RM {categoryTotals.diesel.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between bg-[#202c33] p-2 rounded-lg">
              <span>💳 TNG</span>
              <span className="font-bold text-white">RM {categoryTotals.TNG.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between bg-[#202c33] p-2 rounded-lg">
              <span>🏨 Hotel</span>
              <span className="font-bold text-white">RM {categoryTotals.hotel.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between bg-[#202c33] p-2 rounded-lg">
              <span>🅿️ Parking</span>
              <span className="font-bold text-white">RM {categoryTotals.parking.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between bg-[#202c33] p-2 rounded-lg">
              <span>📦 Other</span>
              <span className="font-bold text-white">RM {categoryTotals.other.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section: Channels List (Matching Screenshot 2) */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-base font-bold text-white">Channels & Rekod Resit</h2>
          <span className="text-xs bg-[#202c33] text-[#00a884] px-3 py-1 rounded-full font-semibold">
            Explore
          </span>
        </div>

        <div className="space-y-1">
          {claims.slice(0, 6).map((c) => (
            <div
              key={`channel-${c.id}`}
              onClick={() => onSelectClaim(c)}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-[#182229] cursor-pointer transition-colors border border-transparent hover:border-[#222e35]"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#202c33] flex items-center justify-center text-lg">
                  💬
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">{c.shopName}</h4>
                  <p className="text-xs text-[#8696a0] flex items-center gap-1">
                    <span>{c.customerName}</span>
                    <span>•</span>
                    <span className="text-[#00a884]">RM {c.amount.toFixed(2)}</span>
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#8696a0]" />
            </div>
          ))}
        </div>
      </div>

      {/* Section: Lampiran Galeri Resit Pantas */}
      {allReceipts.length > 0 && (
        <div className="bg-[#182229] p-4 rounded-2xl border border-[#222e35]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-[#00a884]" /> Galeri Resit ({allReceipts.length} keping)
            </h3>
            <span className="text-[10px] text-[#8696a0]">Kamera & Galeri</span>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {allReceipts.slice(0, 8).map((r, i) => (
              <div
                key={`gallery-${r.id}-${i}`}
                onClick={() => setSelectedReceipt(r)}
                className="group relative aspect-square rounded-xl overflow-hidden bg-[#202c33] border border-[#2a3942] cursor-pointer hover:border-[#00a884] transition-all"
              >
                <img src={r.dataUrl} alt="Resit" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Eye className="w-4 h-4 text-white" />
                </div>
                <span className="absolute bottom-1 left-1 text-[8px] bg-black/70 px-1 rounded text-white font-semibold">
                  RM {r.claimAmount?.toFixed(0)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox Viewer */}
      <ReceiptImageViewer
        receipt={selectedReceipt}
        onClose={() => setSelectedReceipt(null)}
      />
    </div>
  );
};
