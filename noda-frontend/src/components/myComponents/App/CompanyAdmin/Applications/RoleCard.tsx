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
  X 
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
  const [interviews, setInterviews] = useState<Record<string, string>>({}); 
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
      setInterviews(prev => ({ ...prev, [dateKey]: tempTime }));
      setIsAddingTime(false);
      setTempTime("");
    }
  };

  return (
    <>
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
                  <DropdownMenuItem className="rounded-none hover:bg-zinc-200/80 px-2 py-1.5 text-[11px] text-zinc-600 focus:bg-zinc-100 focus:text-zinc-900 cursor-pointer">
                    <Pencil className=" h-3.5 w-3.5 text-zinc-400" />
                    <span>Edit</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setInterviewDialog(true)}
                    className="rounded-none hover:bg-zinc-200/80 px-2 py-1.5 text-[11px] text-zinc-600 focus:bg-zinc-50 focus:text-zinc-900 cursor-pointer"
                  >
                    <Calendar1 className=" h-3.5 w-3.5 text-zinc-400" />
                    <span>Interview Dates</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-none hover:bg-zinc-200/80 px-2 py-1.5 text-[11px] text-red-500 focus:bg-red-50 focus:text-red-600 cursor-pointer ">
                    <Trash className=" h-3.5 w-3.5" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="flex flex-col w-full">
            <h5 className="text-sm font-bold uppercase tracking-tight group-hover:text-blue-500 transition-colors">
              {job.role}
            </h5>
            <div className="flex items-center gap-1 text-[11px]">
              <span className="truncate">Remote</span>
              <span className="opacity-30">•</span>
              <span className="truncate">Full-Time</span>
              <span className="opacity-30">•</span>
              <span className="truncate">0-1 year</span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase">
                {job.applicants} Applies
              </span>
              <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase">
                {job.deadline} to reply
              </span>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={interviewDialog} onOpenChange={setInterviewDialog}>
        <DialogContent className="max-w-md p-0 rounded-none border border-zinc-300 gap-0 overflow-hidden outline-none shadow-xl">
          {/* Header with original Button Layout */}
          <DialogHeader className="bg-zinc-100 p-2 flex flex-row items-center justify-between space-y-0 border-b border-zinc-300">
            <DialogTitle className="text-xs font-bold uppercase">{job.role}</DialogTitle>
            <button 
              disabled={selectedDay === null}
              onClick={() => setIsAddingTime(true)}
              className="text-[10px] font-bold text-white bg-blue-600 px-4 py-1.5 uppercase hover:bg-blue-700 disabled:bg-zinc-300 disabled:cursor-not-allowed transition-colors"
            >
              Add New Date
            </button>
          </DialogHeader>

          {/* Month Switcher Row */}
          <div className="flex items-center justify-between px-3 py-2 bg-white border-b border-zinc-200">
            <button onClick={() => changeMonth(-1)} className="p-1 hover:bg-zinc-100 border border-zinc-200 rounded-sm">
              <ChevronLeft className="w-3 h-3"/>
            </button>
            <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-600">{monthLabel}</span>
            <button onClick={() => changeMonth(1)} className="p-1 hover:bg-zinc-100 border border-zinc-200 rounded-sm">
              <ChevronRight className="w-3 h-3"/>
            </button>
          </div>

          {/* Inline Time Input */}
          {isAddingTime && (
            <div className="p-2 bg-zinc-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase text-zinc-400">Time for Day {selectedDay}:</span>
                <input 
                  type="time" 
                  className="text-xs bg-zinc-800 border border-zinc-700 p-1 outline-none text-white focus:border-blue-500"
                  value={tempTime}
                  onChange={(e) => setTempTime(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="flex gap-1">
                 <button onClick={() => setIsAddingTime(false)} className="p-1 hover:text-red-400"><X className="w-3 h-3"/></button>
                 <button onClick={handleSaveTime} className="text-[10px] uppercase px-3 py-1 bg-blue-600 font-bold">Set</button>
              </div>
            </div>
          )}

          {/* Grid */}
          <div className="bg-white">
            <div className="grid grid-cols-7 bg-zinc-50 border-b border-zinc-200">
              {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map(d => (
                <div key={d} className="p-2 text-[10px] font-bold text-center text-zinc-400 border-r border-zinc-200 last:border-r-0">{d}</div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 divide-x divide-y divide-zinc-200 border-b border-zinc-200">
              {paddingDays.map((_, i) => (
                <div key={`pad-${i}`} className="aspect-square bg-zinc-50/50" />
              ))}

              {monthDays.map((_, i) => {
                const day = i + 1;
                const dateKey = `${viewDate.getFullYear()}-${viewDate.getMonth()}-${day}`;
                const interviewTime = interviews[dateKey];
                const isSelected = selectedDay === day;

                return (
                  <div 
                    key={day} 
                    onClick={() => { setSelectedDay(day); setIsAddingTime(false); }}
                    className={`p-1.5 aspect-square flex flex-col justify-between cursor-pointer transition-all
                      ${isSelected ? 'bg-zinc-800 text-white' : 'hover:bg-zinc-50'}
                    `}
                  >
                    <span className={`text-[10px] font-mono font-bold ${isSelected ? 'text-white' : 'text-zinc-400'}`}>
                      {day.toString().padStart(2, '0')}
                    </span>
                    
                    {interviewTime && (
                      <div className={`text-[8px] flex items-center gap-0.5 px-1 py-0.5 font-bold rounded-sm
                        ${isSelected ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-700'}
                      `}>
                        <Clock className="w-2 h-2" />
                        {interviewTime}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-3 bg-zinc-100 flex justify-end gap-2">
            <button 
              onClick={() => setInterviewDialog(false)}
              className="px-5 py-1.5 text-[10px] font-bold uppercase border border-zinc-300 bg-white hover:bg-zinc-50 active:bg-zinc-100"
            >
              Close
            </button>
            <button 
              onClick={() => setInterviewDialog(false)}
              className="px-5 py-1.5 text-[10px] font-bold uppercase bg-zinc-800 text-white hover:bg-black transition-colors"
            >
              Save Schedule
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
});