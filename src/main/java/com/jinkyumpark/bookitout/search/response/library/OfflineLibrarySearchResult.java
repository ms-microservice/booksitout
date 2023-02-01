package com.jinkyumpark.bookitout.search.response.library;

import lombok.Builder;
import lombok.Getter;

@Getter
public class OfflineLibrarySearchResult {
    private final LibraryBook book;
    private final OfflineLibraryLibrarySearchResult library;

    private final Boolean isLoanPossible;
    private final String bookLink;

    @Builder
    public OfflineLibrarySearchResult(String bookTitle, String bookAuthor, String bookCover,
                                          String libraryName, String libraryLogo, String libraryLink,
                                          Boolean isLoanPossible, String bookLink) {
        this.isLoanPossible = isLoanPossible;
        this.bookLink = bookLink;

        this.book = LibraryBook.builder()
                .title(bookTitle)
                .author(bookAuthor)
                .cover(bookCover)
                .build();

        this.library = OfflineLibraryLibrarySearchResult.builder()
                .name(libraryName)
                .logo(libraryLogo)
                .link(libraryLink)
                .build();
    }
}