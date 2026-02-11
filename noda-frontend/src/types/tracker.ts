export interface LogEntry {
    stage: string;
    date: string;
    status: "COMPLETED" | "ACTIVE" | "PENDING";
}

export interface NodeEntry {
    id: number;
    company: string;
    role: string;
    status: string;
    applied: string;
    match: number;
    salary: string;
    location: string;
    workMode: string;
    jobLink: string;
    description: string;
    companyRating: string;
    memberCount: string;
    stack?: string[];
    experience?: string;
    interviewDate?: string | null;
    logs?: LogEntry[];
    jobType?: string;
}