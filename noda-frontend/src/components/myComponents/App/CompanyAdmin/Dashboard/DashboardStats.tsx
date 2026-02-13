import React from 'react';
import { cn } from "@/lib/utils";
import type { MetricRowProps, StatModuleProps } from '@/types/admin/dashboard';

export const StatModule = React.memo(({ label, value, trend, icon, isNegative }: StatModuleProps) => (
    <div className="bg-white p-4 flex flex-col justify-center transition-colors hover:bg-zinc-100">
        <div className="flex items-center gap-2 mb-1 text-zinc-500">
            {icon}
            <span className="text-[9px] font-mono font-black uppercase tracking-widest">{label}</span>
        </div>
        <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold tracking-tighter">{value}</span>
            <span className={cn(
                "text-[10px] font-mono font-black",
                isNegative ? "text-red-600" : "text-emerald-600"
            )}>
                {trend}
            </span>
        </div>
    </div>
));

export const MetricRow = React.memo(({ label, value }: MetricRowProps) => (
    <div className="flex justify-between items-center">
        <span className="text-[9px] font-mono font-black text-zinc-500 uppercase">{label}</span>
        <span className="text-[10px] font-bold uppercase text-zinc-900">{value}</span>
    </div>
));