import React from 'react';
import { Phone, Video, Calendar, Grid, Heart, ArrowUpRight, ArrowDownLeft, PhoneCall } from 'lucide-react';

interface CallContact {
  id: string;
  name: string;
  role: string;
  time: string;
  type: 'incoming' | 'outgoing' | 'missed';
  isVideo?: boolean;
  phone: string;
}

const CONTACTS: CallContact[] = [
  { id: 'c1', name: 'Kesevan (Penyelia Get Rental)', role: 'Kelulusan Claim Bahan Api', time: '10:44 AM', type: 'outgoing', phone: '+60123456789' },
  { id: 'c2', name: 'GRSB Service & Maintenance', role: 'Pengurus Operasi', time: '16:24 PM', type: 'incoming', isVideo: true, phone: '+60198765432' },
  { id: 'c3', name: 'Roy Koyo Personal', role: 'Rakan Penghantaran Melaka', time: 'Today, 14:59', type: 'outgoing', isVideo: true, phone: '+60112345678' },
  { id: 'c4', name: 'Hakim (Get Rental Runner)', role: 'Pemandu Van VPF 6614', time: 'Today, 11:46', type: 'incoming', phone: '+60176543210' },
  { id: 'c5', name: 'Kewangan & Akaun (Finance)', role: 'Pengesahan Baucar Bayaran', time: 'Yesterday', type: 'outgoing', phone: '+60129998877' },
];

export const CallsTab: React.FC = () => {
  const handleCall = (contact: CallContact) => {
    const confirm = window.confirm(`Hubungi ${contact.name} (${contact.role}) untuk semakan status tuntutan?`);
    if (confirm) {
      window.open(`https://wa.me/?text=Salam%20${encodeURIComponent(contact.name)},%20saya%20ingin%20menyemak%20status%20borang%20claim%20transport%20saya.`, '_blank');
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#0b141a] text-[#e9edef] p-4 space-y-5 select-none relative">
      {/* 4 Quick Action Circles matching Image 4 in user screenshot */}
      <div className="grid grid-cols-4 gap-2 py-2">
        <div className="flex flex-col items-center gap-1.5 cursor-pointer group">
          <div className="w-12 h-12 rounded-full bg-[#202c33] group-hover:bg-[#283740] flex items-center justify-center text-white transition-colors">
            <Phone className="w-5 h-5" />
          </div>
          <span className="text-[11px] text-[#8696a0]">Call</span>
        </div>

        <div className="flex flex-col items-center gap-1.5 cursor-pointer group">
          <div className="w-12 h-12 rounded-full bg-[#202c33] group-hover:bg-[#283740] flex items-center justify-center text-white transition-colors">
            <Calendar className="w-5 h-5" />
          </div>
          <span className="text-[11px] text-[#8696a0]">Schedule</span>
        </div>

        <div className="flex flex-col items-center gap-1.5 cursor-pointer group">
          <div className="w-12 h-12 rounded-full bg-[#202c33] group-hover:bg-[#283740] flex items-center justify-center text-white transition-colors">
            <Grid className="w-5 h-5" />
          </div>
          <span className="text-[11px] text-[#8696a0]">Keypad</span>
        </div>

        <div className="flex flex-col items-center gap-1.5 cursor-pointer group">
          <div className="w-12 h-12 rounded-full bg-[#202c33] group-hover:bg-[#283740] flex items-center justify-center text-white transition-colors">
            <Heart className="w-5 h-5" />
          </div>
          <span className="text-[11px] text-[#8696a0]">Favourites</span>
        </div>
      </div>

      {/* Recent Calls Section */}
      <div>
        <h3 className="text-sm font-bold text-white mb-3">Panggilan Semakan Kelulusan</h3>
        <div className="space-y-1">
          {CONTACTS.map((c) => (
            <div
              key={c.id}
              onClick={() => handleCall(c)}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-[#182229] cursor-pointer transition-colors border border-transparent hover:border-[#222e35]"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#202c33] flex items-center justify-center font-bold text-[#00a884]">
                  {c.name[0]}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">{c.name}</h4>
                  <div className="flex items-center gap-1.5 text-xs text-[#8696a0]">
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#00a884]" />
                    <span>{c.role}</span>
                    <span>•</span>
                    <span>{c.time}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCall(c);
                }}
                className="p-2 rounded-full hover:bg-[#202c33] text-[#00a884]"
              >
                {c.isVideo ? <Video className="w-5 h-5" /> : <Phone className="w-5 h-5" />}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Call Button */}
      <div className="fixed bottom-20 right-5 z-20">
        <button
          onClick={() => {
            window.open('https://wa.me/', '_blank');
          }}
          className="w-14 h-14 rounded-2xl bg-[#00a884] hover:bg-[#008f6f] text-[#111b21] shadow-2xl flex items-center justify-center active:scale-95 transition-all"
          title="Panggilan Kelulusan Segera"
        >
          <PhoneCall className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
