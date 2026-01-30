import {
  MoreHorizontal,
  Heart,
  MessageSquare,
  BarChart3,
  Bookmark,
  Share,
} from "lucide-react";

const testPosts = [
  {
    id: "p1",
    author: {
      name: "Alex Rivers",
      username: "@arivers",
      role: "Vector Engineer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    postedAgo: "2h",
    content: "Applying the 14-day anti-ghosting protocol has significantly improved our response velocity. Recruiters are now forced into active engagement or delisting.",
    likes: 24,
    comments: 12,
    views: "1.2k",
    images: ["https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800"] // 1 Image
  },
  {
    id: "p2",
    author: {
      name: "Sarah Chen",
      username: "@schen_dev",
      role: "Backend Architect",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    postedAgo: "4h",
    content: "Just updated my Node vector. The matching precision for Rust-based roles is incredibly high.",
    likes: 56,
    comments: 8,
    views: "2.4k",
    images: [
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800", 
        "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=800"
    ] // 2 Images
  },
   {
    id: "p2",
    author: {
      name: "Sarah Chen",
      username: "@schen_dev",
      role: "Backend Architect",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    postedAgo: "4h",
    content: "Just updated my Node vector. The matching precision for Rust-based roles is incredibly high.",
    likes: 903,
    comments: 120,
    views: "10.4k",
    images: [] 
  },
  {
    id: "p4",
    author: {
      name: "Anonymous Node",
      username: "@encrypted",
      role: "Senior Lead",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=A&backgroundColor=18181b",
    },
    postedAgo: "8h",
    content: "Anonymous Insight: Company X has a 3-stage interview process that focuses heavily on distributed systems. Look at these architecture patterns.",
    likes: 342,
    comments: 45,
    views: "12.1k",
    images: [
        "https://api.dicebear.com/7.x/initials/svg?seed=A&backgroundColor=18181b",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800",
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800",
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800"
    ] // 4 Images
  }
];

// Helper Component for the Dynamic Grid
const PostGrid = ({ images }) => {
  const count = images?.length || 0;
  if (count === 0) return null;

  return (
    <div className={`mt-3 rounded-2xl overflow-hidden border border-zinc-100 grid gap-1  
      ${count === 1 ? "grid-cols-1" : "grid-cols-2"} 
      ${count >= 3 ? "aspect-square" : "aspect-auto"}`}>
      
      {images.slice(0, 4).map((img, idx) => (
        <div key={idx} className={`relative bg-zinc-100 ${count === 3 && idx === 0 ? "row-span-2" : ""}`}>
          <img 
            src={img} 
            alt="Intelligence Signal" 
            className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer" 
          />
          {count > 4 && idx === 3 && (
            <div className="absolute inset-0 bg-zinc-900/60 flex items-center justify-center backdrop-blur-[2px]">
              <span className="text-white text-xs font-bold">+{count - 4}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const Feed = () => {
  return (
    <div className="flex flex-col">
      {testPosts.map((post) => (
        <div key={post.id} className="p-5 border-b border-zinc-300 hover:bg-zinc-50/20 transition-colors group">
          <div className="flex justify-between items-start mb-3">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-zinc-100 border border-zinc-200 shrink-0 overflow-hidden">
                <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover" />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-zinc-900 leading-none">
                    {post.author.name}
                  </span>
                  <span className="text-xs text-zinc-400 font-mono uppercase tracking-tighter">
                    {post.author.username}
                  </span>
                </div>
                <span className="text-[11px] text-zinc-600 mt-0.5">{post.author.role}</span>
                <span className="text-[10px] text-zinc-400 font-mono tracking-tighter uppercase mt-0.5">
                  Protocol Update • {post.postedAgo} ago
                </span>
              </div>
            </div>
            <button className="text-zinc-400 hover:text-zinc-900 transition-colors p-1">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>

          <div className="pl-13 md:pl-[52px]">
            <p className="text-sm text-zinc-600 leading-relaxed">
              {post.content}
            </p>

            {/* DYNAMIC IMAGE GRID */}
            <PostGrid images={post.images} />

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-6">
                <button className="flex items-center gap-1.5 text-zinc-500 hover:text-orange-500 transition-colors group/stat cursor-pointer">
                  <Heart className="w-4 h-4 group-hover/stat:fill-orange-500" />
                  <span className="text-xs font-mono">{post.likes}</span>
                </button>
                <button className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-xs font-mono">{post.comments}</span>
                </button>
                <div className="flex items-center gap-1.5 text-zinc-500">
                  <BarChart3 className="w-4 h-4" />
                  <span className="text-xs font-mono">{post.views}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="text-zinc-400 hover:text-zinc-900 transition-colors cursor-pointer">
                  <Bookmark className="w-4 h-4" />
                </button>
                <button className="text-zinc-400 hover:text-zinc-900 transition-colors cursor-pointer">
                  <Share className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;