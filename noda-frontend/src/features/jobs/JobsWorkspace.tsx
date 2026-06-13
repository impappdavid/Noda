import Jobs from './components/Jobs';

const JobsWorkspace = () => {
  return (
    <div className="flex flex-1 min-w-0 gap-2 ">
      
      {/* Center Feed Column */}
      <main className="flex  w-full h-screen pt-13  min-w-0">
        <Jobs />
      </main>

    </div>
  );
};

export default JobsWorkspace;