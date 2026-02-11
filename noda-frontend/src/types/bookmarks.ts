export type NodeType = "Job" | "Post";

export interface BookmarkNode {
    id: number;
    type: NodeType;
    title: string;
    entity: string;
    meta: string;
    status: string;
    match?: number; // Optional because only Jobs have it
}