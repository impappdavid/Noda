import React, { useState } from 'react';
import { Plus, ChevronLeft, ChevronRight, Activity, Briefcase, AlertTriangle, ExternalLink, Clock } from 'lucide-react';
import Navbar from '../AppNavbar';
import AppSideBar from '../Sidebar';
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AppCalendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 1)); // Feb 2026
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);

    // Mock Interview Nodes with Timestamps and Links
    const [interviewNodes, setInterviewNodes] = useState([
        { id: 1, date: 12, month: 1, year: 2026, hour: "14:00", company: "OpenAI", type: "Technical", status: "Confirmed", jobLink: "https://openai.com/jobs" },
        { id: 2, date: 15, month: 1, year: 2026, hour: "10:30", company: "Vercel", type: "Culture Node", status: "Pending", jobLink: "https://vercel.com/jobs" },
        { id: 3, date: 22, month: 1, year: 2026, hour: "16:00", company: "Linear", type: "Systems Design", status: "Confirmed", jobLink: "https://linear.app/jobs" },
        { id: 4, date: 12, month: 1, year: 2026, hour: "09:00", company: "Anthropic", type: "Screening", status: "Confirmed", jobLink: "https://anthropic.com/jobs" },
    ]);

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));

    const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
    const firstDay = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());
    const days = Array.from({ length: 42 }, (_, i) => {
        const dayNum = i - firstDay + 1;
        return dayNum > 0 && dayNum <= daysInMonth ? dayNum : null;
    });

    const handleCellClick = (day: number | null) => {
        if (!day) return;
        setSelectedDate(day);
        setShowAddForm(false);
        setIsDialogOpen(true);
    };

    const selectedActivities = interviewNodes.filter(n => 
        n.date === selectedDate && 
        n.month === currentDate.getMonth() && 
        n.year === currentDate.getFullYear()
    ).sort((a, b) => a.hour.localeCompare(b.hour));

    return (
        <div className="h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
            <Navbar />
            <div className="flex flex-1 w-full max-w-4xl mx-auto px-6 overflow-hidden">
                <aside className="w-24 shrink-0 ">
                    <AppSideBar />
                </aside>

                <main className="flex flex-1 flex-col max-w-3xl border-x border-zinc-300 ml-4 h-full bg-white overflow-hidden pt-13">
                    
                    <div className="flex w-full items-center border-b border-zinc-300 bg-white sticky top-0 z-30 h-10">
                        <div className="flex flex-1 items-center divide-x divide-zinc-300 h-full">
                            <div className="flex-[2] px-4 flex items-center justify-between gap-3">
                                <h2 className="text-[10px] font-mono font-black uppercase tracking-[0.3em]">
                                    {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                                </h2>
                                <div className="flex gap-1">
                                    <button onClick={prevMonth} className="p-1 hover:bg-zinc-200 transition-colors"><ChevronLeft size={12} /></button>
                                    <button onClick={nextMonth} className="p-1 hover:bg-zinc-200 transition-colors"><ChevronRight size={12} /></button>
                                </div>
                            </div>
                            <div className="flex-1 px-4 flex items-center justify-center bg-zinc-50/50 font-mono text-[9px] font-black text-zinc-400">
                                SYSTEM_TIME: {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto scrollbar-hide">
                        <div className="grid grid-cols-7 border-b border-zinc-300 bg-zinc-50/30 divide-x divide-zinc-300">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                <div key={day} className="py-2 text-center text-[9px] font-mono font-black uppercase tracking-widest text-zinc-400">{day}</div>
                            ))}
                        </div>

                        <div className="grid grid-cols-7 divide-x divide-zinc-300">
                            {days.map((day, i) => {
                                const interviews = interviewNodes.filter(n => 
                                    n.date === day && n.month === currentDate.getMonth() && n.year === currentDate.getFullYear()
                                );
                                return (
                                    <CalendarCell 
                                        key={i} 
                                        day={day} 
                                        interviews={interviews}
                                        isCurrent={day === 9 && currentDate.getMonth() === 1}
                                        onClick={() => handleCellClick(day)}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </main>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-md rounded-none p-0 overflow-hidden bg-white border-none shadow-2xl">
                    <DialogHeader className="p-4 bg-zinc-800 text-white flex flex-row items-center justify-between space-y-0 shrink-0">
                        <div className="flex items-center gap-2">
                            <Activity size={16} className="text-orange-500" />
                            <DialogTitle className="text-[11px] font-mono font-black uppercase tracking-[0.2em]">
                                Node_Activity // {months[currentDate.getMonth()]} {selectedDate}
                            </DialogTitle>
                        </div>
                    </DialogHeader>

                    <div className="p-4 space-y-4">
                        {selectedActivities.length > 0 && !showAddForm ? (
                            <div className="space-y-4">
                                <span className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest block border-b border-zinc-100 pb-2">Active_Sequences</span>
                                {selectedActivities.map((act) => (
                                    <div 
                                        key={act.id} 
                                        onClick={() => window.open(act.jobLink, '_blank')}
                                        className="p-3 bg-zinc-100 border border-zinc-300 flex justify-between items-center group cursor-pointer hover:border-zinc-900 transition-colors"
                                    >
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-bold uppercase text-zinc-900">{act.company}</span>
                                                <span className="text-[10px] font-mono font-black text-orange-600 bg-orange-50 px-1.5 py-0.5 border border-orange-100">{act.hour}</span>
                                                
                                            </div>
                                            <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-zinc-500 uppercase">
                                                <span>{act.type}</span>
                                                <span className="opacity-30">/</span>
                                                <span className={cn(act.status === "Confirmed" ? "text-emerald-600" : "text-orange-600")}>{act.status}</span>
                                            </div>
                                        </div>
                                        <ExternalLink size={12} className="text-zinc-300 group-hover:text-zinc-900" />
                                    </div>
                                ))}
                                <button 
                                    onClick={() => setShowAddForm(true)}
                                    className="w-full py-3 border border-dashed border-zinc-300 text-[10px] font-mono font-black uppercase text-zinc-500 hover:border-zinc-900 hover:text-zinc-900 transition-all flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <Plus size={14} /> Deploy_Secondary_Activity
                                </button>
                            </div>
                        ) : (
                            <form className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                                <div className="space-y-4">
                                    <div className="p-3 bg-zinc-100 border border-zinc-300 flex items-center gap-4">
                                        <AlertTriangle size={20} className="text-orange-500" />
                                        <div>
                                            <p className="text-[11px] font-mono font-black uppercase text-zinc-900">Initialize_New_Sequence</p>
                                            <p className="text-[10px] font-mono text-zinc-500 uppercase">Target Date: {selectedDate} {months[currentDate.getMonth()]}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-mono font-black uppercase text-zinc-500">Company_Target</label>
                                        <input placeholder="SEARCH NODES..." className="w-full h-10 bg-zinc-50 border border-zinc-300 px-3 text-xs font-mono font-bold uppercase outline-none focus:border-zinc-900" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-mono font-black uppercase text-zinc-500">Protocol_Type</label>
                                            <Select defaultValue="technical">
                                                <SelectTrigger className="w-full h-10 rounded-none border-zinc-300 bg-zinc-50 font-mono text-[10px] font-bold uppercase focus:ring-0">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent position="popper" className="rounded-none border-zinc-300 font-mono text-[10px] uppercase bg-white">
                                                    <SelectItem value="technical">Technical</SelectItem>
                                                    <SelectItem value="screening">Screening</SelectItem>
                                                    <SelectItem value="systems">Systems_Design</SelectItem>
                                                    <SelectItem value="culture">Culture_Fit</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-mono font-black uppercase text-zinc-500">Timestamp</label>
                                            <input type="time" className="w-full h-10 bg-zinc-50 border border-zinc-200 px-3 text-xs font-mono font-bold outline-none" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2 pt-4">
                                    <button 
                                        type="button" 
                                        onClick={() => selectedActivities.length > 0 ? setShowAddForm(false) : setIsDialogOpen(false)} 
                                        className="flex-1 h-10 border border-zinc-300 text-[10px] font-mono font-black uppercase hover:bg-zinc-50 transition-colors cursor-pointer"
                                    >
                                        Abort
                                    </button>
                                    <button type="submit" className="flex-[2] h-10 bg-zinc-900 text-white text-[10px] font-mono font-black uppercase hover:bg-black transition-colors flex items-center justify-center gap-2 cursor-pointer">Deploy_Activity</button>
                                </div>
                            </form>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

const CalendarCell = ({ day, interviews, isCurrent, onClick }: any) => {
    return (
        <div 
            onClick={onClick}
            className={cn(
                "min-h-[110px] p-2 flex flex-col border-b border-zinc-300 transition-colors relative group",
                !day && "bg-zinc-50/20",
                day && "bg-white hover:bg-zinc-200/60 cursor-pointer",
                isCurrent && "bg-zinc-200/80"
            )}
        >
            {day && (
                <div className="flex justify-between items-start mb-1">
                    <span className={cn(
                        "text-[10px] font-mono font-black",
                        isCurrent ? "text-zinc-900 underline decoration-orange-500 underline-offset-4" : "text-zinc-400"
                    )}>
                        {day < 10 ? `0${day}` : day}
                    </span>
                    <Plus size={14} className="text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
            )}

            <div className="space-y-1">
                {interviews?.sort((a:any, b:any) => a.hour.localeCompare(b.hour)).map((interview: any) => (
                    <div key={interview.id} className={cn(
                        "p-1 border flex flex-col gap-0",
                        interview.status === "Pending" ? "bg-orange-500/10 border-orange-200" : "bg-zinc-900 border-zinc-800 shadow-sm"
                    )}>
                        <div className="flex justify-between items-center leading-none mb-0.5">
                            <span className={cn(
                                "text-[8px] font-mono font-black uppercase",
                                interview.status === "Pending" ? "text-amber-600" : "text-zinc-500"
                            )}>
                                {interview.type}
                            </span>
                            <span className={cn(
                                "text-[8px] font-mono ",
                                interview.status === "Pending" ? "text-orange-400" : "text-orange-400"
                            )}>{interview.hour}</span>
                        </div>
                        <span className={cn(
                            "text-[9px] font-semibold uppercase truncate leading-tight",
                            interview.status === "Confirmed" ? "text-white" : "text-zinc-900"
                        )}>
                            {interview.company}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AppCalendar;