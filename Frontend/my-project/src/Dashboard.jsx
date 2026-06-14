import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './App.jsx';

export default function Dashboard() {
  const [metrics, setMetrics] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchMetrics = async () => {
      const res = await fetch('/api/leads/dashboard/analytics', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setMetrics(data);
    };
    fetchMetrics();
  }, [token]);

  return (
    <div className="mt-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Sales Performance Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map(metric => (
          <div key={metric._id} className="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Stage</span>
              <h3 className="text-xl font-bold text-gray-700 mt-1">{metric._id}</h3>
            </div>
            <div className="mt-6 flex justify-between items-baseline">
              <div>
                <span className="text-xs font-medium text-gray-400">Total Pipeline Value</span>
                <p className="text-2xl font-black text-indigo-600">${metric.totalValue.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-medium text-gray-400">Active Deals</span>
                <p className="text-lg font-bold text-gray-700">{metric.count}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
