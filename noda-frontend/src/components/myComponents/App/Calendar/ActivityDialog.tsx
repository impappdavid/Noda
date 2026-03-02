import React, { useState } from 'react';
import { Activity, ExternalLink, Plus, AlertTriangle, Link as LinkIcon, Clock, Building2, Zap } from 'lucide-react';
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
            <DialogContent className="sm:max-w-md rounded-none p-0 overflow-hidden bg-white border-none shadow-2xl">
                <DialogHeader className="p-4 bg-zinc-900 text-white flex flex-row items-center justify-between space-y-0">
                    <div className="flex items-center gap-2">
                        <Activity size={16} className="text-orange-500" />
                        <DialogTitle className="text-[11px] font-mono font-black uppercase tracking-[0.2em]">
                            Node_Activity // {currentMonthName} {selectedDate}
                        </DialogTitle>
                    </div>
                </DialogHeader>

                <div className="px-3 pb-3 space-y-3">
                    {activities.length > 0 && !showAddForm ? (
                        <div className="space-y-3">
                            <span className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest block border-b border-zinc-100 ">Active_Sequences</span>
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
                        <form onSubmit={handleSubmit} className="space-y-4">
                             
                            
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1.5">
                                    <label className="text-[9px] font-mono font-black uppercase text-zinc-500 flex items-center gap-1"><Building2 size={10}/> Company_Target</label>
                                    <input 
                                        required
                                        value={formData.company}
                                        onChange={e => setFormData({...formData, company: e.target.value})}
                                        placeholder="CORP_NODE" 
                                        className="w-full h-9 bg-zinc-50 border border-zinc-300 px-3 text-[10px] font-mono font-bold outline-none placeholder:text-zinc-500" 
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[9px] font-mono font-black uppercase text-zinc-500 flex items-center gap-1"><Zap size={10}/> Sequence_Type</label>
                                    <input 
                                        required
                                        value={formData.type}
                                        onChange={e => setFormData({...formData, type: e.target.value})}
                                        placeholder="TECHNICAL / HR" 
                                        className="w-full h-9 bg-zinc-50 border border-zinc-300 px-3 text-[10px] font-mono font-bold uppercase outline-none placeholder:text-zinc-500" 
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1.5">
                                    <label className="text-[9px] font-mono font-black uppercase text-zinc-500 flex items-center gap-1"><Clock size={10}/> Sync_Time</label>
                                    <input 
                                        type="time"
                                        required
                                        value={formData.hour}
                                        onChange={e => setFormData({...formData, hour: e.target.value})}
                                        className="w-full h-9 bg-zinc-50 border border-zinc-300 px-3 text-[10px] font-mono font-bold outline-none placeholder:text-zinc-500" 
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[9px] font-mono font-black uppercase text-zinc-500 flex items-center gap-1"><LinkIcon size={10}/> Intel_Link</label>
                                    <input 
                                        type="url"
                                        value={formData.jobLink}
                                        onChange={e => setFormData({...formData, jobLink: e.target.value})}
                                        placeholder="HTTPS://..." 
                                        className="w-full h-9 bg-zinc-50 border border-zinc-300 px-3 text-[10px] font-mono font-bold outline-none placeholder:text-zinc-500" 
                                    />
                                </div>
                            </div>

                            <div className="flex gap-2 pt-4">
                                <button type="button" onClick={() => setShowAddForm(false)} className="flex-1 h-10 border border-zinc-300 text-[10px] font-mono font-black uppercase hover:bg-zinc-50 cursor-pointer">Abort</button>
                                <button type="submit" className="flex-[2] h-10 bg-zinc-900 text-white text-[10px] font-mono font-black uppercase hover:bg-black cursor-pointer active:shadow-none transition-all">Deploy_Activity</button>
                            </div>
                        </form>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ActivityDialog;