package com.jinkyumpark.core.bookIsbn;

import com.jinkyumpark.core.book.model.BookLanguage;
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

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(length = 4)
    private Integer publicationYear;

    @Column(length = 100)
    private String publisher;

    @Column(length = 5)
    private Integer page;

    private String naverLink;

    @Column(name = "language", length = 10)
    @Enumerated(value = EnumType.STRING)
    private BookLanguage language;

}