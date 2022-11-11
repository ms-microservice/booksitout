package com.jinkyumpark.bookitout.book;

import com.jinkyumpark.bookitout.bookelement.author.Author;
import com.jinkyumpark.bookitout.bookelement.bookcategory.BookCategory;
import com.jinkyumpark.bookitout.bookelement.language.Language;
import com.jinkyumpark.bookitout.user.AppUser;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

@Entity
@Table(name = "book")
public class Book {
    @Id
    @SequenceGenerator(name = "book_seq", sequenceName = "book_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "book_seq")
    @Column(name = "book_id", updatable = false)
    private Long bookId;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "cover")
    private String cover;

    @Column(name = "published_at")
    private LocalDateTime publishedAt;

    @Column(name = "summary")
    private String summary;

    @Column(name = "currentPage")
    @ColumnDefault("0")
    private Integer currentPage;

    @Column(name = "endPage", nullable = false)
    private Integer endPage;

    @Column(name = "source")
    @Enumerated(EnumType.ORDINAL)
    private BookSource source;

    @Column(name = "review")
    private String review;

    @Column(name = "rating", length = 5)
    private Integer rating;

    @Column(name = "sharing")
    @ColumnDefault("false")
    private Boolean isSharing;

    // FK
    @ManyToOne
    @JoinColumn(name = "app_user_id", nullable = false, updatable = false, foreignKey = @ForeignKey(name = "book_user_fk"))
    private AppUser appUser;

    @ManyToOne
    @JoinColumn(name = "author_id", foreignKey = @ForeignKey(name = "book_author_fk"))
    private Author author;

    @ManyToOne
    @JoinColumn(name = "book_category_id", foreignKey = @ForeignKey(name = "book_category_fk"))
    private BookCategory category;

    @ManyToOne
    @JoinColumn(name = "book_language_id", foreignKey = @ForeignKey(name = "book_language_fk"))
    private Language language;
}
