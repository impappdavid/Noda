import type { CommunityData } from '@/types/community';
import React from 'react';

interface HeroProps {
    data: CommunityData;
}

const CommunityHero: React.FC<HeroProps> = ({ data }) => (
    <div className="relative pt-13">
        <div className="h-40 bg-zinc-900 overflow-hidden relative border-b border-zinc-300">
            <img 
                src={data.bannerImage} 
                className="w-full h-full object-cover opacity-40 grayscale"
                alt="Cluster"
            />
        </div>
        <div className="p-4 pb-4 relative">
            <div className="flex items-end justify-between -mt-14 mb-3">
                <div className="w-20 h-20 bg-zinc-900 border-2 border-white flex items-center justify-center shrink-0">
                    <span className="text-white font-mono font-black text-3xl">{data.initial}</span>
                </div>
                <button className="bg-zinc-800 text-white text-[10px] font-bold uppercase tracking-widest px-8 h-8 hover:bg-black transition-all cursor-pointer">
                    Join Cluster
                </button>
            </div>
            <h1 className="text-3xl font-bold tracking-tighter mb-1">{data.title}</h1>
            <p className="text-xs text-zinc-500 font-semibold tracking-tight max-w-2xl leading-relaxed">
                {data.description}
            </p>
        </div>
    </div>
);

export default CommunityHero;