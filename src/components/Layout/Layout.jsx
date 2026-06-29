import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
const Layout = () => {
  // Mocking auth state for demonstration - lift state here to pass to navbar
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    // Primary Background: Slate 50 (#F8FAFC)
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      <Navbar />
      
      {/* Main content area where nested routes will render */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Pass down isAdmin if inner pages need to know the role */}
        <Outlet context={{ isAdmin }} />
      </main>
    </div>
  );
};
export default Layout;