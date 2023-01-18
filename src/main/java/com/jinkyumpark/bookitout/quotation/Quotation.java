package com.jinkyumpark.bookitout.quotation;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jinkyumpark.bookitout.book.model.Book;
import com.jinkyumpark.bookitout.quotation.request.QuotationEditRequest;
import lombok.Builder;
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

    @Builder
    public Quotation(Integer page, String content, String fromWho, Book book) {
        this.page = page;
        this.content = content;
        this.fromWho = fromWho;
        this.book = book;
    }

    public void editQuotation(QuotationDto quotationDto) {
        if (quotationDto.getContent() != null)
            this.content = quotationDto.getContent();
        if (quotationDto.getPage() != null)
            this.page = quotationDto.getPage();
        if (quotationDto.getFromWho() != null)
            this.fromWho = quotationDto.getFromWho();
    }
}
