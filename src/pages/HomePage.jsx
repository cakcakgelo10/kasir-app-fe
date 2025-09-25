import React from 'react';

export default function HomePage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Dashboard</h1>
      <p className="text-gray-600">Selamat datang di aplikasi kasir Anda. Silakan pilih menu di samping untuk memulai.</p>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-bold text-lg">Pendapatan Hari Ini</h3>
          <p className="text-3xl text-green-500 mt-2">Rp 0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-bold text-lg">Transaksi Hari Ini</h3>
          <p className="text-3xl text-blue-500 mt-2">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-bold text-lg">Produk Terjual</h3>
          <p className="text-3xl text-yellow-500 mt-2">0</p>
        </div>
      </div>
    </div>
  );
}