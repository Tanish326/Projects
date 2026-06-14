import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './App.jsx';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-slate-800 text-white p-4 flex justify-between items-center shadow-md">
      <div className="flex space-x-6 items-center">
        <span className="font-bold text-xl tracking-wider text-indigo-400">ENTERPRISE CRM</span>
        <Link to="/pipeline" className="hover:text-indigo-300">Pipeline</Link>
        {user?.role !== 'Sales_Rep' && (
          <Link to="/dashboard" className="hover:text-indigo-300">Dashboard</Link>
        )}
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm bg-slate-700 px-3 py-1 rounded-full text-indigo-200">{user?.name} ({user?.role})</span>
        <button onClick={logout} className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition text-sm">Logout</button>
      </div>
    </nav>
  );
}
