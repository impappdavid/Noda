import React from 'react';
import {
     Users, Eye, MessageSquare,
    Heart, BarChart3, Target, RefreshCcw, Hash, Briefcase, Link2,
    ChartLine
} from 'lucide-react';
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import Navbar from '../../AppNavbar';
import AppSideBar from '../../Sidebar';
import { cn } from "@/lib/utils";

const chartData = [
    { date: "15 Feb", views: 400, likes: 240, followers: 100 },
    { date: "16 Feb", views: 700, likes: 380, followers: 150 },
    { date: "17 Feb", views: 500, likes: 300, followers: 120 },
    { date: "18 Feb", views: 900, likes: 520, followers: 210 },
    { date: "19 Feb", views: 800, likes: 490, followers: 190 },
    { date: "20 Feb", views: 1200, likes: 740, followers: 320 },
    { date: "21 Feb", views: 1100, likes: 680, followers: 280 },
];

const CompanyDashboard: React.FC = () => {
    return (
        <div className="h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
            <Navbar />

            <div className="flex flex-1 w-full max-w-4xl mx-auto px-6 overflow-hidden">
                <aside className="w-25 shrink-0 border-r border-zinc-100 py-4">
                    <AppSideBar />
                </aside>

                <main className="flex flex-1 border-x border-zinc-300 ml-4 bg-white overflow-y-auto scrollbar-hide flex-col pt-12.5 ">

                    {/* HEADER */}
                    <div className="pl-2 h-10 flex w-full items-center border-b border-zinc-300 bg-zinc-800 bg-zinc-50/50">
                        <div className="flex w-full justify-between items-center ">
                            <div >
                                <h1 className="text-xs font-semibold uppercase tracking-widest text-zinc-200 flex items-center gap-1">
                                    <ChartLine size={16} className="text-zinc-200" /> Dashboard
                                </h1>
                            </div>
                            <button className="h-9 px-3 bg-zinc-800 border-l border-zinc-700 text-white text-[10px] font-semibold uppercase flex items-center gap-2 cursor-pointer hover:bg-zinc-900 transition-colors">
                                <RefreshCcw size={14} /> Refresh
                            </button>
                        </div>
                    </div>

                    {/* SQUARED STATS */}
                    <div className="grid grid-cols-4 divide-x divide-zinc-200 border-b border-zinc-300 bg-white">
                        <StatModule label="Avg_Applies" value="442" trend="+12.4%" icon={<Users size={12} />} />
                        <StatModule label="Post_Views" value="12.8k" trend="+5.2%" icon={<Eye size={12} />} />
                        <StatModule label="Post_Likes" value="1.2k" trend="+8.1%" icon={<Heart size={12} />} />
                        <StatModule label="AVG_Response" value="24h" trend="-2.4%" icon={<MessageSquare size={12} />} isNegative />
                    </div>

                    {/* AREA CHART WITH COMPONENT BACKGROUNDS */}
                    <div className="p-2 border-b border-zinc-300 bg-zinc-50/10">
                        <div className="mb-6 flex items-center justify-between">
                            <SectionHeader icon={<Target size={12} />} title="Resonance_Uplink" />
                            <div className="flex gap-4">
                                <ChartLegend color="stroke-zinc-900" label="Views" />
                                <ChartLegend color="stroke-orange-500" label="Likes" />
                                <ChartLegend color="stroke-emerald-500" label="Followers" />
                            </div>
                        </div>
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                                    <defs>
                                        {/* Views Background (Zinc) */}
                                        <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#18181b" stopOpacity={0.2} />
                                            <stop offset="95%" stopColor="#18181b" stopOpacity={0} />
                                        </linearGradient>
                                        {/* Likes Background (Orange) */}
                                        <linearGradient id="colorLikes" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#f97316" stopOpacity={0.2} />
                                            <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                                        </linearGradient>
                                        {/* Followers Background (Emerald) */}
                                        <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                                    <XAxis
                                        dataKey="date"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 9, fontFamily: 'monospace', fill: '#a1a1aa' }}
                                        dy={10}
                                    />
                                    <YAxis hide />
                                    <Tooltip
                                        labelStyle={{ display: 'none' }}
                                        contentStyle={{ borderRadius: '0px', border: '1px solid #D1D5DB', fontSize: '10px', fontFamily: 'monospace' }}
                                        cursor={false}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="views"
                                        stroke="#18181b"
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorViews)"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="likes"
                                        stroke="#f97316"
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorLikes)"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="followers"
                                        stroke="#10b981"
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorFollowers)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="p-4 space-y-8">
                        {/* TABLES */}
                        <section className="space-y-3">
                            <SectionHeader icon={<Briefcase size={12} />} title="Job_Active_Listings" />
                            <div className="border border-zinc-300 overflow-hidden">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-zinc-100 border-b border-zinc-300">
                                        <tr className="divide-x divide-zinc-200">
                                            <th className="p-2 text-[8px] font-mono font-black uppercase">Role_Identifier</th>
                                            <th className="p-2 text-[8px] font-mono font-black uppercase text-center w-24">Applicants</th>
                                            <th className="p-2 text-[8px] font-mono font-black uppercase text-right w-24">Compensation</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-zinc-300">
                                        <RegistryRow title="Systems Architect" col2="42" col3="$220k+" />
                                        <RegistryRow title="Security Researcher" col2="18" col3="$190k+" />
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <section className="space-y-3 pb-12">
                            <SectionHeader icon={<BarChart3 size={12} />} title="Transmission_Signal_Log" />
                            <div className="border border-zinc-300 overflow-hidden">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-zinc-100 border-b border-zinc-300">
                                        <tr className="divide-x divide-zinc-200">
                                            <th className="p-2 text-[8px] font-mono font-black uppercase">Post_Identifier</th>
                                            <th className="p-2 text-[8px] font-mono font-black uppercase text-center w-24">Reach</th>
                                            <th className="p-2 text-[8px] font-mono font-black uppercase text-right w-24">Likes</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-zinc-200">
                                        <RegistryRow title="O1 Model Node Release" col2="12.4k" col3="892" isPost />
                                        <RegistryRow title="Recursive Cluster Beta" col2="5.1k" col3="341" isPost />
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </div>


                </main>
            </div>
        </div>
    );
};

