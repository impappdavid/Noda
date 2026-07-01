import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CalendarCell from './CalendarCell';
import ActivityDialog from './ActivityDialog';
import type { InterviewNode } from '@/types/calendar';

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const Calendar = () => {
    // Dynamic initialization based on current date
    const today = useMemo(() => new Date(), []);
    const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);

    const [interviewNodes, setInterviewNodes] = useState<InterviewNode[]>([
        { id: 1, date: 12, month: 2, year: 2026, hour: "14:00", company: "OpenAI", type: "Technical", status: "Confirmed", jobLink: "https://openai.com" },
        { id: 2, date: 15, month: 2, year: 2026, hour: "10:30", company: "Vercel", type: "Culture Node", status: "Pending", jobLink: "https://vercel.com" },
    ]);

    const calendarGrid = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();
        
        return Array.from({ length: 42 }, (_, i) => {
            const dayNum = i - firstDay + 1;
            return dayNum > 0 && dayNum <= daysInMonth ? dayNum : null;
        });
    }, [currentDate]);

    const selectedActivities = useMemo(() => {
        return interviewNodes
            .filter(n => n.date === selectedDate && n.month === currentDate.getMonth() && n.year === currentDate.getFullYear())
            .sort((a, b) => a.hour.localeCompare(b.hour));
    }, [selectedDate, currentDate, interviewNodes]);

    const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));

    const handleAddNode = (newNode: Omit<InterviewNode, 'id' | 'month' | 'year' | 'date'>) => {
        if (!selectedDate) return;
        const entry: InterviewNode = {
            ...newNode,
            id: Date.now(),
            date: selectedDate,
            month: currentDate.getMonth(),
            year: currentDate.getFullYear(),
            status: "Confirmed"
        };
        setInterviewNodes(prev => [...prev, entry]);
        setShowAddForm(false);
    };

    return (
        <div className="w-full bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
          
            <div className="flex flex-1 w-full max-w-4xl mx-auto  overflow-hidden">
                <main className="flex flex-1 flex-col max-w-3xl border-x border-zinc-300 h-full bg-white overflow-hidden ">
                    <div className="flex w-full items-center border-b border-zinc-300 bg-white sticky top-0 z-30 h-10">
                        <div className="flex flex-1 items-center divide-x divide-zinc-300 h-full">
                            <div className="flex-2 px-4 flex items-center justify-between gap-3">
                                <h2 className="text-[10px] font-mono font-black uppercase tracking-[0.3em]">{MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
                                <div className="flex gap-1">
                                    <button onClick={prevMonth} className="p-1 hover:bg-zinc-200 transition-colors cursor-pointer"><ChevronLeft size={12} /></button>
                                    <button onClick={nextMonth} className="p-1 hover:bg-zinc-200 transition-colors cursor-pointer"><ChevronRight size={12} /></button>
                                </div>
                            </div>
                            <div className="flex-1 px-4 flex items-center justify-center bg-zinc-50/50 font-mono text-[9px] font-black text-zinc-400 uppercase tracking-tighter">
                                SYSTEM_TIME: {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false})}
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
                            {calendarGrid.map((day, i) => {
                                const isToday = day === today.getDate() && 
                                               currentDate.getMonth() === today.getMonth() && 
                                               currentDate.getFullYear() === today.getFullYear();
                                return (
                                    <CalendarCell 
                                        key={i} 
                                        day={day} 
                                        interviews={interviewNodes.filter(n => n.date === day && n.month === currentDate.getMonth() && n.year === currentDate.getFullYear())}
                                        isCurrent={isToday}
                                        onClick={() => { if(day) { setSelectedDate(day); setIsDialogOpen(true); } }}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </main>
            </div>

            <ActivityDialog 
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                selectedDate={selectedDate}
                currentMonthName={MONTHS[currentDate.getMonth()]}
                activities={selectedActivities}
                showAddForm={showAddForm}
                setShowAddForm={setShowAddForm}
                onAdd={handleAddNode}
            />
        </div>
    );
};

export default Calendar;