import Bookmarks from "./components/Bookmarks";


const BookmarksWorkspace = () => {
  return (
    <div className="flex flex-1 min-w-0 gap-2 ">
      
      {/* Center Feed Column */}
      <main className="flex  w-full h-screen pt-13  min-w-0">
        <Bookmarks />
      </main>

    </div>
  );
};

export default BookmarksWorkspace;