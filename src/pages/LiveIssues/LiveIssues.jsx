import React, { useState } from 'react';
import { 
  Search, MapPin, CheckCircle2, Clock, Users, Sparkles, X, 
  Image as ImageIcon, Activity, Map, Building, User, AlertTriangle, 
  ChevronRight, Calendar, Info, Layers
} from 'lucide-react';

// ==========================================
// Mock Fake Data
// ==========================================
const MOCK_ISSUES = [
  {
    id: 'ISS-001',
    title: 'Deep Pothole on Main St.',
    description: 'A very large and deep pothole has formed in the middle lane near the intersection, causing cars to swerve dangerously.',
    category: 'Road',
    severity: 'High',
    status: 'Assigned',
    ward: 'Ward 4B - Downtown',
    reportedAt: '2 hours ago',
    dateValue: 'Oct 24, 2023',
    confirmations: 14,
    aiConfidence: '98.2%',
    department: 'Dept. of Public Works',
    authority: 'Pending Municipality Lookup',
    timelineStepIndex: 2 // 0: Reported, 1: Verified, 2: Assigned, 3: Scheduled, 4: Resolved
  },
  {
    id: 'ISS-002',
    title: 'Major Water Main Leak',
    description: 'Continuous water leakage flooding the sidewalk and street. Pressure seems to be dropping for nearby residents.',
    category: 'Water',
    severity: 'Critical',
    status: 'In Progress',
    ward: 'Ward 7A - Northside',
    reportedAt: '5 hours ago',
    dateValue: 'Oct 24, 2023',
    confirmations: 32,
    aiConfidence: '95.5%',
    department: 'Water & Sanitation Authority',
    authority: 'Pending Municipality Lookup',
    timelineStepIndex: 3
  },
  {
    id: 'ISS-003',
    title: 'Broken Streetlights Block 4',
    description: 'Entire block is pitch black at night. Multiple streetlights have been out for over a week, causing safety concerns.',
    category: 'Street Lights',
    severity: 'Medium',
    status: 'Reported',
    ward: 'Ward 2C - West End',
    reportedAt: '1 day ago',
    dateValue: 'Oct 23, 2023',
    confirmations: 8,
    aiConfidence: '89.1%',
    department: 'City Electrical Dept',
    authority: 'Pending Municipality Lookup',
    timelineStepIndex: 0
  },
  {
    id: 'ISS-004',
    title: 'Overflowing Garbage Bins',
    description: 'Public bins at the park entrance have not been collected and trash is spreading across the grass area.',
    category: 'Waste',
    severity: 'Medium',
    status: 'Verified',
    ward: 'Ward 5 - Central Park',
    reportedAt: '2 days ago',
    dateValue: 'Oct 22, 2023',
    confirmations: 21,
    aiConfidence: '99.9%',
    department: 'Waste Management',
    authority: 'Pending Municipality Lookup',
    timelineStepIndex: 1
  },
  {
    id: 'ISS-005',
    title: 'Damaged Footpath Near School',
    description: 'Paving stones have uplifted due to tree roots, creating a severe tripping hazard for children walking to the local elementary school.',
    category: 'Road',
    severity: 'High',
    status: 'Assigned',
    ward: 'Ward 8B - East Suburbs',
    reportedAt: '3 days ago',
    dateValue: 'Oct 21, 2023',
    confirmations: 45,
    aiConfidence: '92.4%',
    department: 'Dept. of Public Works',
    authority: 'Pending Municipality Lookup',
    timelineStepIndex: 2
  },
  {
    id: 'ISS-006',
    title: 'Illegal Dumping in Alley',
    description: 'Construction debris and old furniture dumped illegally blocking the rear service alleyway.',
    category: 'Other',
    severity: 'Low',
    status: 'Reported',
    ward: 'Ward 3A - Industrial',
    reportedAt: '4 days ago',
    dateValue: 'Oct 20, 2023',
    confirmations: 3,
    aiConfidence: '87.6%',
    department: 'Environmental Services',
    authority: 'Pending Municipality Lookup',
    timelineStepIndex: 0
  }
];

const FILTERS = ['All', 'Road', 'Water', 'Street Lights', 'Waste', 'Other'];
const TIMELINE_STEPS = ['Reported', 'Verified', 'Assigned', 'Repair Scheduled', 'Resolved'];

// ==========================================
// Helper Components
// ==========================================
const getSeverityColor = (severity) => {
  switch (severity) {
    case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
    case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'Medium': return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'Low': return 'bg-green-100 text-green-800 border-green-200';
    default: return 'bg-slate-100 text-slate-800 border-slate-200';
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'Resolved': return 'bg-emerald-100 text-emerald-700';
    case 'In Progress': return 'bg-cyan-100 text-cyan-700';
    case 'Assigned': return 'bg-blue-100 text-blue-700';
    case 'Verified': return 'bg-indigo-100 text-indigo-700';
    case 'Reported': return 'bg-slate-100 text-slate-700';
    default: return 'bg-slate-100 text-slate-700';
  }
};

