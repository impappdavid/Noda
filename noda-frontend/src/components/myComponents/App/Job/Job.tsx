import React from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Navbar from '../AppNavbar';
import AppSideBar from '../Sidebar';
import JobSidebar from './JobSidebar';
import { IntelligenceNode } from './JobComponents';

const JOB_MOCK_DATA = {
    id: "0x7F4",
    title: "Lead Systems Architect",
    company: "Rust Foundation",
    location: "San Francisco, CA",
    pay: "$180k - $240k",
    recruiter: { name: "Marcus Vane", initials: "MV", role: "Talent Lead" },
    analytics: { rating: "4.8/5.0", velocity: "High", nodes: "2.4k Eng" }
};

const JobDetail: React.FC = () => {
    return (
        <div className="h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
            <Navbar />

            <div className="max-w-4xl mx-auto px-6 flex flex-1 w-full gap-4 overflow-hidden">
                <aside className="w-24 shrink-0">
                    <AppSideBar />
                </aside>

                <main className="flex flex-1 border-x border-zinc-300 h-full overflow-hidden bg-white pt-13">
                    {/* LEFT PANE */}
                    <div className="flex-[3] flex flex-col border-r border-zinc-300 h-full relative">
                        <header className="flex w-full items-center border-b border-zinc-300 bg-white sticky top-0 z-30 h-10 divide-x divide-zinc-200 shrink-0">
                            <button className="px-4 h-full hover:bg-zinc-50 transition-colors flex items-center gap-2 group cursor-pointer border-none outline-none">
                                <ArrowLeft size={12} />
                                <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Return</span>
                            </button>
                            <div className="flex-1 px-4 flex items-center">
                                <span className="text-xs font-mono font-black text-zinc-400 uppercase tracking-tighter">NODE: JOB_{JOB_MOCK_DATA.id}</span>
                            </div>
                        </header>

                        <div className="flex-1 overflow-y-auto scrollbar-hide">
                            <div className="p-4">
                                <h1 className="text-3xl font-black uppercase tracking-tighter leading-none mb-3">
                                    {JOB_MOCK_DATA.title}
                                </h1>
                                <div className="flex items-center gap-2 text-[11px] font-mono font-black uppercase tracking-widest text-zinc-400 mb-6">
                                    <span className="text-zinc-900">{JOB_MOCK_DATA.company}</span>
                                    <span className="opacity-30">•</span>
                                    <span className='text-zinc-500'>{JOB_MOCK_DATA.location}</span>
                                </div>

                                <div className="flex w-full border-y border-zinc-200 bg-white h-10 mb-8 shrink-0 divide-x divide-zinc-200">
                                    <IntelligenceNode label="PAY" value={JOB_MOCK_DATA.pay} />
                                    <IntelligenceNode label="MODE" value="Hybrid" active />
                                    <IntelligenceNode label="TYPE" value="Full-time" />
                                    <IntelligenceNode label="VLY" value="~24H" protocol />
                                </div>

                                <section className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <h4 className="text-xs font-mono font-semibold text-zinc-900 uppercase tracking-[0.2em]">Specification</h4>
                                        <div className="h-[1px] flex-1 bg-zinc-300"></div>
                                    </div>
                                    <p className="text-xs text-zinc-600 leading-relaxed tracking-tight">
                                        We are seeking a Lead Systems Architect to oversee the development of memory-safe distributed protocols. Proficiency in Rust and low-level systems design is mandatory. This role requires direct management of senior engineers and weekly reporting to the Infrastructure Board.
                                    </p>
                                </section>
                            </div>
                        </div>

                        <button className="w-full bg-zinc-900 h-14 border-t border-zinc-800 flex items-center justify-center gap-4 hover:bg-black transition-all group shrink-0 border-none cursor-pointer">
                            <span className="text-xs font-semibold text-white uppercase tracking-[0.2em]">Deploy Application</span>
                            <ArrowUpRight className="w-5 h-5 text-white" />
                        </button>
                    </div>

                    {/* RIGHT PANE */}
                    <JobSidebar recruiter={JOB_MOCK_DATA.recruiter} analytics={JOB_MOCK_DATA.analytics} />
                </main>
            </div>
        </div>
    );
};

export default JobDetail;