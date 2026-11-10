import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import type { Product } from '../types';
import { formatRupiah } from '../utils/formatters';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const totalAmount = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-neutral-950/40 backdrop-blur-xs transition-opacity"
      />

      {/* Slide-out Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-neutral-900" />
            <h3 className="font-bold text-base text-neutral-900">Keranjang Belanja</h3>
            <span className="text-xs bg-neutral-100 font-semibold px-2 py-0.5 rounded-full text-neutral-600">
              {items.length} item
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-900 rounded-full hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length > 0 ? (
            items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex gap-3.5 p-3 rounded-2xl border border-neutral-100 hover:border-neutral-200 transition-colors"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-18 h-18 rounded-xl object-cover bg-neutral-100 shrink-0"
                />
                <div className="flex-1 flex flex-col justify-between text-left">
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-semibold text-neutral-900 line-clamp-1">
                      {product.name}
                    </h4>
                    <p className="text-xs font-bold text-neutral-800">
                      {formatRupiah(product.price)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-neutral-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => onUpdateQuantity(product.id, -1)}
                        className="px-2.5 py-0.5 text-xs font-bold text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-semibold text-neutral-900">
                        {quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(product.id, 1)}
                        className="px-2.5 py-0.5 text-xs font-bold text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(product.id)}
                      className="text-neutral-400 hover:text-rose-600 transition-colors cursor-pointer p-1"
                      title="Hapus"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-3">
              <div className="w-14 h-14 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400">
                <ShoppingBag className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h4 className="text-sm font-bold text-neutral-800">Keranjang Masih Kosong</h4>
              <p className="text-xs text-neutral-400 max-w-xs">
                Pilih barang favoritmu dari katalog dan klik tombol beli untuk menambahkannya ke sini.
              </p>
            </div>
          )}
        </div>

        {/* Footer & Checkout */}
        {items.length > 0 && (
          <div className="p-5 border-t border-neutral-100 space-y-3 bg-neutral-50/70">
            <div className="flex justify-between items-center text-xs text-neutral-500">
              <span>Subtotal Produk</span>
              <span className="font-semibold text-neutral-900">{formatRupiah(totalAmount)}</span>
            </div>
            <div className="flex justify-between items-center text-xs text-neutral-500">
              <span>Estimasi Pengiriman</span>
              <span className="text-emerald-600 font-semibold">Gratis</span>
            </div>
            <div className="flex justify-between items-center text-sm font-extrabold text-neutral-900 pt-2 border-t border-neutral-200">
              <span>Total Tagihan</span>
              <span className="text-base">{formatRupiah(totalAmount)}</span>
            </div>

            <button
              onClick={() => {
                alert(`Terima kasih! Pesanan sejumlah ${formatRupiah(totalAmount)} berhasil diproses.`);
                onClearCart();
                onClose();
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-neutral-950 text-white text-xs font-bold hover:bg-neutral-800 active:scale-95 transition-all shadow-md cursor-pointer"
            >
              <span>Lanjut ke Pembayaran</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