// ==========================================
// Main Component
// ==========================================
export default function LiveIssues() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIssue, setSelectedIssue] = useState(null);

  // Close drawer on escape key
  React.useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setSelectedIssue(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Prevent background scrolling when drawer is open
  React.useEffect(() => {
    if (selectedIssue) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedIssue]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* 1. Header Section */}
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Live Community Issues
          </h1>
          <p className="text-slate-500 mt-2 text-lg max-w-2xl">
            Real-time transparency tracking of verified civic reports. Monitor local progress, hold authorities accountable, and see what's being fixed in your neighborhood.
          </p>
        </header>

        {/* 4. Statistics Cards */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Issues', value: '1,248', icon: Layers, color: 'text-slate-600' },
            { label: 'In Progress', value: '342', icon: Activity, color: 'text-cyan-600' },
            { label: 'Resolved', value: '890', icon: CheckCircle2, color: 'text-emerald-600' },
            { label: 'Community Verified', value: '1,105', icon: Users, color: 'text-blue-600' }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2 text-slate-500">
                <stat.icon size={18} className={stat.color} />
                <span className="text-sm font-semibold">{stat.label}</span>
              </div>
              <span className="text-3xl font-extrabold text-slate-900">{stat.value}</span>
            </div>
          ))}
        </section>

        {/* 2 & 3. Search and Filters */}
        <section className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="relative w-full lg:max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search issues or locations..."
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

        {/* Main Content Grid: Issue List + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 6. Issue Cards List (Takes up 2 columns on desktop) */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {MOCK_ISSUES.map((issue) => (
              <div 
                key={issue.id}
                onClick={() => setSelectedIssue(issue)}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group flex flex-col relative"
              >
                {/* AI Tag */}
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur shadow-sm rounded-lg px-2.5 py-1 z-10 flex items-center gap-1.5 border border-slate-100">
                  <Sparkles size={14} className="text-cyan-500" />
                  <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">AI Categorized</span>
                </div>

                {/* Thumbnail Placeholder */}
                <div className="h-40 bg-slate-100 border-b border-slate-200 flex items-center justify-center relative overflow-hidden group-hover:bg-slate-200 transition-colors">
                  <ImageIcon size={32} className="text-slate-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent"></div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-md border ${getSeverityColor(issue.severity)}`}>
                      {issue.severity} Priority
                    </span>
                    <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2.5 py-1 rounded-md border border-slate-200">
                      {issue.category}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-900 mb-1 leading-tight group-hover:text-cyan-700 transition-colors line-clamp-1">
                    {issue.title}
                  </h3>
                  
                  <div className="flex items-center gap-1.5 text-slate-500 mb-4 mt-1">
                    <MapPin size={14} />
                    <span className="text-sm line-clamp-1">{issue.ward}</span>
                  </div>

                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                      <Clock size={14} />
                      {issue.reportedAt}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                        <Users size={14} />
                        {issue.confirmations}
                      </div>
                      <span className={`text-xs font-bold px-2 py-1 rounded-md ${getStatusColor(issue.status)}`}>
                        {issue.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 5. Map Section (Takes 1 column, sticky on desktop) */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden sticky top-24 h-[600px] flex flex-col">
              <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <Map size={18} className="text-cyan-600" />
                  Live Issue Map
                </h3>
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
              </div>
              
              {/* Fake Map Surface */}
              <div className="flex-1 bg-slate-100 relative overflow-hidden bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px]">
                
                {/* Fake Pins */}
                <div className="absolute top-[20%] left-[30%] text-red-500 flex flex-col items-center">
                  <MapPin size={28} className="drop-shadow-md" fill="currentColor" />
                </div>
                <div className="absolute top-[45%] left-[65%] text-cyan-500 flex flex-col items-center">
                  <MapPin size={24} className="drop-shadow-md" fill="currentColor" />
                </div>
                <div className="absolute top-[60%] left-[20%] text-amber-500 flex flex-col items-center">
                  <MapPin size={28} className="drop-shadow-md" fill="currentColor" />
                </div>
                <div className="absolute top-[75%] left-[50%] text-slate-400 flex flex-col items-center opacity-70">
                  <MapPin size={20} className="drop-shadow-md" fill="currentColor" />
                </div>

                {/* Coming Soon Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-slate-50/50 backdrop-blur-[2px]">
                  <div className="bg-white/90 border border-slate-200 px-6 py-4 rounded-2xl shadow-lg flex flex-col items-center gap-2 text-center max-w-[200px]">
                    <Map className="text-cyan-600 mb-1" size={24} />
                    <span className="font-bold text-slate-900">Interactive Map</span>
                    <span className="text-xs text-slate-500 font-medium">Coming Soon in Full Release</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 7. Issue Detail Drawer (Overlay) */}
      {selectedIssue && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
            onClick={() => setSelectedIssue(null)}
          ></div>
          
          {/* Drawer Panel */}
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 z-50">
            
            {/* Drawer Header (Image + Close Button) */}
            <div className="relative h-64 bg-slate-100 border-b border-slate-200 shrink-0">
              <button 
                onClick={() => setSelectedIssue(null)}
                className="absolute top-4 right-4 bg-white/80 hover:bg-white text-slate-900 p-2 rounded-full shadow-sm backdrop-blur transition-colors z-10"
              >
                <X size={20} />
              </button>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                <ImageIcon size={48} className="mb-2 opacity-50" />
                <span className="text-sm font-semibold">Verified Image Evidence</span>
              </div>
              <div className="absolute bottom-4 left-4 flex gap-2 z-10">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-md border shadow-sm ${getSeverityColor(selectedIssue.severity)}`}>
                  {selectedIssue.severity} Priority
                </span>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-md border shadow-sm ${getStatusColor(selectedIssue.status)}`}>
                  {selectedIssue.status}
                </span>
              </div>
            </div>

            {/* Drawer Body (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              
              {/* Title & Desc */}
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 leading-tight mb-2">
                  {selectedIssue.title}
                </h2>
                <div className="flex items-center gap-1.5 text-slate-500 text-sm font-medium mb-4">
                  <MapPin size={16} className="text-slate-400" />
                  {selectedIssue.ward}
                </div>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {selectedIssue.description}
                </p>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                  <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                    <AlertTriangle size={14} />
                    <span className="text-xs font-bold uppercase tracking-wider">Category</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-900">{selectedIssue.category}</span>
                </div>
                <div className="bg-cyan-50/50 border border-cyan-100 rounded-xl p-3">
                  <div className="flex items-center gap-1.5 text-cyan-700 mb-1">
                    <Sparkles size={14} />
                    <span className="text-xs font-bold uppercase tracking-wider">AI Confidence</span>
                  </div>
                  <span className="text-sm font-semibold text-cyan-900">{selectedIssue.aiConfidence}</span>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                  <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                    <Calendar size={14} />
                    <span className="text-xs font-bold uppercase tracking-wider">Reported</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-900">{selectedIssue.dateValue}</span>
                </div>
                <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-3">
                  <div className="flex items-center gap-1.5 text-blue-700 mb-1">
                    <Users size={14} />
                    <span className="text-xs font-bold uppercase tracking-wider">Confirmations</span>
                  </div>
                  <span className="text-sm font-semibold text-blue-900">{selectedIssue.confirmations} Citizens</span>
                </div>
              </div>

              <div className="h-px w-full bg-slate-100"></div>

              {/* Authority Section */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Building size={16} className="text-slate-400" />
                  Routing Information
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-slate-100 p-2 rounded-lg text-slate-500 shrink-0">
                      <Building size={16} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Responsible Department</p>
                      <p className="text-sm font-semibold text-slate-900">{selectedIssue.department}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-slate-100 p-2 rounded-lg text-slate-500 shrink-0">
                      <User size={16} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Responsible Authority</p>
                      <p className="text-sm font-semibold text-slate-900">{selectedIssue.authority}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-px w-full bg-slate-100"></div>

              {/* Timeline Section */}
              <div className="space-y-4 pb-6">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Activity size={16} className="text-slate-400" />
                  Resolution Timeline
                </h4>
                
                <div className="pl-2 mt-4 space-y-6">
                  {TIMELINE_STEPS.map((step, idx) => {
                    const isCompleted = idx <= selectedIssue.timelineStepIndex;
                    return (
                      <div key={step} className="relative flex gap-4 items-start">
                        {/* Vertical Line Connection */}
                        {idx !== TIMELINE_STEPS.length - 1 && (
                          <div 
                            className={`absolute left-2.5 top-6 bottom-[-24px] w-0.5 ${idx < selectedIssue.timelineStepIndex ? 'bg-cyan-500' : 'bg-slate-200'}`}
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
                        <div className={`text-sm font-semibold pt-0.5 ${isCompleted ? 'text-slate-900' : 'text-slate-400'}`}>
                          {step}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            {/* Drawer Footer Actions */}
            <div className="p-4 border-t border-slate-200 bg-slate-50">
              <button className="w-full bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 px-4 py-3 rounded-xl font-bold transition-colors shadow-sm flex items-center justify-center gap-2">
                <Info size={18} />
                I'm experiencing this too
              </button>
            </div>
            
          </div>
        </div>
      )}
      
    </div>
  );
}