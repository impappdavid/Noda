import React from "react";
import { Star } from "lucide-react";
import type { Company } from "@/types/companies";

interface ListProps {
    companyData: Company[];
    selectedCompany: Company;
    setSelectedCompany: (c: Company) => void;
}

const CompanyList = ({ companyData, selectedCompany, setSelectedCompany }: ListProps) => {
    return (
        <div className="flex-1 overflow-y-auto scrollbar-hide">
            {companyData.length > 0 ? (
                companyData.map((company) => {
                    const isSelected = selectedCompany.id === company.id;
                    return (
                        <div
                            key={company.id}
                            onClick={() => setSelectedCompany(company)}
                            className={`p-3 border-b border-zinc-300 cursor-pointer transition-all flex items-center gap-3 ${
                                isSelected ? "bg-zinc-200" : "hover:bg-zinc-200/60"
                            }`}
                        >
                            <div className="w-10 h-10 bg-zinc-300 flex items-center justify-center font-bold text-xs shrink-0 text-zinc-900">
                                {company.name[0]}
                            </div>
                            <div className="flex flex-col min-w-0">
                                <h3 className={`text-xs font-bold truncate ${isSelected ? "text-black" : "text-zinc-900"}`}>
                                    {company.name}
                                </h3>
                                <span className="text-[10px] truncate text-zinc-500">
                                    {company.industry}
                                </span>
                            </div>
                            <div className="ml-auto flex items-center gap-1">
                                <Star size={10} className="text-orange-500" fill="currentColor" />
                                <span className={`text-[10px] font-mono font-bold ${isSelected ? "text-black" : "text-zinc-900"}`}>
                                    {company.rating}
                                </span>
                            </div>
                        </div>
                    );
                })
            ) : (
                <div className="p-8 text-center text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                    No results found
                </div>
            )}
        </div>
    );
};

export default React.memo(CompanyList);