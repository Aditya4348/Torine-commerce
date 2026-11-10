import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-neutral-200 mt-20 text-left text-neutral-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-neutral-900 flex items-center justify-center text-white font-bold text-sm">
                T
              </div>
              <span className="font-extrabold text-lg tracking-tight text-neutral-900">TORIN.</span>
            </div>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Platform e-commerce modern dengan kurasi produk berkualitas tinggi, mengedepankan kesederhanaan dan fungsi.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-3">
              Kategori
            </h4>
            <ul className="space-y-2 text-xs text-neutral-500">
              <li className="hover:text-neutral-900 cursor-pointer transition-colors">Elektronik & Gadget</li>
              <li className="hover:text-neutral-900 cursor-pointer transition-colors">Fashion Pria</li>
              <li className="hover:text-neutral-900 cursor-pointer transition-colors">Fashion Wanita</li>
              <li className="hover:text-neutral-900 cursor-pointer transition-colors">Aksesoris & Jam Tangan</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-3">
              Bantuan Pelanggan
            </h4>
            <ul className="space-y-2 text-xs text-neutral-500">
              <li className="hover:text-neutral-900 cursor-pointer transition-colors">Cara Pemesanan</li>
              <li className="hover:text-neutral-900 cursor-pointer transition-colors">Pengembalian & Refund</li>
              <li className="hover:text-neutral-900 cursor-pointer transition-colors">Syarat & Ketentuan</li>
              <li className="hover:text-neutral-900 cursor-pointer transition-colors">FAQ</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-3">
              Newsletter
            </h4>
            <p className="text-xs text-neutral-500 mb-3">
              Dapatkan diskon 15% untuk transaksi pertama Anda.
            </p>
            <div className="flex gap-1.5">
              <input
                type="email"
                placeholder="Email Anda..."
                className="w-full px-3 py-2 bg-neutral-100 rounded-lg text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-900"
              />
              <button className="px-3.5 py-2 bg-neutral-900 text-white rounded-lg text-xs font-semibold hover:bg-neutral-800 transition-colors cursor-pointer">
                Kirim
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-4">
          <p>© {new Date().getFullYear()} TORIN Store. Hak cipta dilindungi.</p>
          <div className="flex gap-4">
            <span className="hover:text-neutral-600 cursor-pointer">Kebijakan Privasi</span>
            <span className="hover:text-neutral-600 cursor-pointer">Ketentuan Layanan</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
