import Navbar from "./navbar";
import AppSideBar from "./Sidebar";


const LayoutShell = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-white text-zinc-900 font-sans">
    <Navbar />

    <div className="max-w-4xl w-full mx-auto px-6 flex gap-4">
      <aside className="w-24 shrink-0">
        <AppSideBar />
      </aside>

      <div className="flex-1 border-x border-zinc-300">
        {children}
      </div>
    </div>
  </div>
);

export default LayoutShell
