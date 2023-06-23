package com.jinkyumpark.core.bookIsbn;

import com.jinkyumpark.core.book.model.book.BookLanguage;
import com.jinkyumpark.core.book.model.book.BookMainCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder

@Entity
@Table(uniqueConstraints = {@UniqueConstraint(name = "book_isbn_unique", columnNames = {"isbn"})})
public class BookIsbn {

    @Column(unique = true, length = 13)
    @Id
    private String isbn;

    @Column(nullable = false)
    private String title;
    private String author;
    private String cover;

    @Column(name = "sub_title")
    private String subTitle;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "publication_year", length = 4)
    private Integer publicationYear;

    @Column(length = 100)
    private String publisher;

    @Column(length = 5)
    private Integer page;

    @Column(name = "naver_link") private String naverLink;
    @Column(name = "aladin_link") private String aladinLink;
    @Column(name = "yes24_link") private String yes24Link;
    @Column(name = "kyobo_link") private String kyoboLink;

    @Column(name = "language", length = 10)
    @Enumerated(value = EnumType.STRING)
    private BookLanguage language;

    @Column(name = "category", length = 15)
    @Enumerated(value = EnumType.STRING)
    private BookMainCategory category;

}