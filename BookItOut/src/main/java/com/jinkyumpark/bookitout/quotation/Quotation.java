package com.jinkyumpark.bookitout.quotation;

import com.jinkyumpark.bookitout.book.model.Book;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter @Setter
@NoArgsConstructor

@Entity
@Table(name = "Quotation")
public class Quotation {

    @Id
    @SequenceGenerator(name = "quotation_seq", sequenceName = "quotation_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "quotation_seq")
    @Column(name = "quotation_id")
    private Long quotationId;

    @Column(name = "page", nullable = false)
    private Integer page;

    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "from")
    private String from;

    @ManyToOne
    @JoinColumn(name = "book_id", referencedColumnName = "bookId", foreignKey = @ForeignKey(name = "quotation_book_fk"))
    private Book book;

    public Quotation(Integer page, String content, Book book) {
        this.page = page;
        this.content = content;
        this.book = book;
    }
}
