import CompanyVerification from "./components/CompanyReview";

const CompanyReviewWorkspace = () => {
  return (
    <div className="flex flex-1 min-w-0 gap-2 ">
      
      {/* Center Feed Column */}
      <main className="flex  w-full h-screen pt-13  min-w-0">
        <CompanyVerification />
      </main>

    </div>
  );
};

export default CompanyReviewWorkspace;