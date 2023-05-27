export interface LocationConvertType {
    fullAddress: string;
    shortAddress: string;
}

export interface RegionType {
    id: number;
    depth1: RegionTypeDepth;
    depth2: RegionTypeDepth;
}

interface RegionTypeDepth {
    koreanName: string;
    englishName: string;
    logo: string;
}