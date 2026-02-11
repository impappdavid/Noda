import { useState, useMemo } from 'react';
import { Bell } from 'lucide-react';
import Navbar from '../AppNavbar';
import AppSideBar from '../Sidebar';
import { cn } from "@/lib/utils";
import type { Notification } from '@/types/notifications';
import NotificationItem from '../Notifications/NotificationItem';
import SignalStats from '../Notifications/SignalStats';

const MOCK_SIGNALS: Notification[] = [
    { id: 1, type: 'connection', actor: 'Marcus Vane', action: 'accepted your connection request', time: '2m ago', unread: true },
    { id: 2, type: 'job', actor: 'Rust Foundation', action: 'posted a new role: Lead Systems Architect', time: '1h ago', unread: true },
    { id: 3, type: 'reaction', actor: 'Sarah Chen', action: 'reacted to your signal on memory safety', time: '3h ago', unread: false },
    { id: 4, type: 'message', actor: 'Alex Rivers', action: 'sent you a direct intelligence brief', time: '5h ago', unread: false },
];

const NotificationsPage = () => {
    const [filter, setFilter] = useState('All');

    // Performance: Filter once and memoize to prevent heavy re-calculation on render
    const filteredSignals = useMemo(() => {
        if (filter === 'All') return MOCK_SIGNALS;
        return MOCK_SIGNALS.filter(s => {
            if (filter === 'Jobs') return s.type === 'job';
            if (filter === 'Network') return s.type === 'connection';
            if (filter === 'Signals') return s.type === 'reaction' || s.type === 'message';
            return true;
        });
    }, [filter]);

    return (
        <div className="min-h-screen bg-white text-zinc-900 font-sans flex flex-col relative">
            <Navbar />

            <div className="max-w-4xl mx-auto px-6 flex flex-1 w-full gap-4">
                <aside className="w-24 shrink-0 relative">
                    <div className="sticky top-13 h-fit py-4"><AppSideBar /></div>
                </aside>

                <main className="flex flex-1 border-x border-zinc-300 bg-white min-h-screen pt-13 mb-24">
                    <div className="flex-1 flex flex-col border-r border-zinc-300">
                        {/* HEADER */}
                        <div className="flex w-full items-center border-b border-zinc-300 bg-white sticky top-13 z-30 h-10 shrink-0">
                            <div className="px-3 h-full flex items-center gap-2">
                                <Bell size={14} className="text-zinc-900" />
                                <span className="text-[10px] font-mono font-black uppercase tracking-widest text-zinc-900">Intelligence_Signals</span>
                            </div>
                        </div>

                        {/* TABS */}
                        <div className="flex w-full border-b border-zinc-300 bg-white sticky top-[92px] z-20 h-8 divide-x divide-zinc-200 shrink-0">
                            {['All', 'Jobs', 'Network', 'Signals'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setFilter(tab)}
                                    className={cn(
                                        "flex-1 text-[10px] font-mono font-bold uppercase tracking-[0.2em] transition-colors cursor-pointer",
                                        filter === tab ? "bg-zinc-800 text-white" : "text-zinc-400 hover:bg-zinc-50"
                                    )}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* LIST */}
                        <div className="divide-y divide-zinc-300 border-b border-zinc-300">
                            {filteredSignals.map((s) => (
                                <NotificationItem key={s.id} signal={s} />
                            ))}
                        </div>
                    </div>

                    <SignalStats />
                </main>
            </div>
        </div>
    );
};

export default NotificationsPage;