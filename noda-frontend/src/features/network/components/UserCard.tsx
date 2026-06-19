import { ArrowUpRight, Plus } from "lucide-react";
import { Link } from "react-router-dom";

export const UserCard = ({ person }: any) => (
  <Link
    to={`/app/user/${person.name}`}
    className=" bg-white flex flex-col [&>*:nth-child(n+3)]:border-b  [&>*:nth-child(3)]:border-r-none border-r border-zinc-300 justify-between group hover:bg-zinc-50 transition-all relative cursor-pointer"
  >
    <div className="flex justify-between items-start p-1.5">
      {/* Left: Avatar Box */}
      <img
        src="https://marszalstudio.pl/wp-content/uploads/2024/01/fajne-zdjecia-profilowe-19.webp"
        className=" flex items-center justify-center font-mono font-black w-10 text-xs group-hover:bg-zinc-800 group-hover:text-white transition-all"
      />
      <div className="">
        <div className=" opacity-0 group-hover:opacity-100 transition-all translate-x-1 group-hover:translate-x-0">
          <ArrowUpRight size={12} className="text-zinc-800" />
        </div>
      </div>
    </div>

    <div className=" w-full flex p-1.5">
      <div className="space-y-1 w-full">
        <div className="flex items-center gap-1">
          <h3 className="text-[12px] font-bold tracking-tight leading-none">
            {person.name}
          </h3>
        </div>
        <p className="text-[10px] font-mono text-zinc-800 uppercase leading-tight tracking-wider">
          {person.role} <br />
        </p>
        <div className="border-t border-zinc-300 grid grid-cols-4 text-[10px] pt-1">
          <div className="col-span-1 flex flex-col gap-1">
            <div className="text-zinc-600">Company:</div>
            <div className="text-zinc-600">School:</div>
            <div className="text-zinc-600">Tags:</div>
          </div>
          <div className="col-span-3 flex flex-col gap-1">
            <div className="text-black font-semibold">{person.company}</div>
            <div className="text-black font-semibold">MIT</div>
            <div className="flex gap-1">
                <div className="py-px px-1 bg-zinc-200 border border-zinc-300">React</div>
                <div className="py-px px-1 bg-zinc-200 border border-zinc-300">Agile</div>
                <div className="py-px px-1 bg-zinc-200 border border-zinc-300">+4</div>
            </div>
          </div>
        </div>
        
      </div>
      
    </div>
    <div className="grid grid-cols-2 mt-1">
            <button className="text-black border-t border-zinc-300 cursor-pointer hover:bg-zinc-200 text-[11px] flex items-center justify-center py-1">Explore Profile</button>
            <button className="bg-blue-500 text-white cursor-pointer hover:bg-blue-600 text-[11px] flex items-center justify-center">Connect</button>
        </div>
  </Link>
);
