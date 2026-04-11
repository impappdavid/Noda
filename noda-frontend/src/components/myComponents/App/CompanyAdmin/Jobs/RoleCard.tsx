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
  Plus,
  Check,
  AlertTriangle,
  Terminal,
  Bell,
} from "lucide-react";
import React, { useState, useMemo, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const JobCard = React.memo(({ job }: { job: JobNode }) => {
  const [interviewDialog, setInterviewDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [confirmRole, setConfirmRole] = useState("");
  const isMatch = confirmRole === job.role;

  // Calendar & Interview States
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [interviews, setInterviews] = useState<Record<string, string[]>>({});
  const [tempTime, setTempTime] = useState("");
  const [isAddingTime, setIsAddingTime] = useState(false);

  // Auto-select today when dialog opens
  useEffect(() => {
    if (interviewDialog) {
      const today = new Date();
      setSelectedDay(today.getDate());
      setViewDate(new Date(today.getFullYear(), today.getMonth(), 1));
    }
  }, [interviewDialog]);

  const todayObj = useMemo(() => new Date(), []);

  const { paddingDays, monthDays, monthLabel } = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const label = viewDate.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    const firstDayIndex = new Date(year, month, 1).getDay();
    const startingPadding = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    return {
      paddingDays: Array.from({ length: startingPadding }),
      monthDays: Array.from({ length: daysInMonth }),
      monthLabel: label,
    };
  }, [viewDate]);

  const changeMonth = (offset: number) => {
    setViewDate(
      new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1),
    );
    setSelectedDay(null);
    setIsAddingTime(false);
  };

  const selectedDateKey = selectedDay
    ? `${viewDate.getFullYear()}-${viewDate.getMonth()}-${selectedDay}`
    : null;
  const activeDayInterviews = selectedDateKey
    ? interviews[selectedDateKey] || []
    : [];

  const handleSaveTime = () => {
    if (selectedDay && tempTime && selectedDateKey) {
      setInterviews((prev) => ({
        ...prev,
        [selectedDateKey]: [...(prev[selectedDateKey] || []), tempTime].sort(),
      }));
      setIsAddingTime(false);
      setTempTime("");
    }
  };

  const handleDeleteTime = (timeToDelete: string) => {
    if (!selectedDateKey) return;
    setInterviews((prev) => ({
      ...prev,
      [selectedDateKey]: prev[selectedDateKey].filter(
        (time) => time !== timeToDelete,
      ),
    }));
  };

  const handleDeleteRole = () => {
    // Implement your delete logic here
    console.log("Deleting role:", job.role);
    setDeleteDialog(false);
  };

  return (
    <>
      {/* JOB CARD UI */}
      <div className="p-2 bg-white hover:bg-zinc-100 group transition-all cursor-pointer group flex items-center justify-between border-b border-zinc-300">
        <div className="flex flex-col gap-1 w-full">
          <div className="flex justify-between h-fit">
            <div className="w-8 h-8 bg-zinc-800 text-white flex items-center justify-center border border-zinc-800 shrink-0 uppercase font-bold text-xs font-mono">
              {job.role.substring(0, 2)}
            </div>

            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <div className="p-1 hover:bg-zinc-300/80 cursor-pointer text-zinc-500 h-fit aspect-square">
                  <EllipsisVertical className="w-3.5 h-3.5" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-36 p-0 rounded-none border-zinc-300 shadow-none"
                align="end"
              >
                <DropdownMenuGroup className="divide-y divide-zinc-300">
                  <DropdownMenuItem
                    onClick={() => setInterviewDialog(true)}
                    className="rounded-none hover:bg-zinc-100 px-2 py-1.5 text-[11px] text-zinc-600 cursor-pointer gap-2"
                  >
                    <Calendar1 className="h-3.5 w-3.5 text-zinc-400" />
                    <span>Interview Dates</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setDeleteDialog(true)}
                    className="rounded-none hover:bg-zinc-100 px-2 py-1.5 text-[11px] text-red-500 cursor-pointer gap-2"
                  >
                    <Trash className="h-3.5 w-3.5" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex flex-col w-full">
            <h5 className="text-sm font-bold uppercase tracking-tight group-hover:underline">
              {job.role}
            </h5>
            <div className="flex items-center gap-1 text-[11px] text-zinc-500 group-hover:text-zinc-700">
              <span>Remote</span>
              <span className="opacity-30">•</span>
              <span>Full-Time</span>
              <span className="opacity-30">•</span>
              <span>0-1 year</span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-[9px] font-mono font-bold text-zinc-400 group-hover:text-zinc-600 uppercase">
                {job.applicants} Applies
              </span>
              <span className="text-[9px] font-mono font-bold text-zinc-400 group-hover:text-zinc-600 uppercase">
                {job.deadline} to reply
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* DELETE CONFIRMATION DIALOG */}
      <Dialog open={deleteDialog} onOpenChange={setDeleteDialog}>
        <DialogContent className="max-w-[360px] p-0 rounded-none border-none gap-0 outline-none flex flex-col h-fit">
          <DialogHeader className="bg-red-600 p-1.5 px-2 border-b border-zinc-300 flex justify-between w-full items-center space-y-0">
            <DialogTitle className="text-[12px] tracking-wider text-white flex gap-1 items-center">
              <AlertTriangle size={16} className="text-white shrink-0" />
              Are you sure?
            </DialogTitle>
            <button
              onClick={() => setDeleteDialog(false)}
              className="hover:bg-black/40 cursor-pointer p-1 transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </DialogHeader>

          <div className="flex flex-col">
            <div className="border-b border-zinc-300 p-4 ">
              <div className="flex items-start gap-3">
                <AlertTriangle size={18} className="text-black shrink-0" />
                <div className="space-y-2">
                  <p className="text-xs tracking-tight text-black leading-tight">
                    This action <span className="font-bold">CANNOT</span> be undone. This will permanently delete
                    the
                    <span className="underline text-black font-bold px-1">
                      {job.role}
                    </span>
                    role.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-b border-zinc-300 p-4 ">
              <div className="flex items-start gap-3">
                <Bell size={18} className="text-black shrink-0" />
                <div className="space-y-2">
                  <p className="text-xs text-black leading-tight">
                    All applicants will be notified instantly about this role deletion.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="bg-white p-2 space-y-1 border-b border-zinc-300">
              <label className="text-[9px] font-mono font-bold text-zinc-600 uppercase tracking-wider block leading-none">
                Please type in the role name to confirm.
              </label>
              <div className="relative flex items-center h-6">
                <Terminal className="w-3 h-3 text-zinc-500 mr-2" />
                <input
                  value={confirmRole}
                  onChange={(e) => setConfirmRole(e.target.value)}
                  placeholder="Role name"
                  className="w-full text-xs outline-none bg-transparent"
                />
              </div>
            </div>
          </div>

          <div className="flex">
            <button
              disabled={!isMatch}
              onClick={handleDeleteRole}
              className={`flex-1 py-3 text-[10px] font-mono font-black uppercase tracking-widest transition-all
            ${
              isMatch
                ? "bg-red-500 text-white hover:bg-red-600 cursor-pointer"
                : "bg-red-500/50 text-white cursor-not-allowed opacity-50"
            }`}
            >
              Delete Role
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* CALENDAR DIALOG */}
      <Dialog open={interviewDialog} onOpenChange={setInterviewDialog}>
        <DialogContent className="max-w-3xl p-0 rounded-none border-none gap-0 overflow-hidden outline-none shadow-2xl flex flex-col h-fit">
          <DialogHeader className="bg-zinc-100 p-1.5 flex flex-row items-center justify-between space-y-0 border-b border-zinc-300">
            <DialogTitle className="text-[11px] font-bold uppercase tracking-tight flex gap-1 items-center">
              {job.role}{" "}
              <span className="text-zinc-500 font-normal">
                | Interview Calendar
              </span>
            </DialogTitle>
            <button
              onClick={() => setInterviewDialog(false)}
              className="hover:bg-zinc-300 cursor-pointer p-1 transition-colors"
            >
              <X className="w-4 h-4 text-zinc-500" />
            </button>
          </DialogHeader>

          <div className="flex flex-row flex-1 overflow-hidden">
            <div className="flex-1 flex flex-col bg-white overflow-y-auto">
              <div className="flex items-center justify-between border-b border-zinc-300 sticky top-0 bg-white z-10">
                <button
                  onClick={() => changeMonth(-1)}
                  className="p-1 hover:bg-zinc-300/80 border-r px-2 border-zinc-300 h-full cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-2">
                  {monthLabel}
                </span>
                <button
                  onClick={() => changeMonth(1)}
                  className="p-1 hover:bg-zinc-300/80 border-l px-2 border-zinc-300 h-full cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-7 bg-zinc-100 border-b border-zinc-300 sticky z-10">
                {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
                  <div
                    key={d}
                    className="p-1.5 text-[9px] font-bold text-center text-zinc-600 border-r border-zinc-300 last:border-r-0"
                  >
                    {d}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 ">
                {paddingDays.map((_, i) => (
                  <div
                    key={`pad-${i}`}
                    className="aspect-square bg-zinc-50/30 border-r border-b border-zinc-300"
                  />
                ))}

                {monthDays.map((_, i) => {
                  const day = i + 1;
                  const dateKey = `${viewDate.getFullYear()}-${viewDate.getMonth()}-${day}`;
                  const dayInterviews = interviews[dateKey] || [];
                  const isSelected = selectedDay === day;
                  const isToday =
                    todayObj.getDate() === day &&
                    todayObj.getMonth() === viewDate.getMonth() &&
                    todayObj.getFullYear() === viewDate.getFullYear();

                  return (
                    <div
                      key={day}
                      onClick={() => {
                        setSelectedDay(day);
                        setIsAddingTime(false);
                      }}
                      className={`p-2 aspect-square flex flex-col justify-between cursor-pointer transition-all border-r border-b border-zinc-300
                        ${isSelected ? "bg-blue-500 text-white" : isToday ? "bg-zinc-200" : "hover:bg-zinc-200"}
                      `}
                    >
                      <span
                        className={`text-[10px] font-mono font-bold
                        ${isSelected ? "text-white" : isToday ? "text-zinc-600" : "text-zinc-500"}`}
                      >
                        {day.toString().padStart(2, "0")}
                      </span>
                      {dayInterviews.length > 0 && (
                        <div className="flex justify-end gap-0.5 flex-wrap max-w-full">
                          {dayInterviews.map((_, dotIdx) => (
                            <div
                              key={dotIdx}
                              className={`w-1 h-1 rounded-full ${isSelected ? "bg-white" : "bg-blue-500"}`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="w-64 bg-zinc-50 flex flex-col border-l border-zinc-300">
              <div className=" border-b border-zinc-300 bg-zinc-100/50 flex items-center justify-between ">
                <h6 className="text-[10px] p-2 font-bold uppercase text-zinc-800 flex items-center gap-1">
                  <Calendar1 className="w-3 h-3" />
                  {selectedDay
                    ? `${selectedDay} ${viewDate.toLocaleString("default", { month: "short" })}`
                    : "Schedule"}
                </h6>
                {selectedDay && !isAddingTime && (
                  <button
                    onClick={() => setIsAddingTime(true)}
                    className="p-1 h-full px-4 bg-blue-500 text-white text-[10px] hover:bg-blue-600 cursor-pointer transition-colors"
                  >
                    Add New Time
                  </button>
                )}
              </div>

              <div className="flex-1 overflow-y-auto flex flex-col ">
                {!selectedDay ? (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-40 py-10">
                    <Calendar1 className="w-6 h-6 mb-2" />
                    <p className="text-[9px] font-bold uppercase">
                      Select a date
                    </p>
                  </div>
                ) : (
                  <>
                    {isAddingTime && (
                      <div className="p-2 bg-white border-t border-zinc-300 shadow-sm animate-in slide-in-from-top-1 duration-200">
                        <input
                          type="time"
                          className="text-xs w-full border border-zinc-200 p-1.5 outline-none mb-2 font-mono"
                          value={tempTime}
                          onChange={(e) => setTempTime(e.target.value)}
                          autoFocus
                        />
                        <div className="flex gap-1">
                          <button
                            onClick={handleSaveTime}
                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-1 text-[9px] font-bold transition-colors uppercase cursor-pointer"
                          >
                            Add
                          </button>
                          <button
                            onClick={() => setIsAddingTime(false)}
                            className="flex-1 border hover:bg-zinc-200 border-zinc-300 py-1 text-[9px] font-bold transition-colors uppercase cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="">
                      {activeDayInterviews.map((time, idx) => (
                        <div
                          key={idx}
                          className="flex items-stretch justify-between bg-white border-y border-zinc-300 group hover:bg-zinc-200/80 transition-colors"
                        >
                          <div className="flex items-center gap-2 px-2 py-1.5">
                            <Clock className="w-3 h-3 text-blue-600" />
                            <span className="text-[11px] font-mono font-bold text-zinc-700">
                              {time}
                            </span>
                          </div>

                          <button
                            onClick={() => handleDeleteTime(time)}
                            className="flex items-center justify-center text-zinc-400 hover:text-red-500 px-2 transition-colors border-l hover:bg-red-500/10 border-zinc-300 cursor-pointer"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div>
                <button
                  onClick={() => setInterviewDialog(false)}
                  className="w-full py-2.5 bg-zinc-800 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-900 cursor-pointer transition-colors flex items-center justify-center gap-2"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
});
