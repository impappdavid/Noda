import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { Community } from '@/types/community';

interface CardProps {
    community: Community;
}

const CompactProtocolCard: React.FC<CardProps> = ({ community }) => (
    <Link 
        to={`/app/communities/${community.name}`} 
        className="group bg-white flex flex-col justify-center relative hover:bg-zinc-100 transition-all cursor-pointer overflow-hidden"
    >
        <div className="relative z-10 p-3 flex justify-between items-center min-w-0">
            <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded bg-zinc-100 border border-zinc-200 flex-shrink-0 flex items-center justify-center overflow-hidden">
                    <img 
                        src={community.logo} 
                        alt={community.name} 
                        className="w-7 h-7 object-contain opacity-70 group-hover:opacity-100 transition-opacity" 
                    />
                </div>

                <div className="flex flex-col min-w-0">
                    <span className="text-[9px] font-mono flex items-center font-bold text-zinc-500 uppercase tracking-widest leading-none">
                        {community.tag} <span className="mx-1.5 text-zinc-400">•</span> {community.members}
                    </span>
                    <h3 className="text-[11px] font-bold text-zinc-900 uppercase tracking-tight truncate leading-tight mt-1.5 group-hover:text-black">
                        {community.name}
                    </h3>
                </div>
            </div>

            <div className="flex items-center justify-center pl-2">
                <ArrowUpRight 
                    size={14} 
                    className="text-zinc-200 group-hover:text-zinc-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" 
                />
            </div>
        </div>
    </Link>
);

export default React.memo(CompactProtocolCard); // Performance: Prevent re-renders if props don't change