import React, { useState } from 'react';
import { ProductContext } from './ProductContext';
import { products as initialProducts } from '../data/mockData.js';

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(initialProducts);

  // Fungsi untuk menambah produk baru
  const addProduct = (newProductData) => {
    
    console.log("3. [ProductProvider] addProduct dipanggil dengan:", newProductData);

    const newProduct = {
      ...newProductData,
      id: Date.now(), // Buat ID unik sementara
      image: 'https://placehold.co/100x100/7C3AED/FFFFFF?text=Baru'
    };
    setProducts(prevProducts => [newProduct, ...prevProducts]);
  };

  // Fungsi untuk update produk (kita siapkan untuk nanti)
  const updateProduct = (productId, updatedData) => {

    console.log("3. [ProductProvider] updateProduct dipanggil untuk ID:", productId, "dengan data:", updatedData);
    
    setProducts(prevProducts => 
      prevProducts.map(p => p.id === productId ? { ...p, ...updatedData } : p)
    );
  };

  // Fungsi untuk hapus produk (kita siapkan untuk nanti)
  const deleteProduct = (productId) => {
    setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
  };

  const value = {
    products,
    addProduct,
    updateProduct,
    deleteProduct
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};