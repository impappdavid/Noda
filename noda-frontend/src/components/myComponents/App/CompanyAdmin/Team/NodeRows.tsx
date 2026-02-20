import { Trash2, Clock } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { TeamNode } from '@/types/admin/team';

interface TeamTableProps {
  nodes: TeamNode[];
  onRemove: (id: string) => void;
}

const TeamRegistryTable = ({ nodes, onRemove }: TeamTableProps) => {
  return (
    <div className="w-full border border-zinc-300 bg-white">
      <Table>
        <TableHeader className="bg-zinc-50/50 border-b border-zinc-300">
          <TableRow className="hover:bg-transparent border-none h-10">
            <TableHead className="w-[280px] text-[10px] font-mono font-black text-zinc-500 uppercase tracking-widest pl-4">
              Node_Identity (Full_Name)
            </TableHead>
            <TableHead className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-widest">
              Uplink_Email
            </TableHead>
            <TableHead className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-widest">
              Access_Level
            </TableHead>
            <TableHead className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-widest">
              Joined_Date
            </TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {nodes.map((node) => (
            <TableRow 
              key={node.id} 
              className="group border-b border-zinc-200 hover:bg-zinc-50/50 transition-colors h-14"
            >
              {/* 1. FULL NAME & AVATAR */}
              <TableCell className="pl-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-zinc-900 flex items-center justify-center font-black text-white text-[10px] shrink-0 border border-zinc-800">
                    {node.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-black uppercase tracking-tight text-zinc-900 truncate">
                      {node.name}
                    </span>
                    <span className="text-[9px] font-mono text-zinc-400 leading-none mt-1 uppercase">
                      @{node.username}
                    </span>
                  </div>
                </div>
              </TableCell>

              {/* 2. EMAIL */}
              <TableCell>
                <span className="text-[10px] font-mono font-bold text-zinc-600 lowercase">
                  {node.name.toLowerCase().replace(' ', '.')}@noda.network
                </span>
              </TableCell>

              {/* 3. ROLE / ACCESS LEVEL */}
              <TableCell>
                <Select defaultValue={node.role}>
                  <SelectTrigger className="h-7 w-28 rounded-none border-zinc-200 bg-white text-[9px] font-mono font-black uppercase focus:ring-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent position="popper" className="rounded-none font-mono text-[10px] max-w-28 uppercase bg-white border-zinc-900">
                    <SelectItem value="CEO" className='cursor-pointer'>CEO_MASTER</SelectItem>
                    <SelectItem value="RECRUITER" className='cursor-pointer'>RECRUITER</SelectItem>
                    <SelectItem value="MARKETING" className='cursor-pointer'>MARKETING</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>

              {/* 4. JOINED DATE */}
              <TableCell>
                <div className="flex items-center gap-2 text-[9px] font-mono font-black text-zinc-400 uppercase">
                  <Clock size={12} className="text-zinc-300" />
                  { "14_FEB_2026"}
                </div>
              </TableCell>

              {/* ACTIONS */}
              <TableCell className="pr-4">
                <button 
                  onClick={() => onRemove(node.id)} 
                  className="p-2 text-zinc-300 hover:text-red-600 transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={14} />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TeamRegistryTable