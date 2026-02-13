import React from 'react';
import { Fingerprint } from 'lucide-react';

interface InjectionProps {
    value: string;
    onChange: (val: string) => void;
    onTransmit: () => void;
}

const NodeInjectionHeader: React.FC<InjectionProps> = ({ value, onChange, onTransmit }) => (
    <div className="p-4 bg-zinc-800 text-white shrink-0">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Fingerprint size={16} className="text-orange-500" />
                <span className="text-[10px] font-mono font-black uppercase tracking-widest">Manual_Node_Injection</span>
            </div>
            <div className="flex-1 max-w-sm relative mx-4">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-zinc-400 text-[10px]">@</span>
                <input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="USERNAME_ID"
                    className="w-full h-8 bg-zinc-900 border border-zinc-600 pl-8 pr-4 text-[11px] font-mono font-bold uppercase outline-none focus:border-orange-500 transition-colors"
                />
            </div>
            <button 
                onClick={onTransmit}
                className="h-8 px-4 bg-orange-600 text-white font-mono font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-orange-700 transition-all shrink-0 cursor-pointer border-none"
            >
                Transmit_Invite 
            </button>
        </div>
    </div>
);

export default React.memo(NodeInjectionHeader);