import React from 'react';
import { 
  User, Mail, MapPin, Hash, Calendar, Edit2, 
  FileText, CheckCircle2, Users, Star, Award, 
  Shield, Map, Activity, Bell, Lock, Globe, 
  HelpCircle, Info, LogOut, ChevronRight
} from 'lucide-react';

// ==========================================
// Mock Fake Data
// ==========================================
const MOCK_USER = {
  fullName: 'Sarah Jenkins',
  email: 'sarah.jenkins@example.com',
  city: 'Metro City',
  ward: 'Ward 4B - Eastside',
  citizenId: 'CIV-2023-8841',
  joinedDate: 'October 2023',
};

const MOCK_IMPACT = [
  { label: 'Reports Submitted', value: '14', icon: FileText, color: 'text-slate-600', bgColor: 'bg-slate-100' },
  { label: 'Reports Resolved', value: '11', icon: CheckCircle2, color: 'text-emerald-600', bgColor: 'bg-emerald-100' },
  { label: 'Community Confirmations', value: '146', icon: Users, color: 'text-blue-600', bgColor: 'bg-blue-100' },
  { label: 'Reputation Score', value: '98', icon: Star, color: 'text-amber-500', bgColor: 'bg-amber-100' },
];

const MOCK_ACHIEVEMENTS = [
  { id: 1, title: 'First Report', description: 'Submitted your first civic issue.', icon: Award, unlocked: true },
  { id: 2, title: 'Community Helper', description: 'Received 50 community confirmations.', icon: Users, unlocked: true },
  { id: 3, title: 'Local Watch', description: 'Reported issues in 3 different wards.', icon: Map, unlocked: true },
  { id: 4, title: 'Trusted Citizen', description: 'Maintained a 95+ reputation score.', icon: Shield, unlocked: true },
  { id: 5, title: 'Civic Leader', description: 'Have 50 issues successfully resolved.', icon: Star, unlocked: false },
  { id: 6, title: 'Neighborhood Hero', description: 'Receive 500 community confirmations.', icon: Award, unlocked: false },
];

const MOCK_ACTIVITY = [
  { id: 1, title: 'Community confirmation received', description: 'Someone confirmed your report "Traffic Light Malfunction".', date: '2 hours ago', icon: Users, type: 'confirmation' },
  { id: 2, title: 'Issue resolved', description: 'Your report "Pothole Cluster Near Crosswalk" was marked as resolved.', date: '1 day ago', icon: CheckCircle2, type: 'resolved' },
  { id: 3, title: 'Issue assigned', description: 'Your report "Traffic Light Malfunction" was assigned to City Traffic Control.', date: '2 days ago', icon: Activity, type: 'assigned' },
  { id: 4, title: 'Report verified', description: 'AI verification complete for "Traffic Light Malfunction".', date: '3 days ago', icon: Shield, type: 'verified' },
  { id: 5, title: 'Reported pothole', description: 'You submitted a new report "Deep Pothole on Main St.".', date: '1 week ago', icon: FileText, type: 'reported' },
];

// ==========================================
// Helper Components
// ==========================================
const getActivityIconColor = (type) => {
  switch (type) {
    case 'resolved': return 'bg-emerald-100 text-emerald-600';
    case 'assigned': return 'bg-blue-100 text-blue-600';
    case 'verified': return 'bg-indigo-100 text-indigo-600';
    case 'confirmation': return 'bg-amber-100 text-amber-600';
    default: return 'bg-slate-100 text-slate-600';
  }
};

