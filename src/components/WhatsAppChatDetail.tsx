import React, { useState, useRef } from 'react';
import {
  ArrowLeft,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Camera,
  Send,
  Check,
  CheckCheck,
  Clock,
  Share2,
  Printer,
  Edit,
  Trash2,
  Image as ImageIcon,
  Plus,
  Eye,
  ShieldCheck,
  MapPin,
  ExternalLink,
  Copy,
} from 'lucide-react';
import { TransportClaim, ClaimStatus, ReceiptImage } from '../types';
import { CameraCaptureModal } from './CameraCaptureModal';
import { ReceiptImageViewer } from './ReceiptImageViewer';
import { formatWhatsAppMessage } from '../utils/storage';

interface WhatsAppChatDetailProps {
  claim: TransportClaim;
  onBack: () => void;
  onUpdateStatus: (id: string, status: ClaimStatus) => void;
  onAddReceipt: (claimId: string, receipt: ReceiptImage) => void;
  onRemoveReceipt: (claimId: string, receiptId: string) => void;
  onEditClaim: (claim: TransportClaim) => void;
  onDeleteClaim: (id: string) => void;
}

export const WhatsAppChatDetail: React.FC<WhatsAppChatDetailProps> = ({
  claim,
  onBack,
  onUpdateStatus,
  onAddReceipt,
  onRemoveReceipt,
  onEditClaim,
  onDeleteClaim,
}) => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<ReceiptImage | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [chatRemarks, setChatRemarks] = useState<{ id: string; text: string; time: string; sender: 'me' | 'admin' }[]>([]);

  const galleryInputRef = useRef<HTMLInputElement | null>(null);

  const getStatusBadge = (status: ClaimStatus) => {
    switch (status) {
      case 'Lulus':
        return {
          label: 'Lulus (Selesai)',
          bg: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
          ticks: <CheckCheck className="w-4 h-4 text-[#53bdeb] inline-block" />,
        };
      case 'diluluskan':
        return {
          label: 'Diluluskan',
          bg: 'bg-teal-500/20 text-teal-300 border border-teal-500/30',
          ticks: <CheckCheck className="w-4 h-4 text-[#53bdeb] inline-block" />,
        };
      case 'proses':
      default:
        return {
          label: 'Dalam Proses',
          bg: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
          ticks: <CheckCheck className="w-4 h-4 text-[#8696a0] inline-block" />,
        };
    }
  };

  const statusInfo = getStatusBadge(claim.status);

  const handleShareWhatsApp = () => {
    const text = formatWhatsAppMessage(claim);
    const encoded = encodeURIComponent(text);
    const url = `https://api.whatsapp.com/send?text=${encoded}`;
    window.open(url, '_blank');
  };

  const handleCopyText = async () => {
    const text = formatWhatsAppMessage(claim);
    try {
      await navigator.clipboard.writeText(text);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2500);
    } catch {
      // Fallback
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCameraCapture = (dataUrl: string, source: 'kamera') => {
    const newReceipt: ReceiptImage = {
      id: `rec-${Date.now()}`,
      dataUrl,
      source,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      caption: `Resit ${claim.shopName}`,
    };
    onAddReceipt(claim.id, newReceipt);
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          const newReceipt: ReceiptImage = {
            id: `rec-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
            dataUrl: reader.result,
            source: 'galeri',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            caption: file.name.substring(0, 30),
          };
          onAddReceipt(claim.id, newReceipt);
        }
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setChatRemarks((prev) => [
      ...prev,
      {
        id: `msg-${Date.now()}`,
        text: newMessage.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sender: 'me',
      },
    ]);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-full bg-[#0b141a] text-[#e9edef] select-none relative">
      {/* Hidden Gallery Input */}
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleGalleryUpload}
      />

      {/* Top Header Styled Like WhatsApp Chat Screen */}
      <header className="bg-[#202c33] px-3 py-2.5 flex items-center justify-between border-b border-[#222e35] z-10 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <button
            onClick={onBack}
            className="p-1.5 rounded-full hover:bg-white/10 active:scale-95 transition-all text-[#aebac1]"
            aria-label="Kembali"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Shop Avatar */}
          <div className="w-10 h-10 rounded-full bg-[#128c7e] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow">
            {claim.category === 'petrol' && '⛽'}
            {claim.category === 'diesel' && '🚛'}
            {claim.category === 'TNG' && '💳'}
            {claim.category === 'hotel' && '🏨'}
            {claim.category === 'parking' && '🅿️'}
            {claim.category === 'other' && '📦'}
          </div>

          <div className="min-w-0">
            <h1 className="text-sm font-semibold truncate text-[#e9edef] flex items-center gap-1.5">
              <span>{claim.shopName}</span>
            </h1>
            <p className="text-[11px] text-[#8696a0] truncate flex items-center gap-1">
              <span>{claim.customerName}</span>
              <span>•</span>
              <span className="text-[#00a884]">{claim.date}</span>
            </p>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1 text-[#aebac1]">
          <button
            onClick={handleShareWhatsApp}
            title="Kongsi ke WhatsApp"
            className="p-2 rounded-full hover:bg-white/10 active:scale-95 transition-all text-[#25d366]"
          >
            <Share2 className="w-5 h-5" />
          </button>
          <button
            onClick={handleCopyText}
            title="Salin Teks Mesej"
            className="p-2 rounded-full hover:bg-white/10 active:scale-95 transition-all"
          >
            <Copy className="w-5 h-5" />
          </button>
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-full hover:bg-white/10 active:scale-95 transition-all"
            >
              <MoreVertical className="w-5 h-5" />
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-10 w-48 bg-[#233138] border border-[#2a3942] rounded-xl shadow-xl py-1 z-30 text-xs">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onEditClaim(claim);
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-[#182229] flex items-center gap-2.5 text-[#e9edef]"
                >
                  <Edit className="w-4 h-4 text-[#00a884]" /> Edit Borang Ini
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    handlePrint();
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-[#182229] flex items-center gap-2.5 text-[#e9edef]"
                >
                  <Printer className="w-4 h-4 text-cyan-400" /> Cetak Slip Claim
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    if (window.confirm('Padamkan rekod tuntutan ini?')) {
                      onDeleteClaim(claim.id);
                      onBack();
                    }
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-[#182229] flex items-center gap-2.5 text-red-400"
                >
                  <Trash2 className="w-4 h-4" /> Padam Tuntutan
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Copied Toast Banner */}
      {copiedToast && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 bg-[#25d366] text-[#111b21] px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4 stroke-[3]" /> Format Mesej Disalin ke Papan Keratan!
        </div>
      )}

      {/* Chat Messages Canvas with WhatsApp Doodle Pattern background */}
      <div
        className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4"
        style={{
          backgroundImage: `radial-gradient(#1f2c34 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      >
        {/* Date Stamp Pill */}
        <div className="flex justify-center">
          <span className="bg-[#182229]/90 text-[#8696a0] text-[11px] font-medium px-3 py-1 rounded-lg border border-[#222e35] shadow-sm">
            {claim.date} • No Kenderaan: {claim.vehicleNo || 'VPF 6614'}
          </span>
        </div>

        {/* Incoming Notice Bubble */}
        <div className="flex justify-start">
          <div className="max-w-[85%] sm:max-w-[70%] bg-[#202c33] rounded-2xl rounded-tl-none p-3 shadow-md text-xs space-y-1 border border-[#2a3942]/50">
            <p className="font-semibold text-[#00a884] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Sistem Tuntutan Transport
            </p>
            <p className="text-[#d1d7db] leading-relaxed">
              Borang tuntutan perbelanjaan rasmi untuk <span className="text-white font-medium">{claim.customerName}</span> di <span className="text-white font-medium">{claim.shopName}</span> telah didaftarkan.
            </p>
            <p className="text-[10px] text-[#8696a0] text-right mt-1">
              {new Date(claim.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>

        {/* The Main Transport Claim WhatsApp Card Bubble (Outgoing / Sent) */}
        <div className="flex justify-end">
          <div className="w-full sm:max-w-[88%] md:max-w-[75%] bg-[#005c4b] text-[#e9edef] rounded-2xl rounded-tr-none p-4 shadow-xl border border-emerald-600/30 space-y-3">
            {/* Header in Bubble */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="text-lg">📋</span>
                <span className="text-xs sm:text-sm font-bold tracking-wide">
                  BORANG CLAIM TRANSPORT
                </span>
              </div>
              <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-semibold ${statusInfo.bg}`}>
                {statusInfo.label}
              </span>
            </div>

            {/* 10 Required Items Displayed Beautifully */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs bg-black/20 p-3 rounded-xl border border-white/5">
              <div>
                <span className="text-[10px] text-white/60 block uppercase">1. Nama Customer</span>
                <p className="font-semibold text-white truncate">{claim.customerName}</p>
              </div>

              <div>
                <span className="text-[10px] text-white/60 block uppercase">2. Tarikh</span>
                <p className="font-semibold text-white">{claim.date}</p>
              </div>

              <div>
                <span className="text-[10px] text-white/60 block uppercase">3. Nama Shop</span>
                <p className="font-semibold text-white truncate">{claim.shopName}</p>
              </div>

              <div>
                <span className="text-[10px] text-white/60 block uppercase">4. Status Semasa</span>
                <p className="font-semibold capitalize text-emerald-200">{claim.status}</p>
              </div>

              <div>
                <span className="text-[10px] text-white/60 block uppercase">5. Jenis Claim</span>
                <p className="font-semibold uppercase text-cyan-200">{claim.category}</p>
              </div>

              <div>
                <span className="text-[10px] text-white/60 block uppercase">9. Jumlah (RM)</span>
                <p className="text-base font-extrabold text-[#25d366]">RM {claim.amount.toFixed(2)}</p>
              </div>

              <div>
                <span className="text-[10px] text-white/60 block uppercase">7. Area</span>
                <p className="font-semibold text-white truncate">{claim.area || '-'}</p>
              </div>

              <div>
                <span className="text-[10px] text-white/60 block uppercase">8. Location</span>
                <p className="font-semibold text-white truncate">{claim.location || '-'}</p>
              </div>

              <div className="sm:col-span-2">
                <span className="text-[10px] text-white/60 block uppercase">6. Remark / Catatan</span>
                <p className="font-normal text-white/90 italic bg-black/20 p-2 rounded-lg mt-0.5 text-[11px]">
                  "{claim.remark || 'Tiada catatan tambahan'}"
                </p>
              </div>
            </div>

            {/* 10. Resit / Lampiran Gambar Gallery within Bubble */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white/90 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-[#25d366]" />
                  10. Resit Claim ({claim.receipts?.length || 0} keping)
                </span>
                <span className="text-[10px] text-white/70">Klik mana-mana gambar untuk zoom</span>
              </div>

              {claim.receipts && claim.receipts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {claim.receipts.map((rec) => (
                    <div
                      key={rec.id}
                      onClick={() => setSelectedReceipt(rec)}
                      className="group relative aspect-square rounded-xl overflow-hidden bg-black/40 border border-white/10 cursor-pointer shadow-md hover:scale-[1.02] transition-transform"
                    >
                      <img
                        src={rec.dataUrl}
                        alt="Resit"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-2 opacity-90">
                        <span className="text-[10px] text-white/90 font-medium truncate">
                          {rec.caption || 'Resit'}
                        </span>
                        <span className="text-[9px] text-white/60">
                          {rec.source === 'kamera' ? '📷 Kamera' : '🖼️ Galeri'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-black/20 rounded-xl p-3 text-center border border-dashed border-white/20">
                  <p className="text-xs text-white/70">Belum ada gambar resit dilampirkan.</p>
                </div>
              )}
            </div>

            {/* Quick Status Control Buttons inside the message */}
            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              <span className="text-[10px] uppercase font-bold text-white/60 tracking-wider">
                Tukar Status Tuntutan Cepat:
              </span>
              <div className="grid grid-cols-3 gap-1.5 text-xs">
                <button
                  onClick={() => onUpdateStatus(claim.id, 'proses')}
                  className={`py-1.5 px-2 rounded-lg font-medium transition-all text-center ${
                    claim.status === 'proses'
                      ? 'bg-amber-400 text-black font-bold shadow'
                      : 'bg-black/30 hover:bg-black/40 text-amber-200'
                  }`}
                >
                  ⏳ Proses
                </button>
                <button
                  onClick={() => onUpdateStatus(claim.id, 'diluluskan')}
                  className={`py-1.5 px-2 rounded-lg font-medium transition-all text-center ${
                    claim.status === 'diluluskan'
                      ? 'bg-emerald-400 text-black font-bold shadow'
                      : 'bg-black/30 hover:bg-black/40 text-emerald-200'
                  }`}
                >
                  🟢 Diluluskan
                </button>
                <button
                  onClick={() => onUpdateStatus(claim.id, 'Lulus')}
                  className={`py-1.5 px-2 rounded-lg font-medium transition-all text-center ${
                    claim.status === 'Lulus'
                      ? 'bg-cyan-400 text-black font-bold shadow'
                      : 'bg-black/30 hover:bg-black/40 text-cyan-200'
                  }`}
                >
                  ✅ Lulus
                </button>
              </div>
            </div>

            {/* Timestamp & double ticks */}
            <div className="flex items-center justify-end gap-1.5 text-[10px] text-white/70 pt-1">
              <span>{new Date(claim.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              {statusInfo.ticks}
            </div>
          </div>
        </div>

        {/* Dynamic chat additions */}
        {chatRemarks.map((msg) => (
          <div key={msg.id} className="flex justify-end">
            <div className="max-w-[75%] bg-[#005c4b] text-[#e9edef] rounded-2xl rounded-tr-none p-2.5 px-3 shadow text-xs space-y-1">
              <p>{msg.text}</p>
              <div className="flex items-center justify-end gap-1 text-[9px] text-white/60">
                <span>{msg.time}</span>
                <CheckCheck className="w-3 h-3 text-[#53bdeb]" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Bar: Direct Camera & Gallery Receipt Attachment Actions + Quick Message Bar */}
      <footer className="bg-[#202c33] p-2.5 border-t border-[#222e35] z-10 shrink-0">
        {/* Update Receipt Buttons (Kamera & Galeri directly) */}
        <div className="flex items-center gap-2 mb-2">
          <button
            onClick={() => setIsCameraOpen(true)}
            className="flex-1 py-2 px-3 rounded-xl bg-[#00a884] hover:bg-[#008f6f] text-[#111b21] font-bold text-xs flex items-center justify-center gap-1.5 shadow active:scale-98 transition-all"
          >
            <Camera className="w-4 h-4 stroke-[2.5]" />
            <span>+ Tambah Gambar Kamera</span>
          </button>
          <button
            onClick={() => galleryInputRef.current?.click()}
            className="flex-1 py-2 px-3 rounded-xl bg-[#2a3942] hover:bg-[#344550] text-[#e9edef] font-semibold text-xs flex items-center justify-center gap-1.5 border border-[#3b4c57] active:scale-98 transition-all"
          >
            <ImageIcon className="w-4 h-4 text-[#00a884]" />
            <span>+ Tambah Gambar Galeri</span>
          </button>
        </div>

        {/* Bottom Chat Input Form */}
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <div className="flex-1 flex items-center bg-[#2a3942] rounded-full px-3 py-1.5 border border-[#374248]">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Tulis catatan atau mesej tuntutan..."
              className="w-full bg-transparent text-xs text-[#e9edef] placeholder:text-[#8696a0] outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="w-10 h-10 rounded-full bg-[#00a884] hover:bg-[#008f6f] disabled:opacity-50 text-[#111b21] flex items-center justify-center shrink-0 shadow active:scale-95 transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </footer>

      {/* Camera Capture Modal */}
      <CameraCaptureModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={handleCameraCapture}
      />

      {/* Receipt Image Viewer */}
      <ReceiptImageViewer
        receipt={selectedReceipt}
        onClose={() => setSelectedReceipt(null)}
        onDelete={(receiptId) => onRemoveReceipt(claim.id, receiptId)}
        canDelete={true}
      />
    </div>
  );
};
