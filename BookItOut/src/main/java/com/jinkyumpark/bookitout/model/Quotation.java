package com.jinkyumpark.bookitout.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jinkyumpark.bookitout.model.book.Book;
import com.jinkyumpark.bookitout.request.QuotationEditRequest;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor

@Entity @Table(name = "Quotation")
public class Quotation {
    @Id
    @SequenceGenerator(name = "quotation_seq", sequenceName = "quotation_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "quotation_seq")
    @Column(name = "quotation_id")
    private Long quotationId;

    @Column(name = "page")
    private Integer page;

    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "from_who")
    private String fromWho;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id", referencedColumnName = "book_id", foreignKey = @ForeignKey(name = "quotation_book_fk"))
    @JsonIgnore
    private Book book;

    public Quotation(Integer page, String content, String fromWho, Book book) {
        this.page = page;
        this.content = content;
        this.fromWho = fromWho;
        this.book = book;
    }

    public void editQuotation(QuotationEditRequest quotationEditRequest) {
        if (quotationEditRequest.getContent() != null)
            this.content = quotationEditRequest.getContent();
        if (quotationEditRequest.getPage() != null)
            this.page = quotationEditRequest.getPage();
        if (quotationEditRequest.getFromWho() != null)
            this.fromWho = quotationEditRequest.getFromWho();
    }
}
