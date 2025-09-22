// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // <-- IMPORT useAuth

const MailIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> );
const LockIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg> );

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // <-- GUNAKAN FUNGSI LOGIN DARI CONTEXT

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Email dan password tidak boleh kosong.');
      return;
    }
    setError('');
    
    // --- LOGIKA BARU ---
    // Simulasi login berhasil, di aplikasi nyata ini adalah hasil dari panggilan API
    const userData = { name: 'Kasir Hebat', email: email, role: 'kasir' };
    login(userData); // Panggil fungsi login dari context
    
    navigate('/'); // Arahkan ke halaman utama
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center font-sans">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Selamat Datang</h2>
          <p className="mt-2 text-sm text-gray-500">Masuk untuk melanjutkan ke aplikasi kasir</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3"><MailIcon /></span>
            <input id="email" name="email" type="email" required className="w-full pl-10 pr-3 py-3 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" placeholder="Alamat Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3"><LockIcon /></span>
            <input id="password" name="password" type="password" required className="w-full pl-10 pr-3 py-3 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && (<p className="text-sm text-red-500 text-center">{error}</p>)}
          <div className="flex items-center justify-end">
            <div className="text-sm"><a href="#" className="font-medium text-blue-600 hover:text-blue-500">Lupa Password?</a></div>
          </div>
          <div><button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105">Masuk</button></div>
        </form>
      </div>
    </div>
  );
}