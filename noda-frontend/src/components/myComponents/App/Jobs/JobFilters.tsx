import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandGroup,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

const FilterCombobox = ({ label, options }: { label: string, options: { label: string, value: string }[] }) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    role="combobox"
                    aria-expanded={open}
                    // h-10 to match height of the bar, rounded-none to avoid gaps
                    className={cn(
                        "h-10 w-full rounded-none gap-1 text-[10px] font-mono font-black uppercase px-4 justify-between transition-colors",
                        // Dynamic styling based on selection state
                        value 
                            ? "bg-blue-500 text-white hover:bg-blue-600 hover:text-white data-[state=open]:bg-blue-600" 
                            : "hover:bg-zinc-100 text-zinc-900"
                    )}
                >
                    <span className="truncate">
                        {value ? options.find((opt) => opt.value === value)?.label : label}
                    </span>
                    <ChevronsUpDown className={cn("ml-1 h-3 w-3 shrink-0 ease-in-out", value ? "opacity-90" : "opacity-50")} />
                </Button>
            </PopoverTrigger>
            {/* PopoverContent width matches trigger for a clean look */}
            <PopoverContent className="p-0 z-[100] w-[160px] rounded-none border-zinc-300" align="start">
                <Command className="font-mono ">
                    <CommandGroup className="p-0 divide-y divide-zinc-300">
                        {options.map((opt) => (
                            <CommandItem
                                key={opt.value}
                                value={opt.value}
                                className="text-xs uppercase cursor-pointer py-1.5 px-1 "
                                onSelect={(currentValue) => {
                                    setValue(currentValue === value ? "" : currentValue);
                                    setOpen(false);
                                }}
                            >
                                <Check
                                    className={cn(
                                        " h-3 w-3 mr-0",
                                        value === opt.value ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {opt.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

export default FilterCombobox;