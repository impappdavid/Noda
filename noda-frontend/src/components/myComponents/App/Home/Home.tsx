import Navbar from '../navbar';
import AppSideBar from '../Sidebar';
import PostForm from './PostForm';
import Feed from './Feed';
import Suggestions from './Suggestions';

const AppHome = () => {


    return (
        <div className="min-h-screen bg-white text-zinc-900 font-sans">
            <Navbar />

            <div className="max-w-4xl mx-auto px-6 flex justify-between gap-4 ">

                {/* 2. LEFT SIDEBAR */}
                <AppSideBar />

                {/* 3. CENTER FEED */}
                <main className="flex flex-col max-w-xl w-full border-x border-zinc-300 min-h-screen pt-13">
                    <PostForm />
                    <Feed />
                </main>

                <Suggestions />

            </div>
        </div>
    );
};

export default AppHome;