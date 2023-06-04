import { LibraryType } from "../LibraryType";

export interface MembershipType {
    id: number;
    number: string;
    memo?: string;

    logo: string;
    name: string;
    description?: string;

    usableLibrary: LibraryType[]
}

export interface MembershipTypeSearchResultType {
    id: number;
    name: string;
    logo?: string;
    description?: string
}