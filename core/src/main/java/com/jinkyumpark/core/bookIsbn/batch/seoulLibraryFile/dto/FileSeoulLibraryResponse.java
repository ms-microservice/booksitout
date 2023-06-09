package com.jinkyumpark.core.bookIsbn.batch.seoulLibraryFile.dto;

import com.jinkyumpark.core.book.model.BookLanguage;
import com.jinkyumpark.core.bookIsbn.BookIsbn;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class FileSeoulLibraryResponse {

    private String isbn;
    private String title;
    private String author;
    private String publer_year;
    private String page;
    private String publer;
    private String contry_name;
    private String lang_name;

    public BookIsbn toEntity(String cover, String description, String naverLink) {
        return BookIsbn.builder()
                .isbn(isbn)

                .title(getTitle(title))
                .author(getAuthor(author))
                .cover(cover)
                .description(description)

                .publicationYear(getYear(publer_year))
                .publisher(publer)

                .page(getPage(page))

                .language(getLanguage(lang_name))
                .naverLink(naverLink)

                .build();
    }

    private String getTitle(String title) {
        String uselessInfoRemoved = title
                .replace("[국외전자책]", "")
                .replace("[구독형]", "")
                .replace("[전자책]", "")
                .replace("[전자자료]", "")
                ;

        if (uselessInfoRemoved.length() > 200) {
            return uselessInfoRemoved.substring(199);
        }

        return uselessInfoRemoved;
    }

    private String getAuthor(String author) {
        return author
                .replaceAll(" 지음", "")
                .replaceAll(" 저", "")
                .replaceAll("글·그림", "")
                .replaceAll("\\s글$", "")
                .replaceAll("(지은이)", "")
                .replaceAll("(그림)", "")
                .replace("[by] ", "");
    }

    private Integer getYear(String year) {
        String publicationYear = year == null ? null : year.trim().replaceAll(" ", "");
        Integer publicationYearExtracted = null;
        try {
            publicationYearExtracted = publicationYear == null || publicationYear.isEmpty() ? null : Integer.parseInt(publicationYear);
        } catch (Exception e) {
            log.info("publication Year malformed {}", year);
        }

        return publicationYearExtracted;
    }

    private Integer getPage(String page) {
        String pageNonNumberRemoved = page == null ? null : page.replaceAll("[^0-9]", "");
        String pageSpaceRemoved = pageNonNumberRemoved == null ? null : pageNonNumberRemoved.replaceAll(" ", "");
        Integer pageExtracted = null;

        try {
            if (pageSpaceRemoved != null) {
                pageExtracted = Integer.parseInt(pageSpaceRemoved);
            }
        } catch (Exception e) {
            log.info("page failed to parsed: {}", page);
        }

        return pageExtracted == null || pageExtracted == 1 ? null : pageExtracted;
    }

    private BookLanguage getLanguage(String language) {
        BookLanguage languageExtracted = null;
        if (lang_name == null || lang_name.contains("한국")) languageExtracted = BookLanguage.KOREAN;
        else if (lang_name.contains("영어") || lang_name.contains("eng") || lang_name.contains("ENG")) languageExtracted = BookLanguage.ENGLISH;
        else if (lang_name.toUpperCase().contains("일본") || lang_name.contains("jap")) languageExtracted = BookLanguage.JAPANESE;
        else if (lang_name.contains("중국") || lang_name.contains("chin") || lang_name.contains("Chinese")) languageExtracted = BookLanguage.CHINESE;

        return languageExtracted;
    }

}
