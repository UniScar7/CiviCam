import { useState, useEffect } from 'react';
import { Camera, ArrowRight, ShieldCheck } from 'lucide-react';
const Home = () => {
  // Setup state for dynamic database fetching later
  const [metrics, setMetrics] = useState({
    resolutionRate: null,
    resolutionTrend: null,
    averageResponseTime: null,
    isLoading: true
  });

  useEffect(() => {
    // Mock database fetch function
    const fetchMetrics = async () => {
      // In the future, replace this setTimeout with a real fetch/API call to your DB
      setTimeout(() => {
        setMetrics({
          resolutionRate: '89%',
          resolutionTrend: '+2% from last month',
          averageResponseTime: '14 hours',
          isLoading: false
        });
      }, 1000); // simulated network delay
    };

    fetchMetrics();
  }, []);

  return (
    <div className="flex flex-col gap-12">
      {/* Hero Section Placeholder */}
      <section className="text-center max-w-3xl mx-auto space-y-6 py-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium border border-blue-100 mb-4">
          <ShieldCheck size={16} />
          <span>Official Metro City District Portal</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
          Local Transparency Feed
        </h1>
        <p className="text-lg text-slate-600">
          Track real-time civic improvements in your neighborhood. Report issues, verify repairs, and hold your municipality accountable with verified photo evidence.
        </p>
        
        <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-xl font-medium transition-colors shadow-sm flex items-center justify-center gap-2 text-lg">
            <Camera size={20} />
            Report a Local Issue
          </button>
          <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-8 py-3 rounded-xl font-medium transition-colors shadow-sm flex items-center justify-center gap-2 text-lg">
            View Live Feed
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Structural Placeholder for Feed (To be built later) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Main Feed - 65% visually) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <h2 className="text-xl font-bold">Recent Reports</h2>
            <div className="flex gap-2 overflow-x-auto">
              {['All', 'Roads', 'Sanitation', 'Safety'].map((filter, i) => (
                <button 
                  key={filter} 
                  className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${i === 0 ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          
          {/* Empty State / Placeholder Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center border-dashed">
            <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
              <Camera size={32} />
            </div>
            <h3 className="text-lg font-semibold mb-2">No active reports found</h3>
            <p className="text-slate-500 max-w-sm mx-auto">
              Be the first to report an issue in your area and help improve your community.
            </p>
          </div>
        </div>

        {/* Right Column (Analytics Sidebar - 35% visually) */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center justify-between">
              Municipal Performance
              <span className="text-xs font-normal text-slate-500 bg-slate-100 px-2 py-1 rounded-md">Last 30 Days</span>
            </h3>
            
            <div className="space-y-6">
              <div>
                <p className="text-sm text-slate-500 mb-1">Resolution Rate</p>
                <div className="flex items-end gap-2">
                  {metrics.isLoading ? (
                    <div className="h-9 w-24 bg-slate-200 animate-pulse rounded-md"></div>
                  ) : (
                    <>
                      <span className="text-3xl font-bold text-emerald-600">{metrics.resolutionRate}</span>
                      <span className="text-sm text-emerald-600 font-medium pb-1">{metrics.resolutionTrend}</span>
                    </>
                  )}
                </div>
              </div>
              
              <div className="h-px bg-slate-100 w-full" />
              
              <div>
                <p className="text-sm text-slate-500 mb-1">Average Response Time</p>
                <div className="flex items-end gap-2">
                  {metrics.isLoading ? (
                    <div className="h-8 w-32 bg-slate-200 animate-pulse rounded-md"></div>
                  ) : (
                    <span className="text-2xl font-bold text-slate-900">{metrics.averageResponseTime}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
export default Home;