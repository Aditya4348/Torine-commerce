import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Star, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Check, 
  Truck, 
  ShieldCheck, 
  RotateCcw,
  Share2,
  Heart
} from 'lucide-react';
import type { Product } from '../types';
import { formatRupiah } from '../utils/formatters';
import { ProductCard } from './ProductCard';

interface ProductDetailProps {
  product: Product;
  allProducts: Product[];
  onBack: () => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  allProducts,
  onBack,
  onAddToCart,
  onSelectProduct,
}) => {
  const [selectedImage, setSelectedImage] = useState<string>(
    product.gallery && product.gallery.length > 0 ? product.gallery[0] : product.image
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors && product.colors.length > 0 ? product.colors[0].name : ''
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : ''
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'shipping'>('desc');
  const [isCopied, setIsCopied] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const images = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  // Related products from same category, excluding current product
  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    if (!product.inStock) return;
    onAddToCart(product, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 1500);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="w-full bg-[#fbfbfa] min-h-screen text-left pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Navigation & Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-neutral-200/80">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600 hover:text-neutral-950 transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Kembali ke Katalog</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
            <span>Torin</span>
            <span>/</span>
            <span className="capitalize">{product.category.replace('-', ' ')}</span>
            <span>/</span>
            <span className="text-neutral-700 truncate max-w-xs">{product.name}</span>
          </div>
        </div>

        {/* Product Core Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Gallery & Visuals */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage Image */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-white border border-neutral-200/80 shadow-xs">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />

              {/* Status Badge */}
              <div className="absolute top-4 left-4 flex gap-2">
                {product.originalPrice && (
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-neutral-900 text-white">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                )}
                {product.isNew && (
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-neutral-100 text-neutral-800 border border-neutral-300">
                    Koleksi Baru
                  </span>
                )}
              </div>

              {/* Share & Like actions */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={handleShare}
                  className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-neutral-600 hover:text-neutral-950 hover:bg-white shadow-xs transition-colors"
                  title="Salin tautan produk"
                >
                  {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-neutral-600 hover:text-rose-600 hover:bg-white shadow-xs transition-colors"
                  title="Simpan favorit"
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>
              </div>
            </div>

            {/* Thumbnail Row */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden bg-white border-2 transition-all cursor-pointer shrink-0 ${
                      selectedImage === img
                        ? 'border-neutral-950 shadow-xs'
                        : 'border-transparent hover:border-neutral-300 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Sudut ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Trust and shipping info under media */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-neutral-200">
              <div className="p-3 bg-white rounded-xl border border-neutral-200/60 text-left">
                <Truck className="w-4 h-4 text-neutral-700 mb-1" />
                <p className="text-[11px] font-semibold text-neutral-900">Kurir Kilat</p>
                <p className="text-[10px] text-neutral-500">Estimasi 1-3 hari sampai</p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-neutral-200/60 text-left">
                <ShieldCheck className="w-4 h-4 text-neutral-700 mb-1" />
                <p className="text-[11px] font-semibold text-neutral-900">100% Orisinal</p>
                <p className="text-[10px] text-neutral-500">Kualitas lolos inspeksi</p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-neutral-200/60 text-left">
                <RotateCcw className="w-4 h-4 text-neutral-700 mb-1" />
                <p className="text-[11px] font-semibold text-neutral-900">Tukar Ukuran</p>
                <p className="text-[10px] text-neutral-500">Garansi ganti unit 14 hari</p>
              </div>
            </div>
          </div>

          {/* Right Column: Information, Pricing & Buying Options */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400">
                  {product.sku || 'SKU-001'}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-neutral-700 font-medium">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-neutral-400">({product.reviewsCount} pembeli)</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 leading-snug">
                {product.name}
              </h1>

              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed pt-1">
                {product.description}
              </p>
            </div>

            {/* Price section */}
            <div className="p-4 bg-white rounded-2xl border border-neutral-200/80 flex items-baseline justify-between">
              <div>
                <span className="text-xs text-neutral-400 block mb-0.5">Harga Bersih</span>
                <div className="flex items-baseline gap-2.5">
                  <span className="text-2xl sm:text-3xl font-extrabold text-neutral-950 font-mono tracking-tight">
                    {formatRupiah(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-neutral-400 line-through font-mono">
                      {formatRupiah(product.originalPrice)}
                    </span>
                  )}
                </div>
              </div>

              <div>
                {product.inStock ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Stok Tersedia
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-500">
                    Stok Kosong
                  </span>
                )}
              </div>
            </div>

            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-neutral-900">Pilihan Warna:</span>
                  <span className="text-neutral-500 font-medium">{selectedColor}</span>
                </div>
                <div className="flex gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                        selectedColor === c.name
                          ? 'border-neutral-950 bg-neutral-950 text-white shadow-xs'
                          : 'border-neutral-200 bg-white text-neutral-800 hover:border-neutral-300'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-neutral-900">Pilihan Ukuran:</span>
                  <span className="text-neutral-400 underline cursor-pointer text-[11px]">Panduan Ukuran</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`min-w-[44px] h-10 px-3 rounded-xl border text-xs font-semibold font-mono transition-all cursor-pointer ${
                        selectedSize === sz
                          ? 'border-neutral-950 bg-neutral-950 text-white'
                          : 'border-neutral-200 bg-white text-neutral-800 hover:border-neutral-300'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Add to Cart Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Quantity Counter */}
                <div className="flex items-center border border-neutral-300 bg-white rounded-xl overflow-hidden h-12 px-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={!product.inStock || quantity <= 1}
                    className="w-9 h-full flex items-center justify-center text-neutral-500 hover:text-neutral-900 disabled:opacity-30 cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center font-mono font-bold text-sm text-neutral-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={!product.inStock}
                    className="w-9 h-full flex items-center justify-center text-neutral-500 hover:text-neutral-900 disabled:opacity-30 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Primary Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`flex-1 h-12 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all shadow-sm cursor-pointer ${
                    !product.inStock
                      ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                      : addedSuccess
                      ? 'bg-emerald-600 text-white'
                      : 'bg-neutral-950 text-white hover:bg-neutral-800 active:scale-[0.98]'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Dimasukkan ({quantity})</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Tambah ke Keranjang</span>
                    </>
                  )}
                </button>
              </div>

              {/* Instant Buy button */}
              <button
                onClick={() => {
                  if (!product.inStock) return;
                  onAddToCart(product, quantity);
                  alert(`Memproses checkout langsung untuk ${quantity}x ${product.name}`);
                }}
                disabled={!product.inStock}
                className="w-full h-11 rounded-xl border border-neutral-900 text-neutral-950 text-xs font-bold hover:bg-neutral-100 transition-colors cursor-pointer disabled:opacity-40"
              >
                Beli Langsung Sekarang
              </button>
            </div>

            {/* Accordion / Tab Details */}
            <div className="pt-4 border-t border-neutral-200">
              <div className="flex border-b border-neutral-200 gap-6 text-xs font-semibold mb-4">
                <button
                  onClick={() => setActiveTab('desc')}
                  className={`pb-2.5 transition-colors cursor-pointer ${
                    activeTab === 'desc'
                      ? 'border-b-2 border-neutral-950 text-neutral-950'
                      : 'text-neutral-400 hover:text-neutral-700'
                  }`}
                >
                  Deskripsi Produk
                </button>
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2.5 transition-colors cursor-pointer ${
                    activeTab === 'specs'
                      ? 'border-b-2 border-neutral-950 text-neutral-950'
                      : 'text-neutral-400 hover:text-neutral-700'
                  }`}
                >
                  Spesifikasi Teknis
                </button>
                <button
                  onClick={() => setActiveTab('shipping')}
                  className={`pb-2.5 transition-colors cursor-pointer ${
                    activeTab === 'shipping'
                      ? 'border-b-2 border-neutral-950 text-neutral-950'
                      : 'text-neutral-400 hover:text-neutral-700'
                  }`}
                >
                  Pengiriman & Garansi
                </button>
              </div>

              {/* Tab Content */}
              <div className="text-xs text-neutral-600 leading-relaxed min-h-[120px]">
                {activeTab === 'desc' && (
                  <p>{product.fullDescription || product.description}</p>
                )}

                {activeTab === 'specs' && (
                  <div className="space-y-2">
                    {product.specs && product.specs.length > 0 ? (
                      product.specs.map((s, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between py-1.5 border-b border-neutral-100 font-mono text-[11px]"
                        >
                          <span className="text-neutral-500">{s.label}</span>
                          <span className="font-semibold text-neutral-900 text-right">{s.value}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-neutral-400">Spesifikasi standar pabrikan resmi.</p>
                    )}
                  </div>
                )}

                {activeTab === 'shipping' && (
                  <div className="space-y-2 text-neutral-600">
                    <p>
                      <strong>Waktu Pemrosesan:</strong> Pesanan sebelum pukul 15.00 WIB dikirim pada hari yang sama.
                    </p>
                    <p>
                      <strong>Proteksi Paket:</strong> Bubble wrap ganda dan segel tamper-evident gratis tanpa biaya tambahan.
                    </p>
                    <p>
                      <strong>Kebijakan Retur:</strong> Penggantian unit jika terdapat cacat pabrik dalam kurun 14 hari setelah paket diterima.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Related Items */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-10 border-t border-neutral-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-bold text-neutral-950">Produk Serupa</h3>
                <p className="text-xs text-neutral-500">Pilihan lain dalam kategori {product.category.replace('-', ' ')}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectProduct(rel)}
                  className="cursor-pointer"
                >
                  <ProductCard
                    product={rel}
                    onAddToCart={(p) => onAddToCart(p)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
