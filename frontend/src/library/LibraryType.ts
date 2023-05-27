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
    address: string;
    latitude: number;
    longitude: number;
    name: string;
    englishName: string;
    logo: string;

    distance?: number;
}
export interface LibraryAutoCompleteType {
    id: number;
    name: string;
    address: string;
}