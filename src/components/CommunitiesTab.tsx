import React, { useState } from 'react';
import {
  Users,
  Plus,
  CheckCircle2,
  X,
  ChevronRight,
  MessageCircle,
} from 'lucide-react';

interface CommunityItem {
  id: string;
  name: string;
  description: string;
  area: string;
  membersCount: number;
  status: string;
  avatarText: string;
}

export const CommunitiesTab: React.FC = () => {
  // Communities state starting with Hendryaya as requested
  const [communities, setCommunities] = useState<CommunityItem[]>([
    {
      id: 'comm-hendryaya',
      name: 'Hendryaya',
      description: 'Komuniti Rasmi Pengangkutan & Logistik Pemandu Hendryaya',
      area: 'Lembah Klang & Selangor',
      membersCount: 16,
      status: 'Aktif',
      avatarText: 'HY',
    },
  ]);

  // Modals state
  const [selectedCommunity, setSelectedCommunity] = useState<CommunityItem | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newCommunityName, setNewCommunityName] = useState('');
  const [newCommunityArea, setNewCommunityArea] = useState('Lembah Klang');
  const [newCommunityDesc, setNewCommunityDesc] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateCommunity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommunityName.trim()) return;

    const initials = newCommunityName
      .trim()
      .split(' ')
      .map((w) => w[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();

    const created: CommunityItem = {
      id: `comm-${Date.now()}`,
      name: newCommunityName.trim(),
      description: newCommunityDesc.trim() || 'Komuniti tuntutan transport & pemandu',
      area: newCommunityArea.trim() || 'Malaysia',
      membersCount: 1,
      status: 'Aktif',
      avatarText: initials || 'HY',
    };

    setCommunities((prev) => [...prev, created]);
    setNewCommunityName('');
    setNewCommunityDesc('');
    setIsCreateModalOpen(false);
    showToast(`Komuniti "${created.name}" berjaya dibina!`);
  };

  const handleOpenWhatsAppGroup = (comm: CommunityItem) => {
    const text = `Salam, saya ahli komuniti *${comm.name}* (Kawasan: ${comm.area}). Ingin menyemak maklumat pengangkutan dan kelulusan resit claim.`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#0b141a] text-[#e9edef] p-5 flex flex-col items-center select-none relative">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-4 z-50 bg-[#25d366] text-[#111b21] px-4 py-2 rounded-full font-bold text-xs shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 stroke-[3]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Community Graphic (Styled like WhatsApp screenshot) */}
      <div className="w-44 h-44 rounded-3xl bg-[#103629]/40 border border-[#00a884]/20 flex flex-col items-center justify-center p-5 mb-5 shadow-xl relative overflow-hidden">
        <div className="w-18 h-18 rounded-2xl bg-[#00a884]/20 flex items-center justify-center mb-2">
          <Users className="w-9 h-9 text-[#00a884]" />
        </div>
        <div className="flex items-center gap-2 text-xs text-[#25d366] font-semibold">
          <span>Kumpulan Transport Syarikat</span>
        </div>
      </div>

      <h2 className="text-xl font-bold text-white mb-1.5 text-center">Komuniti & Pasukan Transport</h2>
      <p className="text-xs text-[#8696a0] max-w-sm mb-6 text-center leading-relaxed">
        Komuniti menghubungkan staf pemandu, juruteknik lapangan, dan pengurus untuk memudahkan perkongsian resit, jadual perjalanan, dan kelulusan tuntutan.
      </p>

      {/* Circled data section: Replaced with Hendryaya & made clickable (boleh tekan) */}
      <div className="w-full max-w-md space-y-2.5 mb-6 text-left">
        <div className="flex items-center justify-between px-1 mb-1">
          <span className="text-xs font-bold text-[#8696a0] uppercase tracking-wider">
            Senarai Komuniti (Boleh Tekan)
          </span>
          <span className="text-[11px] text-[#00a884] font-medium">
            {communities.length} Komuniti
          </span>
        </div>

        {communities.map((comm) => (
          <div
            key={comm.id}
            onClick={() => setSelectedCommunity(comm)}
            className="p-3.5 bg-[#182229] hover:bg-[#202c33] active:scale-[0.99] border border-[#222e35] hover:border-[#00a884]/40 rounded-2xl flex items-center justify-between cursor-pointer transition-all shadow-md group"
            title="Klik untuk buka butiran komuniti"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#00a884] to-[#25d366] text-[#111b21] flex items-center justify-center font-extrabold text-sm shrink-0 shadow group-hover:scale-105 transition-transform">
                {comm.avatarText}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-bold text-white group-hover:text-[#25d366] transition-colors truncate">
                    {comm.name}
                  </h4>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00a884] shrink-0" />
                </div>
                <p className="text-[11px] text-[#8696a0] truncate mt-0.5">
                  {comm.description}
                </p>
                <div className="flex items-center gap-2 text-[10px] text-[#8696a0] mt-0.5">
                  <span className="text-white/80 font-medium">{comm.membersCount} Pemandu aktif</span>
                  <span>•</span>
                  <span>{comm.area}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 ml-2">
              <span className="text-[10px] bg-[#00a884]/20 text-[#00a884] font-bold px-2 py-0.5 rounded-full border border-[#00a884]/30">
                {comm.status}
              </span>
              <ChevronRight className="w-4 h-4 text-[#8696a0] group-hover:text-white transition-colors" />
            </div>
          </div>
        ))}
      </div>

      {/* Button Bina Komuniti Saya: Kini BOLEH TEKAN (Interactive & Clickable) */}
      <button
        type="button"
        onClick={() => setIsCreateModalOpen(true)}
        className="w-full max-w-xs py-3 px-6 rounded-full bg-[#00a884] hover:bg-[#008f6f] text-[#111b21] font-bold text-sm shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
        title="Klik untuk bina komuniti cawangan baru"
      >
        <Plus className="w-5 h-5 stroke-[3]" />
        <span>Bina Komuniti Saya</span>
      </button>

      {/* Modal 1: Community Details (When Hendryaya community card is clicked) */}
      {selectedCommunity && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111b21] border border-[#222e35] rounded-3xl w-full max-w-md overflow-hidden shadow-2xl p-5 text-[#e9edef] animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-[#222e35]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#00a884] to-[#25d366] text-[#111b21] flex items-center justify-center font-extrabold text-base">
                  {selectedCommunity.avatarText}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                    <span>{selectedCommunity.name}</span>
                    <CheckCircle2 className="w-4 h-4 text-[#00a884]" />
                  </h3>
                  <p className="text-xs text-[#8696a0]">{selectedCommunity.area}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCommunity(null)}
                className="p-1.5 rounded-full hover:bg-white/10 text-[#8696a0] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div className="bg-[#182229] p-3 rounded-xl border border-[#222e35]">
                <span className="text-[10px] text-[#8696a0] uppercase font-bold block mb-1">
                  Keterangan Komuniti
                </span>
                <p className="text-white/90 leading-relaxed">{selectedCommunity.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-[#182229] p-2.5 rounded-xl border border-[#222e35]">
                  <span className="text-[10px] text-[#8696a0]">Keahlian Pemandu</span>
                  <p className="text-sm font-bold text-white mt-0.5">
                    {selectedCommunity.membersCount} Ahli Berdaftar
                  </p>
                </div>
                <div className="bg-[#182229] p-2.5 rounded-xl border border-[#222e35]">
                  <span className="text-[10px] text-[#8696a0]">Status Pengesahan</span>
                  <p className="text-sm font-bold text-[#00a884] mt-0.5">Disahkan Aktif</p>
                </div>
              </div>

              {/* Internal Channel groups */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] text-[#8696a0] uppercase font-bold block">
                  Saluran WhatsApp Komuniti:
                </span>
                <div className="p-2.5 bg-[#182229] rounded-xl flex items-center justify-between border border-[#222e35]">
                  <span className="text-white font-medium">💬 Saluran Borang & Resit Claim</span>
                  <span className="text-[10px] text-[#00a884]">Aktif</span>
                </div>
                <div className="p-2.5 bg-[#182229] rounded-xl flex items-center justify-between border border-[#222e35]">
                  <span className="text-white font-medium">🚛 Jadual & Laluan Pengangkutan</span>
                  <span className="text-[10px] text-[#00a884]">Aktif</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#222e35] flex items-center gap-2">
              <button
                onClick={() => setSelectedCommunity(null)}
                className="flex-1 py-2.5 rounded-xl bg-[#202c33] hover:bg-[#2a3942] text-xs font-semibold text-[#8696a0] hover:text-white"
              >
                Tutup
              </button>
              <button
                onClick={() => {
                  handleOpenWhatsAppGroup(selectedCommunity);
                  setSelectedCommunity(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#00a884] hover:bg-[#008f6f] text-xs font-bold text-[#111b21] flex items-center justify-center gap-1.5 shadow"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Buka di WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Create Community Modal (When "Bina Komuniti Saya" is clicked) */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111b21] border border-[#222e35] rounded-3xl w-full max-w-md overflow-hidden shadow-2xl p-5 text-[#e9edef] animate-fadeIn">
            <div className="flex items-center justify-between pb-3.5 border-b border-[#222e35]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#00a884] text-[#111b21] flex items-center justify-center font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Bina Komuniti Saya</h3>
                  <p className="text-xs text-[#8696a0]">Cipta komuniti pengangkutan baru</p>
                </div>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-[#8696a0] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCommunity} className="py-4 space-y-3.5 text-xs">
              <div>
                <label className="block text-xs font-semibold text-[#8696a0] mb-1.5 uppercase">
                  Nama Komuniti <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newCommunityName}
                  onChange={(e) => setNewCommunityName(e.target.value)}
                  placeholder="Cth: Hendryaya Cawangan Selatan"
                  className="w-full bg-[#202c33] border border-[#2a3942] focus:border-[#00a884] text-white text-xs rounded-xl px-3.5 py-2.5 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#8696a0] mb-1.5 uppercase">
                  Kawasan / Area
                </label>
                <input
                  type="text"
                  value={newCommunityArea}
                  onChange={(e) => setNewCommunityArea(e.target.value)}
                  placeholder="Cth: Lembah Klang / Johor Bahru / Penang"
                  className="w-full bg-[#202c33] border border-[#2a3942] focus:border-[#00a884] text-white text-xs rounded-xl px-3.5 py-2.5 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#8696a0] mb-1.5 uppercase">
                  Keterangan Komuniti
                </label>
                <textarea
                  rows={2}
                  value={newCommunityDesc}
                  onChange={(e) => setNewCommunityDesc(e.target.value)}
                  placeholder="Cth: Kumpulan pemandu penghantaran stok dan tuntutan rasmi..."
                  className="w-full bg-[#202c33] border border-[#2a3942] focus:border-[#00a884] text-white text-xs rounded-xl px-3.5 py-2.5 outline-none resize-none"
                />
              </div>

              <div className="pt-3 border-t border-[#222e35] flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#202c33] hover:bg-[#2a3942] text-xs font-semibold text-[#8696a0] hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#00a884] hover:bg-[#008f6f] text-xs font-bold text-[#111b21] shadow active:scale-95"
                >
                  Simpan Komuniti
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
