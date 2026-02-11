import type { ReactNode } from "react";

export type SettingsTabId = 'Account' | 'Privacy' | 'Security' | 'Interface' | 'Danger';

export interface TabConfig {
    id: SettingsTabId;
    label: string;
    icon: ReactNode;
}

export interface SettingFieldProps {
    label: string;
    type?: string;
    value?: string;
    defaultValue?: string;
}

export interface ToggleRowProps {
    title: string;
    desc: string;
    active?: boolean;
}