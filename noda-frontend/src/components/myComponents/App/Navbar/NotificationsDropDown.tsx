import { Bell, Zap, ShieldAlert, MessageSquare, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MOCK_NOTIFICATIONS = [
    {
        id: 1,
        icon: <Zap size={14} className="text-orange-400" />,
        title: "SIGNAL_MATCH",
        description: "New architect node detected in Sector-7.",
        link: "/app/jobs/0x7F4"
    },
    {
        id: 2,
        icon: <ShieldAlert size={14} className="text-red-400" />,
        title: "SECURITY_AUTH",
        description: "Unrecognized entry attempt from IP: 192.168.1.1",
    },
    {
        id: 3,
        icon: <MessageSquare size={14} className="text-blue-400" />,
        title: "CONTROLLER_MSG",
        description: "Marcus Vane sent a priority transmission.",
        link: "/app/messages"
    }
];

const NotificationsDropDown = () => {
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <button className="p-2 hover:bg-zinc-200/80 text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer outline-none">
                    <Bell className="w-4 h-4" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent 
                align="end" 
                className="w-80 p-0 rounded-none border-zinc-300 bg-white  shadow-xl animate-in fade-in zoom-in-95 duration-200"
            >
                {/* HEADER */}
                <DropdownMenuLabel className="h-9 px-4 bg-whitetext-white flex items-center justify-between rounded-none border-b border-zinc-300">
                    <span className="text-[10px] font-mono font-black uppercase tracking-[0.2em]">Notifications</span>
                    <span className="text-[8px] font-mono font-bold text-zinc-500 uppercase tracking-widest">3_Active</span>
                </DropdownMenuLabel>

                {/* NOTIFICATION LIST */}
                <div className="flex flex-col">
                    {MOCK_NOTIFICATIONS.map((notif) => (
                        <DropdownMenuItem 
                            key={notif.id}
                            asChild
                            className="p-0 rounded-none focus:bg-zinc-50 border-b border-zinc-300 last:border-none cursor-pointer"
                        >
                            <Link to={notif.link || "#"} className="flex gap-2 p-2 items-center border-b border-zinc-300 hover:bg-zinc-200 transition-colors">
                                <div className="mt-1 shrink-0 p-2 bg-zinc-800 transition-colors">
                                    {notif.icon}
                                </div>
                                <div className="flex flex-col justify-center h-full pt-1">
                                    <h4 className="text-[11px] font-bold uppercase tracking-tight text-zinc-900 leading-none">
                                        {notif.title}
                                    </h4>
                                    <p className="text-[10px] font-mono text-zinc-800">
                                        {notif.description}
                                    </p>
                                </div>
                            </Link>
                        </DropdownMenuItem>
                    ))}
                </div>

                {/* FOOTER REDIRECT */}
                <DropdownMenuSeparator className="m-0 bg-zinc-300 h-px" />
                <DropdownMenuItem asChild className="p-0 rounded-none">
                    <Link 
                        to="/app/notifications" 
                        className="w-full h-9 flex items-center justify-center gap-2 bg-white hover:bg-zinc-800 hover:text-white transition-all group cursor-pointer"
                    >
                        <span className="text-[9px] font-mono font-black uppercase tracking-widest">Access_All_Nodes</span>
                        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default NotificationsDropDown;