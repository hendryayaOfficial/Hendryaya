import React from 'react';
import { Plus } from 'lucide-react';
import { TransportClaim } from '../types';

interface StatusCarouselProps {
  claims: TransportClaim[];
  onSelectClaim: (claim: TransportClaim) => void;
  onAddNew: () => void;
}

export const StatusCarousel: React.FC<StatusCarouselProps> = ({
  claims,
  onSelectClaim,
  onAddNew,
}) => {
  return (
    <div className="py-2.5 px-3 border-b border-[#222e35]/60 overflow-x-auto no-scrollbar flex items-center gap-3.5 select-none bg-[#0b141a]">
      {/* My Status Bubble with Green Plus */}
      <div
        onClick={onAddNew}
        className="flex flex-col items-center gap-1.5 cursor-pointer shrink-0 group"
      >
        <div className="relative w-14 h-14 rounded-full p-0.5 border-2 border-dashed border-[#8696a0]/50 group-hover:border-[#00a884] transition-colors flex items-center justify-center bg-[#202c33]">
          <span className="text-xl">📋</span>
          <div className="absolute bottom-0 right-0 w-5 h-5 bg-[#00a884] rounded-full border-2 border-[#0b141a] flex items-center justify-center text-[#111b21]">
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
          </div>
        </div>
        <span className="text-[11px] text-[#e9edef] max-w-[62px] truncate text-center font-medium">
          Claim Baru
        </span>
      </div>

      {/* Stories for each recent claim with colored status ring */}
      {claims.slice(0, 8).map((c) => {
        const ringColor =
          c.status === 'Lulus'
            ? 'border-[#00a884]'
            : c.status === 'diluluskan'
            ? 'border-[#3b82f6]'
            : 'border-[#f59e0b]';

        const categoryEmoji =
          c.category === 'petrol'
            ? '⛽'
            : c.category === 'diesel'
            ? '🚛'
            : c.category === 'TNG'
            ? '💳'
            : c.category === 'hotel'
            ? '🏨'
            : c.category === 'parking'
            ? '🅿️'
            : '📦';

        return (
          <div
            key={c.id}
            onClick={() => onSelectClaim(c)}
            className="flex flex-col items-center gap-1.5 cursor-pointer shrink-0 group"
          >
            <div
              className={`w-14 h-14 rounded-full p-0.5 border-2 ${ringColor} flex items-center justify-center bg-[#202c33] group-hover:scale-105 transition-transform overflow-hidden relative shadow`}
            >
              {c.receipts && c.receipts[0] ? (
                <img
                  src={c.receipts[0].dataUrl}
                  alt={c.shopName}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <span className="text-xl">{categoryEmoji}</span>
              )}

              {/* Status small pill */}
              <span className="absolute bottom-0 text-[8px] bg-black/80 px-1 rounded font-bold text-white uppercase">
                {c.category}
              </span>
            </div>
            <span className="text-[11px] text-[#8696a0] group-hover:text-[#e9edef] max-w-[62px] truncate text-center transition-colors">
              {c.shopName.split(' ')[0]}
            </span>
          </div>
        );
      })}
    </div>
  );
};
