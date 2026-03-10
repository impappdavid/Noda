import { useState, useCallback, useRef, type KeyboardEvent } from 'react';
import {
    Briefcase, Terminal, DollarSign, CheckCircle2,
    ArrowUpRight, Code2, HelpCircle, FileJson, Plus, Trash2, Settings2, ListPlus, ChevronRight, ChevronLeft, X, Layers
} from 'lucide-react';
import Navbar from '../../AppNavbar';
import AppSideBar from '../../Sidebar';
import HiringSidebar from './HiringSidebar';
import { SkillList } from './SkillManager';
import { FormSelector, DocButton } from './JobFormElements';
import { cn } from "@/lib/utils";

// Shadcn & UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

type QuestionType = 'text' | 'number' | 'select' | 'radio' | 'checkbox';

interface CustomQuestion {
    id: string;
    label: string;
    type: QuestionType;
    options: string[];
}

const PostJob = () => {
    // --- STEP 01 STATE ---
    const [title, setTitle] = useState("");
    const [salary, setSalary] = useState("");
    const [description, setDescription] = useState("");
    const [skills, setSkills] = useState<string[]>(["REACT", "TYPESCRIPT", "RUST"]);
    const [skillInput, setSkillInput] = useState("");

    // --- STEP 02 STATE ---
    const [step, setStep] = useState(1);
    const [questions, setQuestions] = useState<CustomQuestion[]>([]);
    const [isDeploying, setIsDeploying] = useState(false);

    const isInfoComplete = title && salary && description && skills.length > 0;

    const handleAction = () => {
        if (step === 1) {
            setStep(2);
        } else {
            setIsDeploying(true);
            setTimeout(() => setIsDeploying(false), 2000);
        }
    };

    const addQuestion = () => {
        const newQ: CustomQuestion = {
            id: crypto.randomUUID(),
            label: "",
            type: 'text',
            options: []
        };
        setQuestions([...questions, newQ]);
    };

    const updateQuestion = (id: string, updates: Partial<CustomQuestion>) => {
        setQuestions(questions.map(q => q.id === id ? { ...q, ...updates } : q));
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
                <aside className="w-25 shrink-0">
                    <AppSideBar />
                </aside>

                <main className="flex flex-1 border-x border-zinc-300 ml-4 bg-white overflow-hidden flex-row pt-12.5 divide-x divide-zinc-300 relative">
                    <div className="flex-1 flex flex-col bg-white relative overflow-hidden">

                        <header className="p-2 border-b border-zinc-300 bg-zinc-800 text-white flex justify-between items-center shrink-0 z-20">
                            <div className="flex items-center gap-2">
                                <Briefcase size={14} className="text-orange-500" />
                                <span className="text-[10px] font-mono font-black uppercase tracking-widest">
                                    {step === 1 ? "OpenAI: Job Creation" : "OpenAI: Job Questions"}
                                </span>
                            </div>
                            <span className="text-[8px] font-mono text-zinc-400 uppercase border border-zinc-700 px-2 py-0.5">PHASE_0{step}</span>
                        </header>

                        {/* SCROLLABLE CONTENT AREA */}
                        <div className="flex-1 overflow-y-auto scrollbar-hide pb-24">
                            {step === 1 ? (
                                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <div className="grid grid-cols-2 bg-zinc-300 shrink-0 border-b border-zinc-300">
                                        <div className="bg-white p-2 space-y-1 border-r border-b border-zinc-300">
                                            <label className="text-[8px] font-mono font-black text-zinc-500 uppercase tracking-widest block leading-none">Role_Title</label>
                                            <div className="relative flex items-center h-6">
                                                <Terminal className="w-3 h-3 text-zinc-500 mr-2" />
                                                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="LEAD_SYSTEMS_ARCH" className="w-full text-[10px] font-bold uppercase outline-none bg-transparent" />
                                            </div>
                                        </div>

                                        <div className="bg-white p-2 space-y-1 border-b border-zinc-300">
                                            <label className="text-[8px] font-mono font-black text-zinc-500 uppercase tracking-widest block leading-none">Salary_Range (USD)</label>
                                            <div className="relative flex items-center h-6">
                                                <DollarSign className="w-3 h-3 text-zinc-500 mr-2" />
                                                <input value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="180K_-_240K" className="w-full text-[10px] font-bold uppercase outline-none bg-transparent" />
                                            </div>
                                        </div>

                                        <FormSelector label="Job_Type_Protocol" defaultValue="full-time" options={[{ label: 'Full-Time_Node', value: 'full-time' }, { label: 'Part-Time_Node', value: 'part-time' }, { label: 'Contract_Base', value: 'contract' }]} />
                                        <FormSelector label="Node_Setting" defaultValue="remote" options={[{ label: 'Remote_Node', value: 'remote' }, { label: 'Hybrid_System', value: 'hybrid' }, { label: 'Onsite_Physical', value: 'onsite' }]} />
                                        <FormSelector label="Exp_Requirement" defaultValue="mid" options={[{ label: 'Junior (1-3Y)', value: 'junior' }, { label: 'Mid_Level (3-5Y)', value: 'mid' }, { label: 'Senior (5-8Y)', value: 'senior' }]} />

                                        <div className="bg-white p-2 space-y-1 border-b border-zinc-300">
                                            <label className="text-[8px] font-mono font-black text-zinc-500 uppercase tracking-widest block leading-none">Skill_Injection</label>
                                            <div className="relative flex items-center h-6">
                                                <Code2 className="w-3 h-3 text-zinc-500 mr-2" />
                                                <input value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={handleAddSkill} placeholder="PRESS_ENTER..." className="w-full text-[10px] font-bold uppercase outline-none" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-2 flex flex-col min-h-[520px]">
                                        <div className="flex justify-between items-center mb-4">
                                            <label className="text-[8px] font-mono font-black text-zinc-400 uppercase tracking-[0.2em] block leading-none">Role_Specification_Markdown</label>
                                            <div className="flex gap-4 items-center">
                                                <DocButton icon={<HelpCircle size={12} />} label="Guide" />
                                                <DocButton icon={<FileJson size={12} />} label="Template" />
                                            </div>
                                        </div>
                                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="### Primary Objectives..." className="w-full flex-1 text-sm font-bold text-zinc-800 resize-none outline-none leading-relaxed font-mono" />
                                    </div>
                                    <SkillList skills={skills} onRemove={(s) => setSkills(skills.filter(sk => sk !== s))} />
                                </div>
                            ) : (
                                /* --- REDESIGNED STEP 2 CONTENT --- */
                                <div className=" animate-in fade-in slide-in-from-right-4 duration-500">
                                    <div className="flex p-2 justify-between items-end border-b border-zinc-300 pb-3">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[10px] font-mono font-black uppercase text-zinc-900 tracking-widest flex items-center gap-2">
                                                <Layers size={14} className="text-orange-500" /> Component_Registry
                                            </span>
                                            <span className="text-[9px] font-mono text-zinc-500 uppercase">Construct custom candidate interrogation nodes</span>
                                        </div>
                                        <Button onClick={addQuestion} variant="outline" className="h-8 rounded-none uppercase bg-zinc-800 text-white hover:bg-orange-500 hover:text-white text-[9px] font-bold tracking-wider">
                                            <Plus size={10} /> ADD new question
                                        </Button>
                                    </div>

                                    <div className="space-y-0">
                                        {questions.length === 0 && (
                                            <div className="py-20 flex flex-col items-center justify-center opacity-100">
                                                <Settings2 size={32} strokeWidth={1} className="animate-spin-slow mb-4" />
                                                <span className="text-[9px] uppercase tracking-[0.3em]">No Questions added</span>
                                            </div>
                                        )}
                                        {questions.map((q, idx) => (
                                            <RedesignedQuestionNode
                                                key={q.id}
                                                question={q}
                                                index={idx}
                                                onUpdate={(upd) => updateQuestion(q.id, upd)}
                                                onRemove={() => setQuestions(questions.filter(x => x.id !== q.id))}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* --- FIXED NAVIGATION FOOTER --- */}
                        <div className="absolute bottom-0 left-0 right-0 p-2 border-t border-zinc-300 bg-white/95 backdrop-blur-md flex justify-between items-center z-50">
                            <div className="flex gap-4">
                                {step === 2 && (
                                    <Button onClick={() => setStep(1)}  className="h-10 border-zinc-300 bg-white rounded-none text-[10px] font-mono font-black uppercase tracking-widest text-zinc-500 hover:bg-zinc-400/80 hover:text-zinc-900  hover:border-zinc-300 transition-all px-6">
                                        <ChevronLeft size={14} className="mr-1" /> Go Back
                                    </Button>
                                )}
                            </div>

                            <Button
                                disabled={(step === 1 && !isInfoComplete) || isDeploying}
                                onClick={handleAction}
                                className={cn(
                                    "h-10 px-10 rounded-none font-mono font-black text-[11px] uppercase tracking-[0.3em] transition-all relative overflow-hidden group border-none",
                                    isDeploying ? "bg-emerald-600 text-white" : "bg-orange-500 text-white hover:bg-orange-600 active:shadow-none active:translate-x-1 active:translate-y-1"
                                )}
                            >
                                {isDeploying ? "create..." : step === 1 ? "Continue" : "Create Job"}
                                {!isDeploying && (step === 1 ? <ChevronRight size={14} className=" group-hover:translate-x-1 transition-transform" /> : <ArrowUpRight size={14} className=" group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />)}
                                {isDeploying && <div className="absolute bottom-0 left-0 h-1 bg-emerald-400 animate-pulse w-full" />}
                            </Button>
                        </div>
                    </div>

                    <HiringSidebar companyInitial="O" companyName="OpenAI" nodeCount="1,204" activeJobs={12} avgApplicants={442} />
                </main>
            </div>
        </div>
    );
};

// --- REDESIGNED QUESTION NODE COMPONENT ---
const RedesignedQuestionNode = ({ question, index, onUpdate, onRemove }: any) => {
    const [optInput, setOptInput] = useState("");

    const addOption = () => {
        if (!optInput.trim()) return;
        onUpdate({ options: [...question.options, optInput.toUpperCase().trim()] });
        setOptInput("");
    };

    return (
        <div className="flex flex-col animate-in slide-in-from-left-2 duration-300">
            <div className="flex items-center gap-2 p-2">
                <span className="text-[10px]  font-semibold uppercase text-white bg-orange-500 px-2 py-0.5">Question {index + 1}</span>
                <div className="h-[1px] flex-1 bg-zinc-100" />
                <button onClick={onRemove} className="text-zinc-500 hover:text-red-500 cursor-pointer transition-colors">
                    <Trash2 size={14} />
                </button>
            </div>

            <div className="grid grid-cols-12 border-y border-zinc-300 bg-white">
                {/* LABEL SECTION */}
                <div className="col-span-8 p-2 border-r border-zinc-300">
                    <label className="text-[8px] font-mono font-black text-zinc-500 uppercase tracking-widest block mb-1">Inquiry_Label</label>
                    <Input
                        value={question.label}
                        onChange={e => onUpdate({ label: e.target.value.toUpperCase() })}
                        placeholder="E.G. Contact phone number"
                        className="h-7 border-none shadow-none rounded-none text-xs font-semibold focus-visible:ring-0 p-0 placeholder:text-zinc-400"
                    />
                </div>

                {/* TYPE SELECTOR */}
                <div className="col-span-4 bg-zinc-50/50">
                    <label className="text-[8px] font-mono font-black text-zinc-500 uppercase tracking-widest block px-2 pt-2">Logic_Type</label>
                    <Select value={question.type} onValueChange={(val: any) => onUpdate({ type: val })}>
                        <SelectTrigger className="border-none shadow-none w-full cursor-pointer rounded-none h-10 bg-transparent text-[9px] font-mono font-black uppercase  outline-none">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent position="popper" className="rounded-none font-mono text-[10px] uppercase">
                            <SelectItem value="text" className='text-xs cursor-pointer hover:bg-zinc-200'>Input Text</SelectItem>
                            <SelectItem value="number" className='text-xs cursor-pointer hover:bg-zinc-200'>Input Number</SelectItem>
                            <SelectItem value="select" className='text-xs cursor-pointer hover:bg-zinc-200'>Select</SelectItem>
                            <SelectItem value="checkbox" className='text-xs cursor-pointer hover:bg-zinc-200'>Multi Select</SelectItem>
                            <SelectItem value="radio" className='text-xs cursor-pointer hover:bg-zinc-200'>Radio</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* OPTION BUILDER (Conditionally Rendered) */}
                {['select', 'checkbox', 'radio'].includes(question.type) && (
                    <div className="col-span-12 p-2 bg-zinc-50 border-t border-zinc-300 space-y-1">
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <ListPlus className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-zinc-500" />
                                <Input
                                    value={optInput}
                                    onChange={e => setOptInput(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && addOption()}
                                    placeholder="Add Option.."
                                    className="h-8 pl-8 rounded-none border-zinc-300 text-[9px] bg-white "
                                />
                            </div>
                            <Button onClick={addOption} variant="outline" className="h-8 rounded-none bg-zinc-800 text-[9px] font-mono font-black hover:bg-orange-500 text-white hover:text-white transition-all px-4">
                                ADD
                            </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {question.options.map((opt: string, i: number) => (
                                <div key={i} onClick={() => onUpdate({ options: question.options.filter((_: any, idx: number) => idx !== i) })} className="flex items-center gap-2 bg-zinc-800 cursor-pointer hover:bg-red-800 transition-colors text-white px-2 py-1 group/opt">
                                    <span className="text-[9px] font-semibold uppercase">{opt}</span>

                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostJob;