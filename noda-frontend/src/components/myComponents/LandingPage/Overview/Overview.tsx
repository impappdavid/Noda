
import Navbar from './Navbar';
import HeroVideo from './HeroVideo';
import InteractiveTabs from './InteractiveTabs';
import SecondaryFeatures from './SecondaryFeatures';
import Footer from './Footer';

// --- SUB-COMPONENTS ---
const SectionHeader = ({ title, id }: { title: string, id?: string }) => (
    <div id={id} className="p-2 border-y border-zinc-300 bg-zinc-100 flex items-center shrink-0 scroll-mt-14">
        <span className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-[0.3em] flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 bg-orange-500 inline-block shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
            {title}
        </span>
    </div>
);

export default function LandingPage() {

    return (
        <div className="min-h-screen bg-zinc-50 flex justify-center font-sans selection:bg-zinc-300 scroll-smooth">

            {/* MASTER HARDWARE BOUNDING BOX */}
            <div className="w-full max-w-4xl border-x border-zinc-300 bg-white flex flex-col  overflow-hidden">

                <Navbar />

                <HeroVideo />

                <SectionHeader title="Core Features" id="features" />
                <InteractiveTabs />

                
                <SectionHeader title="Secondary Features" />
                <SecondaryFeatures />

                <SectionHeader title="System Logs & Comms" id="changelog" />
                <Footer />

            </div>
        </div>
    );
}