package com.jinkyumpark.bookitout.book;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jinkyumpark.bookitout.bookelement.author.Author;
import com.jinkyumpark.bookitout.bookelement.bookcategory.BookCategory;
import com.jinkyumpark.bookitout.bookelement.language.Language;
import com.jinkyumpark.bookitout.readingsession.ReadingSession;
import com.jinkyumpark.bookitout.user.AppUser;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

@Entity
@Table(name = "book")
@DynamicInsert
public class Book {
    @Id
    @SequenceGenerator(name = "book_seq", sequenceName = "book_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "book_seq")
    @Column(name = "book_id", updatable = false)
    private Long bookId;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "cover", length = 1000)
    private String cover;

    @Column(name = "published_at")
    private LocalDateTime publishedAt;

    @Column(name = "add_date", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    @JsonIgnore
    private LocalDateTime addDate;

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

    @Column(name = "language", nullable = false)
    @ColumnDefault(value = "1")
    @Enumerated(value = EnumType.ORDINAL)
    private Language language;


    @OneToMany(mappedBy = "book", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    List<ReadingSession> readingSessionList;

    // FK
    @ManyToOne
    @JoinColumn(name = "app_user_id", foreignKey = @ForeignKey(name = "book_user_fk"))
    private AppUser appUser;

    @Column(name = "author", nullable = false)
    private String author;

    @ManyToOne
    @JoinColumn(name = "category_id", foreignKey = @ForeignKey(name = "book_category_fk"))
    private BookCategory category;
}
