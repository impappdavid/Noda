import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FormSelectorProps {
    label: string;
    defaultValue: string;
    options: { label: string; value: string }[];
}

export const FormSelector = React.memo(({ label, defaultValue, options }: FormSelectorProps) => (
    <div className="bg-white p-2 space-y-1 border-r border-b border-zinc-300">
        <label className="text-[8px] font-mono font-black text-zinc-500 uppercase tracking-widest block leading-none">
            {label}
        </label>
        <Select defaultValue={defaultValue}>
            <SelectTrigger className="h-5 w-full rounded-none border-none p-0 text-[9px] font-bold uppercase focus:ring-0 shadow-none cursor-pointer bg-transparent">
                <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper" sideOffset={4} className="rounded-none border-zinc-300 font-mono text-[10px] uppercase bg-white">
                {options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value} className="text-xs cursor-pointer">
                        {opt.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    </div>
));

export const DocButton = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
    <button className="flex items-center gap-1.5 text-[9px] font-mono font-black text-zinc-400 hover:text-zinc-900 uppercase underline underline-offset-4 decoration-zinc-200 transition-colors border-none bg-transparent cursor-pointer">
        {icon} {label}
    </button>
);