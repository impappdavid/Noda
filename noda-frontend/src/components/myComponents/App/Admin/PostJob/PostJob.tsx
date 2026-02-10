import React, { useState, KeyboardEvent } from 'react';
import { 
    Send, Briefcase, MapPin, Layers, 
    Terminal, DollarSign, Clock, AlertTriangle, 
    CheckCircle2, Zap, Users, ArrowUpRight, 
    Plus, X, Code2, HelpCircle, FileJson
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from '../../AppNavbar';
import AppSideBar from '../../Sidebar';

const PostJob = () => {
    const [description, setDescription] = useState("");
    const [isDeploying, setIsDeploying] = useState(false);
    
    // --- SKILL TAGS STATE ---
    const [skills, setSkills] = useState<string[]>(["REACT", "TYPESCRIPT", "RUST"]);
    const [skillInput, setSkillInput] = useState("");

    const handleAddSkill = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && skillInput.trim()) {
            e.preventDefault();
            if (!skills.includes(skillInput.toUpperCase())) {
                setSkills([...skills, skillInput.toUpperCase().trim()]);
            }
            setSkillInput("");
        }
    };

    const removeSkill = (skillToRemove: string) => {
        setSkills(skills.filter(s => s !== skillToRemove));
    };

    const handleDeployment = () => {
        setIsDeploying(true);
        setTimeout(() => setIsDeploying(false), 2000);
    };

    return (
        <div className="h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
            <Navbar />
            <div className="flex flex-1 w-full max-w-4xl mx-auto px-6 overflow-hidden">
                <aside className="w-24 shrink-0 border-r border-zinc-100">
                    <AppSideBar />
                </aside>

                <main className="flex flex-1 border-x border-zinc-300 ml-4 bg-white overflow-hidden flex-row pt-13 divide-x divide-zinc-300">
                    
                    {/* LEFT: JOB CONFIGURATION & DESCRIPTION */}
                    <div className="flex-1 flex flex-col bg-white overflow-y-auto scrollbar-hide">
                        {/* Protocol Header */}
                        <div className="p-4 border-b border-zinc-300 bg-zinc-800 text-white flex justify-between items-center shrink-0">
                            <div className="flex items-center gap-2">
                                <Briefcase size={14} className="text-orange-500" />
                                <span className="text-[10px] font-mono font-black uppercase tracking-widest">Protocol: Vacancy_Deployment_v4</span>
                            </div>
                        </div>

                        {/* 1. CONFIGURATION GRID */}
                        <div className="grid grid-cols-2 gap-px bg-zinc-300 border-b border-zinc-300 shrink-0">
                            <div className="bg-white px-3 py-2 space-y-1">
                                <label className="text-[8px] font-mono font-black text-zinc-500 uppercase tracking-widest block leading-none">Role_Title</label>
                                <div className="relative">
                                    <Terminal className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-500" />
                                    <input placeholder="LEAD_SYSTEMS_ARCH" className="w-full pl-5 text-[10px] font-bold uppercase outline-none placeholder:text-zinc-500 bg-transparent h-6" />
                                </div>
                            </div>
                            <div className="bg-white px-3 py-2 space-y-1">
                                <label className="text-[8px] font-mono font-black text-zinc-500 uppercase tracking-widest block leading-none">Salary_Range (USD)</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-500" />
                                    <input placeholder="180K_-_240K" className="w-full pl-5 text-[10px] font-bold uppercase outline-none placeholder:text-zinc-500 bg-transparent h-6" />
                                </div>
                            </div>
                            <div className="bg-white px-3 py-2 space-y-1">
                                <label className="text-[8px] font-mono font-black text-zinc-500 uppercase tracking-widest block leading-none">Job_Type_Protocol</label>
                                <Select defaultValue="full-time">
                                    <SelectTrigger className="h-6 w-full rounded-none border-none p-0 text-[10px] font-bold uppercase focus:ring-0 shadow-none cursor-pointer">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent position="popper" sideOffset={4} className="rounded-none border-zinc-300 font-mono text-[10px] uppercase bg-white">
                                        <SelectItem value="full-time" className='text-xs cursor-pointer'>Full-Time_Node</SelectItem>
                                        <SelectItem value="part-time" className='text-xs cursor-pointer'>Part-Time_Node</SelectItem>
                                        <SelectItem value="contract" className='text-xs cursor-pointer'>Contract_Base</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="bg-white px-3 py-2 space-y-1">
                                <label className="text-[8px] font-mono font-black text-zinc-500 uppercase tracking-widest block leading-none">Node_Setting</label>
                                <Select defaultValue="remote">
                                    <SelectTrigger className="h-6 w-full rounded-none border-none p-0 text-[10px] font-bold uppercase focus:ring-0 shadow-none cursor-pointer">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent position="popper" sideOffset={4} className="rounded-none border-zinc-300 font-mono text-[10px] uppercase bg-white">
                                        <SelectItem value="remote" className='text-xs cursor-pointer'>Remote_Node</SelectItem>
                                        <SelectItem value="hybrid" className='text-xs cursor-pointer'>Hybrid_System</SelectItem>
                                        <SelectItem value="onsite" className='text-xs cursor-pointer'>Onsite_Physical</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="bg-white px-3 py-2 space-y-1">
                                <label className="text-[8px] font-mono font-black text-zinc-500 uppercase tracking-widest block leading-none">Exp_Requirement</label>
                                <Select defaultValue="mid">
                                    <SelectTrigger className="h-6 w-full rounded-none border-none p-0 text-[10px] font-bold uppercase focus:ring-0 shadow-none cursor-pointer">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent position="popper" sideOffset={4} className="rounded-none border-zinc-300 font-mono text-[10px] uppercase bg-white">
                                        <SelectItem value="junior" className='text-xs cursor-pointer'>Junior (1-3Y)</SelectItem>
                                        <SelectItem value="mid" className='text-xs cursor-pointer'>Mid_Level (3-5Y)</SelectItem>
                                        <SelectItem value="senior" className='text-xs cursor-pointer'>Senior (5-8Y)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="bg-white px-3 py-2 space-y-1 flex flex-col justify-center">
                                <label className="text-[8px] font-mono font-black text-zinc-500 uppercase tracking-widest block leading-none">Skill_Injection</label>
                                <div className="relative">
                                    <Code2 className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-500" />
                                    <input 
                                        value={skillInput}
                                        onChange={(e) => setSkillInput(e.target.value)}
                                        onKeyDown={handleAddSkill}
                                        placeholder="PRESS_ENTER_TO_ADD..." 
                                        className="w-full pl-5 text-[10px] font-bold uppercase outline-none placeholder:text-zinc-500 bg-transparent h-6" 
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 2. DESCRIPTION EDITOR */}
                        <div className="flex-1 flex flex-col p-4 min-h-[350px]">
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-[8px] font-mono font-black text-zinc-400 uppercase tracking-[0.2em] block leading-none">Role_Specification_Markdown</label>
                                <div className="flex gap-4 items-center">
                                    <button className="flex items-center gap-1.5 text-[9px] font-mono font-black text-zinc-400 hover:text-zinc-900 uppercase underline underline-offset-4 decoration-zinc-200 transition-colors">
                                        <HelpCircle size={12} /> Guide
                                    </button>
                                    <button className="flex items-center gap-1.5 text-[9px] font-mono font-black text-zinc-400 hover:text-zinc-900 uppercase underline underline-offset-4 decoration-zinc-200 transition-colors">
                                        <FileJson size={12} /> Template
                                    </button>
                                </div>
                            </div>
                            <textarea 
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="### Primary Objectives:&#10;* Design high-scale architecture..."
                                className="w-full flex-1 text-sm font-bold text-zinc-800 placeholder:text-zinc-400 resize-none outline-none leading-relaxed font-mono"
                            />
                        </div>

                        {/* 3. SKILL TAGS FOOTER (BELOW DESCRIPTION) */}
                        <div className="px-4 py-4 border-t border-zinc-100 shrink-0 ">
                            <span className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest block mb-3 leading-none">Attached_Skill_Nodes</span>
                            <div className="flex flex-wrap gap-2">
                                {skills.length > 0 ? skills.map((skill) => (
                                    <div key={skill} className="flex items-center gap-1.5 px-2 py-1 bg-zinc-800 text-white border border-zinc-800 animate-in slide-in-from-bottom-1 duration-200">
                                        <span className="text-[10px] font-mono font-black tracking-widest">{skill}</span>
                                        <button onClick={() => removeSkill(skill)} className="hover:text-orange-500 transition-colors cursor-pointer">
                                            <X size={10} />
                                        </button>
                                    </div>
                                )) : (
                                    <span className="text-[9px] font-mono font-bold text-zinc-300 uppercase italic">No_Skills_Injected</span>
                                )}
                            </div>
                        </div>

                        {/* Deployment Footer */}
                        <div className="p-4 border-t border-zinc-300 bg-white flex items-center justify-between sticky bottom-0 z-20">
                            <div className="flex items-center gap-4 text-zinc-500">
                                <div className="flex flex-col">
                                    <span className="text-[8px] font-mono font-black uppercase">Visibility</span>
                                    <span className="text-[10px] font-bold uppercase text-emerald-600">Global_Network</span>
                                </div>
                                <div className="w-[1px] h-6 bg-zinc-100" />
                                <div className="flex flex-col">
                                    <span className="text-[8px] font-mono font-black uppercase">Integrity</span>
                                    <span className="text-[10px] font-bold uppercase text-zinc-900">Active</span>
                                </div>
                            </div>

                            <button 
                                onClick={handleDeployment}
                                disabled={!description || isDeploying}
                                className={cn(
                                    "h-10 px-8 font-mono font-bold text-[11px] uppercase tracking-[0.3em] cursor-pointer transition-all flex items-center gap-3",
                                    isDeploying 
                                        ? "bg-emerald-600 text-white" 
                                        : "bg-zinc-800 text-white hover:bg-zinc-900 disabled:bg-zinc-400"
                                )}
                            >
                                {isDeploying ? "DEPLOYED" : "Initialize_Deployment"}
                                {isDeploying ? <CheckCircle2 size={16} /> : <ArrowUpRight size={16} />}
                            </button>
                        </div>
                    </div>

                    {/* RIGHT SIDEBAR: w-40 HIRING INTELLIGENCE */}
                    <div className="w-40 flex flex-col bg-zinc-50/50 overflow-y-auto scrollbar-hide shrink-0">
                        <div className="p-4 border-b border-zinc-300 bg-zinc-800 text-white flex flex-col items-center text-center">
                            <div className="w-12 h-12 bg-white flex items-center justify-center mb-3">
                                <span className="text-xl font-black text-zinc-900 font-mono">O</span>
                            </div>
                            <h5 className="text-[10px] font-black uppercase tracking-tight leading-none mb-1">OpenAI</h5>
                            <div className="flex items-center gap-1 text-zinc-300">
                                <Users size={10} />
                                <span className="text-[9px] font-mono font-bold uppercase tracking-tighter">1,204_NODES</span>
                            </div>
                        </div>

                        <div className="p-4 space-y-8 flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <Zap size={14} className="text-orange-600" />
                                <span className="text-[9px] font-mono font-black uppercase tracking-widest text-zinc-900">Hiring_Stats</span>
                            </div>
                            <div className="space-y-4">
                                <div className="flex flex-col">
                                    <span className="text-[8px] font-mono font-black text-zinc-500 uppercase tracking-widest mb-1">Active_Jobs</span>
                                    <span className="text-sm font-bold text-zinc-900 tracking-tighter">12</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[8px] font-mono font-black text-zinc-500 uppercase tracking-widest mb-1">Avg_Applicants</span>
                                    <span className="text-sm font-bold text-zinc-900 tracking-tighter">442</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default PostJob;