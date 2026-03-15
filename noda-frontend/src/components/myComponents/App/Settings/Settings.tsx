import React, { useState } from 'react';
import {
    User, Lock, ShieldCheck, Eye, AlertTriangle,
    AtSign, Trash2, Terminal, Database, Key, Activity, MonitorSmartphone, Download,
    Settings2, Save, Power,
    Globe
} from 'lucide-react';
import Navbar from '../AppNavbar';
import AppSideBar from '../Sidebar';
import { cn } from "@/lib/utils";

// --- SHADCN IMPORTS ---
// Ensure you have these components installed via: npx shadcn-ui@latest add input textarea button select
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
type SettingsTabId = 'ACCOUNT' | 'PRIVACY' | 'SECURITY' | 'INTERFACE' | 'DANGER';

interface TabConfig {
    id: SettingsTabId;
    label: string;
    icon: React.ReactNode;
}

const TABS: TabConfig[] = [
    { id: 'ACCOUNT', label: 'Identity_Node', icon: <User size={14} /> },
    { id: 'PRIVACY', label: 'Privacy_Rules', icon: <Lock size={14} /> },
    { id: 'SECURITY', label: 'Access_Layer', icon: <ShieldCheck size={14} /> },
    { id: 'INTERFACE', label: 'UI_Rendering', icon: <Eye size={14} /> },
    { id: 'DANGER', label: 'Termination', icon: <AlertTriangle size={14} /> }
];

