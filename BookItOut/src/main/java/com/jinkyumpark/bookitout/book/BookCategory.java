package com.jinkyumpark.bookitout.book;

import javax.persistence.*;

@Entity(name = "BookCategory")
@Table(name = "book_category")
public class BookCategory {
    @Id
    @SequenceGenerator(name = "book_category_seq", sequenceName = "book_category_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "book_category_seq")
    @Column(name = "id")
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;
}
