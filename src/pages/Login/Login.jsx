import React, { useState } from 'react';
import { BrowserRouter, useNavigate, useLocation } from 'react-router-dom';
import { 
  Camera, 
  Eye, 
  EyeOff, 
  Sparkles, 
  Activity, 
  ShieldCheck, 
  Loader2, 
  User, 
  ShieldAlert
} from 'lucide-react';

// Extracted the main UI into a separate component so we can use hooks that require Router context.
function LoginUI() {
  const navigate = useNavigate();
  
  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Validation & Loading State
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  // Handle standard login submission
  const handleLogin = (e) => {
    e.preventDefault();
    let newErrors = { email: '', password: '' };
    let hasError = false;

    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
      hasError = true;
    }
    if (!password) {
      newErrors.password = 'Password is required.';
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      setIsLoading(true);
      // Simulate network request for 2 seconds
      setTimeout(() => {
        setIsLoading(false);
        // Default route after successful generic login
        navigate('/');
      }, 2000);
    }
  };

  // Google SVG Icon for the button
  const GoogleIcon = () => (
    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900 w-full">
      
      {/* ========================================== */}
      {/* LEFT SIDE: Marketing & Branding (Desktop) */}
      {/* ========================================== */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 text-white flex-col justify-between relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-[-20%] left-[-10%] w-[140%] h-[140%] bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-cyan-900/40 via-slate-900 to-slate-900 pointer-events-none"></div>

        <div className="relative z-10 p-12 lg:p-16 flex flex-col h-full justify-center space-y-12">
          
          {/* Logo Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-cyan-600 p-2.5 rounded-xl text-white shadow-lg shadow-cyan-900/50">
                <Camera size={28} strokeWidth={2.5} />
              </div>
              <span className="font-extrabold text-3xl tracking-tight">CiviCam</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
              Building Transparent Communities Through AI.
            </h1>
          </div>

          {/* Feature Cards */}
          <div className="space-y-4">
            <div className="bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm p-5 rounded-2xl flex items-center gap-4">
              <div className="bg-cyan-500/20 text-cyan-400 p-3 rounded-lg shrink-0">
                <Sparkles size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-slate-100">AI Issue Detection</h3>
                <p className="text-sm text-slate-400">Automated categorization and routing.</p>
              </div>
            </div>

            <div className="bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm p-5 rounded-2xl flex items-center gap-4">
              <div className="bg-blue-500/20 text-blue-400 p-3 rounded-lg shrink-0">
                <Activity size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-slate-100">Live Community Tracking</h3>
                <p className="text-sm text-slate-400">Real-time updates on civic repairs.</p>
              </div>
            </div>

            <div className="bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm p-5 rounded-2xl flex items-center gap-4">
              <div className="bg-emerald-500/20 text-emerald-400 p-3 rounded-lg shrink-0">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-slate-100">Transparent Response</h3>
                <p className="text-sm text-slate-400">Hold local authorities accountable.</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* ========================================== */}
      {/* RIGHT SIDE: Login Form */}
      {/* ========================================== */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        
        {/* Mobile Logo (Visible only on small screens) */}
        <div className="absolute top-8 left-8 lg:hidden flex items-center gap-2">
          <div className="bg-cyan-600 p-2 rounded-lg text-white">
            <Camera size={20} strokeWidth={2.5} />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-slate-900">CiviCam</span>
        </div>

        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome Back</h2>
            <p className="text-slate-500 mt-2">Sign in to continue improving your community.</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5" noValidate>
            
            {/* Email Field */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="citizen@example.com"
                className={`w-full bg-slate-50 border ${errors.email ? 'border-red-300 focus:ring-red-500' : 'border-slate-200 focus:ring-cyan-500'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:bg-white transition-all`}
              />
              {errors.email && <p className="text-red-500 text-sm font-medium">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full bg-slate-50 border ${errors.password ? 'border-red-300 focus:ring-red-500' : 'border-slate-200 focus:ring-cyan-500'} rounded-xl pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:bg-white transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 px-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm font-medium">{errors.password}</p>}
            </div>

            {/* Remember & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500 cursor-pointer" />
                <span className="text-slate-600 group-hover:text-slate-900 transition-colors">Remember me</span>
              </label>
              <a href="#" className="font-semibold text-cyan-600 hover:text-cyan-700 transition-colors">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 rounded-xl transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center text-sm text-slate-400 before:flex-1 before:border-t before:border-slate-200 before:mr-4 after:flex-1 after:border-t after:border-slate-200 after:ml-4">
            or continue with
          </div>

          {/* Google Sign In */}
          <button
            type="button"
            className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-3 rounded-xl transition-all shadow-sm flex items-center justify-center"
          >
            <GoogleIcon />
            Continue with Google
          </button>

          {/* ========================================== */}
          {/* HACKATHON DEMO ACCESS SECTION              */}
          {/* ========================================== */}
          <div className="mt-10 bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 text-center">
              Hackathon Demo Access
            </h3>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/')}
                className="w-full bg-blue-50 border border-blue-200 hover:bg-blue-100 text-blue-700 font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <User size={18} className="text-blue-500" />
                  Continue as Citizen
                </div>
                <span className="text-xs bg-white text-blue-600 px-2 py-1 rounded-md shadow-sm border border-blue-100 group-hover:bg-blue-50 transition-colors">
                  Citizen View
                </span>
              </button>
              
              <button
                onClick={() => navigate('/admin')}
                className="w-full bg-amber-50 border border-amber-200 hover:bg-amber-100 text-amber-700 font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <ShieldAlert size={18} className="text-amber-500" />
                  Continue as Admin
                </div>
                <span className="text-xs bg-white text-amber-600 px-2 py-1 rounded-md shadow-sm border border-amber-100 group-hover:bg-amber-50 transition-colors">
                  Dashboard View
                </span>
              </button>
            </div>
          </div>

          {/* Register Link */}
          <p className="text-center text-sm text-slate-600 mt-8">
            Don't have an account?{' '}
            <button 
              type="button" 
              className="font-semibold text-cyan-600 hover:text-cyan-700 transition-colors cursor-pointer"
            >
              Register
            </button>
          </p>

        </div>
      </div>

    </div>
  );
}

// Wrapper to provide Router context only when needed
export default function Login() {
  // Check if we are already inside a Router context by trying to access location.
  // If it throws or returns undefined, we wrap the component.
  let isInsideRouter = false;
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useLocation();
    isInsideRouter = true;
  } catch (e) {
    isInsideRouter = false;
  }

  if (isInsideRouter) {
    return <LoginUI />;
  }

  return (
    <BrowserRouter>
      <LoginUI />
    </BrowserRouter>
  );
}