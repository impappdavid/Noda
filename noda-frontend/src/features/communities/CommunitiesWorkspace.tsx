import Communities from "./components/Communities";

const CommunitiesWorkspace = () => {
  return (
    <div className="flex flex-1 min-w-0 gap-2 ">
      
      {/* Center Feed Column */}
      <main className="flex  w-full h-screen pt-13  min-w-0">
        <Communities />
      </main>

    </div>
  );
};

export default CommunitiesWorkspace;