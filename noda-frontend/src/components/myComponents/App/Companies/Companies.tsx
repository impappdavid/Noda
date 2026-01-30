import { useState } from 'react';
import { Search, Globe, Users, Star, MessageSquare, ShieldAlert } from 'lucide-react';
import Navbar from '../navbar';
import AppSideBar from '../Sidebar';

// 1. Company Mock Data
const companyData = [
    { id: 1, name: "Vercel", industry: "Cloud Infrastructure", employees: "500-1000", rating: 4.8, tech: ["React", "Next.js", "Rust"], responseVelocity: "98%", reviews: 124 },
    { id: 2, name: "Linear", industry: "Software", employees: "50-100", rating: 4.9, tech: ["TypeScript", "Rust", "Go"], responseVelocity: "94%", reviews: 82 },
    { id: 3, name: "Stripe", industry: "Fintech", employees: "5000+", rating: 4.7, tech: ["Ruby", "Go", "React"], responseVelocity: "89%", reviews: 342 }
];

const AppCompanies = () => {
    const [selectedCompany, setSelectedCompany] = useState(companyData[0]);
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
            <Navbar />

            <div className="flex flex-1 w-full max-w-4xl mx-auto px-6 overflow-hidden">
                <AppSideBar />

                {/* MAIN CONTENT AREA: 734px wide (367px + 367px) */}
                <main className="flex flex-1 max-w-3xl border-x border-zinc-300 ml-4 h-full overflow-hidden bg-white">

                    {/* LEFT PANE: Search & List (367px) */}
                    <div className="w-1/2 h-full flex flex-col border-r border-zinc-300 pt-13">
                        {/* Minimalist Search Protocol */}
                        <div className=" border-b border-zinc-300 bg-white sticky top-0 z-10">
                            <div className="relative group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 group-focus-within:text-zinc-900 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search companies..."
                                    className="w-full rounded-none bg-zinc-100 h-12 py-2 pl-9 pr-4 text-xs outline-none transition-all"
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    value={searchQuery}
                                />
                            </div>
                        </div>

                        {/* Company List */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar">
                            {companyData.map((company) => (
                                <div
                                    key={company.id}
                                    onClick={() => setSelectedCompany(company)}
                                    className={`p-3 border-b border-zinc-300 cursor-pointer transition-all flex items-center gap-3 ${selectedCompany.id === company.id ? "bg-zinc-300" : "hover:bg-zinc-200/80"
                                        }`}
                                >
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 text-white ${selectedCompany.id === company.id ? "bg-zinc-800" : "bg-zinc-800 "
                                        }`}>
                                        {company.name[0]}
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <h3 className={`text-xs font-bold truncate ${selectedCompany.id === company.id ? "text-black" : "text-zinc-900"}`}>
                                            {company.name}
                                        </h3>
                                        <span className={`text-[10px] truncate ${selectedCompany.id === company.id ? "text-zinc-500" : "text-zinc-500"}`}>
                                            {company.industry}
                                        </span>
                                    </div>
                                    <div className="ml-auto flex items-center gap-1">
                                        <Star size={10} className={selectedCompany.id === company.id ? "text-orange-400" : "text-orange-500"} fill="currentColor" />
                                        <span className={`text-[10px] font-mono font-bold ${selectedCompany.id === company.id ? "text-black" : "text-zinc-900"}`}>
                                            {company.rating}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT PANE: Company Intelligence Preview (367px) */}
                    <div className="w-1/2 h-full flex flex-col bg-white overflow-hidden pt-12">
                        <div className="p-6 overflow-y-auto flex-1">
                            {/* Company Header */}
                            <div className="flex items-start justify-between mb-8">
                                <div className="space-y-1">
                                    <h2 className="text-xl font-bold tracking-tight">{selectedCompany.name}</h2>
                                    <div className="flex items-center gap-3 text-xs text-zinc-500">
                                        <span className="flex items-center gap-1"><Globe size={12} /> Website</span>
                                        <span className="flex items-center gap-1"><Users size={12} /> {selectedCompany.employees}</span>
                                    </div>
                                </div>
                                {/* Minimalist Response Signal */}
                                <div className="flex flex-col items-end shrink-0">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-xl font-mono font-bold text-zinc-900 tracking-tighter">
                                            {selectedCompany.responseVelocity}
                                        </span>
                                    </div>
                                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                                        Velocity
                                    </span>
                                </div>
                            </div>

                            {/* Intelligence Cards */}
                            <div className="grid grid-cols-2 gap-3 mb-8">
                                <div className="p-3 rounded-2xl bg-zinc-50 border border-zinc-300">
                                    <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase block mb-1">Network Rating</span>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-lg font-bold">{selectedCompany.rating}</span>
                                        <span className="text-[10px] text-zinc-400">/ 5.0</span>
                                    </div>
                                </div>
                                <div className="p-3 rounded-2xl bg-zinc-50 border border-zinc-300">
                                    <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase block mb-1">Total Signals</span>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-lg font-bold">{selectedCompany.reviews}</span>
                                        <span className="text-[10px] text-zinc-400">Reviews</span>
                                    </div>
                                </div>
                            </div>

                            {/* Signal Toggles (Placeholder for Anonymous Feed) */}
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-50 pb-2">Recent Intelligence</h4>

                                <div className="p-3 rounded-xl border border-zinc-100 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-5 h-5 rounded-full bg-zinc-900 flex items-center justify-center"><ShieldAlert size={10} className="text-white" /></div>
                                            <span className="text-[10px] font-bold text-zinc-900">@encrypted</span>
                                        </div>
                                        <span className="text-[9px] text-zinc-400 font-mono">2h ago</span>
                                    </div>
                                    <p className="text-[11px] text-zinc-600 leading-relaxed italic">
                                        "Internal promotion velocity is high, but technical debt in the legacy cluster is significant. Recommended for frontend roles."
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Fixed Action Footer */}
                        <div className="p-4 bg-zinc-50/50 border-t border-zinc-100 mt-auto">
                            <button className="w-full bg-zinc-900 text-white rounded-xl h-11 text-xs font-bold flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all">
                                Write a Signal <MessageSquare size={14} />
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AppCompanies;