import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { cn } from "@/lib/utils";

interface IntelligenceNodeProps {
    label: string;
    value: string;
    active?: boolean;
    protocol?: boolean;
}

export const IntelligenceNode = React.memo(({ label, value, active, protocol }: IntelligenceNodeProps) => (
    <div className={cn(
        "flex-1 flex  items-center px-4 gap-2 transition-colors",
        active && "bg-zinc-50/50"
    )}>
        <span className="text-[10px] font-mono font-black text-zinc-400 uppercase tracking-tighter shrink-0">
            {label}
        </span>
        <span className="w-1 h-1 rounded-full bg-zinc-100 shrink-0" />
        <div className="flex items-center gap-1 min-w-0">
            <span className={cn(
                "text-[10px] font-bold uppercase tracking-tight truncate",
                active ? "text-blue-600" : "text-zinc-900"
            )}>
                {value}
            </span>
            {protocol && <ShieldCheck size={10} className="text-emerald-500 shrink-0" />}
        </div>
    </div>
));

interface IntelligenceMetricProps {
    label: string;
    value: string;
    color?: string;
}

export const IntelligenceMetric = React.memo(({ label, value, color }: IntelligenceMetricProps) => (
    <div className="flex flex-col items-center justify-between">
        <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-tight">{label}</span>
        <span className={cn("text-[11px] font-bold uppercase tracking-tighter", color || "text-zinc-900")}>{value}</span>
    </div>
));