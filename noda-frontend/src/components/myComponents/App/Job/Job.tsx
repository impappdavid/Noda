import React from 'react';
import { 
    ArrowLeft, ArrowUpRight, Copy, ShieldCheck, 
    Bookmark, Share2, DollarSign, MapPin, 
    Briefcase, Zap, User2, Flag, Clock 
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Navbar from '../AppNavbar';
import AppSideBar from '../Sidebar';
import JobSidebar from './JobSidebar';
import { IntelligenceNode } from './JobComponents';
import { Link, useNavigate } from 'react-router-dom';

const JOB_MOCK_DATA = {
    id: "0x7F4",
    title: "Lead Systems Architect",
    company: "Rust Foundation",
    location: "San Francisco, CA",
    pay: "$180k - $240k",
    workMode: "Hybrid",
    experience: "5+ Years",
    type: "Full-time",
    avgRespond: "~24H", // Swapped match for response time logic
    authorName: "Marcus Vane",
    description: `## PHASE_01: ARCHITECTURE_OVERVIEW
We are seeking a **Lead Systems Architect** to oversee the development of memory-safe distributed protocols. Proficiency in Rust and low-level systems design is mandatory.

### CORE_RESPONSIBILITIES:
* **Protocol_Sync**: Design sub-millisecond latency interconnects for global node clusters.
* **Security_Hardening**: Audit memory-safety vectors across the entire kernel-level implementation.
* **Engineering_Leadership**: Direct management of 12 senior engineers across 3 timezone clusters.

---

## PHASE_02: SPECIFICATIONS
* **Core_Logic**: Expert-level mastery of asynchronous runtime patterns in Rust.
* **Infrastructure**: Deep understanding of RDMA and high-performance interconnects.
* **Audit_Ready**: Experience leading ISO/IEC 27001 compliance for distributed architecture.`,
    recruiter: { name: "Marcus Vane", initials: "MV", role: "Talent Lead" },
    analytics: { rating: "4.8/5.0", velocity: "High", nodes: "2.4k" }
};

const JobDetail: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
            <Navbar />

            <div className="max-w-4xl mx-auto px-6 flex flex-1 w-full gap-4 overflow-hidden">
                <aside className="w-25 shrink-0 pt-8">
                    <AppSideBar />
                </aside>

                <main className="flex flex-1 border-x border-zinc-300 h-full overflow-hidden bg-white pt-12.5 flex-row">
                    {/* LEFT PANE: SYSTEM CONTENT */}
                    <div className="flex-[3] flex flex-col border-r border-zinc-300 h-full relative overflow-hidden">
                        
                        {/* 1. COMMAND HEADER - ADDED REPORT BUTTON */}
                        <header className="flex w-full items-center border-b border-zinc-300 bg-white sticky top-0 z-30 h-9 divide-x divide-zinc-300 shrink-0">
                            <button onClick={() => navigate(-1)} className="px-3 h-full hover:bg-zinc-100 transition-colors flex items-center gap-2 group cursor-pointer outline-none border-r border-zinc-300">
                                <ArrowLeft size={12} className="text-zinc-500 group-hover:text-zinc-900" />
                                <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">Return</span>
                            </button>
                            <div className="flex h-full px-3 items-center w-full justify-between">
                                <span className="text-[10px] font-mono font-black text-zinc-400 uppercase tracking-tighter italic">
                                    JOB ID: {JOB_MOCK_DATA.id}
                                </span>
                                <div className="flex items-center h-full -mr-3 divide-x divide-zinc-300 border-l border-zinc-300">
                                    <button className="px-3 h-full hover:bg-zinc-100 transition-colors cursor-pointer outline-none group" title="Copy Node ID">
                                        <Copy size={13} className="text-zinc-400 group-hover:text-zinc-900" />
                                    </button>
                                    <button className="px-3 h-full hover:bg-zinc-100 transition-colors cursor-pointer outline-none group" title="Bookmark Signal">
                                        <Bookmark size={13} className="text-zinc-400 group-hover:text-zinc-900" />
                                    </button>
                                    <button className="px-3 h-full hover:bg-red-50 transition-colors cursor-pointer outline-none group" title="Report Violation">
                                        <Flag size={13} className="text-zinc-400 group-hover:text-red-600" />
                                    </button>
                                </div>
                            </div>
                        </header>

                        {/* 2. FIXED IDENTITY INFRASTRUCTURE */}
                        <div className="shrink-0 bg-white">
                            <div className="p-3 border-b border-zinc-300 ">
                                <h1 className="text-3xl font-bold uppercase tracking-tighter leading-[0.9] mb-3">
                                    {JOB_MOCK_DATA.title}
                                </h1>
                                <div className="flex items-center gap-3 text-[10px] font-mono font-black uppercase tracking-[0.2em] text-zinc-500">
                                    <Link to={`/app/company/${JOB_MOCK_DATA.company}`} className="text-zinc-900 hover:underline">{JOB_MOCK_DATA.company}</Link>
                                    <span className="w-1 h-1 bg-zinc-300 rounded-full" />
                                    <span className='text-zinc-500'>{JOB_MOCK_DATA.location}</span>
                                </div>
                            </div>

                            {/* INTEL GRID - REPLACED MATCH WITH AVG RESPOND */}
                            <div className="grid grid-cols-4 border-b border-zinc-300 divide-x divide-zinc-300 bg-white h-10">
                                <IntelligenceNode label="PAY" value={JOB_MOCK_DATA.pay} icon={<DollarSign size={10} />} />
                                <IntelligenceNode label="LOC" value={JOB_MOCK_DATA.workMode} icon={<MapPin size={10} />} active />
                                <IntelligenceNode label="TYPE" value={JOB_MOCK_DATA.type} icon={<Briefcase size={10} />} />
                                <div className="flex flex-col items-center justify-center px-1 bg-zinc-50/30">
                                    <div className="flex items-center font-bold text-[11px] text-orange-600">
                                        <Clock size={10} className="mr-1 stroke-[3px]" /> {JOB_MOCK_DATA.avgRespond}
                                    </div>
                                    <span className="text-[8px] font-mono text-zinc-400 uppercase font-black tracking-tighter">AVG_RESPOND</span>
                                </div>
                            </div>

                            {/* NODE OWNER BAR */}
                            <div className="flex items-center gap-3 p-3 border-b border-zinc-300 bg-zinc-50/10">
                                <User2 size={12} className="text-zinc-400" />
                                <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                                    Deployed_By: <Link to={`/app/user/${JOB_MOCK_DATA.authorName}`} className="text-zinc-900 font-black hover:underline">{JOB_MOCK_DATA.authorName}</Link> • Active_Protocol
                                </span>
                            </div>

                            <h4 className="text-[9px] px-3 py-2 border-b border-zinc-300 font-mono font-black text-zinc-500 uppercase tracking-[0.3em] bg-white">
                                Operational_Parameters
                            </h4>
                        </div>

                        {/* 3. ISOLATED SCROLLABLE CONTENT */}
                        <div className="flex-1 overflow-y-auto scrollbar-hide p-3 bg-white">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    h2: ({ node, ...props }) => <h2 className="text-[12px] font-bold uppercase tracking-widest text-zinc-900 pb-1 mt-6 first:mt-0 border-b border-zinc-100" {...props} />,
                                    h3: ({ node, ...props }) => <h3 className="text-[10px] font-bold uppercase tracking-wide text-zinc-800 mb-2 mt-5" {...props} />,
                                    p: ({ node, ...props }) => <p className="text-[12px] text-zinc-600 leading-relaxed mb-4 whitespace-pre-line" {...props} />,
                                    ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
                                    li: ({ node, ...props }) => <li className="text-[12px] text-zinc-600 marker:text-zinc-400 tracking-tight" {...props} />,
                                    strong: ({ node, ...props }) => <strong className="font-bold text-zinc-900 uppercase tracking-tighter" {...props} />,
                                    hr: () => <hr className="my-3 border-zinc-300" />,
                                }}
                            >
                                {JOB_MOCK_DATA.description}
                            </ReactMarkdown>
                            <div className="h-20" /> 
                        </div>

                        {/* 4. FIXED DEPLOYMENT ACTION */}
                        <div className="shrink-0 border-t border-zinc-300 bg-white ">
                            <button className="w-full bg-zinc-900 h-12 flex items-center justify-center gap-4 hover:bg-orange-600 transition-all group border-none cursor-pointer active:scale-[0.99] shadow-xl shadow-orange-600/5">
                                <span className="text-[11px] font-bold text-white uppercase tracking-[0.3em]">Apply now</span>
                                <ArrowUpRight className="w-4 h-4 text-white" />
                            </button>
                        </div>
                    </div>

                    {/* RIGHT PANE: SIDEBAR */}
                    <JobSidebar recruiter={JOB_MOCK_DATA.recruiter} analytics={JOB_MOCK_DATA.analytics} />
                </main>
            </div>
        </div>
    );
};

export default JobDetail;