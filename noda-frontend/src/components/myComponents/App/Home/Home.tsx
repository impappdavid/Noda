import { 
  MoreHorizontal, Heart, MessageSquare, BarChart3, 
  Bookmark, Share 
} from "lucide-react";
import Navbar from '../navbar';
import AppSideBar from '../Sidebar';
import { cn } from "@/lib/utils";

// --- TEST DATA INTEGRATION ---
const testPosts = [
  {
    id: "p1",
    author: {
      name: "Alex Rivers",
      username: "@arivers",
      role: "Vector Engineer",
    },
    postedAgo: "2h",
    content: "Applying the 14-day anti-ghosting protocol has significantly improved our response velocity. Recruiters are now forced into active engagement or delisting.",
    likes: 24,
    comments: 12,
    views: "1.2k",
    images: ["https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800"]
  },
  {
    id: "p2",
    author: {
      name: "Sarah Chen",
      username: "@schen_dev",
      role: "Backend Architect",
    },
    postedAgo: "4h",
    content: "Just updated my Node vector. The matching precision for Rust-based roles is incredibly high.",
    likes: 903,
    comments: 120,
    views: "10.4k",
    images: [
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800", 
        "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=800"
    ]
  },
  {
    id: "p4",
    author: {
      name: "Anonymous Node",
      username: "@encrypted",
      role: "Senior Lead",
    },
    postedAgo: "8h",
    content: "Anonymous Insight: Company X has a 3-stage interview process that focuses heavily on distributed systems. Look at these architecture patterns.",
    likes: 342,
    comments: 45,
    views: "12.1k",
    images: [
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800",
        "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=800",
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800"
    ]
  }
];

// --- SQUARED GRID PROTOCOL ---
const PostGrid = ({ images }) => {
  const count = images?.length || 0;
  if (count === 0) return null;

  return (
    <div className={cn(
      "mt-4 overflow-hidden border border-zinc-300 grid gap-px bg-zinc-300", 
      count === 1 ? "grid-cols-1" : "grid-cols-2",
      count >= 3 ? "aspect-square" : "aspect-video"
    )}>
      {images.slice(0, 4).map((img, idx) => (
        <div key={idx} className={cn(
          "relative bg-white",
          count === 3 && idx === 0 ? "row-span-2" : ""
        )}>
          <img src={img} alt="Intel Signal" className="w-full h-full object-cover hover:brightness-95 transition-all cursor-pointer" />
          {count > 4 && idx === 3 && (
            <div className="absolute inset-0 bg-zinc-900/80 flex items-center justify-center">
              <span className="text-white text-[10px] font-mono font-black">+{count - 4} NODES</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const Feed = () => {
  return (
    <div className="flex flex-col divide-y divide-zinc-300 border-b border-zinc-300">
      {testPosts.map((post) => (
        <div key={post.id} className="p-5 bg-white hover:bg-zinc-50 transition-colors group">
          <div className="flex justify-between items-start mb-4">
            <div className="flex gap-4">
              {/* Squared Identity Node */}
              <div className="w-12 h-12 bg-zinc-900 flex items-center justify-center border border-zinc-800 shrink-0">
                <span className="text-white font-mono font-black text-sm">{post.author.name[0]}</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-black text-zinc-900 uppercase tracking-tight">{post.author.name}</span>
                  <span className="text-[9px] text-zinc-400 font-mono font-black uppercase tracking-tighter">[{post.author.username}]</span>
                </div>
                <span className="text-[9px] font-mono font-black text-zinc-500 uppercase mt-0.5">{post.author.role}</span>
                <span className="text-[8px] text-zinc-400 font-mono font-black uppercase mt-1">UPDATE • {post.postedAgo} AGO</span>
              </div>
            </div>
            <button className="text-zinc-300 hover:text-zinc-900 transition-colors"><MoreHorizontal size={14} /></button>
          </div>

          <div className="pl-16">
            <p className="text-[11px] text-zinc-600 leading-relaxed font-bold uppercase tracking-tight">
              {post.content}
            </p>

            <PostGrid images={post.images} />

            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center gap-6">
                <button className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-900 transition-colors group/stat">
                  <Heart size={14} className="group-hover/stat:fill-zinc-900" />
                  <span className="text-[10px] font-mono font-black">{post.likes}</span>
                </button>
                <button className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-900 transition-colors">
                  <MessageSquare size={14} />
                  <span className="text-[10px] font-mono font-black">{post.comments}</span>
                </button>
                <div className="flex items-center gap-1.5 text-zinc-400">
                  <BarChart3 size={14} />
                  <span className="text-[10px] font-mono font-black">{post.views}</span>
                </div>
              </div>
              <div className="flex border border-zinc-200 divide-x divide-zinc-200 h-8">
                <button className="px-3 text-zinc-400 hover:text-zinc-900 transition-colors"><Bookmark size={14} /></button>
                <button className="px-3 text-zinc-400 hover:text-zinc-900 transition-colors"><Share size={14} /></button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// --- CORRECTED FULL LAYOUT ---
const AppHome = () => {
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
      <Navbar />
      <div className="max-w-6xl w-full mx-auto px-6 flex flex-1 overflow-hidden">
        {/* Navigation Sidebar */}
        <aside className="w-24 shrink-0">
          <AppSideBar />
        </aside>

        {/* Central Hub Container */}
        <div className="flex flex-1 gap-4 overflow-hidden">
          <main className="flex-1 flex flex-col border-x border-zinc-300 bg-white h-full overflow-y-auto scrollbar-hide pt-13">
            <div className="border-b border-zinc-300 bg-zinc-50/50 p-4 shrink-0">
               <h2 className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-zinc-400">Primary Feed Protocol</h2>
            </div>
            {/* PostForm would go here */}
            <Feed />
          </main>

          {/* Right Sidebar */}
          <aside className="hidden lg:flex w-72 flex-col border-r border-zinc-300 h-full bg-white overflow-y-auto scrollbar-hide pt-13">
            <div className="p-4 border-b border-zinc-300 bg-zinc-50/50 shrink-0">
               <h2 className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-zinc-400">Node Suggestions</h2>
            </div>
            <div className="flex-1">
               {/* Suggestions content sits here */}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default AppHome;