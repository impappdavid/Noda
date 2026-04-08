import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { JobNode } from "@/types/admin/applications";
import { Calendar1, EllipsisVertical, Pencil, Trash } from "lucide-react";
import React from "react";

export const JobCard = React.memo(
  ({ job }: { job: JobNode }) => (
    <div className="p-2 bg-white hover:bg-zinc-100 transition-all cursor-pointer group flex items-center justify-between border-b border-zinc-300">
      <div className="flex flex-col gap-1 w-full">
        <div className="flex justify-between h-fit">
          <div className="w-8 h-8 bg-zinc-800 text-white flex items-center justify-center border border-zinc-800 shrink-0 uppercase font-bold text-xs">
            {job.role.substring(0, 2)}
          </div>
          <DropdownMenu modal={false}>
            {/* 1. Trigger using your custom SVG styled container */}
            <DropdownMenuTrigger asChild onClick={(e) => e.preventDefault()}>
              <div className="p-1 hover:bg-zinc-300/80 cursor-pointer text-zinc-500 h-fit aspect-square">
                <EllipsisVertical className="w-3.5 h-3.5" />
              </div>
            </DropdownMenuTrigger>

            {/* 2. Menu Content styled for Noda */}
            <DropdownMenuContent
              className="w-36 p-0  rounded-none border-zinc-300  "
              align="end"
              forceMount
            >
              <DropdownMenuGroup className="divide-y divide-zinc-300">
                <DropdownMenuItem className="rounded-none hover:bg-zinc-200/80 px-2 py-1.5 text-[11px] text-zinc-600 focus:bg-zinc-100 focus:text-zinc-900 cursor-pointer">
                  <Pencil className=" h-3.5 w-3.5 text-zinc-400" />
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-none hover:bg-zinc-200/80 px-2 py-1.5 text-[11px] text-zinc-600 focus:bg-zinc-50 focus:text-zinc-900 cursor-pointer">
                  <Calendar1 className=" h-3.5 w-3.5 text-zinc-400" />
                  <span>Interview Dates</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-none hover:bg-zinc-200/80 px-2 py-1.5 text-[11px] text-red-500 focus:bg-red-50 focus:text-red-600 cursor-pointer ">
                  <Trash className=" h-3.5 w-3.5" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex flex-col w-full">
          <h5 className="text-sm font-bold uppercase tracking-tight group-hover:text-blue-500 transition-colors">
            {job.role}
          </h5>
          <div className="flex items-center gap-1 text-[11px]">
            <span className="truncate">Remote</span>
            <span className="opacity-30">•</span>
            <span className="truncate">Full-Time</span>
            <span className="opacity-30">•</span>
            <span className="truncate">0-1 year</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase">
              {job.applicants} Applies
            </span>
            <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase">
              {job.deadline} to reply
            </span>
          </div>
        </div>
      </div>
    </div>
  ),
);