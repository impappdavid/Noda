export type PostType = 'text' | 'poll' | 'media' | 'project_showcase';

export interface Author {
  name: string;
  username: string;
  role: string;
  avatar: string;
}

export interface PollOption {
  label: string;
  votes: number;
}

export interface PollData {
  options: PollOption[];
  totalVotes: number;
}

// Optimized purely for visual portfolios and codebase paths
export interface ProjectData {
  title: string;
  tagline: string;
  description?: string;
  coverImage?: string;
  liveUrl?: string;
  repoUrl?: string;
}

export interface Post {
  id: string;
  type: PostType;
  author: Author;
  postedAgo: string;
  content: string;
  likes: number;
  comments: number;
  views: string;
  images?: string[];
  poll?: PollData;
  project?: ProjectData;
}   