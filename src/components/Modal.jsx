import React from 'react';

// Komponen ikon kecil untuk tombol tutup
const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// Prop sekarang hanya: isOpen, onClose, dan children
export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    // Latar belakang (backdrop), klik di sini akan menutup modal
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4 transition-opacity duration-300"
    >
      {/* Konten Modal */}
      <div
        // Menghentikan event klik agar modal tidak ikut tertutup saat area putih diklik
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg shadow-xl w-full max-w-lg relative"
      >
        {/* Tombol Tutup Universal (di pojok kanan atas) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <CloseIcon />
        </button>

        {/* Di sinilah ProductForm atau konten lainnya akan ditampilkan */}
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
}