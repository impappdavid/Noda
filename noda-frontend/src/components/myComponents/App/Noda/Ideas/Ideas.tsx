import Navbar from "../../AppNavbar";
import PostForm from "../../Home/PostForm";
import Suggestions from "../../Home/Suggestions";
import AppSideBar from "../../Sidebar";
import IdeaFeed from "./IdeaFeed";
import IdeaForm from "./IdeaFormDialog";


const AppHome = () => {
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans">
      <Navbar />

      <div className="max-w-4xl w-full mx-auto px-6 flex gap-4">
        <aside className="w-25 flex-none">
          <AppSideBar />
        </aside>

        <div className="flex-1 flex gap-2">
          <main className="flex flex-col max-w-xl w-full border-x border-zinc-300 min-h-screen pt-13">
            <IdeaForm />
            <IdeaFeed />
          </main>

          <Suggestions />
        </div>
      </div>
    </div>
  );
};

export default AppHome;