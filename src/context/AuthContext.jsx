// src/context/AuthContext.jsx

import React, { createContext, useState, useContext } from 'react';

// Buat context
const AuthContext = createContext(null);

// Buat Provider Komponen
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Buat Custom Hook untuk menggunakan context
export const useAuth = () => {
  return useContext(AuthContext);
};