// --- MAIN PAGE ---
const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState<SettingsTabId>('ACCOUNT');

    return (
        <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans flex flex-col relative overflow-hidden">
            <Navbar />

            <div className="max-w-4xl mx-auto px-6 flex flex-1 w-full gap-4 relative">

                {/* LEFT NAVIGATION */}
                <aside className="w-25 shrink-0 relative hidden sm:block">
                    <AppSideBar />
                </aside>

                <main className="flex flex-1 border-x border-zinc-300 bg-white min-h-screen shadow-sm flex-row pt-12 relative">

                    {/* CENTER: CONFIGURATION CONTENT */}
                    <div className="flex-1 flex flex-col relative border-r border-zinc-300">

                        {/* ULTRA-SIMPLIFIED HEADER */}
                        <div className="p-2 bg-zinc-800 sticky top-12 z-20 flex items-center gap-2 shrink-0">
                            <Settings2 size={14} className="text-zinc-200" />
                            <h1 className="text-xs font-bold uppercase tracking-widest text-zinc-200 leading-none mt-0.5">
                                {activeTab}
                            </h1>
                        </div>

                        {/* FLUSH CONFIG BLOCKS (No Padding, Grid Separated) */}
                        <div className="flex-1 flex flex-col gap-[1px] overflow-y-auto scrollbar-hide pb-24">

                            {/* --- TAB: ACCOUNT --- */}
                            {activeTab === 'ACCOUNT' && (
                                <div className="flex flex-col gap-[1px] animate-in fade-in duration-300">
                                    <ConfigHeader title="Identity_Parameters" icon={<AtSign size={12} />} />
                                    <SettingRow label="Username">
                                        <Input defaultValue="@johndoe_sys" className="rounded-none border-zinc-300 h-7 text-[10px] shadow-none" />
                                    </SettingRow>
                                    <SettingRow label="Email">
                                        <Input type="email" defaultValue="john.doe@noda.network" className="rounded-none h-7 border-zinc-300 text-[10px] shadow-none" />
                                    </SettingRow>

                                    <ConfigHeader title="Professional Infos" icon={<Database size={12} />} />
                                    <SettingRow label="Role">
                                        <Input defaultValue="Lead Systems Architect" className="rounded-none border-zinc-300 h-7 text-[10px] shadow-none" />
                                    </SettingRow>
                                    <SettingRow label="Organization">
                                        <Input defaultValue="Noda Labs" className="rounded-none border-zinc-300 h-7 text-[10px]  shadow-none" />
                                    </SettingRow>
                                    <SettingRow label="Public Bio">
                                        <Textarea
                                            defaultValue="Specializing in memory-safe distributed protocols. Scaling decentralized node clusters."
                                            className="rounded-none border-zinc-300 text-[10px] min-h-[80px] resize-none shadow-none"
                                        />
                                    </SettingRow>
                                </div>
                            )}

                            {/* --- TAB: PRIVACY --- */}
                            {activeTab === 'PRIVACY' && (
                                <div className="flex flex-col gap-[1px] animate-in fade-in duration-300">
                                    <ConfigHeader title="Network_Visibility" icon={<Globe size={12} />} />
                                    <HardwareToggle label="Signal_Broadcasting" desc="Allow public search engines to index your profile." defaultActive={true} />
                                    <HardwareToggle label="Active_Uplink_Status" desc="Display the pulsing green indicator when you are online." defaultActive={true} />
                                    <HardwareToggle label="Activity_Grid_Metrics" desc="Show your 48x7 commit graph to external viewers." defaultActive={false} />

                                    <ConfigHeader title="Telemetry_Data" icon={<Activity size={12} />} />
                                    <HardwareToggle label="Share_Crash_Logs" desc="Automatically transmit anonymous error logs to Noda Central." defaultActive={true} />
                                    <HardwareToggle label="Recruiter_Scan" desc="Allow verified talent nodes to parse your skills matrix." defaultActive={true} />
                                </div>
                            )}

                            {/* --- TAB: SECURITY --- */}
                            {activeTab === 'SECURITY' && (
                                <div className="flex flex-col gap-[1px] animate-in fade-in duration-300">
                                    <ConfigHeader title="Access_Credentials" icon={<Key size={12} />} />
                                    <SettingRow label="Current_Passkey">
                                        <Input type="password" placeholder="••••••••" className="rounded-none border-zinc-300 focus-visible:ring-1 focus-visible:ring-zinc-900 font-mono text-[11px] font-bold shadow-none" />
                                    </SettingRow>
                                    <SettingRow label="New_Passkey">
                                        <Input type="password" placeholder="••••••••" className="rounded-none border-zinc-300 focus-visible:ring-1 focus-visible:ring-zinc-900 font-mono text-[11px] font-bold shadow-none" />
                                    </SettingRow>
                                    <SettingRow label="Verify_Passkey">
                                        <Input type="password" placeholder="••••••••" className="rounded-none border-zinc-300 focus-visible:ring-1 focus-visible:ring-zinc-900 font-mono text-[11px] font-bold shadow-none" />
                                    </SettingRow>

                                    <ConfigHeader title="Multi-Factor_Auth" icon={<ShieldCheck size={12} />} />
                                    <HardwareToggle label="Hardware_Key" desc="Require a physical FIDO2 device (YubiKey) for all authentications." defaultActive={false} />
                                    <HardwareToggle label="App_TOTP" desc="Use time-based one-time passwords from a mobile device." defaultActive={true} />
                                </div>
                            )}

                            {/* --- TAB: INTERFACE --- */}
                            {activeTab === 'INTERFACE' && (
                                <div className="flex flex-col gap-[1px] animate-in fade-in duration-300">
                                    <ConfigHeader title="Render_Engine" icon={<MonitorSmartphone size={12} />} />
                                    <SettingRow label="Color_Matrix">
                                        <Select defaultValue="dark">
                                            <SelectTrigger className="w-full rounded-none border-zinc-300 focus:ring-1 focus:ring-zinc-900 font-mono text-[11px] font-bold uppercase tracking-widest shadow-none h-10">
                                                <SelectValue placeholder="Select Theme" />
                                            </SelectTrigger>
                                            <SelectContent className="rounded-none border-zinc-300 font-mono text-[11px] font-bold uppercase tracking-widest">
                                                <SelectItem value="system">System Default</SelectItem>
                                                <SelectItem value="light">Light Protocol</SelectItem>
                                                <SelectItem value="dark">Dark Terminal</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </SettingRow>
                                    <SettingRow label="Density">
                                        <Select defaultValue="compact">
                                            <SelectTrigger className="w-full rounded-none border-zinc-300 focus:ring-1 focus:ring-zinc-900 font-mono text-[11px] font-bold uppercase tracking-widest shadow-none h-10">
                                                <SelectValue placeholder="Select Density" />
                                            </SelectTrigger>
                                            <SelectContent className="rounded-none border-zinc-300 font-mono text-[11px] font-bold uppercase tracking-widest">
                                                <SelectItem value="comfortable">Comfortable</SelectItem>
                                                <SelectItem value="compact">Compact (Hardware)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </SettingRow>

                                    <ConfigHeader title="Accessibility" icon={<Eye size={12} />} />
                                    <HardwareToggle label="Force_Monospace" desc="Override all standard typography with system-level monospace." defaultActive={false} />
                                    <HardwareToggle label="Reduce_Motion" desc="Disable component scaling, fading, and status pulsing." defaultActive={true} />
                                </div>
                            )}

                            {/* --- TAB: DANGER --- */}
                            {activeTab === 'DANGER' && (
                                <div className="flex flex-col gap-[1px] animate-in fade-in duration-300">

                                    <ConfigHeader title="Data_Extraction" icon={<Download size={12} />} />
                                    <div className="flex flex-col md:flex-row bg-white">
                                        <div className="w-full md:w-[180px] p-4 bg-zinc-50 border-r border-zinc-200 shrink-0">
                                            <span className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest">Export_Log</span>
                                        </div>
                                        <div className="flex-1 p-4 flex flex-col gap-3">
                                            <p className="text-[11px] font-medium text-zinc-600 leading-relaxed">
                                                Compile and download a raw JSON payload of your entire node history, including posts, connections, and metadata.
                                            </p>
                                            <Button variant="outline" className="w-fit rounded-none border-zinc-300 font-mono text-[10px] font-black uppercase tracking-widest shadow-none hover:bg-zinc-100 hover:text-zinc-900">
                                                Extract_Payload
                                            </Button>
                                        </div>
                                    </div>

                                    <ConfigHeader title="Critical_Operations" icon={<AlertTriangle size={12} />} isDanger />
                                    <div className="flex flex-col md:flex-row bg-red-50/30">
                                        <div className="w-full md:w-[180px] p-4 bg-red-100/50 border-r border-red-200 shrink-0 flex items-center">
                                            <span className="text-[10px] font-mono font-black uppercase text-red-600 tracking-widest">Wipe_Node</span>
                                        </div>
                                        <div className="flex-1 p-4 flex flex-col gap-4">
                                            <p className="text-[11px] font-bold text-red-600 uppercase tracking-tight border-l-2 border-red-500 pl-3">
                                                Warning: Node termination is irreversible. All associated data will be purged.
                                            </p>
                                            <Button variant="destructive" className="w-fit rounded-none font-mono text-[10px] font-black uppercase tracking-widest shadow-none bg-red-600 hover:bg-red-700">
                                                <Trash2 size={14} className="mr-2" /> Terminate
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>

                        {/* STICKY FOOTER ACTION */}
                        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-zinc-300 p-4 z-30 shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
                            <Button className="w-full h-10 rounded-none bg-zinc-900 text-white hover:bg-orange-500 transition-colors font-mono text-[10px] font-black uppercase tracking-[0.2em] shadow-[3px_3px_0px_0px_rgba(24,24,27,0.2)] active:shadow-none active:translate-y-[3px] active:translate-x-[3px]">
                                <Save size={14} className="mr-2" /> Commit_Changes
                            </Button>
                        </div>

                    </div>

                    {/* RIGHT SIDEBAR (w-40 Tabs Module) */}
                    <aside className="w-39 shrink-0 bg-zinc-50 relative hidden md:block">
                        <div className="sticky top-12 flex flex-col h-[calc(100vh-3.5rem)]">

                            <div className="p-4 border-b border-zinc-300 bg-zinc-900 text-white flex items-center gap-2">
                                <Terminal size={12} className="text-zinc-400" />
                                <span className="text-[9px] font-mono font-black uppercase tracking-[0.3em] mt-0.5">Modules</span>
                            </div>

                            <div className="flex-1 flex flex-col divide-y divide-zinc-200 overflow-y-auto scrollbar-hide">
                                {TABS.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={cn(
                                            "flex items-center justify-between px-4 py-4 transition-colors cursor-pointer group border-none outline-none text-left",
                                            activeTab === tab.id
                                                ? "bg-white shadow-[inset_4px_0_0_0_#f97316]"
                                                : "bg-zinc-50 hover:bg-zinc-100"
                                        )}
                                    >
                                        <div className={cn(
                                            "flex items-center gap-3",
                                            activeTab === tab.id ? "text-zinc-900" : "text-zinc-500 group-hover:text-zinc-800"
                                        )}>
                                            {tab.icon}
                                            <span className="text-[9px] font-mono font-black uppercase tracking-widest">{tab.label}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <div className="p-4 border-t border-zinc-300 bg-white mt-auto">
                                <button className="w-full flex items-center justify-center gap-2 py-2 border border-zinc-300 text-zinc-500 hover:text-white hover:border-red-600 hover:bg-red-600 transition-colors">
                                    <Power size={12} />
                                    <span className="text-[9px] font-mono font-black uppercase tracking-widest">Logout</span>
                                </button>
                            </div>
                        </div>
                    </aside>

                </main>
            </div>
        </div>
    );
};

// --- SUB-COMPONENTS ---

const ConfigHeader = ({ title, icon, isDanger = false }: { title: string, icon: React.ReactNode, isDanger?: boolean }) => (
    <div className={cn(
        "flex items-center gap-2 p-2 border-b border-zinc-300",
        isDanger ? "bg-red-100 text-red-600" : "bg-zinc-100 text-zinc-500"
    )}>
        {icon}
        <h3 className="text-[10px] font-mono font-black uppercase tracking-[0.2em]">{title}</h3>
    </div>
);

// Table-style row for standard settings
const SettingRow = ({ label, children }: { label: string, children: React.ReactNode }) => (
    <div className="flex flex-col md:flex-row bg-white border-b border-zinc-300">
        <div className="w-full md:w-[180px] p-2 bg-zinc-50 border-r border-zinc-300 shrink-0 flex md:items-center">
            <span className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest">{label}</span>
        </div>
        <div className="flex-1 p-2">
            {children}
        </div>
    </div>
);

// Industrial Segmented Control Toggle (Flush Table Row)
const HardwareToggle = ({ label, desc, defaultActive }: { label: string, desc: string, defaultActive: boolean }) => {
    const [isOn, setIsOn] = useState(defaultActive);

    return (
        <div className="flex flex-col md:flex-row bg-white hover:bg-zinc-50/50 transition-colors group">
            <div className="w-full md:w-[180px] p-4 bg-zinc-50 group-hover:bg-zinc-100 transition-colors border-r border-zinc-200 shrink-0 flex flex-col justify-center">
                <span className="text-[10px] font-mono font-black uppercase text-zinc-900 tracking-widest leading-tight">{label}</span>
            </div>

            <div className="flex-1 p-4 flex items-center justify-between gap-6">
                <p className="text-[10px] font-medium text-zinc-500 leading-relaxed max-w-sm">{desc}</p>

                <div className="shrink-0 flex">
                    <button
                        onClick={() => setIsOn(true)}
                        className={cn(
                            "px-3 py-1.5 text-[9px] font-mono font-black uppercase tracking-widest border border-zinc-300 border-r-0 transition-colors focus:outline-none",
                            isOn ? "bg-zinc-900 text-white" : "bg-white text-zinc-400 hover:bg-zinc-100"
                        )}
                    >
                        On
                    </button>
                    <button
                        onClick={() => setIsOn(false)}
                        className={cn(
                            "px-3 py-1.5 text-[9px] font-mono font-black uppercase tracking-widest border border-zinc-300 transition-colors focus:outline-none",
                            !isOn ? "bg-zinc-200 text-zinc-900" : "bg-white text-zinc-400 hover:bg-zinc-100"
                        )}
                    >
                        Off
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;