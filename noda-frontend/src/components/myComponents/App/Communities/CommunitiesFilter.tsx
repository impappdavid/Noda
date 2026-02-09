import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

const FilterCombobox = ({ label, options }: any) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="ghost" className="h-10 w-full rounded-none text-[10px] font-mono font-black uppercase hover:bg-zinc-50 px-4 justify-between border-none ring-0">
                    <span className="truncate text-zinc-400">{value ? options.find((o: any) => o.value === value)?.label : label}</span>
                    <ChevronsUpDown className="h-3 w-3 shrink-0 opacity-40" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 z-[100] w-[--radix-popover-trigger-width] rounded-none border-zinc-200 shadow-xl" align="start">
                <Command className="font-mono text-zinc-900">
                    <CommandGroup>
                        {options.map((opt: any) => (
                            <CommandItem key={opt.value} value={opt.value} className="text-[10px] font-bold uppercase py-2.5 cursor-pointer" onSelect={(v) => { setValue(v); setOpen(false); }}>
                                <Check className={cn("mr-2 h-3 w-3", value === opt.value ? "opacity-100" : "opacity-0")} />
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