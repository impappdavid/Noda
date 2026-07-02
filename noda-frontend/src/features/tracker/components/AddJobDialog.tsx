import React, { useState } from 'react';
import { AlertTriangle, Globe, Briefcase, Link as LinkIcon, Calendar, DollarSign, CheckCircle2 } from 'lucide-react';
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface AddNodeModalProps {
    onClose: () => void;
}

const AddNodeModal: React.FC<AddNodeModalProps> = ({ onClose }) => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            onClose();
        }, 2000);
    };

    return (
        <DialogContent className="sm:max-w-md bg-white border-none rounded-none p-0 overflow-hidden shadow-2xl">
            <DialogHeader className="p-4 bg-zinc-800 text-white flex flex-row items-center justify-between space-y-0 shrink-0">
                <div className="flex items-center gap-2">
                    <AlertTriangle size={16} className="text-orange-500" />
                    <DialogTitle className="text-[11px] font-mono font-black uppercase tracking-widest">
                        Protocol: New_Node_Deployment
                    </DialogTitle>
                </div>
            </DialogHeader>

            {!submitted ? (
                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <InputGroup label="Company_ID" icon={<Globe size={14} />} placeholder="TARGET COMPANY..." />
                        <InputGroup label="Node_Role" icon={<Briefcase size={14} />} placeholder="SYSTEM ROLE..." />
                    </div>
                    <InputGroup label="Source_Link" icon={<LinkIcon size={14} />} placeholder="HTTP://SIGNAL.SOURCE..." type="url" />
                    <div className="grid grid-cols-2 gap-4">
                        <InputGroup label="Deployment_Date" icon={<Calendar size={14} />} type="date" />
                        <InputGroup label="Pay_Range" icon={<DollarSign size={14} />} placeholder="e.g. $180k..." />
                    </div>
                    <div className="flex gap-2 pt-4">
                        <button type="button" onClick={onClose} className="flex-1 h-10 border border-zinc-300 text-[10px] font-mono font-black uppercase hover:bg-zinc-50 transition-colors">
                            Abort
                        </button>
                        <button type="submit" className="flex-2 h-10 bg-zinc-800 text-white text-[10px] font-mono font-black uppercase hover:bg-zinc-900 transition-colors">
                            Initialize_Deployment
                        </button>
                    </div>
                </form>
            ) : (
                <div className="p-12 flex flex-col items-center justify-center text-center animate-in zoom-in duration-300">
                    <CheckCircle2 size={46} className="text-emerald-500 mb-4" />
                    <h3 className="text-sm font-black uppercase tracking-widest mb-1">Node_Deployed</h3>
                    <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest">Entry added to local schematic</p>
                </div>
            )}
        </DialogContent>
    );
};

// Internal Helper for form inputs
const InputGroup = ({ label, icon, ...props }: any) => (
    <div className="space-y-1.5">
        <label className="text-[10px] font-mono font-black uppercase text-zinc-500 block">{label}</label>
        <div className="relative">
            <div className="absolute left-3 top-2.5 text-zinc-500">{icon}</div>
            <input 
                required 
                className="w-full h-9 bg-zinc-50 border border-zinc-200 pl-9 pr-3 text-xs font-mono font-bold uppercase outline-none focus:border-zinc-900" 
                {...props} 
            />
        </div>
    </div>
);

export default AddNodeModal;