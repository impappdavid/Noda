import UserDropDown from "./Navbar/UserDropDown";
import SearchBar from "./Navbar/SearchBar";
import MessagesDropDown from "./Navbar/MessagesDropDown";
import NotificationsDropDown from "./Navbar/NotificationsDropDown";

const Navbar = () => {
    return (
        <>
            <header className="fixed top-0 z-50 w-full border-b border-zinc-300 bg-white/80  backdrop-blur-md">
                <div className="max-w-4xl mx-auto px-6 py-2 flex items-center justify-between ">

                    {/* Logo */}
                    <div className="text-xl font-bold tracking-tighter font-kodemono shrink-0">/NODA</div>

                    <SearchBar />

                    {/* DropDowns */}
                    <div className="flex items-center gap-1 shrink-0 ">
                        <MessagesDropDown />
                        <NotificationsDropDown />
                        <UserDropDown />
                    </div>
                </div>
            </header>
        </>
    )
}

export default Navbar