import React, { useState } from 'react';
import { Activity, ExternalLink, Plus, Link as LinkIcon, Clock, Building2, Zap, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
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
    onAdd: (node: Omit<InterviewNode, 'id' | 'month' | 'year' | 'date'>) => void;
}

const ActivityDialog: React.FC<ActivityDialogProps> = ({
    isOpen, onOpenChange, selectedDate, currentMonthName, activities, showAddForm, setShowAddForm, onAdd
}) => {
    const [formData, setFormData] = useState({ company: '', type: '', hour: '12:00', jobLink: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAdd(formData);
        setFormData({ company: '', type: '', hour: '12:00', jobLink: '' });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[450px] p-0 rounded-none border-none shadow-none overflow-hidden bg-white gap-0">
                
                {/* ENHANCED HEADER STYLE */}
                <DialogHeader className="bg-blue-500 p-1.5 px-2 border-b border-zinc-300 flex flex-row items-center justify-between space-y-0 w-full">
                    <DialogTitle className="text-[12px] font-bold tracking-wide uppercase text-white flex gap-1.5 items-center">
                        <Activity size={16} className="text-white shrink-0" />
                        Node Activity
                    </DialogTitle>
                    <DialogClose asChild>
                        <button className="hover:bg-black/40 cursor-pointer p-1 transition-colors outline-none border-none">
                            <X className="w-4 h-4 text-white" />
                        </button>
                    </DialogClose>
                </DialogHeader>

                <div className="max-h-[70vh] overflow-y-auto scrollbar-hide">
                    {activities.length > 0 && !showAddForm ? (
                        <div className="flex flex-col">
                            
                            {/* SECTION HEADER */}
                            <div className="p-2 pb-1.5 bg-white">
                                <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-1">
                                    Active Sequences // {currentMonthName} {selectedDate}
                                </span>
                            </div>

                            {/* LIST OF INTERVIEW NODES */}
                            <div className="bg-zinc-50 border-t border-b border-zinc-300 divide-y divide-zinc-300">
                                {activities.map((act) => (
                                    <div 
                                        key={act.id}
                                        onClick={() => act.jobLink && window.open(act.jobLink, '_blank')}
                                        className="p-2 bg-white flex flex-col cursor-pointer hover:bg-zinc-200/80 transition-colors group"
                                    >
                                        <div className="flex items-center justify-between mb-1">
                                            <div className="flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase">
                                                <span className="text-zinc-900 bg-zinc-100 px-1 border border-zinc-200 shadow-sm">
                                                    {act.hour}
                                                </span>
                                                <span className={cn(act.status === "Confirmed" ? "text-emerald-600" : "text-amber-600")}>
                                                    {act.status}
                                                </span>
                                            </div>
                                            <div className="text-zinc-500 group-hover:text-zinc-900 text-[9px] font-mono uppercase tracking-tight transition-colors">
                                                {act.type}
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between mt-1">
                                            <h3 className="text-[11px] font-black uppercase tracking-tight text-zinc-900 truncate">
                                                {act.company}
                                            </h3>
                                            {act.jobLink && (
                                                <ExternalLink size={12} className="text-zinc-300 group-hover:text-zinc-900 transition-colors" />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* BOTTOM VOID TRIGGER ACTION */}
                            <button 
                                onClick={() => setShowAddForm(true)}
                                className="h-10 bg-white hover:bg-zinc-100 font-mono font-black text-[10px] uppercase cursor-pointer transition-colors flex items-center justify-center gap-2 border-none outline-none"
                            >
                                <Plus size={12} /> Deploy Secondary Activity
                            </button>
                        </div>
                    ) : (
                        /* BRUTALIST DATA INPUT LAYOUT */
                        <form onSubmit={handleSubmit} className="flex flex-col">
                            
                            {/* DATA GRID BLOCK 1 */}
                            <div className="bg-zinc-50 border-b border-zinc-300">
                                <div className="grid grid-cols-2 divide-x divide-zinc-300">
                                    <div className="text-[10px] font-bold p-2 flex flex-col gap-1.5 uppercase text-zinc-900">
                                        <div className="font-mono text-[8px] font-bold text-zinc-500 flex items-center gap-1">
                                            <Building2 size={10} /> Company Target
                                        </div>
                                        <input 
                                            required
                                            value={formData.company}
                                            onChange={e => setFormData({...formData, company: e.target.value})}
                                            placeholder="CORP_NODE" 
                                            className="w-full h-6 bg-transparent text-[11px] font-mono font-bold outline-none border-none p-0 placeholder:text-zinc-300 uppercase" 
                                        />
                                    </div>
                                    <div className="text-[10px] font-bold p-2 flex flex-col gap-1.5 uppercase text-zinc-900">
                                        <div className="font-mono text-[8px] font-bold text-zinc-500 flex items-center gap-1">
                                            <Zap size={10} /> Sequence Type
                                        </div>
                                        <input 
                                            required
                                            value={formData.type}
                                            onChange={e => setFormData({...formData, type: e.target.value})}
                                            placeholder="TECHNICAL / HR" 
                                            className="w-full h-6 bg-transparent text-[11px] font-mono font-bold outline-none border-none p-0 placeholder:text-zinc-300 uppercase" 
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* DATA GRID BLOCK 2 */}
                            <div className="bg-zinc-50 border-b border-zinc-300">
                                <div className="grid grid-cols-2 divide-x divide-zinc-300">
                                    <div className="text-[10px] font-bold p-2 flex flex-col gap-1.5 uppercase text-zinc-900">
                                        <div className="font-mono text-[8px] font-bold text-zinc-500 flex items-center gap-1">
                                            <Clock size={10} /> Sync Time
                                        </div>
                                        <input 
                                            type="time"
                                            required
                                            value={formData.hour}
                                            onChange={e => setFormData({...formData, hour: e.target.value})}
                                            className="w-full h-6 bg-transparent text-[11px] font-mono font-bold outline-none border-none p-0 text-zinc-800" 
                                        />
                                    </div>
                                    <div className="text-[10px] font-bold p-2 flex flex-col gap-1.5 uppercase text-zinc-900">
                                        <div className="font-mono text-[8px] font-bold text-zinc-500 flex items-center gap-1">
                                            <LinkIcon size={10} /> Intel Link
                                        </div>
                                        <input 
                                            type="url"
                                            value={formData.jobLink}
                                            onChange={e => setFormData({...formData, jobLink: e.target.value})}
                                            placeholder="HTTPS://..." 
                                            className="w-full h-6 bg-transparent text-[11px] font-mono font-bold outline-none border-none p-0 placeholder:text-zinc-300" 
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* BOTTOM CONTROL ACTIONS */}
                            <div className="grid grid-cols-2">
                                <button 
                                    type="button" 
                                    onClick={() => setShowAddForm(false)} 
                                    className="h-9 bg-white hover:bg-zinc-200 font-mono font-black text-[10px] uppercase cursor-pointer transition-colors flex items-center justify-center gap-2 border-none outline-none"
                                >
                                    Abort
                                </button>
                                <button 
                                    type="submit" 
                                    className="h-9 bg-zinc-900 text-white font-mono font-black text-[10px] uppercase cursor-pointer hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 border-none outline-none"
                                >
                                    Deploy Activity
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ActivityDialog;