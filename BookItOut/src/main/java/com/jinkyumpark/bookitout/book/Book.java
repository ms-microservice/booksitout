package com.jinkyumpark.bookitout.book;

import com.jinkyumpark.bookitout.bookelement.author.Author;
import com.jinkyumpark.bookitout.bookelement.bookcategory.BookCategory;
import com.jinkyumpark.bookitout.bookelement.language.Language;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

@Entity(name = "Book")
@Table(name = "book")
public class Book {
    @Id
    @SequenceGenerator(name = "book_seq", sequenceName = "book_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "book_seq")
    @Column(name = "id", updatable = false)
    private Long id;

    @Column(name = "title", nullable = false)
    private String title;

    @ManyToOne
    @JoinColumn(name = "author_id", nullable = false, referencedColumnName = "id", foreignKey = @ForeignKey(name = "book_author_fk"))
    private Author author;

    @ManyToOne
    @JoinColumn(name = "book_category_id", nullable = false, referencedColumnName = "id", foreignKey = @ForeignKey(name = "book_category_fk"))
    private BookCategory category;

    @Column(name = "cover", nullable = true)
    private String cover;

    @Column(name = "published_at", nullable = true)
    private LocalDateTime publishedAt;

    @Column(name = "currentPage")
    @ColumnDefault("0")
    private Integer currentPage;

    @Column(name = "endPage", nullable = true)
    private Integer endPage;

    @Column(name = "summary", nullable = true)
    private String summary;

    @ManyToOne
    @JoinColumn(name = "book_language_id", nullable = false, referencedColumnName = "id", foreignKey = @ForeignKey(name = "book_language_fk"))
    private Language language;

    @Column(name = "source")
    @Enumerated(EnumType.ORDINAL)
    private BookSource source;

    @Column(name = "rating", length = 5)
    private Integer rating;

    @Column(name = "review")
    private String review;
}
