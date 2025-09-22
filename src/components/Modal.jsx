// src/components/Modal.jsx

import React, { useState } from 'react';

export default function Modal({ isOpen, onClose, onSave }) {
  const [productName, setProductName] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);

  if (!isOpen) return null;

  const handleSubmit = () => {
    // Validasi sederhana
    if (!productName || !sku || !category) {
      alert('Harap isi semua field yang wajib diisi.');
      return;
    }
    onSave({ name: productName, sku, category, stock, price });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-8 m-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Tambah Produk Baru</h2>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Nama Produk</label>
            <input type="text" id="productName" value={productName} onChange={(e) => setProductName(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
          </div>
          <div>
            <label htmlFor="sku" className="block text-sm font-medium text-gray-700">SKU (Stock Keeping Unit)</label>
            <input type="text" id="sku" value={sku} onChange={(e) => setSku(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Kategori</label>
            <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stok Awal</label>
              <input type="number" id="stock" value={stock} onChange={(e) => setStock(parseInt(e.target.value, 10))} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Harga</label>
              <input type="number" id="price" value={price} onChange={(e) => setPrice(parseInt(e.target.value, 10))} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition">Batal</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">Simpan</button>
        </div>
      </div>
    </div>
  );
}