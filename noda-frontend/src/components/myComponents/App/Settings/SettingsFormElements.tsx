import React from 'react';
import { cn } from "@/lib/utils";
import type { SettingFieldProps, ToggleRowProps } from '@/types/settings';

export const SettingField = React.memo(({ label, type = "text", defaultValue }: SettingFieldProps) => (
    <div className="space-y-2 text-left">
        <label className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-[0.2em]">
            {label}
        </label>
        <input 
            type={type} 
            defaultValue={defaultValue}
            className="w-full px-4 py-3 border border-zinc-200 bg-white font-mono text-[11px] font-bold outline-none focus:border-zinc-900 focus:bg-zinc-50/30 transition-all"
        />
    </div>
));

export const ToggleRow = React.memo(({ title, desc, active }: ToggleRowProps) => (
    <div className="p-4 flex items-center justify-between border border-zinc-300 hover:bg-zinc-50/50 transition-colors cursor-pointer group">
        <div className="space-y-1 text-left">
            <h4 className="text-[11px] font-bold uppercase text-zinc-900">{title}</h4>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-tight max-w-sm">{desc}</p>
        </div>
        <div className={cn(
            "w-10 h-5 border-2 flex items-center px-0.5 transition-all duration-300",
            active ? "bg-zinc-900 border-zinc-900 justify-end" : "bg-zinc-100 border-zinc-300 justify-start"
        )}>
            <div className="w-3.5 h-3.5 bg-white shadow-sm" />
        </div>
    </div>
));