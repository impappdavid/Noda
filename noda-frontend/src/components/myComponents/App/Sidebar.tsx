import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

// --- MOCK USER SESSION ---
// Change role to 'CEO', 'RECRUITER', or 'MARKETING' to test different protocol access
const userSession = {
    hasCompany: true,
    companyName: "OpenAI",
    role: "CEO", 
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
    // Determine administrative nodes based on system role
    const getAdminRoutes = () => {
        if (!userSession.hasCompany) return [];

        const adminOptions = [];

        // All authorized company nodes can broadcast signals
        adminOptions.push({ name: "Create_Post", route: "/app/admin/post" });

        // CEO and Recruiter nodes can manage vacancy deployments
        if (userSession.role === "CEO" || userSession.role === "RECRUITER") {
            adminOptions.push({ name: "Post_Jobs", route: "/app/admin/jobs" });
        }

        // Only CEO nodes can modify core company specifications and team directory
        if (userSession.role === "CEO") {
            adminOptions.push({ name: "Company_Specs", route: "/app/admin/specs" });
            adminOptions.push({ name: "Team_Nodes", route: "/app/admin/team" });
        }

        return adminOptions;
    };

    const adminRoutes = getAdminRoutes();

    return (
        <aside className="w-full shrink-0 sticky top-16">
            <div className="flex flex-col gap-8">
                
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
                                        "text-xs font-medium transition-colors w-fit",
                                        isActive 
                                            ? "text-zinc-900 " 
                                            : "text-zinc-500/80 hover:text-zinc-900"
                                    )
                                }
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </nav>
                </div>

                {/* 2. COMPANY PROTOCOL SECTION (Conditional) */}
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
                                                ? "text-orange-600 " 
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