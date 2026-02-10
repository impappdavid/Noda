import { 
    Activity, Users, Eye, MessageSquare, 
    Heart, BarChart3, 
    Zap, ArrowUpRight,  Target
} from 'lucide-react';
import { cn } from "@/lib/utils";
import Navbar from '../../AppNavbar';
import AppSideBar from '../../Sidebar';

const CompanyDashboard = () => {
    return (
        <div className="h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
            <Navbar />
            <div className="flex flex-1 w-full max-w-4xl mx-auto px-6 overflow-hidden">
                <aside className="w-24 shrink-0 border-r border-zinc-100">
                    <AppSideBar />
                </aside>

                <main className="flex flex-1 border-x border-zinc-300 ml-4 bg-white overflow-y-auto scrollbar-hide flex-col pt-13">
                    
                    {/* 1. DASHBOARD HEADER */}
                    <div className="p-4 border-b border-zinc-300 bg-zinc-50/50">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h1 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3">
                                    <Activity className="text-orange-600" size={24} /> 
                                    Intelligence_Dashboard
                                </h1>
                                <p className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest mt-1">
                                    Real-time signal resonance monitoring // OpenAI_Node
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <button className="h-9 px-4 border border-zinc-300 text-[9px] font-mono font-black uppercase hover:bg-zinc-50 transition-colors cursor-pointer">Export_Logs</button>
                                <button className="h-9 px-4 bg-zinc-800 text-white text-[9px] font-mono font-black uppercase hover:bg-zinc-900 transition-colors cursor-pointer">Refresh_Stream</button>
                            </div>
                        </div>

                        {/* 2. HIGH-LEVEL BROADCAST STATS (4-COLUMN GRID) */}
                        <div className="grid grid-cols-4 gap-px bg-zinc-300 border border-zinc-300">
                            <StatModule label="Avg_Applies" value="442" trend="+12.4%" icon={<Users size={12} />} />
                            <StatModule label="Avg_Post_Views" value="12.8k" trend="+5.2%" icon={<Eye size={12} />} />
                            <StatModule label="Signal_Likes" value="1.2k" trend="+8.1%" icon={<Heart size={12} />} />
                            <StatModule label="Comments" value="384" trend="-2.4%" icon={<MessageSquare size={12} />} isNegative />
                        </div>
                    </div>

                    {/* 3. DETAILED PERFORMANCE ANALYSIS */}
                    <div className="flex-1 p-4 space-y-4 bg-white">
                        
                        <div className="grid grid-cols-2 gap-4">
                            {/* Company Page Velocity */}
                            <section className="space-y-4">
                                <h4 className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                                    <Target size={14} className="text-orange-600" /> Page_Uplink_Velocity
                                </h4>
                                <div className="p-4 border border-zinc-300 bg-zinc-50/30 relative overflow-hidden group">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <span className="text-4xl font-bold tracking-tighter">8.4k</span>
                                            <p className="text-[9px] font-mono font-black text-zinc-500 uppercase mt-1">Total_Page_Views (30 days)</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-emerald-600 font-mono font-black text-xs">+24.5%</span>
                                            <div className="flex gap-1 mt-2">
                                                {[3, 5, 4, 7, 8, 6, 9].map((h, i) => (
                                                    <div key={i} className="w-1.5 bg-zinc-900" style={{ height: `${h * 2}px` }} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Node Integrity Monitor */}
                            <section className="space-y-4">
                                <h4 className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                                    <Zap size={14} className="text-orange-600" /> Signal_Resonance_Index
                                </h4>
                                <div className="p-4 border border-zinc-300 bg-white space-y-2">
                                    <MetricRow label="Profile_Consistency" value="98%" />
                                    <MetricRow label="Response_Speed" value="~24H" />
                                    <MetricRow label="Network_Trust" value="High" />
                                </div>
                            </section>
                        </div>

                        {/* 4. RECENT SIGNAL PERFORMANCE LOG */}
                        <section className="pt-4">
                            <h4 className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <BarChart3 size={14} className="text-orange-600" /> Recent_Broadcast_Performance
                            </h4>
                            <div className="border border-zinc-300 divide-y divide-zinc-300">
                                <PerformanceRow title="H100 Cluster Update" views="4.2k" likes="240" comments="42" />
                                <PerformanceRow title="Senior Systems Architect (Job)" views="12.1k" likes="58" comments="12" />
                                <PerformanceRow title="Research: O1 Interface" views="8.9k" likes="892" comments="156" />
                            </div>
                        </section>
                    </div>

                    {/* 5. SYSTEM STATUS FOOTER */}
                    <div className="p-3 bg-zinc-800 flex justify-between items-center shrink-0">
                        <span className="text-[9px] font-mono text-zinc-300 uppercase tracking-[0.2em]">Telemetry_Stream: ACTIVE</span>
                        <div className="flex items-center gap-4">
                            <span className="text-[9px] font-mono text-zinc-300 uppercase">Uptime: 100%</span>
                            <span className="text-[9px] font-mono text-orange-500  uppercase">Admin_Authorized</span>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

// --- SUB-COMPONENTS ---

const StatModule = ({ label, value, trend, icon, isNegative }: any) => (
    <div className="bg-white p-4 flex flex-col justify-center transition-colors hover:bg-zinc-100">
        <div className="flex items-center gap-2 mb-1 text-zinc-500">
            {icon}
            <span className="text-[9px] font-mono font-black uppercase tracking-widest">{label}</span>
        </div>
        <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold tracking-tighter">{value}</span>
            <span className={cn(
                "text-[10px] font-mono font-black",
                isNegative ? "text-red-600" : "text-emerald-600"
            )}>
                {trend}
            </span>
        </div>
    </div>
);

const MetricRow = ({ label, value }: any) => (
    <div className="flex justify-between items-center">
        <span className="text-[9px] font-mono font-black text-zinc-500 uppercase">{label}</span>
        <span className="text-[10px] font-bold uppercase text-zinc-900">{value}</span>
    </div>
);

const PerformanceRow = ({ title, views, likes, comments }: any) => (
    <div className="flex items-center justify-between p-3 hover:bg-zinc-50 transition-all cursor-pointer group">
        <span className="text-xs font-bold uppercase tracking-tight group-hover:text-orange-600 transition-colors">{title}</span>
        <div className="flex gap-6 items-center">
            <div className="flex flex-col items-end">
                <span className="text-[9px] font-mono font-black text-zinc-500 uppercase">Views</span>
                <span className="text-[11px] font-black">{views}</span>
            </div>
            <div className="flex flex-col items-end">
                <span className="text-[9px] font-mono font-black text-zinc-500 uppercase">Likes</span>
                <span className="text-[11px] font-black">{likes}</span>
            </div>
            <div className="flex flex-col items-end">
                <span className="text-[9px] font-mono font-black text-zinc-500 uppercase">Comm.</span>
                <span className="text-[11px] font-black">{comments}</span>
            </div>
            <ArrowUpRight size={16} className="text-white group-hover:text-zinc-900 transition-all" />
        </div>
    </div>
);

export default CompanyDashboard;