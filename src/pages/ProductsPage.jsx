import React, { useState } from 'react';
import Modal from '../components/Modal';
import ProductForm from '../components/ProductForm';
import { useProduct } from '../hooks/useProduct';

// Dummy data untuk produk
// const dummyProducts = [
//   { id: 1, name: 'Kopi Susu Gula Aren', sku: 'KS-001', category: 'Minuman', stock: 100, price: 22000, image: 'https://placehold.co/100x100/3B82F6/FFFFFF?text=Kopi' },
//   { id: 2, name: 'Croissant Cokelat', sku: 'CR-002', category: 'Makanan', stock: 50, price: 18000, image: 'https://placehold.co/100x100/10B981/FFFFFF?text=Roti' },
//   { id: 3, name: 'Teh Melati', sku: 'TH-001', category: 'Minuman', stock: 120, price: 15000, image: 'https://placehold.co/100x100/F59E0B/FFFFFF?text=Teh' },
//   { id: 4, name: 'Air Mineral', sku: 'AM-001', category: 'Minuman', stock: 250, price: 5000, image: 'https://placehold.co/100x100/6366F1/FFFFFF?text=Air' },
// ];

// Icon
const PlusIcon = () => <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>;
const EditIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>;
const DeleteIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;


export default function ProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useProduct();
  // const [products, setProducts] = useState(dummyProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingProduct, setEditingProduct] = useState(null);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

   const handleEditProduct = (product) => {
    setEditingProduct(product); // Simpan data produk yang akan diedit
    setIsModalOpen(true);     // Buka modal
  };

  const handleDeleteProduct = (productId) => {
  if (window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
    deleteProduct(productId); // <-- Panggil fungsi dari context
  }
  };

   const handleSaveProduct = (formData) => {

    console.log("2. [ProductsPage] handleSaveProduct menerima data:", formData);
    
    if (editingProduct) {
      // Jika ada 'editingProduct', berarti ini mode edit
      updateProduct(editingProduct.id, formData);
    } else {
      // Jika tidak, ini mode tambah
      addProduct(formData);
    }
    handleCloseModal();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800">Manajemen Produk</h1>
        <button
          onClick={handleAddProduct}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-transform transform hover:scale-105"
        >
          <PlusIcon />
          Tambah Produk
        </button>
      </div>

      {/* Tabel Produk */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
              <th className="px-5 py-3 border-b-2 border-gray-300 text-left">Produk</th>
              <th className="px-5 py-3 border-b-2 border-gray-300 text-left">SKU</th>
              <th className="px-5 py-3 border-b-2 border-gray-300 text-left">Kategori</th>
              <th className="px-5 py-3 border-b-2 border-gray-300 text-center">Stok</th>
              <th className="px-5 py-3 border-b-2 border-gray-300 text-right">Harga</th>
              <th className="px-5 py-3 border-b-2 border-gray-300 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-5 py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-12 h-12">
                      <img className="w-full h-full rounded-md object-cover" src={product.image} alt={product.name} />
                    </div>
                    <div className="ml-4">
                      <p className="text-gray-900 font-semibold whitespace-no-wrap">{product.name}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-sm"><p className="text-gray-900 whitespace-no-wrap">{product.sku}</p></td>
                <td className="px-5 py-4 text-sm"><p className="text-gray-900 whitespace-no-wrap">{product.category}</p></td>
                <td className="px-5 py-4 text-sm text-center"><p className="text-gray-900 whitespace-no-wrap">{product.stock}</p></td>
                <td className="px-5 py-4 text-sm text-right"><p className="text-gray-900 whitespace-no-wrap">Rp {product.price.toLocaleString('id-ID')}</p></td>
                <td className="px-5 py-4 text-sm text-center">
                  <div className="flex item-center justify-center space-x-3">
                    <button onClick={() => handleEditProduct(product)} className="text-yellow-500 hover:text-yellow-700 transition"><EditIcon /></button>
                    <button onClick={() => handleDeleteProduct(product.id)} className="text-red-500 hover:text-red-700 transition"><DeleteIcon /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ProductForm 
          onSave={handleSaveProduct} 
          onCancel={handleCloseModal}
          existingProduct={editingProduct} 
        />
      </Modal>
    </div>
  );
}