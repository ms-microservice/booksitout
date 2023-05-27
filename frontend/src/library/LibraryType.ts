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

interface LibraryTypeLocation {
    address: string;
    latitude: number;
    longitude: number;
    name: string;
    logo: string;

    distance?: number;
}