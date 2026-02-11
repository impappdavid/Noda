import React from 'react';
import { Activity, ExternalLink, Plus, AlertTriangle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { InterviewNode } from '@/types/calendar';

interface ActivityDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    selectedDate: number | null;
    currentMonthName: string;
    activities: InterviewNode[];
    showAddForm: boolean;
    setShowAddForm: (show: boolean) => void;
}

const ActivityDialog: React.FC<ActivityDialogProps> = ({
    isOpen, onOpenChange, selectedDate, currentMonthName, activities, showAddForm, setShowAddForm
}) => {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md rounded-none p-0 overflow-hidden bg-white border-none shadow-2xl">
                <DialogHeader className="p-4 bg-zinc-800 text-white flex flex-row items-center justify-between space-y-0">
                    <div className="flex items-center gap-2">
                        <Activity size={16} className="text-orange-500" />
                        <DialogTitle className="text-[11px] font-mono font-black uppercase tracking-[0.2em]">
                            Node_Activity // {currentMonthName} {selectedDate}
                        </DialogTitle>
                    </div>
                </DialogHeader>

                <div className="p-4 space-y-4">
                    {activities.length > 0 && !showAddForm ? (
                        <div className="space-y-4">
                            <span className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest block border-b border-zinc-100 pb-2">Active_Sequences</span>
                            {activities.map((act) => (
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
                                className="w-full py-3 border border-dashed border-zinc-300 text-[10px] font-mono font-black uppercase text-zinc-500 hover:border-zinc-900 hover:text-zinc-900 transition-all flex items-center justify-center gap-2 cursor-pointer bg-white"
                            >
                                <Plus size={14} /> Deploy_Secondary_Activity
                            </button>
                        </div>
                    ) : (
                        <form className="space-y-4">
                             <div className="p-3 bg-zinc-100 border border-zinc-300 flex items-center gap-4">
                                <AlertTriangle size={20} className="text-orange-500" />
                                <div>
                                    <p className="text-[11px] font-mono font-black uppercase text-zinc-900">Initialize_New_Sequence</p>
                                    <p className="text-[10px] font-mono text-zinc-500 uppercase">Target Date: {selectedDate} {currentMonthName}</p>
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-mono font-black uppercase text-zinc-500">Company_Target</label>
                                <input placeholder="SEARCH NODES..." className="w-full h-10 bg-zinc-50 border border-zinc-300 px-3 text-xs font-mono font-bold uppercase outline-none focus:border-zinc-900" />
                            </div>
                            {/* ... Rest of form ... */}
                            <div className="flex gap-2 pt-4">
                                <button type="button" onClick={() => onOpenChange(false)} className="flex-1 h-10 border border-zinc-300 text-[10px] font-mono font-black uppercase hover:bg-zinc-50 cursor-pointer">Abort</button>
                                <button type="submit" className="flex-[2] h-10 bg-zinc-900 text-white text-[10px] font-mono font-black uppercase hover:bg-black cursor-pointer">Deploy_Activity</button>
                            </div>
                        </form>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ActivityDialog;