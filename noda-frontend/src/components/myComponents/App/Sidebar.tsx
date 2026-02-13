import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

// --- MOCK USER SESSION ---
const userSession = {
    hasCompany: true,
    companyName: "OpenAI",
    role: "CEO", 
    isFounder: true, // New flag for Noda Founder status
};

const routes = [
    { id: 0, name: "Home", route: "/app" },
    { id: 1, name: "Jobs", route: "/app/jobs" },
    { id: 2, name: "Communities", route: "/app/communities" },
    { id: 3, name: "Companies", route: "/app/companies" },
    { id: 4, name: "Tracker", route: "/app/tracker" },
    { id: 5, name: "Calendar", route: "/app/calendar" },
    { id: 6, name: "Network", route: "/app/network" },
    { id: 7, name: "Bookmarks", route: "/app/bookmarks" },
];

const AppSideBar = () => {
    
    // Determine administrative nodes
    const getAdminRoutes = () => {
        if (!userSession.hasCompany) return [];
        const adminOptions = [];
        adminOptions.push({ name: "Create_Post", route: "/app/admin/post" });

        if (userSession.role === "CEO" || userSession.role === "RECRUITER") {
            adminOptions.push({ name: "Post_Jobs", route: "/app/admin/jobs" });
            adminOptions.push({ name: "Applications", route: "/app/admin/applications" });
        }

        if (userSession.role === "CEO") {
            adminOptions.push({ name: "Company_Dash", route: "/app/admin/dashboard" });
            adminOptions.push({ name: "Team_Nodes", route: "/app/admin/team" });
        }
        return adminOptions;
    };

    // Determine Noda Protocol nodes
    const getNodaRoutes = () => {
        const nodaOptions = [];
        
        // Only Founders can inject new ideas into the system
        if (userSession.isFounder) {
            nodaOptions.push({ name: "Create_Idea", route: "/app/noda/idea" });
        }
        
        // Public nodes for community resonance and roadmap tracking
        nodaOptions.push({ name: "Ideas", route: "/app/noda/ideas" });
        nodaOptions.push({ name: "Roadmap", route: "/app/noda/roadmap" });
        
        return nodaOptions;
    };

    const adminRoutes = getAdminRoutes();
    const nodaRoutes = getNodaRoutes();

    return (
        <aside className="w-full shrink-0 sticky top-16">
            <div className="flex flex-col gap-6">
                
                {/* 1. SYSTEM MENU SECTION */}
                <div className="flex flex-col">
                    <div className="text-[10px] font-mono text-zinc-400 uppercase mb-3 tracking-widest leading-none">
                        [Menu]
                    </div>
                    <nav className="flex flex-col gap-2">
                        {routes.map((item) => (
                            <NavLink
                                key={item.id}
                                to={item.route}
                                end={item.route === "/app"}
                                className={({ isActive }) =>
                                    cn(
                                        "text-xs font-medium transition-colors w-fit px-0",
                                        isActive 
                                            ? "text-zinc-900 font-bold" 
                                            : "text-zinc-500/80 hover:text-zinc-900"
                                    )
                                }
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </nav>
                </div>

                {/* 2. NODA PROTOCOL SECTION */}
                <div className="flex flex-col">
                    <div className="text-[10px] font-mono text-zinc-400 uppercase mb-3 tracking-widest leading-none font-bold">
                        [Noda]
                    </div>
                    <nav className="flex flex-col gap-2">
                        {nodaRoutes.map((item, idx) => (
                            <NavLink
                                key={idx}
                                to={item.route}
                                className={({ isActive }) =>
                                    cn(
                                        "text-xs font-medium transition-colors w-fit",
                                        isActive 
                                            ? "text-zinc-900  " 
                                            : "text-zinc-500/80 hover:text-zinc-900"
                                    )
                                }
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </nav>
                </div>

                {/* 3. COMPANY PROTOCOL SECTION (Conditional) */}
                {userSession.hasCompany && (
                    <div className="flex flex-col animate-in fade-in slide-in-from-left-2 duration-500">
                        <div className="text-[10px] font-mono text-orange-600 uppercase mb-3 tracking-widest leading-none flex items-center font-bold">
                            [{userSession.companyName}_Admin]
                        </div>
                        <nav className="flex flex-col gap-2">
                            {adminRoutes.map((item, idx) => (
                                <NavLink
                                    key={idx}
                                    to={item.route}
                                    className={({ isActive }) =>
                                        cn(
                                            "text-xs font-medium transition-colors w-fit",
                                            isActive 
                                                ? "text-orange-600 font-bold" 
                                                : "text-zinc-500/80 hover:text-orange-600"
                                        )
                                    }
                                >
                                    {item.name}
                                </NavLink>
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </aside>
    );
};

export default AppSideBar;