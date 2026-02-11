import { useState } from 'react';
import { User, Lock, ShieldCheck, Eye, AlertTriangle, AtSign, Trash2 } from 'lucide-react';
import Navbar from '../AppNavbar';
import AppSideBar from '../Sidebar';
import SidebarRail from './SidebarRail';
import { SettingField, ToggleRow } from './SettingsFormElements';
import type { SettingsTabId, TabConfig } from '@/types/settings';

const TABS: TabConfig[] = [
    { id: 'Account', label: 'Account_Node', icon: <User size={16}/> },
    { id: 'Privacy', label: 'Privacy_Protocol', icon: <Lock size={16}/> },
    { id: 'Security', label: 'Security_Layer', icon: <ShieldCheck size={16}/> },
    { id: 'Interface', label: 'Interface_Logic', icon: <Eye size={16}/> },
    { id: 'Danger', label: 'Termination_Zone', icon: <AlertTriangle size={16}/> }
];

const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState<SettingsTabId>('Account');

    return (
        <div className="h-screen bg-white text-zinc-900 font-sans flex flex-col relative overflow-hidden">
            <Navbar />
            
            <div className="max-w-4xl mx-auto px-6 flex flex-1 w-full gap-4 overflow-hidden">
                <aside className="w-24 shrink-0 relative">
                    <div className="sticky top-13 h-fit py-4"><AppSideBar /></div>
                </aside>

                <main className="flex flex-1 border-x border-zinc-300 bg-white h-full flex pt-12 relative overflow-hidden">
                    <SidebarRail tabs={TABS} activeTab={activeTab} setActiveTab={setActiveTab} />

                    <div className="flex-1 flex flex-col relative bg-white overflow-y-auto scrollbar-hide">
                        <div className="p-6 space-y-6 pb-32">
                            <div className="space-y-1">
                                <h2 className="text-2xl font-black uppercase tracking-tighter">{activeTab}_Configuration</h2>
                                <p className="text-[11px] font-mono font-black text-zinc-500 uppercase tracking-widest">
                                    NODE_ID://SYSTEM/STG/{activeTab.toUpperCase()}
                                </p>
                            </div>

                            <div className="space-y-10">
                                {activeTab === 'Account' && (
                                    <div className="space-y-6 animate-in fade-in duration-300">
                                        <div className="space-y-2">
                                            <h3 className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-1">
                                                <AtSign size={12} /> Identity_Parameters
                                            </h3>
                                            <div className="grid gap-3">
                                                <SettingField label="Username" defaultValue="@johndoe_node" />
                                                <SettingField label="System_Email" defaultValue="john@noda.network" />
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-[0.2em]">Public_Bio</label>
                                            <textarea className="w-full h-24 px-4 py-3 border border-zinc-200 bg-white font-mono text-[11px] font-bold outline-none focus:border-zinc-900 transition-all resize-none" defaultValue="Lead systems architect..." />
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'Privacy' && (
                                    <div className="divide-y divide-zinc-300 border border-zinc-300 animate-in fade-in duration-300">
                                        <ToggleRow title="Signal_Broadcasting" desc="Allow public search engines to index activity." active />
                                        <ToggleRow title="Intelligence_Scan" desc="Enable verified recruiters to view metrics." active />
                                    </div>
                                )}

                                {activeTab === 'Danger' && (
                                    <div className="space-y-3 animate-in slide-in-from-bottom-2 duration-300">
                                        <div className="p-4 border border-red-200 bg-red-50/30 space-y-2">
                                            <div className="flex items-center gap-3 text-red-600">
                                                <AlertTriangle size={18} />
                                                <h3 className="text-[11px] font-black uppercase">Critical_Warning</h3>
                                            </div>
                                            <p className="text-[11px] text-zinc-600 font-bold uppercase leading-relaxed tracking-tight">
                                                Terminating your account node is permanent.
                                            </p>
                                        </div>
                                        <button className="w-full py-3 bg-red-600 text-white flex items-center justify-center gap-3 hover:bg-red-700 transition-all border-none cursor-pointer">
                                            <Trash2 size={16} />
                                            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Terminate_Node</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-auto sticky bottom-0 bg-white border-t border-zinc-300 p-3 flex items-center justify-end z-20 w-full shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
                            <button className="bg-zinc-900 text-white w-full h-10 px-10 flex items-center justify-center gap-3 hover:bg-black transition-all active:scale-95 border-none cursor-pointer">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Apply_Configuration</span>
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default SettingsPage;