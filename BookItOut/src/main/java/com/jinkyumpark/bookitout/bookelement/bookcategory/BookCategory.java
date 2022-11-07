package com.jinkyumpark.bookitout.bookelement.bookcategory;

import javax.persistence.*;

@Entity
@Table(name = "book_category")
public class BookCategory {
    @Id
    @SequenceGenerator(name = "book_category_seq", sequenceName = "book_category_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "book_category_seq")
    @Column(name = "book_category_id")
    private Long bookCategoryId;

    @Column(name = "name", nullable = false)
    private String name;
}
