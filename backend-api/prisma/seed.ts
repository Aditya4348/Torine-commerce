import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client.js';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('❌ Error: DATABASE_URL tidak ditemukan di file .env');
  process.exit(1);
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const CATEGORIES_DATA = [
  { id: 'elektronik', name: 'Elektronik & Audio', icon_name: 'Laptop', display_order: 1 },
  { id: 'fashion-pria', name: 'Pakaian Pria', icon_name: 'Shirt', display_order: 2 },
  { id: 'fashion-wanita', name: 'Pakaian Wanita', icon_name: 'Sparkles', display_order: 3 },
  { id: 'aksesoris', name: 'Aksesoris & Jam', icon_name: 'Watch', display_order: 4 },
  { id: 'sepatu', name: 'Alas Kaki', icon_name: 'Footprints', display_order: 5 },
  { id: 'perabot', name: 'Interior & Meja', icon_name: 'Armchair', display_order: 6 },
];

const PRODUCTS_DATA = [
  {
    sku: 'TRN-AUD-001',
    category_id: 'elektronik',
    name: 'Wireless Over-Ear Noise Cancelling NC-40',
    summary: 'Driver dinamis 40mm berbobot 245 gram dengan peredam bising aktif hingga 32dB.',
    description:
      'Headphone over-ear yang dirancang untuk fokus kerja dan perjalanan panjang. Busa memory foam berlapis kulit sintetis menjaga telinga tetap dingin setelah 4 jam pemakaian berturut-turut. Dilengkapi mikrofon beamforming ganda untuk panggilan suara jernih tanpa gangguan angin.',
    base_price: 2299000,
    sale_price: 1850000,
    is_in_stock: true,
    is_popular: true,
    is_new: false,
    images: [
      { url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80', is_primary: true },
      { url: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80', is_primary: false },
      { url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80', is_primary: false },
    ],
    variants: [
      { color_name: 'Matte Charcoal', color_hex: '#262626', sku_variant: 'TRN-AUD-001-CHR', stock: 25 },
      { color_name: 'Warm Chalk', color_hex: '#e5e5e5', sku_variant: 'TRN-AUD-001-WCK', stock: 18 },
    ],
    specs: [
      { label: 'Daya Tahan Baterai', value: '38 jam (ANC aktif) / 50 jam (ANC nonaktif)' },
      { label: 'Konektivitas', value: 'Bluetooth 5.3, Port AUX 3.5mm, USB-C' },
      { label: 'Driver', value: '40mm Neodymium magnetik' },
      { label: 'Bobot', value: '245 gram' },
      { label: 'Garansi', value: '12 bulan ganti unit resmi' },
    ],
  },
  {
    sku: 'TRN-WCH-012',
    category_id: 'aksesoris',
    name: 'Atelier Chronograph 38mm Kulit Nabati',
    summary: 'Case baja 316L satin finish dengan kaca safir anti gores dan tali kulit samak nabati.',
    description:
      'Jam tangan kasual-formal dengan dial minimalis tanpa angka yang berlebihan. Menggunakan movement kuarsa Jepang Miyota yang akurat hingga rentang ±15 detik per bulan. Kulit strap akan menua secara alami menghasilkan patina khas seiring waktu pemakaian.',
    base_price: 1200000,
    sale_price: 950000,
    is_in_stock: true,
    is_popular: false,
    is_new: true,
    images: [
      { url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80', is_primary: true },
      { url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80', is_primary: false },
    ],
    variants: [
      { color_name: 'Tan Leather', color_hex: '#b45309', sku_variant: 'TRN-WCH-012-TAN', stock: 15 },
      { color_name: 'Black Minimal', color_hex: '#1c1917', sku_variant: 'TRN-WCH-012-BLK', stock: 12 },
    ],
    specs: [
      { label: 'Diameter Case', value: '38 mm, tebal 7.8 mm' },
      { label: 'Kaca', value: 'Kristal Safir berlapis anti-refleksi' },
      { label: 'Movement', value: 'Miyota Japanese Quartz 1L45' },
      { label: 'Water Resistant', value: '5 ATM (50 meter)' },
      { label: 'Lebar Strap', value: '20 mm standar' },
    ],
  },
  {
    sku: 'TRN-KBD-075',
    category_id: 'elektronik',
    name: 'Keyboard Mekanikal 75% Switch Tactile',
    summary: 'Struktur gasket mount dengan peredam silikon dan keycaps PBT dye-sublimation.',
    description:
      'Tata letak 75 persen menghemat ruang meja namun tetap mempertahankan tombol fungsi (F1-F12) serta tombol panah fisik. Hot-swappable 5-pin memudahkan penggantian switch tanpa perlu menyolder. Baterai internal 4000 mAh sanggup bertahan hingga 3 minggu pemakaian kantor tanpa backlight.',
    base_price: 950000,
    sale_price: 780000,
    is_in_stock: true,
    is_popular: true,
    is_new: false,
    images: [
      { url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80', is_primary: true },
      { url: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&q=80', is_primary: false },
    ],
    variants: [
      { color_name: 'Retro Grey', color_hex: '#737373', sku_variant: 'TRN-KBD-075-GRY', stock: 20 },
      { color_name: 'Milk White', color_hex: '#f5f5f5', sku_variant: 'TRN-KBD-075-WHT', stock: 20 },
    ],
    specs: [
      { label: 'Layout', value: '75% (84 tombol)' },
      { label: 'Switch Tipe', value: 'Gateron G Pro Brown (Pre-lubed)' },
      { label: 'Keycaps', value: 'Thick PBT Cherry Profile' },
      { label: 'Mode', value: 'Bluetooth 5.0, 2.4GHz Dongle, Kabel USB-C' },
    ],
  },
  {
    sku: 'TRN-CLO-041',
    category_id: 'fashion-pria',
    name: 'Kemeja Katun Linen Kerah Tegak',
    summary: 'Campuran 55% linen dan 45% katun combed. Sejuk untuk iklim tropis berkelembapan tinggi.',
    description:
      'Potongan santai (relaxed fit) dengan jahitan rantai di bagian bahu untuk ketahanan lebih lama. Bahan dicuci terlebih dahulu (garment-washed) sehingga tidak akan menyusut saat pencucian pertama. Kerah mandarin modern yang rapi baik saat dikancing penuh maupun dibiarkan terbuka.',
    base_price: 350000,
    sale_price: 289000,
    is_in_stock: true,
    is_popular: false,
    is_new: true,
    images: [
      { url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80', is_primary: true },
      { url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80', is_primary: false },
    ],
    variants: [
      { color_name: 'Ecru Off-White', color_hex: '#f4f1ea', size_label: 'M', sku_variant: 'TRN-CLO-041-ECR-M', stock: 14 },
      { color_name: 'Ecru Off-White', color_hex: '#f4f1ea', size_label: 'L', sku_variant: 'TRN-CLO-041-ECR-L', stock: 18 },
      { color_name: 'Sage Green', color_hex: '#849382', size_label: 'M', sku_variant: 'TRN-CLO-041-SGE-M', stock: 10 },
      { color_name: 'Deep Navy', color_hex: '#1e293b', size_label: 'L', sku_variant: 'TRN-CLO-041-NVY-L', stock: 12 },
    ],
    specs: [
      { label: 'Material', value: '55% French Linen, 45% Organic Cotton' },
      { label: 'Gramasi', value: '160 gsm' },
      { label: 'Perawatan', value: 'Cuci mesin air dingin, jemur gantung' },
    ],
  },
  {
    sku: 'TRN-SHS-005',
    category_id: 'sepatu',
    name: 'Sneakers Minimalis Cupsole Kulit Nappa',
    summary: 'Sol karet mentah dengan jahit keliling (strobel stitch) dan insole lateks tebal 6mm.',
    description:
      'Sepatu harian dengan siluet ramping bebas logo mencolok. Kulit sintetis nappa grade-A mudah dibersihkan menggunakan lap basah. Bantalan tumit empuk mencegah lecet pada hari pertama pemakaian.',
    base_price: 850000,
    sale_price: 650000,
    is_in_stock: true,
    is_popular: true,
    is_new: false,
    images: [
      { url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80', is_primary: true },
      { url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80', is_primary: false },
    ],
    variants: [
      { color_name: 'Triple White', color_hex: '#f8fafc', size_label: '41', sku_variant: 'TRN-SHS-005-WHT-41', stock: 8 },
      { color_name: 'Triple White', color_hex: '#f8fafc', size_label: '42', sku_variant: 'TRN-SHS-005-WHT-42', stock: 12 },
      { color_name: 'Triple White', color_hex: '#f8fafc', size_label: '43', sku_variant: 'TRN-SHS-005-WHT-43', stock: 9 },
      { color_name: 'Chalk Bone', color_hex: '#e2e8f0', size_label: '42', sku_variant: 'TRN-SHS-005-CHK-42', stock: 11 },
    ],
    specs: [
      { label: 'Upper', value: 'Microfiber Nappa Leather' },
      { label: 'Outsole', value: 'Vulcanized Natural Rubber' },
      { label: 'Konstruksi', value: 'Side-stitched Cupsole' },
    ],
  },
  {
    sku: 'TRN-HOM-088',
    category_id: 'perabot',
    name: 'Diffuser Keramik Matte Ultrasonic 200ml',
    summary: 'Bodi keramik buatan tangan dengan auto-off saat air habis dan lampu hangat 2700K.',
    description:
      'Menghasilkan uap dingin ultrasonik yang menjaga molekul minyak esensial tetap utuh. Menggunakan cover luar dari keramik stoneware matte yang menyerupai bejana pajangan meja kerja.',
    base_price: 420000,
    sale_price: 340000,
    is_in_stock: true,
    is_popular: false,
    is_new: false,
    images: [
      { url: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=80', is_primary: true },
    ],
    variants: [
      { color_name: 'Warm Terracotta', color_hex: '#c27d60', sku_variant: 'TRN-HOM-088-TRC', stock: 16 },
      { color_name: 'Sandstone Grey', color_hex: '#d6d3d1', sku_variant: 'TRN-HOM-088-SND', stock: 14 },
    ],
    specs: [
      { label: 'Kapasitas Tangki', value: '200 ml (durasi 7-9 jam)' },
      { label: 'Luas Jangkauan', value: 'Hingga 25 meter persegi' },
      { label: 'Tingkat Kebisingan', value: '< 28 desibel (sangat senyap)' },
    ],
  },
  {
    sku: 'TRN-LGT-019',
    category_id: 'perabot',
    name: 'Lampu Meja Kayu Ek & Baja Hitam',
    summary: 'Fitting E27 dengan tombol putar peredup (dimmer switch) pada dasar kayu solid.',
    description:
      'Perpaduan kayu ek bersertifikat FSC dan kap lampu baja karbon berlapisan bubuk hitam matte. Sudut kap dapat diarahkan ke dokumen kerja tanpa membuat mata silau.',
    base_price: 620000,
    sale_price: 495000,
    is_in_stock: false,
    is_popular: false,
    is_new: true,
    images: [
      { url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80', is_primary: true },
    ],
    variants: [
      { color_name: 'Natural Oak', color_hex: '#b45309', sku_variant: 'TRN-LGT-019-OAK', stock: 0 },
    ],
    specs: [
      { label: 'Bahan Dasar', value: 'Solid White Oak' },
      { label: 'Tinggi', value: '42 cm' },
      { label: 'Fitting Lampu', value: 'E27 (Maksimal 40 Watt)' },
    ],
  },
  {
    sku: 'TRN-ACC-033',
    category_id: 'elektronik',
    name: 'Stand Laptop Aluminium Anodized Lipat',
    summary: 'Bahan aluminium 4mm dengan 6 sudut kemiringan ergonomis dan pouch felt wol.',
    description:
      'Menaikkan layar laptop sejajar pandangan mata untuk mengurangi ketegangan leher saat bekerja seharian. Potongan ventilasi di bagian tengah menjaga sirkulasi kipas laptop tetap lancar.',
    base_price: 320000,
    sale_price: 245000,
    is_in_stock: true,
    is_popular: false,
    is_new: false,
    images: [
      { url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80', is_primary: true },
    ],
    variants: [
      { color_name: 'Space Silver', color_hex: '#d4d4d8', sku_variant: 'TRN-ACC-033-SLV', stock: 35 },
      { color_name: 'Dark Graphite', color_hex: '#404040', sku_variant: 'TRN-ACC-033-GRP', stock: 28 },
    ],
    specs: [
      { label: 'Kesesuaian', value: 'Laptop 11 hingga 16 inci' },
      { label: 'Berat Beban', value: 'Maksimal 8 kg' },
      { label: 'Bobot Sendiri', value: '260 gram' },
    ],
  },
  {
    sku: 'TRN-WCL-009',
    category_id: 'fashion-wanita',
    name: 'Mantel Wool Blend Potongan Lurus',
    summary: 'Kain wol 60% dengan furing sutra cupro. Potongan clean tanpa sabuk berlebihan.',
    description:
      'Dibuat dengan konstruksi semi-tradisional bergaris leher notched lapel yang tajam. Furing penuh memudahkan pemakaian di atas sweater tebal saat suhu ruangan dingin.',
    base_price: 1550000,
    sale_price: 1199000,
    is_in_stock: true,
    is_popular: true,
    is_new: false,
    images: [
      { url: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80', is_primary: true },
    ],
    variants: [
      { color_name: 'Camel Tan', color_hex: '#926c48', size_label: 'S', sku_variant: 'TRN-WCL-009-CML-S', stock: 5 },
      { color_name: 'Camel Tan', color_hex: '#926c48', size_label: 'M', sku_variant: 'TRN-WCL-009-CML-M', stock: 7 },
      { color_name: 'Charcoal Black', color_hex: '#18181b', size_label: 'M', sku_variant: 'TRN-WCL-009-BLK-M', stock: 6 },
    ],
    specs: [
      { label: 'Material', value: '60% Wool, 35% Polyester, 5% Cashmere' },
      { label: 'Furing', value: '100% Cupro Bemberg' },
      { label: 'Metode Cuci', value: 'Dry Clean Only' },
    ],
  },
  {
    sku: 'TRN-BAG-022',
    category_id: 'aksesoris',
    name: 'Ransel Komuter Tahan Air 18 Liter',
    summary: 'Nilon Cordura 500D berlapis PU dengan resleting tahan air YKK Aquaguard.',
    description:
      'Tas harian tahan cuaca dengan kompartemen laptop 15.6 inci yang digantung melayang (suspended) agar laptop tidak membentur lantai saat tas diletakkan.',
    base_price: 680000,
    sale_price: 520000,
    is_in_stock: true,
    is_popular: false,
    is_new: false,
    images: [
      { url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80', is_primary: true },
    ],
    variants: [
      { color_name: 'Stealth Black', color_hex: '#171717', sku_variant: 'TRN-BAG-022-BLK', stock: 22 },
      { color_name: 'Olive Drab', color_hex: '#444d3c', sku_variant: 'TRN-BAG-022-OLV', stock: 15 },
    ],
    specs: [
      { label: 'Kapasitas', value: '18 Liter' },
      { label: 'Dimensi', value: '44 x 29 x 14 cm' },
      { label: 'Material', value: '500D Cordura Ripstop' },
    ],
  },
  {
    sku: 'TRN-SHS-018',
    category_id: 'sepatu',
    name: 'Sepatu Lari Road Running Sol EVA 220g',
    summary: 'Upper rajut engineered mesh bernapas dengan drop tumit-ke-jari 8mm.',
    description:
      'Dirancang untuk lari jalan raya 5K hingga semi-marathon harian. Busa midsole EVA berdensitas ganda memberikan pengembalian energi tanpa rasa goyah pada pergelangan kaki.',
    base_price: 999000,
    sale_price: 820000,
    is_in_stock: true,
    is_popular: false,
    is_new: false,
    images: [
      { url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80', is_primary: true },
    ],
    variants: [
      { color_name: 'Signal Crimson', color_hex: '#be123c', size_label: '42', sku_variant: 'TRN-SHS-018-RED-42', stock: 9 },
      { color_name: 'Asphalt Grey', color_hex: '#374151', size_label: '42', sku_variant: 'TRN-SHS-018-GRY-42', stock: 14 },
      { color_name: 'Asphalt Grey', color_hex: '#374151', size_label: '43', sku_variant: 'TRN-SHS-018-GRY-43', stock: 11 },
    ],
    specs: [
      { label: 'Bobot', value: '220 gram (Ukuran 42)' },
      { label: 'Heel-to-Toe Drop', value: '8 mm' },
      { label: 'Tipe Kaki', value: 'Netral' },
    ],
  },
  {
    sku: 'TRN-CLO-082',
    category_id: 'fashion-pria',
    name: 'Hoodie Katun Terigu 420 GSM Boxy Cut',
    summary: 'French terry katun 100% tanpa bulu fleece sintetis. Manset rib rapat 2x2.',
    description:
      'Hoodie berbobot berat yang jatuh kaku membentuk struktur tubuh tanpa kusut berantakan. Tudung kepala ganda (double-layered) tetap tegak tanpa tali serut yang mengganggu.',
    base_price: 490000,
    sale_price: 410000,
    is_in_stock: true,
    is_popular: false,
    is_new: true,
    images: [
      { url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80', is_primary: true },
    ],
    variants: [
      { color_name: 'Washed Grey', color_hex: '#525252', size_label: 'M', sku_variant: 'TRN-CLO-082-GRY-M', stock: 15 },
      { color_name: 'Washed Grey', color_hex: '#525252', size_label: 'L', sku_variant: 'TRN-CLO-082-GRY-L', stock: 18 },
      { color_name: 'Oatmeal', color_hex: '#d6cebe', size_label: 'L', sku_variant: 'TRN-CLO-082-OTM-L', stock: 12 },
    ],
    specs: [
      { label: 'Bahan', value: '100% Ring-spun Combed Cotton' },
      { label: 'Berat Kain', value: '420 GSM Heavyweight' },
      { label: 'Potongan', value: 'Boxy / Drop-shoulder' },
    ],
  },
];

async function main() {
  console.log('🌱 Memulai proses seeding data Torin Store...');

  // 1. Bersihkan data lama jika ada (urutan cascading terbalik)
  console.log('🧹 Membersihkan data sebelumnya...');
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.aiChatMessage.deleteMany({});
  await prisma.aiChatSession.deleteMany({});
  await prisma.productSpecification.deleteMany({});
  await prisma.productVariant.deleteMany({});
  await prisma.productImage.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});

  // 2. Seed Kategori
  console.log('📁 Melakukan seeding Kategori...');
  for (const cat of CATEGORIES_DATA) {
    await prisma.category.create({
      data: cat,
    });
  }
  console.log(`✅ Berhasil menambahkan ${CATEGORIES_DATA.length} kategori.`);

  // 3. Seed Master Produk beserta Relasi (Gambar, Varian, Spesifikasi)
  console.log('📦 Melakukan seeding Master Produk, Gambar, Varian & Spesifikasi...');
  const createdProducts = [];
  for (const prod of PRODUCTS_DATA) {
    const { images, variants, specs, ...prodData } = prod;

    const createdProduct = await prisma.product.create({
      data: {
        ...prodData,
        images: {
          create: images.map((img, idx) => ({
            image_url: img.url,
            display_order: idx + 1,
            is_primary: img.is_primary,
          })),
        },
        variants: {
          create: variants.map((v) => ({
            color_name: v.color_name,
            color_hex: v.color_hex,
            size_label: (v as any).size_label ?? null,
            sku_variant: v.sku_variant,
            stock_quantity: v.stock,
          })),
        },
        specifications: {
          create: specs.map((s, idx) => ({
            spec_label: s.label,
            spec_value: s.value,
            display_order: idx + 1,
          })),
        },
      },
    });
    createdProducts.push(createdProduct);
  }
  console.log(`✅ Berhasil menambahkan ${createdProducts.length} produk katalog lengkap.`);

  // 4. Seed Contoh Pesanan Langsung (Guest Checkout)
  console.log('🧾 Menambahkan contoh pesanan transaksi...');
  const sampleHeadphone = createdProducts[0];
  const sampleShirt = createdProducts[3];

  await prisma.order.create({
    data: {
      id: 'TRN-202611-001',
      customer_name: 'Aditya Pratama',
      customer_phone: '081234567890',
      customer_email: 'aditya@example.com',
      shipping_address: 'Jl. Sudirman Kav. 21 No. 45, Jakarta Selatan, DKI Jakarta 12190',
      subtotal: 2139000,
      shipping_fee: 0,
      total_amount: 2139000,
      status: 'completed',
      tracking_number: 'JNE88291024',
      payment_method: 'QRIS',
      items: {
        create: [
          {
            product_id: sampleHeadphone.id,
            product_name: sampleHeadphone.name,
            price_at_purchase: 1850000,
            selected_variant: 'Matte Charcoal',
            quantity: 1,
            subtotal: 1850000,
          },
          {
            product_id: sampleShirt.id,
            product_name: sampleShirt.name,
            price_at_purchase: 289000,
            selected_variant: 'Ecru Off-White / L',
            quantity: 1,
            subtotal: 289000,
          },
        ],
      },
    },
  });
  console.log('✅ Berhasil menambahkan 1 contoh pesanan riil.');

  // 5. Seed Sesi & Pesan AI Chat Konsultasi
  console.log('💬 Menambahkan riwayat chat asisten AI...');
  await prisma.aiChatSession.create({
    data: {
      messages: {
        create: [
          {
            sender: 'user',
            message_text: 'Halo, saya mencari headphone peredam bising untuk kerja di kantor, ada rekomendasi?',
          },
          {
            sender: 'assistant',
            message_text:
              'Halo! Saya sarankan Wireless Over-Ear NC-40 (SKU: TRN-AUD-001). Dilengkapi active noise cancellation 32dB dan busa memory foam yang nyaman untuk pemakaian kerja berdurasi panjang.',
            recommended_products: [sampleHeadphone.id],
          },
        ],
      },
    },
  });
  console.log('✅ Berhasil menambahkan riwayat sesi chat AI.');

  console.log('\n🎉 Proses Seeding Database selesai 100%!');
}

main()
  .catch((e) => {
    console.error('❌ Terjadi kesalahan saat seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
