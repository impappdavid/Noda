import React from "react";
import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Company } from "@/types/companies";

interface ListProps {
    companyData: Company[];
    selectedCompany: Company;
    setSelectedCompany: (c: Company) => void;
}

const CompanyList = ({ companyData, selectedCompany, setSelectedCompany }: ListProps) => {
    return (
        <div className="flex-1 overflow-y-auto scrollbar-hide bg-white">
            {companyData.length > 0 ? (
                <div className="flex flex-col">
                    {companyData.map((company) => {
                        const isSelected = selectedCompany.id === company.id;
                        return (
                            <div
                                key={company.id}
                                onClick={() => setSelectedCompany(company)}
                                className={cn(
                                    "relative h-14 border-b border-zinc-300 cursor-pointer transition-all flex items-center group",
                                    isSelected ? "bg-zinc-100" : "hover:bg-zinc-50"
                                )}
                            >
                                {/* 1. SELECTION INDICATOR */}
                                {isSelected && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-zinc-900 animate-in fade-in slide-in-from-left-1" />
                                )}

                                {/* 2. SQUARED LOGO NODE */}
                                <div className={cn(
                                    "w-14 h-14 flex items-center justify-center font-black text-xs shrink-0 transition-colors border-r border-b border-zinc-300",
                                    isSelected ? "bg-zinc-800 text-white" : "bg-zinc-100 text-zinc-400 group-hover:text-zinc-900"
                                )}>
                                    {company.name[0].toUpperCase()}
                                </div>

                                {/* 3. COMPANY INTEL */}
                                <div className="flex flex-col px-3 min-w-0 flex-1">
                                    <h3 className="text-[11px] font-bold uppercase tracking-tight truncate leading-tight">
                                        {company.name}
                                    </h3>
                                    <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest truncate mt-0.5">
                                        {company.industry || "General_Sector"}
                                    </span>
                                </div>

                                {/* 4. SIGNAL TELEMETRY (Right Side) */}
                                <div className="flex flex-col items-end px-4 shrink-0 border-l border-zinc-100 h-full justify-center">
                                    <span className="text-[8px] font-mono font-black text-zinc-400 uppercase leading-none mb-1">
                                        Signals
                                    </span>
                                    <div className="flex items-center gap-1.5">
                                        <Zap size={10} className={cn(
                                            isSelected ? "text-blue-500" : "text-zinc-500"
                                        )} />
                                        <span className="text-xs font-black font-mono tracking-tighter">
                                            {/* Assuming company object has a signal count, otherwise fallback */}
                                            000
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="p-12 text-center border-b border-zinc-200">
                    <span className="text-[10px] font-mono font-black text-zinc-400 uppercase tracking-[0.3em]">
                        No Company Found
                    </span>
                </div>
            )}
        </div>
    );
};

export default React.memo(CompanyList);