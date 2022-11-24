package com.jinkyumpark.bookitout.quotation;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor

@RestController
@RequestMapping("/v1/quotation")
public class QuotationControllerV1 {
    QuotationService quotationService;
}
