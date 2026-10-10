export type ClaimStatus = 'proses' | 'diluluskan' | 'Lulus';

export type ClaimCategory = 'TNG' | 'petrol' | 'diesel' | 'hotel' | 'parking' | 'other';

export interface ReceiptImage {
  id: string;
  dataUrl: string;
  caption?: string;
  timestamp: string;
  source: 'kamera' | 'galeri';
}

export interface TransportClaim {
  id: string;
  customerName: string;   // 1. nama customer
  date: string;           // 2. date (YYYY-MM-DD)
  shopName: string;       // 3. nama shop
  status: ClaimStatus;    // 4. status : diluluskan , proses Dan Lulus
  category: ClaimCategory;// 5. jenis claim : TNG, petrol, diesel, hotel, parking Dan other
  remark: string;         // 6. remark
  area: string;           // 7. area
  location: string;       // 8. location
  amount: number;         // 9. Rm
  receipts: ReceiptImage[]; // 10. gambar-gambar claim resit
  createdAt: string;
  updatedAt: string;
  staffName?: string;
  vehicleNo?: string;
}

export type ActiveTab = 'chats' | 'updates' | 'communities' | 'profile' | 'calls';
