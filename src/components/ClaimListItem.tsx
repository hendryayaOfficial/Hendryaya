import React from 'react';
import { CheckCheck, Camera, MapPin, Receipt, ShieldCheck, Edit3, Trash2 } from 'lucide-react';
import { TransportClaim } from '../types';

interface ClaimListItemProps {
  claim: TransportClaim;
  onClick: () => void;
  onEdit: (claim: TransportClaim) => void;
  onDelete: (id: string) => void;
}

export const ClaimListItem: React.FC<ClaimListItemProps> = ({ claim, onClick, onEdit, onDelete }) => {
  const isApproved = claim.status === 'Lulus';
  const isVerified = claim.status === 'diluluskan';

  const categoryEmoji =
    claim.category === 'petrol'
      ? '⛽'
      : claim.category === 'diesel'
      ? '🚛'
      : claim.category === 'TNG'
      ? '💳'
      : claim.category === 'hotel'
      ? '🏨'
      : claim.category === 'parking'
      ? '🅿️'
      : '📦';

  return (
    <div
      onClick={onClick}
      className="flex items-start sm:items-center gap-3.5 px-4 py-3 hover:bg-[#202c33]/70 active:bg-[#202c33] cursor-pointer transition-colors border-b border-[#222e35]/40 select-none group"
    >
      {/* Avatar (either first receipt thumbnail or category badge) */}
      <div className="relative w-12 h-12 rounded-full overflow-hidden bg-[#202c33] flex items-center justify-center shrink-0 border border-[#2a3942] mt-0.5 sm:mt-0">
        {claim.receipts && claim.receipts.length > 0 ? (
          <img
            src={claim.receipts[0].dataUrl}
            alt={claim.shopName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
        ) : (
          <span className="text-xl">{categoryEmoji}</span>
        )}

        {/* Small category indicator */}
        <div className="absolute -bottom-0.5 -right-0.5 bg-[#111b21] p-0.5 rounded-full">
          <div className="w-3.5 h-3.5 rounded-full bg-[#00a884] text-[8px] flex items-center justify-center text-white font-bold">
            {claim.category[0].toUpperCase()}
          </div>
        </div>
      </div>

      {/* Middle Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1 mb-0.5">
          <h3 className="text-sm font-semibold text-[#e9edef] truncate group-hover:text-white transition-colors">
            {claim.shopName}
          </h3>
          <span className="text-[11px] text-[#8696a0] shrink-0 font-medium">
            {claim.date}
          </span>
        </div>

        {/* Subtitle Line 1: Status tick + Customer + Amount */}
        <div className="flex items-center gap-1.5 text-xs text-[#8696a0] truncate mb-0.5">
          {/* Double ticks */}
          <CheckCheck
            className={`w-4 h-4 shrink-0 ${
              isApproved || isVerified ? 'text-[#53bdeb]' : 'text-[#8696a0]'
            }`}
          />

          <span className="text-[#aebac1] font-medium truncate">{claim.customerName}</span>
          <span className="text-[#8696a0]">·</span>
          <span className="text-[#25d366] font-bold shrink-0">RM {claim.amount.toFixed(2)}</span>
        </div>

        {/* Subtitle Line 2: Remark snippet + location + receipts count */}
        <div className="flex items-center justify-between text-[11px] text-[#8696a0] truncate">
          <p className="truncate text-[#8696a0]/90 italic max-w-[70%]">
            {claim.remark ? `"${claim.remark}"` : `${claim.area} • ${claim.location}`}
          </p>

          <div className="flex items-center gap-1.5 shrink-0">
            {claim.receipts && claim.receipts.length > 0 && (
              <span className="flex items-center gap-0.5 text-[10px] text-[#00a884]">
                <Camera className="w-3 h-3" /> {claim.receipts.length}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Right Column: Status pill + Edit & Padam buttons right below/around Lulus */}
      <div className="flex flex-col items-end gap-1 shrink-0 ml-1">
        {/* Status indicator badge */}
        <span
          className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wide ${
            claim.status === 'Lulus'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : claim.status === 'diluluskan'
              ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
              : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
          }`}
        >
          {claim.status === 'Lulus'
            ? 'Lulus'
            : claim.status === 'diluluskan'
            ? 'Diluluskan'
            : 'Proses'}
        </span>

        {/* Action Buttons for Edit & Padam (Requested: dekat bawah atau atas tulisan Lulus) */}
        <div className="flex items-center gap-1 mt-0.5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(claim);
            }}
            title="Edit Tuntutan Ini"
            className="flex items-center gap-1 text-[10px] bg-[#202c33] hover:bg-[#00a884] text-[#aebac1] hover:text-[#111b21] px-2 py-1 rounded border border-[#2a3942] hover:border-[#00a884] transition-all font-semibold active:scale-95"
          >
            <Edit3 className="w-3 h-3" />
            <span>Edit</span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (window.confirm(`Adakah anda pasti mahu memadam tuntutan "${claim.shopName}" ini?`)) {
                onDelete(claim.id);
              }
            }}
            title="Padam Tuntutan Ini"
            className="flex items-center gap-1 text-[10px] bg-[#202c33] hover:bg-red-500 text-[#aebac1] hover:text-white px-2 py-1 rounded border border-[#2a3942] hover:border-red-500 transition-all font-semibold active:scale-95"
          >
            <Trash2 className="w-3 h-3 text-red-400 group-hover:text-white" />
            <span>Padam</span>
          </button>
        </div>
      </div>
    </div>
  );
};

