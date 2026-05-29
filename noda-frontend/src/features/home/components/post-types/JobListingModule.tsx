import React from "react";
import { Briefcase, MapPin, DollarSign, ArrowUpRight } from "lucide-react";
import type { JobListingData } from "@/components/myComponents/App/Home/PostCards/types";

// Adding recruiter profile variables directly inside the interface context
interface JobListingModuleProps {
  job: JobListingData & {
    recruiterAvatar?: string;
  };
}

export const JobListingModule = ({ job }: JobListingModuleProps) => {
  // Use a fallback avatar string if none is explicitly provided in the data payload
  const recruiterImg = job.recruiterAvatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Recruiter";

  return (
    <div 
      className="mt-2 border border-zinc-300 rounded-none bg-white p-2 flex flex-col gap-2 select-none"
      onClick={(e) => e.preventDefault()}
    >
      {/* 1. COMPACT JOB IDENTITY HEADER WITH NESTED SQUARE IMAGES */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          
          {/* HARD RECTILINEAR PROFILE WITHIN PROFILE MATRIX */}
          <div className="relative w-10 h-10 shrink-0 bg-zinc-900 border border-zinc-300 flex items-center justify-center">
            {/* Base Background: Verified Corporate Workspace Logo */}
            <img 
              src={job.companyLogo} 
              alt={job.companyName} 
              className="w-full h-full object-cover invert brightness-0 opacity-80" 
            />
            {/* Nested Inset: Assigned Recruiter Node Portrait */}
            <div className="absolute bottom-0 right-0 w-5 h-5 bg-white border-t border-l border-zinc-300 p-0.5 shadow-xs">
              <img 
                src={recruiterImg} 
                alt="Hiring Partner" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>

          <div className="min-w-0">
            <div className="text-[9px] font-mono font-black text-zinc-400 uppercase tracking-widest leading-none">
              {job.companyName} • OFFICIAL OPENING
            </div>
            <h3 className="text-xs font-mono font-black text-zinc-900 uppercase tracking-tight truncate mt-1 leading-none">
              {job.positionTitle}
            </h3>
          </div>
        </div>

       
      </div>

      {/* 2. FLAT INTEGRATED DATA MATRIX */}
      <div className="grid grid-cols-2 gap-1.5 border-t border-b border-zinc-300 py-2 my-0.5">
        <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-600 min-w-0">
          <MapPin size={11} className="text-zinc-400 shrink-0" />
          <span className="truncate uppercase font-bold">{job.location}</span>
        </div>
        {job.salaryRange && (
          <div className="flex items-center gap-0.5 text-[10px] font-mono text-zinc-600 min-w-0 justify-end">
            <DollarSign size={11} className="text-zinc-400 shrink-0" />
            <span className="truncate font-bold tracking-tight">{job.salaryRange}</span>
          </div>
        )}
      </div>

      {/* 3. KEY TECHNOLOGY TAG PILLS */}
      {job.tags && job.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {job.tags.map((tag, idx) => (
            <span 
              key={idx} 
              className="text-[9px] font-mono font-black bg-zinc-100 text-zinc-700 border border-zinc-300 px-1 py-0.5 uppercase tracking-tight"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* 4. APPLICATION CTA ROUTING PIPELINE */}
      <div className="mt-1">
        <a 
          href={job.applyUrl}
          target="_blank"
          rel="noreferrer"
          className="w-full h-7 bg-blue-600 hover:bg-blue-700 text-white transition-colors text-[10px] font-mono font-black uppercase tracking-widest flex items-center justify-center gap-1 active:scale-[0.99]"
        >
          <span>Watch the listing</span>
          <ArrowUpRight size={11} />
        </a>
      </div>
    </div>
  );
};