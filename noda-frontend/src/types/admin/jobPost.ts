export interface SkillNodeProps {
    skill: string;
    onRemove: (skill: string) => void;
}

export interface HiringSidebarProps {
    companyInitial: string;
    companyName: string;
    nodeCount: string;
    activeJobs: number;
    avgApplicants: number;
}