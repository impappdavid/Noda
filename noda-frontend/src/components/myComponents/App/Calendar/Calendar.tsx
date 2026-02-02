import { Plus, ChevronLeft, ChevronRight} from 'lucide-react';
import Navbar from '../navbar';
import AppSideBar from '../Sidebar';
import { cn } from "@/lib/utils";

const AppCalendar = () => {
    // Mock Interview Nodes
    const interviewNodes = [
        { id: 1, date: 12, company: "OpenAI", type: "Technical", status: "Confirmed" },
        { id: 2, date: 15, company: "Vercel", type: "Culture Node", status: "Pending" },
        { id: 3, date: 22, company: "Linear", type: "Systems Design", status: "Confirmed" },
    ];

    return (
        <div className="h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
            <Navbar />
            <div className="flex flex-1 w-full max-w-4xl mx-auto px-6 overflow-hidden">
                <aside className="w-24 shrink-0">
                    <AppSideBar />
                </aside>

                <main className="flex flex-1 flex-col max-w-3xl border-x border-zinc-300 ml-4 h-full bg-white overflow-hidden pt-13">
                    
                    {/* 1. GAPLESS CALENDAR HEADER */}
                    <div className="flex w-full items-center border-b border-zinc-300 bg-white sticky top-0 z-30 h-10">
                        <div className="flex flex-1 items-center divide-x divide-zinc-200 h-full">
                            <div className="flex-[2] px-4 flex items-center gap-3">
                                <h2 className="text-[10px] font-mono font-black uppercase tracking-[0.3em]">February 2026</h2>
                                <div className="flex gap-1">
                                    <button className="p-1 hover:bg-zinc-100 transition-colors"><ChevronLeft size={12} /></button>
                                    <button className="p-1 hover:bg-zinc-100 transition-colors"><ChevronRight size={12} /></button>
                                </div>
                            </div>
                            
                            <div className="flex-1 px-4 flex items-center justify-center bg-zinc-50/50">
                                <span className="text-[9px] font-mono font-black text-zinc-400 uppercase tracking-tighter">
                                    3 ACTIVE INTERVIEWS
                                </span>
                            </div>

                            <button className="px-4 h-full bg-white hover:bg-zinc-50 transition-all border-l border-zinc-200 active:scale-95 group">
                                <Plus size={16} className="text-zinc-400 group-hover:text-zinc-900" />
                            </button>
                        </div>
                    </div>

                    {/* 2. SCHEMATIC CALENDAR GRID */}
                    <div className="flex-1 overflow-y-auto scrollbar-hide">
                        {/* Day Labels */}
                        <div className="grid grid-cols-7 border-b border-zinc-300 bg-zinc-50/30 divide-x divide-zinc-200">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                <div key={day} className="py-2 text-center text-[8px] font-mono font-black uppercase tracking-widest text-zinc-400">
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Month Grid */}
                        <div className="grid grid-cols-7 border-b border-zinc-300 divide-x divide-zinc-300  ">
                            {Array.from({ length: 35 }).map((_, i) => {
                                const dayNumber = i - 0; // Adjust for month start offset
                                const interview = interviewNodes.find(n => n.date === dayNumber);
                                const isCurrentDay = dayNumber === 2; // Feb 2nd 2026

                                return (
                                    <CalendarCell 
                                        key={i} 
                                        day={dayNumber > 0 && dayNumber <= 28 ? dayNumber : null} 
                                        interview={interview}
                                        isCurrent={isCurrentDay}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

// --- SQUARED CALENDAR CELL COMPONENT ---
const CalendarCell = ({ day, interview, isCurrent }: any) => {
    return (
        <div className={cn(
            "min-h-[100px] p-2 flex flex-col border-b border-zinc-300 transition-colors relative group",
            !day && "bg-zinc-50/20",
            day && "bg-white hover:bg-zinc-50 cursor-pointer",
            isCurrent && "bg-zinc-50/80"
        )}>
            {day && (
                <div className="flex justify-between items-start">
                    <span className={cn(
                        "text-[10px] font-mono font-black",
                        isCurrent ? "text-zinc-900" : "text-zinc-400"
                    )}>
                        {day < 10 ? `0${day}` : day}
                    </span>
                    {day && (
                        <Plus size={10} className="text-zinc-200 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                </div>
            )}

            {/* Interview Node Marker */}
            {interview && (
                <div className={cn(
                    "mt-2 p-1.5 border flex flex-col gap-0.5",
                    interview.status === "Pending" 
                        ? "bg-amber-50 border-amber-200" 
                        : "bg-blue-50 border-blue-200"
                )}>
                    <span className={cn(
                        "text-[7px] font-mono font-black uppercase leading-none",
                        interview.status === "Pending" ? "text-amber-600" : "text-blue-600"
                    )}>
                        {interview.type}
                    </span>
                    <span className="text-[9px] font-black text-zinc-900 uppercase truncate">
                        {interview.company}
                    </span>
                </div>
            )}
        </div>
    );
};

export default AppCalendar;