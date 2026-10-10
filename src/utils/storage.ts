import { TransportClaim, ClaimStatus, ReceiptImage } from '../types';
import { INITIAL_CLAIMS } from './sampleData';

const STORAGE_KEY = 'whatsapp_transport_claims_v1';

export function getClaims(): TransportClaim[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_CLAIMS));
      return INITIAL_CLAIMS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_CLAIMS;
  } catch (err) {
    console.error('Error loading claims from storage:', err);
    return INITIAL_CLAIMS;
  }
}

export function saveClaim(claim: TransportClaim): TransportClaim[] {
  const current = getClaims();
  const index = current.findIndex((c) => c.id === claim.id);
  let updated: TransportClaim[];

  if (index >= 0) {
    updated = [...current];
    updated[index] = {
      ...claim,
      updatedAt: new Date().toISOString(),
    };
  } else {
    updated = [
      {
        ...claim,
        createdAt: claim.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      ...current,
    ];
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Storage quota exceeded or error, keeping in-memory:', err);
  }
  return updated;
}

export function deleteClaim(id: string): TransportClaim[] {
  const current = getClaims();
  const updated = current.filter((c) => c.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Error deleting claim:', err);
  }
  return updated;
}

export function updateClaimStatus(id: string, newStatus: ClaimStatus): TransportClaim[] {
  const current = getClaims();
  const updated = current.map((c) => {
    if (c.id === id) {
      return {
        ...c,
        status: newStatus,
        updatedAt: new Date().toISOString(),
      };
    }
    return c;
  });

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Error updating status:', err);
  }
  return updated;
}

export function addReceiptToClaim(claimId: string, receipt: ReceiptImage): TransportClaim[] {
  const current = getClaims();
  const updated = current.map((c) => {
    if (c.id === claimId) {
      return {
        ...c,
        receipts: [receipt, ...(c.receipts || [])],
        updatedAt: new Date().toISOString(),
      };
    }
    return c;
  });

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Error adding receipt:', err);
  }
  return updated;
}

export function removeReceiptFromClaim(claimId: string, receiptId: string): TransportClaim[] {
  const current = getClaims();
  const updated = current.map((c) => {
    if (c.id === claimId) {
      return {
        ...c,
        receipts: (c.receipts || []).filter((r) => r.id !== receiptId),
        updatedAt: new Date().toISOString(),
      };
    }
    return c;
  });

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Error removing receipt:', err);
  }
  return updated;
}

export function resetClaims(): TransportClaim[] {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_CLAIMS));
  } catch (err) {
    console.warn('Reset error:', err);
  }
  return INITIAL_CLAIMS;
}

// Format claim to official WhatsApp message text
export function formatWhatsAppMessage(claim: TransportClaim): string {
  const statusEmoji = claim.status === 'Lulus' ? '✅ LULUS' : claim.status === 'diluluskan' ? '🟢 DILULUSKAN' : '⏳ DALAM PROSES';
  const categoryLabel = claim.category.toUpperCase();

  return `*📋 BORANG TUNTUTAN TRANSPORT / CLAIM FORM*
---------------------------------------
👤 *Nama Customer:* ${claim.customerName}
🏪 *Nama Shop:* ${claim.shopName}
📅 *Tarikh:* ${claim.date}
🏷️ *Jenis Claim:* ${categoryLabel}
💰 *Jumlah:* RM ${claim.amount.toFixed(2)}
📌 *Status:* ${statusEmoji}
📍 *Area:* ${claim.area || '-'}
🗺️ *Location:* ${claim.location || '-'}
📝 *Remark:* ${claim.remark || '-'}
🚗 *No Kenderaan:* ${claim.vehicleNo || 'VPF 6614'}
📸 *Bilangan Resit:* ${claim.receipts?.length || 0} keping
---------------------------------------
_Dihantar melalui WhatsApp Transport Claim App_`;
}
