export interface LibraryType {
    id: number;
    name: string;
    phone?: string;
    homepage?: string;
    bookCount?: number;
    openHour?: string;
    openDay?: string;

    location: LibraryTypeLocation;
}

export interface LibraryTypeLocation {
    name: LibraryTypeLocationName;

    address: string;
    latitude: number;
    longitude: number;
    logo: string;

    distance?: number;
}

export interface LibraryTypeLocationName {
    displayName: string;
    regionEnglishName: string;
    regionDetailEnglishName: string;
}
export interface LibraryAutoCompleteType {
    id: number;
    name: string;
    address: string;
}