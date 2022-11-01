package com.jinkyumpark.bookitout.userbook;

import com.jinkyumpark.bookitout.book.Book;
import com.jinkyumpark.bookitout.user.AppUser;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Entity(name = "userbook")
@Table(name = "UserBook")
public class UserBook {
    @Id
    @SequenceGenerator(name = "user_book_seq", sequenceName = "user_book_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_book_seq")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_book_book_id", referencedColumnName = "id", updatable = false, foreignKey = @ForeignKey(name = "user_book_book_fk"))
    private Book book;

    @ManyToOne
    @JoinColumn(name = "user_book_user_id", referencedColumnName = "id", updatable = false, foreignKey = @ForeignKey(name = "user_book_user_fk"))
    private AppUser appUser;

    @Column(name = "rating", length = 5)
    private Integer rating;

    @Column(name = "review")
    private String review;

    @Column(name = "endPage")
    private Integer endPage;

    @Column(name = "currentPage")
    @ColumnDefault("0")
    private Integer currentPage;

    @Column(name = "source")
    private BookSource source;
}
