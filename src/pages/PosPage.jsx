import React, { useState } from 'react';
import PaymentModal from '../components/PaymentModal'; 

// Dummy data
const dummyProducts = [
  { id: 1, name: 'Kopi Susu Gula Aren', category: 'Minuman', stock: 100, price: 22000, image: 'https://placehold.co/200x200/3B82F6/FFFFFF?text=Kopi' },
  { id: 2, name: 'Croissant Cokelat', category: 'Makanan', stock: 50, price: 18000, image: 'https://placehold.co/200x200/10B981/FFFFFF?text=Roti' },
  { id: 3, name: 'Teh Melati', category: 'Minuman', stock: 120, price: 15000, image: 'https://placehold.co/200x200/F59E0B/FFFFFF?text=Teh' },
  { id: 4, name: 'Air Mineral', category: 'Minuman', stock: 250, price: 5000, image: 'https://placehold.co/200x200/6366F1/FFFFFF?text=Air' },
  { id: 5, name: 'Donat Gula', category: 'Makanan', stock: 80, price: 8000, image: 'https://placehold.co/200x200/EC4899/FFFFFF?text=Donat' },
  { id: 6, name: 'Jus Alpukat', category: 'Minuman', stock: 40, price: 20000, image: 'https://placehold.co/200x200/84CC16/FFFFFF?text=Jus' },
];

// Ikon
const PlusCircleIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const MinusCircleIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const TrashIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;

export default function PosPage() {
  const [products] = useState(dummyProducts);
  const [cart, setCart] = useState([]);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false); // <-- STATE BARU
  const taxRate = 0.11;

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, qty: 1 }];
      }
    });
  };

  const updateQuantity = (productId, amount) => {
    setCart(prevCart => {
      return prevCart.map(item =>
        item.id === productId ? { ...item, qty: Math.max(0, item.qty + amount) } : item
      ).filter(item => item.qty > 0);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  // --- FUNGSI-FUNGSI BARU ---
  const handleOpenPaymentModal = () => {
    if (cart.length === 0) {
      alert("Keranjang masih kosong!");
      return;
    }
    setIsPaymentModalOpen(true);
  };
  
  const handleTransactionSuccess = () => {
      // Fungsi ini dipanggil dari modal setelah transaksi sukses
      clearCart();
  }
  // --- AKHIR FUNGSI BARU ---

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  return (
    <>
      <div className="w-full flex h-full">
        {/* Product List */}
        <div className="w-2/3 p-4 overflow-y-auto">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Pilih Produk</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map(product => (
              <div 
                key={product.id} 
                className="bg-white rounded-lg shadow cursor-pointer transition-transform transform hover:-translate-y-1"
                onClick={() => addToCart(product)}
              >
                <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded-t-lg" />
                <div className="p-3">
                  <h3 className="font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-blue-500 font-bold mt-1">Rp {product.price.toLocaleString('id-ID')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart/Bill */}
        <div className="w-1/3 bg-white p-4 flex flex-col shadow-lg">
          <h2 className="text-2xl font-bold text-gray-700 border-b pb-4 mb-4">Keranjang</h2>
          <div className="flex-1 overflow-y-auto">
            {cart.length === 0 ? (
              <p className="text-gray-500 text-center mt-10">Keranjang masih kosong</p>
            ) : (
              cart.map(item => (
                <div key={item.id} className="flex justify-between items-center mb-3">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">Rp {item.price.toLocaleString('id-ID')}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button onClick={() => updateQuantity(item.id, -1)} className="text-gray-500 hover:text-red-500"><MinusCircleIcon /></button>
                    <span className="w-8 text-center font-bold">{item.qty}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="text-gray-500 hover:text-green-500"><PlusCircleIcon /></button>
                  </div>
                </div>
              ))
            )}
          </div>
          
          {cart.length > 0 && (
            <div className="border-t pt-4">
              <div className="flex justify-between text-lg">
                <span>Subtotal</span>
                <span>Rp {subtotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-lg text-gray-500">
                <span>Pajak (11%)</span>
                <span>Rp {tax.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
              </div>
              <div className="flex justify-between text-2xl font-bold mt-2">
                <span>Total</span>
                <span>Rp {total.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
              </div>
              <div className="mt-4 flex space-x-2">
                <button onClick={clearCart} className="w-1/3 flex items-center justify-center py-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition">
                  <TrashIcon />
                </button>
                {/* --- TOMBOL BAYAR DIPERBARUI --- */}
                <button 
                  onClick={handleOpenPaymentModal}
                  className="w-2/3 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
                >
                  Bayar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* --- RENDER MODAL PEMBAYARAN --- */}
      <PaymentModal 
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        cart={cart}
        total={total}
        onTransactionSuccess={handleTransactionSuccess}
      />
    </>
  );
}