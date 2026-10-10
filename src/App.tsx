import React, { useState, useEffect, useMemo } from 'react';
import {
  Plus,
  Camera,
  MessageSquare,
  Search,
  CheckCircle2,
  AlertCircle,
  FileText,
  RotateCcw,
  Sparkles,
  Receipt,
  Download,
} from 'lucide-react';
import { TransportClaim, ClaimStatus, ActiveTab, ReceiptImage } from './types';
import {
  getClaims,
  saveClaim,
  deleteClaim,
  updateClaimStatus,
  addReceiptToClaim,
  removeReceiptFromClaim,
  resetClaims,
} from './utils/storage';
import { WhatsAppHeader } from './components/WhatsAppHeader';
import { StatusCarousel } from './components/StatusCarousel';
import { FilterPills, FilterValue } from './components/FilterPills';
import { ClaimListItem } from './components/ClaimListItem';
import { WhatsAppChatDetail } from './components/WhatsAppChatDetail';
import { ClaimFormModal } from './components/ClaimFormModal';
import { CameraCaptureModal } from './components/CameraCaptureModal';
import { WhatsAppBottomNav } from './components/WhatsAppBottomNav';
import { UpdatesTab } from './components/UpdatesTab';
import { CommunitiesTab } from './components/CommunitiesTab';
import { ProfileTab } from './components/ProfileTab';

