import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageSquare, Zap, MoreHorizontal, MapPin, DollarSign, ChevronRight, ShieldCheck } from 'lucide-react';
import type { JobProps, PostProps, UserCardProps } from '@/types/company';


// Optimized Social Post
export const SocialPost = React.memo(({ author, username, role, time, content }: PostProps) => (
    <div className="border-b border-zinc-300">
        <Link to={`/app/post/${author}`} className="block hover:bg-zinc-200/60 transition-colors group p-4">
            <div className="flex justify-between items-start mb-1">
                <div className="flex gap-3">
                    <div className="w-10 h-10 border border-zinc-200 bg-zinc-900 flex items-center justify-center font-black text-white shrink-0">{author[0]}</div>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-zinc-900 leading-none">{author}</span>
                            <span className="text-xs font-mono text-zinc-400 uppercase">{username}</span>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase">{role} • {time}</span>
                    </div>
                </div>
                <button className="text-zinc-500 hover:text-zinc-900 p-1 hover:bg-zinc-300/50 transition-colors"><MoreHorizontal size={16} /></button>
            </div>
            <div className="pl-13">
                <p className="text-sm text-zinc-800 leading-relaxed mb-3">{content}</p>
                <div className="flex items-center gap-8 pt-2">
                    <PostAction icon={<Heart size={16} />} count="102" />
                    <PostAction icon={<MessageSquare size={16} />} count="24" />
                    <PostAction icon={<Zap size={16} />} label="Boost" />
                </div>
            </div>
        </Link>
    </div>
));

const PostAction = ({ icon, count, label }: { icon: React.ReactNode, count?: string, label?: string }) => (
    <button className="flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-orange-600 transition-colors cursor-pointer">
        {icon} {count || label}
    </button>
);

// Optimized Job Listing
export const JobListing = React.memo(({ role, location, pay, time, match }: JobProps) => (
    <div className="p-4 bg-white hover:bg-zinc-200/60 transition-colors cursor-pointer group flex justify-between items-center">
        <div className="space-y-1">
            <span className="text-[9px] font-mono font-black text-orange-600 uppercase tracking-widest">Active_Sequence • {time}</span>
            <h4 className="text-sm font-black uppercase tracking-tighter group-hover:underline">{role}</h4>
            <div className="flex items-center gap-3 text-[10px] font-mono font-bold text-zinc-500 uppercase">
                <span className="flex items-center gap-1"><MapPin size={10} /> {location}</span>
                <span className="flex items-center gap-1"><DollarSign size={10} /> {pay}</span>
            </div>
        </div>
        <div className="flex items-center gap-3">
             <div className="px-2 py-1 bg-zinc-900 text-white text-[9px] font-mono font-black uppercase">{match}%_Match</div>
             <ChevronRight size={16} className="text-zinc-500" />
        </div>
    </div>
));

// Optimized User Card
export const UserCard = React.memo(({ name, role, verified }: UserCardProps) => (
    <div className="flex items-center justify-between p-3 hover:bg-zinc-200/60 transition-colors group cursor-pointer bg-white">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-zinc-900 border border-zinc-800 flex items-center justify-center font-black text-white text-xs">{name[0]}</div>
            <div>
                <div className="flex items-center gap-1.5">
                    <h5 className="text-sm font-bold uppercase tracking-tight leading-none">{name}</h5>
                    {verified && <ShieldCheck size={12} className="text-blue-500" />}
                </div>
                <p className="text-[10px] font-mono font-bold text-zinc-500 uppercase mt-1 tracking-widest">{role}</p>
            </div>
        </div>
        <button className="h-8 px-4 border border-zinc-900 text-[9px] font-mono font-black uppercase hover:bg-zinc-800 hover:text-white transition-all cursor-pointer">Ping_Node</button>
    </div>
));