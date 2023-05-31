export interface MembershipType {
    id: number;
    number: string;

    region: MembershipTypeRegion;
}

interface MembershipTypeRegion {
    id: number;
    koreanName: string;
    englishName: string;
    logo: string;
}