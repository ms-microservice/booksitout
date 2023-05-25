package com.jinkyumpark.core.memo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jinkyumpark.core.book.model.Book;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder

@Entity @Table(name = "Memo")
public class Memo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "memo_seq")
    @Column(name = "memo_id")
    private Long memoId;

    @Column(name = "page")
    private Integer page;

    @Column(name = "content", nullable = false)
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id", referencedColumnName = "book_id", nullable = false, foreignKey = @ForeignKey(name = "memo_book_fk"))
    @JsonIgnore
    private Book book;

    public void editMemo(MemoDto memoDto) {
        if (memoDto.getContent() != null) this.content = memoDto.getContent();
        if (memoDto.getPage() != null) this.page = memoDto.getPage();
    }

}
