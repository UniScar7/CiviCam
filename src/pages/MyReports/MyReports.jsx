import React, { useState } from 'react';
import { 
  FileText, Clock, CheckCircle2, Users, Search, Image as ImageIcon, 
  MapPin, AlertTriangle, Calendar, Sparkles, Activity, Building, 
  User, PenSquare, Trash2, X, AlertCircle
} from 'lucide-react';

// ==========================================
// Mock Fake Data
// ==========================================
const MOCK_MY_REPORTS = [
  {
    id: 'REP-1042',
    title: 'Severe Water Pipe Burst',
    address: '422 Willow Creek Dr',
    ward: 'Ward 7A - Northside',
    description: 'A major pipe has burst on the sidewalk, spewing water onto the road and freezing. High slipping hazard for pedestrians and cars.',
    date: 'Oct 24, 2023',
    status: 'In Progress',
    priority: 'Critical',
    confirmations: 12,
    aiCategory: 'Water & Plumbing',
    aiConfidence: '98.5%',
    department: 'Water & Sanitation Authority',
    officer: 'Michael Chang',
    estimatedResolution: 'Oct 25, 2023',
    notes: 'I spoke to the neighbors and they said their water pressure has dropped significantly since this morning.',
    timelineIndex: 2, // 0: Submitted, 1: Reviewed, 2: Assigned, 3: In Progress, 4: Resolved
  },
  {
    id: 'REP-0981',
    title: 'Fallen Tree Branch Blocking Lane',
    address: 'Oak Avenue & 5th St',
    ward: 'Ward 3C - West End',
    description: 'Large oak branch came down during last night\'s storm. It is completely blocking the right lane of northbound traffic.',
    date: 'Oct 22, 2023',
    status: 'Resolved',
    priority: 'High',
    confirmations: 34,
    aiCategory: 'Road & Infrastructure',
    aiConfidence: '94.2%',
    department: 'Dept. of Public Works',
    officer: 'Sarah Jenkins',
    estimatedResolution: 'Completed',
    notes: 'Branch is heavily laden with leaves. Might require a chainsaw crew.',
    timelineIndex: 4,
  },
  {
    id: 'REP-1105',
    title: 'Traffic Light Malfunction',
    address: 'Downtown Main Intersection',
    ward: 'Ward 1A - Downtown',
    description: 'The eastbound traffic light is stuck on red. Traffic is backing up for blocks and people are running the red out of frustration.',
    date: 'Oct 26, 2023',
    status: 'Pending',
    priority: 'High',
    confirmations: 5,
    aiCategory: 'Traffic & Signals',
    aiConfidence: '91.0%',
    department: 'City Traffic Control',
    officer: 'Pending Assignment',
    estimatedResolution: 'TBD',
    notes: 'Police might need to direct traffic until this is fixed.',
    timelineIndex: 0,
  },
  {
    id: 'REP-0854',
    title: 'Pothole Cluster Near Crosswalk',
    address: '1100 Block of Elm St',
    ward: 'Ward 4B - Eastside',
    description: 'A cluster of deep potholes right where pedestrians cross. Hard to see at night, I almost twisted my ankle.',
    date: 'Oct 15, 2023',
    status: 'Resolved',
    priority: 'Medium',
    confirmations: 18,
    aiCategory: 'Road & Infrastructure',
    aiConfidence: '99.1%',
    department: 'Dept. of Public Works',
    officer: 'David Rossi',
    estimatedResolution: 'Completed',
    notes: 'Has been getting worse since the winter freeze.',
    timelineIndex: 4,
  },
  {
    id: 'REP-1122',
    title: 'Illegal Dumping Behind Plaza',
    address: 'Rear Alley, Sunnyside Plaza',
    ward: 'Ward 6 - Industrial',
    description: 'Someone dumped several old mattresses and a broken refrigerator blocking the loading dock access.',
    date: 'Oct 27, 2023',
    status: 'Pending',
    priority: 'Low',
    confirmations: 2,
    aiCategory: 'Waste & Sanitation',
    aiConfidence: '88.7%',
    department: 'Environmental Services',
    officer: 'Pending Assignment',
    estimatedResolution: 'TBD',
    notes: 'No camera footage available unfortunately.',
    timelineIndex: 1,
  },
  {
    id: 'REP-0733',
    title: 'Graffiti on Public Library',
    address: 'Central Library, Main Entrance',
    ward: 'Ward 1A - Downtown',
    description: 'Offensive graffiti sprayed across the newly renovated glass doors of the library.',
    date: 'Oct 05, 2023',
    status: 'Rejected',
    priority: 'Low',
    confirmations: 0,
    aiCategory: 'Vandalism',
    aiConfidence: '96.4%',
    department: 'Parks & Recreation',
    officer: 'Elena Rodriguez',
    estimatedResolution: 'N/A',
    notes: 'Should be cleaned quickly before it dries fully into the etched glass.',
    timelineIndex: -1, // Special index for rejected
  }
];

