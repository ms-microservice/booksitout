package com.jinkyumpark.core.book.model.customBook;

import com.jinkyumpark.core.book.model.book.BookMainCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder

@Entity @Table(name = "book_custom")
public class BookCustom {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long customBookId;

    private String title;
    private String author;
    private String cover;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 15)
    private BookMainCategory category;

}
