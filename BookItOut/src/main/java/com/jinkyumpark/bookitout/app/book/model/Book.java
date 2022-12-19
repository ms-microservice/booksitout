package com.jinkyumpark.bookitout.app.book.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jinkyumpark.bookitout.app.user.AppUser;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.time.LocalDateTime;

@AllArgsConstructor @NoArgsConstructor
@Getter @Setter

@DynamicInsert

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

    @Column(name = "cover", length = 1000)
    private String cover;

    @Column(name = "published_at")
    @JsonIgnore
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

    @Column(name = "form")
    @Enumerated(EnumType.ORDINAL)
    private BookForm form;

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
    private BookLanguage language;

    @Column(name = "category", nullable = false)
    @ColumnDefault(value = "1")
    @Enumerated(value = EnumType.ORDINAL)
    private BookCategory category;

    // TODO : change to FK
    @Column(name = "author", nullable = false)
    private String author;

    @Column(name = "isGiveUp")
    @Convert(converter = BooleanTo01Converter.class)
    private Boolean isGiveUp;

    // FK
    @ManyToOne
    @JoinColumn(name = "app_user_id", foreignKey = @ForeignKey(name = "book_user_fk"))
    private AppUser appUser;
}