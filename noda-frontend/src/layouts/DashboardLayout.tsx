import Navbar from "@/components/myComponents/App/AppNavbar";
import AppSideBar from "@/components/myComponents/App/Sidebar";
import React from "react";
import { NotificationProvider } from "@/context/NotificationContext";
import { GlobalNotificationDock } from "@/components/system/GlobalNotificationDock"; // Ensure path matches exactly

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <NotificationProvider>
      <div className="min-h-screen bg-white text-zinc-900 font-sans flex flex-col relative">
        {/* Global Top Navigation Banner */}
        <Navbar />

        {/* Main Structural Wrapper Container */}
        <div className="w-full max-w-4xl mx-auto px-6 flex flex-1 gap-4">
          {/* Left Side Static Navigation Column */}
          <aside className="w-25 flex-none hidden md:block">
            <AppSideBar />
          </aside>

          {/* Dynamic Context Workspace */}
          <div className="flex-1 flex min-w-0">{children}</div>
        </div>
      </div>

      {/* ⚡ MOUNTED DOCK AT LAYOUT ROOT LEVEL FOR VISUAL LAYERING ⚡ */}
      <GlobalNotificationDock />
    </NotificationProvider>
  );
};

export default DashboardLayout;