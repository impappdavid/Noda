export interface Message {
    id: string;
    sender: string;
    text: string;
    time: string;
    isMe?: boolean;
}

export interface ChatNode {
    id: number;
    name: string;
    role: string;
    lastMsg: string;
    time: string;
    unread: boolean;
}