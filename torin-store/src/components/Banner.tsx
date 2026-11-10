import React from 'react';
import { ArrowRight, Shield, Truck, RotateCcw } from 'lucide-react';

interface BannerProps {
  onExploreClick?: () => void;
}

export const Banner: React.FC<BannerProps> = ({ onExploreClick }) => {
  return (
    <section className="w-full bg-[#f4f3ef] border-b border-neutral-200/80 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-neutral-900 text-neutral-100 rounded-3xl overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Editorial Copy */}
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 space-y-6 text-left">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                <span className="text-[11px] font-mono tracking-widest uppercase text-neutral-400">
                  Rilis Musim Gugur / Katalog 04
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.12]">
                Perangkat harian dengan presisi fungsi.
              </h1>

              <p className="text-sm sm:text-base text-neutral-400 max-w-lg leading-relaxed font-normal">
                Bukan sekadar dekoratif. Setiap barang di Torin dipilih berdasarkan daya tahan material, kenyamanan ergonomis, dan kesederhanaan bentuk.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={onExploreClick}
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white text-neutral-950 text-xs font-semibold hover:bg-neutral-200 active:scale-95 transition-all cursor-pointer"
                >
                  <span>Lihat Semua Produk</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs text-neutral-400 font-mono">
                  12 produk siap kirim hari ini
                </span>
              </div>
            </div>

            {/* Editorial Image Showcase */}
            <div className="lg:col-span-5 p-6 lg:p-8 bg-neutral-950/40 flex justify-center">
              <div className="w-full max-w-md bg-neutral-800 rounded-2xl overflow-hidden border border-neutral-700/50">
                <div className="aspect-[4/3] overflow-hidden bg-neutral-900">
                  <img
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"
                    alt="NC-40 Over-Ear"
                    className="w-full h-full object-cover object-center hover:scale-103 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 flex items-center justify-between text-left">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-neutral-400">Audio Ref. 001</span>
                    <p className="text-xs font-semibold text-white">Over-Ear NC-40</p>
                  </div>
                  <span className="text-xs font-mono font-medium text-neutral-300">
                    Rp 1.850.000
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grounded Service Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 text-left">
          <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-neutral-200/80">
            <Truck className="w-4 h-4 text-neutral-700 shrink-0" />
            <div>
              <p className="text-xs font-semibold text-neutral-900">Bebas Ongkir Nasional</p>
              <p className="text-[11px] text-neutral-500">Otomatis aktif untuk total pesanan di atas Rp 300.000</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-neutral-200/80">
            <Shield className="w-4 h-4 text-neutral-700 shrink-0" />
            <div>
              <p className="text-xs font-semibold text-neutral-900">Garansi Unit Resmi</p>
              <p className="text-[11px] text-neutral-500">12 bulan pergantian suku cadang atau unit baru</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-neutral-200/80">
            <RotateCcw className="w-4 h-4 text-neutral-700 shrink-0" />
            <div>
              <p className="text-xs font-semibold text-neutral-900">Uji Coba 14 Hari</p>
              <p className="text-[11px] text-neutral-500">Pengembalian dana penuh jika kondisi barang tidak sesuai</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
