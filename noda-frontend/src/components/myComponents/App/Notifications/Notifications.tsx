import {
    Bell, Users, Briefcase, Zap, MoreHorizontal, Settings
} from 'lucide-react';
import Navbar from '../AppNavbar';
import AppSideBar from '../Sidebar';
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const NotificationsPage = () => {
    const signals = [
        { id: 1, type: 'Network', actor: 'Marcus Vane', action: 'accepted your connection request', time: '2m ago', unread: true },
        { id: 2, type: 'Jobs', actor: 'Rust Foundation', action: 'posted a new role: Lead Systems Architect', time: '1h ago', unread: true },
        { id: 3, type: 'Signals', actor: 'Sarah Chen', action: 'reacted to your signal on memory safety', time: '3h ago', unread: false },
        { id: 4, type: 'Signals', actor: 'Alex Rivers', action: 'sent you a direct intelligence brief', time: '5h ago', unread: false },
    ];

    const categories = ['All', 'Jobs', 'Network', 'Signals'];

    return (
        <div className="min-h-screen bg-white text-zinc-900 font-sans flex flex-col relative">
            <Navbar />

            <div className="max-w-4xl mx-auto px-6 flex flex-1 w-full gap-4">
                <aside className="w-25 shrink-0 relative">
                    <div className="sticky top-13 h-fit py-4">
                        <AppSideBar />
                    </div>
                </aside>

                <main className=" flex-1 border-x border-zinc-300 bg-white min-h-screen flex pt-10 mb-24">
                    
                    {/* 1. TABS WRAPPER */}
                    <Tabs defaultValue="All" className="flex-1 flex flex-col border-r border-zinc-300">
                        
                        {/* HEADER STICKY */}
                        <div className="flex w-full items-center border-b border-zinc-300 bg-white sticky top-12.5 z-30 h-10 shrink-0">
                            <div className="px-3 h-full flex items-center gap-2">
                                <Bell size={14} className="text-zinc-900" />
                                <span className="text-[10px] font-mono font-black uppercase tracking-widest text-zinc-900">Intelligence_Signals</span>
                            </div>
                            <div className="flex-1 bg-zinc-50/30 h-full"></div>
                            <button className="h-full px-3 border-l border-zinc-300 hover:bg-zinc-100 transition-colors cursor-pointer flex items-center justify-center border-none outline-none">
                                <Settings size={14} className="text-zinc-500 hover:text-zinc-900" />
                            </button>
                        </div>

                        {/* 2. TABS LIST (Navigation) */}
                        <TabsList className="w-full h-9 flex rounded-none bg-white p-0 gap-0 border-b border-zinc-300 divide-x divide-zinc-200 top-20.5 z-20">
                            {categories.map((tab) => (
                                <TabsTrigger
                                    key={tab}
                                    value={tab}
                                    className={cn(
                                        "flex-1 h-full rounded-none text-[10px] font-mono font-bold uppercase tracking-[0.2em] transition-all cursor-pointer m-0 border-none",
                                        "data-[state=active]:bg-zinc-800 data-[state=active]:text-white data-[state=active]:shadow-none text-zinc-400 hover:bg-zinc-50"
                                    )}
                                >
                                    {tab}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        {/* 3. TABS CONTENT (Filtered Views) */}
                        {categories.map((category) => (
                            <TabsContent 
                                key={category} 
                                value={category} 
                                className="m-0 p-0 border-none outline-none data-[state=inactive]:hidden"
                            >
                                <div className="divide-y divide-zinc-300 border-b border-zinc-300">
                                    {signals
                                        .filter(s => category === 'All' || s.type === category)
                                        .map((s) => (
                                            <SignalItem key={s.id} s={s} />
                                        ))
                                    }
                                    {/* Empty state protocol */}
                                    {signals.filter(s => category === 'All' || s.type === category).length === 0 && (
                                        <div className="p-16 text-center">
                                            <span className="text-[10px] font-mono font-black text-zinc-300 uppercase tracking-[0.4em]">
                                                No_{category}_Data_Uplink
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </TabsContent>
                        ))}
                    </Tabs>

                    {/* RIGHT SIDEBAR */}
                    <aside className="w-40 shrink-0 relative bg-zinc-50/10">
                        <div className="sticky top-12.5 flex flex-col h-fit divide-y divide-zinc-300 border-b border-zinc-300">
                            <div className="p-3 bg-zinc-50/50">
                                <h2 className="text-[10px] font-mono font-black uppercase tracking-[0.2em] text-zinc-500">Signal_Stats</h2>
                            </div>
                            <div className="p-3 space-y-3 bg-white">
                                <NotificationMetric label="Unread" value="02" />
                                <NotificationMetric label="Job Alerts" value="01" />
                                <NotificationMetric label="Network" value="08" />
                            </div>
                            <button className="w-full bg-zinc-800 text-white text-[9px] py-2 font-mono font-black uppercase tracking-widest hover:bg-zinc-900 transition-all cursor-pointer border-none outline-none">
                                Clear_Signals
                            </button>
                        </div>
                    </aside>
                </main>
            </div>
        </div>
    );
};

const SignalItem = ({ s }: { s: any }) => (
    <div className={cn(
        "p-2 flex gap-4 transition-colors cursor-pointer group",
        s.unread ? "bg-blue-50/20" : "hover:bg-zinc-50/50"
    )}>
        <div className="shrink-0 relative">
            <div className="w-10 h-10 bg-zinc-800 flex items-center justify-center border border-zinc-700">
                {s.type === 'Network' && <Users size={16} className="text-white" />}
                {s.type === 'Jobs' && <Briefcase size={16} className="text-white" />}
                {s.type === 'Signals' && <Zap size={16} className="text-white" />}
            </div>
            {s.unread && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-600 rounded-full" />
            )}
        </div>
        <div className="flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-0.5">
                <span className="text-xs font-bold tracking-tight text-zinc-900">{s.actor}</span>
                <span className="text-[9px] font-mono font-black text-zinc-500 uppercase">{s.time}</span>
            </div>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-tight">{s.action}</p>
        </div>
        <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
            <MoreHorizontal size={14} className="text-zinc-400" />
        </div>
    </div>
);

const NotificationMetric = ({ label, value }: { label: string, value: string }) => (
    <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-tight">{label}</span>
        <span className="text-[10px] font-bold text-zinc-900 uppercase font-mono">{value}</span>
    </div>
);

export default NotificationsPage;