export default function App() {
  const [claims, setClaims] = useState<TransportClaim[]>([]);
  const [activeTab, setActiveTab] = useState<ActiveTab>('chats');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<FilterValue>('all');

  // Selected claim for WhatsApp conversation view
  const [selectedClaimId, setSelectedClaimId] = useState<string | null>(null);

  // Form modals
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [claimToEdit, setClaimToEdit] = useState<TransportClaim | null>(null);

  // Direct fast camera modal (from top bar or FAB)
  const [isDirectCameraOpen, setIsDirectCameraOpen] = useState(false);
  const [directCapturedReceipt, setDirectCapturedReceipt] = useState<string | null>(null);

  // Toast notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const loaded = getClaims();
    setClaims(loaded);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Status counts for badge
  const counts = useMemo(() => {
    return {
      all: claims.length,
      proses: claims.filter((c) => c.status === 'proses').length,
      diluluskan: claims.filter((c) => c.status === 'diluluskan').length,
      Lulus: claims.filter((c) => c.status === 'Lulus').length,
    };
  }, [claims]);

  // Filtered claims based on tab, search, and category/status
  const filteredClaims = useMemo(() => {
    return claims.filter((c) => {
      // Filter by pill
      if (filter === 'proses' && c.status !== 'proses') return false;
      if (filter === 'diluluskan' && c.status !== 'diluluskan') return false;
      if (filter === 'Lulus' && c.status !== 'Lulus') return false;
      if (
        ['petrol', 'diesel', 'TNG', 'hotel', 'parking', 'other'].includes(filter) &&
        c.category !== filter
      ) {
        return false;
      }

      // Filter by search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchCustomer = c.customerName.toLowerCase().includes(q);
        const matchShop = c.shopName.toLowerCase().includes(q);
        const matchArea = c.area.toLowerCase().includes(q);
        const matchLocation = c.location.toLowerCase().includes(q);
        const matchRemark = c.remark.toLowerCase().includes(q);
        const matchCategory = c.category.toLowerCase().includes(q);
        const matchAmount = c.amount.toString().includes(q);
        return (
          matchCustomer ||
          matchShop ||
          matchArea ||
          matchLocation ||
          matchRemark ||
          matchCategory ||
          matchAmount
        );
      }

      return true;
    });
  }, [claims, filter, searchQuery]);

  const selectedClaim = useMemo(() => {
    return claims.find((c) => c.id === selectedClaimId) || null;
  }, [claims, selectedClaimId]);

  // Handlers
  const handleSaveClaim = (claim: TransportClaim) => {
    const updated = saveClaim(claim);
    setClaims(updated);
    setSelectedClaimId(claim.id);
    showToast('Borang claim berjaya disimpan!');
  };

  const handleUpdateStatus = (id: string, newStatus: ClaimStatus) => {
    const updated = updateClaimStatus(id, newStatus);
    setClaims(updated);
    showToast(`Status ditukar kepada "${newStatus}"`);
  };

  const handleAddReceipt = (claimId: string, receipt: ReceiptImage) => {
    const updated = addReceiptToClaim(claimId, receipt);
    setClaims(updated);
    showToast('Gambar resit baru berjaya ditambah!');
  };

  const handleRemoveReceipt = (claimId: string, receiptId: string) => {
    const updated = removeReceiptFromClaim(claimId, receiptId);
    setClaims(updated);
    showToast('Resit telah dipadam.');
  };

  const handleDeleteClaim = (id: string) => {
    const updated = deleteClaim(id);
    setClaims(updated);
    if (selectedClaimId === id) {
      setSelectedClaimId(null);
    }
    showToast('Tuntutan berjaya dipadam.');
  };

  const handleResetData = () => {
    const reset = resetClaims();
    setClaims(reset);
    setSelectedClaimId(null);
    showToast('Data contoh telah dikembalikan.');
  };

  const handleDirectCameraCapture = (dataUrl: string) => {
    setDirectCapturedReceipt(dataUrl);
    setIsDirectCameraOpen(false);

    // Open new claim modal with this receipt pre-populated
    setClaimToEdit({
      id: `claim-${Date.now()}`,
      customerName: '',
      date: new Date().toISOString().split('T')[0],
      shopName: '',
      status: 'proses',
      category: 'petrol',
      remark: 'Resit dimuat naik melalui kamera pantas',
      area: '',
      location: '',
      amount: 0,
      vehicleNo: 'VPF 6614',
      receipts: [
        {
          id: `rec-${Date.now()}`,
          dataUrl,
          source: 'kamera',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          caption: 'Resit Kamera Langsung',
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    setIsFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0b141a] text-[#e9edef] flex justify-center antialiased">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-4 z-50 bg-[#25d366] text-[#111b21] px-4 py-2.5 rounded-full font-bold text-xs shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container - App is responsive: Mobile phone layout on small screens, WhatsApp Web layout on md+ */}
      <div className="w-full max-w-6xl h-screen flex flex-col md:flex-row bg-[#111b21] shadow-2xl overflow-hidden border-x border-[#222e35]/40">
        {/* LEFT PANE: WhatsApp Main Screen (Chats, Updates, Communities, Calls) */}
        <div
          className={`flex flex-col h-full bg-[#0b141a] border-r border-[#222e35] transition-all duration-200 ${
            selectedClaim && 'hidden md:flex md:w-[420px] lg:w-[480px] shrink-0'
          } ${!selectedClaim && 'w-full'}`}
        >
          {/* Header */}
          <WhatsAppHeader
            onOpenNewClaim={() => {
              setClaimToEdit(null);
              setIsFormOpen(true);
            }}
            onOpenCameraDirectly={() => setIsDirectCameraOpen(true)}
            onResetData={handleResetData}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            totalPendingCount={counts.proses}
          />

          {/* Tab 1: Chats (The Main Transport Claims List) */}
          {activeTab === 'chats' && (
            <div className="flex-1 flex flex-col min-h-0 relative">
              {/* Status Stories Carousel */}
              <StatusCarousel
                claims={claims}
                onSelectClaim={(claim) => setSelectedClaimId(claim.id)}
                onAddNew={() => {
                  setClaimToEdit(null);
                  setIsFormOpen(true);
                }}
              />

              {/* Filter Pills */}
              <FilterPills
                currentFilter={filter}
                onFilterChange={setFilter}
                counts={counts}
              />

              {/* Claims List View */}
              <div className="flex-1 overflow-y-auto divide-y divide-[#222e35]/30">
                {filteredClaims.length > 0 ? (
                  filteredClaims.map((claim) => (
                    <ClaimListItem
                      key={claim.id}
                      claim={claim}
                      onClick={() => setSelectedClaimId(claim.id)}
                      onEdit={(c) => {
                        setClaimToEdit(c);
                        setIsFormOpen(true);
                      }}
                      onDelete={(id) => handleDeleteClaim(id)}
                    />
                  ))
                ) : (
                  <div className="p-8 text-center text-[#8696a0] flex flex-col items-center justify-center gap-3 h-64">
                    <div className="w-16 h-16 rounded-full bg-[#202c33] flex items-center justify-center text-2xl">
                      🧾
                    </div>
                    <p className="text-sm font-medium text-white/80">
                      Tiada rekod tuntutan dijumpai.
                    </p>
                    <p className="text-xs max-w-xs">
                      {searchQuery
                        ? `Tiada tuntutan yang sepadan dengan "${searchQuery}".`
                        : 'Klik butang hijau di bawah untuk menambah tuntutan baru.'}
                    </p>
                    <button
                      onClick={() => {
                        setClaimToEdit(null);
                        setIsFormOpen(true);
                      }}
                      className="mt-2 py-2 px-4 rounded-xl bg-[#00a884] text-[#111b21] text-xs font-bold shadow hover:bg-[#008f6f]"
                    >
                      + Tambah Tuntutan Pertama
                    </button>
                  </div>
                )}
              </div>

              {/* WhatsApp Floating Action Buttons (FAB) */}
              <div className="absolute bottom-4 right-4 flex flex-col items-end gap-2.5 z-20 pointer-events-auto">
                {/* Secondary Fast Camera FAB */}
                <button
                  onClick={() => setIsDirectCameraOpen(true)}
                  className="w-10 h-10 rounded-full bg-[#202c33] hover:bg-[#283740] border border-[#2a3942] text-[#00a884] shadow-lg flex items-center justify-center active:scale-90 transition-transform"
                  title="Ambil Foto Resit Pantas"
                  aria-label="Ambil Foto Resit Pantas"
                >
                  <Camera className="w-5 h-5" />
                </button>

                {/* Primary WhatsApp Green FAB (+ Borang Baru) */}
                <button
                  onClick={() => {
                    setClaimToEdit(null);
                    setIsFormOpen(true);
                  }}
                  className="w-14 h-14 rounded-2xl bg-[#25d366] hover:bg-[#20ba59] active:scale-95 text-[#111b21] shadow-2xl flex items-center justify-center transition-transform group"
                  title="Tambah Borang Claim Baru"
                  aria-label="Tambah Borang Claim Baru"
                >
                  <Plus className="w-7 h-7 stroke-[2.5] group-hover:rotate-90 transition-transform" />
                </button>
              </div>
            </div>
          )}

          {/* Tab 2: Updates (Status & Financial Ringkasan) */}
          {activeTab === 'updates' && (
            <UpdatesTab
              claims={claims}
              onSelectClaim={(claim) => setSelectedClaimId(claim.id)}
              onOpenNewClaim={() => {
                setClaimToEdit(null);
                setIsFormOpen(true);
              }}
              onOpenCamera={() => setIsDirectCameraOpen(true)}
            />
          )}

          {/* Tab 3: Communities (Transport Logistics Team) */}
          {activeTab === 'communities' && <CommunitiesTab />}

          {/* Tab 4: Profile (hendryaya official) */}
          {(activeTab === 'profile' || (activeTab as string) === 'calls') && (
            <ProfileTab
              claims={claims}
              onOpenNewClaim={() => {
                setClaimToEdit(null);
                setIsFormOpen(true);
              }}
            />
          )}

          {/* WhatsApp Bottom Nav (Chats, Updates, Communities, Profile) */}
          <WhatsAppBottomNav
            activeTab={activeTab}
            onTabChange={setActiveTab}
            pendingCount={counts.proses}
          />
        </div>

        {/* RIGHT PANE: WhatsApp Conversation & Claim Details */}
        <div
          className={`flex-1 h-full bg-[#0b141a] flex flex-col ${
            !selectedClaim ? 'hidden md:flex' : 'w-full'
          }`}
        >
          {selectedClaim ? (
            <WhatsAppChatDetail
              claim={selectedClaim}
              onBack={() => setSelectedClaimId(null)}
              onUpdateStatus={handleUpdateStatus}
              onAddReceipt={handleAddReceipt}
              onRemoveReceipt={handleRemoveReceipt}
              onEditClaim={(c) => {
                setClaimToEdit(c);
                setIsFormOpen(true);
              }}
              onDeleteClaim={handleDeleteClaim}
            />
          ) : (
            /* WhatsApp Web Blank Slate / Placeholder */
            <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-[#111b21] text-[#8696a0] select-none border-b-[6px] border-[#00a884]">
              <div className="w-24 h-24 rounded-full bg-[#202c33] flex items-center justify-center mb-6 shadow-inner text-[#00a884]">
                <Receipt className="w-12 h-12" />
              </div>
              <h2 className="text-xl font-bold text-[#e9edef] mb-2">
                hendryaya Official Transport Claim
              </h2>
              <p className="text-xs text-[#8696a0] max-w-sm mb-6 leading-relaxed">
                Pilih mana-mana tuntutan di sebelah kiri untuk melihat butiran lengkap, status
                kelulusan, gambar resit rasmi atau hantar salinan mesej ke WhatsApp.
              </p>

              <button
                onClick={() => {
                  setClaimToEdit(null);
                  setIsFormOpen(true);
                }}
                className="py-2.5 px-6 rounded-full bg-[#00a884] hover:bg-[#008f6f] text-[#111b21] font-bold text-xs shadow-lg transition-all active:scale-95 flex items-center gap-2"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>+ Borang Tuntutan Baru</span>
              </button>

              <div className="mt-12 text-[11px] text-[#8696a0]/60 flex items-center gap-2">
                <span>🔒 Disulitkan dari hujung ke hujung untuk rekod syarikat</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Claim Form Modal (Add / Edit) */}
      <ClaimFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setClaimToEdit(null);
        }}
        onSave={handleSaveClaim}
        initialClaim={claimToEdit}
      />

      {/* Direct Fast Camera Modal */}
      <CameraCaptureModal
        isOpen={isDirectCameraOpen}
        onClose={() => setIsDirectCameraOpen(false)}
        onCapture={handleDirectCameraCapture}
      />
    </div>
  );
}
