import { useState } from "react";
import { cn } from "@/lib/utils";

interface Job {
  id: number;
  company: string;
  role: string;
  workMode: string;
  type: string;
  experience: string;
  match: number;
  applied?: boolean;
  postedAt?: string | Date | number; // Primary time key
  date?: string | Date | number;     // Fallback data key
  timestamp?: number;                // Fallback unix key
}

interface MinimalistJobListProps {
  jobs: Job[];
  selectedJob: Job | null;
  onSelect: (job: Job) => void;
}

// Dynamic timing compilation engine supporting flexible timestamp schemas
const formatRelativeTime = (job: Job): string => {
  const dateInput = job.postedAt || job.date || job.timestamp;
  if (!dateInput) return "any time";

  const now = new Date().getTime();
  const postedDate = new Date(dateInput).getTime();
  const diffInMs = now - postedDate;

  // Handle invalid dates or system drift gracefully
  if (isNaN(postedDate) || diffInMs <= 0) return "just now";

  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);

  // Less than 24 hours -> format as 'h'
  if (diffInHours < 24) {
    return `${Math.max(1, diffInHours)}h`;
  }
  
  // Greater than 6 days -> format as weeks ('w ago')
  if (diffInDays > 6) {
    return `${Math.max(1, diffInWeeks)}w ago`;
  }

  // Fallback: Between 24 hours and 6 days inclusive -> format as days ('d ago')
  return `${diffInDays}d ago`;
};

const MinimalistJobList = ({ jobs, selectedJob, onSelect }: MinimalistJobListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 11;

  const totalPages = Math.ceil(jobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentJobs = jobs.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getVisiblePageNumbers = () => {
    const maxVisible = 4;
    const pages: number[] = [];
    
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const visiblePages = getVisiblePageNumbers();
  const showTrailingEllipsis = totalPages > 5 && visiblePages[visiblePages.length - 1] < totalPages - 1;
  const showLastPage = totalPages > 5 && visiblePages[visiblePages.length - 1] < totalPages;

  return (
    <div className="flex flex-col h-219.25 w-full overflow-hidden relative bg-white">
      {/* JOB ITEM TRACK CONTAINER */}
      <div className="flex-1 overflow-y-auto scrollbar-hide pb-9">
        {currentJobs.map((job) => {
          const isSelected = selectedJob?.id === job.id;
          const isApplied = job.applied || (isSelected && selectedJob?.applied);

          return (
            <div
              key={job.id}
              onClick={() => onSelect(job)}
              className={cn(
                "group p-2 border-b border-zinc-300 transition-all cursor-pointer flex flex-col justify-center shrink-0",
                isSelected ? "bg-zinc-200" : "bg-white hover:bg-zinc-200/60"
              )}
            >
              <div className="flex justify-between items-center">
                {/* COMPANY & POSTED TIME WRAPPER BLOCK */}
                <div className="flex items-baseline gap-2 overflow-hidden mr-2">
                  <span
                    className={cn(
                      "text-[10px] font-mono uppercase tracking-wide font-black truncate",
                      isSelected ? "text-zinc-600" : "text-zinc-500"
                    )}
                  >
                    {job.company}
                  </span>
                  
                  {/* RELATIVE TIMESTAMP BADGE (Beside Company Name) */}
                  <span className="text-[9px] font-mono font-bold text-zinc-400 normal-case shrink-0">
                    {formatRelativeTime(job)}
                  </span>
                </div>

                {/* META INDICATOR BLOCK CONTAINER */}
                <div className="flex items-center gap-1.5 shrink-0">
                  {/* APPLIED PARAMETER INDICATOR */}
                  {isApplied && (
                    <span 
                      className={cn(
                        "text-[9px] font-mono font-bold px-1 py-0.5 flex items-center gap-0.5 tracking-wide border transition-colors",
                        isSelected 
                          ? "bg-blue-500 border-blue-500 text-white" 
                          : "bg-blue-500/10 border-blue-500/50 text-blue-500"
                      )}
                    >
                      <span>APPLIED</span>
                    </span>
                  )}

                  {/* PERCENTAGE MATCH BOX */}
                  <span
                    className={cn(
                      "text-[10px] font-mono font-bold px-1.5 py-0.5 border",
                      isSelected
                        ? job.match > 90
                          ? "bg-blue-500/20 border-blue-500/50 text-blue-700"
                          : "border-zinc-800/30 bg-zinc-500/20 text-zinc-800"
                        : job.match > 90
                          ? "bg-blue-500/20 border-transparent text-blue-700"
                          : "bg-zinc-200 border-transparent text-zinc-500"
                    )}
                  >
                    {job.match}%
                  </span>
                </div>
              </div>

              <div className="flex flex-col mt-0.5">
                <h3
                  className={cn(
                    "text-sm font-bold truncate leading-none",
                    isSelected ? "text-black" : "text-zinc-900"
                  )}
                >
                  {job.role}
                </h3>
                
                <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-600 mt-1 uppercase">
                  <span className="truncate">{job.workMode}</span>
                  <span className="opacity-30">•</span>
                  <span className="truncate">{job.type}</span>
                  <span className="opacity-30">•</span>
                  <span className="truncate">{job.experience}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ANCHORED BRUTALIST PAGINATION BAR */}
      {totalPages > 1 && (
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-white border-t border-zinc-300 w-full h-9 flex items-stretch">
          {/* PREV UNIT */}
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="w-12 border-r border-zinc-300 flex items-center justify-center hover:bg-zinc-100 disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors cursor-pointer border-none bg-transparent"
          >
            <span className="text-[10px] font-mono font-black">{"<"}</span>
          </button>

          {/* DYNAMIC PAGE NODES */}
          <div className="flex items-stretch divide-x divide-zinc-300 border-r border-zinc-300">
            {visiblePages.map((pageNum) => (
              <button
                type="button"
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={cn(
                  "w-9 flex items-center justify-center text-[10px] font-mono font-black transition-all cursor-pointer border-none",
                  currentPage === pageNum
                    ? "bg-blue-500 text-white"
                    : "bg-white text-zinc-900 hover:bg-zinc-100",
                )}
              >
                {pageNum.toString().padStart(2, "0")}
              </button>
            ))}

            {/* ELLIPSIS */}
            {showTrailingEllipsis && (
              <div className="w-9 flex items-center justify-center bg-zinc-50 text-zinc-400 select-none">
                <span className="text-[10px] font-black">...</span>
              </div>
            )}

            {/* LAST PAGE BOUNDARY NODE */}
            {showLastPage && (
              <button
                type="button"
                onClick={() => handlePageChange(totalPages)}
                className={cn(
                  "w-9 flex items-center justify-center text-[10px] font-mono font-black transition-all cursor-pointer border-none",
                  currentPage === totalPages
                    ? "bg-blue-500 text-white"
                    : "bg-white text-zinc-900 hover:bg-zinc-100",
                )}
              >
                {totalPages}
              </button>
            )}
          </div>

          {/* SPACER TRACK BAR BUFFER */}
          <div className="flex-1 bg-white" />

          {/* NEXT UNIT */}
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="w-12 border-l border-zinc-300 flex items-center justify-center hover:bg-zinc-200 disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors cursor-pointer border-none bg-transparent"
          >
            <span className="text-[10px] font-mono font-black">{">"}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default MinimalistJobList;