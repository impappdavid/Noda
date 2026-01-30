import Navbar from '../navbar';
import AppSideBar from '../Sidebar';

const AppJobs = () => {


    return (
        <div className="min-h-screen bg-white text-zinc-900 font-sans">
            <Navbar />

            <div className="max-w-4xl mx-auto px-6 flex justify-between gap-4 ">

                {/* 2. LEFT SIDEBAR */}
                <AppSideBar />

                {/* 3. CENTER FEED */}
                <main className="flex flex-col max-w-xl w-full border-x border-zinc-300 min-h-screen">
                    
                </main>


            </div>
        </div>
    );
};

export default AppJobs;