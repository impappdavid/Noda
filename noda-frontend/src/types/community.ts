export interface CommunityData {
    id: string;
    clusterName: string;
    title: string;
    memberCount: string;
    description: string;
    bannerImage: string;
    initial: string;
}

export interface Post {
    id: number;
    author: string;
    time: string;
    title: string;
    content: string;
}