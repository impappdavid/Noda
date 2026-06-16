import { ArrowUpRight, Plus } from "lucide-react";
import { Link } from "react-router-dom";

export const UserCard = ({ person }: any) => (
    <Link to={`/app/user/${person.name}`} className="p-1.5 bg-white flex flex-col border-r border-zinc-300 justify-between  group hover:bg-zinc-50 transition-all relative cursor-pointer">
        <div className="flex justify-between items-start">
            {/* Left: Avatar Box */}
            <img src='https://marszalstudio.pl/wp-content/uploads/2024/01/fajne-zdjecia-profilowe-19.webp' className=" flex items-center justify-center font-mono font-black text-xs group-hover:bg-zinc-800 group-hover:text-white transition-all" />
        </div>

        <div className="mt-2 w-full flex justify-between">
            <div className="space-y-1">
                <div className="flex items-center gap-1">
                    <h3 className="text-[11px] font-bold tracking-tight leading-none">{person.name}</h3>
                    <div className=" opacity-0 group-hover:opacity-100 transition-all translate-x-1 group-hover:translate-x-0">
                        <ArrowUpRight size={12} className="text-zinc-800" />
                    </div>
                </div>
                <p className="text-[10px] font-mono text-zinc-800 uppercase leading-tight tracking-wider">
                    {person.role} <br />
                    <span className="text-zinc-900 font-black">@{person.company}</span>
                </p>
            </div>
            <button onClick={(e) => e.preventDefault()} className="w-6 h-6 bg-blue-500 flex justify-center items-center text-white cursor-pointer hover:bg-blue-600 transition-colors">
                <Plus className='w-3.5 h-3.5'/>
            </button>
        </div>


    </Link>
);