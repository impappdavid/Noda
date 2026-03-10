import React from 'react';
import { X } from 'lucide-react';
import type { SkillNodeProps } from '@/types/admin/jobPost';

export const SkillNode = React.memo(({ skill, onRemove }: SkillNodeProps) => (
    <div className="flex items-center gap-1.5 px-2 py-1 bg-zinc-800 text-white border border-zinc-800 animate-in slide-in-from-bottom-1 duration-200">
        <span className="text-[10px] font-mono font-black tracking-widest">{skill}</span>
        <button onClick={() => onRemove(skill)} className="hover:text-orange-500 transition-colors cursor-pointer border-none bg-transparent p-0">
            <X size={10} />
        </button>
    </div>
));

export const SkillList = ({ skills, onRemove }: { skills: string[], onRemove: (s: string) => void }) => (
    <div className="p-2 border-t border-zinc-300 shrink-0">
        <span className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest block mb-3 leading-none">Attached_Skill_Nodes</span>
        <div className="flex flex-wrap gap-2">
            {skills.length > 0 ? (
                skills.map((skill) => (
                    <SkillNode key={skill} skill={skill} onRemove={onRemove} />
                ))
            ) : (
                <span className="text-[9px] font-mono font-bold text-zinc-300 uppercase italic">No_Skills_Injected</span>
            )}
        </div>
    </div>
);