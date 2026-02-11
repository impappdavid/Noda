export interface JobNode {
    id: string;
    role: string;
    applicants: number;
    new: number;
    deadline: string;
}

export interface ApplicantNode {
    id: string;
    name: string;
    match: string;
    status: "Pending" | "Reviewed" | "Rejected" | "Shortlisted";
    applied: string;
    deadline: string;
}