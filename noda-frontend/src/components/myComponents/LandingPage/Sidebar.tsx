import { NavLink } from "react-router-dom"

const routes = [
    {
        id: 0,
        name: "Overview",
        route: "/"
    },
    {
        id: 1,
        name: "How it Works",
        route: "/howitworks"
    },
    {
        id: 2,
        name: "For Recruiters",
        route: "/forrecruiters"
    },
    {
        id: 3,
        name: "Features",
        route: "/features"
    },
    {
        id: 4,
        name: "Pricing",
        route: "/pricing"
    },
    {
        id: 5,
        name: "Changelog",
        route: "/changelog"
    },
    {
        id: 6,
        name: "FAQ",
        route: "/faq"
    },
    {
        id: 7,
        name: "Waitlist",
        route: "/waitlist"
    },
]

const SideBar = () => {
    return (
        <>
            {/* LEFT SIDEBAR: Sticky and Minimalist */}
            <aside className="w-full md:w-20 shrink-0 sticky top-20">
                <div className="sticky top-20 flex flex-col gap-4">
                    {/* Logo Section */}
                    <div className="flex flex-col">
                        <div className="text-lg font-semibold tracking-tighter font-kodemono">/NODA</div>
                        <div className="text-zinc-400 text-xs underline decoration-dotted">v1.0.0</div>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex flex-col gap-2">
                        {routes.map((item) => (
                            <NavLink
                                key={item.id}
                                to={item.route}
                                end={item.route === "/"}
                                className={({ isActive }) =>
                                    `text-xs font-medium transition-colors w-fit ${isActive
                                        ? "text-zinc-900" // Active Style
                                        : "text-zinc-500/80 hover:text-zinc-900" // Inactive Style
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
export default SideBar