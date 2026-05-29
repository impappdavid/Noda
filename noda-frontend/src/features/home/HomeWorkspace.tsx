import PostForm from './components/PostForm';
import Feed from './components/Feed';
import Suggestions from './components/Suggestions';

const HomeWorkspace = () => {
  return (
    <div className="flex flex-1 min-w-0 gap-2">
      
      {/* Center Feed Column */}
      <main className="flex-1 max-w-xl w-full min-h-screen pt-13  flex flex-col min-w-0">
        <PostForm />
        <Feed />
      </main>

      {/* Right Side Suggestions Column — Perfectly separated by our parent gap layout */}
      <Suggestions />

    </div>
  );
};

export default HomeWorkspace;