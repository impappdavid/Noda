export type NotificationType = 'connection' | 'job' | 'reaction' | 'message';

export interface Notification {
    id: number;
    type: NotificationType;
    actor: string;
    action: string;
    time: string;
    unread: boolean;
}