package com.jinkyumpark.core.batch.seoulLibraryFile.dto;

import com.jinkyumpark.core.book.model.book.BookLanguage;
import com.jinkyumpark.core.book.model.book.BookMainCategory;
import com.jinkyumpark.core.bookIsbn.BookIsbn;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

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
    private String lang;
    private String class_no;

    public BookIsbn toEntity(String cover, String description, String naverLink, Integer publicationYear) {
        return BookIsbn.builder()
                .isbn(isbn)

                .title(getTitle(title))
                .subTitle(getSubTitle(title))
                .author(getAuthor(author))
                .cover(cover)
                .description(description)

                .publicationYear(getYear(publer_year, publicationYear))
                .publisher(publer)

                .page(getPage(page))

                .language(getLanguage(lang))
                .category(getCategory(class_no))

                .naverLink(naverLink)

                .build();
    }

    private String getTitle(String title) {
        String uselessInfoRemoved = title
                .replace("[국외전자책]", "")
                .replace("[구독형]", "")
                .replace("[전자책]", "")
                .replace("[전자자료]", "")
                .replace("[지도자료]", "");

        String subTitleRemoved = uselessInfoRemoved
                // starts with ()
                .replaceAll("\\([^)]*\\)", "")
                // ends with ()
                .replaceAll("\\([^()]*\\)$", "")
                // last occurrence of : until end
                .replaceAll(":[^:]*$", "");

        if (subTitleRemoved.length() > 200) {
            return uselessInfoRemoved.substring(0, 199);
        }

        return subTitleRemoved.trim();
    }

    private String getSubTitle(String title) {
        String[] regexes = {"\\([^)]*\\)", "\\([^()]*\\)$", ":[^:]*$"};

        List<String> matches = new ArrayList<>();

        for (String regex : regexes) {
            Pattern pattern = Pattern.compile(regex);
            Matcher matcher = pattern.matcher(title);

            while (matcher.find()) {
                String match = matcher.group();
                matches.add(match);
            }
        }

        String combined = String.join("", matches);
        if (combined.isEmpty()) return null;
        else if (combined.length() < 200) return combined;
        else return combined.substring(0, 200);
    }

    private String getAuthor(String author) {
        if (author == null || author.isEmpty()) return null;

        return author
                .replaceAll(" 지음", "")
                .replaceAll(" 저", "")
                .replaceAll("글·그림", "")
                .replaceAll("\\s글$", "")
                .replaceAll("(지은이)", "")
                .replaceAll("(그림)", "")
                .replace("[by] ", "");
    }

    private Integer getYear(String year, Integer naverPublicationYear) {
        String publicationYear = year == null ? null : year.trim().replaceAll(" ", "");
        Integer publicationYearExtracted;
        try {
            publicationYearExtracted = publicationYear == null || publicationYear.isEmpty() ? null : Integer.parseInt(publicationYear);
        } catch (Exception e) {
            log.info("publication Year malformed {}", year);
            return naverPublicationYear;
        }

        if (publicationYearExtracted == null || publicationYearExtracted == 0) return naverPublicationYear;

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
        if (language.toUpperCase().contains("KOR"))
            languageExtracted = BookLanguage.KOREAN;
        else if (language.toUpperCase().contains("ENG"))
            languageExtracted = BookLanguage.ENGLISH;
        else if (language.toUpperCase().contains("JPN"))
            languageExtracted = BookLanguage.JAPANESE;
        else if (language.toUpperCase().contains("CHI"))
            languageExtracted = BookLanguage.CHINESE;
        else if (language.toUpperCase().contains("FRE"))
            languageExtracted = BookLanguage.FRENCH;
        else if (language.toUpperCase().contains("SPA"))
            languageExtracted = BookLanguage.SPANISH;
        else if (language.toUpperCase().contains("GER"))
            languageExtracted = BookLanguage.GERMAN;
        else if (language.toUpperCase().contains("ITA"))
            languageExtracted = BookLanguage.ITALIAN;

        return languageExtracted;
    }

    private BookMainCategory getCategory(String category) {
        if (category == null || category.matches("\\W+")) {
            return BookMainCategory.UNKNOWN;
        }

        return BookMainCategory.getByStartsWith(
                String.valueOf(category.charAt(0))
        );
    }

}