// ==========================================
// Main Component
// ==========================================
export default function Profile() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            My Profile
          </h1>
          <p className="text-slate-500 mt-2 text-lg max-w-2xl">
            Manage your account and track your civic contributions.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* ============================== */}
          {/* LEFT COLUMN (Profile & Account) */}
          {/* ============================== */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Profile Card */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 flex flex-col items-center text-center border-b border-slate-100">
                <div className="w-24 h-24 bg-cyan-50 rounded-full flex items-center justify-center mb-4 border-4 border-cyan-100 text-cyan-600 shadow-sm">
                  <User size={40} />
                </div>
                <h2 className="text-xl font-bold text-slate-900">{MOCK_USER.fullName}</h2>
                <div className="flex items-center gap-1.5 mt-2 px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold">
                  <Shield className="w-3.5 h-3.5 text-cyan-600" />
                  Verified Citizen
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="truncate">{MOCK_USER.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{MOCK_USER.city}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Map className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{MOCK_USER.ward}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Hash className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="font-mono">{MOCK_USER.citizenId}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Joined {MOCK_USER.joinedDate}</span>
                </div>

                <button className="w-full mt-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm">
                  <Edit2 size={16} />
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Account Settings Menu */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs">Account Settings</h3>
              </div>
              <div className="flex flex-col">
                <button className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors border-b border-slate-100 text-left">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-slate-400" />
                    <span className="font-medium text-slate-700">Notifications</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </button>
                <button className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors border-b border-slate-100 text-left">
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-slate-400" />
                    <span className="font-medium text-slate-700">Privacy & Security</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </button>
                <button className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors border-b border-slate-100 text-left">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-slate-400" />
                    <span className="font-medium text-slate-700">Language</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </button>
                <button className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors border-b border-slate-100 text-left">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-slate-400" />
                    <span className="font-medium text-slate-700">Support</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </button>
                <button className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors border-b border-slate-100 text-left">
                  <div className="flex items-center gap-3">
                    <Info className="w-5 h-5 text-slate-400" />
                    <span className="font-medium text-slate-700">About CiviCam</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </button>
                <button className="flex items-center gap-3 p-4 hover:bg-red-50 text-red-600 transition-colors text-left font-medium">
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            </div>

          </div>


          {/* ============================== */}
          {/* RIGHT COLUMN (Impact & Activity) */}
          {/* ============================== */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Citizen Impact Section */}
            <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Citizen Impact</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {MOCK_IMPACT.map((stat, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col items-start hover:border-slate-200 transition-colors">
                    <div className={`${stat.bgColor} ${stat.color} p-2 rounded-lg mb-3`}>
                      <stat.icon size={20} />
                    </div>
                    <span className="text-3xl font-extrabold text-slate-900 mb-1">{stat.value}</span>
                    <span className="text-xs font-semibold text-slate-500">{stat.label}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Achievements Section */}
            <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center justify-between">
                Achievements
                <span className="text-sm font-medium text-cyan-600 bg-cyan-50 px-3 py-1 rounded-full">
                  4 / 6 Unlocked
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MOCK_ACHIEVEMENTS.map((achievement) => (
                  <div 
                    key={achievement.id} 
                    className={`flex items-start gap-4 p-4 rounded-xl border ${
                      achievement.unlocked 
                        ? 'bg-white border-slate-200 shadow-sm' 
                        : 'bg-slate-50 border-slate-100 opacity-60 grayscale'
                    }`}
                  >
                    <div className={`p-3 rounded-full shrink-0 ${
                      achievement.unlocked ? 'bg-cyan-100 text-cyan-600' : 'bg-slate-200 text-slate-400'
                    }`}>
                      <achievement.icon size={24} />
                    </div>
                    <div>
                      <h3 className={`font-bold ${achievement.unlocked ? 'text-slate-900' : 'text-slate-500'}`}>
                        {achievement.title}
                      </h3>
                      <p className="text-sm text-slate-500 mt-1">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Recent Activity Section */}
            <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Recent Activity</h2>
              
              <div className="relative pl-4 border-l-2 border-slate-100 space-y-8 ml-2">
                {MOCK_ACTIVITY.map((activity) => (
                  <div key={activity.id} className="relative">
                    {/* Timeline Dot/Icon */}
                    <div className={`absolute -left-[35px] p-1.5 rounded-full ring-4 ring-white ${getActivityIconColor(activity.type)}`}>
                      <activity.icon size={14} />
                    </div>
                    
                    {/* Content */}
                    <div className="pl-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                        <h4 className="font-bold text-slate-900">{activity.title}</h4>
                        <span className="text-xs font-semibold text-slate-400">{activity.date}</span>
                      </div>
                      <p className="text-sm text-slate-600">{activity.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-8 bg-slate-50 hover:bg-slate-100 text-slate-600 font-semibold py-3 rounded-xl transition-colors border border-slate-200">
                View All Activity
              </button>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}