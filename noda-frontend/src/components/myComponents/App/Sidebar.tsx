import { NavLink } from "react-router-dom"

const routes = [
    {
        id: 0,
        name: "Home",
        route: "/app"
    },
    {
        id: 1,
        name: "Jobs",
        route: "/app/jobs"
    },
    {
        id: 2,
        name: "Communities",
        route: "/app/communities"
    },
    {
        id: 2,
        name: "Companies",
        route: "/app/companies"
    },
    {
        id: 3,
        name: "Tracker",
        route: "/app/tracker"
    },
    {
        id: 3,
        name: "Calendar",
        route: "/app/calendar"
    },
    {
        id: 4,
        name: "Network",
        route: "/app/network"
    },
    {
        id: 5,
        name: "Bookmarks",
        route: "/app/bookmarks"
    },

]

const AppSideBar = () => {
    return (
        <>
            {/* LEFT SIDEBAR: Sticky and Minimalist */}
            <aside className="w-full shrink-0 sticky top-16">
                <div className="sticky top-16 flex flex-col ">
                    {/* Logo Section */}
                    <div className="flex flex-col">
                        <div className="text-[10px] font-mono text-zinc-400 uppercase mb-2 tracking-widest">[Menu]</div>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex flex-col gap-2">
                        {routes.map((item) => (
                            <NavLink
                                key={item.id}
                                to={item.route}
                                // This ensures the link is only "active" if the URL 
                                // matches exactly "/app" and not sub-routes like "/app/jobs"
                                end={item.route === "/app"}
                                className={({ isActive }) =>
                                    `text-xs font-medium transition-colors w-fit ${isActive
                                        ? "text-zinc-900 font-bold" // Active Style
                                        : "text-zinc-500/80 hover:text-zinc-900"
                                    }`
                                }
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </nav>


                </div>
            </aside>
        </>
    )
}
export default AppSideBar