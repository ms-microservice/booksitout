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

export interface RegionSearchResultType {
    id: number;
    name: {
        korean: string;
        english: string;
    },
    logo: string
}