import React, { useState } from 'react';
import {
    Settings2, Check, Save, Trash2, ShieldCheck, Mail, BellRing, Activity,
    DollarSign,
    User,
    BriefcaseBusiness
} from 'lucide-react';
import Navbar from '../AppNavbar';
import AppSideBar from '../Sidebar';
import { cn } from "@/lib/utils";

// --- SHADCN IMPORTS ---
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// --- TYPES ---
type SettingsTabId = 'PROFILE' | 'APPEARANCE' | 'NOTIFICATIONS' | 'ACCOUNT';
const TABS: SettingsTabId[] = ['PROFILE', 'APPEARANCE', 'NOTIFICATIONS', 'ACCOUNT'];

const THEME_COLORS = [
    'bg-zinc-900', 'bg-blue-600', 'bg-cyan-500',
    'bg-violet-500', 'bg-fuchsia-500', 'bg-orange-500', 'bg-emerald-500'
];

const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState<SettingsTabId>('PROFILE');
    const [displayName, setDisplayName] = useState("");

    // Appearance States
    const [activeColor, setActiveColor] = useState('bg-orange-500');
    const [activeTheme, setActiveTheme] = useState<'light' | 'dark' | 'system'>('dark');
    const [activeFont, setActiveFont] = useState<'sm' | 'md' | 'lg'>('md');

    return (
        <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans flex flex-col relative overflow-hidden">
            <Navbar />

            <div className="max-w-4xl mx-auto px-6 flex flex-1 w-full gap-4 relative">

                {/* LEFT NAVIGATION */}
                <aside className="w-25 shrink-0 relative hidden sm:block">
                    <AppSideBar />
                </aside>

                <main className="flex flex-1 border-x border-zinc-300 bg-white min-h-[calc(100vh-3.5rem)] mt-12 shadow-sm flex-col relative">

                    {/* ULTRA-SIMPLIFIED HEADER */}
                    <div className="p-2 bg-white shrink-0 flex items-center gap-3 border-b border-zinc-300">

                        <h1 className="text-md font-bold uppercase tracking-tighter text-zinc-900 leading-none ">
                            Settings
                        </h1>
                    </div>

                    {/* HORIZONTAL TABS (Bottom Border Active State) */}
                    <div className="flex w-full border-b border-zinc-300  bg-zinc-50 sticky top-12 z-30 px-1 pt-2 shrink-0 gap-4">
                        {TABS.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={cn(
                                    "pb-1 text-[10px] font-mono uppercase tracking-[0.2em] px-1 transition-all cursor-pointer outline-none relative",
                                    activeTab === tab
                                        ? "text-zinc-900 font-black border-b-2 border-orange-500"
                                        : "text-zinc-500 font-bold border-b-2 border-transparent hover:text-zinc-700"
                                )}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* SCROLLABLE CONFIG CONTENT (Flush Borders) */}
                    <div className="flex-1 overflow-y-auto scrollbar-hide pb-24 bg-white flex flex-col divide-y divide-zinc-200">

                        {/* --- TAB: PROFILE --- */}
                        {activeTab === 'PROFILE' && (
                            <div className="animate-in fade-in duration-300">
                                <div className="grid grid-cols-1 md:grid-cols-2 divide-x divide-zinc-300">

                                    {/* Display Name (Col 1) */}
                                    <div className="bg-white p-2 space-y-1 border-b border-zinc-300">
                                        <label className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest block leading-none">Display Name</label>
                                        <div className="relative flex items-center h-6">
                                            <User className="w-3 h-3 text-zinc-500 mr-2" />
                                            <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="John Doe" className="w-full text-[11px] font-bold outline-none bg-transparent" />
                                        </div>
                                    </div>

                                    {/* Professional Role (Col 2) */}
                                    <div className="bg-white p-2 space-y-1 border-b border-zinc-300">
                                        <label className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest block leading-none">Primary Role</label>
                                        <div className="relative flex items-center h-6">
                                            <BriefcaseBusiness className="w-3 h-3 text-zinc-500 mr-2" />
                                            <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Full-Stack developer" className="w-full text-[11px] font-bold uppercase outline-none bg-transparent" />
                                        </div>
                                    </div>

                                    {/* System Handle (Spans both columns) */}
                                    <div className="bg-white p-2 space-y-1 border-b border-r border-zinc-300">
                                        <label className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest block leading-none">Username</label>
                                        <div className="relative flex items-center h-6">
                                            <DollarSign className="w-3 h-3 text-zinc-500 mr-2" />
                                            <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="@johnDoe" className="w-full text-[11px] font-bold outline-none bg-transparent" />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}

                        {/* --- TAB: APPEARANCE --- */}
                        {activeTab === 'APPEARANCE' && (
                            <div className="animate-in fade-in duration-300">
                                <div className="grid grid-cols-1 md:grid-cols-2 divide-x divide-zinc-300">

                                    {/* Theme Color Matrix (Col 1) */}
                                    <div className="bg-white p-2 space-y-2 border-b border-zinc-300 md:border-b-0">
                                        <label className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest block leading-none">
                                            System Color Matrix
                                        </label>
                                        <div className="flex flex-wrap items-center gap-2 pt-1">
                                            {THEME_COLORS.map(color => (
                                                <button
                                                    key={color}
                                                    onClick={() => setActiveColor(color)}
                                                    className={cn(
                                                        "w-6 h-6 transition-all cursor-pointer outline-none flex items-center justify-center border",
                                                        color,
                                                        activeColor === color
                                                            ? "border-transparent scale-110"
                                                            : "border-black/20 hover:scale-105"
                                                    )}
                                                >
                                                    {activeColor === color && <Check size={14} className="text-white" />}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Typography Scale (Col 2) */}
                                    <div className="bg-white p-2 space-y-2">
                                        <label className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest block leading-none">
                                            Typography Scale
                                        </label>
                                        <div className="flex border border-zinc-300 shadow-sm w-fit mt-1">
                                            {(['sm', 'md', 'lg'] as const).map(size => (
                                                <button
                                                    key={size}
                                                    onClick={() => setActiveFont(size)}
                                                    className={cn(
                                                        "w-10 h-8 flex items-center justify-center border-r border-zinc-300 last:border-r-0 transition-colors font-mono",
                                                        activeFont === size ? "bg-zinc-900 text-white" : "bg-zinc-50 text-zinc-500 hover:bg-zinc-100",
                                                        size === 'sm' ? "text-[10px]" : size === 'md' ? "text-[13px]" : "text-[16px]"
                                                    )}
                                                >
                                                    Aa
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Interface Theme (Spans both columns) */}
                                    <div className="bg-white p-2 space-y-3 border-t border-r border-zinc-300 md:col-span-2">
                                        <label className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest block leading-none">
                                            Interface Theme
                                        </label>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            <ThemeCard title="Light Mode" active={activeTheme === 'light'} onClick={() => setActiveTheme('light')} type="light" />
                                            <ThemeCard title="Dark Mode" active={activeTheme === 'dark'} onClick={() => setActiveTheme('dark')} type="dark" />
                                            <ThemeCard title="System Mode" active={activeTheme === 'system'} onClick={() => setActiveTheme('system')} type="system" />
                                        </div>
                                    </div>

                                    {/* Language Protocol (Col 1) */}
                                    <div className="bg-white p-2 space-y-2 border-t border-r border-b border-zinc-300 md:col-span-2 lg:col-span-1">
                                        <label className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest block leading-none">
                                            Language_Protocol
                                        </label>
                                        <div className="pt-1">
                                            <Select defaultValue="en">
                                                <SelectTrigger className="w-full max-w-[200px] rounded-none border-zinc-300 bg-zinc-50 focus:ring-1 focus:ring-orange-500 font-mono text-[11px] font-bold uppercase tracking-widest shadow-none h-8">
                                                    <SelectValue placeholder="Select Language" />
                                                </SelectTrigger>
                                                <SelectContent position="popper" className="rounded-none border-zinc-300 uppercase tracking-widest">
                                                    <SelectItem value="en" className="text-xs cursor-pointer">English (US)</SelectItem>
                                                    <SelectItem value="de" className="text-xs cursor-pointer">German (DE)</SelectItem>
                                                    <SelectItem value="jp" className="text-xs cursor-pointer">Japanese (JP)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}

                        {/* --- TAB: NOTIFICATIONS --- */}
                        {activeTab === 'NOTIFICATIONS' && (
                            <div className="animate-in fade-in duration-300">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-zinc-300 border-b border-zinc-300">

                                    {/* Security Alerts (Col 1) */}
                                    <div className="bg-white  flex flex-col">
                                        <div className="flex flex-col p-2">
                                            <label className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest block leading-none">
                                                Security_Alerts
                                            </label>
                                        </div>
                                        <div className="">
                                            <HardwareToggle defaultActive={true} />
                                        </div>
                                    </div>

                                    {/* System Mentions (Col 2) */}
                                    <div className="bg-white  flex flex-col">
                                        <div className="flex flex-col p-2">
                                            <label className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest block leading-none">
                                                System_Mentions
                                            </label>
                                        </div>
                                        <div className="">
                                            <HardwareToggle defaultActive={true} />
                                        </div>
                                    </div>

                                    {/* Network Activity (Col 1) */}
                                    <div className="bg-white flex flex-col ">
                                        <div className="flex flex-col p-2 ">
                                            <label className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest block leading-none">
                                                Network_Activity
                                            </label>
                                        </div>
                                        <div className="">
                                            <HardwareToggle defaultActive={false} />
                                        </div>
                                    </div>

                                    {/* Marketing Protocol (Col 2) */}
                                    <div className="bg-white flex flex-col ">
                                        <div className="flex flex-col p-2">
                                            <label className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest block leading-none">
                                                Marketing_Protocol
                                            </label>
                                        </div>
                                        <div className="w-full">
                                            <HardwareToggle defaultActive={false} />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}

                        {/* --- TAB: ACCOUNT --- */}
                        {activeTab === 'ACCOUNT' && (
                            <div className="animate-in fade-in duration-300">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-zinc-300 border-b border-zinc-300">

                                    <div className="bg-white p-2 space-y-1  col-span-2">
                                        <label className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest block leading-none">Authentication Email</label>
                                        <div className="relative flex items-center h-6">
                                            <User className="w-3 h-3 text-zinc-500 mr-2" />
                                            <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="admin@noda.network" className="w-full text-[11px] font-bold outline-none bg-transparent" />
                                        </div>
                                    </div>

                                    <div className="bg-white p-2 space-y-1">
                                        <label className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest block leading-none">Current Passkey</label>
                                        <div className="relative flex items-center h-6">
                                            <User className="w-3 h-3 text-zinc-500 mr-2" />
                                            <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} type='password' placeholder="••••••••" className="w-full text-[11px] font-bold outline-none bg-transparent" />
                                        </div>
                                    </div>

                                    <div className="bg-white p-2 space-y-1 ">
                                        <label className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest block leading-none">New Passkey</label>
                                        <div className="relative flex items-center h-6">
                                            <User className="w-3 h-3 text-zinc-500 mr-2" />
                                            <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} type='password' placeholder="••••••••" className="w-full text-[11px] font-bold outline-none bg-transparent" />
                                        </div>
                                    </div>
                                    

                                    {/* 2FA Toggle (Col 2) */}
                                    <div className="bg-white p-2 flex flex-col gap-2 col-span-2">
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest block leading-none">
                                                Two-Factor_Auth
                                            </label>
                                        </div>
                                        <div className="mt-auto pt-1">
                                            <HardwareToggle defaultActive={true} />
                                        </div>
                                    </div>

                                   

                                    {/* Danger Zone (Spans Both Columns) */}
                                    <div className="bg-red-50/50 p-2 flex flex-col md:flex-row md:items-center justify-between gap-2 md:col-span-2">
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[10px] font-mono font-black uppercase text-red-600 tracking-widest leading-none">
                                                Terminate_Node
                                            </label>
                                        </div>
                                        <Button variant="destructive" className="w-full md:w-auto rounded-none font-mono text-[10px] font-black uppercase tracking-widest shadow-none bg-red-600 hover:bg-red-700 h-10 px-8 transition-colors">
                                            <Trash2 size={14} className="mr-2" /> Execute_Deletion
                                        </Button>
                                    </div>

                                </div>
                            </div>
                        )}

                    </div>

                    {/* STICKY FOOTER ACTION */}
                    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-zinc-300  z-30 flex justify-end">
                        <Button className="w-full md:w-full h-12 rounded-none bg-zinc-800 text-white hover:bg-orange-500 transition-colors font-mono text-[10px] font-black uppercase tracking-[0.2em] shadow-none">
                            <Save size={14} className="mr-2" /> Save Changes
                        </Button>
                    </div>

                </main>
            </div>
        </div>
    );
};

// --- SUB-COMPONENTS ---

// Clean row layout separating description from the control/input
const SettingRow = ({ title, desc, children }: { title: string, desc: string, children: React.ReactNode }) => (
    <div className="flex flex-col lg:flex-row lg:items-start justify-between p-6 gap-6 hover:bg-zinc-50/50 transition-colors">
        <div className="flex flex-col gap-1.5 flex-1 max-w-md">
            <h3 className="text-sm font-black uppercase text-zinc-900 tracking-tight leading-none">{title}</h3>
            <p className="text-xs font-medium text-zinc-500 leading-relaxed">
                {desc}
            </p>
        </div>
        <div className="shrink-0 w-full lg:w-auto lg:min-w-[300px]">
            {children}
        </div>
    </div>
);

// Crisp, brutalist ON/OFF toggle using Shadcn-like structure
const HardwareToggle = ({ defaultActive }: { defaultActive: boolean }) => {
    const [isOn, setIsOn] = useState(defaultActive);

    return (
        <div className="flex items-center shadow-sm w-full">
            <button
                onClick={() => setIsOn(true)}
                className={cn(
                    "py-2 text-[10px] w-1/2 font-mono font-black uppercase tracking-widest border-t border-r cursor-pointer border-zinc-300 border-r-0 transition-colors focus:outline-none",
                    isOn ? "bg-orange-500 text-white " : "bg-zinc-50 text-zinc-400 hover:bg-zinc-200 "
                )}
            >
                ON
            </button>
            <button
                onClick={() => setIsOn(false)}
                className={cn(
                    "py-2 text-[10px] w-1/2 font-mono font-black uppercase tracking-widest border-t cursor-pointer border-zinc-300 transition-colors focus:outline-none",
                    !isOn ? "bg-zinc-800 text-white" : "bg-zinc-50 text-zinc-400 hover:bg-zinc-200"
                )}
            >
                OFF
            </button>
        </div>
    );
};

// Custom Theme Card modeled after the reference image
const ThemeCard = ({ title, active, onClick, type }: { title: string, active: boolean, onClick: () => void, type: 'light' | 'dark' | 'system' }) => (
    <div className="flex flex-col gap-3 group cursor-pointer" onClick={onClick}>
        <div className={cn(
            "w-full aspect-[4/2] border-2 transition-all duration-200 relative overflow-hidden bg-zinc-200",
            active ? "border-orange-500" : "border-zinc-300 group-hover:border-zinc-400"
        )}>
            {/* Active Checkmark Badge */}
            {active && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-orange-500 text-white flex items-center justify-center z-20 shadow-sm">
                    <Check size={12} strokeWidth={3} />
                </div>
            )}

            {/* Mock UI Rendering inside the card */}
            <div className={cn("absolute inset-0 flex flex-col p-2", type === 'light' ? 'bg-zinc-100' : type === 'dark' ? 'bg-zinc-900' : 'bg-gradient-to-r from-zinc-100 50% to-zinc-900 50%')}>

                {/* Header Mock */}
                <div className="w-full h-3 flex items-center gap-1 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400/80" />
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
                </div>

                <div className="flex gap-2 flex-1">
                    {/* Sidebar Mock */}
                    <div className="w-1/4 h-full border-r border-zinc-500/20 flex flex-col gap-1.5 pr-2">
                        <div className="w-full h-1.5 bg-zinc-500/30" />
                        <div className="w-full h-1.5 bg-zinc-500/30" />
                        <div className="w-3/4 h-1.5 bg-zinc-500/30" />
                    </div>
                    {/* Content Mock */}
                    <div className="flex-1 flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                            <div className="w-1/2 h-2 bg-zinc-500/40" />
                            <div className="w-6 h-2 bg-orange-500" />
                        </div>
                        <div className="w-full flex-1 bg-zinc-500/10 border border-zinc-500/20" />
                    </div>
                </div>
            </div>
        </div>
        <span className={cn("text-[11px] font-mono font-black uppercase tracking-widest", active ? "text-zinc-900" : "text-zinc-500")}>{title}</span>
    </div>
);

export default SettingsPage;