const FILTERS = ['All', 'Pending', 'In Progress', 'Resolved', 'Rejected'];
const TIMELINE_STEPS = ['Submitted', 'AI Reviewed', 'Assigned', 'In Progress', 'Resolved'];

// ==========================================
// Helper Components
// ==========================================
const getStatusColor = (status) => {
  switch (status) {
    case 'Resolved': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    case 'In Progress': return 'bg-cyan-100 text-cyan-700 border-cyan-200';
    case 'Pending': return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'Rejected': return 'bg-red-100 text-red-700 border-red-200';
    default: return 'bg-slate-100 text-slate-700 border-slate-200';
  }
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'Critical': return 'text-red-700 bg-red-50 border border-red-100';
    case 'High': return 'text-orange-700 bg-orange-50 border border-orange-100';
    case 'Medium': return 'text-amber-700 bg-amber-50 border border-amber-100';
    case 'Low': return 'text-green-700 bg-green-50 border border-green-100';
    default: return 'text-slate-700 bg-slate-50 border border-slate-100';
  }
};

// ==========================================
// Main Component
// ==========================================
export default function MyReports() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);

  // Filter Logic
  const filteredReports = MOCK_MY_REPORTS.filter(report => {
    const matchesFilter = activeFilter === 'All' || report.status === activeFilter;
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          report.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Drawer Handlers
  React.useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setSelectedReport(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  React.useEffect(() => {
    if (selectedReport) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedReport]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* 1. Header Section */}
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            My Reports
          </h1>
          <p className="text-slate-500 mt-2 text-lg max-w-2xl">
            Track the status of your submitted civic issues. Review AI analysis, monitor municipality response times, and update your active reports.
          </p>
        </header>

        {/* 2. Statistics Cards */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Reports Submitted', value: '14', icon: FileText, color: 'text-slate-600' },
            { label: 'Pending', value: '2', icon: Clock, color: 'text-amber-500' },
            { label: 'Resolved', value: '11', icon: CheckCircle2, color: 'text-emerald-600' },
            { label: 'Community Confirmations', value: '146', icon: Users, color: 'text-blue-600' }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-center transition-all hover:shadow-md">
              <div className="flex items-center gap-2 mb-2 text-slate-500">
                <stat.icon size={18} className={stat.color} />
                <span className="text-sm font-semibold">{stat.label}</span>
              </div>
              <span className="text-3xl font-extrabold text-slate-900">{stat.value}</span>
            </div>
          ))}
        </section>

        {/* 3 & 4. Search and Filters */}
        <section className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="relative w-full lg:max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search my reports by title or address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-hide">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${
                  activeFilter === filter 
                    ? 'bg-slate-900 text-white shadow-sm' 
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </section>

        {/* 5. Report Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report) => (
            <div 
              key={report.id}
              onClick={() => setSelectedReport(report)}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group flex flex-col"
            >
              {/* Thumbnail Placeholder */}
              <div className="h-48 bg-slate-100 border-b border-slate-200 flex items-center justify-center relative overflow-hidden group-hover:bg-slate-200 transition-colors">
                <ImageIcon size={32} className="text-slate-300" />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-md border shadow-sm backdrop-blur-md bg-white/90 ${getStatusColor(report.status)}`}>
                    {report.status}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent pointer-events-none"></div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${getPriorityColor(report.priority)}`}>
                    {report.priority} Priority
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    {report.id}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight group-hover:text-cyan-700 transition-colors line-clamp-2">
                  {report.title}
                </h3>
                
                <div className="space-y-1.5 mb-5 mt-auto">
                  <div className="flex items-center gap-2 text-slate-500">
                    <MapPin size={14} className="shrink-0" />
                    <span className="text-sm line-clamp-1">{report.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <Building size={14} className="shrink-0" />
                    <span className="text-sm line-clamp-1">{report.ward}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                    <Calendar size={14} />
                    {report.date}
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md border border-blue-100">
                    <Users size={14} />
                    {report.confirmations} Confs
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {filteredReports.length === 0 && (
             <div className="col-span-full bg-white rounded-2xl border border-slate-200 p-12 text-center border-dashed">
             <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
               <FileText size={32} />
             </div>
             <h3 className="text-lg font-semibold mb-2">No reports found</h3>
             <p className="text-slate-500 max-w-sm mx-auto">
               You haven't submitted any reports matching these criteria.
             </p>
           </div>
          )}
        </div>
      </div>

      {/* 6. Report Details Drawer */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
            onClick={() => setSelectedReport(null)}
          ></div>
          
          {/* Drawer Panel */}
          <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 z-50">
            
            {/* Drawer Header (Image + Close Button) */}
            <div className="relative h-56 bg-slate-100 border-b border-slate-200 shrink-0">
              <button 
                onClick={() => setSelectedReport(null)}
                className="absolute top-4 right-4 bg-white/90 hover:bg-white text-slate-900 p-2 rounded-full shadow-sm backdrop-blur transition-colors z-10"
              >
                <X size={20} />
              </button>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                <ImageIcon size={48} className="mb-2 opacity-50" />
                <span className="text-sm font-semibold">Your Submitted Photo</span>
              </div>
              <div className="absolute bottom-4 left-4 flex gap-2 z-10">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-md border shadow-sm backdrop-blur-md bg-white/90 ${getStatusColor(selectedReport.status)}`}>
                  {selectedReport.status}
                </span>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-md border shadow-sm backdrop-blur-md bg-white/90 ${getPriorityColor(selectedReport.priority)}`}>
                  {selectedReport.priority}
                </span>
              </div>
            </div>

            {/* Drawer Body (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              
              {/* Title & Desc */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">{selectedReport.id}</span>
                  <span className="text-xs font-semibold text-slate-500 flex items-center gap-1"><Calendar size={12}/> {selectedReport.date}</span>
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 leading-tight mb-3">
                  {selectedReport.title}
                </h2>
                <div className="flex flex-col gap-1.5 mb-4">
                  <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
                    <MapPin size={16} className="text-slate-400" />
                    {selectedReport.address}
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
                    <Building size={16} className="text-slate-400" />
                    {selectedReport.ward}
                  </div>
                </div>
                <p className="text-slate-700 leading-relaxed text-sm bg-slate-50 p-4 rounded-xl border border-slate-100">
                  "{selectedReport.description}"
                </p>
              </div>

              {/* AI Analysis Section */}
              <div className="bg-gradient-to-br from-cyan-50/50 to-blue-50/50 border border-cyan-100 rounded-xl p-4">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 mb-3">
                  <Sparkles size={16} className="text-cyan-600" />
                  AI Assessment Data
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-500 font-medium mb-1">Categorized As</p>
                    <p className="text-sm font-semibold text-slate-900">{selectedReport.aiCategory}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium mb-1">Confidence Score</p>
                    <p className="text-sm font-semibold text-cyan-700">{selectedReport.aiConfidence}</p>
                  </div>
                </div>
              </div>

              <div className="h-px w-full bg-slate-100"></div>

              {/* Authority Section */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <AlertCircle size={16} className="text-slate-400" />
                  Handling Details
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <p className="text-xs text-slate-500 font-medium mb-1 flex items-center gap-1"><Building size={12}/> Dept</p>
                    <p className="text-sm font-semibold text-slate-900">{selectedReport.department}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <p className="text-xs text-slate-500 font-medium mb-1 flex items-center gap-1"><User size={12}/> Officer</p>
                    <p className="text-sm font-semibold text-slate-900">{selectedReport.officer}</p>
                  </div>
                  <div className="col-span-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <p className="text-xs text-slate-500 font-medium mb-1 flex items-center gap-1"><Clock size={12}/> Est. Resolution</p>
                    <p className="text-sm font-semibold text-slate-900">{selectedReport.estimatedResolution}</p>
                  </div>
                </div>
              </div>

              <div className="h-px w-full bg-slate-100"></div>

              {/* Timeline Section */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Activity size={16} className="text-slate-400" />
                  Progress Timeline
                </h4>
                
                {selectedReport.status === 'Rejected' ? (
                  <div className="bg-red-50 text-red-800 p-4 rounded-xl text-sm border border-red-100 flex gap-3 items-start">
                    <AlertTriangle size={20} className="shrink-0 text-red-500"/>
                    <div>
                      <p className="font-bold mb-1">Report Rejected</p>
                      <p>This report was reviewed and marked as invalid or duplicate. No further action will be taken.</p>
                    </div>
                  </div>
                ) : (
                  <div className="pl-2 mt-4 space-y-6">
                    {TIMELINE_STEPS.map((step, idx) => {
                      const isCompleted = idx <= selectedReport.timelineIndex;
                      const isCurrent = idx === selectedReport.timelineIndex;
                      return (
                        <div key={step} className="relative flex gap-4 items-start">
                          {/* Vertical Line Connection */}
                          {idx !== TIMELINE_STEPS.length - 1 && (
                            <div 
                              className={`absolute left-2.5 top-6 bottom-[-24px] w-0.5 ${idx < selectedReport.timelineIndex ? 'bg-cyan-500' : 'bg-slate-200'}`}
                            ></div>
                          )}
                          
                          {/* Status Icon */}
                          <div className={`relative z-10 w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                            isCompleted 
                              ? 'bg-cyan-500 border-cyan-500 text-white' 
                              : 'bg-white border-slate-300 text-transparent'
                          }`}>
                            <CheckCircle2 size={14} strokeWidth={3} className={isCompleted ? "opacity-100" : "opacity-0"} />
                          </div>
                          
                          {/* Text */}
                          <div className={`text-sm pt-0.5 ${isCurrent ? 'font-extrabold text-cyan-700' : isCompleted ? 'font-semibold text-slate-900' : 'font-medium text-slate-400'}`}>
                            {step}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="h-px w-full bg-slate-100"></div>

              {/* Citizen Notes Section */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <PenSquare size={16} className="text-slate-400" />
                  My Notes (Private)
                </h4>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <p className="text-sm text-slate-600 italic">
                    {selectedReport.notes}
                  </p>
                </div>
              </div>

            </div>
            
            {/* Drawer Footer Actions */}
            <div className="p-4 border-t border-slate-200 bg-white grid grid-cols-2 gap-3">
              <button 
                disabled
                className="flex items-center justify-center gap-2 bg-slate-50 border border-slate-200 text-red-500 px-4 py-3 rounded-xl font-bold opacity-50 cursor-not-allowed transition-colors"
              >
                <Trash2 size={18} />
                Delete
              </button>
              <button 
                className="flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-3 rounded-xl font-bold transition-colors shadow-sm"
              >
                <PenSquare size={18} />
                Edit Report
              </button>
            </div>
            
          </div>
        </div>
      )}
      
    </div>
  );
}