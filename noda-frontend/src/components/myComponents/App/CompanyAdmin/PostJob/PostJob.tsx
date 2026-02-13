import { useState, type KeyboardEvent} from 'react';
import { 
    Briefcase, Terminal, DollarSign, CheckCircle2, 
    ArrowUpRight, Code2, HelpCircle, FileJson 
} from 'lucide-react';
import Navbar from '../../AppNavbar';
import AppSideBar from '../../Sidebar';
import HiringSidebar from './HiringSidebar';
import { SkillList } from './SkillManager';
import { FormSelector, DocButton } from './JobFormElements';
import { cn } from "@/lib/utils";

const PostJob = () => {
    const [description, setDescription] = useState("");
    const [isDeploying, setIsDeploying] = useState(false);
    const [skills, setSkills] = useState<string[]>(["REACT", "TYPESCRIPT", "RUST"]);
    const [skillInput, setSkillInput] = useState("");

    const handleDeployment = () => {
        setIsDeploying(true);
        setTimeout(() => setIsDeploying(false), 2000);
    };

    const handleAddSkill = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && skillInput.trim()) {
            e.preventDefault();
            const val = skillInput.toUpperCase().trim();
            if (!skills.includes(val)) setSkills(prev => [...prev, val]);
            setSkillInput("");
        }
    };

    return (
        <div className="h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
            <Navbar />
            <div className="flex flex-1 w-full max-w-4xl mx-auto px-6 overflow-hidden">
                <aside className="w-25 shrink-0 border-r border-zinc-100">
                    <AppSideBar />
                </aside>

                <main className="flex flex-1 border-x border-zinc-300 ml-4 bg-white overflow-hidden flex-row pt-12.5 divide-x divide-zinc-300">
                    <div className="flex-1 flex flex-col bg-white overflow-y-auto scrollbar-hide">
                        <header className="p-4 border-b border-zinc-300 bg-zinc-800 text-white flex justify-between items-center shrink-0">
                            <div className="flex items-center gap-2">
                                <Briefcase size={14} className="text-orange-500" />
                                <span className="text-[10px] font-mono font-black uppercase tracking-widest">Protocol: Vacancy_Deployment_v4</span>
                            </div>
                        </header>

                        {/* CONFIGURATION GRID */}
                        <div className="grid grid-cols-2 bg-zinc-300 shrink-0 border-b border-zinc-300">
                            <div className="bg-white px-3 py-2 space-y-1 border-r border-b border-zinc-300">
                                <label className="text-[8px] font-mono font-black text-zinc-500 uppercase tracking-widest block leading-none">Role_Title</label>
                                <div className="relative flex items-center h-6">
                                    <Terminal className="w-3 h-3 text-zinc-500 mr-2" />
                                    <input placeholder="LEAD_SYSTEMS_ARCH" className="w-full text-[10px] font-bold uppercase outline-none bg-transparent" />
                                </div>
                            </div>

                            <div className="bg-white px-3 py-2 space-y-1 border-b border-zinc-300">
                                <label className="text-[8px] font-mono font-black text-zinc-500 uppercase tracking-widest block leading-none">Salary_Range (USD)</label>
                                <div className="relative flex items-center h-6">
                                    <DollarSign className="w-3 h-3 text-zinc-500 mr-2" />
                                    <input placeholder="180K_-_240K" className="w-full text-[10px] font-bold uppercase outline-none bg-transparent" />
                                </div>
                            </div>

                            <FormSelector 
                                label="Job_Type_Protocol" 
                                defaultValue="full-time" 
                                options={[
                                    { label: 'Full-Time_Node', value: 'full-time' },
                                    { label: 'Part-Time_Node', value: 'part-time' },
                                    { label: 'Contract_Base', value: 'contract' }
                                ]} 
                            />
                            
                            <FormSelector 
                                label="Node_Setting" 
                                defaultValue="remote" 
                                options={[
                                    { label: 'Remote_Node', value: 'remote' },
                                    { label: 'Hybrid_System', value: 'hybrid' },
                                    { label: 'Onsite_Physical', value: 'onsite' }
                                ]} 
                            />

                            <FormSelector 
                                label="Exp_Requirement" 
                                defaultValue="mid" 
                                options={[
                                    { label: 'Junior (1-3Y)', value: 'junior' },
                                    { label: 'Mid_Level (3-5Y)', value: 'mid' },
                                    { label: 'Senior (5-8Y)', value: 'senior' }
                                ]} 
                            />

                            <div className="bg-white px-3 py-2 space-y-1 border-b border-zinc-300">
                                <label className="text-[8px] font-mono font-black text-zinc-500 uppercase tracking-widest block leading-none">Skill_Injection</label>
                                <div className="relative flex items-center h-6">
                                    <Code2 className="w-3 h-3 text-zinc-500 mr-2" />
                                    <input 
                                        value={skillInput}
                                        onChange={(e) => setSkillInput(e.target.value)}
                                        onKeyDown={handleAddSkill}
                                        placeholder="PRESS_ENTER..." 
                                        className="w-full text-[10px] font-bold uppercase outline-none" 
                                    />
                                </div>
                            </div>
                        </div>

                        {/* DESCRIPTION EDITOR */}
                        <div className="flex-1 flex flex-col p-4 min-h-[300px]">
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-[8px] font-mono font-black text-zinc-400 uppercase tracking-[0.2em] block leading-none">Role_Specification_Markdown</label>
                                <div className="flex gap-4 items-center">
                                    <DocButton icon={<HelpCircle size={12} />} label="Guide" />
                                    <DocButton icon={<FileJson size={12} />} label="Template" />
                                </div>
                            </div>
                            <textarea 
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="### Primary Objectives..."
                                className="w-full flex-1 text-sm font-bold text-zinc-800 resize-none outline-none leading-relaxed font-mono"
                            />
                        </div>

                        <SkillList skills={skills} onRemove={(s) => setSkills(skills.filter(sk => sk !== s))} />

                        {/* DEPLOYMENT FOOTER */}
                        <div className="p-4 border-t border-zinc-300 bg-white flex items-center justify-between sticky bottom-0 z-20">
                            <div className="flex items-center gap-4 text-zinc-500">
                                <StatusCol label="Visibility" value="Global_Network" color="text-emerald-600" />
                                <div className="w-[1px] h-6 bg-zinc-100" />
                                <StatusCol label="Integrity" value="Active" color="text-zinc-900" />
                            </div>

                            <button 
                                onClick={handleDeployment}
                                disabled={!description || isDeploying}
                                className={cn(
                                    "h-10 px-8 font-mono font-bold text-[11px] uppercase tracking-[0.3em] transition-all flex items-center gap-3 border-none cursor-pointer",
                                    isDeploying ? "bg-emerald-600 text-white" : "bg-zinc-800 text-white hover:bg-zinc-900 disabled:bg-zinc-400"
                                )}
                            >
                                {isDeploying ? "DEPLOYED" : "Initialize_Deployment"}
                                {isDeploying ? <CheckCircle2 size={16} /> : <ArrowUpRight size={16} />}
                            </button>
                        </div>
                    </div>

                    <HiringSidebar 
                        companyInitial="O" 
                        companyName="OpenAI" 
                        nodeCount="1,204" 
                        activeJobs={12} 
                        avgApplicants={442} 
                    />
                </main>
            </div>
        </div>
    );
};

const StatusCol = ({ label, value, color }: { label: string, value: string, color: string }) => (
    <div className="flex flex-col">
        <span className="text-[8px] font-mono font-black uppercase">{label}</span>
        <span className={cn("text-[10px] font-bold uppercase", color)}>{value}</span>
    </div>
);

export default PostJob;