export interface GatheringType {
    id: number;
    title: string;
    content: string;
    type: GatheringTypeType;
    location: GatheringLocationType;
    user: GatheringUserType;
}

export interface GatheringDetailType extends GatheringType {
    joinCount: number;
    capacityCount: number;
}

interface GatheringTypeType {
    type: string;
    displayName: string;
}

interface GatheringLocationType {
    type: string;
    description: string;
}

interface GatheringUserType {
    id: number;
    name: string;
    profileImage?: string;
}