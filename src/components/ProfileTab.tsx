import React from 'react';
import {
  User,
  CheckCircle2,
  Car,
  Phone,
  Mail,
  ShieldCheck,
  Building,
  FileText,
  DollarSign,
  Receipt,
  QrCode,
  Share2,
  Settings,
  Bell,
  Lock,
  MessageCircle,
} from 'lucide-react';
import { TransportClaim } from '../types';

interface ProfileTabProps {
  claims: TransportClaim[];
  onOpenNewClaim: () => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({ claims, onOpenNewClaim }) => {
  const totalAmount = claims.reduce((sum, c) => sum + c.amount, 0);
  const lulusClaims = claims.filter((c) => c.status === 'Lulus');
  const prosesClaims = claims.filter((c) => c.status === 'proses');
  const totalReceipts = claims.reduce((sum, c) => sum + (c.receipts?.length || 0), 0);

  const handleShareProfile = () => {
    const text = `Profil Rasmi Transport Claim:\n*hendryaya official*\nNo Kenderaan: VPF 6614\nSyarikat: hendryaya shop enterprise\nJumlah Tuntutan Aktif: RM ${totalAmount.toFixed(2)}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#0b141a] text-[#e9edef] p-4 space-y-5 select-none">
      {/* Top Profile Header Card */}
      <div className="bg-[#182229] border border-[#222e35] rounded-3xl p-5 shadow-xl relative overflow-hidden">
        {/* Background glow banner */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-r from-[#00a884]/30 via-[#103629]/40 to-[#00a884]/20" />

        <div className="relative pt-6 flex flex-col items-center text-center">
          {/* Avatar with WhatsApp green ring */}
          <div className="relative mb-3">
            <div className="w-24 h-24 rounded-full bg-[#202c33] border-4 border-[#00a884] shadow-2xl flex items-center justify-center text-white text-3xl font-extrabold overflow-hidden">
              <span className="bg-gradient-to-tr from-[#00a884] to-[#25d366] text-[#111b21] w-full h-full flex items-center justify-center">
                HO
              </span>
            </div>
            <div className="absolute bottom-1 right-1 w-6 h-6 bg-[#25d366] rounded-full border-2 border-[#182229] flex items-center justify-center text-[#111b21] shadow" title="Akaun Disahkan">
              <CheckCircle2 className="w-4 h-4 stroke-[3]" />
            </div>
          </div>

          {/* User Name - hendryaya official */}
          <h2 className="text-xl font-bold text-white flex items-center gap-1.5">
            <span>hendryaya official</span>
            <span className="text-[#00a884] text-xs px-2 py-0.5 rounded-full bg-[#00a884]/15 border border-[#00a884]/30">
              Verified
            </span>
          </h2>

          <p className="text-xs text-[#8696a0] mt-0.5">
            Pegawai Logistik & Pemandu Kenderaan Syarikat
          </p>

          {/* Bio from user WhatsApp chat */}
          <div className="mt-3 bg-[#202c33]/80 border border-[#2a3942] rounded-xl px-4 py-2 text-xs text-[#d1d7db] italic max-w-sm">
            "Aplikasi claim form transport sama macam WhatsApp"
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 mt-4">
            <button
              onClick={handleShareProfile}
              className="py-2 px-4 rounded-full bg-[#202c33] hover:bg-[#283740] text-xs text-[#00a884] font-semibold border border-[#2a3942] flex items-center gap-1.5 active:scale-95 transition-all"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Kongsi Profil</span>
            </button>
            <button
              onClick={onOpenNewClaim}
              className="py-2 px-4 rounded-full bg-[#00a884] hover:bg-[#008f6f] text-xs text-[#111b21] font-bold flex items-center gap-1.5 shadow active:scale-95 transition-all"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Hantar Claim Baru</span>
            </button>
          </div>
        </div>
      </div>

      {/* Ringkasan Statistik Tuntutan hendryaya official */}
      <div>
        <h3 className="text-xs font-bold text-[#8696a0] uppercase tracking-wider mb-2.5 px-1">
          Statistik Tuntutan hendryaya official
        </h3>
        <div className="grid grid-cols-3 gap-2.5">
          <div className="bg-[#182229] border border-[#222e35] p-3 rounded-2xl flex flex-col justify-between">
            <span className="text-[10px] text-[#8696a0]">Jumlah Dituntut</span>
            <p className="text-base sm:text-lg font-extrabold text-[#25d366] mt-1">
              RM {totalAmount.toFixed(0)}
            </p>
            <span className="text-[9px] text-[#8696a0] mt-0.5">{claims.length} rekod</span>
          </div>

          <div className="bg-[#182229] border border-[#222e35] p-3 rounded-2xl flex flex-col justify-between">
            <span className="text-[10px] text-emerald-400">Tuntutan Lulus</span>
            <p className="text-base sm:text-lg font-extrabold text-white mt-1">
              {lulusClaims.length}
            </p>
            <span className="text-[9px] text-emerald-400/80 mt-0.5">Selesai bayar</span>
          </div>

          <div className="bg-[#182229] border border-[#222e35] p-3 rounded-2xl flex flex-col justify-between">
            <span className="text-[10px] text-[#00a884]">Resit Kamera</span>
            <p className="text-base sm:text-lg font-extrabold text-white mt-1">
              {totalReceipts}
            </p>
            <span className="text-[9px] text-[#8696a0] mt-0.5">Keping fail</span>
          </div>
        </div>
      </div>

      {/* Butiran Akaun & Kenderaan */}
      <div>
        <h3 className="text-xs font-bold text-[#8696a0] uppercase tracking-wider mb-2.5 px-1">
          Maklumat Rasmi Pemandu
        </h3>
        <div className="bg-[#182229] border border-[#222e35] rounded-2xl divide-y divide-[#222e35]/60 text-xs">
          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3 text-[#8696a0]">
              <User className="w-4 h-4 text-[#00a884]" />
              <span className="text-white font-medium">Nama Pengguna</span>
            </div>
            <span className="text-[#00a884] font-bold">hendryaya official</span>
          </div>

          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3 text-[#8696a0]">
              <Car className="w-4 h-4 text-[#00a884]" />
              <span className="text-white font-medium">No. Plat Kenderaan</span>
            </div>
            <span className="bg-[#202c33] px-2.5 py-0.5 rounded-md font-mono font-bold text-white border border-[#2a3942]">
              VPF 6614
            </span>
          </div>

          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3 text-[#8696a0]">
              <Building className="w-4 h-4 text-[#00a884]" />
              <span className="text-white font-medium">Unit Cawangan</span>
            </div>
            <span className="text-white font-medium">hendryaya shop enterprise</span>
          </div>

          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3 text-[#8696a0]">
              <Mail className="w-4 h-4 text-[#00a884]" />
              <span className="text-white font-medium">Emel Rasmi</span>
            </div>
            <span className="text-[#8696a0] font-mono">hendryaya_official@yahoo.com</span>
          </div>

          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3 text-[#8696a0]">
              <ShieldCheck className="w-4 h-4 text-[#00a884]" />
              <span className="text-white font-medium">Status Pengesahan</span>
            </div>
            <span className="text-[#25d366] font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Disahkan Aktif
            </span>
          </div>
        </div>
      </div>

      {/* Tetapan & Bantuan */}
      <div>
        <h3 className="text-xs font-bold text-[#8696a0] uppercase tracking-wider mb-2.5 px-1">
          Bantuan & WhatsApp Support
        </h3>
        <div className="bg-[#182229] border border-[#222e35] rounded-2xl p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#103629] text-[#25d366] flex items-center justify-center">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Hubungi Admin Syarikat</h4>
              <p className="text-[10px] text-[#8696a0]">Hantar pertanyaan status tuntutan melalui WhatsApp</p>
            </div>
          </div>
          <button
            onClick={() => window.open('https://wa.me/', '_blank')}
            className="text-xs bg-[#00a884] text-[#111b21] font-bold px-3 py-1.5 rounded-xl hover:bg-[#008f6f] transition-all"
          >
            Buka
          </button>
        </div>
      </div>
    </div>
  );
};
