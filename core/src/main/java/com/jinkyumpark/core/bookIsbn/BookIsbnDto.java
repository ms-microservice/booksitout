package com.jinkyumpark.core.bookIsbn;

import com.jinkyumpark.core.book.model.BookLanguage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class BookIsbnDto {

    private String isbn;

    private String title;
    private String author;
    private String cover;

    private Integer publicationYear;
    private String publisher;

    private String description;
    private String language;
    private Integer page;

    private BookLink link;

    public static BookIsbnDto of(BookIsbn bookIsbn) {
        return BookIsbnDto.builder()
                .isbn(bookIsbn.getIsbn())

                .title(bookIsbn.getTitle())
                .author(bookIsbn.getAuthor())
                .cover(bookIsbn.getCover())

                .publicationYear(bookIsbn.getPublicationYear())
                .publisher(bookIsbn.getPublisher())

                .description(bookIsbn.getDescription())
                .language(bookIsbn.getLanguage() == null ? BookLanguage.KOREAN.toString() : bookIsbn.getLanguage().toString())
                .page(bookIsbn.getPage())

                .link(BookLink.builder()
                        .naver(bookIsbn.getNaverLink())
                        .aladin(bookIsbn.getAladinLink())
                        .yes24(bookIsbn.getYes24Link())
                        .kyobo(bookIsbn.getKyoboLink())
                        .build()
                )

                .build();
    }

    public BookIsbn toEntity() {
        return BookIsbn.builder()
                .isbn(isbn)

                .title(title)
                .author(author)
                .cover(cover)

                .publicationYear(publicationYear)
                .publisher(publisher)

                .description(description)
                .language(language == null ? BookLanguage.KOREAN : BookLanguage.valueOf(language))
                .page(page)

                .naverLink(link.getNaver())
                .aladinLink(link.getAladin())
                .yes24Link(link.getYes24())
                .kyoboLink(link.getKyobo())

                .build();
    }

}

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
class BookLink {
    private String naver;
    private String aladin;
    private String yes24;
    private String kyobo;
}