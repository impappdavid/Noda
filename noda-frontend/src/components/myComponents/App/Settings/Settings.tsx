import { useState } from 'react';
import { 
  User, Lock, ShieldCheck, Eye, 
  Save, LogOut, Trash2, AtSign, FileText,
  AlertTriangle, Palette
} from 'lucide-react';
import Navbar from '../AppNavbar';
import AppSideBar from '../Sidebar';
import { cn } from "@/lib/utils";

const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState('Account');

    const tabs = [
        { id: 'Account', label: 'Account_Node', icon: <User size={16}/> },
        { id: 'Privacy', label: 'Privacy_Protocol', icon: <Lock size={16}/> },
        { id: 'Security', label: 'Security_Layer', icon: <ShieldCheck size={16}/> },
        { id: 'Interface', label: 'Interface_Logic', icon: <Eye size={16}/> },
        { id: 'Danger', label: 'Termination_Zone', icon: <AlertTriangle size={16}/> }
    ];

    return (
        <div className="h-screen bg-white text-zinc-900 font-sans flex flex-col relative">
            <Navbar />
            
            <div className="max-w-4xl mx-auto px-6 flex flex-1 w-full gap-4">
                <aside className="w-24 shrink-0 relative">
                    <div className="sticky top-13 h-fit py-4">
                        <AppSideBar />
                    </div>
                </aside>

                <main className="flex flex-1 border-x border-zinc-300 bg-white min-h-screen flex pt-12  relative overflow-visible">
                    
                    {/* ENLARGED CATEGORY RAIL */}
                    <div className="w-48 flex flex-col border-r border-zinc-300 bg-zinc-50/30 sticky top-12 h-[calc(100vh-52px)]">
                        <div className="p-3 border-b border-zinc-300">
                            <span className="text-[9px] font-mono font-black uppercase tracking-[0.2em] text-zinc-500">Settings_Index</span>
                        </div>
                        <div className="flex-1 flex flex-col overflow-y-auto scrollbar-hide">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-3 border-b border-zinc-300 transition-all text-left",
                                        activeTab === tab.id 
                                            ? "bg-white text-zinc-900 border-r-transparent shadow-[inset_-4px_0_0_0_#18181b]" 
                                            : "text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100/50"
                                    )}
                                >
                                    {tab.icon}
                                    <span className="text-[11px] font-mono font-black uppercase tracking-tighter leading-none">{tab.label}</span>
                                </button>
                            ))}
                        </div>
                        <button className="flex items-center gap-3 px-4 py-5 text-zinc-500 hover:text-red-600 transition-colors border-t border-zinc-300 mt-auto">
                            <LogOut size={16} />
                            <span className="text-[10px] font-mono font-black uppercase tracking-tighter">Exit_Session</span>
                        </button>
                    </div>

                    {/* CONFIGURATION PANEL */}
                    <div className="flex-1 flex flex-col relative bg-white">
                        <div className="p-6 space-y-6 pb-32">
                            
                            <div className="space-y-1">
                                <h2 className="text-2xl font-black uppercase tracking-tighter">
                                    {activeTab}_Configuration
                                </h2>
                                <p className="text-[11px] font-mono font-black text-zinc-500 uppercase tracking-widest">
                                    NODE_ID://SYSTEM/STG/{activeTab.toUpperCase()}
                                </p>
                            </div>

                            <div className="space-y-10">
                                {/* 01. ACCOUNT TAB */}
                                {activeTab === 'Account' && (
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <h3 className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-1">
                                                <AtSign size={12} /> Identity_Parameters
                                            </h3>
                                            <div className="grid gap-3">
                                                <SettingField label="Username" value="@johndoe_node" />
                                                <SettingField label="System_Email" value="john@noda.network" />
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-[0.2em]">Public_Bio</label>
                                            <textarea 
                                                className="w-full h-24 px-4 py-3 border border-zinc-200 bg-white font-mono text-[11px] font-bold outline-none focus:border-zinc-900 focus:bg-zinc-50/30 transition-all resize-none"
                                                defaultValue="Lead systems architect specializing in memory-safe distributed protocols."
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* 02. PRIVACY TAB */}
                                {activeTab === 'Privacy' && (
                                    <div className="divide-y divide-zinc-300 border border-zinc-300">
                                        <ToggleRow title="Signal_Broadcasting" desc="Allow public search engines to index your activity." active />
                                        <ToggleRow title="Intelligence_Scan" desc="Enable verified recruiters to view detailed metrics." active />
                                        <ToggleRow title="Stealth_Mode" desc="Mask your active status from connection network." />
                                    </div>
                                )}

                                {/* 03. SECURITY TAB */}
                                {activeTab === 'Security' && (
                                    <div className="space-y-6">
                                        <div className="space-y-3">
                                            <h3 className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-[0.2em]">Credential_Update</h3>
                                            <div className="grid gap-2">
                                                <SettingField label="Current_Password" type="password" />
                                                <SettingField label="New_Password" type="password" />
                                            </div>
                                            <button className="text-[9px] font-mono font-black uppercase text-zinc-900 border border-zinc-300 px-4 py-2 hover:bg-zinc-50">Update_Password</button>
                                        </div>
                                        <div className="pt-3 border-t border-zinc-100">
                                            <ToggleRow title="Multi_Factor_Auth (2FA)" desc="Require an encrypted token for every login." active={false} />
                                        </div>
                                    </div>
                                )}

                                {/* 04. INTERFACE TAB */}
                                {activeTab === 'Interface' && (
                                    <div className="space-y-3">
                                        <h3 className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-[0.2em]">Schematic_Theme_Engine</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <button className="p-6 border-2 border-zinc-900 bg-white text-left space-y-3">
                                                <div className="w-full h-12 bg-zinc-50 border border-zinc-100" />
                                                <span className="text-[10px] font-black uppercase">Noda_Light (Default)</span>
                                            </button>
                                            <button className="p-6 border border-zinc-200 bg-zinc-950 text-left space-y-3 group opacity-50 grayscale cursor-not-allowed">
                                                <div className="w-full h-12 bg-zinc-900 border border-zinc-800" />
                                                <span className="text-[10px] font-black uppercase text-white">Noda_Dark (Alpha)</span>
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* 05. DANGER TAB */}
                                {activeTab === 'Danger' && (
                                    <div className="space-y-3">
                                        <div className="p-4 border border-red-200 bg-red-50/30 space-y-2">
                                            <div className="flex items-center gap-3 text-red-600">
                                                <AlertTriangle size={18} />
                                                <h3 className="text-[11px] font-black uppercase">Critical_Warning</h3>
                                            </div>
                                            <p className="text-[11px] text-zinc-600 font-bold uppercase leading-relaxed tracking-tight">
                                                Terminating your account node is permanent. All intelligence signals and recruiter connections will be purged.
                                            </p>
                                        </div>
                                        <button className="w-full py-3 bg-red-600 text-white flex items-center justify-center gap-3 hover:bg-red-700 transition-all active:scale-[0.98]">
                                            <Trash2 size={16} />
                                            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Terminate_Node</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* PERSISTENT FOOTER ACTIONS */}
                        <div className="mt-auto sticky bottom-0 bg-white border-t border-zinc-300 p-3 flex items-center justify-end z-20 w-full">
                            <button className="bg-zinc-900 text-white w-full h-10 px-10 flex items-center justify-center gap-3 hover:bg-black transition-all active:scale-95 shadow-lg">
                                
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Apply_Configuration</span>
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

// --- COMPONENTS ---

const SettingField = ({ label, type = "text", value }: any) => (
    <div className="space-y-2 text-left">
        <label className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-[0.2em]">{label}</label>
        <input 
            type={type} 
            defaultValue={value}
            className="w-full px-4 py-3 border border-zinc-200 bg-white font-mono text-[11px] font-bold outline-none focus:border-zinc-900 focus:bg-zinc-50/30 transition-all"
        />
    </div>
);

const ToggleRow = ({ title, desc, active }: any) => (
    <div className="p-4 flex items-center justify-between border border-zinc-300 hover:bg-zinc-50/50 transition-colors cursor-pointer group">
        <div className="space-y-1 text-left">
            <h4 className="text-[11px] font-bold uppercase text-zinc-900">{title}</h4>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-tight max-w-sm">{desc}</p>
        </div>
        <div className={cn(
            "w-10 h-5 border-2 flex items-center px-0.5 transition-all duration-300",
            active ? "bg-zinc-900 border-zinc-900 justify-end" : "bg-zinc-100 border-zinc-300 justify-start"
        )}>
            <div className="w-3.5 h-3.5 bg-white shadow-sm" />
        </div>
    </div>
);

export default SettingsPage;