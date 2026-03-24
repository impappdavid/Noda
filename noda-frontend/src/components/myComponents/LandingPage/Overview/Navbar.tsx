const Navbar = () => {
    return (
        <>
            <nav className="flex items-center justify-between border-b border-zinc-300 bg-white shrink-0 sticky top-0 z-50">
                <div className="flex items-center h-full">
                    <div className="p-2 text-[10px] h-full px-4 font-kodemono bg-orange-500 text-white tracking-[0.2em] font-medium">/NODA</div>

                    {/* Center Anchor Links */}
                    <a href="#features" className="text-[10px] p-2 h-full flex items-center border-r border-zinc-300 font-mono font-bold text-zinc-500 hover:text-orange-600 uppercase tracking-[0.2em] transition-colors outline-none">Features</a>
                    <a href="#telemetry" className="text-[10px] p-2 h-full flex items-center border-r border-zinc-300 font-mono font-bold text-zinc-500 hover:text-orange-600 uppercase tracking-[0.2em] transition-colors outline-none">Telemetry</a>
                    <a href="#changelog" className="text-[10px] p-2 h-full flex items-center border-r border-zinc-300 font-mono font-bold text-zinc-500 hover:text-orange-600 uppercase tracking-[0.2em] transition-colors outline-none">Changelog</a>

                </div>

                {/* Right Auth Links */}
                <div className="flex items-center h-full">
                    <a href="/login" className="text-[10px] p-2 px-4 border-l border-zinc-300 h-full flex items-center font-mono font-black text-zinc-600 hover:text-orange-600 uppercase tracking-widest transition-colors outline-none cursor-pointer">
                        Login
                    </a>
                    <a href="/signup" className="h-full flex items-center px-4 bg-orange-500 text-white justify-center text-[10px] font-mono font-black uppercase tracking-widest hover:bg-orange-600 transition-colors outline-none cursor-pointer">
                        SignUp
                    </a>
                </div>
            </nav>
        </>
    )
}
export default Navbar