import { useState } from 'react';
import { 
    Building2, Globe, Mail, Fingerprint, 
    Upload, ShieldCheck,
    Terminal, Loader2, Info, 
} from 'lucide-react';
import { cn } from "@/lib/utils";

import Navbar from '../AppNavbar';
import AppSideBar from '../Sidebar';

const CreateCompany = () => {
    const [isVerifying, setIsVerifying] = useState(false);
    const [logoFile, setLogoFile] = useState<File | null>(null);

    const handleVerificationTrigger = () => {
        setIsVerifying(true);
        setTimeout(() => setIsVerifying(false), 3500);
    };

    return (
        <div className="h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
            <Navbar />
            <div className="flex flex-1 w-full max-w-4xl mx-auto px-6 overflow-hidden">
                <aside className="w-25 shrink-0 border-r border-zinc-100">
                    <AppSideBar />
                </aside>

                <main className="flex flex-1 border-x border-zinc-300 ml-4 bg-white overflow-hidden flex-row pt-12 divide-x divide-zinc-300">
                    <div className="flex-1 flex flex-col bg-white overflow-y-auto scrollbar-hide">
                        
                        {/* TERMINAL HEADER */}
                        <header className="p-2 bg-zinc-800 text-white flex justify-between items-center shrink-0">
                            <div className="flex items-center gap-2">
                                <Fingerprint size={14} className="text-orange-500" />
                                <span className="text-[10px] font-mono font-black uppercase tracking-widest">Protocol: Entity_Registration_v1.2</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[8px] font-mono text-zinc-300">SYS_UPTIME: 99.9%</span>
                            </div>
                        </header>

                        {/* CORPORATE IDENTITY GRID */}
                        <div className="grid grid-cols-2 shrink-0 ">
                            <div className="bg-white px-2 py-2 space-y-1 border-r border-b border-zinc-300">
                                <label className="text-[8px] font-mono font-black text-zinc-500 uppercase tracking-widest block leading-none">Legal_Entity_Name</label>
                                <div className="relative flex items-center h-6">
                                    <Building2 className="w-3 h-3 text-zinc-500 mr-2 shrink-0" />
                                    <input placeholder="E.G._NODA_SYSTEMS" className="w-full text-[11px] font-semibold outline-none bg-transparent" />
                                </div>
                            </div>

                            <div className="bg-white px-2 py-2 space-y-1 border-b border-zinc-300">
                                <label className="text-[8px] font-mono font-black text-zinc-500 uppercase tracking-widest block leading-none">Digital_Domain</label>
                                <div className="relative flex items-center h-6">
                                    <Globe className="w-3 h-3 text-zinc-500 mr-2 shrink-0" />
                                    <input placeholder="WWW.NODA.SYS" className="w-full text-[11px] font-semibold outline-none bg-transparent" />
                                </div>
                            </div>

                            {/* FIXED SHADCN SELECT */}
                            <div className="bg-white px-2 py-2 space-y-1 border-r border-b border-zinc-300">
                                <label className="text-[8px] font-mono font-black text-zinc-500 uppercase tracking-widest block leading-none">Entity_Classification</label>
                                <div className="relative flex items-center h-6">
                                    <Terminal className="w-3 h-3 text-zinc-500 mr-2 shrink-0" />
                                    <input placeholder="Indrusty type" className="w-full text-[11px] font-semibold uppercase outline-none bg-transparent" />
                                </div>
                                
                            </div>

                            <div className="bg-white px-3 py-2 space-y-1 border-b border-zinc-300">
                                <label className="text-[8px] font-mono font-black text-zinc-500 uppercase tracking-widest block leading-none">Verification_Node_Email</label>
                                <div className="relative flex items-center h-6">
                                    <Mail className="w-3 h-3 text-zinc-500 mr-2 shrink-0" />
                                    <input placeholder="HR@NODA.SYS" className="w-full text-[11px] font-semibold outline-none bg-transparent" />
                                </div>
                            </div>
                        </div>

                        {/* LOGO UPLOAD PROTOCOL */}
                        <div className="p-2 border-b border-zinc-300 bg-zinc-50/50">
                            <label className="text-[8px] font-mono font-black text-zinc-500 uppercase tracking-[0.2em] block mb-2">Company logo</label>
                            <label className="border-2 border-dashed border-zinc-300 bg-white p-8 flex flex-col items-center justify-center gap-3 transition-colors hover:border-orange-500 group cursor-pointer">
                                <div className="w-12 h-12 bg-zinc-100 flex items-center justify-center rounded-sm group-hover:bg-orange-50 transition-colors text-zinc-400 group-hover:text-orange-500">
                                    <Upload size={20} />
                                </div>
                                <div className="text-center">
                                    <p className="text-[10px] font-black uppercase tracking-tighter">
                                        {logoFile ? logoFile.name : "Upload_Vector_Logo"}
                                    </p>
                                    <p className="text-[9px] font-mono text-zinc-500 uppercase mt-1">SVG, PNG or WEBP (MAX 5MB)</p>
                                </div>
                                <input type="file" className="hidden" onChange={(e) => setLogoFile(e.target.files?.[0] || null)} />
                            </label>
                        </div>

                        {/* RESTORED CONSOLE LOG */}
                        <div className="flex-1 p-2 space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest">Verification status</span>
                            </div>
                            
                            <div className="bg-zinc-800 p-2 font-mono text-[10px] space-y-2 text-zinc-300 border border-zinc-800 h-40 overflow-y-auto scrollbar-hide shadow-inner">
                                <p className="text-zinc-500">[{'>'}] Initializing Noda_Crawler_v4.2...</p>
                                <p className="text-emerald-500">[{'>'}] Network interface established. Port 443 open.</p>
                                <p className="text-zinc-500">[{'>'}] Resolving DNS for target domain...</p>
                                {isVerifying ? (
                                    <>
                                        <p className="text-orange-400 animate-pulse">[{'>'}] SCRAPING_DOMAIN_FOR_METADATA...</p>
                                        <p className="text-orange-400 animate-pulse">[{'>'}] LOCATED_CONTACT_RESOURCES.</p>
                                        <p className="text-white font-black">[{'>'}] DISPATCHING_VERIFICATION_TOKEN...</p>
                                    </>
                                ) : (
                                    <p className="text-zinc-600 italic">[{'>'}] Waiting for Execute_Verification signal...</p>
                                )}
                            </div>
                        </div>

                        {/* FOOTER ACTION */}
                        <div className="border-t border-zinc-300 bg-white flex items-center justify-between sticky bottom-0 z-20">
                            <button 
                                onClick={handleVerificationTrigger}
                                disabled={isVerifying}
                                className={cn(
                                    "h-10 w-full font-mono font-bold text-[11px] uppercase tracking-[0.3em] transition-all flex justify-center items-center gap-3 border-none cursor-pointer active:translate-x-px active:translate-y-px",
                                    isVerifying ? "bg-orange-500 text-white" : "bg-zinc-800 text-white hover:bg-zinc-900"
                                )}
                            >
                                {isVerifying ? "Starting Step 1" : "Start_Verification"}
                                {isVerifying ? <Loader2 size={16} className="animate-spin" /> : <ShieldCheck size={16} />}
                            </button>
                        </div>
                    </div>

                    {/* RESTORED RIGHT SIDEBAR CONTENT */}
                    <aside className="w-40 flex flex-col p-2 shrink-0 space-y-8 overflow-y-auto scrollbar-hide">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 border-b border-zinc-300 pb-2">
                                <Info size={12} className="text-zinc-500" />
                                <span className="text-[8px] font-mono font-black text-zinc-500 uppercase tracking-[0.2em]">Deployment_Manual</span>
                            </div>
                            
                            <ManualStep 
                                step="01" 
                                title="Domain_Sync" 
                                desc="The provided work email suffix must strictly match the digital domain for identity validation." 
                            />
                            <ManualStep 
                                step="02" 
                                title="Crawler_Audit" 
                                desc="Our system crawls your public pages to ensure the entity is not a shell corporation." 
                            />
                            <ManualStep 
                                step="03" 
                                title="Token_Handshake" 
                                desc="Click the uplink in the verification email to finalize the entity's deployment." 
                            />
                        </div>

                        
                    </aside>
                </main>
            </div>
        </div>
    );
};

const ManualStep = ({ step, title, desc }: { step: string, title: string, desc: string }) => (
    <div className="space-y-1">
        <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono font-black text-orange-500">{step}</span>
            <span className="text-[10px] font-bold uppercase tracking-tight">{title}</span>
        </div>
        <p className="text-[10px] font-mono text-zinc-500 leading-relaxed uppercase">{desc}</p>
    </div>
);

export default CreateCompany;