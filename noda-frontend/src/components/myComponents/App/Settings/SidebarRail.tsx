import React from 'react';
import { LogOut } from 'lucide-react';
import { cn } from "@/lib/utils";
import type { SettingsTabId, TabConfig } from '@/types/settings';

interface SidebarRailProps {
    tabs: TabConfig[];
    activeTab: SettingsTabId;
    setActiveTab: (id: SettingsTabId) => void;
}

const SidebarRail: React.FC<SidebarRailProps> = ({ tabs, activeTab, setActiveTab }) => (
    <div className="w-48 flex flex-col border-r border-zinc-300 bg-zinc-50/30 sticky top-12 h-[calc(100vh-48px)]">
        <div className="p-3 border-b border-zinc-300">
            <span className="text-[9px] font-mono font-black uppercase tracking-[0.2em] text-zinc-500">Settings_Index</span>
        </div>
        <div className="flex-1 flex flex-col overflow-y-auto scrollbar-hide">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                        "flex items-center gap-3 px-3 py-3 border-b border-zinc-300 transition-all text-left border-none cursor-pointer",
                        activeTab === tab.id 
                            ? "bg-white text-zinc-900 shadow-[inset_-4px_0_0_0_#18181b]" 
                            : "text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100/50"
                    )}
                >
                    {tab.icon}
                    <span className="text-[11px] font-mono font-black uppercase tracking-tighter leading-none">{tab.label}</span>
                </button>
            ))}
        </div>
        <button className="flex items-center gap-3 px-4 py-5 text-zinc-500 hover:text-red-600 transition-colors border-t border-zinc-300 mt-auto bg-transparent border-none cursor-pointer">
            <LogOut size={16} />
            <span className="text-[10px] font-mono font-black uppercase tracking-tighter">Exit_Session</span>
        </button>
    </div>
);

export default SidebarRail;