import { Search } from "lucide-react";

interface FilterProps {
  value: string;
  onChange: (val: string) => void;
}

const CommunitiesFilter = ({ value, onChange }: FilterProps) => {
  return (
    <div className="bg-white sticky top-0 z-10 w-full">
      <div className="relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
        <input
          type="text"
          placeholder="Search communities..."
          className="w-full rounded-none bg-zinc-100 h-10 py-2 pl-9 pr-4 text-xs outline-none"
          onChange={(e) => onChange(e.target.value)}
          value={value}
        />
      </div>
    </div>
  );
};

export default CommunitiesFilter;
