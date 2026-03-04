import { useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const MinimalistJobList = ({ jobs, selectedJob, onSelect }: any) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Note: Ensure your container height can handle 11 items
    
    const totalPages = Math.ceil(jobs.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentJobs = jobs.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="flex flex-col h-fit overflow-hidden bg-white relative">
            
            {/* 1. Added pb-16 to prevent the last item from being hidden behind the absolute bar */}
            <div className="flex-1 flex flex-col pb-16 overflow-y-auto scrollbar-hide">
                {currentJobs.map((job: any) => {
                    const isSelected = selectedJob.id === job.id;

                    return (
                        <div
                            key={job.id}
                            onClick={() => onSelect(job)}
                            className={`group p-2 border-b border-zinc-300 transition-all cursor-pointer flex flex-col justify-center min-h-[70px] ${
                                isSelected ? "bg-zinc-200" : "bg-white hover:bg-zinc-200/60 "
                            }`}
                        >
                            <div className="flex justify-between items-center">
                                <span className={`text-[10px] font-mono uppercase tracking-wide font-black ${
                                    isSelected ? "text-zinc-600" : "text-zinc-500"
                                }`}>
                                    {job.company}
                                </span>
                                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                                    isSelected 
                                        ? (job.match > 90 ? 'bg-orange-500/20 border-orange-500/50 text-orange-700' : 'border-zinc-800/30 bg-zinc-500/20 text-zinc-800')
                                        : (job.match > 90 ? 'bg-orange-500/20 border-transparent text-orange-700' : 'bg-zinc-200 border-transparent text-zinc-500')
                                }`}>
                                    {job.match}%
                                </span>
                            </div>

                            <div className="flex flex-col mt-1">
                                <h3 className={`text-sm font-bold truncate leading-none ${
                                    isSelected ? "text-black" : "text-zinc-900"
                                }`}>
                                    {job.role}
                                </h3>
                                <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 mt-1 uppercase">
                                    <span className="truncate">{job.workMode}</span>
                                    <span className="opacity-30">•</span>
                                    <span className="truncate">{job.type}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {currentJobs.length < itemsPerPage && (
                    <div className="flex-1 bg-zinc-50/10" />
                )}
            </div>

            {/* 2. Added "left-0 right-0" or "w-full" so the absolute box spans the width */}
            {totalPages > 1 && (
                <div className="absolute bottom-2 left-0 right-0 p-2.5 border-t border-zinc-300 backdrop-blur-sm shrink-0 flex items-center justify-center w-full z-10">
                    <Pagination>
                        <PaginationContent className="text-[9px] font-bold">
                            <PaginationItem>
                                <PaginationPrevious 
                                    className={`cursor-pointer ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`}
                                    onClick={() => handlePageChange(currentPage - 1)} 
                                />
                            </PaginationItem>
                            
                            {[...Array(totalPages)].map((_, i) => (
                                <PaginationItem key={i}>
                                    <PaginationLink 
                                        className="cursor-pointer rounded-none h-7 w-7 "
                                        onClick={() => handlePageChange(i + 1)} 
                                        isActive={currentPage === i + 1}
                                    >
                                        {i + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                            <PaginationItem>
                                <PaginationNext 
                                    className={`cursor-pointer ${currentPage === totalPages ? 'pointer-events-none opacity-20' : ''}`}
                                    onClick={() => handlePageChange(currentPage + 1)} 
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    );
};

export default MinimalistJobList;