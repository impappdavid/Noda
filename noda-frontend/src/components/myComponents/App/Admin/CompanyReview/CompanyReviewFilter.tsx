import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronsUpDown } from 'lucide-react';

interface FilterComboboxProps {
    label: string;
    options: { label: string; value: string }[];
    current: string;
    onSelect: (val: string) => void;
}

export const FilterCombobox: React.FC<FilterComboboxProps> = ({ label, options, current, onSelect }) => {
    const [open, setOpen] = useState(false);
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="ghost" className="h-full w-full rounded-none text-[10px] font-mono font-black uppercase hover:bg-zinc-50 px-4 justify-between border-none ring-0">
                    <span className="truncate text-zinc-400">{current !== "All" ? current : label}</span>
                    <ChevronsUpDown className="h-3 w-3 shrink-0 opacity-40" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 z-[100] w-[190px] rounded-none border-zinc-300" align="start">
                <Command className="font-mono bg-white">
                    <CommandGroup>
                        {options.map((opt) => (
                            <CommandItem 
                                key={opt.value} 
                                value={opt.value} 
                                className="text-[10px] font-bold uppercase py-2 cursor-pointer" 
                                onSelect={(v) => { onSelect(v); setOpen(false); }}
                            >
                                {opt.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
};