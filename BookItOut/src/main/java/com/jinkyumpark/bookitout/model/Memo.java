package com.jinkyumpark.bookitout.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jinkyumpark.bookitout.model.book.Book;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor

@Entity @Table(name = "Memo")
public class Memo {
    @Id
    @SequenceGenerator(name = "memo_seq", sequenceName = "memo_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "memo_seq")
    @Column(name = "memo_id")
    private Long memoId;

    @Column(name = "page", nullable = false)
    private Integer page;

    @Column(name = "content", nullable = false)
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id", referencedColumnName = "book_id", nullable = false, foreignKey = @ForeignKey(name = "memo_book_fk"))
    @JsonIgnore
    private Book book;

    @Builder
    public Memo(Integer page, String content, Book book) {
        this.page = page;
        this.content = content;
        this.book = book;
    }

    public void editMemo(String content, Integer page) {
        if (content != null) this.content = content;
        if (page != null) this.page = page;
    }
}