// --- SUB-COMPONENTS ---

const StatModule = ({ label, value, trend, isNegative }: any) => (
    <div className="p-2 py-3 bg-white hover:bg-zinc-50 transition-colors group">
        <div className="flex justify-between items-start">
            <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tighter leading-none">{value}</span>
                <span className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest mt-1">{label}</span>
            </div>
            <span className={cn(
                "text-[10px] font-mono font-black px-1.5 py-0.5 border",
                isNegative ? "border-red-200 text-red-600 bg-red-50" : "border-emerald-200 text-emerald-600 bg-emerald-50"
            )}>
                {trend}
            </span>
        </div>

    </div>
);

const SectionHeader = ({ icon, title }: any) => (
    <h4 className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-2">
        {icon} {title}
    </h4>
);

const ChartLegend = ({ color, label }: { color: string, label: string }) => (
    <div className="flex items-center gap-1.5">
        <div className={cn("w-2 h-0.5 border-t-2", color)} />
        <span className="text-[8px] font-mono font-black uppercase text-zinc-500">{label}</span>
    </div>
);

const RegistryRow = ({ title, col2, col3, isPost }: any) => (
    <tr className="hover:bg-zinc-50 transition-colors cursor-pointer group divide-x divide-zinc-100">
        <td className="p-2 pl-3">
            <span className="text-[10px] font-bold uppercase tracking-tight group-hover:text-orange-600 transition-colors flex items-center gap-2">
                {isPost ? <Link2 size={12} className="text-zinc-500" /> : <Hash size={12} className="text-zinc-500" />}
                {title}
            </span>
        </td>
        <td className="p-2 text-center text-[10px] font-mono font-bold text-zinc-500">{col2}</td>
        <td className="p-2 text-right pr-3 font-black text-zinc-900 text-[10px] uppercase">{col3}</td>
    </tr>
);

export default CompanyDashboard;