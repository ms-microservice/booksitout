package com.jinkyumpark.bookitout.memo;

import com.jinkyumpark.bookitout.book.model.Book;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor

@Entity
@Table(name = "Memo")
public class Memo {
    @Id
    @SequenceGenerator(name = "memo_seq", sequenceName = "memo_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "memo_seq")
    private Long memoId;

    @Column(name = "page", nullable = false)
    private Integer page;

    @Column(name = "content", nullable = false)
    private String content;

    @ManyToOne
    @JoinColumn(name = "book_id", referencedColumnName = "book_id", foreignKey = @ForeignKey(name = "memo_book_fk"))
    private Book book;

    public Memo(Integer page, String content, Book book) {
        this.page = page;
        this.content = content;
        this.book = book;
    }
}
