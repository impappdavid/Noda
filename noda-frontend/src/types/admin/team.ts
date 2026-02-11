export interface TeamNode {
    id: string;
    name: string;
    username: string;
    role: string;
}

export interface RequestNode {
    id: string;
    name: string;
    username: string;
    note: string;
}

export type ManagerTab = 'TEAM' | 'REQUESTS';