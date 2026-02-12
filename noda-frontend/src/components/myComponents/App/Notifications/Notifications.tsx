import { useState } from 'react';
import {
    Bell, Users, Briefcase, MessageSquare,
    Heart, Zap, MoreHorizontal, Circle
} from 'lucide-react';
import Navbar from '../AppNavbar';
import AppSideBar from '../Sidebar';
import { cn } from "@/lib/utils";

const NotificationsPage = () => {
    const [filter, setFilter] = useState('All');

    const signals = [
        { id: 1, type: 'connection', actor: 'Marcus Vane', action: 'accepted your connection request', time: '2m ago', unread: true },
        { id: 2, type: 'job', actor: 'Rust Foundation', action: 'posted a new role: Lead Systems Architect', time: '1h ago', unread: true },
        { id: 3, type: 'reaction', actor: 'Sarah Chen', action: 'reacted to your signal on memory safety', time: '3h ago', unread: false },
        { id: 4, type: 'message', actor: 'Alex Rivers', action: 'sent you a direct intelligence brief', time: '5h ago', unread: false },
    ];

    return (
        <div className="min-h-screen bg-white text-zinc-900 font-sans flex flex-col relative">
            <Navbar />

            <div className="max-w-4xl mx-auto px-6 flex flex-1 w-full gap-4">
                {/* LEFT: NAV (w-24) - STICKY */}
                <aside className="w-25 shrink-0 relative">
                    <div className="sticky top-13 h-fit py-4">
                        <AppSideBar />
                    </div>
                </aside>

                <main className="flex flex-1 border-x border-zinc-300 bg-white min-h-screen flex pt-13 mb-24">

                    {/* CENTER: NOTIFICATION FEED */}
                    <div className="flex-1 flex flex-col border-r border-zinc-300">

                        {/* HEADER STICKY */}
                        <div className="flex w-full items-center border-b border-zinc-300 bg-white sticky top-13 z-30 h-10 shrink-0">
                            <div className="px-3 h-full flex items-center gap-2">
                                <Bell size={14} className="text-zinc-900" />
                                <span className="text-[10px] font-mono font-black uppercase tracking-widest text-zinc-900">Intelligence_Signals</span>
                            </div>
                            <div className="flex-1 bg-zinc-50/30"></div>
                        </div>

                        {/* FILTER TABS */}
                        <div className="flex w-full border-b border-zinc-300 bg-white sticky top-[92px] z-20 h-8 divide-x divide-zinc-200 shrink-0">
                            {['All', 'Jobs', 'Network', 'Signals'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setFilter(tab)}
                                    className={cn(
                                        "flex-1 text-[10px] font-mono font-bold uppercase tracking-[0.2em] transition-colors",
                                        filter === tab ? "bg-zinc-800 text-white" : "text-zinc-400 hover:bg-zinc-50"
                                    )}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* SIGNAL LIST */}
                        <div className="divide-y divide-zinc-300 border-b border-zinc-300">
                            {signals.map((s) => (
                                <div key={s.id} className={cn(
                                    "p-3 flex gap-4 transition-colors cursor-pointer group",
                                    s.unread ? "bg-blue-50/20" : "hover:bg-zinc-50/50"
                                )}>
                                    <div className="shrink-0 relative">
                                        <div className="w-10 h-10 bg-zinc-800 flex items-center justify-center">
                                            {s.type === 'connection' && <Users size={16} className="text-white" />}
                                            {s.type === 'job' && <Briefcase size={16} className="text-white" />}
                                            {s.type === 'reaction' && <Zap size={16} className="text-white" />}
                                            {s.type === 'message' && <MessageSquare size={16} className="text-white" />}
                                        </div>
                                        {s.unread && (
                                            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-blue-600 rounded-full border-2 border-white" />
                                        )}
                                    </div>

                                    <div className="flex-1 flex flex-col">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="text-xs font-bold tracking-tight text-zinc-900">
                                                {s.actor}
                                            </span>
                                            <span className="text-[9px] font-mono font-black text-zinc-500 uppercase">
                                                {s.time}
                                            </span>
                                        </div>
                                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-tight leading-normal">
                                            {s.action}
                                        </p>
                                    </div>

                                    <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <MoreHorizontal size={14} className="text-zinc-400" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: STATS/TOOLS SIDEBAR - STICKY */}
                    <aside className="w-40 shrink-0 relative bg-zinc-50/10">
                        <div className="sticky top-13 flex flex-col h-fit divide-y divide-zinc-300 border-b border-zinc-300">
                            <div className="p-3 bg-zinc-50/50">
                                <h2 className="text-[10px] font-mono font-black uppercase tracking-[0.2em] text-zinc-500">Signal_Stats</h2>
                            </div>
                            <div className="p-3 space-y-3 bg-white">
                                <NotificationMetric label="Unread" value="02" />
                                <NotificationMetric label="Job Alerts" value="01" />
                                <NotificationMetric label="Network" value="08" />
                            </div>
                            <button className="w-full bg-zinc-800 text-white text-[9px]  py-2 font-mono font-black uppercase tracking-widest hover:bg-black transition-all">
                                Clear_Signals
                            </button>
                        </div>
                    </aside>
                </main>
            </div>
        </div>
    );
};

// --- HELPERS ---
const NotificationMetric = ({ label, value, color }: any) => (
    <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-tight">{label}</span>
        <span className={cn("text-[10px] font-bold uppercase", color || "text-zinc-900")}>{value}</span>
    </div>
);

export default NotificationsPage;