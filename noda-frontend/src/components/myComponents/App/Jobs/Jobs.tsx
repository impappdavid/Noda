import Navbar from '../navbar';
import AppSideBar from '../Sidebar';
import JobList from './JobList';

const AppJobs = () => {


    return (
        <div className="min-h-screen bg-white text-zinc-900 font-sans">
            <Navbar />

            <div className="max-w-4xl mx-auto px-6 flex justify-between gap-4 ">

                {/* 2. LEFT SIDEBAR */}
                <AppSideBar />

                {/* 3. CENTER FEED */}
                <main className="flex max-w-3xl w-full border-x border-zinc-300 min-h-screen">
                    <div className="w-1/2">
                        <JobList />
                    </div>

                    <div className="w-1/2 bg-black p-2"></div>
                </main>


            </div>
        </div>
    );
};

export default AppJobs;