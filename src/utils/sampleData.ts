import { TransportClaim } from '../types';

// Helper to generate a clean realistic receipt placeholder image
export function generateReceiptPlaceholder(shop: string, amount: number, date: string, type: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="600" viewBox="0 0 400 600">
    <defs>
      <pattern id="paper-dots" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="#e2e8f0" />
      </pattern>
    </defs>
    <rect width="400" height="600" fill="#f8fafc" />
    <rect x="20" y="20" width="360" height="560" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="2" />
    
    <!-- Top Receipt ZigZag -->
    <path d="M 20 40 L 40 30 L 60 40 L 80 30 L 100 40 L 120 30 L 140 40 L 160 30 L 180 40 L 200 30 L 220 40 L 240 30 L 260 40 L 280 30 L 300 40 L 320 30 L 340 40 L 360 30 L 380 40" fill="none" stroke="#94a3b8" stroke-width="2"/>
    
    <!-- Header -->
    <text x="200" y="90" font-family="Courier New, monospace" font-size="22" font-weight="bold" fill="#0f172a" text-anchor="middle">RESIT RASMI / RECEIPT</text>
    <text x="200" y="125" font-family="Courier New, monospace" font-size="16" font-weight="bold" fill="#008069" text-anchor="middle">${shop.toUpperCase()}</text>
    <text x="200" y="150" font-family="Courier New, monospace" font-size="12" fill="#64748b" text-anchor="middle">TRANSPORT CLAIM EXPENSE</text>
    <line x1="40" y1="170" x2="360" y2="170" stroke="#cbd5e1" stroke-dasharray="4,4" stroke-width="1.5" />
    
    <!-- Details -->
    <text x="50" y="205" font-family="Courier New, monospace" font-size="13" fill="#475569">TARIKH / DATE:</text>
    <text x="350" y="205" font-family="Courier New, monospace" font-size="13" font-weight="bold" fill="#0f172a" text-anchor="end">${date}</text>
    
    <text x="50" y="235" font-family="Courier New, monospace" font-size="13" fill="#475569">KATEGORI CLAIM:</text>
    <text x="350" y="235" font-family="Courier New, monospace" font-size="13" font-weight="bold" fill="#0f172a" text-anchor="end">${type.toUpperCase()}</text>
    
    <text x="50" y="265" font-family="Courier New, monospace" font-size="13" fill="#475569">STATUS:</text>
    <text x="350" y="265" font-family="Courier New, monospace" font-size="13" font-weight="bold" fill="#008069" text-anchor="end">TERIMA / VERIFIED</text>
    
    <line x1="40" y1="290" x2="360" y2="290" stroke="#cbd5e1" stroke-dasharray="4,4" stroke-width="1.5" />
    
    <!-- Item row -->
    <text x="50" y="330" font-family="Courier New, monospace" font-size="14" fill="#334155">Perbelanjaan Perjalanan</text>
    <text x="350" y="330" font-family="Courier New, monospace" font-size="14" fill="#334155" text-anchor="end">RM ${amount.toFixed(2)}</text>
    
    <line x1="40" y1="360" x2="360" y2="360" stroke="#94a3b8" stroke-width="1.5" />
    
    <!-- Total -->
    <text x="50" y="400" font-family="Courier New, monospace" font-size="16" font-weight="bold" fill="#0f172a">JUMLAH (RM):</text>
    <text x="350" y="400" font-family="Courier New, monospace" font-size="20" font-weight="bold" fill="#059669" text-anchor="end">RM ${amount.toFixed(2)}</text>
    
    <!-- Barcode simulation -->
    <rect x="60" y="460" width="6" height="50" fill="#0f172a" />
    <rect x="72" y="460" width="12" height="50" fill="#0f172a" />
    <rect x="90" y="460" width="4" height="50" fill="#0f172a" />
    <rect x="100" y="460" width="16" height="50" fill="#0f172a" />
    <rect x="124" y="460" width="8" height="50" fill="#0f172a" />
    <rect x="140" y="460" width="4" height="50" fill="#0f172a" />
    <rect x="152" y="460" width="14" height="50" fill="#0f172a" />
    <rect x="174" y="460" width="8" height="50" fill="#0f172a" />
    <rect x="190" y="460" width="4" height="50" fill="#0f172a" />
    <rect x="202" y="460" width="18" height="50" fill="#0f172a" />
    <rect x="228" y="460" width="6" height="50" fill="#0f172a" />
    <rect x="242" y="460" width="10" height="50" fill="#0f172a" />
    <rect x="260" y="460" width="4" height="50" fill="#0f172a" />
    <rect x="272" y="460" width="16" height="50" fill="#0f172a" />
    <rect x="296" y="460" width="8" height="50" fill="#0f172a" />
    <rect x="312" y="460" width="14" height="50" fill="#0f172a" />
    <rect x="334" y="460" width="6" height="50" fill="#0f172a" />
    
    <text x="200" y="530" font-family="Courier New, monospace" font-size="11" fill="#94a3b8" text-anchor="middle">DISAHKAN DIGITAL UNTUK TUNTUTAN WHATSAPP</text>
    <text x="200" y="550" font-family="Courier New, monospace" font-size="10" fill="#94a3b8" text-anchor="middle">Terima kasih atas perkhidmatan anda</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const INITIAL_CLAIMS: TransportClaim[] = [
  {
    id: 'claim-101',
    customerName: 'Encik Khairul Azman',
    date: '2026-10-09',
    shopName: 'Petronas Bandar Saujana Putra',
    status: 'Lulus',
    category: 'petrol',
    remark: 'Isi petrol kenderaan van syarikat untuk penghantaran stok ke Get Rental',
    area: 'Selangor',
    location: 'Bandar Saujana Putra, KM 15 Lebuhraya ELITE',
    amount: 110.00,
    vehicleNo: 'VPF 6614',
    staffName: 'Hendry',
    createdAt: '2026-10-09T08:30:00Z',
    updatedAt: '2026-10-09T10:15:00Z',
    receipts: [
      {
        id: 'rec-1',
        dataUrl: generateReceiptPlaceholder('Petronas Bandar Saujana', 110.00, '2026-10-09', 'petrol'),
        caption: 'Resit Rasmi Minyak RON95 Petronas',
        timestamp: '08:35 AM',
        source: 'kamera',
      }
    ]
  },
  {
    id: 'claim-102',
    customerName: 'GRSB Service & Maintenance Team',
    date: '2026-10-09',
    shopName: 'Touch n Go PLUS Subang Jaya',
    status: 'diluluskan',
    category: 'TNG',
    remark: 'Tambah nilai kad TNG bagi lawatan servis kecemasan ke kilang Tealive',
    area: 'Lembah Klang',
    location: 'Plaza Tol Subang Jaya, NKVE',
    amount: 50.00,
    vehicleNo: 'VPF 6614',
    staffName: 'Adnan Koyo',
    createdAt: '2026-10-09T09:45:00Z',
    updatedAt: '2026-10-09T14:20:00Z',
    receipts: [
      {
        id: 'rec-2',
        dataUrl: generateReceiptPlaceholder('TnG Reload Plaza Tol Subang', 50.00, '2026-10-09', 'TNG'),
        caption: 'Slip Reload Touch n Go RFID/Card',
        timestamp: '09:50 AM',
        source: 'galeri',
      }
    ]
  },
  {
    id: 'claim-103',
    customerName: 'Texas Chicken @ Get Rental',
    date: '2026-10-08',
    shopName: 'Shell Glenmarie Industrial',
    status: 'proses',
    category: 'diesel',
    remark: 'Isi diesel lori 3 tan hantar mesin sewaan ke Texas Chicken Cawangan Klang',
    area: 'Shah Alam',
    location: 'Jalan Glenmarie HICOM, Seksyen U1',
    amount: 185.50,
    vehicleNo: 'WVV 8931',
    staffName: 'Hakim',
    createdAt: '2026-10-08T15:10:00Z',
    updatedAt: '2026-10-08T15:10:00Z',
    receipts: [
      {
        id: 'rec-3',
        dataUrl: generateReceiptPlaceholder('Shell Glenmarie HICOM', 185.50, '2026-10-08', 'diesel'),
        caption: 'Resit Euro 5 Diesel Shell FuelSave',
        timestamp: '03:15 PM',
        source: 'kamera',
      }
    ]
  },
  {
    id: 'claim-104',
    customerName: 'Tealive @ Get Rental',
    date: '2026-10-08',
    shopName: 'Parkson Parking Kompleks',
    status: 'Lulus',
    category: 'parking',
    remark: 'Bayaran parking basement penghantaran dan pemasangan dispenser ais',
    area: 'Petaling Jaya',
    location: 'Paradigm Mall PJ Basement Parking B2',
    amount: 14.00,
    vehicleNo: 'VPF 6614',
    staffName: 'Hendry',
    createdAt: '2026-10-08T12:00:00Z',
    updatedAt: '2026-10-08T16:45:00Z',
    receipts: [
      {
        id: 'rec-4',
        dataUrl: generateReceiptPlaceholder('Paradigm Mall Parking', 14.00, '2026-10-08', 'parking'),
        caption: 'Tiket auto-pay mesin autopay mall',
        timestamp: '12:05 PM',
        source: 'kamera',
      }
    ]
  },
  {
    id: 'claim-105',
    customerName: 'Cik Ain Syuhada (Outstation Task)',
    date: '2026-10-07',
    shopName: 'Hotel Seri Malaysia Kuantan',
    status: 'diluluskan',
    category: 'hotel',
    remark: 'Penginapan 1 malam untuk tugasan pemasangan mesin di cawangan Pantai Timur',
    area: 'Kuantan, Pahang',
    location: 'Jalan Teluk Sisek, Kuantan',
    amount: 145.00,
    vehicleNo: 'Car Transport',
    staffName: 'Ain Syuhada',
    createdAt: '2026-10-07T20:30:00Z',
    updatedAt: '2026-10-08T09:00:00Z',
    receipts: [
      {
        id: 'rec-5',
        dataUrl: generateReceiptPlaceholder('Hotel Seri Malaysia Kuantan', 145.00, '2026-10-07', 'hotel'),
        caption: 'Invois Rasmi Bilik Standard Room',
        timestamp: '08:30 PM',
        source: 'galeri',
      }
    ]
  },
  {
    id: 'claim-106',
    customerName: 'Roy Koyo Personal Transport',
    date: '2026-10-07',
    shopName: 'Bengkel Tayar & Bateri Soon Huat',
    status: 'proses',
    category: 'other',
    remark: 'Tampal tayar bocor semasa dalam perjalanan penghantaran kecemasan',
    area: 'Batu Caves',
    location: 'Kawasan Perindustrian Taman Bolton',
    amount: 25.00,
    vehicleNo: 'VPF 6614',
    staffName: 'Roy Koyo',
    createdAt: '2026-10-07T14:15:00Z',
    updatedAt: '2026-10-07T14:15:00Z',
    receipts: [
      {
        id: 'rec-6',
        dataUrl: generateReceiptPlaceholder('Bengkel Tayar Soon Huat', 25.00, '2026-10-07', 'other'),
        caption: 'Resit tunai servis tampal tayar',
        timestamp: '02:20 PM',
        source: 'kamera',
      }
    ]
  }
];
