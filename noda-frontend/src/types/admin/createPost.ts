export interface Poll {
    options: string[];
}

export interface ToolbarButtonProps {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    active: boolean;
}