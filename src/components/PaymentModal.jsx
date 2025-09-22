import React, { useState, useEffect } from 'react';

const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
};

export default function PaymentModal({ isOpen, onClose, cart, total, onTransactionSuccess }) {
  const [paymentMethod, setPaymentMethod] = useState('Tunai');
  const [cashReceived, setCashReceived] = useState('');
  const [change, setChange] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
      setCashReceived('');
      setChange(0);
      setPaymentMethod('Tunai');
    }
  }, [isOpen]);

  useEffect(() => {
    if (paymentMethod === 'Tunai' && cashReceived >= total) {
      setChange(cashReceived - total);
    } else {
      setChange(0);
    }
  }, [cashReceived, total, paymentMethod]);

  if (!isOpen) return null;

  const handleConfirmPayment = () => {
    if (paymentMethod === 'Tunai' && cashReceived < total) {
      alert('Uang tunai yang diterima kurang dari total belanja.');
      return;
    }
    
    console.log('Transaksi berhasil:', {
      items: cart,
      total,
      paymentMethod,
      cashReceived: paymentMethod === 'Tunai' ? cashReceived : total,
      change,
    });
    
    setIsSuccess(true);
  };
  
  const handleNewTransaction = () => {
      onTransactionSuccess(); // Panggil fungsi dari parent untuk reset
      onClose(); // Tutup modal
  }

  // Tampilan Sukses
  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6 text-center">
          <svg className="w-16 h-16 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <h2 className="text-2xl font-bold mt-4 text-gray-800">Pembayaran Berhasil!</h2>
          <div className="text-left mt-6 space-y-2 text-gray-600">
            <div className="flex justify-between"><span>Total Belanja:</span> <span className="font-semibold">{formatRupiah(total)}</span></div>
            {paymentMethod === 'Tunai' && (
              <>
                <div className="flex justify-between"><span>Uang Tunai:</span> <span className="font-semibold">{formatRupiah(cashReceived)}</span></div>
                <div className="flex justify-between"><span>Kembalian:</span> <span className="font-semibold">{formatRupiah(change)}</span></div>
              </>
            )}
          </div>
          <button 
            onClick={handleNewTransaction}
            className="w-full mt-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
          >
            Transaksi Baru
          </button>
        </div>
      </div>
    );
  }

  // Tampilan Pembayaran
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Pembayaran</h2>
          <p className="text-4xl font-bold text-blue-600 mt-2">{formatRupiah(total)}</p>
        </div>
        <div className="p-6">
          <p className="font-semibold mb-3">Pilih Metode Pembayaran</p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button 
              onClick={() => setPaymentMethod('Tunai')}
              className={`p-3 rounded-lg border-2 ${paymentMethod === 'Tunai' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
            >
              Tunai
            </button>
            <button 
              onClick={() => setPaymentMethod('QRIS')}
              className={`p-3 rounded-lg border-2 ${paymentMethod === 'QRIS' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
            >
              QRIS
            </button>
          </div>

          {paymentMethod === 'Tunai' && (
            <div>
              <label htmlFor="cashReceived" className="block text-sm font-medium text-gray-700">Uang Diterima</label>
              <input 
                type="number" 
                id="cashReceived" 
                value={cashReceived}
                onChange={(e) => setCashReceived(Number(e.target.value))}
                className="mt-1 block w-full px-3 py-2 text-lg bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Contoh: 50000"
              />
              {cashReceived > 0 && cashReceived >= total && (
                <p className="mt-2 text-sm text-gray-600">Kembalian: <span className="font-bold">{formatRupiah(change)}</span></p>
              )}
            </div>
          )}
          
          <div className="mt-8 flex space-x-3">
            <button onClick={onClose} className="w-1/3 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">Batal</button>
            <button 
              onClick={handleConfirmPayment}
              className="w-2/3 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
            >
              Konfirmasi Bayar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}