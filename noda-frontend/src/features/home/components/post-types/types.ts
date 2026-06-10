export type PostType = 'text' | 'poll' | 'media' | 'project_showcase' | 'system_milestone' | 'job_listing';

export type MilestoneCategory = 'PROMOTION' | 'NEW_HIRE' | 'ANNIVERSARY';

export interface JobListingData {
  companyName: string;
  companyLogo: string;
  positionTitle: string;
  department: string;
  location: string; // e.g., "REMOTE (US/EU)" or "HYBRID (NYC)"
  salaryRange?: string; // e.g., "$140k - $180k"
  applyUrl: string;
  tags: string[]; // e.g., ["RUST", "WASM", "DISTRIBUTED SYSTEMS"]
}

export interface MilestoneData {
  category: MilestoneCategory;
  companyName: string;
  companyLogo: string; // Industrial token or glyph graphic
  targetUser: {
    name: string;
    username: string;
    avatar: string;
    previousRole?: string;
    assignedRole: string;
  };
  metricDetail?: string;
}

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
  question: string;
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
  milestone?: MilestoneData;
  jobListing?: JobListingData;
}   