import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from "../../hooks/useAuth.jsx"; 

const HomeIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>;
const PackageIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7l8 4" /></svg>;
const LogoutIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;
const CashRegisterIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>;

const NavLink = ({ to, icon, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  const activeClass = 'bg-blue-100 text-blue-600';
  const inactiveClass = 'text-gray-700 hover:bg-blue-50 hover:text-blue-600';
  return ( <Link to={to} className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${isActive ? activeClass : inactiveClass}`}>{icon}<span>{children}</span></Link> );
};

export default function DashboardLayout() {
  const { user, logout } = useAuth(); 

  return (
    <div className="h-screen flex bg-gray-100 font-sans">
      <aside className="w-64 bg-white shadow-md flex flex-col flex-shrink-0">
        <div className="p-6 border-b">
          <div className="text-2xl font-bold text-blue-600">KasirApp</div>
          {user && <div className="text-sm text-gray-500 mt-1">Halo, {user.name}</div>}
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <NavLink to="/" icon={<CashRegisterIcon />}>Kasir</NavLink>
          <NavLink to="/dashboard" icon={<HomeIcon />}>Dashboard</NavLink>
          <NavLink to="/products" icon={<PackageIcon />}>Produk</NavLink>
        </nav>
        <div className="p-4 border-t">
          <button onClick={logout} className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors">
            <LogoutIcon />
            <span>Logout</span>
          </button>
        </div>
      </aside>
      <main className="flex-1 flex">
        <Outlet />
      </main>
    </div>
  );
}