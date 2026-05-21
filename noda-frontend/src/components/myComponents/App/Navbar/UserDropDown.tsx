import React, { useState } from "react";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuGroup, 
  DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, 
  DropdownMenuShortcut, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { User, Settings, LogOut, ShieldCheck, CreditCard, BadgePlus } from "lucide-react";
import { Link } from "react-router-dom";
import SystemSettingsDialog from "./SystemSettingsDialog";

const UserDropDown = () => {
    const [settingsOpen, setSettingsOpen] = useState(false);

    return (
        <>
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <div className="w-8 h-8 rounded-none bg-zinc-50 flex justify-center items-center border border-zinc-200 ml-2 cursor-pointer hover:bg-zinc-100 hover:border-zinc-300 transition-all shadow-sm group">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" className="fill-zinc-400 group-hover:fill-zinc-900 transition-colors">
                            <circle cx="12" cy="6" r="4" />
                            <path d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5" />
                        </svg>
                    </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-42 mt-2 rounded-none border-zinc-300 p-0" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal px-2 py-2">
                        <div className="flex flex-col">
                            <p className="text-xs font-bold leading-none text-zinc-900">Alex Rivers</p>
                        </div>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator className="bg-zinc-300" />

                    <DropdownMenuGroup>
                        <Link to={`/app/user/me`}>
                            <DropdownMenuItem className="rounded-none hover:bg-zinc-200 px-2 py-2 text-xs text-zinc-600 focus:bg-zinc-200 focus:text-zinc-900 cursor-pointer">
                                <User className="h-4 w-4 text-zinc-400" />
                                <span>Profile</span>
                            </DropdownMenuItem>
                        </Link>
                        
                        {/* INTERCEPTED: Triggers internal dialog instead of route swap */}
                        <DropdownMenuItem 
                            onSelect={() => setSettingsOpen(true)}
                            className="rounded-none hover:bg-zinc-200 px-2 py-2 text-xs text-zinc-600 focus:bg-zinc-200 focus:text-zinc-900 cursor-pointer"
                        >
                            <Settings className="h-4 w-4 text-zinc-400" />
                            <span>Settings</span>
                        </DropdownMenuItem>

                        <DropdownMenuItem className="rounded-none hover:bg-zinc-200 px-2 py-2 text-xs text-zinc-600 focus:bg-zinc-200 focus:text-zinc-900 cursor-pointer">
                            <CreditCard className="h-4 w-4 text-zinc-400" />
                            <span>Billing Tiers</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator className="bg-zinc-300" />

                    <DropdownMenuGroup>
                        <DropdownMenuItem className="rounded-none hover:bg-zinc-200 px-2 py-2 text-xs text-zinc-600 focus:bg-zinc-50 focus:text-zinc-900 cursor-pointer">
                            <ShieldCheck className="h-4 w-4 text-blue-500" />
                            <span>Verification</span>
                            <DropdownMenuShortcut className="text-[9px] font-mono">BETA</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <Link to={`/app/createcompany`}>
                            <DropdownMenuItem className="rounded-none hover:bg-zinc-200 px-2 py-2 text-xs text-zinc-600 focus:bg-zinc-50 focus:text-zinc-900 cursor-pointer">
                                <BadgePlus className="h-4 w-4 text-blue-500" />
                                <span>Create a company</span>
                            </DropdownMenuItem>
                        </Link>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator className="bg-zinc-300" />

                    <Link to={`/login`}>
                        <DropdownMenuItem className="rounded-none hover:bg-zinc-200/80 px-2 py-2 text-xs text-red-500 focus:bg-red-50 focus:text-red-600 cursor-pointer">
                            <LogOut className="h-4 w-4" />
                            <span>Logout</span>
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* CONTROL PANEL DIALOG INJECTION */}
            <SystemSettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
        </>
    );
};

export default UserDropDown;