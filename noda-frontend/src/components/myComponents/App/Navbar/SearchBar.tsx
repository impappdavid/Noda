import { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Search,
  X,
  User,
  Building2,
  Briefcase,
  MapPin,
  Hash,
  ChevronRight,
  History,
} from "lucide-react";

// --- MOCK DATABASE ---
const MOCK_DATA = {
  users: [
    { name: "Alex Rivera", handle: "arivera", type: "user" },
    { name: "Sarah Chen", handle: "schen_dev", type: "user" },
    { name: "Marcus Wright", handle: "mwright", type: "user" },
  ],
  companies: [
    { name: "Google", domain: "google.com", type: "company" },
    { name: "Vercel", domain: "vercel.com", type: "company" },
    { name: "Tesla", domain: "tesla.com", type: "company" },
  ],
  communities: [
    { name: "React Developers", members: "12k", type: "comm" },
    { name: "Design Ethics", members: "5k", type: "comm" },
  ],
  locations: [
    "Europe",
    "America",
    "Asia",
    "London, UK",
    "New York, US",
    "Berlin, DE",
    "Tokyo, JP",
  ],
};

const COMMANDS = [
  {
    id: "/user",
    label: "User",
    icon: <User size={12} />,
    path: "user",
    data: MOCK_DATA.users,
  },
  {
    id: "/job",
    label: "Jobs",
    icon: <Briefcase size={12} />,
    path: "jobs",
    data: [],
  },
  {
    id: "/company",
    label: "Company",
    icon: <Building2 size={12} />,
    path: "company",
    data: MOCK_DATA.companies,
  },
  {
    id: "/comm",
    label: "Comm",
    icon: <Hash size={12} />,
    path: "communities",
    data: MOCK_DATA.communities,
  },
];

const SearchBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const containerRef = useRef<HTMLDivElement>(null);
  const roleInputRef = useRef<HTMLInputElement>(null);
  const locInputRef = useRef<HTMLInputElement>(null);
  const mainInputRef = useRef<HTMLInputElement>(null);

  const [activeCommand, setActiveCommand] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [locValue, setLocValue] = useState("");
  const [activeParam, setActiveParam] = useState<"role" | "loc">("role");
  const [isOpen, setIsOpen] = useState(false);
  const [selectionIndex, setSelectionIndex] = useState(0);

  const history = [
    { text: "Google", type: "company", path: "/app/company/google" },
    {
      text: "React Developer",
      type: "jobs",
      path: "/app/jobs?role=React+Developer&location=Europe",
    },
  ];

  // --- 1. SYNC STATE WITH URL (PERSIST SEARCH) ---
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const path = location.pathname;

    if (path.includes("/jobs")) {
      setActiveCommand("/job");
      setQuery(params.get("role") || "");
      setLocValue(params.get("location") || "");
    } else if (path.includes("/user")) {
      setActiveCommand("/user");
      setQuery(params.get("q") || "");
    } else if (path.includes("/company")) {
      setActiveCommand("/company");
      setQuery(params.get("q") || "");
    } else if (path.includes("/communities")) {
      setActiveCommand("/comm");
      setQuery(params.get("q") || "");
    } else {
      setActiveCommand(null);
      setQuery("");
    }
  }, [location.pathname]); // Removed location.search from here to prevent loops while typing

  // --- 2. FOCUS MANAGEMENT ---
  useEffect(() => {
    if (isOpen && activeCommand) {
      if (activeCommand === "/job")
        (activeParam === "role"
          ? roleInputRef.current
          : locInputRef.current
        )?.focus();
      else roleInputRef.current?.focus();
    }
  }, [activeCommand, activeParam, isOpen]);

  // --- 3. SUGGESTION ENGINE (THE MATCH POPUP) ---
  const suggestions = useMemo(() => {
    // If the user just typed "/" show commands
    if (query === "/") return COMMANDS;

    const currentVal = activeParam === "role" ? query : locValue;

    // Show matches if there is an active command and a value
    if (activeCommand && currentVal.length > 0) {
      // Location matching for Jobs
      if (activeCommand === "/job" && activeParam === "loc") {
        return MOCK_DATA.locations
          .filter((l) => l.toLowerCase().includes(currentVal.toLowerCase()))
          .slice(0, 5);
      }

      // Data matching for User/Company/Comm
      const cmdObj = COMMANDS.find((c) => c.id === activeCommand);
      if (cmdObj?.data && cmdObj.data.length > 0) {
        return cmdObj.data
          .filter(
            (item: any) =>
              item.name.toLowerCase().includes(currentVal.toLowerCase()) ||
              (item.handle &&
                item.handle.toLowerCase().includes(currentVal.toLowerCase())),
          )
          .slice(0, 5);
      }
    }

    return [];
  }, [activeCommand, activeParam, query, locValue]);

  useEffect(() => {
    setSelectionIndex(0);
  }, [suggestions]);

  // --- 4. HANDLERS ---
  const handleSelection = (item: any) => {
    if (query === "/") {
      setActiveCommand(item.id);
      setQuery("");
    } else if (activeCommand === "/job" && activeParam === "loc") {
      setLocValue(item);
    } else if (typeof item === "object") {
      setQuery(item.name);
    }
    setIsOpen(false);
  };

  const executeSearch = () => {
    const path = COMMANDS.find((c) => c.id === activeCommand)?.path || "search";
    if (activeCommand === "/job") {
      navigate(
        `/app/jobs?role=${encodeURIComponent(query)}&location=${encodeURIComponent(locValue)}`,
      );
    } else {
      navigate(`/app/${path}?q=${encodeURIComponent(query)}`);
    }
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isOpen && suggestions.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectionIndex((prev) => (prev + 1) % suggestions.length);
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectionIndex(
          (prev) => (prev - 1 + suggestions.length) % suggestions.length,
        );
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        handleSelection(suggestions[selectionIndex]);
        return;
      }
    }
    if (e.key === "Tab" && activeCommand === "/job") {
      e.preventDefault();
      setActiveParam((prev) => (prev === "role" ? "loc" : "role"));
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      executeSearch();
    }
    if (
      e.key === "Backspace" &&
      !query &&
      activeCommand &&
      activeParam === "role"
    ) {
      setActiveCommand(null);
      setTimeout(() => mainInputRef.current?.focus(), 0);
    }
  };

  useEffect(() => {
    const out = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      )
        setIsOpen(false);
    };
    document.addEventListener("mousedown", out);
    return () => document.removeEventListener("mousedown", out);
  }, []);

  return (
    <div ref={containerRef} className="flex-1 max-w-xl relative z-50 font-mono">
      <div
        className={`flex items-center bg-zinc-50 border h-9 px-2 gap-2 transition-all ${isOpen ? "border-zinc-400 bg-white shadow-sm" : "border-zinc-300"}`}
      >
        {!activeCommand && <Search size={14} className="text-zinc-400" />}
        {activeCommand && (
          <div className="bg-zinc-900 text-white px-1.5 py-0.5 text-[10px] font-black uppercase shrink-0">
            {activeCommand.replace("/", "")}
          </div>
        )}

        {activeCommand === "/job" ? (
          <div className="flex items-center gap-1 flex-1">
            <div
              className={`flex items-center px-1.5 h-6 border ${activeParam === "role" ? "border-zinc-900 bg-white" : "border-transparent text-zinc-400"}`}
            >
              <span className="text-[8px] mr-1 uppercase font-black">Role</span>
              <input
                ref={roleInputRef}
                value={query}
                onFocus={() => {
                  setActiveParam("role");
                  setIsOpen(true);
                }}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent border-none outline-none text-[10px] w-28 uppercase font-bold"
              />
            </div>
            <div
              className={`flex items-center px-1.5 h-6 border ${activeParam === "loc" ? "border-zinc-900 bg-white" : "border-transparent text-zinc-400"}`}
            >
              <span className="text-[8px] mr-1 uppercase font-black">Loc</span>
              <input
                ref={locInputRef}
                value={locValue}
                onFocus={() => {
                  setActiveParam("loc");
                  setIsOpen(true);
                }}
                onChange={(e) => setLocValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent border-none outline-none text-[10px] w-28 uppercase font-bold"
              />
            </div>
          </div>
        ) : activeCommand ? (
          <div className="flex items-center bg-white border border-zinc-200 px-1.5 h-6 flex-1">
            <span className="text-[8px] mr-2 uppercase font-black text-zinc-400">
              Match
            </span>
            <input
              ref={roleInputRef}
              value={query}
              onFocus={() => setIsOpen(true)}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent border-none outline-none text-[10px] w-full uppercase font-bold"
            />
          </div>
        ) : (
          <input
            ref={mainInputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (e.target.value === "/") setIsOpen(true);
              const cmd = COMMANDS.find((c) =>
                e.target.value.toLowerCase().startsWith(c.id),
              );
              if (cmd) {
                setActiveCommand(cmd.id);
                setQuery("");
              }
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder="/user, /job, /company, /community..."
            className="flex-1 bg-transparent border-none outline-none text-[11px] placeholder:text-zinc-500 uppercase font-bold"
          />
        )}

        {(query || activeCommand) && (
          <X
            size={14}
            className="text-zinc-400 cursor-pointer hover:text-red-500"
            onClick={() => {
              setActiveCommand(null);
              setQuery("");
              setLocValue("");
              setIsOpen(false);
            }}
          />
        )}
      </div>

      {isOpen && (
        <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-white border border-zinc-400 shadow-xl overflow-hidden">
          {/* IDLE: HISTORY */}
          {!query && !activeCommand && (
            <div className="flex flex-col">
              <div className="flex justify-between items-center border-b border-zinc-300">
                <div className="px-2 pb-1 pt-1.5 bg-zinc-50 text-[9px] font-black text-zinc-500 uppercase flex items-center gap-2 ">
                  Search History
                </div>
                <div className="px-2 pb-1 pt-1.5 bg-zinc-50  text-[9px] font-black text-red-500 hover:underline cursor-pointer uppercase flex items-center gap-2 ">
                  Clear
                </div>
              </div>
              {history.map((h, i) => (
                <div
                  key={i}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    navigate(h.path);
                  }}
                  className="p-2 hover:bg-zinc-200 cursor-pointer flex justify-between items-center group"
                >
                  <span className="text-[11px] text-zinc-900 font-bold uppercase">
                    {h.text}
                  </span>
                  <span className="text-[9px] text-zinc-500 font-black uppercase">
                    {h.type}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* MATCHES FOUND */}
          {suggestions.length > 0 && (
            <div className="flex flex-col">
              <div className="px-3 py-1.5 bg-zinc-50 border-b border-zinc-100 text-[8px] font-black text-zinc-400 uppercase tracking-widest">
                {query === "/" ? "Available_Commands" : "Match_Results"}
              </div>
              {suggestions.map((item: any, i) => (
                <div
                  key={i}
                  onMouseEnter={() => setSelectionIndex(i)}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSelection(item);
                  }}
                  className={`px-3 py-2.5 cursor-pointer flex justify-between items-center group transition-colors ${selectionIndex === i ? "bg-zinc-900 text-white" : "hover:bg-zinc-50 text-zinc-900"}`}
                >
                  <div className="flex items-center gap-2">
                    {activeCommand === "/job" ? (
                      <MapPin size={10} />
                    ) : (
                      item.icon || <Search size={10} />
                    )}
                    <span className="text-[11px] font-bold uppercase">
                      {typeof item === "string" ? item : item.name || item.id}
                    </span>
                  </div>
                  <ChevronRight
                    size={12}
                    className={
                      selectionIndex === i ? "opacity-100" : "opacity-0"
                    }
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
