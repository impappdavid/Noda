export interface Author {
    id: string;
    name: string;
    username: string;
    role: string;
    avatar: string;
    reliability: string;
}

export interface PollOption {
    label: string;
    votes: number;
}

export interface Post {
    id: string;
    author: Author;
    content: string;
    postedAgo: string;
    likes: number;
    commentsCount: number;
    views: string;
    images: string[];
    poll?: {
        options: PollOption[];
        totalVotes: number;
    };
}