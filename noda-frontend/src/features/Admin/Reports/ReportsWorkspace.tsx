import AdminReportsPage from "./components/Reports";

const ReportsWorkspace = () => {
  return (
    <div className="flex flex-1 min-w-0 gap-2 ">
      
      {/* Center Feed Column */}
      <main className="flex  w-full h-screen pt-13  min-w-0">
        <AdminReportsPage />
      </main>

    </div>
  );
};

export default ReportsWorkspace;