import type { ReactNode } from "react";

export interface StatModuleProps {
    label: string;
    value: string;
    trend: string;
    icon: ReactNode;
    isNegative?: boolean;
}

export interface MetricRowProps {
    label: string;
    value: string;
}

export interface PerformanceRowProps {
    title: string;
    views: string;
    likes: string;
    comments: string;
}