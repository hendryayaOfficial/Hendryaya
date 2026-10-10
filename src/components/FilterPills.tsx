import React from 'react';
import { ClaimStatus, ClaimCategory } from '../types';

export type FilterValue = 'all' | ClaimStatus | ClaimCategory;

interface FilterPillsProps {
  currentFilter: FilterValue;
  onFilterChange: (filter: FilterValue) => void;
  counts: {
    all: number;
    proses: number;
    diluluskan: number;
    Lulus: number;
  };
}

export const FilterPills: React.FC<FilterPillsProps> = ({
  currentFilter,
  onFilterChange,
  counts,
}) => {
  const pills: { id: FilterValue; label: string; count?: number }[] = [
    { id: 'all', label: 'All', count: counts.all },
    { id: 'proses', label: 'Dalam Proses', count: counts.proses },
    { id: 'diluluskan', label: 'Diluluskan', count: counts.diluluskan },
    { id: 'Lulus', label: 'Lulus', count: counts.Lulus },
    { id: 'petrol', label: '⛽ Petrol' },
    { id: 'diesel', label: '🚛 Diesel' },
    { id: 'TNG', label: '💳 TNG' },
    { id: 'hotel', label: '🏨 Hotel' },
    { id: 'parking', label: '🅿️ Parking' },
    { id: 'other', label: '📦 Other' },
  ];

  return (
    <div className="py-2.5 px-4 overflow-x-auto no-scrollbar flex items-center gap-2 select-none shrink-0 bg-[#0b141a]">
      {pills.map((pill) => {
        const isActive = currentFilter === pill.id;
        return (
          <button
            key={pill.id}
            onClick={() => onFilterChange(pill.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
              isActive
                ? 'bg-[#103629] text-[#25d366] font-semibold border border-[#00a884]/40 shadow-sm'
                : 'bg-[#202c33] text-[#8696a0] hover:text-[#e9edef] hover:bg-[#26353d] border border-transparent'
            }`}
          >
            <span>{pill.label}</span>
            {pill.count !== undefined && pill.count > 0 && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive ? 'bg-[#00a884] text-[#111b21]' : 'bg-[#111b21] text-[#8696a0]'
                }`}
              >
                {pill.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
