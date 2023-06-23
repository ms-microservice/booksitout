package com.jinkyumpark.core.common.feign.response;

import com.jinkyumpark.core.bookIsbn.BookIsbn;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class NewBookSearchResponse {

    private String title;
    private String author;
    private String cover;
    private String isbn;
    private String link;
    private String description;
    private Integer publicationYear;
    private Integer page;
    private String language;
    private String category;

    public BookIsbn toEntity() {
        int index = title.lastIndexOf('(') == -1 ? title.length() : title.lastIndexOf('(');

        return BookIsbn.builder()
                .isbn(isbn)

                .title(title.substring(0, index))
                .subTitle(title.substring(index))
                .author(author)
                .cover(cover)

                .description(description)
                .publicationYear(publicationYear)
                .page(page)

                .build();
    }

}