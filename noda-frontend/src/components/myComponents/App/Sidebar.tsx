import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

// --- MOCK USER SESSION ---
const userSession = {
    hasCompany: true,
    companyName: "OpenAI",
    role: "CEO", 
    isFounder: true,
    isAdmin: true, // Platform level privileges
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
    
    // 1. Company Level Admin
    const getAdminRoutes = () => {
        if (!userSession.hasCompany) return [];
        const adminOptions = [];
        if (userSession.role === "CEO") {
            adminOptions.push({ name: "Dashboard", route: "/app/admin/dashboard" });
            adminOptions.push({ name: "Team Members", route: "/app/admin/team" });
        }
        adminOptions.push({ name: "Create Post", route: "/app/admin/post" });
        if (userSession.role === "CEO" || userSession.role === "RECRUITER") {
            adminOptions.push({ name: "Jobs", route: "/app/admin/jobs" });
        }
        
        return adminOptions;
    };

    // 2. Platform Level (Noda)
    const getNodaRoutes = () => {
        const nodaOptions = [];
        
        nodaOptions.push({ name: "Ideas", route: "/app/noda/ideas" });
        nodaOptions.push({ name: "Changelog", route: "/app/noda/changelog" });
        return nodaOptions;
    };

    // 3. Platform Admin (Noda Admin Only)
    const getNodaAdminRoutes = () => {
        if (!userSession.isAdmin) return [];
        return [
            { name: "Reports", route: "/app/noda/admin/reports" },
            { name: "Notifications", route: "/app/noda/admin/notifications" },
            { name: "Idea Review", route: "/app/noda/admin/review" },
            { name: "Company Review", route: "/app/noda/admin/companyreview" },
        ];
    };

    const adminRoutes = getAdminRoutes();
    const nodaRoutes = getNodaRoutes();
    const platformAdminRoutes = getNodaAdminRoutes();

    return (
        <aside className="w-full shrink-0 sticky top-16">
            <div className="flex flex-col gap-8">
                
                {/* SECTION 1: SYSTEM MENU */}
                <div className="flex flex-col">
                    <div className="text-[10px] font-mono text-zinc-400 uppercase mb-3 tracking-widest leading-none underline underline-offset-4 decoration-zinc-100">
                        [Menu]
                    </div>
                    <nav className="flex flex-col gap-2">
                        {routes.map((item) => (
                            <NavLink
                                key={item.id}
                                to={item.route}
                                end={item.route === "/app"}
                                className={({ isActive }) =>
                                    cn("text-xs font-medium transition-colors w-fit",
                                        isActive ? "text-zinc-900 " : "text-zinc-500/80 hover:text-zinc-900")
                                }
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </nav>
                </div>

                {/* SECTION 2: NODA PROTOCOL */}
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
                                    cn("text-xs font-medium transition-colors w-fit",
                                        isActive ? "text-zinc-900 " : "text-zinc-500/80 hover:text-zinc-900")
                                }
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </nav>
                </div>

                {/* SECTION 3: NODA ADMIN (New Partition) */}
                {userSession.isAdmin && (
                    <div className="flex flex-col animate-in fade-in slide-in-from-left-2 duration-300">
                        <div className="text-[10px] font-mono text-zinc-400 uppercase mb-3 tracking-widest leading-none font-black flex items-center gap-2">
                             
                             [Admin]
                        </div>
                        <nav className="flex flex-col gap-2">
                            {platformAdminRoutes.map((item, idx) => (
                                <NavLink
                                    key={idx}
                                    to={item.route}
                                    className={({ isActive }) =>
                                        cn("text-xs font-medium transition-colors w-fit",
                                            isActive ? "text-zinc-900 " : "text-zinc-500/80 hover:text-zinc-900")
                                    }
                                >
                                    {item.name}
                                </NavLink>
                            ))}
                        </nav>
                    </div>
                )}

                {/* SECTION 4: COMPANY ADMIN */}
                {userSession.hasCompany && (
                    <div className="flex flex-col animate-in fade-in slide-in-from-left-2 duration-500">
                        <div className="text-[10px] font-mono text-blue-600 uppercase mb-3 tracking-widest leading-none font-bold">
                            [{userSession.companyName}_Admin]
                        </div>
                        <nav className="flex flex-col gap-2">
                            {adminRoutes.map((item, idx) => (
                                <NavLink
                                    key={idx}
                                    to={item.route}
                                    className={({ isActive }) =>
                                        cn("text-xs font-medium transition-colors w-fit",
                                            isActive ? "text-black " : "text-zinc-500/80 hover:text-blue-500")
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