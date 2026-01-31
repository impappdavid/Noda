import { Star } from "lucide-react";

const CompanyList = ({ companyData, selectedCompany, setSelectedCompany }: any) => {
    return (
        <>
            <div className="flex-1 overflow-y-auto scrollbar-hide">
                {companyData.map((company : any) => {
                    const isSelected = selectedCompany.id === company.id;
                    return (
                        <div
                            key={company.id}
                            onClick={() => setSelectedCompany(company)}
                            className={`p-3 border-b border-zinc-300 cursor-pointer transition-all flex items-center gap-3 ${isSelected ? "bg-zinc-800" : "hover:bg-zinc-100"
                                }`}
                        >
                            <div className="w-10 h-10 rounded-xl bg-zinc-200 flex items-center justify-center font-bold text-xs shrink-0 text-zinc-900">
                                {company.name[0]}
                            </div>
                            <div className="flex flex-col min-w-0">
                                <h3 className={`text-xs font-bold truncate ${isSelected ? "text-white" : "text-zinc-900"}`}>
                                    {company.name}
                                </h3>
                                <span className={`text-[10px] truncate ${isSelected ? "text-zinc-400" : "text-zinc-500"}`}>
                                    {company.industry}
                                </span>
                            </div>
                            <div className="ml-auto flex items-center gap-1">
                                <Star size={10} className="text-orange-500" fill="currentColor" />
                                <span className={`text-[10px] font-mono font-bold ${isSelected ? "text-white" : "text-zinc-900"}`}>
                                    {company.rating}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    )
}
export default CompanyList