import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PostViewDialog from "./PostDialog";
import { type Post } from "./PostCards/types";
import { PostCard } from "./PostCards/PostCard";

export default function Feed() {
  const navigate = useNavigate();
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [bookmarkedPosts, setBookmarkedPosts] = useState<
    Record<string, boolean>
  >({});

  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // FULL COMPREHENSIVE REGISTRY MATRIX (All old data preserved intact)
  const feedPosts: Post[] = [
    {
      id: "p_text",
      type: "text",
      author: {
        name: "Alex Rivers",
        username: "arivers",
        role: "Vector Engineer",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      },
      postedAgo: "2h",
      content:
        "Applying the 14-day anti-ghosting protocol has significantly improved our response velocity. Recruiters are now forced into active engagement.",
      likes: 24,
      comments: 12,
      views: "1.2k",
      images: [],
    },
    {
      id: "p_poll",
      type: "poll",
      author: {
        name: "Marcus Vane",
        username: "mv_arch",
        role: "Systems Architect",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
      },
      postedAgo: "1h",
      content:
        "Which serialization protocol are you prioritizing for low-latency node clusters in 2026?",
      likes: 89,
      comments: 34,
      views: "5.6k",
      poll: {
        options: [
          { label: "Protocol Buffers", votes: 450 },
          { label: "Cap'n Proto", votes: 120 },
          { label: "FlatBuffers", votes: 310 },
        ],
        totalVotes: 880,
      },
    },
    {
      id: "p_showcase_visual",
      type: "project_showcase",
      author: {
        name: "Devon Clark",
        username: "dclark",
        role: "Fullstack Core",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Devon",
      },
      postedAgo: "12m",
      content:
        "Just finalized the deployment pipelines for the new interface canvas framework. Ready for staging review.",
      likes: 312,
      comments: 41,
      views: "8.9k",
      project: {
        title: "Nebula Core Dashboard V3",
        tagline: "NextJS 16 Reactive Terminal Interface Canvas",
        description:
          "An isolated modular application window matrix layout engine compiled using optimized low-level tailwind rules. Complete with global state synchronization traces, persistent storage hooks, and drop-in dashboard extensions.",
        coverImage:
          "https://pbs.twimg.com/media/HIjmQqBXwAAqMvH?format=jpg&name=4096x4096", // Uses existing working image resource
        liveUrl: "https://example.com",
        repoUrl: "https://github.com",
      },
    },
    {
      id: "sys_event_promo_v2",
      type: "system_milestone",
      author: {
        name: "Vercel Dispatch",
        username: "vercel_registry",
        role: "System Automation Pipeline",
        avatar: "https://api.dicebear.com/7.x/initials/svg?seed=VC",
      },
      postedAgo: "4m",
      content: "",
      likes: 512,
      comments: 89,
      views: "14.2k",
      milestone: {
        category: "PROMOTION",
        companyName: "Vercel Inc.",
        companyLogo:
          "https://api.dicebear.com/7.x/initials/svg?seed=VC&backgroundColor=000000",
        metricDetail: "PROMOTED",
        targetUser: {
          name: "Marcus Vane",
          username: "mv_arch",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
          previousRole: "Senior Systems Architect",
          assignedRole: "Principal Core Platforms Engineer",
        },
      },
    },
    {
      id: "sys_event_hire_v2",
      type: "system_milestone",
      author: {
        name: "Stripe Ledger",
        username: "stripe_hr",
        role: "System Automation Pipeline",
        avatar: "https://api.dicebear.com/7.x/initials/svg?seed=ST",
      },
      postedAgo: "2h",
      content: "",
      likes: 245,
      comments: 18,
      views: "4.5k",
      milestone: {
        category: "NEW_HIRE",
        companyName: "Stripe",
        companyLogo:
          "https://api.dicebear.com/7.x/initials/svg?seed=ST&backgroundColor=635bff",
        metricDetail: "NEW HIRE",
        targetUser: {
          name: "Elena Rostova",
          username: "erostova",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
          assignedRole: "Staff Infrastructure API Architect",
        },
      },
    },
    {
      id: "p_multi",
      type: "media",
      author: {
        name: "Visual Studio",
        username: "vis_studio",
        role: "UI Lead",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Studio",
      },
      postedAgo: "5h",
      content:
        "Design system dump. All images strict square grid. +5 more overlay applied.",
      likes: 342,
      comments: 45,
      views: "12.1k",
      images: [
        "https://pbs.twimg.com/media/HIkmDcVaYAABtzK?format=jpg&name=4096x4096",
        "https://pbs.twimg.com/media/HIkmEToagAAbd1Y?format=jpg&name=4096x4096",
        "https://pbs.twimg.com/media/HIkmFk-a8AAgtG2?format=jpg&name=4096x4096",
        "https://pbs.twimg.com/media/HIkmGaPacAAjuXo?format=jpg&name=4096x4096",
      ],
    },
    {
      id: "p_image",
      type: "media",
      author: {
        name: "Alex Rivers",
        username: "arivers",
        role: "Vector Engineer",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      },
      postedAgo: "2h",
      content: "",
      likes: 24,
      comments: 12,
      views: "1.2k",
      images: [
        "https://pbs.twimg.com/media/HIjmQqBXwAAqMvH?format=jpg&name=4096x4096",
      ],
    },
    {
      id: "p_vimage",
      type: "poll",
      author: {
        name: "Alex Rivers",
        username: "arivers",
        role: "Vector Engineer",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      },
      postedAgo: "2h",
      content: "Which is better?",
      likes: 24,
      comments: 12,
      views: "1.2k",
      poll: {
        options: [
          { label: "First", votes: 450 },
          { label: "Second", votes: 120 },
        ],
        totalVotes: 880,
      },
      images: [
        "https://pbs.twimg.com/media/HG6prFdbQAA-QKL?format=png&name=4096x4096",
        "https://pbs.twimg.com/media/HG6prFdbgAAjZfm?format=jpg&name=4096x4096",
      ],
    },
  ];

  return (
    <div className="max-w-xl mx-auto flex flex-col bg-white min-h-screen border-x border-zinc-200 pb-32">
      {feedPosts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          isLiked={!!likedPosts[post.id]}
          isBookmarked={!!bookmarkedPosts[post.id]}
          onToggleLike={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setLikedPosts((prev) => ({ ...prev, [post.id]: !prev[post.id] }));
          }}
          onToggleBookmark={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setBookmarkedPosts((prev) => ({
              ...prev,
              [post.id]: !prev[post.id],
            }));
          }}
          onUserClick={(e, username) => {
            e.preventDefault();
            e.stopPropagation();
            navigate(`/app/user/${username}`);
          }}
          onImagePreview={(img, currentPost) => {
            setSelectedImg(img);
            setSelectedPost(currentPost);
            setDialogOpen(true);
          }}
        />
      ))}

      <PostViewDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        selectedImg={selectedImg}
        selectedPost={selectedPost}
        likedPosts={likedPosts}
        toggleLike={(e: any, id: string) => {
          setLikedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
        }}
      />
    </div>
  );
}
