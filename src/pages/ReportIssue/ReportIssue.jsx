import { useState } from 'react';
import { 
  ImagePlus, 
  MapPin, 
  Sparkles, 
  Send, 
  UploadCloud, 
  Loader2, 
  AlertTriangle, 
  Building, 
  User, 
  Map, 
  FileWarning, 
  Percent, 
  Activity 
} from 'lucide-react';
const ReportIssue = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResults, setAiResults] = useState({
    category: '--',
    severity: '--',
    department: '--',
    departmentHead: '--',
    wardNumber: '--',
    nearbyReports: '--',
    confidenceScore: '--'
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const handleSmartDetect = () => {
    if (!imagePreview) {
      alert("Please upload an image first for AI analysis.");
      return;
    }
    
    setIsAnalyzing(true);
    //Replace with Gemini response later//
    // Simulate AI Processing delay
    setTimeout(() => {
      setAiResults({
        category: 'Pending AI analysis',
        severity: 'Pending AI analysis',
        department: 'Pending AI analysis',
        departmentHead: 'Pending AI analysis',
        wardNumber: 'Pending AI analysis',
        nearbyReports: 'Pending AI analysis',
        confidenceScore: 'Pending AI analysis'
      });
      setIsAnalyzing(false);
    }, 2500);
  };

  const ResultItem = ({ icon: Icon, label, value, isHighlighted }) => (
    <div className="flex flex-col gap-1 p-3 bg-white rounded-lg border border-slate-100 shadow-sm">
      <div className="flex items-center gap-1.5 text-slate-500 mb-0.5">
        <Icon size={14} />
        <span className="text-xs font-medium uppercase tracking-wider">{label}</span>
      </div>
      <span className={`text-sm font-semibold truncate ${isHighlighted && value !== '--' ? 'text-amber-600' : 'text-slate-900'}`}>
        {value}
      </span>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Report a Civic Issue</h1>
        <p className="text-slate-600 mt-2">Help improve your community by reporting local infrastructure or safety issues with verified photo evidence.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 md:p-8 space-y-8">
          
          {/* 1. Image Upload & AI Section */}
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-slate-900">
              Photo Evidence <span className="text-red-500">*</span>
            </label>
            <div className="relative group">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className={`w-full border-2 border-dashed rounded-xl overflow-hidden transition-colors flex flex-col items-center justify-center ${imagePreview ? 'border-cyan-500 bg-slate-900' : 'border-slate-300 bg-slate-50 hover:bg-slate-100 h-64'}`}>
                {imagePreview ? (
                  <div className="relative w-full h-64 md:h-80 group">
                    <img src={imagePreview} alt="Issue preview" className="w-full h-full object-cover opacity-90 transition-opacity group-hover:opacity-50" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="bg-white/90 text-slate-900 px-4 py-2 rounded-lg font-medium shadow-sm flex items-center gap-2">
                        <UploadCloud size={18} />
                        Change Photo
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-6 text-slate-500 flex flex-col items-center">
                    <div className="bg-white p-3 rounded-full shadow-sm mb-4 text-cyan-600">
                      <ImagePlus size={32} />
                    </div>
                    <p className="font-medium text-slate-700">Tap to take a photo or upload</p>
                    <p className="text-sm mt-1">JPEG, PNG up to 10MB</p>
                  </div>
                )}
              </div>
            </div>

            <button 
              type="button" 
              onClick={handleSmartDetect}
              disabled={isAnalyzing}
              className="w-full bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-100 text-cyan-700 hover:bg-cyan-100 disabled:opacity-70 disabled:cursor-not-allowed px-4 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 size={18} className="text-cyan-500 animate-spin" />
                  Analyzing Scene...
                </>
              ) : (
                <>
                  <Sparkles size={18} className="text-cyan-500" />
                  Smart Detect Issue (Auto-fill & Route)
                </>
              )}
            </button>

            {/* AI Analysis Results Card */}
            <div className="bg-gradient-to-br from-slate-50 to-cyan-50/20 border border-cyan-100 rounded-xl p-5 relative overflow-hidden mt-4">
              {isAnalyzing && (
                <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] flex flex-col items-center justify-center z-10 rounded-xl transition-all">
                  <div className="bg-white p-3 rounded-full shadow-sm mb-3">
                    <Loader2 className="animate-spin text-cyan-600" size={24} />
                  </div>
                  <span className="text-sm font-semibold text-slate-800">Processing visual data...</span>
                </div>
              )}
              
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Activity size={16} className="text-cyan-600" />
                  AI Analysis Results
                </h4>
                <span className="text-[10px] font-bold bg-cyan-100 text-cyan-800 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  System Routed
                </span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                <ResultItem icon={Activity} label="Category" value={aiResults.category} />
                <ResultItem icon={AlertTriangle} label="Severity" value={aiResults.severity} isHighlighted={true} />
                <ResultItem icon={Building} label="Department" value={aiResults.department} />
                <ResultItem icon={User} label="Dept Head" value={aiResults.departmentHead} />
                <ResultItem icon={Map} label="Ward No." value={aiResults.wardNumber} />
                <ResultItem icon={FileWarning} label="Nearby Reports" value={aiResults.nearbyReports} />
                <ResultItem icon={Percent} label="Confidence" value={aiResults.confidenceScore} />
              </div>
            </div>
          </div>

          <div className="h-px bg-slate-100 w-full" />

          {/* 2. Issue Details */}
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-900">Issue Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Deep pothole on Main St." 
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white transition-all placeholder:text-slate-400"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-900">Category (Auto-selected)</label>
                <div className="relative">
                  <select 
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white transition-all"
                    value={aiResults.category !== '--' ? 'road' : ''}
                    onChange={() => {}}
                  >
                    <option value="" disabled>Select a category</option>
                    <option value="road">Road & Infrastructure</option>
                    <option value="water">Water & Plumbing</option>
                    <option value="lighting">Street Lighting</option>
                    <option value="waste">Waste & Sanitation</option>
                    <option value="other">Other / General</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-900">Detailed Description</label>
              <textarea 
                rows="4"
                placeholder="Describe the issue, potential hazards, and any specific landmarks..."
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white transition-all placeholder:text-slate-400 resize-none"
              ></textarea>
            </div>
          </div>

          {/* 3. Location Section */}
          <div className="space-y-3 p-5 bg-slate-50 rounded-xl border border-slate-200">
            <label className="block text-sm font-semibold text-slate-900">Issue Location</label>
            <div className="flex flex-col md:flex-row gap-3">
              <input 
                type="text" 
                placeholder="Enter street address or drag pin" 
                className="flex-1 bg-white border border-slate-200 text-slate-900 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all placeholder:text-slate-400"
              />
              <button type="button" className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 px-4 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 whitespace-nowrap shadow-sm">
                <MapPin size={18} className="text-blue-600" />
                Use Current Location
              </button>
            </div>
          </div>
        </div>
        
        {/* Footer Actions */}
        <div className="bg-slate-50 border-t border-slate-200 p-6 flex flex-col sm:flex-row justify-between items-center gap-4 rounded-b-2xl">
          <p className="text-xs text-slate-500 text-center sm:text-left max-w-xs">
            By submitting, you verify that this report is accurate and captured on-site.
          </p>
          <button type="button" className="w-full sm:w-auto bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-xl font-medium transition-colors shadow-sm flex items-center justify-center gap-2 text-lg">
            Submit Report
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default ReportIssue;