export type TabType = 'HOME' | 'POSTS' | 'JOBS' | 'TEAM';

export interface CompanyData {
    name: string;
    avatar: string;
    location: string;
    country: string;
    followers: string;
    employees: string;
    rating: string;
    description: string;
}

export interface PostProps {
    author: string;
    username: string;
    role: string;
    time: string;
    content: string;
}

export interface JobProps {
    role: string;
    location: string;
    pay: string;
    time: string;
    match: string;
}

export interface UserCardProps {
    name: string;
    role: string;
    verified?: boolean;
}