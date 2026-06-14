import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './App.jsx';

const STAGES = ['Lead', 'Contacted', 'Proposal', 'Negotiation', 'Won', 'Lost'];

export default function Pipeline() {
  const [leads, setLeads] = useState([]);
  const { token, user } = useContext(AuthContext);

  // Form States
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [value, setValue] = useState('');

  const fetchLeads = async () => {
    const res = await fetch('/api/leads', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    setLeads(data);
  };

  useEffect(() => { fetchLeads(); }, []);

  const handleCreateLead = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          companyName,
          contactName,
          email,
          value: Number(value),
          assignedTo: user.id // Assigns it to yourself for testing
        })
      });

      if (res.ok) {
        // Clear Form
        setCompanyName('');
        setContactName('');
        setEmail('');
        setValue('');
        fetchLeads(); // Refresh columns
      } else {
        const errData = await res.json();
        alert(errData.message || 'Failed to create lead');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const moveStage = async (id, newStage) => {
    const res = await fetch(`/api/leads/${id}/stage`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ stage: newStage })
    });
    if (res.ok) fetchLeads();
  };

  return (
    <div className="mt-6">
      {/* Creation Form for Admins/Managers */}
      {user?.role !== 'Sales_Rep' && (
        <form onSubmit={handleCreateLead} className="bg-white p-4 rounded-lg shadow mb-8 border border-gray-200 grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Company Name</label>
            <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} className="w-full p-2 text-sm border rounded" required />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Contact Name</label>
            <input type="text" value={contactName} onChange={e => setContactName(e.target.value)} className="w-full p-2 text-sm border rounded" required />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 text-sm border rounded" required />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Deal Value ($)</label>
            <input type="number" value={value} onChange={e => setValue(e.target.value)} className="w-full p-2 text-sm border rounded" required />
          </div>
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded text-sm font-bold shadow transition">
            + Add New Deal
          </button>
        </form>
      )}

      <h1 className="text-2xl font-bold mb-6 text-gray-800">Sales Deal Pipeline</h1>
      
      {/* Pipeline Lanes */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 overflow-x-auto pb-4">
        {STAGES.map(stage => (
          <div key={stage} className="bg-gray-100 p-3 rounded-lg  border border-gray-200">
            <h3 className="font-bold text-gray-700 border-b border-gray-300 pb-2 mb-3 text-center uppercase tracking-wide text-sm">{stage}</h3>
            <div className="space-y-3">
              {leads.filter(l => l.stage === stage).map(lead => (
                <div key={lead._id} className="bg-white p-3 rounded shadow border-l-4 border-indigo-500 hover:shadow-md transition">
                  <h4 className="font-bold text-gray-800 text-sm">{lead.companyName}</h4>
                  <p className="text-xs text-gray-500">{lead.contactName}</p>
                  <p className="text-sm font-semibold text-indigo-600 mt-2">${lead.value.toLocaleString()}</p>
                  
                  <div className="mt-3 flex justify-between gap-1">
                    <button 
                      disabled={stage === 'Lead'} 
                      onClick={() => moveStage(lead._id, STAGES[STAGES.indexOf(stage) - 1])}
                      className="text-xs bg-gray-200 px-1.5 py-0.5 rounded disabled:opacity-30"
                    >
                      ◀
                    </button>
                    <button 
                      disabled={stage === 'Lost'} 
                      onClick={() => moveStage(lead._id, STAGES[STAGES.indexOf(stage) + 1])}
                      className="text-xs bg-gray-200 px-1.5 py-0.5 rounded disabled:opacity-30"
                    >
                      ▶
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}