import ManageApplicants from "./components/Applications";

const ApplicationsWorkspace = () => {
  return (
    <div className="flex flex-1 min-w-0 gap-2 ">
      
      {/* Center Feed Column */}
      <main className="flex  w-full h-screen pt-13  min-w-0">
        <ManageApplicants />
      </main>

    </div>
  );
};

export default ApplicationsWorkspace;