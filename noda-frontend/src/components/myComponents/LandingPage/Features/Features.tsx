import SideBar from "../Sidebar"
import FeaturesContent from "./FeaturesContent"



const Features = () => {

    return (
        <>
            <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-zinc-200 selection:text-black">
                <div className="max-w-2xl w-full mx-auto px-6 py-20 flex justify-center gap-12 lg:gap-10 relative">
                    <div className="hidden h-full lg:block absolute right-full w-20 ">
                        <SideBar />
                    </div>
                    <FeaturesContent />

                </div>
            </div>
        </>
    )
}
export default Features