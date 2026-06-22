import React, { useState } from 'react';
import {
  Users, Eye, MessageSquare,
  Heart, BarChart3, Target, RefreshCcw, Hash, Briefcase, Link2,
  ChartLine, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
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
  const [activeStream, setActiveStream] = useState<"all" | "views" | "likes">("all");

  return (
    <div className="w-full bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">

      <div className="flex flex-1 w-full max-w-4xl mx-auto  overflow-hidden">
        

        <main className="flex flex-1 border-x border-zinc-300  bg-white overflow-y-auto scrollbar-hide flex-col">

          {/* HEADER */}
          <div className="pl-3 h-10 flex w-full items-center border-b border-zinc-300 bg-zinc-50/60 backdrop-blur-sm select-none">
            <div className="flex w-full justify-between items-center">
              <div>
                <h1 className="text-[10px] font-mono font-black uppercase tracking-widest text-zinc-800 flex items-center gap-1.5">
                  <ChartLine size={13} className="text-zinc-900 animate-pulse" /> 
                  <span>Dashboard</span>
                </h1>
              </div>
              <button className="h-10 px-3.5 bg-zinc-900 hover:bg-zinc-800 text-white text-[9px] font-mono font-bold uppercase flex items-center gap-2 cursor-pointer transition-colors border-l border-zinc-800">
                <RefreshCcw size={11} /> 
                <span>Sync_Feed</span>
              </button>
            </div>
          </div>

          {/* REDESIGNED SQUARED STATS GRID */}
          <div className="grid grid-cols-4 divide-x divide-zinc-200 border-b border-zinc-300 bg-white">
            <StatModule label="Avg_Applies" value="442" trend="+12.4%" icon={<Users size={11} />} />
            <StatModule label="Post_Views" value="12.8k" trend="+5.2%" icon={<Eye size={11} />} />
            <StatModule label="Post_Likes" value="1.2k" trend="+8.1%" icon={<Heart size={11} />} />
            <StatModule label="Avg_Response" value="24h" trend="-2.4%" icon={<MessageSquare size={11} />} isNegative />
          </div>

          {/* REDESIGNED GRAPH METRIC SEGMENT */}
          <div className="p-3 border-b border-zinc-300 bg-gradient-to-b from-zinc-50/50 to-transparent">
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 select-none">
              <SectionHeader icon={<Target size={11} />} title="Resonance_Uplink_Telemetry" />
              
              <div className="flex items-center gap-3 border border-zinc-200/60 p-1 bg-white">
                <ChartLegend color="bg-zinc-950" label="Views" />
                <ChartLegend color="bg-blue-500" label="Likes" />
                <ChartLegend color="bg-emerald-500" label="Followers" />
              </div>
            </div>

            <div className="h-56 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#18181b" stopOpacity={0.05} />
                      <stop offset="95%" stopColor="#18181b" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorLikes" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.05} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.05} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#e4e4e7" />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 8, fontFamily: 'monospace', fill: '#71717a', fontWeight: 'bold' }}
                    dy={8}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 8, fontFamily: 'monospace', fill: '#a1a1aa' }}
                    dx={-5}
                  />
                  <Tooltip
                    labelStyle={{ display: 'none' }}
                    contentStyle={{ 
                      borderRadius: '0px', 
                      border: '1px solid #18181b', 
                      fontSize: '9px', 
                      fontFamily: 'monospace',
                      boxShadow: 'none',
                      backgroundColor: '#ffffff'
                    }}
                    cursor={{ stroke: '#18181b', strokeWidth: 1, strokeDasharray: '2 2' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="views"
                    stroke="#18181b"
                    strokeWidth={1.5}
                    fillOpacity={1}
                    fill="url(#colorViews)"
                    activeDot={{ r: 3, strokeWidth: 0, fill: '#18181b' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="likes"
                    stroke="#3b82f6"
                    strokeWidth={1.5}
                    fillOpacity={1}
                    fill="url(#colorLikes)"
                    activeDot={{ r: 3, strokeWidth: 0, fill: '#3b82f6' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="followers"
                    stroke="#10b981"
                    strokeWidth={1.5}
                    fillOpacity={1}
                    fill="url(#colorFollowers)"
                    activeDot={{ r: 3, strokeWidth: 0, fill: '#10b981' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* TABLES SECTIONS */}
          <div className="p-4 space-y-6 bg-white">
            <section className="space-y-2">
              <SectionHeader icon={<Briefcase size={11} />} title="Job_Active_Listings" />
              <div className="border border-zinc-200 bg-white overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-zinc-50 border-b border-zinc-200 select-none">
                    <tr className="divide-x divide-zinc-200">
                      <th className="p-2 text-[8px] font-mono font-black uppercase tracking-wider text-zinc-500">Role_Identifier</th>
                      <th className="p-2 text-[8px] font-mono font-black uppercase tracking-wider text-center w-28 text-zinc-500">Applicants</th>
                      <th className="p-2 text-[8px] font-mono font-black uppercase tracking-wider text-right w-28 text-zinc-500">Compensation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200">
                    <RegistryRow title="Systems Architect" col2="42" col3="$220k+" />
                    <RegistryRow title="Security Researcher" col2="18" col3="$190k+" />
                  </tbody>
                </table>
              </div>
            </section>

            <section className="space-y-2 pb-8">
              <SectionHeader icon={<BarChart3 size={11} />} title="Transmission_Signal_Log" />
              <div className="border border-zinc-200 bg-white overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-zinc-50 border-b border-zinc-200 select-none">
                    <tr className="divide-x divide-zinc-200">
                      <th className="p-2 text-[8px] font-mono font-black uppercase tracking-wider text-zinc-500">Post_Identifier</th>
                      <th className="p-2 text-[8px] font-mono font-black uppercase tracking-wider text-center w-28 text-zinc-500">Reach</th>
                      <th className="p-2 text-[8px] font-mono font-black uppercase tracking-wider text-right w-28 text-zinc-500">Likes</th>
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

// --- SUB-COMPONENTS REDESIGNED ---

const StatModule = ({ label, value, trend, icon, isNegative }: any) => (
  <div className="p-2.5 bg-white hover:bg-zinc-50/60 transition-all duration-150 group flex flex-col justify-between h-16 relative overflow-hidden select-none">
    {/* Clean Top Row Flag */}
    <div className="flex items-center justify-between text-zinc-400 group-hover:text-zinc-500 transition-colors">
      <span className="text-[8.5px] font-mono font-bold uppercase tracking-wider text-zinc-400">{label}</span>
      <div className="shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">{icon}</div>
    </div>

    {/* Metric + Indicator alignment */}
    <div className="flex items-baseline justify-between mt-auto">
      <span className="text-xl font-bold tracking-tight text-zinc-950 font-sans">{value}</span>
      <span className={cn(
        "text-[8px] font-mono font-bold px-1 py-0.2 flex items-center gap-0.5 border",
        isNegative 
          ? "border-red-200 text-red-600 bg-red-50/50" 
          : "border-emerald-200 text-emerald-600 bg-emerald-50/50"
      )}>
        {isNegative ? <ArrowDownRight size={9} /> : <ArrowUpRight size={9} />}
        <span>{trend}</span>
      </span>
    </div>
  </div>
);

const SectionHeader = ({ icon, title }: any) => (
  <h4 className="text-[9px] font-mono font-black text-zinc-400 uppercase tracking-[0.18em] flex items-center gap-1.5 select-none">
    <span className="text-zinc-600">{icon}</span>
    <span>{title}</span>
  </h4>
);

const ChartLegend = ({ color, label }: { color: string, label: string }) => (
  <div className="flex items-center gap-1.5 px-1">
    <div className={cn("w-1.5 h-1.5 rounded-full shrink-0", color)} />
    <span className="text-[8.5px] font-mono font-bold uppercase text-zinc-500">{label}</span>
  </div>
);

const RegistryRow = ({ title, col2, col3, isPost }: any) => (
  <tr className="hover:bg-zinc-50/50 transition-colors cursor-pointer group divide-x divide-zinc-100 border-b border-zinc-100 last:border-none">
    <td className="p-2 pl-3">
      <span className="text-[10px] font-bold uppercase tracking-tight text-zinc-800 group-hover:text-blue-600 transition-colors flex items-center gap-2">
        {isPost ? <Link2 size={11} className="text-zinc-400 group-hover:text-blue-400 transition-colors" /> : <Hash size={11} className="text-zinc-400 group-hover:text-blue-400 transition-colors" />}
        <span>{title}</span>
      </span>
    </td>
    <td className="p-2 text-center text-[10px] font-mono font-bold text-zinc-500">{col2}</td>
    <td className="p-2 text-right pr-3 font-mono font-black text-zinc-950 text-[10px]">{col3}</td>
  </tr>
);

export default CompanyDashboard;