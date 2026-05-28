import Navbar from '@/components/myComponents/App/AppNavbar';
import AppSideBar from '@/components/myComponents/App/Sidebar';
import React from 'react';


interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans">
      {/* Global Top Navigation Banner */}
      <Navbar />

      {/* Main Structural Wrapper */}
      <div className="max-w-4xl w-full mx-auto px-6 flex gap-4">
        
        {/* Left Side Static Navigation Column */}
        <aside className="w-25 flex-none">
          <AppSideBar />
        </aside>

        {/* Dynamic Workspace Context View Engine */}
        <div className="flex-1 flex">
          {children} {/* <--- Your Page components inject cleanly right here */}
        </div>
        
      </div>
    </div>
  );
};

export default DashboardLayout;