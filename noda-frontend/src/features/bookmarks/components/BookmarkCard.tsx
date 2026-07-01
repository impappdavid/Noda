import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, ArrowUpRight, Briefcase, FileText } from 'lucide-react';
import type { BookmarkNode } from '@/types/bookmarks';

interface Props {
    data: BookmarkNode;
}

const BookmarkCard: React.FC<Props> = ({ data }) => {
    const isJob = data.type === "Job";

    return (
        <Link 
            to={isJob ? `/app/jobs/${data.id}` : `/app/post/${data.id}`} 
            className="p-3 flex flex-col justify-center min-h-22.5 bg-white hover:bg-zinc-50 transition-colors cursor-pointer group relative"
        >
            <div className="flex justify-between items-start mb-1">
                <div className="flex flex-col min-w-0">
                    <span className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest leading-none">
                        {data.status} 
                        {isJob && data.match && (
                            <>
                                <span className="mx-1 opacity-50">•</span> 
                                {data.match}% MATCH
                            </>
                        )}
                    </span>
                    <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-tight truncate leading-tight mt-1.5">
                        {data.title}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1">
                        {isJob ? (
                            <Briefcase size={11} className="text-zinc-600"/>
                        ) : (
                            <FileText size={11} className="text-zinc-500"/>
                        )}
                        <span className="text-[11px] font-mono font-bold text-zinc-600 uppercase tracking-tighter">
                            {data.entity}
                        </span>
                    </div>
                </div>
                <div className="text-zinc-200 group-hover:text-zinc-900 transition-colors">
                    <ArrowUpRight size={16} />
                </div>
            </div>

            <div className="flex items-center justify-between mt-auto">
                <span className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-tighter">
                    {data.meta}
                </span>
                <button className="text-zinc-900" onClick={(e) => e.preventDefault()}>
                    <Bookmark size={12} fill="currentColor" />
                </button>
            </div>
        </Link>
    );
};

export default React.memo(BookmarkCard);