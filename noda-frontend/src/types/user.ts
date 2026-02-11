import type { ReactNode } from "react";

export interface TimelineEntryProps {
    role: string;
    org: string;
    date: string;
}

export interface PostStatProps {
    icon: ReactNode;
    count: string | number;
}

export interface IntelligenceMetricProps {
    label: string;
    value: string;
}