import React from 'react';
import { useForm } from 'react-hook-form';

const ProductForm = ({ onSave, onCancel, existingProduct }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: existingProduct || { name: '', sku: '', category: '', stock: 0, price: 0 }
  });

  const formTitle = existingProduct ? "Edit Produk" : "Tambah Produk Baru";

  return (
    <form onSubmit={handleSubmit(onSave)} className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">{formTitle}</h2>
      
      {/* Input Nama Produk */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama Produk</label>
        <input 
          id="name"
          {...register("name", { required: "Nama produk tidak boleh kosong" })}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
      </div>

      {/* Input SKU */}
      <div>
        <label htmlFor="sku" className="block text-sm font-medium text-gray-700">SKU</label>
        <input 
          id="sku"
          {...register("sku", { required: "SKU tidak boleh kosong" })}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.sku && <p className="text-red-500 text-xs mt-1">{errors.sku.message}</p>}
      </div>
      
      {/* Input Kategori */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Kategori</label>
        <input 
          id="category"
          {...register("category", { required: "Kategori tidak boleh kosong" })}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Input Stok */}
        <div>
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stok</label>
          <input 
            id="stock"
            type="number"
            {...register("stock", { 
              required: "Stok tidak boleh kosong",
              valueAsNumber: true,
              min: { value: 0, message: "Stok tidak boleh negatif" }
            })}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock.message}</p>}
        </div>

        {/* Input Harga */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Harga</label>
          <input 
            id="price"
            type="number"
            {...register("price", { 
              required: "Harga tidak boleh kosong",
              valueAsNumber: true,
              min: { value: 0, message: "Harga tidak boleh negatif" }
            })}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 pt-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition">Batal</button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">Simpan</button>
      </div>
    </form>
  );
};

export default ProductForm;