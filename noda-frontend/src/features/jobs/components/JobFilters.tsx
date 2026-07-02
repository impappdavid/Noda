import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

interface FilterComboboxProps {
  label: string;
  options: { label: string; value: string }[];
  value: string; // Controlled state from parent dashboard
  onChange: (value: string) => void; // State modifier callback
}

const FilterCombobox = ({ label, options, value, onChange }: FilterComboboxProps) => {
  const [open, setOpen] = useState(false);

  // Find selected item based on state passed down from parent container
  const selectedOption = options.find((opt) => opt.value.toLowerCase() === value.toLowerCase());

  // Determine if active value represents a custom applied query state (ignores default "all" / "any")
  const isFilteringActive = value && value !== "all" && value !== "any";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "h-10 w-full rounded-none gap-1 text-[10px] font-mono font-black uppercase px-4 justify-between transition-colors border-zinc-300",
            isFilteringActive 
              ? "bg-blue-500 text-white hover:bg-blue-600 hover:text-white data-[state=open]:bg-blue-600" 
              : "hover:bg-zinc-100 text-zinc-900 bg-white"
          )}
        >
          <span className="truncate">
            {/* MODIFIED LOGIC: If a custom option is chosen, show its specific label.
              Otherwise, if it is 'all' or 'any', display the main Category Label (e.g., 'EXPERIENCE')
            */}
            {isFilteringActive && selectedOption ? selectedOption.label : label}
          </span>
          <ChevronsUpDown className={cn("ml-1 h-3 w-3 shrink-0 transition-opacity", isFilteringActive ? "opacity-90" : "opacity-50")} />
        </Button>
      </PopoverTrigger>
      
      <PopoverContent className="p-0 z-100 w-40 rounded-none border border-zinc-300 shadow-md" align="start">
        <Command className="font-mono rounded-none bg-white">
          <CommandList className="max-h-75 overflow-y-auto">
            <CommandGroup className="p-0 divide-y divide-zinc-200">
              {options.map((opt) => {
                const isSelected = value.toLowerCase() === opt.value.toLowerCase();
                return (
                  <CommandItem
                    key={opt.value}
                    value={opt.value}
                    onSelect={() => {
                      // Pass exact target value upstream to trigger master memo updates
                      onChange(opt.value);
                      setOpen(false);
                    }}
                    className={cn(
                      "text-[9px] font-black uppercase cursor-pointer py-2 px-2.5 flex items-center gap-1.5 transition-colors rounded-none data-[selected='true']:bg-zinc-100 data-[selected='true']:text-zinc-900",
                      isSelected ? "text-blue-500 bg-zinc-50" : "text-zinc-700"
                    )}
                  >
                    <div className="w-3 flex items-center justify-start shrink-0">
                      {isSelected && <Check className="h-3 w-3 text-blue-500" strokeWidth={3} />}
                    </div>
                    <span className="truncate">{opt.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default FilterCombobox;