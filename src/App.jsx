import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from './context/AuthProvider';

import LoginPage from './pages/LoginPage';
import DashboardLayout from './components/layout/DashboardLayout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import PosPage from './pages/PosPage';
import ProtectedRoute from './components/ProtectedRoute'; // <-- IMPORT

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute> {/* <-- LINDUNGI DASHBOARD LAYOUT */}
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <PosPage /> },
      { path: "dashboard", element: <HomePage /> },
      { path: "products", element: <ProductsPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;