import React, { useState } from 'react';
import { 
  Search, X,
} from 'lucide-react';

// Mock Data
const MOCK_ISSUES = [
  { id: '101', title: 'Pothole on MG Road', ward: 'Ward 4B', category: 'Road', priority: 'High', status: 'Pending', time: '2h ago', aiConfidence: '94%' },
  { id: '102', title: 'Water Leakage', ward: 'Ward 2A', category: 'Water', priority: 'Medium', status: 'Assigned', time: '5h ago', aiConfidence: '88%', assignedDept: 'Water Works', assignedOfficer: 'John Doe' },
  { id: '103', title: 'Street Light Out', ward: 'Ward 1C', category: 'Lighting', priority: 'Low', status: 'Resolved', time: '1d ago', aiConfidence: '96%' },
  { id: '104', title: 'Garbage Dump', ward: 'Ward 5D', category: 'Waste', priority: 'High', status: 'Pending', time: '3h ago', aiConfidence: '91%' },
  { id: '105', title: 'Road Blockage', ward: 'Ward 3B', category: 'Road', priority: 'Medium', status: 'Assigned', time: '6h ago', aiConfidence: '82%', assignedDept: 'Road Dept', assignedOfficer: 'Jane Smith' },
  { id: '106', title: 'Pipe Burst', ward: 'Ward 2A', category: 'Water', priority: 'High', status: 'Pending', time: '1h ago', aiConfidence: '97%' },
  { id: '107', title: 'Broken Pole', ward: 'Ward 1C', category: 'Lighting', priority: 'Medium', status: 'Resolved', time: '2d ago', aiConfidence: '89%' },
  { id: '108', title: 'Overflowing Bin', ward: 'Ward 5D', category: 'Waste', priority: 'Low', status: 'Pending', time: '4h ago', aiConfidence: '93%' },
];

export default function AdminDashboard() {
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [filter, setFilter] = useState('All');
  
  const dateStr = new Date().toLocaleDateString('en-IN', { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'text-red-600';
      case 'Resolved': return 'text-emerald-600';
      default: return 'text-amber-600';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-900">
      <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-500">Pune Municipal Corporation • {dateStr}</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[{l:'Active Issues',v:'24'},{l:'Pending Verification',v:'8'},{l:'Assigned Today',v:'12'},{l:'Resolution Rate',v:'94%'}].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-sm text-slate-500">{stat.l}</p>
            <p className="text-3xl font-extrabold text-slate-900">{stat.v}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex gap-2">
          {['All', 'Road', 'Water', 'Lighting', 'Waste'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === f ? 'bg-cyan-600 text-white' : 'bg-white border text-slate-600'}`}>
              {f}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
          <input type="text" placeholder="Search issues..." className="pl-10 pr-4 py-2 border rounded-lg w-64 bg-white" />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase">
            <tr>
              <th className="p-4">Issue</th>
              <th className="p-4">Category</th>
              <th className="p-4">Priority</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_ISSUES.map(issue => (
              <tr key={issue.id} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-200 rounded-lg shrink-0"></div>
                  <div>
                    <p className="font-semibold">{issue.title}</p>
                    <p className="text-xs text-slate-500">{issue.ward} • {issue.time}</p>
                  </div>
                </td>
                <td className="p-4">{issue.category}</td>
                <td className="p-4"><span className="px-2 py-1 bg-slate-100 rounded-md text-xs">{issue.priority}</span></td>
                <td className="p-4"><span className={`text-sm font-medium ${getStatusColor(issue.status)}`}>{issue.status}</span></td>
                <td className="p-4">
                  <button onClick={() => setSelectedIssue(issue)} className="text-cyan-600 font-semibold text-sm hover:underline">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedIssue && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
          <div className="bg-white w-full max-w-lg p-8 overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Issue Details</h2>
              <button onClick={() => setSelectedIssue(null)}><X /></button>
            </div>
            <div className="w-full h-48 bg-slate-200 rounded-xl mb-6"></div>
            <h3 className="text-lg font-bold mb-4">{selectedIssue.title}</h3>
            <div className="grid grid-cols-2 gap-4 text-sm mb-6">
              <p><strong>Ward:</strong> {selectedIssue.ward}</p>
              <p><strong>Category:</strong> {selectedIssue.category}</p>
              <p><strong>Priority:</strong> {selectedIssue.priority}</p>
              <p><strong>Status:</strong> <span className={getStatusColor(selectedIssue.status)}>{selectedIssue.status}</span></p>
            </div>
            
            <div className="border-t pt-6">
              {selectedIssue.status === 'Resolved' && (
                <div>
                  <p className="text-slate-600 mb-4 text-sm bg-slate-50 p-4 rounded-lg">This issue has been resolved.</p>
                  <button className="w-full border border-slate-300 text-slate-700 py-2 rounded-lg font-bold hover:bg-slate-50">Reopen Issue</button>
                </div>
              )}

              {selectedIssue.status === 'Assigned' && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h4 className="text-sm font-bold text-blue-900 mb-2">Assignment Details</h4>
                  <p className="text-sm text-blue-800"><strong>Department:</strong> {selectedIssue.assignedDept}</p>
                  <p className="text-sm text-blue-800"><strong>Officer:</strong> {selectedIssue.assignedOfficer}</p>
                  {/* Backend Integration Note: map backend 'assignedBy' or 'assignedAt' fields here */}
                </div>
              )}

              {selectedIssue.status === 'Pending' && (
                <div className="space-y-4">
                  <label className="text-sm font-semibold text-slate-700">Administrative Actions</label>
                  <select className="w-full border p-2 rounded-lg"><option>Department: Engineering</option></select>
                  <select className="w-full border p-2 rounded-lg"><option>Assign Officer</option></select>
                  <select className="w-full border p-2 rounded-lg"><option>Set Priority</option></select>
                  <button className="w-full bg-cyan-600 text-white py-2 rounded-lg font-bold">Save Changes</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}