package com.jinkyumpark.bookitout.quotation.request;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class QuotationEditRequest {
    private Integer page;
    private String content;
    private String fromWho;
}
