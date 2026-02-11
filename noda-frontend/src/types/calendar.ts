export interface InterviewNode {
    id: number;
    date: number;
    month: number;
    year: number;
    hour: string;
    company: string;
    type: string;
    status: string;
    jobLink: string;
}

export interface CalendarCellProps {
    day: number | null;
    interviews: InterviewNode[];
    isCurrent: boolean;
    onClick: () => void;
}