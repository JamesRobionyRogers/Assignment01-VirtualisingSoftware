
export const suppressMissingAttributes = {
    placeholder: undefined,
    onPointerEnterCapture: undefined,
    onPointerLeaveCapture: undefined,
};

// Importing Types
import { color } from "@material-tailwind/react/types/components/chip";

// Exporting Types
export type ChipColor = color; 
export type ApplicationStatus = "Applied" | "Interview" | "Offer" | "Rejected";

// Exporting Interfaces
export interface StatusMap {
    Applied: ChipColor,
    Interview: ChipColor,
    Offer: ChipColor,
    Rejected: ChipColor,
}

export interface ApplicationDocuments {
    name: string,
    size: string,
    link: string,
}

export interface ApplicationData {
    uuid: string,
    img: string,
    company: string,
    job: string,
    description?: string,
    status: ApplicationStatus,
    date: string,
    link: string,
    notes?: string,
    documents?: ApplicationDocuments[],
}

export interface ApplicationAction {
    name: string,
    color: string,
    icon: React.FC | React.ComponentType<React.SVGProps<SVGSVGElement>>,
    action: () => void,
}
