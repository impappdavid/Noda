import React, { useState } from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from '@/lib/utils';

const MinimalistJobList = ({ jobs, selectedJob, onSelect }: any) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 11;

    const totalPages = Math.ceil(jobs.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentJobs = jobs.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Helper logic for truncated pagination (1 2 3 ... 64)
    const renderPaginationItems = () => {
        const items = [];
        const siblingCount = 1; // Show one number on each side of the current page

        // 1. ALWAYS RENDER FIRST PAGE
        if (currentPage < 2 || currentPage === 2) {

            items.push(renderPageItem(1));
        }

        // 2. LEFT ELLIPSIS


        // 3. MIDDLE SLIDING WINDOW
        // Calculate range based on your specific requirements
        // We want to show the current page and its immediate neighbors
        const start = Math.max(2, currentPage - siblingCount);
        let end = Math.min(totalPages - 1, currentPage + siblingCount);

        // Adjustments to match your specific examples:
        // If on page 1, show 2 (to get 1 2 ...)
        if (currentPage === 1 && totalPages > 2) end = 3;
        // If on page 2, show 2 and 3 (to get 1 2 3 ...)
        if (currentPage === 2 && totalPages > 3) end = 3;

        for (let i = start; i <= end; i++) {
            items.push(renderPageItem(i));
        }

        // 4. RIGHT ELLIPSIS
        // Show ellipsis if there is a gap between the window end and the last page
        if (currentPage < totalPages - 1) {
            items.push(
                <PaginationItem key="ellipsis-right">
                    <PaginationEllipsis className="w-7 h-7" />
                </PaginationItem>
            );
        }

        // 5. ALWAYS RENDER LAST PAGE
        if (totalPages > 1) {
            items.push(renderPageItem(totalPages));
        }

        return items;
    };

    const renderPageItem = (page: number) => (
        <PaginationItem key={page}>
            <PaginationLink
                className="cursor-pointer rounded-none h-7 w-7"
                onClick={() => handlePageChange(page)}
                isActive={currentPage === page}
            >
                {page}
            </PaginationLink>
        </PaginationItem>
    );

    return (
        <div className="flex flex-col h-fit overflow-hidden ">

            <div className="flex-1 flex flex-col pb-16 overflow-y-auto scrollbar-hide">
                {currentJobs.map((job: any) => {
                    const isSelected = selectedJob.id === job.id;

                    return (
                        <div
                            key={job.id}
                            onClick={() => onSelect(job)}
                            className={`group p-2 border-b border-zinc-300 transition-all cursor-pointer flex flex-col justify-center min-h-[70px] ${isSelected ? "bg-zinc-200" : "bg-white hover:bg-zinc-200/60 "
                                }`}
                        >
                            <div className="flex justify-between items-center">
                                <span className={`text-[10px] font-mono uppercase tracking-wide font-black ${isSelected ? "text-zinc-600" : "text-zinc-500"
                                    }`}>
                                    {job.company}
                                </span>
                                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${isSelected
                                    ? (job.match > 90 ? 'bg-orange-500/20 border-orange-500/50 text-orange-700' : 'border-zinc-800/30 bg-zinc-500/20 text-zinc-800')
                                    : (job.match > 90 ? 'bg-orange-500/20 border-transparent text-orange-700' : 'bg-zinc-200 border-transparent text-zinc-500')
                                    }`}>
                                    {job.match}%
                                </span>
                            </div>

                            <div className="flex flex-col mt-1">
                                <h3 className={`text-sm font-bold truncate leading-none ${isSelected ? "text-black" : "text-zinc-900"
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

            {totalPages > 1 && (
                <div className="absolute bottom-23 left-0 right-0 backdrop-blur-md shrink-0 flex items-center justify-center w-full z-10">
                    <Pagination className=''>
                        <PaginationContent className="flex items-center gap-0 w-full shadow-sm rounded-none h-10">

                            {/* PREVIOUS BUTTON */}
                            <PaginationItem className='w-full border-t py-2 border-r border-zinc-300'>
                                <PaginationPrevious
                                    className={cn(
                                        "cursor-pointer h-full px-3 w-full rounded-none bg-white hover:bg-transparent  text-zinc-600 hover:text-zinc-900 transition-colors text-[9px] font-mono font-black uppercase tracking-widest",
                                        currentPage === 1 ? 'pointer-events-none opacity-30 bg-zinc-50' : ''
                                    )}
                                    onClick={() => handlePageChange(currentPage - 1)}
                                />
                            </PaginationItem>

                            {/* CURRENT / TOTAL INDICATOR */}
                            <PaginationItem className="px-5 w-20 border-t border-r border-zinc-300 h-12 flex items-center justify-center text-[12px] font-mono font-black tracking-widest text-zinc-900">
                                {currentPage} <span className="text-zinc-500 mx-2">/</span> {totalPages}
                            </PaginationItem>

                            {/* NEXT BUTTON */}
                            <PaginationItem className='w-full border-t py-2 border-zinc-300'>
                                <PaginationNext
                                    className={cn(
                                        "cursor-pointer h-full w-full px-3 rounded-none border-l border-zinc-300 bg-white hover:bg-transparent text-zinc-600 hover:text-zinc-900 transition-colors text-[10px] font-mono font-black uppercase tracking-widest",
                                        currentPage === totalPages ? 'pointer-events-none opacity-100' : ''
                                    )}
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