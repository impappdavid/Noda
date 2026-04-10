import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { JobNode } from "@/types/admin/applications";
import { 
  Calendar1, 
  EllipsisVertical, 
  Pencil, 
  Trash, 
  ChevronLeft, 
  ChevronRight, 
  Clock,
  X,
  Plus
} from "lucide-react";
import React, { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const JobCard = React.memo(({ job }: { job: JobNode }) => {
  const [interviewDialog, setInterviewDialog] = useState(false);
  
  // Logic States
  const [viewDate, setViewDate] = useState(new Date()); 
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [interviews, setInterviews] = useState<Record<string, string[]>>({}); // Changed to array to support multiple times
  const [tempTime, setTempTime] = useState("");
  const [isAddingTime, setIsAddingTime] = useState(false);

  // Calendar Logic
  const { paddingDays, monthDays, monthLabel } = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const label = viewDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    const firstDayIndex = new Date(year, month, 1).getDay();
    const startingPadding = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    return { 
      paddingDays: Array.from({ length: startingPadding }), 
      monthDays: Array.from({ length: daysInMonth }), 
      monthLabel: label 
    };
  }, [viewDate]);

  const changeMonth = (offset: number) => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1));
    setSelectedDay(null);
    setIsAddingTime(false);
  };

  const handleSaveTime = () => {
    if (selectedDay && tempTime) {
      const dateKey = `${viewDate.getFullYear()}-${viewDate.getMonth()}-${selectedDay}`;
      setInterviews(prev => ({
        ...prev,
        [dateKey]: [...(prev[dateKey] || []), tempTime].sort()
      }));
      setIsAddingTime(false);
      setTempTime("");
    }
  };

  const selectedDateKey = selectedDay ? `${viewDate.getFullYear()}-${viewDate.getMonth()}-${selectedDay}` : null;
  const activeDayInterviews = selectedDateKey ? interviews[selectedDateKey] || [] : [];

  return (
    <>
      {/* RESTORED ORIGINAL CARD UI */}
      <div className="p-2 bg-white hover:bg-zinc-100 transition-all cursor-pointer group flex items-center justify-between border-b border-zinc-300">
        <div className="flex flex-col gap-1 w-full">
          <div className="flex justify-between h-fit">
            <div className="w-8 h-8 bg-zinc-800 text-white flex items-center justify-center border border-zinc-800 shrink-0 uppercase font-bold text-xs">
              {job.role.substring(0, 2)}
            </div>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild onClick={(e) => e.preventDefault()}>
                <div className="p-1 hover:bg-zinc-300/80 cursor-pointer text-zinc-500 h-fit aspect-square">
                  <EllipsisVertical className="w-3.5 h-3.5" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-36 p-0 rounded-none border-zinc-300 shadow-none" align="end" forceMount>
                <DropdownMenuGroup className="divide-y divide-zinc-300">
                  <DropdownMenuItem className="rounded-none hover:bg-zinc-200/80 px-2 py-1.5 text-[11px] text-zinc-600 cursor-pointer">
                    <Pencil className=" h-3.5 w-3.5 text-zinc-400" />
                    <span>Edit</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setInterviewDialog(true)} className="rounded-none hover:bg-zinc-200/80 px-2 py-1.5 text-[11px] text-zinc-600 cursor-pointer">
                    <Calendar1 className=" h-3.5 w-3.5 text-zinc-400" />
                    <span>Interview Dates</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-none hover:bg-zinc-200/80 px-2 py-1.5 text-[11px] text-red-500 cursor-pointer ">
                    <Trash className=" h-3.5 w-3.5" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="flex flex-col w-full">
            <h5 className="text-sm font-bold uppercase tracking-tight group-hover:text-blue-500 transition-colors">{job.role}</h5>
            <div className="flex items-center gap-1 text-[11px]">
              <span>Remote</span><span className="opacity-30">•</span>
              <span>Full-Time</span><span className="opacity-30">•</span>
              <span>0-1 year</span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase">{job.applicants} Applies</span>
              <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase">{job.deadline} to reply</span>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={interviewDialog} onOpenChange={setInterviewDialog}>
        <DialogContent className="max-w-3xl p-0 rounded-none border border-zinc-300 gap-0 overflow-hidden outline-none shadow-xl flex flex-col">
          
          {/* Main Header */}
          <DialogHeader className="bg-zinc-100 p-1.5 flex flex-row items-center justify-between space-y-0 border-b border-zinc-300">
            <DialogTitle className="text-xs font-bold uppercase">{job.role}</DialogTitle>
            <div className="flex gap-2">
                <button 
                disabled={selectedDay === null}
                onClick={() => setIsAddingTime(true)}
                className="text-[10px] font-bold text-white bg-blue-600 px-4 py-1.5 uppercase hover:bg-blue-700 disabled:bg-zinc-300 transition-colors flex items-center gap-1"
                >
                <Plus className="w-3 h-3" /> Add Time
                </button>
            </div>
          </DialogHeader>

          <div className="flex flex-row h-[400px]">
            {/* Left Side: Calendar */}
            <div className="flex-1 flex flex-col bg-white border-r border-zinc-200">
                <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-200">
                    <button onClick={() => changeMonth(-1)} className="p-1 hover:bg-zinc-100 border border-zinc-200 rounded-sm"><ChevronLeft className="w-3 h-3"/></button>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-600">{monthLabel}</span>
                    <button onClick={() => changeMonth(1)} className="p-1 hover:bg-zinc-100 border border-zinc-200 rounded-sm"><ChevronRight className="w-3 h-3"/></button>
                </div>

                <div className="grid grid-cols-7 bg-zinc-50 border-b border-zinc-300">
                    {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map(d => (
                        <div key={d} className="p-2 text-[10px] font-bold text-center text-zinc-500 border-r border-zinc-300 last:border-r-0">{d}</div>
                    ))}
                </div>
                
                <div className="grid grid-cols-7 divide-x divide-y divide-zinc-300 flex-1 overflow-y-auto">
                    {paddingDays.map((_, i) => (
                        <div key={`pad-${i}`} className="bg-zinc-50/50" />
                    ))}

                    {monthDays.map((_, i) => {
                        const day = i + 1;
                        const dateKey = `${viewDate.getFullYear()}-${viewDate.getMonth()}-${day}`;
                        const dayInterviews = interviews[dateKey] || [];
                        const isSelected = selectedDay === day;

                        return (
                        <div 
                            key={day} 
                            onClick={() => { setSelectedDay(day); setIsAddingTime(false); }}
                            className={`p-1.5 min-h-[60px] flex flex-col gap-1 cursor-pointer transition-all ${isSelected ? 'bg-blue-500 ' : 'hover:bg-zinc-50'}`}
                        >
                            <span className={`text-[10px] font-mono font-bold ${isSelected ? 'text-white' : 'text-zinc-400'}`}>
                            {day.toString().padStart(2, '0')}
                            </span>
                            <div className="flex flex-wrap gap-0.5">
                                {dayInterviews.slice(0, 2).map((time, idx) => (
                                    <div key={idx} className={`text-[8px] px-1 py-0.5 w-fit ${isSelected ? 'bg-white text-black' : 'bg-blue-100 text-blue-700'}`}>
                                        {time}
                                    </div>
                                ))}
                                {dayInterviews.length > 2 && <span className="text-[8px] text-black">+{dayInterviews.length - 2} more</span>}
                            </div>
                        </div>
                        );
                    })}
                </div>
            </div>

            {/* Right Side: Sidebar */}
            <div className={`w-64 bg-zinc-50 flex flex-col transition-all ${!selectedDay ? 'opacity-50' : 'opacity-100'}`}>
                <div className="p-2 border-b border-zinc-300 bg-zinc-100 flex justify-between items-center">
                    <h6 className="text-[11px] font-bold uppercase text-zinc-600">
                        {selectedDay ? `Details: ${selectedDay} ${viewDate.toLocaleString('default', { month: 'short' })}` : 'Select a date'}
                    </h6>
                    {selectedDay && <button onClick={() => setSelectedDay(null)}><X className="w-3 h-3" /></button>}
                </div>

                <div className="flex-1  overflow-y-auto">
                    {isAddingTime && (
                        <div className=" p-2 bg-white  rounded-sm">
                            <label className="text-[9px] font-bold uppercase text-blue-600 block mb-1">Set Interview Time</label>
                            <div className="flex gap-1">
                                <input 
                                    type="time" 
                                    className="text-xs flex-1 border border-zinc-300 p-1 outline-none"
                                    value={tempTime}
                                    onChange={(e) => setTempTime(e.target.value)}
                                    autoFocus
                                />
                                <button onClick={handleSaveTime} className="bg-blue-600 text-white p-1 rounded-sm"><Plus className="w-4 h-4"/></button>
                            </div>
                        </div>
                    )}

                    <div className="">
                        {activeDayInterviews.length > 0 ? (
                            activeDayInterviews.map((time, idx) => (
                                <div key={idx} className="flex items-center justify-between bg-white p-2 border-b border-zinc-300 group">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-3 h-3 text-zinc-400" />
                                        <span className="text-xs font-mono font-bold text-zinc-700">{time}</span>
                                    </div>
                                    <button className="opacity-0 group-hover:opacity-100 text-red-500 transition-opacity">
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-zinc-400 mt-10">
                                <Calendar1 className="w-8 h-8 opacity-20 mb-2" />
                                <span className="text-[10px] uppercase font-bold">No interviews set</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-3 bg-zinc-100 border-t border-zinc-300 flex justify-end gap-2">
            <button onClick={() => setInterviewDialog(false)} className="px-5 py-1.5 text-[10px] font-bold uppercase border border-zinc-300 bg-white">Close</button>
            <button onClick={() => setInterviewDialog(false)} className="px-5 py-1.5 text-[10px] font-bold uppercase bg-zinc-800 text-white">Save Schedule</button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
});