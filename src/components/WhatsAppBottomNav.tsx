import React from 'react';
import { MessageSquare, CircleDashed, Users, User } from 'lucide-react';
import { ActiveTab } from '../types';

interface WhatsAppBottomNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  pendingCount: number;
}

export const WhatsAppBottomNav: React.FC<WhatsAppBottomNavProps> = ({
  activeTab,
  onTabChange,
  pendingCount,
}) => {
  return (
    <nav className="bg-[#0b141a] border-t border-[#222e35] px-2 py-1.5 flex items-center justify-around z-30 select-none shrink-0">
      {/* 1. Chats Tab */}
      <button
        onClick={() => onTabChange('chats')}
        className={`flex flex-col items-center justify-center py-1 px-3 min-w-[64px] transition-all relative ${
          activeTab === 'chats' ? 'text-[#e9edef]' : 'text-[#8696a0] hover:text-[#e9edef]'
        }`}
      >
        <div
          className={`relative px-4 py-0.5 rounded-full transition-all ${
            activeTab === 'chats' ? 'bg-[#103629] text-[#25d366]' : ''
          }`}
        >
          <MessageSquare className="w-5 h-5 fill-current" />
          {/* Badge */}
          {pendingCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#25d366] text-[#111b21] font-bold text-[10px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1 shadow">
              {pendingCount}
            </span>
          )}
        </div>
        <span
          className={`text-[11px] mt-0.5 font-medium ${
            activeTab === 'chats' ? 'text-white font-semibold' : 'text-[#8696a0]'
          }`}
        >
          Chats
        </span>
      </button>

      {/* 2. Updates Tab */}
      <button
        onClick={() => onTabChange('updates')}
        className={`flex flex-col items-center justify-center py-1 px-3 min-w-[64px] transition-all relative ${
          activeTab === 'updates' ? 'text-[#e9edef]' : 'text-[#8696a0] hover:text-[#e9edef]'
        }`}
      >
        <div
          className={`relative px-4 py-0.5 rounded-full transition-all ${
            activeTab === 'updates' ? 'bg-[#103629] text-[#25d366]' : ''
          }`}
        >
          <CircleDashed className="w-5 h-5" />
          {/* Green dot update indicator */}
          <span className="absolute top-0 right-3 w-2 h-2 rounded-full bg-[#25d366]" />
        </div>
        <span
          className={`text-[11px] mt-0.5 font-medium ${
            activeTab === 'updates' ? 'text-white font-semibold' : 'text-[#8696a0]'
          }`}
        >
          Updates
        </span>
      </button>

      {/* 3. Communities Tab */}
      <button
        onClick={() => onTabChange('communities')}
        className={`flex flex-col items-center justify-center py-1 px-3 min-w-[64px] transition-all relative ${
          activeTab === 'communities' ? 'text-[#e9edef]' : 'text-[#8696a0] hover:text-[#e9edef]'
        }`}
      >
        <div
          className={`relative px-4 py-0.5 rounded-full transition-all ${
            activeTab === 'communities' ? 'bg-[#103629] text-[#25d366]' : ''
          }`}
        >
          <Users className="w-5 h-5" />
        </div>
        <span
          className={`text-[11px] mt-0.5 font-medium ${
            activeTab === 'communities' ? 'text-white font-semibold' : 'text-[#8696a0]'
          }`}
        >
          Communities
        </span>
      </button>

      {/* 4. Profile Tab (hendryaya official) */}
      <button
        onClick={() => onTabChange('profile')}
        className={`flex flex-col items-center justify-center py-1 px-2 min-w-[70px] max-w-[95px] transition-all relative ${
          activeTab === 'profile' ? 'text-[#e9edef]' : 'text-[#8696a0] hover:text-[#e9edef]'
        }`}
      >
        <div
          className={`relative px-4 py-0.5 rounded-full transition-all ${
            activeTab === 'profile' ? 'bg-[#103629] text-[#25d366]' : ''
          }`}
        >
          <User className="w-5 h-5" />
        </div>
        <span
          className={`text-[11px] mt-0.5 font-medium ${
            activeTab === 'profile' ? 'text-white font-semibold' : 'text-[#8696a0]'
          }`}
        >
          Profile
        </span>
      </button>
    </nav>
  );
};
