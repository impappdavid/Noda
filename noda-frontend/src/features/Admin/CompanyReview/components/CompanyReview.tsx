import { useState } from "react";
import {
  User,
  X,
  Flag,
  BadgeQuestionMark,
  Search,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { FilterCombobox } from "./Filter";

const CompanyVerification = () => {
  const [companies] = useState([
    {
      id: "901",
      name: "Google",
      type: "AI/ML",
      companyLogo:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/3840px-Google_%22G%22_logo.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail",
      domain: "www.google.com",
      companyEmail: "info@google.com",
      status: "waiting",
      submittedUser: "@alexriver",
    },
    {
      id: "904",
      name: "Vercel",
      type: "Hosting",
      companyLogo:
        "https://encore.cloud/assets/resources/vercel_cover.jpg",
      domain: "www.vercel.com",
      companyEmail: "info@vercel.com",
      status: "approved",
      submittedUser: "@testelek01",
    },
   
  ]);

  const [filter, setFilter] = useState("All");

  return (
    <div className="w-full bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
      <div className="flex flex-1 w-full max-w-4xl mx-auto  overflow-hidden">
        

        <main className="flex flex-1 border-x border-zinc-300  bg-white overflow-hidden flex-col ">
          {/* INDUSTRIAL LIGHT HEADER */}
          <div className="px-2 h-8 border-b border-zinc-300 bg-zinc-200 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2">
              <Flag size={14} className="text-black" />
              <span className="text-[10px] font-semibold uppercase tracking-widest">
                Company Review
              </span>
            </div>
            <span className="text-[10px] font-mono text-zinc-600 uppercase font-black">
              Pending Requests: {companies.length}
            </span>
          </div>

          <div className="flex w-full items-center border-b border-zinc-300 bg-white sticky top-0 z-30 h-10 divide-x divide-zinc-300">
            <div className="relative flex-2 flex items-center bg-white px-3 h-full">
              <Search size={14} className="text-zinc-400 mr-2" />
              <input
                placeholder="SEARCH COMPANIES..."
                className="w-full text-[10px] font-mono font-black uppercase outline-none bg-transparent"
              />
            </div>
            <div className="flex-1 h-full">
              <FilterCombobox
                label="STATUS"
                current={filter}
                options={["All", "Waiting", "Pending", "Approved"].map((s) => ({
                  label: s,
                  value: s,
                }))}
                onSelect={setFilter}
              />
            </div>
          </div>

          {/* MINI-CARD GRID WITH BORDER DIVIDE */}
          <div className="flex-1 overflow-y-auto gap-px grid grid-cols-4  content-start border-b border-zinc-300 scrollbar-hide">
            {companies.map((company) => (
              <Dialog key={company.id}>
                <DialogTrigger asChild>
                  <div className="p-2 bg-white flex border-b border-zinc-300 not-nth-[4n]:border-r h-fit gap-2 items-center cursor-pointer hover:bg-zinc-200/80 transition-colors group">
                    <div className="border border-zinc-300 p-1">
                      <img
                        src={company.companyLogo}
                        alt=""
                        className="w-6 h-6"
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className="text-xs font-semibold">{company.name}</div>
                      <div className="text-[10px] font-semibold">{company.type}</div>
                    </div>
                  </div>
                </DialogTrigger>

                {/* ENHANCED MODAL CONTENT */}
                <DialogContent className="sm:max-w-112.5 p-0 rounded-none border-none shadow-none overflow-hidden bg-white gap-0">
                  <DialogHeader className="bg-blue-500 p-1.5 px-2 border-b border-zinc-300 flex justify-between w-full items-center space-y-0">
                    <DialogTitle className="text-[12px] tracking-wide uppercase text-white flex gap-1 items-center">
                      <BadgeQuestionMark
                        size={16}
                        className="text-white shrink-0"
                      />
                      Review
                    </DialogTitle>
                    <DialogClose>
                      <button className="hover:bg-black/40 cursor-pointer p-1 transition-colors outline-none">
                        <X className="w-4 h-4 text-white" />
                      </button>
                    </DialogClose>
                  </DialogHeader>

                  <div className="max-h-[70vh] overflow-y-auto scrollbar-hide">
                    {/* SECTION 1: TARGET DATA */}
                    <div className="">
                      <div className="  ">
                        <div className="flex border-b border-zinc-300  divide-x divide-zinc-300">
                          <div className="p-1 ">
                            <img
                              src={company.companyLogo}
                              alt=""
                              className="w-10 h-10"
                            />
                          </div>
                          <div className="w-full flex justify-between pr-1 ">
                            <span className="text-[10px] font-bold flex flex-col gap-1 font-mono p-2  text-zinc-800 leading-none">
                              <div className="font-normal text-zinc-500">
                                Company Name
                              </div>

                              <div className="text-sm">{company.name}</div>
                            </span>

                            <div className={`p-1 px-3 text-[10px] uppercase ${company.status === "approved" ? "bg-emerald-500" : company.status === "waiting" ? "bg-orange-500" : "bg-zinc-800"} h-fit text-white font-semibold`}>
                              {company.status}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* SECTION 2: MODERATION INTEL */}
                    <div className="grid grid-cols-2 divide-x  divide-zinc-300">
                      <div className=" px-2 pb-1">
                        <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-wide">
                          Domain
                        </span>
                        <div className="text-[11px] font-mono font-bold bg-zinc-100 flex items-center gap-1.5 hover:underline cursor-pointer">
                          {company.domain}
                        </div>
                      </div>
                      <div className=" px-2 pb-1">
                        <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-wide">
                          Email
                        </span>
                        <div className="text-[11px] font-mono font-bold text-black cursor-pointer hover:underline ">
                          {company.companyEmail}
                        </div>
                      </div>
                    </div>

                    {/* SECTION 3: */}
                    <div className="grid grid-cols-2 divide-x border-t border-zinc-300 divide-zinc-300">
                      <div className=" px-2 pb-1">
                        <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-wide">
                          Type
                        </span>
                        <div className="text-[11px] font-mono font-bold bg-zinc-100 text-blue-600 flex items-center gap-1.5 ">
                          {company.type}
                        </div>
                      </div>
                      <div className=" px-2 pb-1">
                        <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-wide">
                          Submitted By
                        </span>
                        <div className="text-[11px] flex items-center gap-1 font-mono font-bold text-black cursor-pointer hover:underline ">
                          <User className="w-3 h-3" />
                          <span className="hover:underline cursor-pointer">
                            {company.submittedUser}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* ACTIONS */}
                    {company.status === "approved" ? (
                      
                    
                    <div className="grid grid-cols-3">
                      <button className="h-9 border-t border-zinc-300 bg-white hover:bg-zinc-200 font-mono font-black text-[10px] uppercase cursor-pointer transition-colors flex items-center justify-center gap-2">
                        Close
                      </button>
                      <button className="h-9 bg-zinc-800 text-white font-mono font-black text-[10px] uppercase cursor-pointer hover:bg-zinc-900 transition-colors flex items-center justify-center gap-2">
                        Ban for
                      </button>
                      <button className="h-9 bg-red-500 text-white font-mono font-black text-[10px] uppercase cursor-pointer hover:bg-red-600 transition-colors flex items-center justify-center gap-2">
                        Delete
                      </button>
                    </div>
                    ) : (
                      <div className="grid grid-cols-2  ">
                      <button className="h-9 border-t border-zinc-300 bg-white hover:bg-zinc-200 font-mono font-black text-[10px] uppercase cursor-pointer transition-colors flex items-center justify-center gap-2">
                        Reject
                      </button>
                      <button className="h-9 bg-blue-500 text-white font-mono font-black text-[10px] uppercase cursor-pointer hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                        Email Sent
                      </button>
                    </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CompanyVerification;
