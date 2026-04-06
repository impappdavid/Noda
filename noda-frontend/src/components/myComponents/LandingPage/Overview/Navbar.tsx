const Navbar = () => {
    return (
        <>
            <nav className="flex items-center justify-between border border-zinc-300 shrink-0 w-4xl top-2 z-50 p-2 fixed bg-zinc-100 rounded-lg shadow-2xl">
                <div className="flex items-center h-full">
                    <div className="p-2 text-xs h-full px-4 font-kodemono  text-black tracking-[0.2em] font-medium">/NODA</div>
                </div>

                {/* Right Auth Links */}
                <div className="flex items-center h-full">
                    <a href="/login" className="text-[10px] p-2 px-4 border-l border-zinc-300 h-full flex items-center font-mono font-black text-zinc-600 hover:text-orange-600 uppercase tracking-widest transition-colors outline-none cursor-pointer">
                        Login
                    </a>
                    <a href="/signup" className="h-full flex items-center px-4 rounded-md h-full bg-orange-500 text-white justify-center text-[10px] font-mono font-black uppercase tracking-widest hover:bg-orange-600 transition-colors outline-none cursor-pointer">
                        SignUp
                    </a>
                </div>
            </nav>
        </>
    )
}
export default Navbar