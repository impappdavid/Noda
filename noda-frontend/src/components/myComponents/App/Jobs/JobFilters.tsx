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
                    className="h-10 w-full rounded-none gap-1 text-[10px] font-mono font-black uppercase hover:bg-zinc-50 px-4 justify-between"
                >
                    <span className="truncate">
                        {value ? options.find((opt) => opt.value === value)?.label : label}
                    </span>
                    <ChevronsUpDown className="ml-1 h-3 w-3 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            {/* PopoverContent width matches trigger for a clean look */}
            <PopoverContent className="p-0 z-[100] w-[212px] rounded-none border-zinc-300" align="start">
                <Command className="font-mono">
                    <CommandGroup>
                        {options.map((opt) => (
                            <CommandItem
                                key={opt.value}
                                value={opt.value}
                                className="text-xs uppercase cursor-pointer py-1.5 "
                                onSelect={(currentValue) => {
                                    setValue(currentValue === value ? "" : currentValue);
                                    setOpen(false);
                                }}
                            >
                                <Check
                                    className={cn(
                                        " h-3 w-3",
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

export default FilterCombobox